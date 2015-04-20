---
layout: post
status: publish
published: true
title: RBL updates
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 178
wordpress_url: http://jamesoff.net/site/2004/12/06/rbl-updates/
date: '2004-12-06 01:12:59 -0500'
date_gmt: '2004-12-06 00:12:59 -0500'
categories:
- Spam
- RBL
tags: []
comments:
- id: 789
  author: dr Dave
  author_email: drdave@unknowngenius.com
  author_url: http://unknowngenius.com/blog/
  date: '2004-12-09 04:22:25 -0500'
  date_gmt: '2004-12-09 03:22:25 -0500'
  content: |-
    Ha! Sorry, I forgot to post you a note... indeed, SK now supports RBL and uses your server in its default list! Great work, thanks!

    Regarding URL submission: I had gathered all RBL servers supported URLs along with IP so figured I might as well submit both to each server. If you think it's a good idea, I can probably make them separate...
---
<p>It looks like some blog anti-spam systems are sending URL requests to <a href="http:&#47;&#47;rbl.jamesoff.net">rbl.jamesoff.net<&#47;a>, so I've switched RBL daemon from rbldns (in djbdns) to <a href="http:&#47;&#47;www.corpit.ru&#47;mjt&#47;rbldnsd.html">rbldnsd<&#47;a>, which supports names in the RBL zone.</p>
<p>At the moment there is no automagical submission for names, so I'll have to come up with a way of handling that. For now I'll just hand-pick them when they spam my blog or if I spot enormous numbers of queries against them in the RBL logs.</p>
<p>I'm pleased to announce that <a href="http:&#47;&#47;unknowngenius.com&#47;blog&#47;archives&#47;2004&#47;11&#47;19&#47;spam-karma-merciless-spam-killing-machine&#47;">Spam Karma<&#47;a>, an uber anti-spam plugin for WP does RBL lookups against my RBL, hooray :)</p>
