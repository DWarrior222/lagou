let express = require('express');
let router = express.Router();
let Keyword = require('./../models/keyword');
let sd = require('silly-datetime');


router.get('/get_keyword', (req, res) => {
  Keyword.find({}, (err, docs) => {
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        state: '00001',
        message: err.message
      })
    }
    res.json({
      // success
      state: '00000',
      data: docs
    })
  })
})

router.post('/get_keys', (req, res) => {
  let pageSize = parseInt(req.param("pageSize", 10));  //获取页的大小
  let key_default = req.body.keyDefault || '前端'
  let searchText = req.body.searchText || key_default
  let keyList = []
  let sort = 1
  Keyword.find()
  .limit(4800)
  .sort({"id": sort})
  .exec((err, docs) => {
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        state: '00001',
        message: err.message
      })
    }
    docs.forEach(item => {
      // let name = item.name
      // stringObject.indexOf(searchvalue)
      if (item.name.indexOf(searchText) !== -1) {
        keyList.push(item)
      }
    })
    res.json({
      state: '00000',
      data: keyList
    })
  })
})
module.exports = router;
