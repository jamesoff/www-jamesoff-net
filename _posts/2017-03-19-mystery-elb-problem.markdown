---
layout: post
title: The Mystery of the Elastic Load Breaking
summary: Investigating a problem where adding a load balancer to a working service broke it
---

At work I was recently asked by a dev if I could add port forwarding on an
Elastic Load Balancer (ELB) to a development server for a mock API service they
needed. The service was already running on the server, and all it did was reply
to an HTTP GET with a bunch of JSON.

This seemed like a straightforward enough request, so I hacked up the
CloudFormation script in use for the stack to add the TCP port required to the
instance and ELB security groups, and a listener on the load balancer to
forward the HTTP request:

{% highlight diff %}
diff --git a/stack.json b/stack.json
index 790c0de..e395167 100644
--- a/stack.json
+++ b/stack.json
@@ -480,7 +480,14 @@
             "FromPort": "8080",
             "ToPort": "8090",
             "CidrIp": "0.0.0.0/0"
-          }],
+          },
+          {
+            "IpProtocol": "tcp",
+            "FromPort": "18080",
+            "ToPort": "18080",
+            "CidrIp": "10.0.0.0/8"
+          }
+        ],
         "Tags": [
           {
             "Key": "Stack",
@@ -617,6 +624,12 @@
             "FromPort": "8080",
             "ToPort": "8090",
             "CidrIp": "0.0.0.0/0"
+          },
+          {
+            "IpProtocol": "tcp",
+            "FromPort": "18080",
+            "ToPort": "18080",
+            "CidrIp": "0.0.0.0/0"
           }
         ],
         "Tags": [
@@ -770,6 +783,11 @@
             "LoadBalancerPort": { "Ref": "ServerPort" },
             "InstancePort": { "Ref": "ServerPort" },
             "Protocol": "HTTP"
+          },
+          {
+            "LoadBalancerPort": "18080",
+            "InstancePort": "18080",
+            "Protocol": "HTTP"
           }
         ],
         "ConnectionSettings": {
{% endhighlight %}

At this point, the dev messaged me to say that it had stopped working when she
tried accessing the port on the server directly. It also stopped working for me
when I tried hitting it on localhost (which should be immune to problems caused
by security groups). An HTTP request to the load balancer on the new port
returned a 504 Gateway Timeout. Rolling back the changes to the stack fixed the
issue and the service sprang to life.

A few days later, when the dev team didn't need the service, I rolled the stack
forward again to start investigating properly. I was able to reproduce the
issue, so started a few lines in enquiry. Based on the output of `curl -v
localhost:18080`, the TCP connection was being established successfully, so the
problem wasn't at the transport layer. curl was able to send the HTTP request
headers, but was then stuck waiting for a response, and eventually timed out.

The next thing to examine the application listening on the port, which was using Python's `SimpleHTTPServer`. I added a couple of debug statements to the code to the `GET` handler to verify the request was reaching it, and was able to confirm it wasn't.

After this, I fired up `tcpdump` on the loopback interface, and made a request with `curl` again. This confirmed what I'd seen before: that the TCP connection was established, the request headers were sent, and then then nothing else happened. Out of curiosity I had a look at the output of `netstat`, which showed the connection on localhost, the listening port, and... a connection from another IP in our VPC, which I verified was one of the ELB instances. Looking at tcpdump for the Ethernet interface, I could see the ELB instances repeatedly trying to connect if the service wasn't running, and once it was, one of them would complete the three-way handshake, but send no request.

At this point, it fell into place: the ELBs open idle TCP connections to the backend instances, to avoid the overhead when they have a request to handle. However, the mock API server is single-threaded, so once it picks up an ELB's connection, it is stuck waiting for the request which will only come if a request is made to the ELB and happens to be handled by the instance which currently has the open connection. Otherwise, all other connections (i.e. direct to the host or on the loopback interface) will have their TCP connection accepted by the networking stack. Data sent at this point will be received by the stack ready for the application to handle when it is ready.

The solution, then, is to make the application multi-threaded, so that it can handle simultaneous connections from all the ELB instances (and also devs and ops testing it).

{% highlight diff %}
diff --git a/http_server.py b/http_server.py
index 1053cec..7ca8299 100644
--- a/http_server.py
+++ b/http_server.py
@@ -1,4 +1,6 @@
 from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
+from SocketServer import ThreadingMixIn
+import threading
 from urlparse import urlparse, parse_qs
 from statsd_metric import StatsdMetric
 import json
@@ -62,12 +64,18 @@ class myHandler(BaseHTTPRequestHandler):
         return sep.join(tags)


+class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
+    """Create a threaded HTTP server class. Needed if we'return sitting behind
+    an ELB as it opens idle connections, and we can only handle one at a time
+    if we're single-threaded."""
+
+
 class OurHttpServer:

     def start(self):
         #Create a web server and define the handler to manage the
         #incoming request
-        server = HTTPServer(('', self.port), myHandler)
+        server = ThreadedHTTPServer(('', self.port), myHandler)
         self.logger.info("Starting httpserver on port %s", self.port)

         server.metrics = self.metrics
{% endhighlight %}

Having made this change and restarted the application, it sprung into life ready for all the ELB instances to talk to, as well as my local `curl` command. If you can't make a change like this to your application then you can probably put a suitable proxy layer such as nginx in front of it.
