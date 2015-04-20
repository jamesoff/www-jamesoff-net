---
layout: post
status: publish
published: true
title: irssi and ZNC
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 337
wordpress_url: http://jamesoff.net/site/2008/02/21/irssi-and-znc/
date: '2008-02-21 22:38:24 -0500'
date_gmt: '2008-02-21 22:38:24 -0500'
categories:
- internets
- FreeBSD
tags:
- irc
- irssi
- znc
comments:
- id: 4768
  author: someone
  author_email: someone@trash-mail.com
  author_url: ''
  date: '2008-03-08 10:48:07 -0500'
  date_gmt: '2008-03-08 10:48:07 -0500'
  content: |
    <p>hey,
    why do u start multiple instances of znc? you can create more than one user on one znc... just try it. enabling the webinterface makes things so much easier. :)<&#47;p>
- id: 4808
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://jamesoff.net
  date: '2008-03-09 22:31:04 -0400'
  date_gmt: '2008-03-09 22:31:04 -0400'
  content: |
    <p>I am only running one ZNC, but I need it to listen on multiple ports else irssi can't tell the difference between my networks. So I just have one ZNC listening on a couple of ports, and each network in irssi is configured with a different port number.<&#47;p>
- id: 7900
  author: d0h
  author_email: d0h@linux.nu
  author_url: ''
  date: '2008-04-24 09:16:10 -0400'
  date_gmt: '2008-04-24 09:16:10 -0400'
  content: |
    <p>Have you tried to add the -ircnet switch to your connect statement ?
    I'm running two connects to the same znc without any problems.<&#47;p>
- id: 7998
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://jamesoff.net
  date: '2008-04-25 10:43:12 -0400'
  date_gmt: '2008-04-25 10:43:12 -0400'
  content: |
    <p>I did yes, and it didn't seem to help. Are you using -ircnet instead of -network because you're using an old irssi or because you're used to old irssi? :) Maybe older irssis don't try to be so clever with the server list...<&#47;p>
- id: 17068
  author: phisher1
  author_email: phisher1@gmail.com
  author_url: ''
  date: '2008-12-05 18:03:18 -0500'
  date_gmt: '2008-12-05 18:03:18 -0500'
  content: |
    <p>duck said I should comment..   znc is in ports now =)<&#47;p>

    <p>cheers<&#47;p>
- id: 18091
  author: llutz
  author_email: despammed@freenet.de
  author_url: ''
  date: '2009-01-17 22:44:33 -0500'
  date_gmt: '2009-01-17 22:44:33 -0500'
  content: |
    <p>even with 2 "Listen" statements and 2 configured users, i'm always connected
    to the same "user1"-account. can you plz show your anonymized znc.conf &#47; irssi.conf?
    tia, llutz<&#47;p>
- id: 28968
  author: chicken
  author_email: chicken@nospam.net
  author_url: ''
  date: '2009-04-20 10:36:24 -0400'
  date_gmt: '2009-04-20 10:36:24 -0400'
  content: |
    <p>llutz: I had the same issue. For me these entries in irssi config file in the chatnets section did the trick:
     znc1 = { type = "IRC"; username = "username1"; };
     znc2 = { type = "IRC"; username = "username2"; };<&#47;p>
- id: 61754
  author: golden
  author_email: e@mail.com
  author_url: ''
  date: '2010-05-03 14:23:43 -0400'
  date_gmt: '2010-05-03 14:23:43 -0400'
  content: |
    <p>Patch is here:
    http:&#47;&#47;dev.exherbo.org&#47;~ahf&#47;pub&#47;software&#47;patches&#47;irssi&#47;0001-Fix-server-add-issue-when-trying-to-add-a-already-kn.patch<&#47;p>

    <p>and it was applied in trunk on 20100321, so only the latest stable would contain this work around<&#47;p>
- id: 62299
  author: lukano
  author_email: lukano@gmail.com
  author_url: ''
  date: '2010-05-11 17:15:08 -0400'
  date_gmt: '2010-05-11 17:15:08 -0400'
  content: |
    <p>Do you have an example of how you defined different ports to each network?<&#47;p>

    <p>Hoping for a response as the topic's so old, but I've run in to the same issue and it's the only thing holding me back from loving znc.<&#47;p>
- id: 77324
  author: 'IRC: yes, people still use it &laquo; You can imagine where it goes from
    here.'
  author_email: ''
  author_url: http://www.kgarner.com/blog/archives/2009/01/18/irc-yes-people-still-use-it/
  date: '2011-03-20 18:29:23 -0400'
  date_gmt: '2011-03-20 18:29:23 -0400'
  content: |
    <p>[...] About 6 hours in, and I&#8217;m loving it.&Acirc;&nbsp; IRC session ubiquity and I&#8217;m happy.&Acirc;&nbsp; I can pop it up on my phone and IRC on the go, or just use a local client on my mac instead of sshing back home and using irssi.&Acirc;&nbsp; I&#8217;ll probably still use irssi 99% of the time, but having options and being able to jump on from my phone will help.&Acirc;&nbsp; IRC, how like crack you are and how I can&#8217;t quit you.&Acirc;&nbsp; I did run into one problem with irssi and it not being able to do multiple connections to what it thinks is the same host, but I found a way around it after reading this. [...]<&#47;p>
