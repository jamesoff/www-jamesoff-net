---
layout: post
status: publish
published: true
title: rtorrent problem
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 213
wordpress_url: http://jamesoff.net/site/2005/10/02/rtorrent-problem/
date: '2005-10-02 23:57:13 -0400'
date_gmt: '2005-10-02 22:57:13 -0400'
categories:
- General
tags: []
comments: []
---
<p>I had been using rtorrent recently on my FreeBSD machine, but after a portupgrade recently it broke. This evening I decided to have another look at it and ended up ktrace'ing it.</p>
<p>It seems the new version looked for a differently worded setting in the rc file, and was half-segfaulting on encountering the bad line. Fixing the name of the setting fixed the client, hooray!</p>
