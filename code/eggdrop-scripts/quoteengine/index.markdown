---
layout: page
status: publish
published: true
title: QuoteEngine
author:
  display_name: Administrator
  login: admin
  email: james-wpadmin@jamesoff.net
  url: ''
author_login: admin
author_email: james-wpadmin@jamesoff.net
wordpress_id: 6
wordpress_url: http://www.jamesoff.net/site/?page_id=6
date: '2005-07-24 11:41:54 -0400'
date_gmt: '2005-07-24 16:41:54 -0400'
categories:
- Uncategorized
tags: []
comments:
- id: 4103
  author: kbc
  author_email: kbc@dex4.de
  author_url: ''
  date: '2008-02-24 20:57:15 -0500'
  date_gmt: '2008-02-24 20:57:15 -0500'
  content: "<p>Hi, i've your tcl here on my system, i use it, but i found a bug or
    somthing like,\nwhen i'm try to change the channel over the php script, that i
    can see every other qoute from the other chans, it woun't work - so to get the
    php script to work i've to add $channel = $_GET['channel']; to index.php and it
    works fine\nsorry about my bad english ...<&#47;p>\n\n<p>have a nice day \nkbc
    ;)<&#47;p>\n"
- id: 16915
  author: silicon
  author_email: silicon1@mail.ru
  author_url: ''
  date: '2008-11-25 06:56:28 -0500'
  date_gmt: '2008-11-25 06:56:28 -0500'
  content: |
    <p>Your script is awesome, I hope you will continue it's development or at least support.<&#47;p>
- id: 17732
  author: Hibia
  author_email: hibia@fakku.net
  author_url: ''
  date: '2009-01-04 08:51:12 -0500'
  date_gmt: '2009-01-04 08:51:12 -0500'
  content: |
    <p>Thanks a lot for your script! I'm already making good use of it, and just to note on kbc's note.<&#47;p>

    <p>$channel = $_GET['channel'];
    $filter = $_GET['filter'];<&#47;p>

    <p>Need to be added to the first block of php code for filtering to work too.<&#47;p>

    <p>Also, make sure your php settings allow for <? to be taken as <?php, that is a requirement in this script.<&#47;p>
- id: 18062
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://jamesoff.net
  date: '2009-01-17 00:53:16 -0500'
  date_gmt: '2009-01-17 00:53:16 -0500'
  content: |
    <p>Thanks for the note! The webpage for the QE is indeed in need of some Best Practices; I keep meaning to fix it properly but never seem to get round to it...<&#47;p>
- id: 18451
  author: Demonicpagan
  author_email: demonicpagan@gmail.com
  author_url: http://lunaradvent.stelth2000inc.com
  date: '2009-01-26 22:51:10 -0500'
  date_gmt: '2009-01-26 22:51:10 -0500'
  content: |
    <p>Yeah, I would really like to see an update for the QE web page. I've done a few mods to it as you could see in my link. But there were some things I haven't been able to figure out with preg_match and preg_replace.<&#47;p>
- id: 77545
  author: Jorixine
  author_email: jorixine@gmail.com
  author_url: ''
  date: '2011-05-06 11:41:20 -0400'
  date_gmt: '2011-05-06 11:41:20 -0400'
  content: |
    <p>Is this script still maintained ?<&#47;p>
- id: 182163
  author: imgur
  author_email: vaniabuss@care2.com
  author_url: http://imgur.com/
  date: '2015-02-12 13:56:04 -0500'
  date_gmt: '2015-02-12 13:56:04 -0500'
  content: "<p>It means that you get total discounts at the time of subscription.
    One should \nkeep in mind that communication lines for live support are kept open
    for paid accounts, who are given top priority.<&#47;p>\n\n<p>These connections
    and resource sharing can even be made across different operating systems such
    as Unix,\nLinux and Microsoft Windows.<&#47;p>\n"
---
<p>The QuoteEngine is a IRC quote database script for eggdrop which interfaces with mySQL to store the quotes. It supports multiple channels and easy-to-manage permissions. It also has a web interface for browsing the quotes.</p>
<p>Use <code>!quotehelp<&#47;code> in a channel the script is active in to get help.</p>
<p><strong>Please note: A previous version of this script was vulerable to SQL injection (oops) and it should now be all fixed; however as a best practice you should ALWAYS run Internet-facing applications in their own database and only give their user permissions for that database.<&#47;strong></p>
<p>Download: <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2008&#47;01&#47;quoteengine-120tar.gz' title='QuoteEngine 1.2.0'>QuoteEngine 1.2.0<&#47;a></p>
<p>Bugs, development version etc: [Trac](http:&#47;&#47;www.bmotion.net:8000&#47;scripts)</p>
<p>Use<br />
--</p>
<p>For installation instructions please see the `README` file.</p>
<p>These instructions assume you've got it installed and working.</p>
<p>Basic commands<br />
---</p>
<p>`!addquote AN AMUSING QUOTE`<br />
:  Adds the amusing quote to the database. The bot replies with the quote ID if it was successful.</p>
<p>`!getquote ID`<br />
:  Fetches the quote from the database, and says who added it, when and on which channel.</p>
<p>`!randquote`<br />
:  Fetches a single random quote from the database for the channel.<br />
:  Add `--all` to pick a random quote from any channel.</p>
<p>More advanced<br />
---</p>
<p>`!findquote TEXT`<br />
:  Searches the database for quotes containing TEXT. Results are returned in random order. By default only 5 are given in the channel.<br />
:  Add `--all` to search all channels, otherwise results just come from the channel the command is issued in.</p>
<p>`!quoteurl`<br />
:  Gives you the URL where you can browse quotes online (if available).</p>
<p>`!delquote ID`<br />
:  Deletes quote ID from the database. You can only delete if you're the person who added it, or if you're a bot&#47;channel master in eggdrop.</p>
<p>`!quoteversion`<br />
:  Gives the version of the script.</p>
<p>`!quotehelp`<br />
:  Spews a load of help text to you in a query.</p>
