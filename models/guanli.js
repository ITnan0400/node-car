var mongoose=require("mongoose")

var BlogPost = mongoose.Schema({
    "username": String,
    "password": String,

});
BlogPost.statics.guanli = function(fields,callback){

       this.find({"username":fields.yonhuming},function (err,data) {
           callback(err,data)
       })
};
var Course = mongoose.model("guanli",BlogPost);
module.exports = Course;