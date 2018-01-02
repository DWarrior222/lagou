let express = require('express');
let router = express.Router();
let Company = require('./../models/company');
let Industry = require('./../models/industry');
let CompanyInd = require('./../models/company-industry');
let sd = require('silly-datetime');


router.get('/get_company', (req, res) => {
  let page        = parseInt(req.param("page", 1));      //获取当前页码
  let pageSize    = parseInt(req.param("pageSize", 10));  //获取页的大小
  // let priceLevel  = req.param("priceLevel", 'all');          //值为all,0,1,2,3 all就是价格不筛选，0表示0-100，1表示100-500，2表示500-1000，3表示1000-5000
  // let sort        = req.param("sort", 1);                //排序，1表示升序，-1表示降序
  let skip        = (page-1)*pageSize;                //计算需要跳过多少条
  // .sort({'salePrice': sort})
  Company.find({})
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

router.get('/details', (req, res) => {
  let id = parseInt(req.query.compid)
  Company.findOne({id}, (err, docs) => {
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

router.get('/job_companyInd', (req, res) => {
  // let city_id     = req.param.cityId
  let page        = parseInt(req.param("page", 1));      //获取当前页码
  let pageSize    = parseInt(req.param("pageSize", 10));  //获取页的大小
  // let priceLevel  = req.param("priceLevel", 'all');          //值为all,0,1,2,3 all就是价格不筛选，0表示0-100，1表示100-500，2表示500-1000，3表示1000-5000
  // let sort        = req.param("sort", 1);                //排序，1表示升序，-1表示降序
  let skip        = (page-1)*pageSize;                //计算需要跳过多少条
  let companyIndArray = [];
  let result = [];
  Company.find({})
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
    let docsLength = docs.length
    docs.forEach((item, index) => {
      let company_id = parseInt(item.id)
      // console.log(company_id)
      CompanyInd.find({company_id}, (compIndErr, compIndDoc) => {
        if (compIndErr) {
          return res.json({
            // unknown error, please contact technical customer service
            status: '00001',
            message: compIndErr.message
          })
        }
        companyIndArray.push(compIndDoc)
        if (companyIndArray.length === docsLength) {
          console.log(companyIndArray.length)
          companyIndArray.forEach((value, idx) => {
            // console.log(value)
            (function (value, result) {
              let singleArray = []
              let valueLength = value.length
              value.forEach(childValue => {
                let id = childValue.industry_id
                Industry.find({id}, (indErr, indDoc) => {
                  if (indErr) {
                    return res.json({
                      // unknown error, please contact technical customer service
                      status: '00001',
                      message: indErr.message
                    })
                  }
                  singleArray.push(indDoc[0])
                  console.log(singleArray.length)
                  if (singleArray.length === valueLength) {
                    console.log(singleArray)
                    result.push(singleArray)
                    if (result.length === companyIndArray.length) {
                      console.log(result)
                      res.json({
                        // success
                        state: '00000',
                        data: result
                      })
                    }
                  }
                })
              })
            })(value, result)
          })
        }
      })
    })
  })
})

module.exports = router;
