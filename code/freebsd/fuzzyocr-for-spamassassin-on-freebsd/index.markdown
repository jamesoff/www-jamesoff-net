---
layout: page
status: publish
published: true
title: FuzzyOCR for SpamAssassin on FreeBSD
author:
  display_name: Administrator
  login: admin
  email: james-wpadmin@jamesoff.net
  url: ''
author_login: admin
author_email: james-wpadmin@jamesoff.net
wordpress_id: 31
wordpress_url: http://jamesoff.net/site/fuzzyocr-for-spamassassin-on-freebsd/
date: '2006-11-06 14:40:43 -0500'
date_gmt: '2006-11-06 14:40:43 -0500'
categories:
- Uncategorized
tags: []
comments:
- id: 2
  author: 'anti-SPAM | Fighting Image SPAM: FuzzyOCR Resources | IT Infusion | Calgary,
    Alberta'
  author_email: ''
  author_url: http://www.itinfusion.ca/anti-spam/fuzzyocr-resources
  date: '2007-02-05 04:45:56 -0500'
  date_gmt: '2007-02-05 04:45:56 -0500'
  content: "[...] A great FreeBSD Tutorial [...]"
- id: 4
  author: FuzzyOCR Just Works on FreeBSD | anti-SPAM | IT Infusion in Calgary, Alberta,
    Canada
  author_email: ''
  author_url: http://www.itinfusion.ca/anti-spam/fuzzyocr-freebsd
  date: '2007-03-07 06:49:39 -0500'
  date_gmt: '2007-03-07 06:49:39 -0500'
  content: "[...] I&#8217;ve been meaning to implement FuzzyOCR on one of my FreeBSD
    mail servers for a while now, but I kept putting it off because it involved applying
    some patches and I hate applying patches. Lazy? Maybe. [...]"
---
<p><strong>Update: As of 4.1.4_2, `graphics&#47;libungif` has the required patch applied, so these instructions are redundant.<&#47;strong> You should be able to just install the FuzzyOCR port directly (you might still want to define `WITHOUT_X11`). I will leave these instructions here as a reference in case they're of use to someone.</p>
<p><strong>Update: 20070312<&#47;strong> Chris Martin wrote to me to say,</p>
<p>> You might want to make reference to the issue discussed in this thread:<br />
><br />
> [http:&#47;&#47;lists.freebsd.org&#47;pipermail&#47;freebsd-ports&#47;2006-November&#47;037098.html](http:&#47;&#47;lists.freebsd.org&#47;pipermail&#47;freebsd-ports&#47;2006-November&#47;037098.html)<br />
><br />
> I had this issue and I wish I had googled earlier...<br />
><br />
> The FuzzyOCR port for FreeBSD only installs the .pm file in<br />
> &#47;usr&#47;local&#47;etc&#47;mail&#47;spamassassin and I got the word list and .cf file<br />
> from the file tarball linked to in the howto and then was stumped for a<br />
> bit before I went hunting for the solution.  </p>
<p>Thanks, Chris!</p>
<p>- - -</p>
<p>(Note: Instructions written based on the method I used to install on one machine, and have tested on others. There's now a port<br />
for FuzzyOCR which you may want to use instead. If you have updates for this page, please mail james@jamesoff.net.)</p>
<p>[FuzzyOCR](http:&#47;&#47;wiki.apache.org&#47;spamassassin&#47;FuzzyOcrPlugin) is a plugin for SpamAssassin which lets it find spammy text inside an image attachment - a trend spammers seem to be using more and more now.</p>
<p>To install it on FreeBSD, you need to do the following (don't worry, it's pretty straightforward):</p>
<p>1. Have SpamAssassin already installed and working</p>
<p>2. Install needed ports:</p>
<p>   `# portinstall -m WITHOUT_X11=yes graphics&#47;netpbm graphics&#47;ImageMagick graphics&#47;gocr devel&#47;p5-String-Approx security&#47;p5-Digest-MD5`</p>
<p>   These can pull in quite a few dependencies you probably won't have installed on your mail server, so now is a good time for coffee. Keep an eye on it though, as `print&#47;ghostscript-gnu` and possibly some of the other ports will ask you about configuration. You might also want to look into some of the other `WITHOUT_*` ImageMagick knobs in the Makefile and set them. If you want to set them on the `portinstall` commandline, do it like this: `portinstall -m "WITHOUT_A=yes WITHOUT_B=yes" port&#47;name ...`</p>
<p>3. According to the FuzzyOCR page, you need to patch gocr and libungif, but gocr in ports already has the needed patch. libungif doesn't (as of 2006-11-06), so you need to patch it:</p>
<p>   `# cd && fetch http:&#47;&#47;users.own-hero.net&#47;~decoder&#47;fuzzyocr&#47;giftext-segfault.patch`</p>
<p>   `# cd &#47;usr&#47;ports&#47;graphics&#47;libungif && make extract patch`</p>
<p>   `# cd work&#47;libungif-4.1.4&#47;util`</p>
<p>   `# patch < ~&#47;giftext-segfault.patch`</p>
<p>   `# cd ..&#47;..&#47;.. && make -DWITHOUT_X11 build install clean`</p>
<p>4. Now you have the dependencies installed, you can install FuzzyOCR itself.</p>
<p>   `# cd && fetch http:&#47;&#47;users.own-hero.net&#47;~decoder&#47;fuzzyocr&#47;fuzzyocr-latest.tar.gz`</p>
<p>   `# tar zxf fuzzyocr-latest.tar.gz`</p>
<p>   `# cd FuzzyOcr-2.3b`</p>
<p>   `# cp FuzzyOcr.cf FuzzyOcr.pm &#47;usr&#47;local&#47;etc&#47;mail&#47;spamassassin`</p>
<p>   `# cp FuzzyOcr.words.sample &#47;usr&#47;local&#47;etc&#47;mail&#47;spamassassin`</p>
<p>5. Now head on over to `&#47;usr&#47;local&#47;etc&#47;mail&#47;spamassassin` and edit the .cf file - at the least you need to set the logfile location and change the program paths to point to where FreeBSD puts them (i.e. in `&#47;usr&#47;local&#47;bin` not `&#47;usr&#47;bin`):</p>
<p>   `# cd &#47;usr&#47;local&#47;etc&#47;mail&#47;spamassassin`</p>
<p>   `# vi FuzzyOcr.cf` </p>
<p>   Set the logfile to an appropriate location (`&#47;var&#47;log&#47;FuzzyOcr.log` for example) and then `touch` the file and make sure the user your spamd runs as can write to it.</p>
<p>6. Grab the sample spam archive from [http:&#47;&#47;users.own-hero.net&#47;~decoder&#47;fuzzyocr&#47;](http:&#47;&#47;users.own-hero.net&#47;~decoder&#47;fuzzyocr&#47;) and follow the instructions in the README to make sure `spamassassin` uses FuzzyOCR right. When I tested it on the JPEG one, FuzzyOCR didn't do anything because `spamassassin` had already allocated it 10 points. I had to increase the verbosity in the logfile to find that out.</p>
<p>7. Once you're happy it's working, restart `spamd`!</p>
<p>   `# &#47;usr&#47;local&#47;etc&#47;rc.d&#47;sa-spamd restart`</p>
