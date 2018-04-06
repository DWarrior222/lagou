let mongoose = require('../db');


let userBaseInfoSchema = new mongoose.Schema({
  "user_id": {type: Number},
  "user_pic": {type: String, default: ''},
  "person_name": {type: String},
  "sex": {type: Number},
  "age": {type: String},
  "contact_infor": {type: String},    // 联系方式
  "autograph": {type: String}         // 签名
  "college_name": {type: String},
  "intention_city": {type: String},
  "intention_salary": {type: String},
}, { collection: "user_baseinfo" });

module.exports = mongoose.model("UserBaseInfo", userBaseInfoSchema);
