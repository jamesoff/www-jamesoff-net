---
layout: post
status: publish
published: true
title: More RBL preparation
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 174
wordpress_url: http://jamesoff.net/site/2004/10/06/more-rbl-preparation/
date: '2004-10-06 13:51:41 -0400'
date_gmt: '2004-10-06 12:51:41 -0400'
categories:
- Coding
- General
- Sites
tags: []
comments: []
---
<p>I have set up a quick homepage for the RBL on <a href="http:&#47;&#47;rbl.jamesoff.net">rbl.jamesoff.net<&#47;a>, and I have released Check RBL 0.2 (hooray!)</p>
<ul>
<li>Can now set comments to unapproved (need moderating) instead of deleting<&#47;li>
<li>Sending of notification mail can be switched off<&#47;li>
<li>Added rbl.jamesoff.net to the default list<&#47;li><br />
<&#47;ul></p>
<p>This version should be a little less destructive in its default mode (it moderates rather than deletes). Noone sent me any bug reports for 0.1 so I can only assume my coding was perfect \o&#47;</p>
<p>Grab <a href="&#47;rbl.txt">Check RBL 0.2<&#47;a> here, rename it to "rbl.php" and bung it in <code>WORDPRESS&#47;wp-content&#47;plugins<&#47;code>, and enable it in the Plugins page. If you're already using 0.1, it's safe to overwrite your old version, but don't forget to check the new settings.</p>
