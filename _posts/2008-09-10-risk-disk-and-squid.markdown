---
layout: post
status: publish
published: true
title: Risk Disk and Squid
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 357
wordpress_url: http://jamesoff.net/site/?p=357
date: '2008-09-10 15:06:18 -0400'
date_gmt: '2008-09-10 15:06:18 -0400'
categories:
- Sysadmin
- Work
- FreeBSD
tags:
- squid
- riskdisk
- http
comments:
- id: 40379
  author: Angela Parnham
  author_email: info@riskdisk.com
  author_url: http://www.riskdisk.com
  date: '2009-08-19 08:40:15 -0400'
  date_gmt: '2009-08-19 08:40:15 -0400'
  content: |
    <p>riskdisk is now available online at www.riskdisk.com as well as being easier to access riskdisk now offers hyper monitoring.<&#47;p>
- id: 64327
  author: Jure
  author_email: jure.sah@denia.si
  author_url: ''
  date: '2010-06-12 15:16:11 -0400'
  date_gmt: '2010-06-12 15:16:11 -0400'
  content: |
    <p>Thanks for this, helped me with uploading my GPG key from Thunderbird &#47; Enigmail, when Thunderbird is configured to use a Squid 2.7 proxy.<&#47;p>
---
<p>We use <a href="http:&#47;&#47;www.riskdisk.com&#47;">RiskDisk<&#47;a> at work to see if a company we're going to do business with is trustworthy, but recently it was complaining `HTTP Error 417: Expectation Failed` when it tried to do any online lookups.</p>
<p>I tracked this down to it sending `Expect: 100-continue` in the headers of the request it sent to its server. However, it was going via our web proxy at work, which is <a href="http:&#47;&#47;www.squid-cache.org&#47;">Squid<&#47;a>. Recently I upgraded Squid to 2.7, and this seems to be the cause of the problems. Squid 2.7 is less forgiving about that particular header (which is apparently an RFC violation on the part of the client).</p>
<p>It's easily fixed by adding `ignore_expect_100 on` to your Squid configuration.</p>
