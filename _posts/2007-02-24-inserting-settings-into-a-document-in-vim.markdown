---
layout: post
status: publish
published: true
title: Inserting settings into a document in vim
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 267
wordpress_url: http://jamesoff.net/site/2007/02/24/inserting-settings-into-a-document-in-vim/
date: '2007-02-24 21:09:06 -0500'
date_gmt: '2007-02-24 20:09:06 -0500'
categories:
- vim
tags: []
comments: []
---
<p>After trying out a new setting in vim, I'll add it to my .vimrc. This is fine if it's something like `set hlsearch`, but if it's a new setting for the statusbar format or a new `grepprg` value, it can be quite complex to remember what you need to set it to.</p>
<p>Luckily, vim lets you insert the value of a setting into the document with a few easy-to-remember key strokes.</p>
<p>When in insert mode: `Ctrl-r = &` followed by the setting name and enter. Don't know why I didn't think of it before.</p>
