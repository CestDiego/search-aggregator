var request = require('request');
var cheerio = require('cheerio');

function zip(arr1, arr2) {
  var arr = []
  var min = Math.min(arr1.length, arr2.length)
  for (var i = 0; i < min; i++){
    arr.push([arr1[i], arr2[i]])
  }
  return arr
}

function get_result_object(links, descriptions, source){
  var result_object = [];

  zip(links, descriptions).map(function (elem) {
    result_object.push({
      href: elem[0].href,
      text: elem[0].text,
      source: source,
      description: elem[1]
    })
  })
  return result_object;
}

function google(search_term, callback) {

  var options = {
    url: "https://www.google.com/search?q=" + search_term,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var linkSelector = ".r a";
      var descriptionSelector = ".g .s .st";
      var links = [];
      var descriptions = [];

      $(linkSelector).each(function (i, elem) {
        links.push({
          text: $(this).text(),
          href: $(this).attr('href').slice(7)
        })
      })

      $(descriptionSelector).each(function (i, elem) {
        descriptions.push($(this).text())
      })

      var result_object = get_result_object(links, descriptions, "Google")

      callback(result_object)
    }
  })

}

function bing(search_term, callback) {

  var options = {
    url: "https://www.bing.com/search?q=" + search_term,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var linkSelector = "#b_results h2 a";
      var descriptionSelector = ".b_caption p";
      var links = [];
      var descriptions = [];

      $(linkSelector).each(function (i, elem) {
        links.push({
          text: $(this).text(),
          href: $(this).attr('href')
        })
      })

      $(descriptionSelector).each(function (i, elem) {
        descriptions.push($(this).text())
      })

      var result_object = get_result_object(links, descriptions, "Bing")

      callback(result_object)
    }
  })

}

function yahoo(search_term, callback) {

  var options = {
    url: "https://search.yahoo.com/search?p=" + search_term,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var linkSelector = ".searchCenterMiddle li a";
      var descriptionSelector = ".searchCenterMiddle li .compText p";
      var links = [];
      var descriptions = [];

      $(linkSelector).each(function (i, elem) {
        if($(this).text() !== "Cached")
          links.push({
            text: $(this).text(),
            href: $(this).attr('href')
          })
      })

      $(descriptionSelector).each(function (i, elem) {
        descriptions.push($(this).text())
      })

      var result_object = get_result_object(links, descriptions, "Yahoo")

      callback(result_object)
    }
  })

}

bing("holi", function(result_object){console.log(result_object)})


module.exports = {
  google: google,
  yahoo:  yahoo,
  bing:   bing
}
