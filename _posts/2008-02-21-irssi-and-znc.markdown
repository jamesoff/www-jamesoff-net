---
layout: post
status: publish
published: true
title: irssi and ZNC
original: /site/2008/02/21/irssi-and-znc/
comments: false
summary: Using the irssi IRC client with the ZNC bouncer
---
{% icon fa-warning fa-lg fa-pull-left fa-border %} This post is out of date, and does not allow for newer versions of ZNC supporting mutliple networks per user.

[ZNC](http://en.znc.in) is an IRC bouncer with some pretty nice features. For a number of reasons I wanted to move my ircing from home to a shell, so I decided to give ZNC a try. ZNC isn't in ports, but compiles fine using `gmake`.

The only problem I encountered was getting it set up to work with multiple networks in irssi. Configuring ZNC itself to put me on many networks was easy enough, and when I connected irssi to it for each network using `/connect` it worked fine. Using `/server add` to set up irssi's server list didn't work out so well.

Every time I tried to add another server (for connecting to another network), irssi would remove the first one. This is because irssi only considers a server's hostname and port when trying to work out if it's unique. When I added another server which differed from the first only by password and associated network, irssi assumed I was updating the existing one and changed it. Putting the required entries in irssi's config by hand also didn't work.

The solution was easy enough; one ZNC instance can listen on multiple ports, so I got it to listen on a selection of ports using multiple `Listen` directives in its config file, and then added each network's server to irssi using a different port number.

Now I can take advantage of cool things like buffer replay and detaching from channels. Sorry, irssi-proxy - you don't quite cut it now :)
