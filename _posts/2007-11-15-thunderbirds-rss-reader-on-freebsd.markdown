---
layout: post
status: publish
published: true
title: Thunderbird&#8217;s RSS reader
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 301
wordpress_url: http://jamesoff.net/site/2007/11/15/thunderbirds-rss-reader-on-freebsd/
date: '2007-11-15 22:47:51 -0500'
date_gmt: '2007-11-15 21:47:51 -0500'
categories:
- internets
- Roz
- FreeBSD
tags: []
comments:
- id: 2192
  author: Daniel
  author_email: dan@durrans.com
  author_url: http://www.durrans.com
  date: '2007-11-16 08:30:04 -0500'
  date_gmt: '2007-11-16 07:30:04 -0500'
  content: "<p>I tried the thunderbird rss reader for a while but found that on busy
    feeds it was very easy to get overwhelmed with the number of posts. After resisting
    for a long time I turned to Google Reader and never looked back.<&#47;p>"
- id: 2193
  author: MattyT
  author_email: mat@traherne.net
  author_url: http://www.traherne.net
  date: '2007-11-16 11:01:59 -0500'
  date_gmt: '2007-11-16 10:01:59 -0500'
  content: "<p>Googlereader > *<&#47;p>"
- id: 2194
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://www.jamesoff.net
  date: '2007-11-16 15:35:31 -0500'
  date_gmt: '2007-11-16 14:35:31 -0500'
  content: |-
    <p>Indeed, I'm using Google Reader at the moment and I'm not having any problems with it particularly, it's just nice to have fixed something which annoyed me previously :)<&#47;p>

    <p>I shall probably be sticking with Google Reader as Thunderbird seems to get confused when you try to add many feeds to it and requires a restart before you can add any more.<&#47;p>
---
<p>Having previous tried getting Thunderbird to behave as an RSS reader on FreeBSD and failed (the option didn't show up on the Add Account wizard), Roz asked me today about getting it going.</p>
<p>A quick Google search this time lead me [to this post](http:&#47;&#47;www.nabble.com&#47;mail-thunderbird:-RSS-not-supported-in-FreeBSD-ports-build-t4532032.html) which gives the answer:</p>
<p><code>cp &#47;usr&#47;local&#47;lib&#47;thunderbird&#47;defaults&#47;isp&#47;rss.rdf &#47;usr&#47;local&#47;lib&#47;thunderbird&#47;isp&#47;rss.rdf<&#47;code></p>
<p>and suddenly it works!  :hellyeah:</p>
