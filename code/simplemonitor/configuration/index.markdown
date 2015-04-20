---
layout: page
status: publish
published: true
title: Configuration
author:
  display_name: Administrator
  login: admin
  email: james-wpadmin@jamesoff.net
  url: ''
author_login: admin
author_email: james-wpadmin@jamesoff.net
wordpress_id: 38
wordpress_url: http://jamesoff.net/site/projects/simplemonitor/configuration/
date: '2007-11-27 17:22:22 -0500'
date_gmt: '2007-11-27 17:22:22 -0500'
categories:
- Uncategorized
tags: []
comments: []
---
<p>The main configuration lives in `monitor.ini` in the same directory as the code.</p>
<p>Section names are lowercase in square brackets. Settings are defined as `key=value`. Lines can be commented with `#`.</p>
<p>Monitor section<br />
---</p>
<p> * **interval** defines how many seconds to wait between running all the monitors. Note that the time taken to run the monitors is not subtracted from the interval, so the next iteration will run at `interval + time_to_run_monitors` seconds. Required; no default.</p>
<p> * **monitors** defines the filename to load the monitors themselves from. Not required; default is `monitors.ini`.</p>
<p> * **pidfile** gives a path to write a pidfile in. Not required; default is none.</p>
<p> * **remote** enables the listener for receiving data from remote instances. Set to 1 to enable. Not required; default is 0 (disabled).</p>
<p> * **remote_port** gives the port to listen on for data. Required if **remote** is enabled, otherwise ignored. No default.</p>
<p>Reporting section<br />
---</p>
<p> * **loggers** lists (comma-separated, no spaces) the names of the loggers you have defined. (You can define loggers and not add them to this settings.) Not required; no default.</p>
<p> * **alerters** lists the names of the alerters you have defined. Not required; no default.</p>
<p>If you do not define any loggers or alerters, then the only way to monitor the status of your network will be to watch the window the script is running in!</p>
<p> * <a href="defining-loggers&#47;">Defining loggers<&#47;a><br />
 * <a href="defining-alerters&#47;">Defining alerters<&#47;a></p>
<p>Monitors<br />
---</p>
<p>Monitors go in `monitors.ini` (or another file, if you changed the **monitors** setting above).</p>
<p> * <a href="defining-monitors&#47;">Defining monitors<&#47;a></p>
<p>Example configuration<br />
--</p>
<p>Let's have a look at an example configuration.</p>
<p>Here's `monitor.ini`:</p>
<pre lang="ini">
[monitor]<br />
interval=60</p>
<p>[reporting]<br />
loggers=logfile<br />
alerters=email,email_escalate,sms</p>
<p>[logfile]<br />
type=logfile<br />
filename=monitor.log<br />
only_failures=1</p>
<p>[email]<br />
type=email<br />
host=mailserver.domain.local<br />
from=monitor@domain.local<br />
to=administrator@domain.local</p>
<p>[email_escalate]<br />
type=email<br />
host=mailserver.domain.local<br />
from=monitor@domain.local<br />
to=boss@domain.local<br />
limit=5</p>
<p>[sms]<br />
type=bulksms<br />
username=some_username<br />
password=some_password<br />
target=some_mobile_number<br />
limit=10<br />
<&#47;pre></p>
<p>What does this configuration do? Firstly, it only polls every minute. It has one logger, writing a logfile, and three alerters - two emails and one SMS.</p>
<p>The logfile is written to `monitor.log` and only contains failures.</p>
<p>An email is sent to administrator@domain.local when a monitor fails. After a monitor has failed another four times, an email is sent to my boss. After it's failed another five times (for a total of ten), I get an SMS.</p>
<p>Now we need to write our `monitors.ini`:</p>
<pre lang="ini">
[london-ping]<br />
type=host<br />
host=london-vpn-endpoint.domain.local<br />
tolerance=2</p>
<p>[london-server]<br />
type=host<br />
host=london-server.domain.local<br />
tolerance=2<br />
depend=london-ping</p>
<p>[website-http]<br />
type=http<br />
url=http:&#47;&#47;www.domain.local<br />
urgent=0<br />
gap=300</p>
<p>[webmail-http]<br />
type=http<br />
url=http:&#47;&#47;webmail.domain.local<br />
allowed_codes=401</p>
<p>[local-diskspace]<br />
type=diskspace<br />
partition=&#47;spool<br />
limit=500M</p>
<p>[local-exim]<br />
type=rc<br />
runon=mailserver.domain.local<br />
service=exim</p>
<p>[local-smtp]<br />
type=service<br />
runon=exchange.domain.local<br />
service=smtpsvc<br />
<&#47;pre></p>
<p>This is what it all means:</p>
<p> * A monitor called `london-ping` pings the endpoint of our VPN to the London office. This sometimes gets lost in transit even if the link is up, so the tolerance for this monitor is 2.<br />
 * We also ping `london-server`. As it's the other end of the VPN, we also give it a tolerance of 2. We declare that it depends on `london-ping`, so if the VPN is down we don't get additional alerts for `london-server`.<br />
 * Next we use an HTTP monitor to check our website is working. I don't need to be SMSed if it breaks, so we set it as not urgent. Also, we'll only check it every 5 minutes (300 seconds).<br />
 * We want to check our webmail interface is responding, but it needs authentication. We'll allow the HTTP error `401 Authentication Required` to count as success.<br />
 * We need to make sure the `&#47;spool` partition on this server always has at least 500MB of free space.<br />
 * We also want to make sure that exim is running on our FreeBSD server `mailserver.domain.local`. This monitor won't try to run anywhere else.<br />
 * Finally, we want to check the SMTP service is running on our Exchange server.</p>
<p>This example configuration contains several combinations of monitors you probably won't use on the same server - particularly a diskspace check for a mounted partition (not a drive letter) and a Windows service monitor. I just put them all together here as an example :)</p>
