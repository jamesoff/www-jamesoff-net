---
layout: page
status: publish
published: true
title: MailRemind
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 362
wordpress_url: http://jamesoff.net/site/?page_id=362
date: '2008-11-03 11:09:49 -0500'
date_gmt: '2008-11-03 11:09:49 -0500'
categories:
- Uncategorized
tags: []
comments: []
---
<p>MailRemind will make your phone beep periodically while you have an unread SMS in your inbox. This mimics the behaviour of the Motorola SLVR (and probably some other phones too).</p>
<p>You can customise the interval for the beep as well as the sound file (MP3) used for it. MailRemind is clever enough not to beep unless you're in a suitable profile (currently General, Outdoor and Pager).</p>
<p>(TODO: Screenshot)</p>
<h2>Installation<&#47;h2></p>
<p>MailRemind is a <a href="http:&#47;&#47;opensource.nokia.com&#47;projects&#47;pythonfors60&#47;">Python for S60<&#47;a> application, packaged into a standalone .sis file.</p>
<p>You will need to install the Python for S60 <a href="http:&#47;&#47;sourceforge.net&#47;project&#47;showfiles.php?group_id=154155&package_id=171153">runtime<&#47;a> for this to work. If you have already installed the Python runtime for something else, you can skip this step, assuming it's up-to-date. Grab the file called PythonForS60_1_4_4_XXX.sis where XXX matches the platform of your phone (e.g. 3rdEd for N95 8GB). Install that first.</p>
<p>Download the MailRemind .sis file (below) and install that. You will be prompted to confirm that the application is allowed to read user data. It needs this permission in order to check for unread SMS messages in your inbox. If you deny this permission, the app will not work!</p>
<h2>Usage<&#47;h2><br />
Find MailRemind in your Applications folder (N95) and start it. The first time you start it, it will warn you about not having a sound file defined. Scroll down to the <strong>Sound file<&#47;strong> entry and press the select button. You will be offered a list of all MP3 files which are in \Sounds\Digital on the phone and the memory card. Choose the one you want.</p>
<p>MailRemind saves settings between runs, so once you've chosen your sound file, you won't have to select it again.</p>
<p>To change the interval between beeps, highlight the Interval item and press select. Enter a number of seconds between alerts (e.g. 300 = 5 minutes, 900 = 15 minutes).</p>
<p>To temporarily disable MailRemind, you can highlight the Status line and press select. Press select again to enable it.</p>
<p>Currently it is not possible to change which profiles MailRemind is active in, but this is on the TODO list. This item appears on the menu as a reminder.</p>
<p>You MUST leave this application running in the background. Press the menu key to leave it running without quitting. Unfortunately you cannot hide it from the task list at the moment.</p>
<h2>TODO<&#47;h2></p>
<ul>
<li>Icon<&#47;li>
<li>Ability to select profile<&#47;li>
<li>Ability to hide from task list<&#47;li><br />
<&#47;ul></p>
<h2>Download<&#47;h2><br />
&raquo; Download <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2008&#47;11&#47;mailremind_v1_3_0.sis'>MailRemind 1.3<&#47;a></p>
