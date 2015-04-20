---
layout: post
status: publish
published: true
title: Using dsquery to find inactive users in AD
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 223
wordpress_url: http://jamesoff.net/site/2006/02/24/using-dsquery-to-find-inactive-users-in-ad/
date: '2006-02-24 11:40:16 -0500'
date_gmt: '2006-02-24 10:40:16 -0500'
categories:
- Microsoft
tags: []
comments:
- id: 1145
  author: Luis Garcia
  author_email: lgarcia@smartcitytelecom.com
  author_url: ''
  date: '2006-05-25 02:30:57 -0400'
  date_gmt: '2006-05-25 01:30:57 -0400'
  content: If your like me your domain is mixed,  You can retreive the information
    per each object if you query the LDAP via ASP,VB or some sort of programming level.
---
<p>While reading the study guide for 70-290 (Managing a Win2k environment) I was pleased to find you could use <code>dsquery<&#47;code> to find users in your AD who had been inactive for a certain amount of time.  However, it failed to mention that your AD must be at the Windows Server 2003 functional level for this to work, else it will complain:</p>
<blockquote><p>C:\>dsquery user -inactive 4 dsquery failed: The parameter is incorrect.</p>
<p>Windows could not run this query because you are connected to a domain that does not support this query.</p>
<p>type dsquery &#47;? for help.<&#47;blockquote><br />
After raising the functional level from Windows 2000 to Windows Server 2003 it works without complaining, but doesn't return any data - I guess it's not even stored until you fix the functional level.</p>
