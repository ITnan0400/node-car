var mongoose=require("mongoose");
var crypto=require('crypto');
var BlogPosts = mongoose.Schema({
    "mingcheng":String,
    "chepaihao":String,
    "zuliming":String,
    "shichang":String,
    "meitian":String,
    "heji": String,
    "zhifu":String,
    "zhexi":String,
    "riqi":String,
    "caozuoyuan":String
});


BlogPosts.statics.inserss=function (fields,hanshu) {
      this.create(fields,function (err,data) {
          hanshu(err,data)
      })
 };
BlogPosts.statics.alluser=function (callback) {
    this.find({},function (err,data) {
        callback(err,data);
    })
};
BlogPosts.statics.fins=function (huan,callback) {
    this.find({"chepaihao":huan},function (err,data) {
        callback(err,data);
    })
};
BlogPosts.statics.del=function (needToDelete,zhexi,callback) {
    this.remove({"chepaihao":needToDelete},function (err,data) {
        callback(err,zhexi,needToDelete);
    })
};

var Courses = mongoose.model("tongji",BlogPosts);


module.exports = Courses;
