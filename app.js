var express=require("express");
var app=express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zucheguanlixiton');
var router=require("./router/router.js");
app.set("view engine","ejs");
app.use(express.static("public"));
var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'kaola', //加密字符串，我们下发的随机乱码都是依靠这个字符串加密的
    resave: false,
    saveUninitialized: true
}));


app.get("/",router.shouIindex);   //首页
app.post("/yonhuAndmima",router.yonhuAndmima);  //管理登录
app.get("/GuanLiIndex",router.GuanLiIndex);  //跳转到管理页面
app.get("/reg",router.showreg);  //跳转到用户注册页面
app.post("/doreg",router.doreg);//用户注册信息
app.get("/bandaun",router.bandaun)
app.get("/alluser",router.alluser);   //获取用户数据库
app.get("/yanzheng/:sfzhao",router.yanzheng);  //验证身份证是否合法
app.post("/baocun",router.baocun);   //修改用户数据，持久化
app.post("/baocunche",router.baocunche);   //修改车：宝马数据，持久化
app.post("/baocunche2",router.baocunche2);   //修改车：奥迪数据，持久化
app.post("/baocunche3",router.baocunche3);   //修改车：越野数据，持久化
app.post("/baocunche4",router.baocunche4);   //修改车：摩托车数据，持久化
app.post("/baocunche5",router.baocunche5);   //修改车：超跑数据，持久化
app.post("/DeleteUser2",router.DeleteUser2); // 删除客户
app.get("/allcar",router.allcar);  //宝马
app.get("/allcar2",router.allcar2);  //奥迪
app.get("/allcar3",router.allcar3);  //越野
app.get("/allcar4",router.allcar4);  //摩托车
app.get("/allcar5",router.allcar5);  //超跑
app.post("/DeleteUser",router.DeleteUser); //删除车里的一条数据
app.get("/zu/:name",router.tiaozhuan); // 跳转页面
app.post("/BaoCunShuJu",router.BaoCunShuJu);  //注册车辆
app.get("/qingqiukefu",router.qingqiukefu);   //获取所有客户信息，显示option内容
app.get("/tianjiayonghu",router.tianjiayonghu);  //跳转到用户添加页面
app.post("/suan",router.suan);  //计算价钱
app.get("/guihuan/:huan",router.guihuan);  //归还车辆按钮
app.post("/tongji",router.tongji);      //租车价格等信息
app.get("/guihuanuser",router.guihuanuser); //获得归还(tongjis)数据库里的所有人
app.get("/chexis",router.chexis); //获得类别数据库里面的所有类别
app.get("/qichedangan",router.qichedangan); //获得所有汽车名称 所属类型 租赁价格
app.listen(3005);