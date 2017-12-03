let express = require('express');
let router = express.Router();
let User = require('./../models/user');
let sd = require('silly-datetime');
let md5 =require('md5')


// 注册
router.post('/register', (req, res) => {
  let params = {
    user_id: (new Date()).getTime() + parseInt(Math.random() * 100000000),
    username: req.body.username,
    password: md5(req.body.password),
    regtime: (new Date()).toLocaleString()
  }
  User.findOne({username: params.username}, (err, docs) => {
    if (err) {
      return res.json({
        status: '1',
        msg: err.message
      })
    }
    console.log(docs)
    if (!docs) {
      return User.create(params, (error, doc) => {
        if (error) {
          return res.json({
            status: '00001',
            msg: err.message
          })
        }
        return res.json({
          status: '00000',
          msg: '注册成功',
          result: doc
        })
      })
    } else {
      return res.json({
        status: '00002',
        msg: '该用户名已被注册'
      })
    }
  })
})

router.post("/login", (req, res, next) => {
  let param = {
    username: req.body.username,//获取用户名
    password: md5(req.body.password)//获取密码
  }
  console.log(param);
  //查找用户
  User.findOne(param, (err, doc) => {
    if (err) {
      return res.json({
        status: "1",
        msg: err.message
      });
    }
    if (!doc) {
      return res.json({
        status: "1",
        msg: "用户名或密码错误"
      });
    }
    //给客户端设置cookie, user_id改改，值为用户的ID，cookie的作用域是/,过期时间是1个小时
    res.cookie("user_id", doc.user_id, {
      maxAge: 1000*60*60
    });
    //给客户端设置用户名，值为用户的名称，cookie的作用域是/，过期时间为1小时
    res.cookie("username", doc.username, {
      maxAge: 1000*60*60
    });
    //req.session.user = doc;
    return res.json({
      status:'0',
      msg:'',
      result:{
        username: doc.username
      }
    });
  });
});

module.exports = router;
