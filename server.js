var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var SearchEngines = require('./search_functions.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var router = express.Router();

router.get('/search', function(req, res) {
  var search_query = req.params.q;
  SearchEngines.google(search_query, function (google_results){
    SearchEngines.bing(search_query, function(bing_results){
      SearchEngines.yahoo(search_query, function(yahoo_results){
        var results = [].concat(google_results)
                        .concat(bing_results)
                        .concat(yahoo_results)

        res.json({results: results})

      })
    })
  })
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
