let express = require('express');
let router = express.Router();
let Job = require('./../models/job');
let JobKey = require('./../models/job-keyword');
let Company = require('./../models/company')
let Keyword = require('./../models/keyword')
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


// http://www.jianshu.com/p/554a5bf67b31
// http://www.jianshu.com/p/135c7f843666
// https://github.com/hy20090501/gulp-express-browser-sync/blob/master/myapp/models/employee.js
router.post('/key_job', (req, res) => {
  let params = {
    city_id: req.body.cityId,
    keyword_id: req.body.keyId
  }
  let page        = parseInt(req.param("page", 1));
  let pageSize    = parseInt(req.param("pageSize", 10));
  let skip        = (page-1)*pageSize;
  let jobList = []
  let companyList = []
  JobKey.find(params)
  .skip(skip)
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        state: '00001',
        message: err.message
      })
    }
    // docs是符合条件的工作id的数组
    // 通过遍历docs，查询到工作表中具体的工作信息，并添加到jobList
    console.log("docs:  " + docs.length)
    var docsLength = docs.length
    docs.forEach((item, index) => {
      let job_id = parseInt(item.job_id)
      Job.find({id: job_id}, (error, jobdoc) => {
        if (error) {
          return res.json({
            state: 00001,
            message: err.message
          })
        }
        jobList.push(jobdoc)
        // 不能通过index值判断是否遍历完成，因为index值是混乱的
        if (docsLength === jobList.length) {
          // 根据上面获得的jobList，遍历其中工作信息中的company_id获取公司信息
          jobList.forEach((job_item, job_index) => {
            let company_id = parseInt(job_item[0].company_id)
            Company.find({id: company_id}, (comerr, comdoc) => {
              if (comerr) {
                return res.json({
                  state: 00001,
                  message: err.message
                })
              }
              companyList.push(comdoc)
              jobList[job_index].push(comdoc[0])
              if (jobList.length === companyList.length) {
                res.json({
                  state: '00000',
                  data: jobList
                })
              }
            })
          })
        }
      })
    })
  })
})

router.post('/keys_job', (req, res) => {
  let searchText = req.body.searchText
  let keyList = []
  let keyJob = []
  let minixsKeyJob = []
  let sort = 1
  let city_id = req.body.cityId
  let page        = parseInt(req.param("page", 1));
  let pageSize    = parseInt(req.param("pageSize", 10));
  let skip        = (page-1)*pageSize;
  let jobList = []
  let companyList = []

  console.log('keys_job')
  Keyword.find()
  .sort({"id": sort})
  .limit(100)
  .exec((err, keys_docs) => {
    if (err) {
      return res.json({
        state: '00001',
        message: err.message
      })
    }
    keys_docs.forEach(item => {
      if (item.name.indexOf(searchText) !== -1) {
        keyList.push(item)
      }
    })
    keyList.forEach(item => {

      let params = {
        city_id,
        keyword_id: item.id
      }
      JobKey.find(params)
      .skip(skip)
      .limit(pageSize)
      .exec((err, docs) => {
        if (err) {
          return res.json({
            // unknown error, please contact technical customer service
            state: '00001',
            message: err.message
          })
        }
        // docs是符合条件的工作id的数组
        // 通过遍历docs，查询到工作表中具体的工作信息，并添加到jobList
        keyJob.push(docs)
        var keyJobLength = keyJob.length
        console.log("keyList:  " + keyList.length)
        console.log("keyJobLength:  " + keyJobLength)
        if(keyList.length === keyJob.length) {
          console.log('next')
          // console.log(keyJob)
          keyJob.forEach(keyJobItem => {
            keyJobItem.forEach(jobItem => {
              minixsKeyJob.push(jobItem)
            })
          })
          // console.log(minixsKeyJob)
          let minixsLength = minixsKeyJob.length
          minixsKeyJob.forEach((item, index) => {
            let job_id = parseInt(item.job_id)
            Job.find({id: job_id})
            .exec((error, jobdoc) => {
              if (error) {
                return res.json({
                  state: 00001,
                  message: err.message
                })
              }
              jobList.push(jobdoc)
              console.log('test1')
              // 不能通过index值判断是否遍历完成，因为index值是混乱的
              if (minixsLength === jobList.length) {
                // 根据上面获得的jobList，遍历其中工作信息中的company_id获取公司信息
                jobList.forEach((job_item, job_index) => {
                  let company_id = parseInt(job_item[0].company_id)
                  Company.find({id: company_id}, (comerr, comdoc) => {
                    if (comerr) {
                      return res.json({
                        state: 00001,
                        message: err.message
                      })
                    }
                    console.log('test2')
                    companyList.push(comdoc)
                    jobList[job_index].push(comdoc[0])
                    if (jobList.length === companyList.length) {
                      res.json({
                        state: '00000',
                        data: jobList
                      })
                    }
                  })
                })
              }
            })
          })
        }
      })
    })
  })
})
module.exports = router;
