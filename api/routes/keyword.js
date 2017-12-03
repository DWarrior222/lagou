let express = require('express');
let router = express.Router();
let Keyword = require('./../models/keyword');
let sd = require('silly-datetime');


router.get('/get_keyword', (req, res) => {
  Keyword.find({}, (err, docs) => {
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        status: '00001',
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
module.exports = router;
