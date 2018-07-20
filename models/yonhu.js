var mongoose=require("mongoose");
var crypto=require('crypto');
var BlogPosts = mongoose.Schema({
     "yonghuming": String,
     "shenfenzheng": String,
     "shoujihao": String,
       "mima": String,
    "dizhi":String
});
// 注册用户信息
BlogPosts.statics.yonhuxingxi = function(yonghuming,shenfenzheng,shoujihao,mima,dizhi,callback){
         var jiamimima= crypto.createHmac('SHA256',mima).digest('hex');
    this.create({"yonghuming":yonghuming,"shenfenzheng":shenfenzheng,"shoujihao":shoujihao,"mima":jiamimima,"dizhi":dizhi},function (err,data) {
        callback(err,data)
    })
};
BlogPosts.statics.alluser=function (callback) {
    this.find({},function (err,data) {
        callback(err,data);
    })
};
BlogPosts.statics.change = function(newJSON){
    this.find({"shenfenzheng" : newJSON["shenfenzheng"]},function(err,results){
        results[0].shoujihao = newJSON.shoujihao;
        results[0].dizhi = newJSON.dizhi;
        results[0].save();
    })
};
BlogPosts.statics.DeleteUser = function(arr,callback){
    // console.log(arr)
    this.remove({"shenfenzheng" : arr},function(err,r){
        callback(err,r.n);
    });
};

var Courses = mongoose.model("yonhu",BlogPosts);
module.exports = Courses;