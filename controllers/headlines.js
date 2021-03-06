var scrape =require("../scripts/scrape");
var makeDate = require("../scripts/date");

var Headline = require("../models/Headline");

module.exports = {
  fetch: function(cb) {
    scrape(function(data)
    {

      // console.log("data");
      var articles = data;
      for (var i=0; i = articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;

      }
      console.log(articles);
      console.log("headline: ", Headline)
      Headline.collection.insertMany(articles, {ordered:false}, function(error, docs){
        cb(error, docs);
      })
    });
  },
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  get: function(query, cb) {
    Headline.find(query).sort({
      _id: -1
    })
    .exec(function(err, doc){
      cb(doc);
    });
  },
  update: function(query, cb){
    Headline.update({_id: query._id}, {
      $set: query}, {}, cb);
    
  }
}