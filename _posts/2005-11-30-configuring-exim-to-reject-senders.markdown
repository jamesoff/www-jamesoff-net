---
layout: post
status: publish
published: true
title: Configuring exim to reject senders
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 215
wordpress_url: http://jamesoff.net/site/2005/11/30/configuring-exim-to-reject-senders/
date: '2005-11-30 20:09:42 -0500'
date_gmt: '2005-11-30 19:09:42 -0500'
categories:
- Spam
tags: []
comments: []
---
<p>Today I received two copies of the same mail: "re: Achieving your goals.......", size 1.3Mb.</p>
<p>Wait, 1.3Mb?</p>
<blockquote><p>
[-- Attachment #2: clip_image001.jpg --]<br />
[-- Type: image&#47;jpeg, Encoding: base64, Size: 523K --]</p>
<p>[-- Attachment #3: clip_image004.jpg --]<br />
[-- Type: image&#47;jpeg, Encoding: base64, Size: 752K --]<br />
<&#47;blockquote></p>
<p>(MIME part #1 was multipart&#47;alternative, so they at least got that right.)</p>
<p>This ended up in my inbox because my spam filters don't check messages over a certain size, to prevent killing my server. I thought that was a reasonable choice after all, which spammers would be dumb enough to spam with enormous attachments?</p>
<p>Apparently, New Era Publications UK <nepuk @newerapublications.com> is. (I hope a spammer scrapes this page and gets that address.)</p>
<p>I decided to teach Exim to reject senders with a a particular message, rather than just a generic "unwanted sender" message. I wanted to put addresses in a file that Exim could <code>lsearch<&#47;code> and the data of the key would be the given reason.</p>
<p>The Exim FAQ suggests a way of doing this (actually it suggests a way of indexing on pairs of sender=>recipient), but the example is broken.</p>
<p>Just in case anyone else finds it handy, here's a snippet for the RCPT ACL in Exim which rejects senders with a custom message.</p>
<p><code><br />
  deny<br />
    condition = ${if eq {${lookup{$sender_address}lsearch{&#47;usr&#47;local&#47;etc&#47;exim&#47;badsenders}}}{} \<br />
      {no}{yes}}<br />
    message =   ${lookup{$sender_address}lsearch{&#47;usr&#47;local&#47;etc&#47;exim&#47;badsenders}}<br />
<&#47;code></p>
<p>Pop that in your configure file, and create &#47;usr&#47;local&#47;etc&#47;exim&#47;badsenders (leave it empty if you don't have anything to go in it yet, but it MUST exist). Make sure the exim process can read it. Populate it with data like this:<br />
<code><br />
nepuk@newerapublications.com : Sending oversized spam<br />
example@jamesoff.net : This address never receives mail<br />
<&#47;code></p>
<p>You must put a reason else the condition won't trigger. HUP exim to make it notice the updated configuration, but you don't need to do that every time you add a new address to badsenders.<&#47;nepuk></p>
