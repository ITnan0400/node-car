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

BlogPosts.statics.change = function(newJSON){
    this.find({"chepaihao" : newJSON["chepaihao"]},function(err,results){
        results[0].leixing = newJSON.leixing;
        results[0].zhuangtai = newJSON.zhuangtai;
        results[0].zujin = newJSON.zujin;
        results[0].save();
    })
};
BlogPosts.statics.insers=function (fields,callback) {
    this.create({"chename":fields.chename,"leixing":fields.leixing,"chepaihao":fields.chepaihao,"zujin":fields.zujin,"zhuangtai":fields.zhuangtai},function (err,data) {
        callback(err,data);
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
// BlogPosts.statics.allcar2=function (callback) {
//     this.find({"name":"奥迪"},function (err,data) {
//         callback(err,data);
//     })
// };
// BlogPosts.statics.allcar3=function (callback) {
//     this.find({"name":"越野"},function (err,data) {
//         callback(err,data);
//     })
// };
// BlogPosts.statics.allcar4=function (callback) {
//     this.find({"name":"摩托车"},function (err,data) {
//         callback(err,data);
//     })
// };
// BlogPosts.statics.allcar5=function (callback) {
//     this.find({"name":"超跑"},function (err,data) {
//         callback(err,data);
//     })
// };
// BlogPosts.statics.DeleteUser = function(arr,callback){
//     var _arr = [];
//     var _arr2= [] ;
//     var _arr3= [] ;
//     var _arr4= [] ;
//     var gong=[];
//     // console.log(arr);
//
//     // console.log(this);
//
//     this.find({"chepaihao":arr},function (err, data) {
//
//         for(var i=0;i<data[0].chepaihao.length;i++){
//             if(data[0].chepaihao[i]===arr){
//
//             }else{
//                 _arr.push(data[0].chepaihao[i]);
//                 _arr2.push(data[0].leixing[i]);
//                 _arr3.push(data[0].zhuangtai[i]);
//                 _arr4.push(data[0].zujin[i]);
//             }
//         }
//         gong.push(_arr,_arr2,_arr3,_arr4);
//         // console.log(gong);
//         callback(err,gong);
//     });
// };
// BlogPosts.statics.tihuan = function(arr,callback) {
//     this.update({"chepaihao":arr[0]},function (err,data) {
//         // console.log(data);
//     });
//     this.update({"leixing":arr[1]},function (err,data) {
//         // console.log(data);
//     });
//     this.update({"zhuangtai":arr[2]},function (err,data) {
//         // console.log(data);
//     });
//     this.update({"zujin":arr[3]},function (err,data) {
//         callback(err,data.ok)
//         // console.log(data);
//     });
// };
var Courses = mongoose.model("baoma",BlogPosts);


module.exports = Courses;
