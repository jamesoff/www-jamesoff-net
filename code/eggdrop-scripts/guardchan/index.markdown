---
layout: page
status: publish
published: true
title: GuardChan
author:
  display_name: Administrator
  login: admin
  email: james-wpadmin@jamesoff.net
  url: ''
author_login: admin
author_email: james-wpadmin@jamesoff.net
wordpress_id: 27
wordpress_url: http://jamesoff.net/site/guardchan/
date: '2006-09-24 10:57:47 -0400'
date_gmt: '2006-09-24 16:57:47 -0400'
categories:
- Uncategorized
tags: []
comments: []
---
<p>Guardchan is an eggdrop script which will kick (and optionally ban) anyone who joins a channel who isn't in the bot's userfile. If it's not opped then it'll `&#47;msg` a configurable nick to warn them.</p>
<p>To use this script:</p>
<p>1. Download it (link below)</p>
<p>2. Put the file .TCL file in your eggdrop's `scripts` directory</p>
<p>3. Edit the script to set your nick as the owner, and to choose if you want bans or not.</p>
<p>4. Get the bot to load it by adding this towards the end of your config:</p>
<p>   `source scripts&#47;guardchan.tcl`</p>
<p>5. Rehash your bot</p>
<p>6. Activate the script on the required channels:</p>
<p>   `.chanset #channel +guardchan`</p>
<p>And you're done.</p>
<p>Download: <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2008&#47;02&#47;guardchantar.gz' title='GuardChan'>GuardChan<&#47;a></p>
<p>Bugs, development version etc: [Trac](http:&#47;&#47;www.bmotion.net:8000&#47;scripts)</p>
