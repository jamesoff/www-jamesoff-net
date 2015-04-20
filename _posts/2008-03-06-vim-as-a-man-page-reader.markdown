---
layout: post
status: publish
published: true
title: vim as a man-page reader
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 339
wordpress_url: http://jamesoff.net/site/2008/03/06/vim-as-a-man-page-reader/
date: '2008-03-06 16:56:09 -0500'
date_gmt: '2008-03-06 16:56:09 -0500'
categories:
- Sysadmin
- FreeBSD
- Linux
tags:
- vim
comments:
- id: 22551
  author: ivucica
  author_email: ivucica@gmail.com
  author_url: http://ivan.vucica.net/
  date: '2009-03-17 16:04:09 -0400'
  date_gmt: '2009-03-17 16:04:09 -0400'
  content: |
    <p>This is sick, perverted, and ... I like it :)
    Although I'm too lazy to actually use it :D<&#47;p>
- id: 30615
  author: itai
  author_email: itai.fiat@gmail.com
  author_url: ''
  date: '2009-04-29 07:33:39 -0400'
  date_gmt: '2009-04-29 07:33:39 -0400'
  content: |
    <p>Very cool!<&#47;p>

    <p>Two comments:
    A. You might want to use "nmap " instead of "nmap".
    B. This breaks man page autocompletion - instead of being offered man pages, you're offered files in the current directory (as you would be for vim). Any ideas how to fix this?<&#47;p>
- id: 31815
  author: itai
  author_email: itai.fiat@gmail.com
  author_url: ''
  date: '2009-05-06 17:54:12 -0400'
  date_gmt: '2009-05-06 17:54:12 -0400'
  content: |
    <p>A solution to the above problem, and also a different approach:<&#47;p>

    <p>(a) Inside a directory in your $PATH (say, ~&#47;bin), create a file called '_man2vim', containing the following:<&#47;p>

    <p>#!&#47;bin&#47;sh
       col -b | vim -c 'set ft=man nomod' -<&#47;p>

    <p>Make this file executable.<&#47;p>

    <p>(b) Wherever it is you like to add aliases (be it .bashrc, .bash_alises, .zshrc or anything else), add the following alias:<&#47;p>

    <p>alias man='man --pager=_man2vim'<&#47;p>

    <p>(c) Voil&Atilde;&nbsp;.<&#47;p>
---
<p>Sure, why not :)</p>
<p>This goes in your zshrc:</p>
<pre lang="bash">
  vman() {<br />
    if [ $# -eq 0 ]; then<br />
      &#47;usr&#47;bin&#47;man<br />
    else<br />
      if man -w $* >&#47;dev&#47;null 2>&#47;dev&#47;null<br />
      then<br />
        &#47;usr&#47;bin&#47;man $* | col -b | vim -c 'set ft=man nomod' -<br />
      else<br />
        echo No man page for $*<br />
      fi<br />
    fi<br />
  }<br />
  alias man='vman'<br />
<&#47;pre></p>
<p>And this goes in your vimrc (in a suitable `augroup`):</p>
<pre lang="">
  autocmd FileType man setlocal ro nonumber nolist fdm=indent fdn=2 sw=4 foldlevel=2 | nmap q :quit<CR><br />
<&#47;pre></p>
<p>Now you'll get nicely highlighted man pages with folded sections, and you can hit `q` to quit just like `less`.</p>
<p><img src='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2008&#47;03&#47;vim-manpage.png' alt='Vim as a manpage viewer' &#47;></p>
