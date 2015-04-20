---
layout: page
status: publish
published: true
title: Vim for Win32 with Python
author:
  display_name: Administrator
  login: admin
  email: james-wpadmin@jamesoff.net
  url: ''
author_login: admin
author_email: james-wpadmin@jamesoff.net
wordpress_id: 33
wordpress_url: http://jamesoff.net/site/projects/windows/vim-for-win32-with-python/
date: '2006-12-07 16:30:47 -0500'
date_gmt: '2006-12-07 16:30:47 -0500'
categories:
- Uncategorized
tags: []
comments:
- id: 3
  author: Mental flares of a neurotic mind &raquo; Python and Vista
  author_email: ''
  author_url: http://www.jomis.net/blog/?p=95
  date: '2007-03-02 06:08:59 -0500'
  date_gmt: '2007-03-02 06:08:59 -0500'
  content: '[...] Of course there are Eclipse and VS ways to code python, but thats
    far to bloated and I wanted a slim and portable environment to fit the language
    (and my soon coming mac transition). After some IDE &#47; Editor research (and
    due to the fact that IDLE does not work under Vista) this led me to my old companion
    Vim. Vim provides Syntax highlighting, Omnicompletion (if you have compiled it
    with python support) and with an additional script (build) and execution. Unfortunately
    the Win binaries you get from the page are not compiled with python support, so
    you can either do it yourself or you can download a prebuild version (vim 7.0
    against python 2.5) from here. If you do so you need to have Python 2.5 installed
    under C:Python25 or it won&#8217;t work. Now your are pretty much ready to start,
    if you want to ease the Ctrl+X Ctrl+O orgy you should install supertab as well
    and add the following line to your vimrc let g:SuperTabDefaultCompletionType =
    "<C-X><C-O>" (thanks to this page for the hint). [...]'
- id: 33300
  author: VIM as Python IDE | Alain M. Lafon
  author_email: ''
  author_url: http://blog.dispatched.ch/2009/05/24/vim-as-python-ide/
  date: '2009-05-23 23:14:50 -0400'
  date_gmt: '2009-05-23 23:14:50 -0400'
  content: |
    <p>[...] If you&#8217;re on Windows, GVIM will suffice(for versions != 2.4 search for the right plugin). If you&#8217;re on any other machine, you will probably know how to compile your very own VIM [...]<&#47;p>
---
<p>While trying my hand at wxPython, I found I needed +python for Python Omnicomplete.</p>
<p>The download below is for a Win32-native gvim with +python (Python 2.5) and all other defaults, except the `ARCH` which I changed to pentium4.</p>
<p>At some point, I'll scribble up a quick guide as to how I made it.</p>
<p>I'm assuming this binary doesn't depend on anything like the location of Python, but if it does, my Python was installed the default `C:\Python2.5`</p>
<p>This is only the `gvim.exe` binary at patchlevel 178; install the normal Win32 distribution and then replace `gvim.exe` with this version.</p>
<p>Download: <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2007&#47;12&#47;gvimpython.zip' title='gvim with python support for win32'>gvim with python support for win32<&#47;a></p>
<p><a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2007&#47;12&#47;vimpython.png' title='Vim with Python support'><img src='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2007&#47;12&#47;vimpython.thumbnail.png' alt='Vim with Python support' &#47;><&#47;a></p>
