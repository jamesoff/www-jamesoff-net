---
layout: post
status: publish
published: true
title: Auto-RBL submission for SK
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 182
wordpress_url: http://jamesoff.net/site/2005/01/06/auto-rbl-submission-for-sk/
date: '2005-01-06 11:02:22 -0500'
date_gmt: '2005-01-06 10:02:22 -0500'
categories:
- Coding
- Spam
- RBL
tags: []
comments: []
---
<p>Having played with Spam Karma a bit, I've now added (experimental) support for auto-submitting IPs and URLs to the RBL. They're auto-submitted if a spam scores the maximum amount and is auto-deleted.</p>
<p>I've also changed the regular expression used for pulling out URLs from the comment so that it strips trailing slashes off the URL, although it still needs some work as it will sometimes pull bits of HTML out of the comment too.</p>
<p>If you want to try it (which would be much appreciated both for testing my code and for testing the RBL submission and updating) please hit <a href="http:&#47;&#47;rbl.jamesoff.net">the RBL homepage<&#47;a> for instructions.</p>
