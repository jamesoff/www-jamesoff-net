---
layout: post
status: publish
published: true
title: Alfred script to toggle AirPort
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 448
wordpress_url: http://jamesoff.net/site/?p=448
date: '2011-07-13 08:25:41 -0400'
date_gmt: '2011-07-13 08:25:41 -0400'
categories:
- Mac OS X
tags:
- alfred
- script
- airport
comments: []
---
<p><b>Please see my <a href="http:&#47;&#47;jamesoff.net&#47;site&#47;alfred-extensions&#47;">Alfred Extensions<&#47;a> page for updates!<&#47;b></p>
<p>A quick and easy one for Alfred: a command which toggles AirPort on&#47;off.</p>
<p>If you are using Alfred 0.9.9 (or better), you should be able to download <a href="http:&#47;&#47;cl.ly&#47;2m0G3a110E141B3j3t03">this ZIP file<&#47;a> and import it!</p>
<p>If you are using an earlier version of Alfred, follow these instructions:</p>
<pre lang="bash">AIRPORT=`networksetup -getairportpower AirPort | grep Off`; if [ "$?" = "0" ]; then networksetup -setairportpower AirPort on; MSG="AirPort enabled"; else networksetup -setairportpower Airport off; MSG="AirPort disabled"; fi; &#47;usr&#47;local&#47;bin&#47;growlnotify -m "$MSG" -a "&#47;Applications&#47;Utilities&#47;Airport Utility.app" AirPort status<&#47;pre></p>
<p>Create as a terminal script and configure it to be silent. I also borrowed the icon from AirPort utility for the script (Alfred for "airport" and then use Reveal in Finder on it; Get Info; click Icon and &acirc;&OElig;&tilde;C; click the icon area in Alfred and &acirc;&OElig;&tilde;V).</p>
<p><img src="http:&#47;&#47;f.cl.ly&#47;items&#47;0l3e1R2t3Z35233r310U&#47;Screen%20shot%202011-07-13%20at%2009.19.44.png" alt="Script configuration screenshot" &#47;></p>
