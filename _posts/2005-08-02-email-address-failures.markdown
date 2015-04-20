---
layout: post
status: publish
published: true
title: Email address failures
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 210
wordpress_url: http://jamesoff.net/site/2005/08/02/email-address-failures/
date: '2005-08-02 13:56:01 -0400'
date_gmt: '2005-08-02 12:56:01 -0400'
categories:
- Exim and email
tags: []
comments:
- id: 1038
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://www.jamesoff.net
  date: '2005-08-03 09:20:29 -0400'
  date_gmt: '2005-08-03 08:20:29 -0400'
  content: |-
    Guess they don't:

    A message that you sent could not be delivered to one or more of its
    recipients. This is a permanent error. The following address(es) failed:

      www.jamesoff@hotmail.com
        SMTP error from remote mail server after RCPT TO::
        host mx4.hotmail.com [65.54.253.230]: 550 Requested action not taken:
        mailbox unavailable
- id: 1039
  author: Duds
  author_email: dudley@enterspace.org
  author_url: ''
  date: '2005-09-13 15:19:01 -0400'
  date_gmt: '2005-09-13 14:19:01 -0400'
  content: Worse is that the sodding websites don't even need www :P
- id: 1040
  author: Greg
  author_email: greg@matryx.org.uk
  author_url: ''
  date: '2005-09-15 16:24:26 -0400'
  date_gmt: '2005-09-15 15:24:26 -0400'
  content: |-
    Actually Duds, www. should be required. It's just that in the majority of cases they either rewrite to each other, or basically end up at the same place.
    On several of our servers xxxxxxx.com will not end up with the same server as www.xxxxxx.com
---
<p>I wonder, do services like Hotmail have an address rewriting rule that rewrites www.somename@hotmail.com to somename@hotmail.com, given the number of people who don't understand the difference between a URL and an email address?</p>
