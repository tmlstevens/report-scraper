var mongoose = require("mongoose");
var Schema = mongoose.Schema;

function toLower(argument) {
    return argument.toLowerCase();
};
  
var UserSchema = new Schema({
    userName: {
        type: String,
        set: toLower,
        unique: true,
        required: 'Username is required and must be unique'
    },
    password: {
        type: String,
        required: 'Password is required'
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
