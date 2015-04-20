---
layout: post
status: publish
published: true
title: QuoteEngine security fix
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 153
wordpress_url: http://jamesoff.net/site/2004/03/30/quoteengine-security-fix/
date: '2004-03-30 22:41:37 -0500'
date_gmt: '2004-03-30 21:41:37 -0500'
categories:
- Coding
tags: []
comments:
- id: 311
  author: sloth
  author_email: ''
  author_url: ''
  date: '2004-04-09 00:29:49 -0400'
  date_gmt: '2004-04-08 23:29:49 -0400'
  content: ahahaha your code sucks
- id: 312
  author: greeneyez
  author_email: ''
  author_url: http://www.greeneyez.co.uk/index.php?p=100
  date: '2004-04-11 23:46:07 -0400'
  date_gmt: '2004-04-11 22:46:07 -0400'
  content: |-
    <strong>Total Idiots<&#47;strong>
    Some people are total dicks.

    In my view, tiny mistakes of minimal importance do not overshadow the infinitesimally exceptional achievement of James' work.
- id: 313
  author: dubkat
  author_email: dubkat@dubkat.org
  author_url: http://www.dubkat.org/
  date: '2004-09-05 07:35:14 -0400'
  date_gmt: '2004-09-05 06:35:14 -0400'
  content: this is a kickass script that OWNZ all other quote scripts... Regardless
    of the exploit which has been promptly fixed.
---
<p>If you use the QuoteEngine, please grab <a href="https:&#47;&#47;sourceforge.net&#47;project&#47;showfiles.php?group_id=71518&package_id=89997&release_id=227554">1.20<&#47;a> which fixes a SQL injection vulnerability in a couple of functions. Luckily, with the default setup, users had to be known by your bot and be either +o or +v to be able to exploit it.</p>
<p>1.2.0 also adds a new stylesheet and layout for the webpage by dubkat</p>
<p>While I'm happy to hold up my hands and say that I was at fault here, it's kind of disheartening to have someone sit and slag off your entire coding ability due to one mistake, like the guy who found this did. In fact, he tried to exploit it on several bots before even telling me he'd found it. Ah well, welcome to the real world I guess.</p>
