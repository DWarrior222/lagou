
let mongoose = require('../db');
/*
 * users	注册用户表
 * 注册时邮件确认，或者手机验证码确认
 *
 * 字段	     类型	      字段描述
 *
 * user_id 	Number	用户id（主键）
 * username	String     用户名
 * password	String	  用户密码
 * // question	String	  密保问题
 * // answer	  String	  密保答案
 * user_Img	String	  用户图片
 * regtime	String	  注册时间
 *
 */

let userSchema = new mongoose.Schema({
  "user_id": {type: Number},
  "username": {type: String},
  "password": {type: String},
  "user_pic": {type: String, default: ''},
  "regtime": {type: String}
}, {collection: 'users'});

module.exports = mongoose.model("User",userSchema);
