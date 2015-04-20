---
layout: post
status: publish
published: true
title: 'Goldmine: &#8216;email body not available&#8217;'
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 236
wordpress_url: http://jamesoff.net/site/2006/06/22/goldmine-email-body-not-available/
date: '2006-06-22 16:17:54 -0400'
date_gmt: '2006-06-22 15:17:54 -0400'
categories:
- Sysadmin
tags: []
comments:
- id: 1419
  author: Daniel
  author_email: dan@durrans.com
  author_url: http://www.durrans.com/
  date: '2006-06-24 22:40:12 -0400'
  date_gmt: '2006-06-24 21:40:12 -0400'
  content: We get this all the time at work. For us it happens when the database files
    (we run the borland database one, not the SQL one) get too big things start getting
    corrupted.
- id: 1420
  author: Doug Castell
  author_email: doug@castellcomputers.com
  author_url: http://www.castellcomputers.com
  date: '2006-10-24 23:13:49 -0400'
  date_gmt: '2006-10-24 22:13:49 -0400'
  content: |-
    James, good sleuthing!  This can happen if you have the preference for 'display next message when replying' in your internet preferences, I've found.  It's a really odd error, though.

    contactreview.com is gone for good, by the way.  I put up a replacement, contactreview.net, but it's not as active..

    Daniel, yes, the mailbox.dbt con only grow to 2 gigabytes, then it's FULL (a dBase limitation).  You'd be best served to use BR7 (freeware) from www.redstonesoftbase.com to delete a bunch of trash that you're very likely to have hidden away in your mail file.  I've helped a number of customers clear out hundred of megabytes of junk and gain much-needed breathing room in that file...
- id: 1421
  author: E
  author_email: em@emeraldadvisors.com
  author_url: ''
  date: '2006-11-15 17:00:00 -0500'
  date_gmt: '2006-11-15 16:00:00 -0500'
  content: |-
    When using BR7 to do this, what is it that you do?  Are you purging (therefore eliminating) old historic emails?  I have done this by eliminating the bodies of some repetitive mail merges.  Or, are you doing something that really is cleaning it and getting rid of excess (when you say deleting trash)?

    We are at nearly 2Gb right now, and I'd hate to lose any email bodies and history.

    What can I do to keep the history but not lose data as I approach 2GB?
- id: 1422
  author: Doug Castell
  author_email: doug@castellcomputers.com
  author_url: http://www.castellcomputers.com
  date: '2007-03-21 20:28:27 -0400'
  date_gmt: '2007-03-21 19:28:27 -0400'
  content: 'I''m using queries to identify junk (see article here: http:&#47;&#47;www.castellcomputers.com&#47;?p=59
    ) and using filtered deletion statements in BR to kill them off.  A quick PACK
    (also in BR) and the file is shrunk!'
- id: 111785
  author: Darren
  author_email: agenius@enigmaware.co.uk
  author_url: http://www.enigmaware.co.uk
  date: '2013-02-28 12:14:00 -0500'
  date_gmt: '2013-02-28 12:14:00 -0500'
  content: |
    <p>I know this post is old but I wanted to put a link to a tool that can help "shrink" the dbt file considerably for old GoldMine system<&#47;p>

    <p>Take a look<&#47;p>

    <p>http:&#47;&#47;www.enigmaware.co.uk&#47;goldmine&#47;gmtools.php<&#47;p>
---
<p>Just had to fix this error in Goldmine at work, where trying to view an "E-mail Out" action in a contacts history list resulted in an action window saying "Email body not available".</p>
<p>Thanks to a post on some forums which I had to pull out of Google's cache (<a href="http:&#47;&#47;www.contactreview.com&#47;mb&#47;showflat.php&#47;Cat&#47;0&#47;Number&#47;51262&#47;an&#47;&#47;page&#47;&#47;vc&#47;1">original<&#47;a>) I managed to fix it.</p>
<p>Goldmine seems to need the CONTHIST field LinkRecID to point to the RecID of the mail in the MAILBOX table. However, it also needs the LinkRecID in the MAILBOX entry to point back to CONTHIST's RecID. In this case, the MAILBOX entry didn't point back, so one quick SQL query fixed that. (And I had to restart GoldMine for it to notice).</p>
<p>No idea how that got unlinked as we don't use sync or anything, which is given as a possible way to break things by the forum post.</p>
