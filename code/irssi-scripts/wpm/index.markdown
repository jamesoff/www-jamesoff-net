---
layout: page
status: publish
published: true
title: wpm
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 342
wordpress_url: http://jamesoff.net/site/?page_id=342
date: '2008-04-09 10:44:02 -0400'
date_gmt: '2008-04-09 10:44:02 -0400'
categories:
- Uncategorized
tags: []
comments:
- id: 6599
  author: Dudley
  author_email: dudley@enterspace.org
  author_url: http://www.askduds.co.uk
  date: '2008-04-09 13:22:06 -0400'
  date_gmt: '2008-04-09 13:22:06 -0400'
  content: |
    <p>Hi I'm Dudley and I suck at installing scripts on the first 9 tries.<&#47;p>
- id: 6634
  author: dubkat
  author_email: dubkat@gmail.com
  author_url: http://sigterm.us
  date: '2008-04-09 23:08:11 -0400'
  date_gmt: '2008-04-09 23:08:11 -0400'
  content: |
    <p>You Are Doing It Wrong!<&#47;p>
- id: 19184
  author: jesse
  author_email: jesse@teranetworks.de
  author_url: http://geekosphere.org
  date: '2009-02-07 23:12:52 -0500'
  date_gmt: '2009-02-07 23:12:52 -0500'
  content: |
    <p>sweet idea. thanks :)<&#47;p>
---
<p>After discussing with my wife that we were both pretty fast typists, but that any kind of pressure to show people how fast we typed or attempt to measure your typing speed resulted in Doing It All Wrong because you were thinking about it too much, I decided to write an irssi script to monitor your WPM in the background.</p>
<p>So here it is.</p>
<p>* Dump in your `.irssi&#47;scripts` folder as usual<br />
* `&#47;script load wpm` to load it<br />
* Add its statusbar item somewhere. To put it on the end of the input line, do `&#47;statusbar prompt add wpm`. If you want to put it on a different statusbar, put that instead of `prompt`. See `&#47;help statusbar` for more information.<br />
* Type.</p>
<p>The first number on the statusbar item is the WPM of your last line. The number in brackets is your average (since the script was loaded). To reset your average, reload the script.</p>
<p>It should work fine out of the box, but if you want to tweak it there are a couple of settings:</p>
<p> * `&#47;set wpm_strict ON|OFF`: When on (default), anything that adds more than one character at a time to the line invalidates that line and it will be ignored. The usual suspects for this are nick completion and using `^Y` to insert the cutbuffer. *Pasting into your term is not detected and will inflate your WPM.* When off, pastes of <= 9 characters are allowed (nick completion on sensible networks).<br />
 * `&#47;set wpm_simple ON|OFF`: When off (default), words of more than 5 characters can count as more than one word. See Wikipedia's article on <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Typing#Words_per_minute" target="_blank">typing<&#47;a>. When on, words over 5 characters still only count as one.</p>
<p>v1.3 adds support for counting characters per minute too.</p>
<p> * `&#47;set show_wpm ON|OFF`: When on (default), show WPM stats in the statusbar.<br />
 * `&#47;set show_cpm ON|OFF`: When on (default), show CPM stats in the statusbar.</p>
<p>Even if the statusbar item isn't show stats for one of these, or if you remove the statusbar item entirely, the stats are still calculated.</p>
<p>Download <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2008&#47;04&#47;wpm.pl'>wpm.pl<&#47;a> v1.3</p>
