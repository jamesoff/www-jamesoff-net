---
layout: page
status: publish
published: true
title: SimpleMonitor
author:
  display_name: Administrator
  login: admin
  email: james-wpadmin@jamesoff.net
  url: ''
author_login: admin
author_email: james-wpadmin@jamesoff.net
wordpress_id: 37
wordpress_url: http://jamesoff.net/site/projects/simplemonitor/
date: '2007-11-27 16:49:36 -0500'
date_gmt: '2007-11-27 16:49:36 -0500'
categories:
- Uncategorized
tags: []
comments:
- id: 4258
  author: Jon.T
  author_email: jont@ninelocks.com
  author_url: http://www.ninelocks.com
  date: '2008-02-27 17:53:57 -0500'
  date_gmt: '2008-02-27 17:53:57 -0500'
  content: |
    <p>Cheers James, saves me re-inventing the wheel yet again....<&#47;p>
- id: 64898
  author: links for 2010-06-24 | andy.edmonds.be
  author_email: ''
  author_url: http://andy.edmonds.be/2010/06/links-for-2010-06-24/
  date: '2010-06-25 00:06:15 -0400'
  date_gmt: '2010-06-25 00:06:15 -0400'
  content: |
    <p>[...] jamesoff.net &Acirc;&raquo; SimpleMonitor (tags: python linux monitoring monitor) [...]<&#47;p>
- id: 81125
  author: Ian E
  author_email: ian@epperson.com
  author_url: ''
  date: '2011-09-14 04:19:41 -0400'
  date_gmt: '2011-09-14 04:19:41 -0400'
  content: |
    <p>Thanks for publishing this.  I started hacking on it today as I need a monitoring script to handle specialized home control systems.  I've done some general updates you may be interested in - most notably adding a "notes" field which shows as a popup over the status indicator on each line to give a bit more detail about what succeeded or failed.  Hopefully before the week is out, I'll have it handling groups of devices so different sites' devices are shown together.<&#47;p>
- id: 83218
  author: Brian S
  author_email: brian@snipes.org
  author_url: ''
  date: '2011-11-07 20:06:04 -0500'
  date_gmt: '2011-11-07 20:06:04 -0500'
  content: |
    <p>Thanks for your python monitoring script. Just implemented today and it is way better than the simple one I made a couple of years ago.<&#47;p>
- id: 123899
  author: ku
  author_email: kuweixiong@gmail.com
  author_url: ''
  date: '2013-08-06 14:17:31 -0400'
  date_gmt: '2013-08-06 14:17:31 -0400'
  content: |
    <p>when i try to run in fedora , it say no section monitor.<&#47;p>
- id: 128008
  author: corn
  author_email: corncrake@gmail.com
  author_url: ''
  date: '2013-09-26 14:42:32 -0400'
  date_gmt: '2013-09-26 14:42:32 -0400'
  content: |
    <p>Hi James,<&#47;p>

    <p>Can you give some guidance on integrating the sqlite db and the html page<&#47;p>

    <p>Thanks corn<&#47;p>
- id: 131014
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://jamesoff.net
  date: '2013-11-11 05:08:34 -0500'
  date_gmt: '2013-11-11 05:08:34 -0500'
  content: |
    <p>I'm afraid I can't, it's been a long time since I wrote that code!<&#47;p>

    <p>I don't use the SQLite backend myself, I just have it output the HTML, and send me alerts by email and SMS. If you have something specific about the setup you want to know, you can email me :)<&#47;p>
