---
layout: post
status: publish
published: true
title: Windows Installer &#8220;Overlapped I&#47;O&#8221;
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 207
wordpress_url: http://jamesoff.net/site/2005/07/13/windows-installer-overlapped-io/
date: '2005-07-13 18:03:38 -0400'
date_gmt: '2005-07-13 17:03:38 -0400'
categories:
- Sysadmin
- Microsoft
tags: []
comments: []
---
<p>After updating Windows Installer on one of my Windows Server 2003 machines, it refused to run and no installations could take place.</p>
<p>http:&#47;&#47;forum.iamnotageek.com&#47;t-1819088849.html indicates the fix (which worked for me) is to run:<br />
<code>msiexec &#47;regserver<&#47;code><br />
(from Start | Run is fine)</p>
