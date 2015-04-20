---
layout: page
status: publish
published: true
title: History
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 317
wordpress_url: http://jamesoff.net/site/code/simplemonitor/history/
date: '2008-01-05 20:22:25 -0500'
date_gmt: '2008-01-05 20:22:25 -0500'
categories:
- Uncategorized
tags: []
comments: []
---
<pre>1.2 (20080105):<br />
	* Refactored monitor&#47;logger&#47;alerter registration code<br />
	  These objects are now more self-loading and just need to be<br />
		passed a dict of their config options.<br />
	* Changed to using packages for monitors, loggers and alerters.<br />
	* Fixed bug where initial failure time was always the most recent<br />
	  failure time.<br />
	* Fixed a bug with the DiskSpace monitor which meant the free space<br />
	  on non-Windows platforms was incorrectly calculated.<br />
	* Changed the intention of the DiskSpace monitior on non-Windows<br />
	  platforms to measure the non-superuser free space.<br />
	* Fixed a bug which could mean the main loop ignored the interval<br />
	  if an error occurred during tests.<br />
	* Better support for the dry_run setting on alerters<br />
	* BulkSMS sender now limits messages to 160 chars (otherwise BulkSMS<br />
	  rejects them).<br />
	* Formatted times in alerts to not include microseconds<br />
	* Fixed a bug where once a dependency of a monitor had succeeded once,<br />
	  failure didn't stop the dependent monitor running.</p>
<p>	+ Monitors now know their own name<br />
	+ Alerters now have configurable time ranges for operation.<br />
	+ Alerters now have days of operation.<br />
	+ Alerters can hold alerts that occur out-of-hours and update you<br />
	  if the monitor is still failed when they become in-hours.<br />
	+ Email alerts for failure now include downtime (which will be 0 for<br />
	  an alert that fires immediately, but may be useful for alerters with<br />
		a limit).</p>
<p><= 1.1:<br />
	* Changes not tracked.<br />
<&#47;pre></p>
