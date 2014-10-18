$(document).ready(function(){

  //----- VARS -----//

  var template = twig({
    id: "headlines",
    href: "templates/ajax-headlines.twig",

     load: function(template) { console.log(template); }
  });

  //----- FUNCTIONS -----//

  function getHeadlines(event) {
    event.preventDefault();
    var $input = $('.js-headline-search');
    var searchTerms = $input.val().split(' ').join(',');
    ajaxNews(searchTerms, false);
  }

  function ajaxNews(terms, test) {
    console.log('terms: ' + terms);
    var url = "search.php?terms=" + terms; //something;

    // send request to server for json of search data
    // promise with callback to parse data

    $.ajax({
      dataType: "json",
      url: url,
      success: test ? testData : parseData
    });

  }

  function testData (data) {
    console.log('test fired');
    console.log(data);
//    var $testItem = $('pre');
//    $testItem.text(data);
//    $('.test-container').html($testItem);
  }

  function parseData(data) {
    console.log(data);

    parsedData = data;
    // parse the json
    // callback and send data to template engine

    renderTemplate(parsedData);

  }

  function renderTemplate(parsedData) {

    // render twig template with data
    // send to browser

    // render the template
    var headlinesHTML = twig({ ref: "headlines" }).render({headlines: parsedData});

    // Display the rendered template
    $('.headlines-mod').html(headlinesHTML);

  }

  //----- LISTENERS -----//

  $('.headline-search').on('submit', getHeadlines);
  $('.headline-search').on('submit', function() {
    event.preventDefault();
    var $input = $('.js-headline-search');
    var searchTerms = $input.val().split(' ');
    var $numberOfSearchTerms = searchTerms.length;

    var insertSearchTermsIntoSearchBar = function() {
      for (var i = 0; i < $numberOfSearchTerms; i++) {
        $('#search-term-tokens').append("<li>" + searchTerms[i] + "</li>");
      }
    }
    insertSearchTermsIntoSearchBar();
    //console.log(searchTerms[0]);
    //$('#search-term-tokens').append("<li>helooooo</li>");
    // parse each word out
    // insert each word into the id 'search-term-tokens'
  });

  //----- TESTS -----//

//  ajaxNews('cheese,bears,ebola', true);

});
