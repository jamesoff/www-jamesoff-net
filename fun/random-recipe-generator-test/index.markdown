---
layout: page
status: publish
published: true
title: Random Recipe Generator
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 355
wordpress_url: http://jamesoff.net/site/?page_id=355
date: '2008-07-04 14:10:52 -0400'
date_gmt: '2008-07-04 14:10:52 -0400'
categories:
- Uncategorized
tags: []
comments: false
original: /site/fun/random-recipe-generator
---
Below is a randomly-generated recipe!

<div id="recipe">{% icon fa-cog fa-spin %} [mixing ingredients]</div>

Yum.

Insufficiently delicious? <input id="refresh" type="button" value="Refresh!" onclick="fetchRecipe();" />

<!--<p>Sufficiently delicious? Why not work up an appetite by looking at some of the other things I've made? <strong><a title="Kickdown" href="http://jamesoff.net/site/kickdown/">Like listening to music while you drive?</a></strong> Or maybe <strong><a title="Fuzzycalc" href="https://itunes.apple.com/gb/app/fuzzycalc/id482693643?mt=8">a calculator which rounds its answers</a></strong> would help you. May I tempt you with a <strong><a title="Deja Do" href="http://jamesoff.net/site/deja-do/">Repeating todo list manager</a></strong>? It's super-handy for things like packing for trips :)<br /> -->

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript">// <![CDATA[

function fetchRecipe() {
	var api_url = "https://k85phusqf3.execute-api.eu-west-1.amazonaws.com/prod/recipe";
	$.getJSON(api_url, function(data) {
		$("div#recipe").replaceWith(
			formatReceipe(data)
		);
	} );
}

function formatReceipe(data) {
	var HTML = '<div id="recipe">';
	HTML += '<h2>' + data.title + '</h2>';
	HTML += '<div class="recipe_serves">Serves ' + data.serves + '</div>';
	HTML += '<ul class="recipe_needs">You will need:';
	data.ingredients.forEach(function(i) {
		HTML += "<li>" + i + "</li>";
	});
	HTML += "</ul>";
	HTML += "Instructions:";
	HTML += "<ol class='recipe_instr'>";
	data.steps.forEach(function(s) {
		HTML += "<li>" + s + "</li>";
	});
	HTML + "</ol>";
	HTML += "</div>";
	return HTML;
}

$(window).load(fetchRecipe());
// ]]</script>

