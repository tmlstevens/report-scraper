var express = require('express');
var router = express.Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

router.get("/scrape", (req, res) => {

    axios.get("https://tpwd.texas.gov/fishboat/fish/action/reptmap.php?EcoRegion=PW").then((response) => {
        var $ = cheerio.load(response.data);
        var baseUrl = 'https://tpwd.texas.gov';

        $("dl dt").each(function (i, element) {
            var result = {};
            result.lake = $(this).children("span").children("a").text();
            result.url = baseUrl + $(this).children("span").children("a").attr('href');
            result.report = $(this).next().text();

            db.Report.create(result)
            .then((dbReport, res) => {
            })
            .catch((err) => {
                console.log(err);
            })
        });
        res.send("Scrape Complete");
    })
})

router.get("/reports", function (req, res) {
    db.Report.find({})
        .then(function (dbReport) {
            res.json(dbReport);
        })
        .catch(function (err) {
            res.json(err);
        })
})

router.get("/reports/:id", function (req, res) {
    db.Report.findOne({ _id: req.params.id })
        .then(function (dbReport) {
            res.json(dbReport);
        })
        .catch(function (err) {
            res.json(err);
        })
})

router.post("/reports/:id", function(req, res) {
    db.Comment.create(req.body)
    .then(function(dbComment) {
        return db.Report.findOneAndUpdate({
        },{
            comments: dbComment._id
        })
    })
    .then(function(dbReport) {
        res.json(dbReport);
    })
    .catch(function(err) {
        res.json(err);
    })
})



// router.post("/reports/:id", function(req, res) {
//     db.Comment.create(req.body)
//     .then(function(dbComment) {
//         return db.Report.findOneAndUpdate({
//         },{
//             comments: dbComment._id
//         })
//     })
//     .then(function(dbReport) {
//         res.json(dbReport);
//     })
//     .catch(function(err) {
//         res.json(err);
//     })
// })

module.exports = router;