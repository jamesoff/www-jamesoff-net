---
layout: page
status: publish
published: true
title: Defining monitors
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 313
wordpress_url: http://jamesoff.net/site/code/simplemonitor/configuration/defining-monitors/
date: '2007-12-10 16:34:48 -0500'
date_gmt: '2007-12-10 16:34:48 -0500'
categories:
- Uncategorized
tags: []
comments: []
---
<p>Monitors are defined in `monitors.ini` or another file if you've defined one in `monitor.ini`.</p>
<p>Each monitor's name goes in square brackets and the options for that monitor follow it.</p>
<p>The name `defaults` is reserved. Any options given to this monitor will be also given to all other monitors (except where overridden).</p>
<p>Not all monitors can run on all types of host. For this documentation, Cygwin counts mainly as Windows. Monitors will complain when the program starts if they will be unable to run.</p>
<p>The types of monitor available are:</p>
<p> * *host*: Pings a host (once per iteration) to see if it's available. Multiplatform.<br />
 * *service*: Checks a Windows service to make sure it's running. Windows only.<br />
 * *tcp*: Checks that a TCP port is open. Doesn't care what happens after the connection is opened. Multiplatform.<br />
 * *rc*: Checks a FreeBSD-style service is running, by running its rc script (in `&#47;usr&#47;local&#47;etc&#47;rc.d`) with the `status` command. May work for other types of rc.d&#47;init.d system. Not for Windows.<br />
 * *svc*: Checks a [supervise](http:&#47;&#47;cr.yp.to&#47;daemontools.html) service is running. Not for Windows.<br />
 * *diskspace*: Checks the free space on a partition is above a given limit. Multiplatform.<br />
 * *http*: Attempts to fetch a URL and makes sure the HTTP return code is `200 OK`. Can also look through the content of the page trying to match a regular expression. Multiplatform.<br />
 * *apcupsd*: Uses (an existing and correctly configured) [apcupsd](http:&#47;&#47;www.apcupsd.org&#47;) to check that a UPS is not running from batteries or having some other problem. Multiplatform.<br />
 * *fail*: This monitor fails 5 times in a row and then succeeds once. Use for testing. Multiplatform.</p>
<p>All monitor types share these common configuration options:</p>
<p> * **type**: One of the types from the above list. Required; no default.<br />
 * **runon**: A hostname (as returned from Python's `socket.gethostname()`) on which the monitor should run. All other hosts will ignore this monitor completely. Optional; default is all hosts.<br />
 * **depend**: A comma-separated list of other monitors on which this one depends. If one of the dependencies fails (or is skipped), this monitor will also skip. A skip does not trigger an alert. Optional; default is empty.<br />
 * **tolerance**: The number of times a monitor can fail before it's actually considered failed (and generates an alert). Handy for things which intermittently fail to poll (the host monitor is guilty of this). This also interacts with the limit option on alerters. Optional; default=1 (i.e. alert on first fail)<br />
 * **urgent**: If this monitor is urgent or not. Non-urgent monitors cannot trigger urgent alerters (e.g. the SMS alerter). Set to 0 to make a monitor non-urgent. Optional, default=1.<br />
 * **gap**: The number of seconds gap between polls for this monitor. Setting this lower than the global interval will have no effect. Use it to make a monitor poll only once an hour, for example. Optional; default=0 (poll every interval)<br />
 * **remote_alert**: This monitor wants a remote host to handle alerting instead of the local host. Set to 1 to enable. Not required; default=0 (i.e. local host does alerts). This is a good candidate for putting in `defaults` if you want to use remote alerting for all your monitors.</p>
<p>Host monitors<br />
---<br />
 * **host**: The hostname to ping. Required, no default.</p>
<p>Service monitors<br />
---<br />
 * **service**: The short name of the service to monitor. This is the "Service name" on the General tab of the service properties (in the Services MMC snap-in). Required, no default.<br />
 * **host**: The hostname to check the service on. Optional, default=localhost.<br />
 * **state**: The state the service should be in. Optional, default=RUNNING.</p>
<p>TCP monitors<br />
---<br />
 * **host**: The name of the host to connect to. Required, no default.<br />
 * **port**: The port to connect to. Integer only (no service names). Required, no default.</p>
<p>rc monitors<br />
---<br />
 * **service**: The name of the service to check. This is the name of the rc.d script in `&#47;usr&#47;local&#47;etc&#47;rc.d&#47;`. Any trailing ".sh" is optional and will be added if needed. Required, no default.</p>
<p>The rc monitor does have additional options like which directory to look in, and the required return value, but currently they cannot be set from the configuration file.</p>
<p>svc monitors<br />
---<br />
 * **path**: The path to the service's directory (e.g. `&#47;var&#47;service&#47;something`). Required, no default.</p>
<p>Diskspace monitors<br />
---<br />
 * **partition**: The partition to check for space on. On Windows, this is the drive letter (e.g. `C:`). On non-Windows, this is the mount point (e.g. `&#47;usr`). Required, no default.<br />
 * **limit**: The minimum amount of free space. Give a number in bytes, or suffix K, M or G for kilobytes, megabytes or gigabytes. Required, no default.</p>
<p>HTTP monitors<br />
---<br />
 * **url**: The URL to open. Required. No default.<br />
 * **regexp**: The regexp to look for in the page (only if the page loads with status `200 OK`). If the regexp does not match, the monitor reports a failure. Optional, default is no regexp. See Python's `re` module for syntax.<br />
 * **allowed_codes**: A list of HTTP codes which are acceptable in addition to `200 OK`. Optional, no default.</p>
<p>apcupsd monitors<br />
---<br />
 * **path**: The path to the `apcaccess` binary. If SimpleMonitors detects it's running on Windows, this defaults to `C:\apcupsd\bin`. If not running on Windows, this defaults to looking in `PATH`. You should only need to specify this if you've installed apcupsd somewhere exotic. Optional, default is to be too clever for own good.</p>
<p>fail monitors<br />
---<br />
No additional options.</p>
<p>See the <a href="..">Configuration<&#47;a> page for an example.</p>
