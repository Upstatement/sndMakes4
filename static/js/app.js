$(document).ready(function(){

  //----- VARS -----//

  var template = twig({
    id: "headlines",
    href: "templates/headlines.twig",
    async: true

    // load: function(template) { }
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
    console.log(data);
//    var $testItem = $('pre');
//    $testItem.text(data);
//    $('.test-container').html($testItem);
  }

  function parseData(data) {
    console.log("data: " + data);

    parsedData = data;
    // parse the json
    // callback and send data to template engine

    renderTemplate(parsedData);

  }

  function renderTemplate() {

    // render twig template with data
    // send to browser

    // render the template
    var headlinesHTML = twig({ ref: "headlines" }).render(template);

    // Display the rendered template
    $('headline-container').innerHTML = headlinesHTML;

  }

  //----- LISTENERS -----//

  $('.headline-search').on('submit', getHeadlines);

  //----- TESTS -----//

  ajaxNews('cheese,bears,ebola', true);

});
