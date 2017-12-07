let mongoose = require('../db');
/*
 * job	工作表
 *
 * 字段	          字段描述
 *
 * title            ID
 * work_year      工作类型
 * city_id        所在城市
 * company_id     所在公司ID
 * department      部门
 * salary          薪水
 * education      教育经历
 * description    职位介绍
 * advantage      职位优势
 * job_nature
 * created_at
 * update_at
 *
 *
 */


let jobSchema = new mongoose.Schema({
  "id": {type: Number},
  "title": {type: String},
  "work_year": {type: Number},
  "city_id": {type: Number},
  "company_id": {type: Number},
  "department": {type: String},
  "salary": {type: String},
  "education": {type: Number},
  "description": {type: String},
  "advantage": {type: String},
  "job_nature": {type: Number},
  "created_at": {type: Number},
  "update_at": {type: Number},
  "keyjob": [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobKeyword' }]
}, {collection: "job"});

module.exports = mongoose.model("Job", jobSchema);
