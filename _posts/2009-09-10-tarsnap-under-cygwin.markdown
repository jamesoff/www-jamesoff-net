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
comments:
- id: 50356
  author: Tarsnap backups on Windows and Linux at bluebottle
  author_email: ''
  author_url: http://www.bluebottle.net.au/blog/2009/tarsnap-backups-on-windows-and-linux
  date: '2009-12-16 10:29:38 -0500'
  date_gmt: '2009-12-16 10:29:38 -0500'
  content: |
    <p>[...] to make do with Cygwin. Explaining how to install Cygwin is far beyond the scope of this document, but it&#8217;s pretty simple. Apart from the standard Tarsnap dependancies, you will probably also want to install [...]<&#47;p>
---
<p>To get <a href="http:&#47;&#47;beta.tarsnap.com">tarsnap <&#47;a>working under cygwin, here's what you need to do:</p>
<ol>
<li>Install the following packages using the cygwin setup tool:
<ul>
<li>gcc4<&#47;li>
<li>make<&#47;li>
<li>openssl (needed for runtime, not for building)<&#47;li>
<li>openssl-devel<&#47;li>
<li>zlib-devel<&#47;li><br />
<&#47;ul><&#47;li></p>
<li>Download and extract the <a href="https:&#47;&#47;beta.tarsnap.com&#47;download.html">tarsnap code<&#47;a>.<&#47;li>
<li>Run <code>.&#47;configure<&#47;code> (this seems to be much slower on cygwin than on other more UNIXy platforms)<&#47;li>
<li>Run <code>make all install clean<&#47;code><&#47;li><br />
<&#47;ol></p>
<p>Tarsnap should now be installed and you can use it in the normal fashion - create a host key with <code>tarsnap-keygen<&#47;code> and then get backing up!</p>
<p>Edit 2009-12-16: checkers from #tarsnap on EFnet has written a post with scripts for Linux and Cygwin tarsnapping at <a href="http:&#47;&#47;www.bluebottle.net.au&#47;blog&#47;2009&#47;tarsnap-backups-on-windows-and-linux">http:&#47;&#47;www.bluebottle.net.au&#47;blog&#47;2009&#47;tarsnap-backups-on-windows-and-linux<&#47;a></p>
<p>You may also wish at add `--prefix=&#47;` to the `configure` command line, as `&#47;usr&#47;local` isn't in the default path.</p>
