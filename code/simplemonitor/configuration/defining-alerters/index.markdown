---
layout: page
status: publish
published: true
title: Defining alerters
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 312
wordpress_url: http://jamesoff.net/site/defining-alerters/
date: '2007-12-10 15:44:59 -0500'
date_gmt: '2007-12-10 15:44:59 -0500'
categories:
- Uncategorized
tags: []
comments: []
---
<p>Alerters send one-off alerts when a monitor fails. They can also send an alert when it succeeds again.</p>
<p>An alerter knows if it is urgent or not; If a monitor defined as non-urgent fails, an urgent alerter will not trigger for it. This means you can avoid receiving SMS alerts for things which don't require your immediate attention.</p>
<p>The types of alerter are:</p>
<p> * *email*: Sends an email when a monitor fails. Sends an email when it succeeds again. Requires an SMTP server to talk to. Non-urgent (all monitors will trigger this alerter.)<br />
 * *bulksms*: Sends an SMS alert when a monitor fails. Does not send an alert for when it succeeds again. Uses the [BulkSMS](http:&#47;&#47;www.bulksms.co.uk) service, which requires subscription. The messages are sent over HTTP on port 5567. (Urgent, so `urgent=0` monitors will not trigger an SMS.)<br />
 * *syslog*: Writes an entry to the syslog when something fails or succeeds. Not supported on Windows.</p>
<p>Defining an alerter<br />
---</p>
<p>The section name should be the name of your alerter. This is the name you should give in the "alerters" setting in the reporting section of the main configuration. All alerters share these settings:</p>
<p> * **type** is the type of alerter. You can choose from `email` to send mail, or `bulksms` to send SMS alerts using the BulkSMS service, or `syslog` for the syslog alerter. Required; no default.<br />
 * **depend** is a list of monitors this alerter depends on. If any of them fail, no attempt will be made to send the alert. (For example, there's no point trying to send an email alert to an external address if your route(s) to the Internet are down.) Optional; no default.<br />
 * **limit** is the number of times a monitor must fail before this alerter will fire. This number uses the virtual fail count, so if a monitor has a tolerance of 3 and an alerter has a limit of 2, the monitor must fail 5 times before an alert is sent. You can use this to escalate an alert to another email address if the problem is ongoing for too long, for example. Optional; default=1.<br />
 * **dry_run** will make an alerter do everything except actually send the message. Instead it will print some information about what it would do. Use when you want to test your configuration without generating emails&#47;SMSes. Set to 1 to enable. Optional; default=0.</p>
<p>#### Time periods<br />
All alerters accept time period configuration. By default, an alerter is active at all times, so you will always immediately receive an alert at the point where a monitor has failed enough (more times than the limit). To set limits on when an alerter can send:</p>
<p> * **day**: Which days an alerter can operate on. This is a comma-separated list of integers. 0 is Monday and 6 is Sunday. Optional, default is all days.<br />
 * **times_type**: Set to one of `always`, `only`, or `not`. "Only" means that the limits define the period that an alerter can operate. "Not" means that the limits define the period during which it will not operate. Optional, default: always.<br />
 * **time_lower** and **time_upper**: If `times_type` is `only` or `not`, these two settings define the time limits. `time_lower` must always be the lower time. The time format is `hh:mm` using 24-hour clock. Both are required if `times_type` is anything other than `always`.<br />
 * **delay**: If any kind of time&#47;day restriction applies, the alerter will notify you of any monitors that failed while they were unable to alert you and are still failed. If a monitor fails and recovers during the restricted period, no catch-up alert is generated. Set to 1 to enable. Optional, default=0.</p>
<p>Here's a quick example of setting time periods:</p>
<p>**Don't send me SMSes while I'm in the office** (8:30am to 5:30pm Mon-Fri):</p>
<pre lang="ini">
[out_of_hours]<br />
type=bulksms<br />
...<br />
times_type=not<br />
time_lower=08:30<br />
time_upper=17:30<br />
days=0,1,2,3,4<br />
<&#47;pre></p>
<p>**Don't send me SMSes at antisocial times, but let me know later if anything broke and didn't recover:**</p>
<pre lang="ini">
[nice_alerter]<br />
type=bulksms<br />
...<br />
times_type=only<br />
time_lower=07:30<br />
time_upper=22:00<br />
delay=1<br />
<&#47;pre></p>
<p>### Email alerters</p>
<p> * **host** is the email server to send the message to (via SMTP). Required; no default.<br />
 * **from** is the email address the email should come from. Required; no default.<br />
 * **to** is the email address to email should go to. Required; no default.</p>
<p>### BulkSMS alerters</p>
<p> * **sender** is who the SMS should appear to be from. Max 11 chars. Try to avoid non alphanumeric characters. Optional; default=SmplMntr.<br />
 * **username** is your BulkSMS username. Required; no default.<br />
 * **password** is your BulkSMS password. Required; no default.<br />
 * **target** is the number to send the SMS to. Prefix the country code but drop the +. UK example: 447777123456. Required; no default.</p>
<p>### Syslog alerters<br />
Syslog alerters have no additional options.</p>
<p>## Example</p>
<p>See the <a href="..">Configuration<&#47;a> page for an example configuration.</p>
