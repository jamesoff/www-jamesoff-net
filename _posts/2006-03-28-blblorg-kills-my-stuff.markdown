---
layout: post
status: publish
published: true
title: blbl.org kills my stuff
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
excerpt: "Unfortunately, blbl.org (my BLog Blocking List) is generating a lot of load
  on my poor colo'd machine, and is causing general slowness and at times outright
  failures of my other websites.\n\nAlso unfortunately for blbl.org, I like my other
  websites being up more than I like blbl.org being up, so this means one of several
  things:\n<ul>\n\t<li>I shut it down<&#47;li>\n\t<li>I move it to another machine
  that can handle it<&#47;li>\n\t<li>I change it so it generates less load<&#47;li>\n<&#47;ul>\n"
wordpress_id: 229
wordpress_url: http://jamesoff.net/site/2006/03/28/blblorg-kills-my-stuff/
date: '2006-03-28 22:15:20 -0500'
date_gmt: '2006-03-28 21:15:20 -0500'
categories:
- Coding
- Sites
- Spam
- Sysadmin
- RBL
tags: []
comments:
- id: 1180
  author: Tim
  author_email: tim@clixnetwork.com
  author_url: http://www.nednil.com
  date: '2006-04-26 17:39:18 -0400'
  date_gmt: '2006-04-26 16:39:18 -0400'
  content: |-
    Any news on this? It's been about a month and it's still online so I'm guessing nothing happened or #3 happened (which in that case I would think you would have posted about it).

    Either case thanks for having it for as long as you have it. Anything to help stop the spam is good.
- id: 1181
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://www.jamesoff.net
  date: '2006-04-29 16:42:05 -0400'
  date_gmt: '2006-04-29 15:42:05 -0400'
  content: |-
    I have indeed adjusted it slightly, and also changed the host OS from FreeBSD 4 to 6 (a disk was dying in the server so I took the opportunity to upgrade while rescuing it). Hopefully it's still effective enough to be of use despite some of the changes I've made. When I get a bit of free time I shall look into getting some stats going again.

    Since making this post, someone has generously offered me some additional hosting to help with the load, so now I've completed the migration of my own machine, I shall start working with them to sort that out :)
- id: 1182
  author: tm
  author_email: tmaster@bigfoot.com
  author_url: http://www.winnfreenet.com/
  date: '2006-05-04 17:17:39 -0400'
  date_gmt: '2006-05-04 16:17:39 -0400'
  content: You need to ask the Spam Karma author for links to your site inside the
    admin program. So that people will know who's services and bandwidth they are
    using. Its only fair.
- id: 1183
  author: Michael Hampton
  author_email: error@ioerror.us
  author_url: http://www.homelandstupidity.us/
  date: '2006-05-20 05:28:30 -0400'
  date_gmt: '2006-05-20 04:28:30 -0400'
  content: |-
    I found you from a link I found within the latest version of Spam Karma 2.

    I'd known there was some sort of comment spam blackhole list going around, but had forgotten exactly where it was until I saw it there yesterday.

    It seems the big bottlenecks would be the database itself and the DNS server. And since you didn't say what you were using for either of those, it's hard to judge from outside what might be the thing to do next, but that's where I would look.
- id: 1184
  author: drmike
  author_email: theapparatus@gmail.com
  author_url: http://tdjc.be
  date: '2006-08-04 15:19:09 -0400'
  date_gmt: '2006-08-04 14:19:09 -0400'
  content: |-
    Thanks for providing this wonderful service.

    Maybe putting up a donation link on blbl.org might help as well. :)
- id: 99906
  author: eas
  author_email: eas-001@geekfun.com
  author_url: http://geekfun.com
  date: '2012-09-03 22:55:27 -0400'
  date_gmt: '2012-09-03 22:55:27 -0400'
  content: |
    <p>A very belated "Thank You" for running blbl.org.<&#47;p>

    <p>I'm mourning the decline of SpamKarma2 and its allies. Actually, that's not entirely true. Even with the rbl plugin disabled, it does a remarkable job of blocking spam.<&#47;p>

    <p>Anyway, Thanks!<&#47;p>
---
<p>Unfortunately, blbl.org (my BLog Blocking List) is generating a lot of load on my poor colo'd machine, and is causing general slowness and at times outright failures of my other websites.</p>
<p>Also unfortunately for blbl.org, I like my other websites being up more than I like blbl.org being up, so this means one of several things:</p>
<ul>
<li>I shut it down<&#47;li>
<li>I move it to another machine that can handle it<&#47;li>
<li>I change it so it generates less load<&#47;li><br />
<&#47;ul><br />
<a id="more"></a><a id="more-229"></a></p>
<p>Of these, I'm obviously least keen on the first one - although I'm not sure really how much use it is being compared to the rest of Spam Karma's calculations. As it's been taking more effort (on the server's part) to rebuild the zone recently, I've reduced the frequency of the updates, which also means it's less effective. Blog spammers hit hard and fast (believe me, I've seen the submissions pour in at >4&#47;sec per host) and long gaps in updating the zone mean I might as well not bother.</p>
<p>Moving it to another machine is an option, but I lack the financial ability to do it. It's as simple as that. I can afford my colo at the moment no problem, but I don't feel like stretching to another one - particularly because it would need a reasonably spec'd machine to do it justice and I can't really go throwing around money at that. I need to save up and buy a house and not be poor generally (have you seen the housing market around here recently? It's mad).</p>
<p>The same kind of goes for changing it to generate less load. There's actually two reasons behind not wanting to go for this option - primarily my time is finite and at the moment my free time is generally negative anyway. The second is that while I can think of other ways of doing this that would be less of a burden on the server, they could also be less reliable for false positives.</p>
<p>Of these options, the third is the most likely to happen - but if it doesn't help or I can't find the time to do it, it'll have to be the first, sorry.</p>
<p>In either case, you should probably expect somewhat intermittent service from blbl.org both for submissions and for lookups while I try things out. If I decide to make it go away, I'm more than happy for someone else to take it on. I'm not going to make it return a hit for * or anything stupid like that, as has been known to be done for some RBLs :) Since I suspect the majority of people have blbl.org enabled in SK2 just because it's the default means they have no responsibility to check up on news about it.</p>
<p>Anyway, that's how it is. We'll see where it goes from here :)</p>
