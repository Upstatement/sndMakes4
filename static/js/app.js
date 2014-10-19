$(document).ready(function(){

  //----- VARS -----//

  var lastSearch = ""; //will be value of last search to use when adding related words

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

    for (var i = 0; i < data.length; i +=1) {
      if (data[i].publishedDate) {
        data[i].publishedDate = fixDate(data[i].publishedDate);
      }
    }

    parsedData = data;
    renderHeadlines(parsedData);
  }

  function fixDate(dateToFix) {
    var fixedDate = moment(dateToFix).fromNow();
    console.log (fixedDate);
    return fixedDate;
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
    var data = data.slice(0, 6);
    var relatedHTML = twig({ ref: "related" }).render({related: data});

    // First clear the related keywords bar
    $('.result-filter-mod').empty();

    // Display 'suggested keywords' helper text
    $('.result-filter-mod').append("<h4>Suggested Keywords</h4>");

    // Display the rendered template
    $('.result-filter-mod').append(relatedHTML);
  }

  function addWord(event) {
    var $target = $(event.target);
    var $input = $('.js-headline-search');
    var wordToAdd = $target.text();
    var $searchTokens = $('#search-term-tokens');

    $input.val(lastSearch + ' ' + wordToAdd);
    $('#search-term-tokens').empty();
    $input.submit();
  }

  //----- LISTENERS -----//

   // Clear tokens on clicking the x
   var deleteToken = function() {
    // superficially delete it
    $('.token-delete').on('click', function() {
      $(this).parent().remove();
    })
  };

  // Actually delete it from the search string
    $('.token-delete').on('click', function() {
      // take the target (this)
      var $wordToDelete = $(this);
      var lastSearch = lastSearch.replace($wordToDelete, "");
      var $input = $('.js-headline-search');
      $input.submit();
      console.log(lastSearch);
    });

  $('.headline-search').on('submit', getHeadlines);
  $('.headline-search').on('submit', function() {
    event.preventDefault();
    var $input = $('.js-headline-search');
    lastSearch = $input.val();
    var searchTerms = $input.val().split(' ');
    var $numberOfSearchTerms = searchTerms.length;

    var insertSearchTermsIntoSearchBar = function() {
      for (var i = 0; i < $numberOfSearchTerms; i++) {
        $('#search-term-tokens').append("<li>" + searchTerms[i] + "<span class='token-delete'>x</span></li>");
      }
      // clears search field input
      $('#headline-search-input').val("").removeAttr('placeholder');

    }
    insertSearchTermsIntoSearchBar();
    deleteToken();
  });

  $('.result-filter-mod').on('click', 'li', addWord);

  // Clear the input form (and fake input tokens) on focus
  var clearSearchBar = function() {
    $('#headline-search-input').on('click', function() {
      console.log('focus');
      $(this).val("");
      $('#search-term-tokens').empty();
      //$('.result-filter-mod').empty();
    })
  };

  clearSearchBar();



  //----- TESTS -----//

//  ajaxNews('cheese,bears,ebola', true);

});
