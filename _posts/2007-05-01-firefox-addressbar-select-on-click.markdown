---
layout: post
status: publish
published: true
title: Firefox Addressbar Select-on-click
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 290
wordpress_url: http://jamesoff.net/site/2007/05/01/firefox-addressbar-select-on-click/
date: '2007-05-01 11:33:48 -0400'
date_gmt: '2007-05-01 10:33:48 -0400'
categories:
- Sysadmin
- FreeBSD
- Linux
tags: []
comments:
- id: 2085
  author: Legooolas
  author_email: legooolas@icmfp.com
  author_url: http://icmfp.com
  date: '2007-05-01 14:16:08 -0400'
  date_gmt: '2007-05-01 13:16:08 -0400'
  content: I'd not noticed this half as much as the irritation by which Firefox (Iceweasel
    in Debian...) uses a separate copy&#47;paste buffer to the rest of X.  I'm sure
    there is some sane and rational explanation which means that using middle-button
    paste gives a completely different result to ^V, but it makes no sense to me  :P
- id: 2086
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://www.jamesoff.net
  date: '2007-05-08 19:38:21 -0400'
  date_gmt: '2007-05-08 18:38:21 -0400'
  content: Yeah, although the effect of that is less pronounced in KDE because the
    Klipper system tray thing (which pops up menus based on what you just selected)
    also synchronises all the various clipboards&#47;selections.
---
<p>In Windows, clicking on the addressbar in Firefox selects the existing URL so you can type to replace or paste to replace.</p>
<p>In FreeBSD, clicking on the addressbar doesn't do that. However, when you manually select the URL so you can replace it, it overwrites the contents of your clipboard and makes it so much harder to paste the URL you were about to look at.</p>
<p>Luckily, you can fix this :) Browse to `about:config` and stick `urlbar` in the filter box. Find the `browser.urlbar.clickSelectsAll` setting and change it (by double-clicking) to true.</p>
<p>To paste, you'll probably have best success with Ctrl-V as middlemouse seems to paste the clipboard without overwriting the previous contents.</p>
