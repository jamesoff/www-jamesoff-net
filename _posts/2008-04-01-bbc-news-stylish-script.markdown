---
layout: post
status: publish
published: true
title: BBC News Stylish script
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
excerpt: "The new <a href=\"http:&#47;&#47;news.bbc.co.uk\">BBC News<&#47;a> layout
  seems to be causing some people to stress out a bit - but then all new redesigns
  do until they get used to them. I quite like it, but for a friend I knocked this
  up quickly to get rid of the two banners across the top of the page.\r\n\r\nYou'll
  need <a href=\"http:&#47;&#47;userstyles.org&#47;stylish&#47;\">Stylish<&#47;a>
  and then stick this in a userscript for it. You may need to adjust the domain (2nd
  line) if you don't use `news.bbc.co.uk` to access the site.\r\n\r\n"
wordpress_id: 341
wordpress_url: http://jamesoff.net/site/?p=341
date: '2008-04-01 10:02:13 -0400'
date_gmt: '2008-04-01 10:02:13 -0400'
categories:
- Coding
- internets
tags:
- stylish
- css
- design
comments: []
---
<p>The new <a href="http:&#47;&#47;news.bbc.co.uk">BBC News<&#47;a> layout seems to be causing some people to stress out a bit - but then all new redesigns do until they get used to them. I quite like it, but for a friend I knocked this up quickly to get rid of the two banners across the top of the page.</p>
<p>You'll need <a href="http:&#47;&#47;userstyles.org&#47;stylish&#47;">Stylish<&#47;a> and then stick this in a userscript for it. You may need to adjust the domain (2nd line) if you don't use `news.bbc.co.uk` to access the site.</p>
<p><a id="more"></a><a id="more-341"></a></p>
<pre lang="css">
@namespace url(http:&#47;&#47;www.w3.org&#47;1999&#47;xhtml);</p>
<p>@-moz-document domain("news.bbc.co.uk") {</p>
<p>#blq-displayoptions, #blq-accessibility-help, #blq-mast {<br />
  display: none !important;<br />
}</p>
<p>.newsbanner {<br />
  display: none !important;<br />
}<br />
}<br />
<&#47;pre></p>
<p>The first block (`#blq-displayoptions` et al) is for the grey banner; the second block is for the red BBC News one.</p>
