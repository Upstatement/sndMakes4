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
    var $input = $('.js-search-input');
    var searchTerms = $input.value;
    ajaxNews(searchTerms);
  }

  function ajaxNews(terms) {

    var terms
    var url = //something;

    // send request to server for json of search data
    // promise with callback to parse data

    $.ajax({
      dataType: "json",
      url: url,
      data: data,
      success: parseData(data);
    });

  }

  function parseData(data) {

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

  $('.search').on('submit', getHeadlines);

});
