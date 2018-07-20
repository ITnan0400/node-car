
var url=require("url");
var path=require("path");
var fs=require("fs");
var formidable=require("formidable");
var models=require("../models/guanli.js");
var yonhu=require("../models/yonhu.js");
var baoma=require("../models/baoma.js");
var aodi=require("../models/aodi.js");
var yueye=require("../models/yueye.js");
var motuoche=require("../models/motuoche.js");
var chaopao=require("../models/chaopao.js");
var chexis=require("../models/chexis.js");
var crypto=require('crypto');
var parse_id = require('parse-cn-idcard');
var IDValidator = require('id-validator');
var Validator = new IDValidator();

var session = require('express-session')
var tongji=require("../models/tongji.js")


//显示登陆页面
exports.shouIindex=function (req,res) {
   // var session= req.session.loin ? req.session.loin:0

      // if(!session){
          res.sendFile(path.join(__dirname,"../views/Login.html"))

      // }
      // else{
      //     res.sendFile(path.join(__dirname,"../views/GuanLiIndex.html"))
      //
      // }


};
//判断管理员还是用户登陆
exports.yonhuAndmima=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        models.guanli(fields,function (err,data) {
            if(err){
                res.send({"result":-1});
                return
            }
            if(data.length==0){
                res.send({"result":-2});
                return
            }
          var jiamiMiMa= crypto.createHmac('SHA256',fields.mima).digest('hex');
        if(jiamiMiMa==data[0].password){
            req.session.login = true;
            res.send({"result":1});
        }
        else{
            res.send({"result":-3});
        }
        })
    });
};
// 跳到管理页面
exports.GuanLiIndex=function (req, res) {
    res.sendFile(path.join(__dirname,"../views/GuanLiIndex.html"))
};
// 跳到用户注册页面
exports.showreg=function (req, res) {
    res.sendFile(path.join(__dirname,"../views/reg.html"))
};
// 用户信息
exports.doreg=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
            var  yonghuming=fields.yonghuming;
            var  shenfenzheng=fields.shenfenzheng;
            var  shoujihao=fields.shoujihao;
            var  mima=fields.mima;
            var xinxi = parse_id(shenfenzheng);
            var dizhi=xinxi.area.name;
        yonhu.yonhuxingxi(yonghuming,shenfenzheng,shoujihao,mima,dizhi,function (err,data) {
            if(err){
                res.send({"result":-1});
                return
            }
            res.send({"result":1});
        })
    });
};



exports.bandaun=function(req,res){
    if(req.session.login){
        res.sendFile(path.join(__dirname,"../views/GuanLiIndex.html"))

    }
    else{
        res.sendFile(path.join(__dirname,"../views/Login.html"))
    }
}



exports.alluser=function (req, res) {
    yonhu.alluser(function (err,data) {
        if(err){
            res.send("数据库no");
            return;
        }
        var arr=[];
        var xinxi=null;
        for(var i=0;i<data.length;i++){
            xinxi = parse_id(data[i].shenfenzheng);
            var app={
                "name":data[i].yonghuming,
                "shenfenzheng":data[i].shenfenzheng,
                "shoujihao":data[i].shoujihao,
                "dizhi":data[i].dizhi,
                "xingzuo":xinxi.birthday.constellation_cn,
                "sex":xinxi.gender.cn,
            };
            arr.push(app);
        }
        res.json({"results":arr});
    })
};
//验证身份证是否正确
exports.yanzheng=function (req, res) {
    var sfzhao=req.params.sfzhao;
    if(!Validator.isValid( sfzhao )){
        res.json({"result":-1});
        return;
    }
    res.json({"result":1});
};
//修改用户数据，持久化
exports.baocun=function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        yonhu.change(fields,function(err,r){
            res.send("");
        });
    });
};
//修改车：宝马数据，持久化
exports.baocunche=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        baoma.change(fields,function(err,r){
            res.send("");
        });
    });
};
//修改车：奥迪数据，持久化
exports.baocunche2=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        aodi.change(fields,function(err,r){
            res.send("");
        });
    });
};
//修改车：越野数据，持久化
exports.baocunche3=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        yueye.change(fields,function(err,r){
            res.send("");
        });
    });
};
//修改车：摩托车数据，持久化
exports.baocunche4=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        motuoche.change(fields,function(err,r){
            res.send("");
        });
    });
};
//修改车：超跑数据，持久化
exports.baocunche5=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        chaopao.change(fields,function(err,r){
            res.send("");
        });
    });
};
//删除客户

