let express = require('express');
let router = express.Router();
let City = require('./../models/city');
let convertPinyin = require('./../convertPinyin');
let sd = require('silly-datetime');


router.get('/getcity', (req, res) => {
  let sort = 1
  City.find({})
  .sort({'id': sort})
  .exec((err, docs) => {
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        status: '00001',
        message: err.message
      })
    }
    docs.forEach(value => {
      value.pinyin = convertPinyin(value.name)
    })
    res.json({
      // success
      state: '00000',
      data: docs
    })
  })
})

router.get('/get_city', (req, res) => {
  let id = parseInt(req.param.city_id) 
  City.findOne({id})
  .exec((err, docs) => {
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        status: '00001',
        message: err.message
      })
    }
    docs.forEach(value => {
      value.pinyin = convertPinyin(value.name)
    })
    res.json({
      // success
      state: '00000',
      data: docs
    })
  })
})
module.exports = router;
