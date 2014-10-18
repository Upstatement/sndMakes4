$(document).ready(function(){


  var template = twig({
    id: "headlines",
    href: "templates/posts.twig",
    async: true

    // load: function(template) { }
  });

  function ajaxNews() {
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


});
