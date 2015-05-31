---
layout: post
status: publish
published: true
title: open proxy checking for irc
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 143
wordpress_url: http://jamesoff.net/site/2003/12/30/open-proxy-checking-for-irc/
date: '2003-12-30 20:22:13 -0500'
date_gmt: '2003-12-30 19:22:13 -0500'
categories:
- Coding
tags: []
comments:
- id: 307
  author: Dimitris Ntelakis
  author_email: dntel@edu.uoc.gr
  author_url: http://www.pcinfo.gr
  date: '2006-12-08 15:46:20 -0500'
  date_gmt: '2006-12-08 14:46:20 -0500'
  content: |-
    Fine work dude  ..  very nice script ..  keep the good work..


    Greeding from Greece
---
Quite a large number of IRC servers run [Open Proxy Monitors](http://www.blitzed.org/bopm/) which either look up connecting hosts in RBLs, or actively scan them to check for open proxies allowing anonymous IRC connections, or both. However, not all servers have them (for various reasons, including legal ones). Not all servers check a wide range of blacklists either.

When `#exeter` recently came under attack from Ashlee (a well-known EFNet annoyance), I wrote a script to allow my eggdrop to request a bopm checked a host. This ran into quite a few problems, including just getting the two to interact correctly.  It also turned out most hosts were listed in an RBL but the bopm couldn't detect them as being open (although a portscan with nmap revealed an obviously compromised host).

The solution I ended up writing was to get the bot itself to do the RBL lookups. They're really quite easy:

 1. Resolve the user's host to an IP (if it isn't already).
 2. Reverse the IP (so `1.2.3.4` becomes `4.3.2.1`).
 3. Append the name of the RBL you want to look in (e.g. `4.3.2.1` becomes `4.3.2.1.opm.blitzed.org`)
 1. Look up that host, and if you get an IP back (which will `127.0.0.*`, where the last digit tells you the type of proxy), then you can ban the original host

It turns out eggdrop makes this extremely easy because the DNS function takes a callback to run when the lookup is complete, and you can pass any number of extra parameters to the callback, so keeping track of which user you just got the results for is very easy).

The result is proxycheck.tcl, which you can find on [GitHub](https://github.com/jamesoff/eggdrop-scripts).

Enjoy responsibly.
