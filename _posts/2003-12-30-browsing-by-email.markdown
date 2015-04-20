---
layout: post
status: publish
published: true
title: Browsing by email
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 144
wordpress_url: http://jamesoff.net/site/2003/12/30/browsing-by-email/
date: '2003-12-30 20:29:42 -0500'
date_gmt: '2003-12-30 19:29:42 -0500'
categories:
- Coding
tags: []
comments: []
---
<p>Unfortunately, Roz isn't allowed to browse the web at work, but she is allowed email. When her job changes early 2004, she should be able to browse, but in a restricted fashion. In order to alleviate the pain (and to see if I could make it work), I wrote browse.pl.</p>
<p>It expects to be run with an email coming in on standard input, and it pulls a URL out of the subject line, gets <a href="http:&#47;&#47;w3m.sourceforge.net&#47;">w3m<&#47;a> to render it, and then fires up <a href="http:&#47;&#47;cr.yp.to&#47;qmail.html">qmail-inject<&#47;a> to deliver the rendered page back to the originating email address. All that's needed to enable it is "|&#47;path&#47;to&#47;browse.pl" in a .qmail file for some address or alias. Hurrah. Oh, and it's password-protected too.</p>
<p>Here's the code in case it's of any use to you.</p>
<blockquote><p>
#!&#47;usr&#47;bin&#47;perl -w</p>
<p>my $password = "";<br />
my $url = "";<br />
my $contents = "";<br />
my $replyto = "";</p>
<p>while (<>) {<br />
        if (&#47;^Subject: (.+) http:\&#47;\&#47;(.+)&#47;) {<br />
                $password = $1;<br />
                $url = $2;<br />
        }</p>
<p>        if (&#47;^From:.+< (.+)>&#47;) {<br />
                $replyto = $1;<br />
        }<br />
}</p>
<p>if (($password eq "THE PASSWORD") && ($url ne "") && ($replyto ne "")) {<br />
        system 'logger', '-tbrowse', "$replyto requested url http:&#47;&#47;$url";<br />
        #escape bad chars<br />
        $url =~ s&#47;([&|;])&#47;\$1&#47;g;</p>
<p>        open ARR, "w3m -dump -cols 70 $url |";<br />
        while (<arr>) {<br />
                $contents .= $_;<br />
        }<br />
        close ARR;<br />
        open QMAIL, "|qmail-inject";<br />
        print QMAIL < < "EOF";<br />
Subject: $url<br />
To: $replyto</p>
<p>Here is the output from your browsing request.</p>
<p>----SNIP 8<----<br />
$contents<br />
----SNIP 8<----</p>
<p>EOF<br />
        close QMAIL;<br />
}<br />
else {<br />
        system 'logger', '-tbrowse', "incorrect&#47;missing values from $replyto (pass: $password, url: $url)";<br />
        if ($replyto ne "") {<br />
                open QMAIL, "|qmail-inject";<br />
                print QMAIL << "EOF";<br />
Subject: Error processing browse request :(<br />
To: $replyto</p>
<p>Sorry, but your request could not be processed.</p>
<p>Possible causes:<br />
 * the password may have be incorrect<br />
 * incorrect subject line format<br />
 * headers incorrect</p>
<p>The correct format for the subject line is:</p>
<password> http:&#47;&#47;<url></p>
<p>e.g.<br />
SOMEPASS http:&#47;&#47;www.jamesoff.net</p>
<p>EOF<br />
                close QMAIL;<br />
        }<br />
}<br />
<&#47;url><&#47;><&#47;arr><&#47;><&#47;><&#47;blockquote></p>
