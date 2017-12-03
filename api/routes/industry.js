let express = require('express');
let router = express.Router();
let Industry = require('./../models/industry');
let sd = require('silly-datetime');


router.get('/get_industry', (req, res) => {
  Industry.find({}, (err, docs) => {
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
