---
layout: post
status: publish
published: true
title: YNAB category check workflow for Alfred 2
original: /site/2013/07/20/ynab-category-check-workflow-for-alfred-2
date: '2013-07-20 10:29:40 -0400'
date_gmt: '2013-07-20 10:29:40 -0400'
categories:
- Coding
- Mac OS X
- alfred
tags: []
---
This is a workflow which lets you look up how much you have left in a [You Need a Budget](http://www.youneedabudget.com) category for the current month.

It looks for your budget file in `~/Dropbox/YNAB` and `~/Documents/YNAB`. If you have a single budget in one of those folders, it will use that and needs no configuration. If you have multiple budgets, or a budget somewhere else, you can use a File Action on it to select it as the budget to use.

Fuzzy/substring matching, tries to use the currency symbol/format based on the budget's configuration.

Hacked up the code to parse the YNAB data myself, so please make sure that it's reporting accurately for you :)

![screenshot](/i/alfred-ynab-1.png)

![screenshot](/i/alfred-ynab-2.png)

Download here: <http://cloud.jamesoff.net/2C04451d3R3Q>

(Updated 2014-08-27 to fix 0.00 values being shown as "overspent", and to add caching to speed up results.)
