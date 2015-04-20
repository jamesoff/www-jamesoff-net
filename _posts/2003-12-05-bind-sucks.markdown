---
layout: post
status: publish
published: true
title: BIND sucks
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 141
wordpress_url: http://jamesoff.net/site/2003/12/05/bind-sucks/
date: '2003-12-05 17:05:28 -0500'
date_gmt: '2003-12-05 16:05:28 -0500'
categories:
- General
tags: []
comments: []
---
<p>I recently encountered a problem with <a href="http:&#47;&#47;morettoni.net&#47;qmail-rblchk.en.html">qmail-rblchk<&#47;a> where it would segfault after matching an address in an email. I emailed the author the email and the log, and he couldn't reproduce the problem. I tried again, and I couldn't reproduce the problem either.</p>
<p>So what changed?</p>
<p>I installed <a href="http:&#47;&#47;cr.yp.to&#47;djbdns.html">djbdns<&#47;a> to replace my BIND server, which was handling my DNS cache. It would appear some problem in BIND was corrupting the reply from the RBL, because the response line had some bizarre characters on the end of it. Those characters are not present in the response when using dnscache.</p>
