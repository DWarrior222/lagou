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

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', users);

app.use('/users', users);
app.use('/city', city);
app.use('/ind', industry);
app.use('/key', keyword);
app.use('/comp', company);
app.use('/job', job);
app.use('/compInd', companyIndustry)
app.use('/jobKey', jobKeyword)
module.exports = app;
