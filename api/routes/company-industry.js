let express = require('express');
let router = express.Router();
let CompanyInd = require('./../models/industry');
let sd = require('silly-datetime');


router.get('/get_companyInd', (req, res) => {
  CompanyInd.find({}, (err, docs) => {
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
