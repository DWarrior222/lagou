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
        state: '1',
        message: err.message
      })
    }
    console.log(docs)
    if (!docs) {
      return User.create(params, (error, doc) => {
        if (error) {
          return res.json({
            state: '00001',
            message: err.message
          })
        }
        return res.json({
          state: '00000',
          message: '注册成功',
          result: doc
        })
      })
    } else {
      return res.json({
        state: '00002',
        message: '该用户名已被注册'
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
  User.findOne(param, (err, docs) => {
    if (err) {
      return res.json({
        state: "1",
        message: err.message
      });
    }
    if (!docs) {
      return res.json({
        state: "1",
        message: "用户名或密码错误"
      });
    }
    //给客户端设置cookie, user_id改改，值为用户的ID，cookie的作用域是/,过期时间是1个小时
    res.cookie("user_id", docs.user_id, {
      maxAge: 1000 * 60 * 60
    });
    //给客户端设置用户名，值为用户的名称，cookie的作用域是/，过期时间为1小时
    res.cookie("username", docs.username, {
      maxAge: 1000 * 60 * 60
    });
    //req.session.user = docs;
    return res.json({
      state:'0',
      message: '',
      result: {
        username: docs.username
      }
    });
  });
});

// logout
router.post("/logout", (req,res,next) => {
  //清空cookie的用户ID,设置过期时间为上一秒
  res.cookie("user_id", "", {
    maxAge: -1
  });
  return res.json({
    state: "00000",
    message: '退出成功'
  });
});
module.exports = router;