exports.DeleteUser2=function (req, res) {
//得到要删除的数组
    var a=0
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        var needToDelete = JSON.parse(fields.needToDelete);
        (function hanshu(i){
               if(i>=needToDelete.length){
                    return
               }
            yonhu.DeleteUser(needToDelete[i],function(err,n){
                if(err){
                      res.json({"result":-1});
                     return
                }
            });
            hanshu(a+=1)

        })(0)

        res.json({"result":a});


    });
};
//删除车辆
exports.DeleteUser=function (req, res) {
    var a=0;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
          var che=fields.che;
        var baoma=require("../models/"+che+".js");
        //HTTP请求的POST参数不能传数组，只能传递字符串。所以前台会把数组stringify
        //后台parse()
        var needToDelete = JSON.parse(fields.needToDelete);
            (function hanshu(i) {
                  if(i>=needToDelete.length){
                      return
                  }
                baoma.del(needToDelete[i],function (err,data) {

                  });
                hanshu(a+=1)
            })(0);

        res.json({"result":a})
        })


};
//跳转租赁界面
exports.zulin=function (req, res) {
    res.sendFile(path.join(__dirname,"../views/zuli.html"))
};
//数据库里获取所有车
exports.allcar=function (req, res) {
     baoma.allcar(function (err,data) {
         res.json({"results":data});
     });

};
exports.allcar2=function (req, res) {
    aodi.allcar(function (err,data) {

        res.json({"results":data});
    })


};
exports.allcar3=function (req, res) {
    yueye.allcar(function (err,data) {
        res.json({"results":data});
    })
};
exports.allcar4=function (req, res) {
    motuoche.allcar(function (err,data) {
                    res.json({"results":data});
    })
};
exports.allcar5=function (req, res) {
    chaopao.allcar(function (err,data) {
        res.json({"results":data});
    })

};
exports.tiaozhuan=function (req,res) {
    var name=req.params.name;
    res.sendFile(path.join(__dirname,"../views/"+name+".html"))
};
//获取所有客户信息，显示option内容
exports.qingqiukefu=function(req,res){
    var arr=[];
    var a=0
    yonhu.alluser(function (err,data) {
        (function huanshu(i) {
            if(i>=data.length){
                 return
            }
            arr.push(data[i].yonghuming);
            huanshu(a+=1)
        })(0);
        res.json({"results":arr})
    })
}
// 保存车辆信息
exports.BaoCunShuJu=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {

      var leixi=  fields.leixi;

      var  che=require("../models/"+leixi+".js")

        che.insers(fields,function (err,data) {
               if(err){
                   res.json({"result":-1});
                   return
               }
               res.json({"result":1});
        })
    });
};
// 计算
exports.suan=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        var needToDelete = JSON.parse(fields.needToDelete);
         var  che=fields.che;

        var  lian=require("../models/"+che+".js")
        lian.chanxuan(needToDelete,function (err,data) {
            if(err){
                 res.send("计算失败");
                 return
            }
            if(data.length==0){
                return
            }
            res.json({"results":data[0].zujin});
        })
    })
};
// 统计
exports.tongji=function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
         tongji.inserss(fields,function (err,data) {
            if(err){
                return
            }
           var zhexi=require("../models/"+fields.zhexi+".js");
             zhexi.xiugai(fields.mingcheng,function (err,data) {
                 if(err){
                     res.json({"results":-1});
                      return
                 }
                 res.json({"results":1});
             })
         })
    })
};


// 跳转添加客户
exports.tianjiayonghu=function (req, res) {
    res.sendFile(path.join(__dirname,"../views/tianjia.html"));
};


//获得归还(tongjis)数据库里的所有人
exports.guihuanuser=function(req,res){
    tongji.alluser(function (err,data) {
        if(err){
            res.send("数据库no");
            return;
        }
        var arr=[];
        var xinxi=null;
        for(var i=0;i<data.length;i++){
            xinxi = parse_id(data[i].chepaihao);
            var app={
                "mingcheng":data[i].mingcheng,
                "zhexi":data[i].zhexi,
                "chepaihao":data[i].chepaihao,
                "zuliming":data[i].zuliming,
                "shichang":data[i].shichang,
                "meitian":data[i].meitian,
                "heji":data[i].heji,
                "zhifu":data[i].zhifu,
                "riqi":data[i].riqi,
                "caozuoyuan":data[i].caozuoyuan,
            };
            arr.push(app);
        }
        res.json({"results":arr});
    })
};
// 归还
exports.guihuan=function (req,res) {
    var huan=req.params.huan;
    tongji.fins(huan,function (err,data) {
        if(err){
            return
        }
        tongji.del(data[0].chepaihao,data[0].zhexi,function (err,chexi,chepaihao) {
            var zhexi=require("../models/"+chexi+".js");
            zhexi.XiuGaiWeiCuZhu(chepaihao,function (err,data) {
            if(err){
                res.json({"results":-1});
                return
            }
                res.json({"results":1});
            })

        })
    })
};
exports.chexis=function (req, res) {
    chexis.alluser(function (err,data) {
        if(err){
            res.send("数据库no");
            return;
        }
        // console.log(data);
        var arr=[];
        var xinxi=null;
        for(var i=0;i<data.length;i++){
            xinxi = parse_id(data[i].chexi);
            var app={
                "chexi":data[i].chexi
            };
            arr.push(app);
        }
        // console.log(arr);
        res.json({"results":arr});
    })
};
//获得所有汽车名称 所属类型 租赁价格
exports.qichedangan=function (req, res) {

    var arr=[];

    baoma.allcar(function (err,data) {
        arr=data;
        aodi.allcar(function (err,data) {
            var a=0;
            (function huanshu(i) {
                if(i>=data.length){
                    return
                }
                arr.push(data[i]);
                huanshu(a+=1)
            })(0);
            yueye.allcar(function (err,data) {
                var a=0;
                (function huanshu(i) {
                    if(i>=data.length){
                        return
                    }
                    arr.push(data[i]);
                    huanshu(a+=1)
                })(0)
                motuoche.allcar(function (err,data) {
                    var a=0;
                    (function huanshu(i) {
                        if(i>=data.length){
                            return
                        }
                        arr.push(data[i]);
                        huanshu(a+=1)
                    })(0)
                    chaopao.allcar(function (err,data) {
                        var a=0;
                        (function huanshu(i) {
                            if(i>=data.length){
                                return
                            }
                            arr.push(data[i]);
                            huanshu(a+=1)
                        })(0)

                        res.json({"results":arr});
                    });

                });

            });

        });
    });
};

