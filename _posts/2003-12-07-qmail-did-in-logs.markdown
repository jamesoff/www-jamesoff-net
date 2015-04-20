---
layout: post
status: publish
published: true
title: qmail &#8220;did&#8221; in logs
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 142
wordpress_url: http://jamesoff.net/site/2003/12/07/qmail-did-in-logs/
date: '2003-12-07 12:12:24 -0500'
date_gmt: '2003-12-07 11:12:24 -0500'
categories:
- General
tags: []
comments: []
---
<p>For a while now I've been trying to work out what the lines from qmail mean that look like this:</p>
<blockquote><p>2003-12-07 12:02:14.246897500 delivery 268: success: did_0+1+0&#47;qp_29761&#47;<&#47;blockquote><br />
Obviously the did_<i>n<&#47;i>+<i>n<&#47;i>+<i>n<&#47;i> means something about how qmail handled the delivery, but I couldn't find any documentation on it. Luckily, djb's code is nice and easy to read, so I can now tell you:</p>
<p>did_X+Y+Z&#47;qp_A&#47; tells you:</p>
<p>X = number of deliveries to files (i.e. qmail dropped the mail for you)<br />
Y = number of deliveries forwarded (i.e. qmail encountered a & line in .qmail)<br />
Z = number of deliveries to a program (i.e. qmail encountered a | line in .qmail)</p>
<p>The optional part qp_A tells you that the copy of qmail-queue that queued the forwarded message has process id A. This can be matched up with the lines</p>
<blockquote><p>2003-12-07 12:10:29.020770500 info msg 42336: bytes 2859 from < #@[]> qp 30314 uid 64010<&#47;><&#47;blockquote> to help track the new message. (Yes, I know that's a different qp, my logs scrolled :).</p>
