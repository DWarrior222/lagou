let express = require('express');
let router = express.Router();
let Job = require('./../models/job');
let JobKey = require('./../models/job-keyword');
let Company = require('./../models/company')
let Keyword = require('./../models/keyword')
let CompanyInd = require('./../models/company-industry');
let Industry = require('./../models/industry');
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



router.get('/details', (req, res) => {
  let id = parseInt(req.query.jobid)
  let result = []
  Job.findOne({id}, (err, docs) => {
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        state: '00001',
        message: err.message
      })
    }
    result.push(docs)
    let company_id = docs.company_id
    Company.findOne({id: company_id}, (comErr, comDoc) => {
      if (comErr) {
        return res.json({
          // unknown error, please contact technical customer service
          state: '00001',
          message: comErr.message
        })
      }
      console.log(comDoc)
      result.push(comDoc)
      res.json({
        // success
        state: '00000',
        data: result
      })
    })
  })
})

// http://www.jianshu.com/p/554a5bf67b31
// http://www.jianshu.com/p/135c7f843666
// https://github.com/hy20090501/gulp-express-browser-sync/blob/master/myapp/models/employee.js


// router.post('/key_job', (req, res) => {
//   let page        = parseInt(req.param("page", 1));
//   let pageSize    = parseInt(req.param("pageSize", 20));
//   let skip        = (page-1)*pageSize;
//   let jobList = []
//   let companyList = []
//   let searchText = req.body.searchText;
//   Keyword.findOne({"name": searchText}, (err, keyDoc) => {
//     if (err) {
//       return res.json({
//         // unknown error, please contact technical customer service
//         state: '00001',
//         message: err.message
//       })
//     }
//     if (!keyDoc) {
//       return res.json({
//         // unknown error, please contact technical customer service
//         state: '00002',
//         message: '没有该关键字'
//       })
//     }
//     let keyword_id = keyDoc.id
//     let params = {
//       city_id: req.body.cityId,
//       keyword_id
//     }
//     JobKey.find(params)
//     .skip(skip)
//     .limit(pageSize)
//     .exec((err, docs) => {
//       if (err) {
//         return res.json({
//           // unknown error, please contact technical customer service
//           state: '00001',
//           message: err.message
//         })
//       }
//       if (docs.length === 0) {
//         return res.json({
//           // unknown error, please contact technical customer service
//           state: '00002',
//           message: '没有对应的工作'
//         })
//       }
//       // docs是符合条件的工作id的数组
//       // 通过遍历docs，查询到工作表中具体的工作信息，并添加到jobList
//       // console.log("docs:  " + docs.length)
//       var docsLength = docs.length
//       docs.forEach((item, index) => {
//         let job_id = parseInt(item.job_id)
//         Job.find({id: job_id}, (error, jobDoc) => {
//           // console.log('jobDoc' + jobDoc)
//           if (error) {
//             return res.json({
//               state: 00001,
//               message: err.message
//             })
//           }
//           jobList.push(jobDoc)
//           // 不能通过index值判断是否遍历完成，因为index值是混乱的
//           if (docsLength === jobList.length) {
//             // 根据上面获得的jobList，遍历其中工作信息中的company_id获取公司信息
//             jobList.forEach((job_item, job_index) => {
//               let company_id = parseInt(job_item[0].company_id)
//               Company.find({id: company_id}, (comerr, comdoc) => {
//                 if (comerr) {
//                   return res.json({
//                     state: 00001,
//                     message: err.message
//                   })
//                 }
//                 companyList.push(comdoc)
//                 jobList[job_index].push(comdoc[0])
//                 if (jobList.length === companyList.length) {
//                   res.json({
//                     state: '00000',
//                     data: jobList
//                   })
//                 }
//               })
//             })
//           }
//         })
//       })
//     })
//   })
// })


// 添加了公司所属的行业信息