- id: 131501
  author: Free tools | Lucas Rolff
  author_email: ''
  author_url: http://www.lucasrolff.com/random/free-tools/
  date: '2013-11-18 15:15:13 -0500'
  date_gmt: '2013-11-18 15:15:13 -0500'
  content: |
    <p>[&#8230;] SimpleMonitor&Acirc;&nbsp;- SimpleMonitor is a small amount of python scripts, that you can run on your server, you&#8217;ll be able to monitor all the servers you want, using ping, TCP, service monitoring, HTTP Monitoring and even APC UPS monitoring. You can do things like tolerance, so it needs multiple failures before it will report downtime. [&#8230;]<&#47;p>
---
<p>SimpleMonitor is a [Python](http:&#47;&#47;www.python.org) script which monitors hosts and network connectivity. It is designed to be quick and easy to set up and lacks complex features that can make things like Nagios, OpenNMS and Zenoss overkill for a small business or home network. Remote monitor instances can send their results back to a central location.</p>
<p>SimpleMonitor supports:</p>
<p> * Ping monitoring (is a host pingable?)<br />
 * TCP monitoring (is a host listening on a TCP port?)<br />
 * Service monitoring (is a Windows service running?)<br />
 * 'rc' monitoring (is a FreeBSD service running?) This monitor can probably be used for non-FreeBSD rc scripts, but I haven't tested it.<br />
 * Disk space monitoring<br />
 * daemontools service monitoring<br />
 * HTTP monitoring (is a URL fetchable without error? Optionally, does the page content it match a regular expression?)<br />
 * APC UPS monitoring (requires apcupsd to be installed and configured)</p>
<p>Adding more monitor types is quite simple if you are able to code in Python.</p>
<p>Logging and alerting options are:</p>
<p> * Writing the state of each monitor at each iteration to a SQLite database (i.e. a history of results)<br />
 * Maintaining a snapshot of the current state of the monitors in a SQLite database<br />
 * Sending an email alert when a monitor fails, and when it recovers<br />
 * Writing a log file of all successes and failures, or just failures<br />
 * Sending a text message via BulkSMS (subscription required)<br />
 * Writing an HTML status page.<br />
 * Writing an entry to the syslog (non-Windows only)</p>
<p>Again, adding more logging&#47;alerting methods is simply a case of writing some Python.</p>
<p>SimpleMonitor also features:</p>
<p> * *Simple configuration file format*: it's a standard INI file for the overall configuration and another for the monitor definitions<br />
 * *Dependencies*: Monitors can be declared as depending on the success of others. If a monitor fails, its dependencies will be skipped until it succeeds.<br />
 * *Tolerance*: Monitors checking things the other side of unreliable links or which have many transient failures can be configured to require their test to fail a number of times in a row before they report a problem.<br />
 * *Escalation* of alerts: Alerters can be configured to require a monitor to fail a number of times in a row (after its tolerance limit) before they fire, so alerts can be sent to additional addresses or people.<br />
 * *Urgency*: Monitors can be defined as non-urgent so that urgent alerting methods (like SMS) are not wasted on them.<br />
 * *Per-host monitors*: Define a monitor which should only run on a particular host and all other hosts will ignore it - so you can share one configuration file between all your hosts.<br />
 * *Monitor gaps*: By default every monitor polls every interval (e.g. 60 seconds). Monitors can be given a gap between polls so that they only poll once a day (for example).<br />
 * *Alert periods*: Alerters can be configured to only alert during certain times and&#47;or on certain days...<br />
 * *Alert catchup*: ...and also to alert you to a monitor which failed when they were unable to tell you. (For example, I don't want to be woken up overnight by an SMS, but if something's still broken I'd like an SMS at 7am as I'm getting up.)<br />
 * *Remote monitors*: An instance running on a remote machine can send its results back to a central instance for logging and alerting.</p>
<p>Getting started<br />
--</p>
<p> * Download the code: <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2008&#47;03&#47;simplemonitor-14tar.bz2' title='Simple Monitor v.14'>Simple Monitor v1.4<&#47;a><br />
 * Write your [configuration files](.&#47;configuration)<br />
 * Run the code</p>
<p>Running SimpleMonitor<br />
--</p>
<p> * `python monitor.py`</p>
<p>That was easy.</p>
<p>If you want to hide all output except errors, use the `-q` option. If you want more verbose blah about what's happening, use `-v`.</p>
<p>On non-Windows, SimpleMonitor runs very nicely under [daemontools](http:&#47;&#47;cr.yp.to&#47;daemontools.html). You just need a `run` file a bit like this:</p>
<pre lang="bash">
#!&#47;bin&#47;sh</p>
<p>cd &#47;usr&#47;local&#47;monitor && exec &#47;usr&#47;local&#47;bin&#47;python monitor.py -q<br />
<&#47;pre></p>
<p>On Windows hosts, you'll have to leave it running in a Command Prompt for now; I haven't gotten round to making it run as a service.</p>
<p>For help on (the scarce) command line options, run `python monitor.py -h`.</p>
<p>Licence<br />
--</p>
<p>SimpleMonitor is released under the BSD licence.</p>
<p>History<br />
--</p>
<p>See the [changelog](.&#47;history).</p>
<p>Future<br />
--</p>
<p>I have a <a href=".&#47;planned-features">TODO<&#47;a> list.</p>
