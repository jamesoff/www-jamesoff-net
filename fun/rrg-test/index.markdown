---
layout: page
status: publish
published: true
title: Random Recipe Generator
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: https://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: https://jamesoff.net
wordpress_id: 355
wordpress_url: http://jamesoff.net/site/?page_id=355
date: '2008-07-04 14:10:52 -0400'
date_gmt: '2008-07-04 14:10:52 -0400'
categories:
  - Uncategorized
tags: []
comments: false
summary: A randomly generated recipe! Manufacture and consume with care.
---
Below is a randomly-generated recipe!

<div id="recipe">{% icon fa-cog fa-spin %} [mixing ingredients]</div>

<div id="yum">Yum.</div>

<div id="share"></div>

Insufficiently delicious? <input id="refresh" type="button" value="Refresh!" onclick="fetchRecipe();" /> <kbd>R</kbd>

Insufficiently insane? <input id="refreshinsane" type="button" value="Refresh insane mode!" onclick="fetchInsane();" /> <kbd>I</kbd>

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="/js/rrg-test.js"></script>

