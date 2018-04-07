let express = require('express');
let router = express.Router();
let User = require('./../models/user');
let UserBaseInfo = require('./../models/user-baseinfo');
router.post('/updateBaseInfo', (req, res) => {
  let baseInfo  = req.param("baseInfo");
	let userId      = parseInt(req.param("userId"));
  UserBaseInfo.findOne({user_id: userId}, (findUserErr, findUserDoc) => {
    if (findUserErr) {
      return res.json({
        state: '00001',
        message: findUserErr.message
      })
    }
    if (!findUserDoc) {
      return UserBaseInfo.create({user_id: userId}, (createUserErr, createUserDoc) => {
        if (createUserErr) {
          return res.json({
            state: '00001',
            message: createUserErr.message
          })
        }
        createUserDoc.user_id = userId
        for (let key in baseInfo) {
          createUserDoc[key] = baseInfo[key]
        }
        createUserDoc.save((saveUserErr, saveUserDoc) => {
          if (saveUserErr) {
            return res.json({
              state: '00001',
              message: saveUserErr.message
            })
          }
          return res.json({
            state: '00000',
            message: '添加用户基本信息成功',
            data: createUserDoc
          })
        })
      })
    }

    for (let key in baseInfo) {
      findUserDoc[key] = baseInfo[key]
    }

    findUserDoc.save((saveUserErr, saveUserDoc) => {
      if (saveUserErr) {
        return res.json({
          state: '00001',
          message: saveUserErr.message
        })
      }
      return res.json({
        state: '00000',
        message: '更新成功',
        data: saveUserDoc
      })
    })
  })
})
module.exports = router;
