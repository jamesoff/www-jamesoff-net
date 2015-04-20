---
layout: post
status: publish
published: true
title: I&#8217;ve had enough
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 245
wordpress_url: http://jamesoff.net/site/2006/09/26/ive-had-enough/
date: '2006-09-26 23:19:18 -0400'
date_gmt: '2006-09-26 22:19:18 -0400'
categories:
- internets
- Spam
- RBL
tags: []
comments:
- id: 1441
  author: Duds
  author_email: dudley@enterspace.org
  author_url: ''
  date: '2006-09-27 17:08:21 -0400'
  date_gmt: '2006-09-27 16:08:21 -0400'
  content: Why is your gallery down?
- id: 1442
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://www.jamesoff.net
  date: '2006-09-27 20:49:36 -0400'
  date_gmt: '2006-09-27 19:49:36 -0400'
  content: I can safely say it's not blbl.org's fault.
- id: 1443
  author: Conscious Junkyard &raquo; blbl.org blacklist shuts down
  author_email: ''
  author_url: http://kenklaser.gaiastream.com/?p=107
  date: '2006-09-27 22:26:14 -0400'
  date_gmt: '2006-09-27 21:26:14 -0400'
  content: "[...] Jamesoff, coder of the RBL plugin for SpamKarma 2 has decided to
    shut down his blacklist at blbl.org, he writes: &#8220;In due time, I&acirc;&euro;&trade;ll
    shut down rbldnsd too, but that&acirc;&euro;&trade;ll be a while yet. If you&acirc;&euro;&trade;re
    using the SpamKarma2 plugin for WordPress, or any other RBL lookup plugin on any
    blog software at all, please remove blbl.org from the lookup list (bl.blbl.org
    and uri-bl.blbl.org).&#8221; [...]"
---
<p>I've decided I've had enough of blbl.org. Last night my server that runs it (along with all of my other stuff) had some kind of hardware fault, and I realised that I didn't really want to pay for this machine just for blbl.org to rag it until the disks fall out and the assorted important bits melt. My father always used to say there's nothing worse than having your important bits melt.</p>
<p>Actually he didn't, but if I was to ask him about this theoretical event his response would definitely be on the negative side.</p>
<p>What it comes down to is this: blbl.org sucks quite a bit of power out of my server in both memory use and CPU time. (The bandwidth is probably negligible, but the worry of some blog spammer getting his knickers in a twist and performing some kind of DDoS is always at the back of my mind.) It hammers the disk (the main database tables contain 18 million and 6 million rows respectively, and that's not taking into account the tables used to accumulate the data people submit) and generally slows everything down. I'm getting fed up of having to field questions like "why is your gallery down?" because of it.</p>
<p>On top of all of that, I seem to end up spending more time than I'd like looking after the whole (admitedly shaky) set up. If blbl.org was represented on paper, it would be a [Heath Robinson](http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Heath_Robinson) machine. Frankly SpamKarma2 does a pretty damn good job of trapping spam by itself, WordPress has anti-spam stuff in it and there are plenty of other plugins which do a decent job too.</p>
<p>Looking at the stats from `rbldnsd(8)`, I was fielding about 400 queries every five minutes (i.e. just over one per second) for the IP blacklist, and I was getting about a 10% hit rate. I guess that's not so bad, but I've no idea how much of the comments posted on all blogs ever (or all blogs that might use blbl.org) is spam. If it's 10%, then I guess I was doing ok, but I suspect that it's probably more than that. Based on the flood of submissions (which often ran to 200&#47;sec), I'd say it's not that effective anyway.</p>
<p>The stats for the URL blacklist are worse - roughly 100 queries every five minutes and less than four hits in the same period.</p>
<p>So, I've shut it off. blbl.org is now firewalled off to save my webserver from even having to attempt to serve requests. In about a week, the scripts that generate the blacklist data for `rbldnsd` will decide nothing should be listed any more. I'll leave that running for now because otherwise it will have an impact on people's blogs. 200+ submissions a second tells me I could potentially screw up a lot of blogs :) I certainly won't be doing anything like returning a positive hit for all queries and saying "well you should have noticed that blbl.org was shutting down!"</p>
<p>In due time, I'll shut down `rbldnsd` too, but that'll be a while yet. If you're using the SpamKarma2 plugin for WordPress, or any other RBL lookup plugin on any blog software at all, please remove blbl.org from the lookup list (`bl.blbl.org` and `uri-bl.blbl.org`).</p>
<p>I would say it's been fun, but I'm not sure that applies :) It's certainly been interesting from many perspectives. I've had to figure out how to run an RBL, write scripts (and rewrite) them to handle large volumes of submissions, process large quantities of data, and so on. I never even got round to writing a proper website for it (not that you can look now, since I've blocked it). I hope that in the time it's been running I've helped stop at least a little bit of spam, and stuck two fingers up at the people who go around filling people's blogs with unnecessary "comments" about poker, transexuals, lesbians and bestiality. There are plenty of people who write their own blogs about that. Actually, I think that's called myspace or something :fry:</p>
<p>In the time it's been running, especially since I posted last about the detrimental effect blbl.org was having on my server (and thus all my other sites), I've had a couple of offers from people for more hosting. I've decided not to take them up in the end (although I am very grateful) because leaving this project is as much about my personal time as anything else. When I had more free time (like when I was a student) I happily created many complex projects for myself, but nowadays I want to keep things simpler because I'm so busy.</p>
<p>If anyone wants to take over blbl.org (in its entirely - management and hosting) then I'd be more than happy to hand the reigns over to a suitable person (or people).</p>
<p>I think this is officially my longest blog post ever, so I'd better stop here before I ruin my average.</p>
