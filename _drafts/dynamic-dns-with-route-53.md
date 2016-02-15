---
layout: post
title: Dynamic DNS with Route 53
excerpt: Updating a DNS entry to follow a dynamic Internet connection using Amazon Web Services' Route53.
---

Years ago, I had a dynamic DNS mechanism set up to keep a record for my home Internet connection. It used SSH, a passwordless key, and SSH configuration to restrict what logging in with that key could do, and some scripts which probably barely held together to update a [djbdns](http://cr.yp.to/djbdns.html) data file, rebuild it, and rsync the output to my secondary. Now, my DNS is done with Amazon's Route 53, and one of the benefits of that is a nice API to update DNS entries, so I rewrote it. Here's how you can set it up too.

You can find the files needed in [this Bitbucket repo](https://bitbucket.org/jamesoff/things), in the autodns folder.

Note that this uses an external server to check your external IP. If you'd like to use mine, use the value in the example configuration file below. If you'd like to run your own, there's a `reflect.php` script in the repo which you can use. My server is available with no guarantees of availablity, and the webserver logs the IP address of clients connecting to it.

I had a look at using [AWS Lambda](http://aws.amazon.com/lambda) to do the reflection so a server isn't required, but it doesn't look like the function gets to see the client IP.

Anyway, on with the show:

## Setting it up

You will need:

* A zone in Route 53, with an A record you plan to update.
* An SNS topic, to which the script will publish warnings if it has problems changing DNS.
* An IAM user with the right permissions to change the zone and publish to the SNS topic.
* A machine on the connection you're updating the DNS for with Python and the AWS boto and requests libraries installed. I'm using a Raspberry Pi.
* Optionally, an external host to run the PHP reflection script, to show you your own IP. This could be an EC2 instance, if you wanted to stick to AWS.

This guide assumes some experience with setting things up in AWS. If you need guidance for creating Route 53 entries, SNS topics, or IAM users, there are plenty of guides around.

### Set up Route 53

You'll need a hosted zone in Route 53, and an entry created for the record you want to update automatically. Give the record a suitably low TTL, like 600 seconds.

### Set up SNS topic

Head over to the SNS console and create a new topic, and subscribe yourself to it. I called mine `dyndns-status`. The script will send a notification to this topic if it has a problem finding out or updating your IP.

### Set up IAM user

The user will need a policy like this; substitute your own HostedZoneId in the first statement, and SNS ARN in the second.

{% highlight json %}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1391686002000",
      "Effect": "Allow",
      "Action": [
        "route53:ChangeResourceRecordSets",
        "route53:ListResourceRecordSets"
      ],
      "Resource": [
        "arn:aws:route53:::hostedzone/MY_HOSTED_ZONE_ID"
      ]
    },
    {
      "Sid": "Stmt1391686002001",
      "Effect": "Allow",
      "Action": [
        "sns:Publish"
      ],
      "Resource": [
        "my:SNS:arn"
      ]
    }
  ]
}
{% endhighlight %}

Create an access key/secret key pair for this user.

### Optional: Reflection script

If you're happy to use my reflection endpoint (see notes in the first section), you can skip this section. You can also write your own script - it just needs to return a JSON object which has an error value of the empty string, and `your_ip` set to the IP of the client. `autodns.py` does not use the `forwarded` or `forwarded_for` values.

The reflection script returns a JSON file showing the client, among other things, its external IP address. It's a PHP script, so you just need to put it somewhere your home machine will be able to reach. You will need to edit the script to set an API key (any random string will do). The API key is to stop people other than you using your script. If you don't care, you can edit out the check.

You can test the script by hitting it with your browser, or a [command-line HTTP client](https://github.com/jkbrzt/httpie):

    ~ ❯ http https://my.server.name/reflect.php\?apikey\=verysecret
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Type: application/json
    ...

    {
        "error": "",
        "forwarded": 0,
        "forwarded_for": "",
        "your_ip": "109.154.104.56"
    }

### Set up the client machine

* Install the `autodns.py` script somewhere, and create a configuration file like this:

{% highlight json %}
{
    "hosted_zone_id": "Route 53 hosted zone ID",
    "dns_name": "the.record.to.update",
    "topic_arn": "SNS topic ARN to notify when there are problems",
    "alert_lock": "A file to write to show an alert has already been sent",
    "reflect_url": "https://api.jamesoff.net/reflect/v1"
}
{% endhighlight %}

The only parameter not described above is the `alert_lock` - this is a file the script will create when it sends an alert, so that it only alerts once when there's a problem, not every time it runs. Once it successfully updates your IP again, it removes the file so that the next failure generates an alert. I use `/tmp/autodns_alert.lock`.

* Install the configuration file in `/usr/local/etc/autodns.json`. If you don't want to put it there, put it somewhere else, and pass the path to it as the first parameter to the script when you run it.
* Ensure you have the [requests](http://docs.python-requests.org/en/latest/) and AWS boto 2 Python libraries installed. You can use `pip install -r requirements.txt` to do that.
* Put the AWS credentials for the IAM user you created somewhere Boto will find them. You can put them in `~/.boto` if you're using a dedicated user to run the script, or you could use a wrapper script which sets the values in the environment.
* Run the script as a test. It only outputs something if there's a problem. If it doesn't need to change the DNS entry, or successfully changes it, there will be no output.
* Assuming it's working OK, create a cronjob to run the script at suitable intervals - say, every 5 or 10 minutes:

  `*/5 * * * * /path/to/python /path/to/autodns.py [/optionally/path/to/config.json]`

Note that autodns does not need to run as a privileged user.

## CloudFormation Template

In the code repo you can find `cloudformation.json` which is a [CloudFormation](http://aws.amazon.com/cloudformation) template which will create the DNS entry (in an existing zone), the SNS topic, and the IAM user & access keys for the script to use (i.e. the first three steps above). You will need to subscribe yourself to the SNS topic after creating the stack.

## Improvements and feedback

* At the moment, IPv6/AAAA records are not supported, mainly because my connection does not have IPv6.
* It would be nice if Lambda could host the reflection API so that it didn't need a server, but I couldn't see that it's able to give the code the client IP (from API Gateway).
* It should probably use boto3

Pull requests are welcome :)
