---
layout: post
status: publish
published: true
title: Using gvim to edit mail in Outlook
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
excerpt: "Before you go any further, this isn't about having gvim embedded in Outlook,
  or using it automatically as an external editor.\r\n\r\nThis method lets you use
  one keystroke to edit a mail in gvim and when you close gvim, it's put back into
  the Outlook compose mail window.\r\n\r\n"
wordpress_id: 375
wordpress_url: http://jamesoff.net/site/?p=375
date: '2009-04-03 16:43:45 -0400'
date_gmt: '2009-04-03 16:43:45 -0400'
categories:
- vim
- Exim and email
tags:
- scripts
- vim
- outlook
- email
comments: []
---
<p>Before you go any further, this isn't about having gvim embedded in Outlook, or using it automatically as an external editor.</p>
<p>This method lets you use one keystroke to edit a mail in gvim and when you close gvim, it's put back into the Outlook compose mail window.</p>
<p><a id="more"></a><a id="more-375"></a></p>
<p><strong>You will need:<&#47;strong></p>
<ul>
<li><a href="http:&#47;&#47;www.autohotkey.com&#47;">AutoHotkey<&#47;a>, a keystroke mapping&#47;scripting application<&#47;li>
<li>My script (below)<&#47;li>
<li>gvim for Windows<&#47;li><br />
<&#47;ul></p>
<p><strong>Method:<&#47;strong></p>
<ol>
<li>Install AutoHotKey<&#47;li>
<li>Install gvim<&#47;li>
<li>Install my script into AutoHotKey (it appears at the end of this post). Note that my script has the gvim path hard-coded in and you may well need to change it.<&#47;li>
<li>Configure your Outlook to use plain text for composing mail.<&#47;li>
<li>Press <strong>Win-V<&#47;strong> with an Outlook compose window open and when the cursor is in the message pane<&#47;li><br />
<&#47;ol></p>
<p><strong>Serving suggestion:<&#47;strong></p>
<ul>
<li>Goes really well with <a href="http:&#47;&#47;home.in.tum.de&#47;~jain&#47;software&#47;outlook-quotefix&#47;">Outlook QuoteFix<&#47;a><&#47;li>
<li>gvim will be opened with the contents of the message window<&#47;li>
<li>Edit your mail in gvim and when done, save and quit<&#47;li>
<li>Your edited message is put back into the Outlook message window.<&#47;li><br />
<&#47;ul></p>
<p><strong>Additional notes:<&#47;strong></p>
<ul>
<li>At the moment, this only works with one mail at a time, as the file for the mail is statically named. If you try Win-V in a mail while you have another already opened, Bad Things will Happen.<&#47;li>
<li>You may want to adjust your vimrc file so that it uses the "mail" filetype for editing; I also have a mail.vim file with macros and things in it which I tell it to load for this. I pinched it off the web, I'm sure you can find it. The required vimrc lines are below.<&#47;li>
<li>If the cursor isn't in the message pane of the Outlook compose window when you press Win-V (or if it moves there before you close the gvim window), things will probably go wrong.<&#47;li>
<li>I've tested this with Outlook 2003, gvim 7.2 and AutoHotkey 1.0.47.06.<&#47;li><br />
<&#47;ul></p>
<p>Here's the optional vimrc line:</p>
<pre lang="vim">
autocmd BufRead *&#47;outlook.txt :source $HOME&#47;vimfiles&#47;mail.vim<br />
<&#47;pre></p>
<p>Here's the script itself:</p>
<pre lang="">
#v::<br />
SetTitleMatchMode, 2<br />
IfWinActive, Message (Plain Text)<br />
{<br />
	WinGet, ActiveWindow, ID<br />
	SendInput ^a<br />
	Send ^c</p>
<p>	clipboard = %clipboard%</p>
<p>	FileDelete, %TEMP%\outlook.txt<br />
	FileAppend, %Clipboard%, %TEMP%\outlook.txt</p>
<p>	RunWait, C:\Program Files\vim\vim72a\gvim.exe %TEMP%\outlook.txt</p>
<p>	FileRead, Clipboard, %TEMP%\outlook.txt</p>
<p>	WinActivate, ActiveWindow<br />
	Send ^a^v^{HOME}<br />
}<br />
<&#47;pre></p>
