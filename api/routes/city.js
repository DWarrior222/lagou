let express = require('express');
let router = express.Router();
let City = require('./../models/city');
let sd = require('silly-datetime');


router.get('/getcity', (req, res) => {
  City.find({}, (err, docs) => {
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
