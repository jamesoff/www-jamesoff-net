---
layout: post
status: publish
published: true
title: Comment spam RBL
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 173
wordpress_url: http://jamesoff.net/site/2004/10/04/comment-spam-rbl/
date: '2004-10-04 15:21:41 -0400'
date_gmt: '2004-10-04 14:21:41 -0400'
categories:
- Coding
- General
- Spam
tags: []
comments:
- id: 633
  author: Dr Dave's Blog &raquo; Introducing Spam Karma
  author_email: ''
  author_url: http://unknowngenius.com/blog/archives/2004/11/19/spam-karma-merciless-spam-killing-machine/
  date: '2004-11-19 05:11:28 -0500'
  date_gmt: ''
  content: "[...] principle), and the discussion we had around it, got me thinking&#8230;
    \tJames Off, whose <a href=\"http:&#47;&#47;www.grooblehonk.co.uk&#47;archives&#47;2004&#47;10&#47;04&#47;comment-spam-rbl\">RBL
    server<&#47;a> is used by default by this plugin. \tchrys, Steph aka bunnywabbit,
    ma [...]"
- id: 634
  author: Dr Dave's Blog
  author_email: ''
  author_url: http://unknowngenius.com/blog/archives/2004/11/19/spam-karma-merciless-spam-killing-machine/
  date: '2004-11-19 06:16:23 -0500'
  date_gmt: '2004-11-19 05:16:23 -0500'
  content: |-
    <strong>Introducing Spam Karma<&#47;strong>
    The meanest, fiercest, most baddest Spam Killing Machine round the block...
---
<p>My RBL-based comment deleting script seems to work pretty well, except that a lot of the RBLs which the spammers appear in are RBLs that list dial-up space, and obviously that's no good, because while dial-up IPs should be sending mail directly, it's quite reasonable for them to browse the web.</p>
<p>So I thought, why not create my own RBL listing IP addresses known to spam blogs?</p>
<p>After failing to come up with any particularly convincing reasons why not, I did.</p>
<p>At the moment, it's a pretty simple mysql database which outputs data for rbldns every half hour. Entries will expire after two days, although I will probably change this (including making it so that IPs get listed for longer the more they show up, etc).</p>
<p>Currently only I can add IPs to the list (they expire automagically), but I shall create a patch for the comment moderation page in WP so you can "delete and report as spam" to automatically submit the entry to the RBL.</p>
<p>If you would like to try the RBL for yourself, stick <code>rbl.jamesoff.net<&#47;code> in your RBL list.</p>
<p>(Usual disclaimer about this is my list and if it deletes something you wanted bad luck etc :)</p>
