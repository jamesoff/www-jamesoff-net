---
layout: post
status: publish
published: true
title: RSS feeds from Sourceforge
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 98
wordpress_url: http://jamesoff.net/site/2003/03/21/rss-feeds-from-sourceforge/
date: '2003-03-21 14:00:19 -0500'
date_gmt: '2003-03-21 13:00:19 -0500'
categories:
- Coding
tags: []
comments: []
---
<p>As you may have observed above, I have an RSS feed for bMotion now with statistics from SourceForge. I may add another later for the TopicEngine. This is done using the XML_RSS class from <a href="http:&#47;&#47;pear.php.net" target="_blank">PEAR<&#47;a>. It hoovers the RSS file to a temporary file to cache it, save hitting SF over HTTP everytime someone loads my page :)<br &#47;></p>
<p>If you really want to see the code, here it is:<br &#47;></p>
<p><span style="font-size:8pt"><br />
<code><font color="#000000"><br />
<font color="#0000BB"><?php<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;$rss_file <&#47;font><font color="#007700">= <&#47;font><font color="#DD0000">"bmotion.rss"<&#47;font><font color="#007700">;<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$rss_feed <&#47;font><font color="#007700">= <&#47;font><font color="#DD0000">"http:&#47;&#47;sourceforge.net&#47;export&#47;rss2_projsummary.php?group_id=67459"<&#47;font><font color="#007700">;<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$rss_items <&#47;font><font color="#007700">= array(<&#47;font><font color="#0000BB">2<&#47;font><font color="#007700">,<&#47;font><font color="#0000BB">3<&#47;font><font color="#007700">,<&#47;font><font color="#0000BB">6<&#47;font><font color="#007700">,<&#47;font><font color="#0000BB">10<&#47;font><font color="#007700">);<br />
<br &#47;><br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$rss_status <&#47;font><font color="#007700">= <&#47;font><font color="#DD0000">""<&#47;font><font color="#007700">;<br />
<br &#47;><br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;function <&#47;font><font color="#0000BB">too_old<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$rss_file<&#47;font><font color="#007700">, &amp;<&#47;font><font color="#0000BB">$rss_status<&#47;font><font color="#007700">) {<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$stats <&#47;font><font color="#007700">= <&#47;font><font color="#0000BB">stat<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$rss_file<&#47;font><font color="#007700">);<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (<&#47;font><font color="#0000BB">$stats<&#47;font><font color="#007700">[<&#47;font><font color="#0000BB">10<&#47;font><font color="#007700">] < (<&#47;font><font color="#0000BB">time<&#47;font><font color="#007700">() - <&#47;font><font color="#0000BB">3600<&#47;font><font color="#007700">)) {&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return <&#47;font><font color="#0000BB">true<&#47;font><font color="#007700">;<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$rss_status <&#47;font><font color="#007700">= <&#47;font><font color="#DD0000">"Last updated: " <&#47;font><font color="#007700">. <&#47;font><font color="#0000BB">date <&#47;font><font color="#007700">(<&#47;font><font color="#DD0000">"H:m j&#47;M T"<&#47;font><font color="#007700">, <&#47;font><font color="#0000BB">$stats<&#47;font><font color="#007700">[<&#47;font><font color="#0000BB">10<&#47;font><font color="#007700">]);<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br &#47;><br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#FF8000">&#47;&#47;hoover the RSS to local<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#007700">if (!<&#47;font><font color="#0000BB">file_exists<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$rss_file<&#47;font><font color="#007700">) || <&#47;font><font color="#0000BB">too_old<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$rss_file<&#47;font><font color="#007700">, <&#47;font><font color="#0000BB">$rss_status<&#47;font><font color="#007700">)) {<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$rss_status <&#47;font><font color="#007700">= <&#47;font><font color="#DD0000">"Updating RSS now..."<&#47;font><font color="#007700">;<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$rss_contents <&#47;font><font color="#007700">= <&#47;font><font color="#0000BB">file<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$rss_feed<&#47;font><font color="#007700">);<br />
<br &#47;><br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$local_file <&#47;font><font color="#007700">= <&#47;font><font color="#0000BB">fopen<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$rss_file<&#47;font><font color="#007700">, <&#47;font><font color="#DD0000">"w"<&#47;font><font color="#007700">);<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foreach (<&#47;font><font color="#0000BB">$rss_contents <&#47;font><font color="#007700">as <&#47;font><font color="#0000BB">$line<&#47;font><font color="#007700">) {<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">fwrite<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$local_file<&#47;font><font color="#007700">, <&#47;font><font color="#0000BB">$line<&#47;font><font color="#007700">);<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">fclose<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$local_file<&#47;font><font color="#007700">);<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br &#47;><br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$rss <&#47;font><font color="#007700">=&amp; new <&#47;font><font color="#0000BB">XML_RSS<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$rss_file<&#47;font><font color="#007700">);<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$rss<&#47;font><font color="#007700">-><&#47;font><font color="#0000BB">parse<&#47;font><font color="#007700">();<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;echo <&#47;font><font color="#DD0000">"<small>$rss_status<&#47;small><br>"<&#47;font><font color="#007700">;<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;echo <&#47;font><font color="#DD0000">"
<ul>\n"<&#47;font><font color="#007700">;<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$info <&#47;font><font color="#007700">= <&#47;font><font color="#0000BB">$rss<&#47;font><font color="#007700">-><&#47;font><font color="#0000BB">getItems<&#47;font><font color="#007700">();<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;foreach (<&#47;font><font color="#0000BB">$rss_items <&#47;font><font color="#007700">as <&#47;font><font color="#0000BB">$index<&#47;font><font color="#007700">) {<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#0000BB">$item <&#47;font><font color="#007700">= <&#47;font><font color="#0000BB">$info<&#47;font><font color="#007700">[<&#47;font><font color="#0000BB">$index<&#47;font><font color="#007700">];<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;echo <&#47;font><font color="#DD0000">"
<li><a href="" <&#47;font><font color="#007700">. <&#47;font><font color="#0000BB">$item<&#47;font><font color="#007700">[<&#47;font><font color="#DD0000">'link'<&#47;font><font color="#007700">] . <&#47;font><font color="#DD0000">"""<&#47;font><font color="#007700">; <&#47;font><font color="#FF8000">&#47;&#47;link<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#007700">echo <&#47;font><font color="#DD0000">"title="" <&#47;font><font color="#007700">. <&#47;font><font color="#0000BB">strip_tags<&#47;font><font color="#007700">(<&#47;font><font color="#0000BB">$item<&#47;font><font color="#007700">[<&#47;font><font color="#DD0000">'description'<&#47;font><font color="#007700">]) . <&#47;font><font color="#DD0000">"""<&#47;font><font color="#007700">; <&#47;font><font color="#FF8000">&#47;&#47;description<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#007700">echo <&#47;font><font color="#DD0000">">" <&#47;font><font color="#007700">. <&#47;font><font color="#0000BB">$item<&#47;font><font color="#007700">[<&#47;font><font color="#DD0000">'title'<&#47;font><font color="#007700">] . <&#47;font><font color="#DD0000">"<&#47;a><&#47;li>\n"<&#47;font><font color="#007700">; <&#47;font><font color="#FF8000">&#47;&#47;title<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;<&#47;font><font color="#007700">}<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;echo <&#47;font><font color="#DD0000">"<&#47;ul>\n"<&#47;font><font color="#007700">;<br />
<br &#47;>&nbsp;&nbsp;&nbsp;&nbsp;echo <&#47;font><font color="#DD0000">"<a href="http:&#47;&#47;sourceforge.net&#47;export&#47;rss2_projsummary.php?group_id=67459"><img src="b2-img&#47;xml.gif" border="0" title="View bMotion's RSS feed"><&#47;a>"<&#47;font><font color="#007700">;<br />
<br &#47;><&#47;font><font color="#0000BB">?><br />
<br &#47;><&#47;font><br />
<&#47;font><br />
<&#47;code><br />
<&#47;span><br />
<br &#47;><br />
If the code looks a bit untidy, it's because a) it's a quick hack and b) it's designed to execute as quickly as possible (without accessing disk files too much). If it's of any help to you, knock yourself out :)<br &#47;><br &#47;></p>
<p>I've also got <a href="http:&#47;&#47;www.greeneyez.co.uk" target="_blank">Roz's weblog<&#47;a> working properly now, perhaps I should put an RSS feed off that onto mine... :)</p>
