let mongoose = require('../db');
/*
 * city	工作表
 *
 * 字段	          字段描述
 *
 * id              城市ID
 * name            城市名称
 *
 */

let citySchema = new mongoose.Schema({
  "id": {type: Number},
  "name": {type: String},
  "pinyin": {type: String}
}, { collection: "city" });

module.exports = mongoose.model("", citySchema);
