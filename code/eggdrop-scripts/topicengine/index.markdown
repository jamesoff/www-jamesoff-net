---
layout: page
status: publish
published: true
title: TopicEngine
author:
  display_name: Administrator
  login: admin
  email: james-wpadmin@jamesoff.net
  url: ''
author_login: admin
author_email: james-wpadmin@jamesoff.net
wordpress_id: 5
wordpress_url: http://www.jamesoff.net/site/?page_id=5
date: '2005-07-24 11:41:42 -0400'
date_gmt: '2005-07-24 16:41:42 -0400'
categories:
- Uncategorized
tags: []
comments: []
---
<p>The TopicEngine script allows advanced topic control in your IRC channel(s).</p>
<p><strong>This script works fine, but can be quirky for features like prefix and postfix. I'm going to fix it, sometime :)<&#47;strong></p>
<p>Full help is available online in the script (`&#47;msg BOTNICK topic help`), but here's an overview:</p>
<p>`!topic [command] [parameter]`</p>
<p>or for some commands with shortcuts:</p>
<p>`!topic [shortcut][parameter]` (no space between the shortcut character and the parameter)</p>
<p>Where command (shortcut) is:</p>
<p>`add (+)`<br />
:  add (+)        Add the text to the topic</p>
<p>`append (<<<)`<br />
:  Add the text to the topic, deleting earlier stuff if needed</p>
<p>`insert (>>>)`<br />
:  Add the text to the start of the topic, deleting later stuff if needed</p>
<p>`del (-)`<br />
:  Delete an element. The first element is 1; prefixes and postfixes cannot be removed with this.</p>
<p>`set (=)`<br />
:  Set the topic to the text, removing anything else.<br />
:  `set prefix (=prefix)` will set the prefix<br />
:  `set postfix (=postfix)` will set the postfix. use "none" to delete the topic&#47;pre-&#47;postfix (`!topic =prefix none`)</p>
<p>`info (?)`<br />
:  Find out about the topic. No parameters will give into on the topic as a whole. Use with a number to find out about an element (!topic ?2).<br />
:  Use "info undo" to find out about the undo buffer</p>
<p>`undo`<br />
:  Reverse the last command.</p>
<p>`regexp (&#47;)`<br />
:  Do a regexp find&#47;replace on the topic. `!topic regexp 3 &#47;hello&#47;goodbye&#47;` or shortcut: `!topic &#47;3&#47;hello&#47;goodbye&#47;`. Options g and i are supported.</p>
<p>`clear`<br />
:  Clears the topic on irc, but remembers it in the bot. use rehash to get it back. clear content will clear everything but the pre-&#47;postfix.<br />
:  `clear all` will delete the whole thing.</p>
<p>`lock`<br />
:  locks the topic (channel owner only) from changes</p>
<p>`unlock`<br />
:  reverse a lock</p>
<p>`rehash (#)`<br />
:  set the topic again (if a server has lost it).<br />
:  use `rehash force` to force the topic to be set even if the bot doesn't think it needs doing. `!` is a shortcut for force (i.e. `!topic #!`)</p>
<p>Other shortcuts:<br />
----</p>
<p>*  Prefix the topic with `@` to lock it at the same time. (`!topic add @this will be locked`)<br />
*  Prefix the topic with `~` to delay the update. The bot will update its internal state but not set the topic on IRC. Use this to do many commands in a row without spamming the channel with topic changes.</p>
<p>Download: <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2008&#47;02&#47;topicengine-119tar.bz2' title='TopicEngine 1.19'>TopicEngine 1.19<&#47;a></p>
<p>Bugs, development version etc: [Trac](http:&#47;&#47;www.bmotion.net:8000&#47;scripts)</p>
