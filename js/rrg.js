var recipe_id;

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
        $("div#share").replaceWith(
            "<div id='share'><input id='share' type='button' value='Get share link' onclick='shareRecipe()' /></div>"
        );
        recipe_id = data.metadata.recipe_id;
    } )
        .fail(function() {
            formatRecipeError();
            $("div#share").replaceWith(
                "<div id='share'></div>"
            );
            recipe_id = '';
        } );
}


function formatRecipeError() {
    $("div#recipe").replaceWith("<div id='recipe'>Oh no, dropped all the ingredients on the floor, sorry :(<br /></div>");
    $("div#yum").replaceWith("<div id='yum' style='text-decoration: line-through'>Yum.</div>");
}


function formatRecipe(data) {
    var HTML = '<div id="recipe">';
    HTML += '<div style="float: right">Serves ' + data.serves + '</div>';
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


function fetchSpecificRecipe(recipe_id) {
    $.getJSON("https://rrg.jamesoff.net/" + recipe_id + ".json", function(data) {
        $("div#recipe").replaceWith(
            formatRecipe(data)
        );
        $("div#share").replaceWith(
            "<div id='share'><input id='share' type='button' value='Get share link' onclick='shareRecipe()' /></div>"
        );
        recipe_id = data.metadata.recipe_id;
        console.log(recipe_id);
        console.log(data);
    } )
        .fail(function() {
            formatRecipeError();
            $("div#share").replaceWith(
                "<div id='share'></div>"
            );
            recipe_id = '';
        } );
}


function shareRecipe() {
    if (recipe_id == '') {
        return false;
    }
    $.getJSON("https://api.jamesoff.net/recipe-persist/" + recipe_id, function(data) {
        giveShareLink();
    } )
        .fail(function() {
            giveShareFailure();
        } );
}


function giveShareLink() {
    var share_url = 'https://jamesoff.net/rrg/' + recipe_id;
    $("div#share").replaceWith(
        "<div id='share'><a href='" + share_url + "'>" + share_url + "</a></div>"
    );
}


function giveShareFailure() {
    $("div#share").replaceWith(
        "<div id='share'><input id='share' type='button' value='Get share link' onclick='shareRecipe()' /> An error occurred while generating the share link.</div>"
    );
}


function loadHandler() {
    var recipe_id = window.location.hash.substr(1);
    if (recipe_id == "") {
        fetchRecipe();
    }
    else {
        fetchSpecificRecipe(recipe_id);
    }
}


$(window).load(loadHandler());


$(document).keydown(function (e) {
    if (e.which == 82) {
        // r
        fetchRecipe();
        return false;
    }
    if (e.which == 73) {
        // i
        fetchInsane();
        return false;
    }
});

