---
layout: post
status: publish
published: true
title: Rotate irssi logs?
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 77
wordpress_url: http://jamesoff.net/site/2003/01/09/rotate-irssi-logs/
date: '2003-01-09 13:59:20 -0500'
date_gmt: '2003-01-09 12:59:20 -0500'
categories:
- General
tags: []
comments: []
---
<p>Easy (on Debian, at least) :)<br &#47;><br />
<br &#47;><br />
Create a file "irssi" in &#47;etc&#47;logrotate.d with the following in:<br &#47;><br />
<br &#47;></p>
<blockquote><p><br &#47;><br />
&#47;home&#47;james&#47;irclogs&#47;*&#47;*.log {<br &#47;><br />
        #copy to new logfile and then 0-size the old one<br &#47;><br />
        #because irssi can't be told to restart log files<br &#47;><br />
        copytruncate<br &#47;><br />
<br &#47;><br />
        #weekly archives<br &#47;><br />
        weekly<br &#47;><br />
<br &#47;><br />
        #shouldn't be an issue with wildcards<br &#47;><br />
        missingok<br &#47;><br />
<br &#47;><br />
        #keep a week of logs<br &#47;><br />
        rotate 52<br &#47;><br />
<br &#47;><br />
        #yes!<br &#47;><br />
        compress<br &#47;><br />
<br &#47;><br />
        #don't compress the most recent log, but compress it on<br &#47;><br />
        #the next cycle (because I'm more likely to want to look<br &#47;><br />
        #at the most recent than any other)<br &#47;><br />
        delaycompress<br &#47;><br />
}<br &#47;><br />
<&#47;blockquote><br &#47;><br />
(Change the path in the first line to match your log directory layout; mine is ~&#47;irclogs&#47;ircnet_name&#47;*.log)<br &#47;></p>
