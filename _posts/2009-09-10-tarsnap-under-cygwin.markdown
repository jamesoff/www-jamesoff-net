---
layout: post
status: publish
published: true
title: tarsnap under cygwin
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 386
wordpress_url: http://jamesoff.net/site/?p=386
date: '2009-09-10 10:36:31 -0400'
date_gmt: '2009-09-10 10:36:31 -0400'
categories:
- Sysadmin
- Microsoft
tags:
- cygwin
- compile
- tarsnap
- windows
- backup
comments: false
summary: Installing the Tarsnap backup client on Windows with cygwin.
---
To get [Tarsnap](https://www.tarsnap.com) working under cygwin, here's what you need to do:

1. Install the following packages using the cygwin setup tool:
	* gcc4
	* make
	* openssl (needed for runtime, not for building)
	* openssl-devel
	* zlib-devel
1. Download and extract the Tarsnap code
1. Run `./configure` (this seems to be much slower on cygwin than on other more UNIXy platforms)
1. Run `make all install clean`

Tarsnap should now be installed and you can use it in the normal fashion - create a host key with `tarsnap-keygen` and then get backing up!

Edit 2009-12-16: checkers from #tarsnap on EFnet has written a post with scripts for Linux and Cygwin tarsnapping [on his blog](http://www.bluebottle.net.au/blog/2009/tarsnap-backups-on-windows-and-linux">http://www.bluebottle.net.au/blog/2009/tarsnap-backups-on-windows-and-linux)

You may also wish at add `--prefix=/` to the `configure` command line, as `/usr/local` isn't in the default path.
