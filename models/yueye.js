var mongoose=require("mongoose");
var crypto=require('crypto');
var BlogPosts = mongoose.Schema({
    "chename":String,
    "chepaihao": String,
    "leixing": String,
    "zhuangtai": String,
    "zujin":String
});

BlogPosts.statics.allcar=function (callback) {
    this.find({},function (err,data) {
        callback(err,data);
    })
};

BlogPosts.statics.del=function (needToDelete,callback) {
    this.remove({"chepaihao":needToDelete},function (err,data) {
        callback(err,data);
    })
};
BlogPosts.statics.insers=function (fields,callback) {
    this.create({"chename":fields.chename,"leixing":fields.leixing,"chepaihao":fields.chepaihao,"zujin":fields.zujin,"zhuangtai":fields.zhuangtai},function (err,data) {
        callback(err,data);
    })
};
BlogPosts.statics.change = function(newJSON){
    this.find({"chepaihao" : newJSON["chepaihao"]},function(err,results){
        results[0].leixing = newJSON.leixing;
        results[0].zhuangtai = newJSON.zhuangtai;
        results[0].zujin = newJSON.zujin;
        results[0].save();
    })
};

BlogPosts.statics.chanxuan=function (needToDelete,callback) {
    this.find({"chepaihao":needToDelete},function (err,data) {
        callback(err,data);
    })
};
BlogPosts.statics.xiugai=function (mingcheng,callback) {
    this.update({"leixing":mingcheng},{$set:{"zhuangtai":"出租"}},function (err,data) {
        callback(err,data);
    })
};
BlogPosts.statics.XiuGaiWeiCuZhu=function (mingcheng,callback) {
    this.update({"chepaihao":mingcheng},{$set:{"zhuangtai":"未出租"}},function (err,data) {
        callback(err,data);
    })
};
var Courses = mongoose.model("yueye",BlogPosts);
module.exports = Courses;
