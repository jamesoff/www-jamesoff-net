---
layout: post
status: publish
published: true
title: iPhone apps, Xcode and Dropbox
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 428
wordpress_url: http://jamesoff.net/site/?p=428
date: '2011-01-10 12:33:27 -0500'
date_gmt: '2011-01-10 12:33:27 -0500'
categories:
- Coding
- my stuff
- Mac OS X
tags:
- apple
- xcode
- iphone
- dropbox
comments: []
---
<p>A while back I put some of my Xcode bits (i.e. the <a href="http:&#47;&#47;itunes.com&#47;apps&#47;jamesseward&#47;randomrecipegenerator">Random Recipe Generator<&#47;a>) into my <a href="http:&#47;&#47;db.tt&#47;ojcracC">Dropbox<&#47;a> to make it easier to stay up to date on my laptop and my desktop. (Yes, I know, source control blah blah blah :)</p>
<p>However, building the Distribution version of the app gave me this warning:</p>
<blockquote><p>"The CodeResources file must be a symbolic link to _CodeSignature&#47;CodeResources"<&#47;blockquote></p>
<p>which I duly ignored. However, the Application Loader (used to push the new binary to the App Store) also complained about that and wouldn't upload it.</p>
<p>It looks like Dropbox's replication may have been to blame for the symlink stopping being a symlink, so the solution is to use the handy new selective sync option in Dropbox and not sync the build&#47; directory between my machines (which is pretty much pointless anyway and certainly generates a lot of network overhead when you build). Having done that and built a clean copy it worked fine.</p>
