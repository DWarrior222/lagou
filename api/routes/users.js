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
module.exports = router;
