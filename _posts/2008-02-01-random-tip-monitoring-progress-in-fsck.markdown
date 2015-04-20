---
layout: post
status: publish
published: true
title: 'Random tip: monitoring progress in fsck'
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 320
wordpress_url: http://jamesoff.net/site/2008/02/01/random-tip-monitoring-progress-in-fsck/
date: '2008-02-01 16:11:13 -0500'
date_gmt: '2008-02-01 16:11:13 -0500'
categories:
- Sysadmin
- FreeBSD
tags:
- FreeBSD
- fsck
- tip
comments: []
---
<p>`fsck` in Linux has had some kind of progress bar for a while now (at least, last time I used SuSE it did). FreeBSD's fsck is Too Advanced for such things, and if you're checking a big disk (like `&#47;usr`) you can find yourself just sitting there with no idea of what progress it's making.</p>
<p>Sit no more! Just hit `Ctrl-t` and `fsck` will reveal its secrets. (This sends the currently running process a `SIGINFO`.)</p>
