---
layout: page
status: publish
published: true
title: Installing a vulnerable port
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 30
wordpress_url: http://jamesoff.net/site/projects/freebsd/installing-a-vulnerable-port/
date: '2006-09-24 17:15:17 -0400'
date_gmt: '2006-09-24 18:15:17 -0400'
categories:
- Uncategorized
tags: []
comments:
- id: 103026
  author: Eddie Thieda
  author_email: eddie.thieda@gmail.com
  author_url: http://iameddie.us
  date: '2012-11-06 00:42:59 -0500'
  date_gmt: '2012-11-06 00:42:59 -0500'
  content: |
    <p>Thanks for the reminder entry, I always seem to forget about this option when using portaudit.<&#47;p>
- id: 109746
  author: Dale Scott
  author_email: dale@dalescott.net
  author_url: http://www.dalescott.net
  date: '2013-02-06 20:00:30 -0500'
  date_gmt: '2013-02-06 20:00:30 -0500'
  content: |
    <p>Thanks. I can't easily update my portaudit database because of a corporate firewall and always forget which knob to turn.<&#47;p>
---
<p>If you need to install a port which is vulnerable, FreeBSD will stop with something like this:</p>
<pre>
===>  subversion-1.0.4 has known vulnerabilities:<br />
>> subversion -- WebDAV fails to protect metadata.<br />
Reference: <http:&#47;&#47;people.freebsd.org&#47;~eik&#47;portaudit&#47;184f5d0b-0fe8-11d9-8a8a-000c41e2cdad.html><br &#47;><br />
>> subversion: remote exploitable buffer overflow in 'svn:&#47;&#47;' parser.<br />
Reference: <http:&#47;&#47;people.freebsd.org&#47;~eik&#47;portaudit&#47;4616bc3b-bd0f-11d8-a252-02e0185c0b53.html><br &#47;><br />
>> mod\_authz\_svn access control bypass.<br />
Reference: <http:&#47;&#47;people.freebsd.org&#47;~eik&#47;portaudit&#47;cc35a97d-da35-11d8-9b0a-000347a4fa7d.html><br &#47;><br />
>> Please update your ports tree and try again.<br &#47;><br />
*** Error code 1<br &#47;><br />
Stop in &#47;usr&#47;ports&#47;devel&#47;subversion.<br />
<&#47;pre></p>
<p>However, in this case I know I can install this port because I'm not going to be doing anything to expose those vulnerabilities. To force the port to install, you need to define the DISABLE_VULNERABILITIES knob:</p>
<p>`make -DDISABLE_VULNERABILITIES install clean`</p>
<p>Of course, it would be better to update the ports tree and install a less vulnerable version, but on the particular machine I'm doing this on, that's not an option.</p>
<p>If you don't have vulnerability checking when installing ports, then you need to install `security&#47;portaudit` from ports.</p>
