---
layout: post
status: publish
published: true
title: New UPS installed
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 253
wordpress_url: http://jamesoff.net/site/2006/10/30/new-ups-installed/
date: '2006-10-30 12:05:38 -0500'
date_gmt: '2006-10-30 11:05:38 -0500'
categories:
- Sysadmin
- FreeBSD
- Hardware
tags: []
comments: []
---
<p>This weekend I installed my new UPS, an APC SmartUPS 700 which I got by part-exchanging one of my old BackUPS 350CSes (CSen?) which had a dead battery. Although I ended up spending slightly more than planned by doing that, I've ended up with a much better setup. The 700 is enough to comfortably support yomi and tomo (server and desktop) in the study for about 20 minutes. The other 350 is now under Roz's desk in the lounge running her PC and also the DSL router. Overall I have better runtime than I would have had with my original plan of fixing the 350 and buying another one for the lounge.</p>
<p>I also got `apcupsd` setup on my two machines so that the server monitors the UPS status, and the desktop picks the status up from the server. `apcupsd` also works on Windows so when I'm booted into Windows for gaming it still looks after me. Unfortunately, if the power fails this won't actually work as the network switch in the study isn't currently UPS'd, so the desktop won't be able to communicate with the server. I'll be fixing that soon. I also want to see if I can get `apcupsd` to talk to the 350 so Roz's computer can shut itself down in a power failure too. Oh, and I want to make my desktop shut down faster than the server to give the server more runtime.</p>
<p>I think I'll scribble a howto page for jamesoff.net after I get it all sorted :)</p>
