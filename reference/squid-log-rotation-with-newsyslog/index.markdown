---
layout: page
status: publish
published: true
title: Squid log rotation with newsyslog
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 304
wordpress_url: http://jamesoff.net/site/reference/squid-log-rotation-with-newsyslog/
date: '2007-12-07 14:45:01 -0500'
date_gmt: '2007-12-07 14:45:01 -0500'
categories:
- Uncategorized
tags: []
comments:
- id: 91137
  author: Askon
  author_email: sndm@rfm.dn.ua
  author_url: http://www.info-tour.net
  date: '2012-02-28 20:27:30 -0500'
  date_gmt: '2012-02-28 20:27:30 -0500'
  content: "<p>Only one string in syslog.conf is enough: \n&#47;usr&#47;local&#47;squid&#47;logs&#47;*.log
    squid:squid    644     7       *       @T00     GZB      &#47;var&#47;run&#47;squid&#47;squid.pid
    \       30<&#47;p>\n"
- id: 119773
  author: JR
  author_email: jr@jrssite.com
  author_url: ''
  date: '2013-06-06 10:41:35 -0400'
  date_gmt: '2013-06-06 10:41:35 -0400'
  content: |
    <p>Your instructions were useful, but slightly incomplete in my environment. It looks like somewhere back ~2.6 area squid started rotating cache.log independently of access.log with the logfile_rotate=0 directive. For me this resulted in an uncompressed default squid rotation of cache.log in addition to what newsyslog was doing.<&#47;p>

    <p>The fix is to add "rotate=0" to the debug_options directive in the squid.conf. My squid.conf has a line that reads like the following to solve the problem:<&#47;p>

    <p>debug_options ALL,1 rotate=0<&#47;p>

    <p>Otherwise, great write-up, thanks.<&#47;p>
---
<p>Getting [squid](http:&#47;&#47;www.squid-cache.org) logs rotated in a competent fashion seems to be poorly documented and took me several attempts to get right without ending up with random 0 byte log files.</p>
<p>Here's my recipe to get your squid log files rotated once per day, holding seven day's history (as well as today's in-progress log).</p>
<p>These are written for `newsyslog(8)` on FreeBSD. If you're using `logrotate` then you'll have to write your own configuration, but the `squid.conf` changes will still apply to you (probably).</p>
<p>Here's what to put in your `&#47;etc&#47;newsyslog.conf`.</p>
<pre line="0">&#47;usr&#47;local&#47;squid&#47;logs&#47;access.log squid:squid    644     7       *       @T00     ZB      &#47;var&#47;run&#47;squid&#47;squid.pid        30<br />
&#47;usr&#47;local&#47;squid&#47;logs&#47;cache.log squid:squid     644     7       *       @T00     ZB      &#47;var&#47;run&#47;squid&#47;squid.pid        30<br />
&#47;usr&#47;local&#47;squid&#47;logs&#47;store.log squid:squid     644     7       *       @T00     ZB      &#47;var&#47;run&#47;squid&#47;squid.pid        30<&#47;pre></p>
<p>You **must** check that your `squid.pid` is in `&#47;var&#47;run&#47;squid` - if it's not then change the path on each line. It may be in `&#47;usr&#47;local&#47;squid`. (Or change the `pid_filename` option in squid.conf.)</p>
<p>If you want more than seven day's history, change the "7". </p>
<p>`ZB` compresses the logs with gzip and prevents newsyslog from writing the "log rotated" header in the new file. Finally, the `30` is the signal (USR1) we need to send squid to make it reopen the logfiles.</p>
<p>Now open up your `squid.conf` and set `logfile_rotate` to 0.</p>
<p>That's it. You can check what newsyslog will do (without actually doing it) with `newsyslog -nvF`.</p>
<pre>
# ls -l &#47;usr&#47;local&#47;squid&#47;logs&#47;<br />
total 37220<br />
-rw-r--r--  1 squid  squid   9966165 Dec  7 14:43 access.log<br />
-rw-r--r--  1 squid  squid   2218363 Dec  6 23:57 access.log.0.gz<br />
-rw-r--r--  1 squid  squid   1592815 Dec  5 23:59 access.log.1.gz<br />
-rw-r--r--  1 squid  squid   2062851 Dec  4 23:59 access.log.2.gz<br />
-rw-r--r--  1 squid  squid   1764973 Dec  3 23:59 access.log.3.gz<br />
...<br />
<&#47;pre></p>
