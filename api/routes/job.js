let express = require('express');
let router = express.Router();
let Job = require('./../models/job');
let sd = require('silly-datetime');


router.get('/get_job', (req, res) => {
  let page        = parseInt(req.param("page", 1));      //获取当前页码
  let pageSize    = parseInt(req.param("pageSize", 10));  //获取页的大小
  // let priceLevel  = req.param("priceLevel", 'all');          //值为all,0,1,2,3 all就是价格不筛选，0表示0-100，1表示100-500，2表示500-1000，3表示1000-5000
  // let sort        = req.param("sort", 1);                //排序，1表示升序，-1表示降序
  let skip        = (page-1)*pageSize;                //计算需要跳过多少条
  // .sort({'salePrice': sort})
  Job.find({})
    .skip(skip)
    .limit(pageSize)
    .exec((err, docs) => {
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
