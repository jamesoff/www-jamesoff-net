---
layout: page
status: publish
published: true
title: Alfred Extensions
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 458
wordpress_url: http://jamesoff.net/site/?page_id=458
date: '2011-08-02 19:20:06 -0400'
date_gmt: '2011-08-02 19:20:06 -0400'
categories: []
tags: []
comments:
- id: 115100
  author: Graham
  author_email: graham@fatlazycat.com
  author_url: ''
  date: '2013-04-03 07:23:39 -0400'
  date_gmt: '2013-04-03 07:23:39 -0400'
  content: |
    <p>Hi, do these work with v2 of alfred ?<&#47;p>

    <p>Thanks<&#47;p>
- id: 115894
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://jamesoff.net
  date: '2013-04-13 12:47:46 -0400'
  date_gmt: '2013-04-13 12:47:46 -0400'
  content: |
    <p>These are currently Alfred v1; I haven't updated them yet partly due to lack of time, and partly because the network location&#47;wifi extensions have equivalents for v2 which other people have written.<&#47;p>
- id: 184876
  author: Jana
  author_email: jennawatts1977@hotmail.com
  author_url: http://www.overninethousand.net/weightloss
  date: '2015-03-07 07:33:56 -0500'
  date_gmt: '2015-03-07 07:33:56 -0500'
  content: |
    <p>Not quite sure, I had good results with this <a href="www.overninethousand.net&#47;weightloss" rel="nofollow"> here<&#47;a>.The Video on their site was very good so I just did it and lost some weight. You will find the video when you click on the Link. Jenna<&#47;p>
---
<p><img alt="" src="http:&#47;&#47;f.cl.ly&#47;items&#47;0U0v0S2s211L2P3r331D&#47;Screen%20Shot%202011-08-02%20at%2020.39.04.png" title="Alfred Extensions screenshot" class="alignright" width="506" height="361" &#47;><a href="http:&#47;&#47;alfredapp.com">Alfred<&#47;a> is a rather handy little productivity applications for Mac OS X. It's extensible using shell scripts, AppleScript and in other ways which are too clever for me. Here's what I made it do for me; hopefully it'll be useful for you too.</p>
<p>These all require 0.9.9 or better. Most of them use Growl so I'd recommend having that installed too.</p>
<p>Simply click the extension icons to download the file and drag-and-drop into Alfred's extensions window.</p>
<h4>Change Network Location<&#47;h4><br />
[caption id="attachment_459" align="alignleft" width="95" caption="Network Location"]<a href="http:&#47;&#47;cl.ly&#47;2c081G0T1x002X0M2p0j"><img src="http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2011&#47;08&#47;alfred_exten-e1312312135223.png" alt="" title="Alfred Extension" width="95" height="117" class="size-full wp-image-459" &#47;><&#47;a>[&#47;caption]</p>
<p>Change to a new Network Location. Default keyword is <code>location<&#47;code> and you need to supply the start of a location name after it. It's case-insensitive so you could change to the <i>Automatic<&#47;i> location with <code>location auto<&#47;code>. Success or failure is reported using Growl.<br />
<br clear="both" &#47;></p>
<h4>Turn Wi-Fi* on or off<&#47;h4><br />
[caption id="attachment_459" align="alignleft" width="95" caption="Toggle AirPort"]<a href="http:&#47;&#47;cl.ly&#47;2h050E1F3u0Y3S1m1H3q"><img src="http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2011&#47;08&#47;alfred_exten-e1312312135223.png" alt="" title="Alfred Extension" width="95" height="117" class="size-full wp-image-459" &#47;><&#47;a>[&#47;caption]</p>
<p>Turns Wi-Fi&#47;AirPort on or off. The keyword is <code>airport<&#47;code> and I'm keeping it. If you want it to be "wi-fi" or something feel free to change it. The new status of Wi-Fi is reported using Growl.<br />
<br &#47;><br />
<small>* AirPort, for those of us on pre-Lion<&#47;small><br />
<br clear="both" &#47;></p>
<h4>Control the Shimo VPN client<&#47;h4><br />
[caption id="attachment_459" align="alignleft" width="95" caption="Shimo"]<a href="http:&#47;&#47;cl.ly&#47;0W192j0Y0P1e1t3j1M0L"><img src="http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2011&#47;08&#47;alfred_exten-e1312312135223.png" alt="" title="Alfred Extension" width="95" height="117" class="size-full wp-image-459" &#47;><&#47;a>[&#47;caption]</p>
<p>This allows you to control <a href="http:&#47;&#47;www.chungwasoft.com&#47;shimo&#47;">Shimo<&#47;a> from Alfred. The keyword is <code>vpn<&#47;code> and takes the name of a Shimo profile as a parameter. <b>Note that currently, the profile name is case-sensitive.<&#47;b> You can also use <code>disconnect<&#47;code> or <code>off<&#47;code> to make it disconnect.<br />
<br clear="both" &#47;></p>
<h4>Change wallpaper folder<&#47;h4><br />
[caption id="attachment_459" align="alignleft" width="95" caption="Wallpaper Folder"]<a href="http:&#47;&#47;cl.ly&#47;0B2u2Z1L1r273B2a193g"><img src="http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2011&#47;08&#47;alfred_exten-e1312312135223.png" alt="" title="Alfred Extension" width="95" height="117" class="size-full wp-image-459" &#47;><&#47;a>[&#47;caption]</p>
<p>This one lets me switch my laptop wallpaper between two folders, one of which is suitable for when I'm at work (or on a customer site) and the other one ... isn't :) You'll need to edit this one a little bit after installing it to set the path for your wallpaper folders. The two fields you need to change are near the top of the script so should be reasonably easy to spot. The keyword is <code>wallpaper<&#47;code> and it takes as an option either <code>sfw<&#47;code> or <code>nsfw<&#47;code>.<br />
<br clear="both" &#47;></p>
