---
layout: page
status: publish
published: true
title: Defining loggers
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 311
wordpress_url: http://jamesoff.net/site/code/simplemonitor/defining-loggers/
date: '2007-12-10 15:36:39 -0500'
date_gmt: '2007-12-10 15:36:39 -0500'
categories:
- Uncategorized
tags: []
comments: []
---
<p>Loggers are used by SimpleMonitor to record the state of all monitors after each interval.</p>
<p>The types of loggers are:</p>
<p> * *db*: Records the result of every monitor, every iteration (maintaining a history)<br />
 * *dbstatus*: Records a snapshot of the current state of every monitor<br />
 * *logfile*: Records a logfile of the result of every monitor, or only the monitors which failed. Each line is preceeded by the current UNIX timestamp.<br />
 * *html*: Writes an HTML file showing the status of all monitors (including remote ones).<br />
 * *network: Sends status of all monitors to a remote host.</p>
<p>## Defining a logger</p>
<p>The section name should be the name of your logger. This is the name you should give in the "loggers" setting in the "reporting" section of the configuration. All loggers take these two parameters.</p>
<p> * **type** is the type of logger to create. Choose one of the five in the list above. Required; no default.</p>
<p> * **depend** lists (comma-separated, no spaces) the names of the monitors this logger depends on. Use this if the database file lives over the network. If a monitor it depends on fails, no attempt will be made to update the database. Optional; no default.</p>
<p>### db and dbstatus loggers</p>
<p> * **path** is the path&#47;filename of the SQLite database file. You should initialise the schema of this file using the `monitor.sql` file in the distribution. You can use the same database file for many loggers. Required; no default.</p>
<p>### logfile loggers</p>
<p> * **filename** is the filename to write to. Rotating this file underneath SimpleMonitor will likely result in breakage (this will be addressed later). Required; no default.</p>
<p> * **buffered**: set to 1 if you aren't going to watch the logfile in real time. If you want to watch it with something like `tail -f` then set this to 0. Optional; default=0.</p>
<p> * **only_failures**: set to 1 if you only want failures to be written to the file. Optional; default=0.</p>
<p>### html loggers</p>
<p> * **folder**: the folder in which all the needed files live. Required; no default. This is probably going to be `html` if you don't move things around from the default distribution.</p>
<p> * **filename** is the filename to write out. The file will be updated once per interval (as defined in the main configuration). Required; no default. Relative to the **folder**. If you don't write the output file to the same folder as `folder` above, you will need to copy&#47;move `styles.css` to the same place.</p>
<p> * **header** is the header include file which is sucked in when writing the output file. Required; no default. Relative to **folder**.</p>
<p> * **footer** is the footer include file. Required; no default. Relative to **folder**.</p>
<p>The header and footer files do not necessarily need to be in the publicly accessibly folder that the output is written to, but no harm will come if they are.</p>
<p>The supplied header file includes JavaScript to notify you if the page either doesn't auto-refresh, or if SimpleMonitor has stopped updating it. This requires your machine running SimpleMonitor and the machine you are browsing from to agree on what the time is (timezone doesn't matter)!</p>
<p>### network</p>
<p>This logger is used to send status reports of all monitors to a remote instance. The remote instance must be configured to listen for connections.</p>
<p> * **host**: the remote host to send to. Required; no default<br />
 * **port**: the port on the remote host to connect to. Required; no default.</p>
<p>## Examples</p>
<p>See the <a href="..">Configuration<&#47;a> page for an example configuration.</p>
