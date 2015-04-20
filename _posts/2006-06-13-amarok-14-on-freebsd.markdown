---
layout: post
status: publish
published: true
title: amarok 1.4 on FreeBSD
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 235
wordpress_url: http://jamesoff.net/site/2006/06/13/amarok-14-on-freebsd/
date: '2006-06-13 12:29:45 -0400'
date_gmt: '2006-06-13 11:29:45 -0400'
categories:
- FreeBSD
tags: []
comments:
- id: 1413
  author: Legooolas
  author_email: jamesblog@icmfp.com
  author_url: ''
  date: '2006-06-14 00:01:20 -0400'
  date_gmt: '2006-06-13 23:01:20 -0400'
  content: |-
    "sudo gmail install"

    I assume that's a typo and that you were thinking about the lovelyness that is gmail, rather than the gmake command you probably meant  ;)
- id: 1414
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://www.jamesoff.net
  date: '2006-06-14 15:04:45 -0400'
  date_gmt: '2006-06-14 14:04:45 -0400'
  content: |-
    No, that's the awesome power of gmail!*

    (* Yes, whoops)
---
<p>Hooray, I got amarok 1.4 compiled and installed on FreeBSD 6.1.</p>
<p>To make it work I had to disable XMMS stuff and the MusicBrainz bits, but I don't use XMMS and MusicBrainz isn't too important to me.</p>
<p>If you want to make it work, you need to:</p>
<p><code>.&#47;configure --prefix=&#47;usr&#47;local --without-xmms --without-musicbrainz<&#47;code></p>
<p>Then:</p>
<p><code>rm libtool && ln -s &#47;usr&#47;local&#47;bin&#47;libtool .<&#47;code></p>
<p>Then:</p>
<p><code>gmake<&#47;code></p>
<p>And cross fingers.</p>
<p>Once it's compiled successfully (I hope), then just</p>
<p><code>sudo gmake install<&#47;code></p>
<p>I did this without pkg_delete'ing my amarok 1.3.9 install and it doesn't seem too upset - although it will complain about mismatched checksums when I do, I'm sure. Hopefully the time I do that will be to upgrade to 1.4 in ports though.</p>
