---
layout: post
status: publish
published: true
title: Spam processing
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 133
wordpress_url: http://jamesoff.net/site/2003/10/31/spam-processing/
date: '2003-10-31 16:41:09 -0500'
date_gmt: '2003-10-31 15:41:09 -0500'
categories:
- General
tags: []
comments: []
---
<p>Well I haven't had much luck getting my ADSL back online at home... as soon as I connect the router falls over and dumps "couldn't allocate 208 bytes" to the serial console repeatedly. Nice.</p>
<p>However, Manic has kindly lent me use of his mailserver to take the load for now. Within seconds of switching the MX records on jamesoff.net's DNS over, his machine was getting pretty flooded with incoming connections and bouncing mail (anything that's not james@jamesoff.net gets rejected).</p>
<p>This is the number of mails rejected in about 15 minutes:</p>
<blockquote><p>jinx# grep -c "jamesoff.net" &#47;var&#47;log&#47;exim_main<br />
560<br />
<&#47;blockquote></p>
<p>And this is the number of connections rejected because his mailserver was too busy:</p>
<blockquote><p>jinx# grep -c "too many connections" &#47;var&#47;log&#47;exim_main<br />
    3847<br />
<&#47;blockquote></p>
<p>Ouch.</p>
<p>Also, mail-1.tiscali.it needs to be taunt how to deliver mail properly, it stands out in the logs as trying to open about 8 connections to SMTP servers at once, which is just dumb:</p>
<blockquote><p>jinx# grep "Connection from" &#47;var&#47;log&#47;exim_main | awk '{print $5}' | sort | uniq -c | sort -nr | head -n10<br />
 232 195.130.225.147<br />
  96 195.130.225.151<br />
  75 202.182.64.160<br />
  47 199.196.132.5<br />
  42 129.174.1.55<br />
  41 80.191.24.8<br />
  40 194.230.0.17<br />
  38 193.188.38.11<br />
  36 195.27.230.231<br />
  34 195.130.225.148<br />
<&#47;blockquote></p>
<p>Note the top two hosts... mail-[15].tiscali.it. Morans.</p>
