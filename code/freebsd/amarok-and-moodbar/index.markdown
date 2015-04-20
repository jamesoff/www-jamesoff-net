---
layout: page
status: publish
published: true
title: Amarok and moodbar
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 25
wordpress_url: http://jamesoff.net/site/projects/freebsd/amarok-and-moodbar/
date: '2006-09-10 16:34:54 -0400'
date_gmt: '2006-09-10 22:34:54 -0400'
categories:
- Uncategorized
tags: []
comments: []
---
<p>I spotted the [Moodbar](http:&#47;&#47;amarok.kde.org&#47;wiki&#47;Moodbar) stuff in Amarok 1.4.3 this evening and decided it looked quite fun.</p>
<p>I got it working with not too much effort, here's how:</p>
<p>1. Install the fftw3-float port:</p>
<p>   `# cd &#47;usr&#47;ports&#47;math&#47;fftw3-float && make install clean`<br />
2. Download the source from the page linked above. I grabbed the 0.1.1 release which was the latest available.<br />
3. Unpack the source</p>
<p>   `% tar zxvf moodbar-0.1.1.tar.gz; cd moodbar-0.1.1`<br />
4. Run the configure script, but you need to tell it to install in the right place:</p>
<p>   `% .&#47;configure --prefix=&#47;usr&#47;X11R6`<br />
5. Build:</p>
<p>   `% make`<br />
6. Install:</p>
<p>   `% sudo make install`</p>
<p>Amarok should notice the change straight away without a restart, so follow the [usage instructions](http:&#47;&#47;amarok.kde.org&#47;wiki&#47;Moodbar#Usage) on the Amarok site.</p>
<p><a class="imagelink" href="http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2006&#47;09&#47;snapshot5.png" title="Amarok plus moodbar on FreeBSD"><img id="image26" src="http:&#47;&#47;jamesoff.net&#47;site&#47;wp-content&#47;uploads&#47;2006&#47;09&#47;snapshot5.thumbnail.png" alt="Amarok plus moodbar on FreeBSD" &#47;><&#47;a></p>
<p><strike>I am now considering creating a moodbar port on FreeBSD, if I can figure out how :)<&#47;strike> You can use the <a hhref="http:&#47;&#47;www.freshports.org&#47;audio&#47;gstreamer-plugins-moodbar&#47;">audio&#47;gstreamer-plugins-moodbar<&#47;a> port (not mine).</p>
