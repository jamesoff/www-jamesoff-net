---
layout: post
status: publish
published: true
title: TriviaCow Scoring Plans
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 249
wordpress_url: http://jamesoff.net/site/2006/10/10/triviacow-scoring-plans/
date: '2006-10-10 19:19:25 -0400'
date_gmt: '2006-10-10 18:19:25 -0400'
categories:
- Coding
tags: []
comments:
- id: 1631
  author: tron
  author_email: tron@tiddlywink.net
  author_url: ''
  date: '2006-10-11 16:54:36 -0400'
  date_gmt: '2006-10-11 15:54:36 -0400'
  content: |-
    OK, but I'd like to see two running totals then.

    1) Weekly award - good idea, also means on a quiet week you can get 5 points for only getting a few right - I'd award more places though, maybe 10 for first to 1 for 10th. Needs a weekly table, and a long term leaderboard. You still get the same problem though, people playing longer will have higher scores overall - I think that's just tough, tbh. These points should be kept separate, and not part of the overall scores.

    2) Individual scores which are, as you say, reset each week, then like the above, there's a weekly table, and a long term accumulating table. I want to keep the long term one, I was enjoying wondering if my 3,000 point gap to the person above me would ever be filled, and it's nice to see just *how* much time you've wasted.

    My $0.02 :)
---
<p>Almost ever since I wrote the TriviaEngine script, I've been planning to redo the scoring system on it. The original scoring system was based on the #newbies (spit :argh:) script, which just kept adding to your score. This meant that people who were around all the time (in the longer term) would get unassailably high scores which would just put new people off from playing (when the person you're chasing has a 5000-point lead you stop caring).</p>
<p>The current TriviaCow scoring system resets the scores to zero Friday night (or Saturday night, I forget which). It does maintain the scoring history, but the code isnt' there to do anything with it.</p>
<p>The new plan modifies the current version a bit to keep it fun on a week-to-week basis, but also adds a bit more of an element of competition. I hope.</p>
<p>The way it works is:</p>
<p>* Everyone's score resets to 0 at the end of the weekly period. Currently, this is set to midnight Saturday (i.e. last thing Friday night).<br />
* At the point it resets the top 5 people from that week are awared 5, 4, 3, 2 and 1 points to their overall score (which isn't affected by the number of questions you get right). This gives us a leaderboard of weekly performance.</p>
<p>That's it.</p>
<p>It looks pretty simple but getting the code right is much more complicated, but I think I've figured out how I'm going to do it properly now.</p>
<p>To make for an exciting and dramatic adventure, the script will start counting down to the end of the scoring period as the deadline approaches, possibly encouraging people to play by pointing out that they can gain a place by answering `X` more questions.</p>
<p>Any other ideas, suggestions or thoughts on this scoring system are welcome as comments against this post.</p>
<p>Once the new scoring system is working properly, I'll adjust the website to work again :)</p>
<p>ok GO</p>