router.post('/key_job', (req, res) => {
  let page        = parseInt(req.param("page", 1));
  let pageSize    = parseInt(req.param("pageSize", 20));
  let skip        = (page-1)*pageSize;
  let jobList = []
  let companyList = []
  let result = []
  let searchText = req.body.searchText;
  Keyword.findOne({"name": searchText}, (err, keyDoc) => {
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        state: '00001',
        message: err.message
      })
    }
    if (!keyDoc) {
      return res.json({
        // unknown error, please contact technical customer service
        state: '00002',
        message: '没有该关键字'
      })
    }
    let keyword_id = keyDoc.id
    let params = {
      city_id: req.body.cityId,
      keyword_id
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
      if (docs.length === 0) {
        return res.json({
          // unknown error, please contact technical customer service
          state: '00002',
          message: '没有对应的工作'
        })
      }
      // docs是符合条件的工作id的数组
      // 通过遍历docs，查询到工作表中具体的工作信息，并添加到jobList
      // console.log("docs:  " + docs.length)
      var docsLength = docs.length
      docs.forEach((item, index) => {
        let job_id = parseInt(item.job_id)
        Job.find({id: job_id}, (error, jobDoc) => {
          // console.log('jobDoc' + jobDoc)
          if (error) {
            return res.json({
              state: 00001,
              message: err.message
            })
          }
          jobList.push(jobDoc)
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
                // ---------------------
                let company_id = comdoc[0].id
                // let city_id = city_id || comdoc[0].city_id
                CompanyInd.find({company_id}, (compIndErr, compIndDoc) => {
                  if (compIndErr) {
                    return res.json({
                      // unknown error, please contact technical customer service
                      status: '00001',
                      message: compIndErr.message
                    })
                  }
                  // 这是一个公司所有的行业数据
                  let singleArray = []
                  let compIndDocLength = compIndDoc.length
                  compIndDoc.forEach((compIndValue) => {
                    let id = compIndValue.industry_id
                    Industry.find({id}, (indErr, indDoc) => {
                      if (indErr) {
                        return res.json({
                          // unknown error, please contact technical customer service
                          status: '00001',
                          message: indErr.message
                        })
                      }
                      singleArray.push(indDoc[0])
                      if (singleArray.length === compIndDocLength) {
                        result.push(singleArray)
                        jobList[job_index].push(singleArray)
                        if (result.length === jobList.length) {
                          res.json({
                            // success
                            state: '00000',
                            data: jobList
                          })
                        }
                      }
                    })
                  })
                })
              })
            })
          }
        })
      })
    })
  })
})


// rec_job

router.get('/rec_job', (req, res) => {
  let page        = parseInt(req.param("page", 1));
  let pageSize    = parseInt(req.param("pageSize", 20));
  let skip        = (page-1)*pageSize;
  let jobList = []
  let companyList = []
  let result = []
  Job.find({})
  .skip(skip)
  .limit(pageSize)
  .exec((error, jobDoc) => {
    // console.log('jobDoc' + jobDoc)
    if (error) {
      return res.json({
        state: 00001,
        message: err.message
      })
    }
    // jobDoc有20个工作数据的数组
    jobDoc.forEach(item => {
      let arr = []
      arr.push(item)
      jobList.push(arr)
    })
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

        let company_id = comdoc[0].id
        CompanyInd.find({company_id}, (compIndErr, compIndDoc) => {
          if (compIndErr) {
            return res.json({
              // unknown error, please contact technical customer service
              status: '00001',
              message: compIndErr.message
            })
          }
          // 这是一个公司所有的行业数据
          let singleArray = []
          let compIndDocLength = compIndDoc.length
          compIndDoc.forEach((compIndValue) => {
            let id = compIndValue.industry_id
            Industry.find({id}, (indErr, indDoc) => {
              if (indErr) {
                return res.json({
                  // unknown error, please contact technical customer service
                  status: '00001',
                  message: indErr.message
                })
              }
              singleArray.push(indDoc[0])
              if (singleArray.length === compIndDocLength) {
                result.push(singleArray)
                jobList[job_index].push(singleArray)
                if (result.length === jobList.length) {
                  res.json({
                    // success
                    state: '00000',
                    data: jobList
                  })
                }
              }
            })
          })
        })
      })
    })
  })
})




// 不限城市
router.post('/key_alljob', (req, res) => {
  let page        = parseInt(req.param("page", 1));
  let pageSize    = parseInt(req.param("pageSize", 20));
  let skip        = (page-1)*pageSize;
  let jobList = []
  let companyList = []
  let result = []
  let searchText = req.body.searchText;
  console.log(searchText)
  Keyword.findOne({"name": searchText}, (err, keyDoc) => {
    console.log('keyDoc' + keyDoc)
    if (err) {
      return res.json({
        // unknown error, please contact technical customer service
        state: '00001',
        message: err.message
      })
    }
    if (!keyDoc) {
      return res.json({
        // unknown error, please contact technical customer service
        state: '00002',
        message: '没有该关键字'
      })
    }
    let keyword_id = keyDoc.id
    let params = {
      keyword_id
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
      if (docs.length === 0) {
        return res.json({
          // unknown error, please contact technical customer service
          state: '00002',
          message: '没有对应的工作'
        })
      }
      // docs是符合条件的工作id的数组
      // 通过遍历docs，查询到工作表中具体的工作信息，并添加到jobList
      // console.log("docs:  " + docs.length)
      var docsLength = docs.length
      docs.forEach((item, index) => {
        let job_id = parseInt(item.job_id)
        Job.find({id: job_id}, (error, jobDoc) => {
          // console.log('jobDoc' + jobDoc)
          if (error) {
            return res.json({
              state: 00001,
              message: err.message
            })
          }
          jobList.push(jobDoc)
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
                let company_id = comdoc[0].id
                // let city_id = city_id || comdoc[0].city_id
                CompanyInd.find({company_id}, (compIndErr, compIndDoc) => {
                  if (compIndErr) {
                    return res.json({
                      // unknown error, please contact technical customer service
                      status: '00001',
                      message: compIndErr.message
                    })
                  }
                  // 这是一个公司所有的行业数据
                  let singleArray = []
                  let compIndDocLength = compIndDoc.length
                  compIndDoc.forEach((compIndValue) => {
                    let id = compIndValue.industry_id
                    Industry.find({id}, (indErr, indDoc) => {
                      if (indErr) {
                        return res.json({
                          // unknown error, please contact technical customer service
                          status: '00001',
                          message: indErr.message
                        })
                      }
                      singleArray.push(indDoc[0])
                      if (singleArray.length === compIndDocLength) {
                        result.push(singleArray)
                        jobList[job_index].push(singleArray)
                        if (result.length === jobList.length) {
                          res.json({
                            // success
                            state: '00000',
                            data: jobList
                          })
                        }
                      }
                    })
                  })
                })
              })
            })
          }
        })
      })
    })
  })
})



