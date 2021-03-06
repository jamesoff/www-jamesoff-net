---
layout: post
title: open proxy checking for irc
tags: ['code', 'irc']
comments: false
original: /site/2003/12/30/open-proxy-checking-for-irc
summary: An eggdrop script to check users joining your channel against open proxy lists.
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
