---
layout: post
status: publish
published: true
title: QuoteEngine?
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 79
wordpress_url: http://jamesoff.net/site/2003/01/15/quoteengine/
date: '2003-01-15 13:42:45 -0500'
date_gmt: '2003-01-15 12:42:45 -0500'
categories:
- General
tags: []
comments: []
---
<p>The quote script I'm running in NoTopic is all well and good, except for the bit where it's also a bit of a hack. It uses a perl script exec'd by TCL to handle database interaction, which is all well and good but it's also slow (because perl has to spin up every time something happens), potentially insecure (exec), and messy (as i found out when it didn't work and i had to fix it). Credit where credit's due, the authors did a pretty good job, but I feel like writing my own.<br &#47;><br />
<br &#47;><br />
I've found what looks like a reasonable TCL&#47;mySQL interface here: <a href="http:&#47;&#47;www.synthemesc.com&#47;MyT&#47;">http:&#47;&#47;www.synthemesc.com&#47;MyT&#47;<&#47;a> which I can use to acheive this, plus it means a PHP (or any other language) interface to the database will be easy to write.<br &#47;><br />
<br &#47;><br />
Preliminary feature ideas:<br &#47;><br />
<br &#47;><br />
!quote add <text><br &#47;><br />
!quote find|search [-regexp] [-count <n>|all] text<br &#47;><br />
!quote del <number><br &#47;><br />
!quote random<br &#47;><br />
!quote topic<br &#47;><br />
<br &#47;><br />
Perhaps I'll start coding soon, depending on when I get MyT working :)<br &#47;><br />
<br &#47;><br />
Thoughts are welcome in comments.<&#47;number><&#47;n><&#47;text></p>