// router.post('/filter_job', (req, res) => {
//   let page        = parseInt(req.param("page", 1));
//   let pageSize    = parseInt(req.param("pageSize", 20));
//   let skip        = (page-1)*pageSize;
//   let work_year   = 1;
//   let jobList = []
//   let companyList = []
//   let searchText = req.body.searchText;
//   Keyword.findOne({"name": searchText}, (err, keyDoc) => {
//     // console.log('keyDoc' + keyDoc)
//     if (err) {
//       return res.json({
//         // unknown error, please contact technical customer service
//         state: '00001',
//         message: err.message
//       })
//     }
//     if (!keyDoc) {
//       return res.json({
//         // unknown error, please contact technical customer service
//         state: '00002',
//         message: '没有该关键字'
//       })
//     }
//     let keyword_id = keyDoc.id
//     let params = {
//       city_id: req.body.cityId,
//       keyword_id
//     }
//     JobKey.find(params)
//     .skip(skip)
//     .limit(pageSize)
//     .exec((err, docs) => {
//       if (err) {
//         return res.json({
//           // unknown error, please contact technical customer service
//           state: '00001',
//           message: err.message
//         })
//       }
//       if (docs.length === 0) {
//         return res.json({
//           // unknown error, please contact technical customer service
//           state: '00002',
//           message: '没有对应的工作'
//         })
//       }
//       // docs是符合条件的工作id的数组
//       // 通过遍历docs，查询到工作表中具体的工作信息，并添加到jobList
//       // console.log("docs:  " + docs.length)
//       var docsLength = docs.length
//       docs.forEach((item, index) => {
//         let job_id = parseInt(item.job_id)
//         Job.find({id: job_id, work_year: 3}, (error, jobDoc) => {
//           if (error) {
//             return res.json({
//               state: 00001,
//               message: err.message
//             })
//           }
//           if (jobDoc.length !== 0) {
//             // console.log(jobDoc)
//             jobList.push(jobDoc)
//           } else {
//             docsLength--
//           }
//           // 不能通过index值判断是否遍历完成，因为index值是混乱的
//           if (docsLength === jobList.length) {
//             // 根据上面获得的jobList，遍历其中工作信息中的company_id获取公司信息
//             jobList.forEach((job_item, job_index) => {
//               let company_id = parseInt(job_item[0].company_id)
//               Company.find({id: company_id}, (comerr, comdoc) => {
//                 if (comerr) {
//                   return res.json({
//                     state: 00001,
//                     message: err.message
//                   })
//                 }
//                 companyList.push(comdoc)
//                 jobList[job_index].push(comdoc[0])
//                 if (jobList.length === companyList.length) {
//                   res.json({
//                     state: '00000',
//                     data: jobList
//                   })
//                 }
//               })
//             })
//           }
//         })
//       })
//     })
//   })
// })

router.get('/test', (req, res) => {
  JobKey.find({})
  .skip(0)
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      return res.json({
        state: 00001,
        message: err.message
      })
    }
    docs.forEach((item, index) => {
      let job_id = parseInt(item.job_id)
      Job.find({id: job_id}, (error, jobDoc) => {
        if (error) {
          return res.json({
            state: 00001,
            message: err.message
          })
        }
        item.jobid = jobDoc[0]._id
      })
    })
    // console.log(docs)
    res.json({
      state: 00000,
      data: docs,
      message: 'success'
    })
  })
})


module.exports = router;
