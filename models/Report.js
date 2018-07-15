var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
    lake: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    report: {
        type: String,
        required: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
