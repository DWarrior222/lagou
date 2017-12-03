let mongoose = require('../db');
/*
 * industry	工作表
 *
 * 字段	          字段描述
 *
 * id              行业ID
 * name            行业名称
 *
 */

let industrySchema = new mongoose.Schema({
  "id": {type: Number},
  "name": {type: String}
}, {collection: "industry"});

module.exports = mongoose.model("Industry", industrySchema);
