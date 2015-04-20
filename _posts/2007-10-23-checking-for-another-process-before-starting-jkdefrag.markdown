---
layout: post
status: publish
published: true
title: Checking for another process before starting JKDefrag
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 298
wordpress_url: http://jamesoff.net/site/2007/10/23/checking-for-another-process-before-starting-jkdefrag/
date: '2007-10-23 15:22:58 -0400'
date_gmt: '2007-10-23 14:22:58 -0400'
categories:
- Coding
- Sysadmin
- Work
- Microsoft
tags: []
comments: []
---
<p>A user on the <a href="http:&#47;&#47;www.kessels.com&#47;forum&#47;viewtopic.php?t=695">JKDefrag forum<&#47;a> was asking about not running JKDefrag if another process is running (as they don't play nice together), so I whipped this up.</p>
<p>You'll need <a href="http:&#47;&#47;www.microsoft.com&#47;technet&#47;sysinternals&#47;ProcessesAndThreads&#47;PsList.mspx">PsList<&#47;a> from SysInternals in your path somewhere.</p>
<p>Change the three SET lines to point to jkdefrag, give the parameters you want to use, and the name of the program to avoid. (Get the name of the program from PsList.)</p>
<p>The ">2 NUL" sends stderr to NUL to avoid printing the PsList banner. It works on Vista, not sure about XP&#47;2003. If it doesn't just remove it and live with the PsList banner showing up.</p>
<p>Making this check for more than one process is an exercise for the reader. Also, you could use this with PsExec to check for the process on a remote host and then launch JKDefrag over there.</p>
<pre lang="DOS">
@echo off</p>
<p>REM Only run jkdefrag if another process is not running</p>
<p>REM Path to jkdefrag<br />
SET JKDEFRAG=c:\jkdefrag\jkdefrag.exe</p>
<p>REM Options for jkdefrag<br />
SET JKDEFRAGOPTS=-a 3</p>
<p>REM Process we don't want running<br />
SET AVOID=explorer</p>
<p>REM Here we go!</p>
<p>pslist %AVOID% > NUL 2> NUL<br />
if %ERRORLEVEL% == 0 goto skip</p>
<p>REM If we made it here, pslist didn't find the process<br />
echo Couldn't find %AVOID% running, starting jkdefrag...<br />
%JKDEFRAG% %JKDEFRAGOPTS%<br />
goto end</p>
<p>:skip<br />
echo %AVOID% is running, not running jkdefrag</p>
<p>:end<br />
<&#47;pre></p>
