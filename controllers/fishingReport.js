var express = require('express');
var router = express.Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

router.get("/scrape", (req, res) =>{

    axios.get("https://tpwd.texas.gov/fishboat/fish/action/reptmap.php?EcoRegion=PW").then((response) =>{
        var $ = cheerio.load(response.data);

        $("dl dt").each(function(i, element) {
            var result = {};
            result.lake = $(this).children("span").children("a").text();
            result.report = $(this).next().text();

            db.Report.create(result)
            .then((dbReport, res) =>{
                // console.log(dbReport);
                // res.send("Scrape Complete");
            })
            .catch((err) =>{
                // return res.json(err);
                console.log(err);
            })
        });
        res.send("Scrape Complete");
    })
})

router.get("/reports", function(req, res) {
    db.Report.find({})
    .then(function(dbReport) {
        res.json(dbReport);
    })
    .catch(function(err) {
        res.json(err);
    })
})

router.get("/reports/:id", function(req, res) {
    db.Report.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbReport) {
        res.json(dbReport);
    })
    .catch(function(err) {
        res.json(err);
    })
})

router.post("/reports/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Report.findOneAndUpdate({
            _id: req.params.id
        },{
            note: dbNote._id
        },{
            new: true
        })
    })
    .then(function(dbReport) {
        res.json(dbReport);
    })
    .catch(function(err) {
        res.json(err);
    })
})

module.exports = router;