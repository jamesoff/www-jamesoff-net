---
layout: post
status: publish
published: true
title: gallery integration test
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 240
wordpress_url: http://jamesoff.net/site/2006/08/31/gallery-integration-test/
date: '2006-08-31 19:36:20 -0400'
date_gmt: '2006-08-31 18:36:20 -0400'
categories:
- Coding
- Sites
tags: []
comments:
- id: 1427
  author: Daniel
  author_email: dan@durrans.com
  author_url: http://www.durrans.com
  date: '2006-09-01 10:22:36 -0400'
  date_gmt: '2006-09-01 09:22:36 -0400'
  content: Fantastic I shall have to try0r this.
---
<p>so this should be humphrey:<br />
<wpg2>scratch&#47;humphrey.png<&#47;wpg2></p>
<p>and this should be the wedding album:<br />
<wpg2>wedding&#47;<&#47;wpg2></p>
<p>hooray, it works! the [WPG2](http:&#47;&#47;wpg2.galleryembedded.com&#47;index.php) plugin seems to be working fine. All I needed to do was adjust it slightly because it insisted on embedding Gallery in my blog, which isn't what I wanted.</p>
<p>I fixed it with a mod_rewrite rule in `.htaccess`:</p>
<p>    RewriteEngine On<br />
    RewriteBase &#47;<br />
    RewriteRule ^(v&#47;.+) http:&#47;&#47;gallery.jamesoff.net&#47;$1 [R,L]</p>
<p>which just redirects gallery-type URLs here to the correct URL (needs to go above the other WPG2 stuff in .htaccess). Not sure if I need the R flag in there or not, but it works so I'll leave it.</p>
