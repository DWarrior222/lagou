let mongoose = require('../db');
/*
 * keyword	工作表
 *
 * 字段	          字段描述
 *
 * id              关键字ID
 * name            关键字名称
 *
 */

let keywordSchema = new mongoose.Schema({
  "id": {type: Number},
  "name": {type: String}
}, {collection: "keyword"});

module.exports = mongoose.model("Keyword", keywordSchema);
