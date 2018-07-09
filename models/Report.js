var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var ReportSchema = new Schema({
    lake: {
        type: String,
        required: true
    },
    report: {
        type: String,
        required: false
    },
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// This creates our model from the above schema, using mongoose's model method
var Report = mongoose.model("Report", ReportSchema);

// Export the Article model
module.exports = Report;
