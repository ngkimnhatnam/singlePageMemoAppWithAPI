var mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.connect("mongodb://localhost/memo-api");
mongoose.Promise = Promise;


module.exports.Memo = require("./todo");

