---
layout: post
status: publish
published: true
title: Wordpress Anti-spam RBL checker
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 169
wordpress_url: http://jamesoff.net/site/2004/09/14/wordpress-anti-spam-rbl-checker/
date: '2004-09-14 12:54:45 -0400'
date_gmt: '2004-09-14 11:54:45 -0400'
categories:
- Coding
- General
- Spam
tags: []
comments:
- id: 371
  author: Matt
  author_email: m@mullenweg.com
  author_url: http://photomatt.net/
  date: '2004-09-14 13:58:38 -0400'
  date_gmt: '2004-09-14 12:58:38 -0400'
  content: Which hook are you using?
- id: 372
  author: JamesOff
  author_email: james@jamesoff.net
  author_url: http://www.jamesoff.net
  date: '2004-09-14 14:02:26 -0400'
  date_gmt: '2004-09-14 13:02:26 -0400'
  content: |-
    I hooked <code>comment_post<&#47;code>. I was hoping if I <code>return<&#47;code>ed without a parameter, or with a blank string then WP would stop processing things like sending mail. Failing that I might consider hacking WP to do that myself :)
    I didn't get round to looking to see if there was a suitable hook for hiding the comments form, as I was writing this on my lunch break :P
- id: 373
  author: Gecko Bloggle &raquo; RBL for Comment Spam In Wordpress
  author_email: ''
  author_url: http://www.geckotemple.com/blog/index.php?p=87613769
  date: '2004-11-10 08:41:41 -0500'
  date_gmt: ''
  content: "[...] nt Spam, but his comments are&#8230; clo-&#8230; oh, right. \t<a
    href=\"JamesOff.net\" target=\"_blank\">http:&#47;&#47;www.grooblehonk.co.uk&#47;archives&#47;2004&#47;09&#47;14&#47;wordpress-anti-spam-rbl-checker<&#47;a>
    has a Wordpress Anti-Spam RBL checker:  \tI have written a Wordpre [...]"
- id: 374
  author: John
  author_email: jburton@geckotemple.com
  author_url: http://www.geckotemple.com/blog
  date: '2004-11-10 09:43:09 -0500'
  date_gmt: '2004-11-10 08:43:09 -0500'
  content: Want some, uh, "Beta Testers" for your product mentioned above?  I'd be
    more than happy to try it out.
- id: 375
  author: Gecko Bloggle
  author_email: ''
  author_url: http://www.geckotemple.com/blog/index.php?p=87613769
  date: '2004-11-10 09:43:40 -0500'
  date_gmt: '2004-11-10 08:43:40 -0500'
  content: |-
    <strong>RBL for Comment Spam In Wordpress<&#47;strong>
    Well, I was going to make this a comment to Hugh's rant about comment Spam, but his comments are... clo-... oh, right.

    http:&#47;&#47;www.grooblehonk.co.uk&#47;archives&#47;2004&#47;09&#47;14&#47;wordpress-anti-spam-rbl-checker has a Wordpress Anti-Spam RBL checker:

    I hav...
---
<p>I have written a <a href="http:&#47;&#47;wiki.wordpress.org&#47;Plugin" title="Plugin information" &#47;>Wordpress plugin<&#47;a> which checks the IP of the poster and deletes their comment immediately when it is added if it is listed in an RBL (like <a href="http:&#47;&#47;www.spamcop.net">spamcop<&#47;a> or <a href="http:&#47;&#47;www.spamhaus.org">spamhaus<&#47;a>.</p>
<p>Unfortunately WP still generates the email saying the comment was added, I'm not sure if I can stop that. An alternative might be to prevent users with RBLed IPs from being able to access the comments form, but if they still try to hit the <code>wp-comments.php<&#47;code> file directly I'm not sure if I can hook it that early.</p>
<p>If the plugin seems to work OK I'll release it later :)</p>