- id: 77543
  author: AndreaStella
  author_email: andrea.stella@mailinator.com
  author_url: ''
  date: '2011-05-06 04:42:27 -0400'
  date_gmt: '2011-05-06 04:42:27 -0400'
  content: |
    <p>irssi considers address&#47;port pairs for servers unique.<&#47;p>

    <p>To get around that limitation, you can either set up your bnc
    to listen on different ports for each user&#47;chatnet, or you can
    use a different (fake) name for each server address.<&#47;p>

    <p>I think the latter is more elegant and resource efficient.<&#47;p>

    <p>In ~&#47;.irssi&#47;config:<&#47;p>

    <p>servers = (
     {
      address = "fake.efnet.kk";
      chatnet = "EFNET";
      port = "55555";
      password = "bncpassEFNET";
     },
     {
      address = "fake.freenode.kk";
      chatnet = "FNODE";
      port = "55555";
      password = "bncpassFNODE";
     }
    )<&#47;p>

    <p>chatnets = {
     EFNET = {
      type = "IRC";
      username = "bncuserEFNET";
     };
     FNODE = {
      type = "IRC";
      username = "bncuserFNODE";
     };
    };<&#47;p>

    <p>In &#47;etc&#47;hosts:<&#47;p>

    <p>123.123.123.123  my.bnc.com fake.efnet.kk fake.freenode.kk<&#47;p>

    <p>Thus, the fake addresses all resolve to your bnc address
    and all is fine.<&#47;p>
- id: 79795
  author: YDJLuV
  author_email: ydjluv@gmail.com
  author_url: http://www.voxinfinitus.net
  date: '2011-08-09 01:47:41 -0400'
  date_gmt: '2011-08-09 01:47:41 -0400'
  content: |
    <p>Well, I know this post is way overdue but I have to say it. One of the reasons that ZNC has the ability to have more than one user is so you can connect to multiple networks... just create a user for each network.. then in IRSSI connect to ZNC with each user and there you go.. u are on different network without the need to use different ports etc.. just a thought ;) better late than never...<&#47;p>
- id: 85658
  author: Jens
  author_email: jens@jens.dk
  author_url: ''
  date: '2011-12-22 13:53:54 -0500'
  date_gmt: '2011-12-22 13:53:54 -0500'
  content: |
    <p>Ever heard of 'screen'?
    screen + irssi > znc<&#47;p>

    <p>No need to run a bouncer for that.<&#47;p>
- id: 85659
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://jamesoff.net
  date: '2011-12-22 13:56:44 -0500'
  date_gmt: '2011-12-22 13:56:44 -0500'
  content: |
    <p>At the time I set this up, irssi ran on my server at home (inside screen) which had an unstable connection and I didn't want to reveal my IP. ZNC also has the benefit of letting me connect from multiple clients and catch up, which is handy with e.g. my phone or a web-based IRC client.<&#47;p>
- id: 87064
  author: flipwad
  author_email: flipwad@gmail.com
  author_url: ''
  date: '2012-01-11 20:09:17 -0500'
  date_gmt: '2012-01-11 20:09:17 -0500'
  content: |
    <p>hey what about on the windows version of irssi, having problems with autoconnecting and reconnecting on znc. Im fine with autoconnecting on startup with everything else but znc (auto connect username:pw) get back thanks.<&#47;p>
- id: 87067
  author: flipwad
  author_email: flipwad@gmail.com
  author_url: ''
  date: '2012-01-11 20:10:17 -0500'
  date_gmt: '2012-01-11 20:10:17 -0500'
  content: |
    <p>well  just connecting even with znc entirely<&#47;p>
---
<p>[ZNC](http:&#47;&#47;en.znc.in) is an IRC bouncer with some pretty nice features. For a number of reasons I wanted to move my ircing from home to a shell, so I decided to give ZNC a try. ZNC isn't in ports, but compiles fine using `gmake`.</p>
<p>The only problem I encountered was getting it set up to work with multiple networks in irssi. Configuring ZNC itself to put me on many networks was easy enough, and when I connected irssi to it for each network using `&#47;connect` it worked fine. Using `&#47;server add` to set up irssi's server list didn't work out so well.</p>
<p>Every time I tried to add another server (for connecting to another network), irssi would remove the first one. This is because irssi only considers a server's hostname and port when trying to work out if it's unique. When I added another server which differed from the first only by password and associated network, irssi assumed I was updating the existing one and changed it. Putting the required entries in irssi's config by hand also didn't work.</p>
<p>The solution was easy enough; one ZNC instance can listen on multiple ports, so I got it to listen on a selection of ports using multiple `Listen` directives in its config file, and then added each network's server to irssi using a different port number.</p>
<p>Now I can take advantage of cool things like buffer replay and detaching from channels. Sorry, irssi-proxy - you don't quite cut it now :)</p>
