let mongoose = require('../db');
/*
 * company_industry	工作表
 *
 * 字段	          字段描述
 *
 * id              行业ID
 * company_id      公司ID
 * industry_id     行业ID
 * city_id         城市ID
 *
 */


let companyIndSchema = new mongoose.Schema({
  "id": {type: Number},
  "company_id": {type: Number},
  "industry_id": {type: Number},
  "city_id": {type: Number}
}, {collection: "company_industry"});

module.exports = mongoose.model("CompanyInd", companyIndSchema);
