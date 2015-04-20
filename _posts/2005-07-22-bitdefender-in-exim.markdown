---
layout: post
status: publish
published: true
title: BitDefender in Exim
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 209
wordpress_url: http://jamesoff.net/site/2005/07/22/bitdefender-in-exim/
date: '2005-07-22 17:09:10 -0400'
date_gmt: '2005-07-22 16:09:10 -0400'
categories:
- Sysadmin
- Exim and email
tags: []
comments: []
---
<p>After playing with BitDefender's free 'bdc' command-line scanner for FreeBSD, I've set up the mailserver at work to scan with clamav and then BitDefender. Since I couldn't find any canned examples online for how to do this, other than Exim's documentation for wiring up a generic command-line scanner, I thought I'd share it.<br />
<code><br />
    drop  message = This message contains malware ($malware_name) [scanner2]<br />
      set acl_m0 = cmdline:\<br />
        &#47;usr&#47;local&#47;bdc&#47;bdc --arc %s:\<br />
        infected:\<br />
        infected. (.+)<br />
      malware = *&#47;defer_ok<br />
<&#47;code><br />
[scanner2] is for indicating to me which scanner spotted the virus (for stats and debugging). The <code>set acl_m0<&#47;code> stuff is to do with using muliple virus scanners. In the first section of my Exim config I have <code>av_scanner = $acl_m0<&#47;code>. If you're not using multiple scanners, then set <code>av_scanner<&#47;code> to<br />
<code><br />
cmdline:\<br />
        &#47;usr&#47;local&#47;bdc&#47;bdc --arc %s:\<br />
        infected:\<br />
        infected. (.+)<br />
<&#47;code><br />
and delete the <code>set<&#47;code> line from the ACL block.</p>
