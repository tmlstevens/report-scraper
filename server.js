var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var routes = require("./controllers/fishingReport.js");
app.use(routes);

mongoose.connect("mongodb://localhost/fishingReport");

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
})
