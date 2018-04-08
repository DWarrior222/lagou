let express = require('express');
let router = express.Router();

let UserInfo = require('./../models/userinfo');
let mutipart= require('connect-multiparty');
let mutipartMiddeware = mutipart()
var fs = require('fs');
var path=require("path");

router.post('/file-upload',mutipartMiddeware, (req,res) => {
    //这里打印可以看到接收到文件的信息。
    console.log(req.files);
    let userId      = parseInt(req.param("userId"));
    /*//do something
    * 成功接受到浏览器传来的文件。我们可以在这里写对文件的一系列操作。例如重命名，修改文件储存路径 。等等。
    *
    *
    * */
    // req.files.thumbnail.path = '../client/src/assets/images/' + req.files.thumbnail.name
    fs.renameSync(req.files.thumbnail.path, "../client/src/assets/resume/" + req.files.thumbnail.name);
    UserInfo.findOne({user_id: userId}, (err, userInfoDoc) => {
  		if (err) {
        return res.json({
          state: '00001',
          message: err.message
        })
      }
  		userInfoDoc.resume = req.files.thumbnail.name
      userInfoDoc.save((saveErr, saveDoc) => {
  			// console.log('3333333')
  			if (saveErr) {
  				return res.json({
  					state: '00001',
  					message: saveErr.message
  				})
  			}
  			return res.json({
  				state: '00000',
  				message: '上传成功',
  				data: saveDoc
  			})
  		})
    });
      //给浏览器返回一个成功提示。
      // return res.json({
      //   state: '00000',
      //   message: 'upload success!',
      //   data: req.files.thumbnail.name
      // });
});
module.exports = router;
