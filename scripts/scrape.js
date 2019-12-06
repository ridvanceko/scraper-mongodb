var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb)

request("https://www.cnn.com/", function (err, res, body){
  var $ = cheerio.load(body);
  var articles = [];

  $(".cd").each(function(i, element){

    var head = $(this).children("cd__headline").text().trim();

    //couldnt find it <p> tag inside of the inspect
    // var sum = $(this).children(".")

    if(head){
      var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
      // var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

      var dataToAdd = {
        headLine: headNeat,
        // summary: sumNeat
      };
      articles.push(dataToAdd);
    }
  });
  cb(articles);
});


module.exports = scrape;