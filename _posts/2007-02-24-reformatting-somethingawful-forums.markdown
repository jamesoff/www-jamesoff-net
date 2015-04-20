---
layout: post
status: publish
published: true
title: Reformatting SomethingAwful forums
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 266
wordpress_url: http://jamesoff.net/site/2007/02/24/reformatting-somethingawful-forums/
date: '2007-02-24 21:00:28 -0500'
date_gmt: '2007-02-24 20:00:28 -0500'
categories:
- Coding
- internets
tags: []
comments: []
---
<p>I've just found the [Stylish](https:&#47;&#47;addons.mozilla.org&#47;firefox&#47;2108&#47;) extension for Firefox, which is to CSS what Greasemonkey is to JavaScript, or something. It lets you define CSS snippets for pages. Admitted what can be done with this can be done by hacking up your userContent.css file but this makes it so much easier.</p>
<p>Go see [userstyles.org](http:&#47;&#47;userstyles.org) for an index of snippets you can download. Meanwhile, I present my own one for the SomethingAwful forums. It does the following:</p>
<p>* Highlights the thread row under the mouse on a forum page<br />
* Moves the "somenick fucked around with this page" text off to the right and makes it less intrusive<br />
* Moves the paginator from the bottom of the page to be hovering bottom right at all times; semi-transparent mostly but opaque when moused over. This works on both forum views and reading a thread.<br />
* Hides the post buttons (edit&#47;quote&#47;report) except for the post your mouse is over.</p>
<p>BEHOLD!</p>
<p><img src='http:&#47;&#47;blog.jamesoff.net&#47;wp-content&#47;uploads&#47;2007&#47;02&#47;snapshot8.png' alt='snapshot8.png' &#47;></p>
<p><img src='http:&#47;&#47;blog.jamesoff.net&#47;wp-content&#47;uploads&#47;2007&#47;02&#47;snapshot9.png' alt='snapshot9.png' &#47;></p>
<p>To install, create a new blank style in Stylish and dump this into it:</p>
<pre lang="css">
@namespace url(http:&#47;&#47;www.w3.org&#47;1999&#47;xhtml);</p>
<p>@-moz-document domain("forums.somethingawful.com") {</p>
<p>	tr.thread:hover td {<br />
		background-color: #fff7df !important;<br />
	}</p>
<p>	.postbody .mainbodytextsmall {<br />
		text-align: right !important;<br />
		color: #555;<br />
	}</p>
<p>	div[class="pages bottom"] {<br />
		position: fixed;<br />
		top: auto;<br />
		left: auto;<br />
		right: 5px;<br />
		bottom: 0;<br />
		background-color: #fff7df;<br />
		border: 1px solid black;<br />
		padding: 3px;<br />
		font-size: 12px;<br />
		-moz-opacity: .50;<br />
	}</p>
<p>	div[class="pages bottom"]:hover {<br />
		-moz-opacity: 1;<br />
	}</p>
<p>	table[class~="post"] .postbuttons {<br />
		-moz-opacity: 0.2;<br />
	}</p>
<p>	table[class~="post"]:hover .postbuttons {<br />
		-moz-opacity: 1;<br />
	}</p>
<p>}<br />
<&#47;pre></p>
