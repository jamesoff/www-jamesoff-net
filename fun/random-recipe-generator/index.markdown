---
layout: page
status: publish
published: true
title: Random Recipe Generator
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: https://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: https://jamesoff.net
wordpress_id: 355
wordpress_url: http://jamesoff.net/site/?page_id=355
date: '2008-07-04 14:10:52 -0400'
date_gmt: '2008-07-04 14:10:52 -0400'
categories:
  - Uncategorized
tags: []
comments: false
original: /site/fun/random-recipe-generator
summary: A randomly generated recipe! Manufacture and consume with care.
---
Below is a randomly-generated recipe!

<div id="recipe">{% icon fa-cog fa-spin %} [mixing ingredients]</div>

<div id="yum">Yum.</div>

Insufficiently delicious? <input id="refresh" type="button" value="Refresh!" onclick="fetchRecipe();" /> <kbd>R</kbd>

Insufficiently insane? <input id="refreshinsane" type="button" value="Refresh insane mode!" onclick="fetchInsane();" /> <kbd>I</kbd>

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript">// <![CDATA[

function fetchInsane() {
  fetchRecipe(true);
}

function fetchRecipe(insane=false) {
  var api_url = "https://api.jamesoff.net/recipe";
  if (insane) {
    api_url += '-insane'
  }
  $.getJSON(api_url, function(data) {
    $("div#recipe").replaceWith(
      formatRecipe(data)
    );
  } )
  .fail(function() {
    formatRecipeError();
  } );
}

function formatRecipeError() {
$("div#recipe").replaceWith("<div id='recipe'>Oh no, dropped all the ingredients on the floor, sorry :(<br /></div>");
  $("div#yum").replaceWith("<div id='yum' style='text-decoration: line-through'>Yum.</div>");
}

function formatRecipe(data) {
  var HTML = '<div id="recipe">';
  HTML += '<div style="float: right">{% icon fa-users %} ' + data.serves + '</div>';
  HTML += '<h2>' + data.title + '</h2>';
  HTML += 'You will need:<ul class="recipe_needs">';
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

$(document).keydown(function (e) {
  if (e.which == 82) {
    // r
    fetchRecipe();
  }
  if (e.which == 73) {
    // i
    fetchInsane();
  }
  return false;
});
// ]]</script>

