---
layout: page
status: publish
published: true
title: windowtidy
author:
  display_name: Administrator
  login: admin
  email: james-wpadmin@jamesoff.net
  url: ''
author_login: admin
author_email: james-wpadmin@jamesoff.net
wordpress_id: 35
wordpress_url: http://jamesoff.net/site/projects/irssi-scripts/windowtidy/
date: '2007-04-26 10:02:34 -0400'
date_gmt: '2007-04-26 11:02:34 -0400'
categories:
- Uncategorized
tags: []
comments:
- id: 13390
  author: Mark
  author_email: znxster@gmail.com
  author_url: http://kutzooi.co.uk/
  date: '2008-08-18 12:27:13 -0400'
  date_gmt: '2008-08-18 12:27:13 -0400'
  content: |
    <p>Yet another useful script. Thanks!<&#47;p>
- id: 39391
  author: Chris Jones
  author_email: cmsj@tenshu.net
  author_url: http://www.tenshu.net/
  date: '2009-08-10 13:47:47 -0400'
  date_gmt: '2009-08-10 13:47:47 -0400'
  content: |
    <p>Outstandingly useful script! One tiny thing, I modified it to s&#47;windowtidy&#47;tidywindow&#47;g so it wouldn't clash with the &#47;window command so I can still use &#47;win :)<&#47;p>
- id: 120145
  author: Phalanx GmbH
  author_email: spam@console.cc
  author_url: https://www.phalanx.at/
  date: '2013-06-11 15:21:24 -0400'
  date_gmt: '2013-06-11 15:21:24 -0400'
  content: |
    <p>I spent a lof of time closing all the empty windows after a restart, thank you!<&#47;p>

    <p>Very useful script!<&#47;p>
---
<p>I got bored of having 8 billion windows open in my irssi for various queries that got caught up in various `&#47;layout save`s and wotnot, so having gotten query.pl to nuke spare queries I knocked up this script which closes any window that doesn't have an item (i.e. a channel or a query) in it and doesn't have a name (which protects windows with with processes like telnet executing inside them, and windows for ho_reformat output).</p>
<p>Load it up with `&#47;script load windowtidy` and then just `&#47;windowtidy` to clean up :)</p>
<p>Download <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2007&#47;12&#47;windowtidy.pl' title='Windowtidy irssi script'>Windowtidy irssi script<&#47;a> and stick in `~&#47;.irssi&#47;scripts`</p>
