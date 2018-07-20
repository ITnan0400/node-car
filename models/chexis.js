var mongoose=require("mongoose");
var crypto=require('crypto');
var BlogPosts = mongoose.Schema({
    "chexi":String
});


BlogPosts.statics.alluser=function (callback) {
    this.find({},function (err,data) {
        callback(err,data);
    })
};

var Courses = mongoose.model("chexi",BlogPosts);


module.exports = Courses;
