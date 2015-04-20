---
layout: post
status: publish
published: true
title: Setting localparts in Exchange Recipient Policies
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 261
wordpress_url: http://jamesoff.net/site/2007/01/29/setting-localparts-in-exchange-recipient-policies/
date: '2007-01-29 10:05:41 -0500'
date_gmt: '2007-01-29 09:05:41 -0500'
categories:
- Sysadmin
- Work
- Microsoft
- Exim and email
tags: []
comments: []
---
<p>It's taken me too long to find this.</p>
<p>(For the uninitiated, Exchange Recipient Policies tell Active Directory how to automatically generate email addresses for your users.)</p>
<p>If you want to tell a recipient policy in Exchange 2003 (and presumably 2007) how to generate the localpart other then just `username`, use these expanos:</p>
<p>> %s : Surname (last name)<br />
><br />
> %g : Given name (first name)<br />
><br />
> %i : Middle initial<br />
><br />
> %d : Display name<br />
><br />
> %m : Exchange 2003 alias<br />
><br />
> %rxy : Replace all subsequent characters x with character y in username. If x = y, the character will be deleted.</p>
<p>There are other things you can do like chopping the string to a certain number of characters, see the full article for details.</p>
<p>No longer will I have to manually add `first.last@domain.com` to every user I create :D</p>
<p>[http:&#47;&#47;support.microsoft.com&#47;Default.aspx?kbid=822447](http:&#47;&#47;support.microsoft.com&#47;Default.aspx?kbid=822447)</p>
