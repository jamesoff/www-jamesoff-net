---
layout: post
status: publish
published: true
title: Upgrading OpenEXR
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 318
wordpress_url: http://jamesoff.net/site/2008/01/09/upgrading-openexr/
date: '2008-01-09 09:38:11 -0500'
date_gmt: '2008-01-09 09:38:11 -0500'
categories:
- Sysadmin
- FreeBSD
tags:
- FreeBSD
- ports
- openexr
comments:
- id: 2812
  author: Colen
  author_email: colen@wolflair.com
  author_url: http://www.skrill.org/
  date: '2008-01-09 19:39:11 -0500'
  date_gmt: '2008-01-09 19:39:11 -0500'
  content: |
    <p>Install linux, problem solved<&#47;p>
- id: 3207
  author: Kevin Miller
  author_email: kevin.miller@saigonnezumi.com
  author_url: http://www.saigonnezumi.com
  date: '2008-01-29 23:32:24 -0500'
  date_gmt: '2008-01-29 23:32:24 -0500'
  content: |
    <p>Well, that was the easiest fix I found.  Thanks, openEXR finally compiled :-)<&#47;p>
- id: 3650
  author: Pedro7x
  author_email: pedro7x@hotmail.com
  author_url: ''
  date: '2008-02-13 00:32:32 -0500'
  date_gmt: '2008-02-13 00:32:32 -0500'
  content: |
    <p>Solved my problem.
    Thanks brother!
    :-]<&#47;p>
---
<p>While upgrading ports on Roz's desktop, I ran foul of this:</p>
<blockquote><pre>...<br />
generalInterfaceTiledExamples.o(.text+0x36f): In function `writeTiled1(char const*, Imf::Array2D<GZ>&, int, int, int, int)':<br />
: undefined reference to `Imf::Channel::Channel(Imf::PixelType, int, int, bool)'<br />
generalInterfaceTiledExamples.o(.text+0x3b3): more undefined references to `Imf::Channel::Channel(Imf::PixelType, int, int, bool)' follow<br />
gmake[1]: *** [imfexamples] Error 1<br />
gmake[1]: Leaving directory `&#47;usr&#47;work&#47;usr&#47;ports&#47;graphics&#47;OpenEXR&#47;work&#47;openexr-1.6.0&#47;IlmImfExamples'<br />
gmake: *** [all-recursive] Error 1<br />
*** Error code 2<&#47;pre><br />
<&#47;blockquote></p>
<p>Remembering that in `UPDATING` there was something about this, I had another look:</p>
<blockquote><pre>20071008:<br />
  AFFECTS: users of graphics&#47;OpenEXR and graphics&#47;ilmbase<br />
  AUTHOR: nork@FreeBSD.org<br />
...<br />
  # pkg_delete -f OpenEXR<br />
  # pkg_delete -f ilmbase       (if you already installed before CONFLICT)<br />
  # cd &#47;usr&#47;ports&#47;graphics&#47;OpenEXR<br />
  # make install<br />
  # pkgdb -F<&#47;pre><br />
<&#47;blockquote><br />
Nope, that didn't help. `pkg_delete` told me ilmbase wasn't installed. A quick Google turned up a [PR](http:&#47;&#47;www.freebsd.org&#47;cgi&#47;query-pr.cgi?pr=117071) about this, but it was closed with "look at UPDATING." so that didn't help any more.</p>
<p>I fixed it by rebuilding `graphics&#47;ilmbase` anyway. Once that was rebuild and reinstalled, OpenEXR built fine. No idea why `pkg_delete` didn't think it was installed.</p>
