---
layout: post
status: publish
published: true
title: Accidental overloads
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 105
wordpress_url: http://jamesoff.net/site/2003/05/29/accidental-overloads/
date: '2003-05-29 09:11:39 -0400'
date_gmt: '2003-05-29 08:11:39 -0400'
categories:
- Coding
tags: []
comments: []
---
<p>Last night I fixed a "problem" with the <a href="http:&#47;&#47;www.jamesoff.net&#47;go&#47;topicengine">TopicEngine<&#47;a> that a friend was having - some bizarre TCL error telling me I wasn't passing enough parameters to an internal eggdrop function.<br &#47;><br />
<br &#47;><br />
After a bit of digging through my script and determining exactly where it was falling over, I decided TE wasn't at fault so it must be one of his other scripts -- and sure enough, one of those damn public command-type scripts (!op, !kick, etc) declared a procedure called "topic" ... which is the same name as the eggdrop function to get the topic for a channel. *sigh* On commenting out that proc definition (since the TE handles !topic anyway) it magically started working.<br &#47;><br />
<br &#47;><br />
I've emailed the author of said script, be interesting to see what he has to say.<br &#47;><br />
<br &#47;><br />
In other news, I've found was is possibly the most useful shell extension on the planet: It's called <a href="http:&#47;&#47;www.tortoisecvs.org">TortoiseCVS<&#47;a>, and it makes Explorer understand CVS folders. You can checkout from CVS in Explorer, and then files get coloured according to their CVS status. The context menu for folders and files also gains a load of CVS commands like commit, very useful. Highly recommended to anyone who works with CVS.</p>
