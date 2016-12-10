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
---
Below is a randomly-generated recipe!

<div id="recipe">{% icon fa-cog fa-spin %} [mixing ingredients]</div>

Yum.

Insufficiently delicious? <input id="refresh" type="button" value="Refresh!" onclick="fetchRecipe();" />

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript">// <![CDATA[

function fetchRecipe() {
  var api_url = "https://uoaju73yq1.execute-api.eu-west-1.amazonaws.com/prod/recipe";
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
  $("div#recipe").replaceWith("<div id='recipe'>Oh no, dropped all the ingredients on the floor, sorry :(</div>");
}

function formatRecipe(data) {
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

