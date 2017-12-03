let mongoose = require('../db');
/*
 * company	工作表
 *
 * 字段	          字段描述
 *
 * id
 * city_id          诚实ID
 * shortname        公司简称
 * fullname         公司全称
 * finance_stage
 * advantage        公司优势
 * size
 * address          地址
 * features
 * introduce        介绍
 * process_rate
 * update_at
 *
 *
 */

let CompanySchema = new mongoose.Schema({
  "id": {type: Number},
  "city_id": {type: Number},
  "shortname": {type: String},
  "fullname": {type: String},
  "finance_stage": {type: Number},
  "advantage": {type: String},
  "size": {type: Number},
  "address": {type: String},
  "features": {type: String},
  "introduce": {type: String},
  "process_rate": {type: Number},
  "update_at": {type: Number}
}, {collection: "company"});

module.exports = mongoose.model("Company", CompanySchema);
