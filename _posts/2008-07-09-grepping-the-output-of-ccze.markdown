---
layout: post
status: publish
published: true
title: grepping the output of ccze
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 356
wordpress_url: http://jamesoff.net/site/?p=356
date: '2008-07-09 13:46:34 -0400'
date_gmt: '2008-07-09 13:46:34 -0400'
categories:
- Sysadmin
- FreeBSD
tags:
- squid
- command line
comments:
- id: 45110
  author: matt
  author_email: logicwax@gmail.com
  author_url: ''
  date: '2009-09-30 20:17:28 -0400'
  date_gmt: '2009-09-30 20:17:28 -0400'
  content: |
    <p>hrmm....I'm still getting lumps (about one or two lines behind).<&#47;p>
- id: 181892
  author: fire tube boilers
  author_email: isidroleeper@live.com
  author_url: http://boilersandservice.com.au
  date: '2015-02-10 08:48:15 -0500'
  date_gmt: '2015-02-10 08:48:15 -0500'
  content: "<p>Greetings, There's no doubt that your blog may be having \ninternet
    browser compatibility issues. Whenever I take \na look at your website in Safari,
    it looks fine however when \nopening in I.E., it's got some overlapping issues.\nI
    just wanted to provide you with a quick heads up!\nAside from that, great website!<&#47;p>\n"
---
<p>If you ever want to grep the output of ccze and found it didn't work right, here's the magic incantation to do it:</p>
<pre lang="bash">tail somefile | ccze -A -o noscroll | grep ...<&#47;pre></p>
<p>`-A` makes ccze output ASCII sequences, and `-o noscroll` turns off the scroll option - whatever that is exactly. The man page says it's a good idea to turn it off if you're redirecting the output. Omitting it seems to make the output appear in lumps :)</p>
<p>For example, keep an eye on squid logs omitting all MSN crap:</p>
<pre lang="bash">tail -F access.log | ccze -A -C -o noscroll | grep -v gateway.dll<&#47;pre></p>
