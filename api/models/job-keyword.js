let mongoose = require('../db');
/*
 * job_keyword	工作表
 *
 * 字段	         字段描述
 *
 * id            关键字ID
 * job_id         工作ID
 * keyword_id    关键字ID
 * city_id        城市ID
 */


let jobKeywordSchema = new mongoose.Schema({
  "id": {type: Number},
  "job_id": {type: String},
  "keyword_id": {type: Number},
  "city_id": {type: Number}
}, {collection: "job_keyword"});

module.exports = mongoose.model("JobKeyword", jobKeywordSchema);
