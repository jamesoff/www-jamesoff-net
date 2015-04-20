---
layout: post
status: publish
published: true
title: Detecting memory type on FreeBSD
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
excerpt: |+
  If you need to upgrade your RAM on a Windows machine, you can just use the [Crucial](http:&#47;&#47;www.crucial.com&#47;uk&#47;) Memory Advisor wotsit, which scans your computer using the power of, er, power to find out what your motherboard is, what RAM you already have, and then can tell you which overpriced Crucial RAM to buy.

  On FreeBSD, this doesn't work so well. However, you can tell manually tell the Crucial site what motherboard you have and it will tell you exactly what sort of RAM is best.

  This is fine if you know what motherboard you have.

  if you don't, the answer is `dmidecode(8)` (`&#47;usr&#47;ports&#47;sysutils&#47;dmidecode`). This utility grabs the same information which the Crucial thingy does, so all you need to do is find the info you need.

wordpress_id: 300
wordpress_url: http://jamesoff.net/site/2007/10/29/detecting-memory-type-on-freebsd/
date: '2007-10-29 22:45:12 -0400'
date_gmt: '2007-10-29 21:45:12 -0400'
categories:
- my stuff
- FreeBSD
- Hardware
- Linux
tags: []
comments:
- id: 2188
  author: Duds
  author_email: dudley@enterspace.org
  author_url: http://www.askduds.co.uk
  date: '2007-11-10 05:05:14 -0500'
  date_gmt: '2007-11-10 04:05:14 -0500'
  content: |-
    Find out information you already know via the application of confusing arcane length commands!

    It's the way of the future.
- id: 49519
  author: obs
  author_email: o@catholic.org
  author_url: ''
  date: '2009-12-03 04:09:36 -0500'
  date_gmt: '2009-12-03 04:09:36 -0500'
  content: |
    <p>its 3 words bra<&#47;p>
- id: 63986
  author: Jeremy
  author_email: jeremyeagle1@gmail.com
  author_url: ''
  date: '2010-06-07 08:43:23 -0400'
  date_gmt: '2010-06-07 08:43:23 -0400'
  content: |
    <p>Hi,<&#47;p>

    <p>Do you know if there is a way to check the serial number of a memory module in FreeBSD?<&#47;p>

    <p>Thanks<&#47;p>
---
<p>If you need to upgrade your RAM on a Windows machine, you can just use the [Crucial](http:&#47;&#47;www.crucial.com&#47;uk&#47;) Memory Advisor wotsit, which scans your computer using the power of, er, power to find out what your motherboard is, what RAM you already have, and then can tell you which overpriced Crucial RAM to buy.</p>
<p>On FreeBSD, this doesn't work so well. However, you can tell manually tell the Crucial site what motherboard you have and it will tell you exactly what sort of RAM is best.</p>
<p>This is fine if you know what motherboard you have.</p>
<p>if you don't, the answer is `dmidecode(8)` (`&#47;usr&#47;ports&#47;sysutils&#47;dmidecode`). This utility grabs the same information which the Crucial thingy does, so all you need to do is find the info you need.</p>
<p><a id="more"></a><a id="more-300"></a></p>
<p>This is pretty easy:</p>
<p>    # dmidecode -t baseboard<br />
    SMBIOS 2.3 present.</p>
<p>    Handle 0x0002, DMI type 2, 8 bytes<br />
    Base Board Information<br />
            Manufacturer: ABIT <http :&#47;&#47;www.abit.com.tw><br />
            Product Name: 694X-686B (VP6)<br />
            Version: v1.0 ~<br />
            Serial Number:</p>
<p>Not masses of useful information returned from my old system, but still enough to identify the motherboard as an Abit VP6. This is all I need to know to find out what memory I should be buying.</p>
<p>I already know what size sticks of RAM I have, but just incase you need to check:</p>
<p>    # dmidecode -t memory<br />
    SMBIOS 2.3 present.<br />
    ...<br />
    Handle 0x0021, DMI type 17, 21 bytes<br />
    Memory Device<br />
        Array Handle: 0x0020<br />
        Error Information Handle: Not Provided<br />
        Total Width: Unknown<br />
        Data Width: Unknown<br />
        Size: 512 MB<br />
        Form Factor: DIMM<br />
        Set: None<br />
        Locator: BANK_0<br />
        Bank Locator: Bank0&#47;1<br />
        Type: Unknown<br />
        Type Detail: None</p>
<p>Again, not the most useful information ever seen, but enough to tell me I have a 512MB stick in bank 0. (On my newer desktop, I get much more useful information like the speed and voltage of the RAM.)<br />
<&#47;http></p>
