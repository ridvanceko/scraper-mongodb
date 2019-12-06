var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//set up Port
var PORT = process.env.PORT || 3000;
var app = express();

//set up express router
var router = express.Router();

require("./config/route")(router);
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(router);
var db = process.env.MONGODB_URL || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, function(error){
  if(error){
    console.log(error);

  }
  else{
    console.log("Mongoose connected");
  }
});


app.listen(PORT, function(){
  console.log("Listening the PORT:" + PORT);
});
