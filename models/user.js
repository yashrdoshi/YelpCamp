var mongoose = require("mongoose"),
    passportLocalMOngoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
    username : String,
    password : String,
});

UserSchema.plugin(passportLocalMOngoose);

module.exports = mongoose.model("User",UserSchema);