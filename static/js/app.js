$(document).ready(function(){

  //----- VARS -----//

  var template = twig({
    id: "headlines",
    href: "templates/ajax-headlines.twig",

     load: function(template) { console.log(template); }
  });

  var wordTemplate = twig({
    id: "related",
    href: "templates/ajax-related.twig",

     load: function(template) { console.log(template); }
  });

  //----- FUNCTIONS -----//

  function getHeadlines(event) {
    event.preventDefault();
    var $input = $('.js-headline-search');
    var searchTerms = $input.val().split(' ').join(',');
    ajaxNews(searchTerms, false);
    ajaxRelated(searchTerms);
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
  }

  function parseData(data) {
    console.log(data);

    parsedData = data;
    // parse the json
    // callback and send data to template engine

    renderHeadlines(parsedData);
  }

  function renderHeadlines(parsedData) {

    // render twig template with data
    // send to browser

    // render the template
    var headlinesHTML = twig({ ref: "headlines" }).render({headlines: parsedData});

    // Display the rendered template
    $('.headlines-mod').html(headlinesHTML);

  }

  function renderRelated(parsedData) {

    // render twig template with data
    // send to browser

    // render the template
    var headlinesHTML = twig({ ref: "headlines" }).render({headlines: parsedData});

    // Display the rendered template
    $('.headlines-mod').html(headlinesHTML);

  }

  function splitSearch() {
    // get value of search input
    // split value at spaces and store in array
    // foreach element in array render search word in a box in the input.
  }

  function ajaxRelated(terms, test) {
    console.log('terms: ' + terms);
    var url = "related.php?terms=" + terms; //something;

    // send request to server for json of search data
    // promise with callback to parse data

    $.ajax({
      dataType: "json",
      url: url,
      success: renderWordBar
    });
  }

  function renderWordBar(data) {
    var relatedHTML = twig({ ref: "related" }).render({related: data});

    // Display the rendered template
    $('.search-filter-mod').html(relatedHTML);
  }

  //----- LISTENERS -----//

  $('.headline-search').on('submit', getHeadlines);

  //----- TESTS -----//

//  ajaxNews('cheese,bears,ebola', true);

});
