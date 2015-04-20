---
layout: post
status: publish
published: true
title: Murdering dogs
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 285
wordpress_url: http://jamesoff.net/site/2007/04/16/murdering-dogs/
date: '2007-04-16 11:25:10 -0400'
date_gmt: '2007-04-16 10:25:10 -0400'
categories:
- Sysadmin
- Work
- Microsoft
tags: []
comments: []
---
<p>I've been having some problems with the "Search Assistant" (the stupid dog thing in Explorer on Windows XP when you use the Find thingy) at work. For some reason recently opening the search sidebar results in Explorer crashing with a Data Execution Prevention error. Disabling the DEP stuff for explorer.exe just results in a regular crash. Alas, to disable the dog thing you need to be able to open the search panel... or just stick this in your registry.</p>
<pre lang="reg">
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\CabinetState]</p>
<p>"FullPathAddress"=dword:00000001<br />
"Use Search Asst"="no"<br />
<&#47;pre></p>
<p>Log off and back on again and the dog has been slaughtered.</p>
<p>Stupid yapping thing.  :fuckoff:</p>
