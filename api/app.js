let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
require('./db')
let users = require('./routes/users');
let city = require('./routes/city');
let industry = require('./routes/industry');
let keyword = require('./routes/keyword');
let company = require('./routes/company');
let job = require('./routes/job');
let companyIndustry = require('./routes/company-industry')
let jobKeyword = require('./routes/job-keyword')
let userInfo = require('./routes/userinfo')
let userBaseInfo = require('./routes/user-baseinfo')
// let upload = require('./routes/upload')

// let mutipart= require('connect-multiparty');
// let mutipartMiddeware = mutipart()
// const upload = require('multer')({ dest: 'uploads/' });

let UserInfo = require('./models/userinfo');
var fs = require('fs');
var path=require("path");
const upload = require('multer')({ dest: '../client/src/assets/resume/' });
let app = express();
app.post('/upload', upload.single('test-upload'), (req, res) => {
  // 没有附带文件
  if (!req.file) {
    res.json({ ok: false });
    return;
  }
  // console.log(req.query.userId)
  // 输出文件信息
  // console.log('====================================================');
  // console.log('fieldname: ' + req.file.fieldname);
  // console.log('originalname: ' + req.file.originalname);
  // console.log('encoding: ' + req.file.encoding);
  // console.log('mimetype: ' + req.file.mimetype);
  // console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB');
  // console.log('destination: ' + req.file.destination);
  // console.log('filename: ' + req.file.filename);
  // console.log('path: ' + req.file.path);
  let userId      = parseInt(req.query.userId)
  fs.renameSync(req.file.path, "../client/src/assets/resume/" + req.file.originalname);
  UserInfo.findOne({user_id: userId}, (err, userInfoDoc) => {
    if (err) {
      return res.json({
        state: '00001',
        message: err.message
      })
    }
    userInfoDoc.resume = req.file.originalname
    userInfoDoc.save((saveErr, saveDoc) => {
      // console.log('3333333')
      if (saveErr) {
        return res.json({
          state: '00001',
          message: saveErr.message
        })
      }
      return res.json({
        state: '00000',
        message: '上传成功',
        data: saveDoc
      })
    })
  });
});
// app.use(mutipart({uploadDir:'../client/src/assets/resume'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('/users', users);

app.use('/users', users);
app.use('/city', city);
app.use('/ind', industry);
app.use('/key', keyword);
app.use('/comp', company);
app.use('/job', job);
app.use('/compInd', companyIndustry)
app.use('/jobKey', jobKeyword)
app.use('/userInfo', userInfo)
app.use('/userBaseInfo', userBaseInfo)
// app.use('/upload', upload)
module.exports = app;
