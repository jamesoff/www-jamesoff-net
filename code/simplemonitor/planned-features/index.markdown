---
layout: page
status: publish
published: true
title: Planned features
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 315
wordpress_url: http://jamesoff.net/site/code/simplemonitor/planned-features/
date: '2007-12-11 14:56:05 -0500'
date_gmt: '2007-12-11 14:56:05 -0500'
categories:
- Uncategorized
tags: []
comments:
- id: 5249
  author: Mark
  author_email: znxster@gmail.com
  author_url: http://kutzooi.co.uk/
  date: '2008-03-19 19:30:03 -0400'
  date_gmt: '2008-03-19 19:30:03 -0400'
  content: |
    <p>Python has a nice quick way for getting the loadavg. Simply os.getloadavg(), returns (float, float, float) representing the 1, 5 and 15 minutes. Sweet script.<&#47;p>
- id: 24841
  author: larry
  author_email: larryt@winfirst.com
  author_url: ''
  date: '2009-03-29 20:27:02 -0400'
  date_gmt: '2009-03-29 20:27:02 -0400'
  content: |
    <p>configure alert periods in monitor.ini like:<&#47;p>

    <p>time_type=only
    time_lower=07:30
    time_upper=20:00<&#47;p>
- id: 161260
  author: jordan
  author_email: jordan@copiousit.com
  author_url: http://jordaneunson.com
  date: '2014-08-16 17:45:32 -0400'
  date_gmt: '2014-08-16 17:45:32 -0400'
  content: |
    <p>Would you be able to create a module that would do a tcp port connection test?<&#47;p>
- id: 164361
  author: Anton
  author_email: aaa@aaa.com
  author_url: ''
  date: '2014-08-29 07:26:32 -0400'
  date_gmt: '2014-08-29 07:26:32 -0400'
  content: "<p>Hey mate!<&#47;p>\n\n<p>Can you please include this class in your Monitor&#47;network.py
    script and corresponding part for \"dns\" type? \nI'm using it to monitor provider&#47;customer&#47;our
    load balancer DNS servers...<&#47;p>\n\n<p>class MonitorDNS(Monitor):\n    \"\"\"Resolve
    DNS to make sure it's up\"\"\"<&#47;p>\n\n<pre><code>host = \"\"\nquery = \"\"\nserver
    = \"\"\nnslookup_command = \"\"\nnslookup_regexp = \"\"\ntype = \"dns\"\n\ndef
    __init__(self, name, config_options):\n    \"\"\"\n    Note: Minor difference
    for Windows.\n    \"\"\"\n    Monitor.__init__(self, name, config_options)\n    if
    self.is_windows(allow_cygwin=True):\n        self.nslookup_command = \"nslookup
    -querytype=%s %s %s\"\n    else:\n        self.nslookup_command = \"nslookup -querytype=%s
    -debug %s %s 2> &#47;dev&#47;null\"\n    try:\n        query = config_options[\"query\"]\n
    \       host = config_options[\"host\"]\n        server = config_options[\"server\"]\n
    \       nslookup_regexp = config_options[\"regexp\"]\n    except:\n        raise
    RuntimeError(\"Required configuration fields missing\")\n    if host == \"\":\n
    \       raise RuntimeError(\"missing hostname\")\n    if query == \"\":\n        raise
    RuntimeError(\"missing query\")\n    if server == \"\":\n        raise RuntimeError(\"missing
    server\")\n    if nslookup_regexp == \"\":\n        raise RuntimeError(\"missing
    regexp\")\n\n    self.host = host\n    self.query = query\n    self.server = server\n
    \   self.nslookup_regexp = nslookup_regexp\n\ndef run_test(self):\n    r = re.compile(self.nslookup_regexp)\n
    \   try:\n        process_handle = os.popen(self.nslookup_command % (self.query,self.host,self.server)
    )\n        for line in process_handle:\n            matches = r.search(line)\n
    \           if matches:\n                self.record_success()\n                return
    True\n    except Exception, e:\n        self.record_fail(e)\n        pass\n    self.record_fail()\n
    \   return False\n\ndef describe(self):\n    \"\"\"Explains what this instance
    is checking\"\"\"\n    return \"checking host %s can be resolved\" % self.host\n\ndef
    get_params(self):\n    return (self.host, )\n<&#47;code><&#47;pre>\n"
- id: 170553
  author: jamesoff
  author_email: james@jamesoff.net
  author_url: http://jamesoff.net
  date: '2014-10-06 13:37:03 -0400'
  date_gmt: '2014-10-06 13:37:03 -0400'
  content: |
    <p>Thanks for the code Anton, I'll try to remember to include it when I can.<&#47;p>

    <p>You can also do me a pull request here: https:&#47;&#47;github.com&#47;jamesoff&#47;simplemonitor<&#47;p>
---
<p>A list of what I'm planning on adding or would like to add:</p>
<p> * load monitor<br />
 * alert batching</p>
<p>   this will allow alerters to send all the alert information from one round of polling in a single message - so you get a single email or text saying, "the following monitors just went down:
<list>"<br />
 * <strike>alert periods<&#47;strike> (Done in 1.2)</p>
<p>   so that i can avoid being SMSed while i'm asleep. possibly we should generate an alert for still failed monitors as soon as the alert period starts (so that i get a message just as i'm getting up that says 'monitor X has been broken since 4am')</p>
