---
layout: page
status: publish
published: true
title: windowsort
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 332
wordpress_url: http://jamesoff.net/site/code/irssi-scripts/windowsort/
date: '2008-02-07 12:22:11 -0500'
date_gmt: '2008-02-07 12:22:11 -0500'
categories:
- Uncategorized
tags: []
comments: []
---
<p>This is a quick script I knocked up which monitors how much time you spend in each window in irssi.</p>
<p>Originally I planned to have it move your windows around for you so they were sorted by how much you used them, but I never got that working.</p>
<p>Instead, it'll just output a list of windows in the order it thinks you should have them, and then you can manually rearrange things with `&#47;window move`.</p>
<p>**Please note I didn't originally intend to release this script (certainly not in its current state) so it's a bit messy! There are a couple of caveats, so please read all of the stuff below.**</p>
<p>To use, pop it in your `.irssi&#47;scripts&#47;` directory and `&#47;script load windowsort`. It will immediately start tracking your window usage. You can `&#47;set windowsort_max_time` to an integer to say how many seconds maximum a window can get in one go. It defaults to 300 (5 minutes) so when you leave your client idle for 10 hours, the window you're on only gets 5 minutes of credit.</p>
<p>Once you've accumulated a reasonable amount of data (say, a day's worth), run `&#47;windowtidy` to receive a horribly formatted list of how your windows should be arranged. It's then up to you to use `&#47;window goto N` and `&#47;window move N` to rearrange them as you wish. **Once you've moved windows around you MUST reload the script.** This also includes closing windows manually, as the script tracks usage by window number not name or contents!</p>
<p>Told you it wasn't finished yet ;)</p>
<p>This script goes well with [windowtidy](..&#47;windowtidy), which closes windows with no items in. Run that first, and then let windowsort accumulate some data.</p>
<p>Here's the script; download and gunzip it: <a href='http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2008&#47;02&#47;windowsortpl.gz' title='windowsort for irssi'>windowsort for irssi<&#47;a></p>
