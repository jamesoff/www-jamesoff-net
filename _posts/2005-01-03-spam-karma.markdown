---
layout: post
status: publish
published: true
title: Spam Karma
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 181
wordpress_url: http://jamesoff.net/site/2005/01/03/spam-karma/
date: '2005-01-03 01:45:23 -0500'
date_gmt: '2005-01-03 00:45:23 -0500'
categories:
- Coding
- Spam
- RBL
tags: []
comments: []
---
<p>Tonight I finally installed <a href="http:&#47;&#47;unknowngenius.com&#47;blog&#47;wordpress&#47;spam-karma&#47;">Spam Karma<&#47;a>, Dr Dave's excellent spam killing plugin which uses my RBL(Realtime Blacklist) as part of its lookups. I must say, I'm impressed (more impresesd than I was just reading the description of it on his webpage).</p>
<p>Tomorrow I shall see about sitting down and adding support for submitting to the RBL to it, so that if it decides a comment is spam it will submit the relavent information (IP, URLs)  to the RBL. At the moment, IPs can be added by anyone who gets in touch with me for the details but URLs have to be added by me by hand, and for that to work I have to go through the logs looking for spammers.</p>
<p>Auto-submission will make the whole thing hopefully work a lot better. The number of lookups being done on the RBL suggest quite a large install base of SK now so I can rely on data submitted by a large number of people being worthy of inclusion in the RBL. All I need to do is polish up the code a bit so as to allow me better handling of potential abuse (e.g. if a spammer were to try to fill the RBL with useless data so noone would trust it). Other RBLs have to survive this sort of potential problem so I'm sure I can sort something out.</p>
