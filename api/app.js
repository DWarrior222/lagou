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
let upload = require('./routes/upload')

let mutipart= require('connect-multiparty');
let mutipartMiddeware = mutipart()

let app = express();
app.use(mutipart({uploadDir:'./public/resume'}));
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
app.use('/upload', upload)
module.exports = app;
