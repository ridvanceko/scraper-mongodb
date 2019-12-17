var request = require("request");
var cheerio = require("cheerio");
let axios = require("axios");

var scrape = function (cb){
console.log("inside scrape.js");
axios.get("http://www.nytimes.com/").then(function(response){


  var $ = cheerio.load(response.data);
  var articles = [];

  $(".cd").each(function(i, element){

    var head = $(this).children("media__title").text().trim();

    //couldnt find it <p> tag inside of the inspect
    var sum = $(this).children(".media__summary").text().trim();

    if(head){
      var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
      var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

      var dataToAdd = {
        headLine: headNeat,
        summary: sumNeat
      };
      articles.push(dataToAdd);
    }
  
  });
  cb(articles);
});
}


module.exports = scrape;