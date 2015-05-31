---
layout: post
status: publish
published: true
title: YNAB category check workflow for Alfred 2
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 565
wordpress_url: http://jamesoff.net/site/?p=565
date: '2013-07-20 10:29:40 -0400'
date_gmt: '2013-07-20 10:29:40 -0400'
categories:
- Coding
- Mac OS X
- alfred
tags: []
comments:
- id: 122980
  author: Seth Hall
  author_email: seth@middle8media.com
  author_url: ''
  date: '2013-07-26 15:24:11 -0400'
  date_gmt: '2013-07-26 15:24:11 -0400'
  content: |
    <p>Trying to understand how to add a "File Action" to search for my budget that is different from the default set up.<&#47;p>

    <p>Any help with this? New to Alfred Workflows.<&#47;p>

    <p>Thanks<&#47;p>
- id: 123299
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://jamesoff.net
  date: '2013-07-30 12:19:31 -0400'
  date_gmt: '2013-07-30 12:19:31 -0400'
  content: |
    <p>Hi Seth,<&#47;p>

    <p>Bring up Alfred and then tap the space bar once; this'll put a single quote into the search field and Alfred will behave more like a normal Spotlight search. Type <code>.ynab4<&#47;code> in and you should get a list of your budget files<&#47;p>

    <p>It should look like this screenshot: http:&#47;&#47;cl.ly&#47;image&#47;0844343c223c<&#47;p>

    <p>Highlight the one you want with the cursor keys, then tap the right-arrow which opens Alfred's File Actions list. On that list you should see a "Use for YNAB lookups" command - choose that and hit return.<&#47;p>
- id: 180385
  author: Manu
  author_email: smith@matrixagents.org
  author_url: ''
  date: '2015-01-29 16:37:21 -0500'
  date_gmt: '2015-01-29 16:37:21 -0500'
  content: |
    <p>Hi there,<&#47;p>

    <p>is this still supposed to work with the latest version of YNAB? It reports completely inaccurate values for me, e.g. saying I overspent 70 bucks where I should have 20 left. I can't make any sense of what it might calculate wrong and it's not limited to one category.<&#47;p>

    <p>I'd love to keep using this!<&#47;p>

    <p>Thanks in any case,
    Manu<&#47;p>
---
This is a workflow which lets you look up how much you have left in a [You Need a Budget](http://www.youneedabudget.com) category for the current month.

It looks for your budget file in `~/Dropbox/YNAB` and `~/Documents/YNAB`. If you have a single budget in one of those folders, it will use that and needs no configuration. If you have multiple budgets, or a budget somewhere else, you can use a File Action on it to select it as the budget to use.

Fuzzy/substring matching, tries to use the currency symbol/format based on the budget's configuration.

Hacked up the code to parse the YNAB data myself, so please make sure that it's reporting accurately for you :)

![screenshot](http://sakaki.jamesoff.net/~james/Screen Shot 2013-07-19 at 23.23.02.png)

![screenshot](http://sakaki.jamesoff.net/~james/Screen Shot 2013-07-19 at 23.21.37.png)

Download here: <http://cloud.jamesoff.net/2C04451d3R3Q>

(Updated 2014-08-27 to fix 0.00 values being shown as "overspent", and to add caching to speed up results.)
