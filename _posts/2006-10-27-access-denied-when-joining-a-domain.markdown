---
layout: post
status: publish
published: true
title: "&#8220;Access Denied&#8221; when joining a domain"
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 252
wordpress_url: http://jamesoff.net/site/2006/10/27/access-denied-when-joining-a-domain/
date: '2006-10-27 10:12:16 -0400'
date_gmt: '2006-10-27 09:12:16 -0400'
categories:
- Sysadmin
- Microsoft
tags: []
comments:
- id: 1658
  author: wally.nl
  author_email: blog@general-failure.com
  author_url: ''
  date: '2006-11-09 08:48:06 -0500'
  date_gmt: '2006-11-09 07:48:06 -0500'
  content: Thanks, we had this issue yesterday and this fixed it.
- id: 1659
  author: Martin Wells
  author_email: martin.wells@insightbb.com
  author_url: ''
  date: '2006-12-12 01:52:48 -0500'
  date_gmt: '2006-12-12 00:52:48 -0500'
  content: YOU ARE THE MAN!!! THANKS SO MUCH !! Fought this all day until I got to
    your site!!!
- id: 1660
  author: Chris
  author_email: chris.thomas@systemnet.co.uk
  author_url: ''
  date: '2007-07-17 11:48:26 -0400'
  date_gmt: '2007-07-17 10:48:26 -0400'
  content: |-
    Thanks,
    works a treat.
---
<p>While trying to join a machine which had previously been on a Windows Server 2003-hosted domain to a new domain hosted on Windows Server 2003 R2 (not sure if the change in OS is the cause of this issue), I kept getting "Access Denied".</p>
<p>In `C:\windows\debug\netsetup.log` it says:</p>
<p>    NetUseAdd to \\DC_FQDN\IPC$ returned 5<br />
    NetpJoinDomain: status of connecting to dc '\\DC_FQDN': 0x5<br />
    NetpDoDomainJoin: status: 0x5</p>
<p>The solution was to fire up `regedit` and change the value of `HKLM\SYSTEM\CurrentControlSet\Services\lanmanserver\parameters\enablesecuritysignature` to 1, and restart.</p>
<p>Edit: Do this *after* leaving the original domain for a workgroup, because doing that resets it to 0.</p>
