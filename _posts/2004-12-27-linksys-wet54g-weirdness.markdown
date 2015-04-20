---
layout: post
status: publish
published: true
title: Linksys WET54G weirdness
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 179
wordpress_url: http://jamesoff.net/site/2004/12/27/linksys-wet54g-weirdness/
date: '2004-12-27 16:03:50 -0500'
date_gmt: '2004-12-27 15:03:50 -0500'
categories:
- General
tags: []
comments: []
---
<p>My network at home is split into two parts -- the part with the DSL router, Roz's computer and xbox, and then the half with my computers. The two halves are linked over a WLAN(wireless LAN) from the DSL router to a Linksys WET54G wireless bridge. This is mainly because a cable to link the two has to be enormously long and while I have a suitable cable it has to cross many doorways.</p>
<p>This morning the Linksys randomly killed itself and just sat there with the power LED blinking. Googling around indicated this was fried firmware usually caused by a bad flash, but I was just browsing the web at the time on my laptop, and I don't think anyone else was flashing my bridge :P</p>
<p>Luckily it turns out the <a href="ftp:&#47;&#47;ftp.linksys.com&#47;pub&#47;network&#47;wet54g_v206.zip">flasher for firmware v2.06<&#47;a> knows how to recover dead units and was able to put my bridge back into working order. It needed to be connected by a crossover cable directly from my laptop and wouldn't work from the server via a (Linksys) switch... but it's all good now.</p>
