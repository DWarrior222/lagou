let express = require('express');
let router = express.Router();
let mutipart= require('connect-multiparty');
let mutipartMiddeware = mutipart()
var fs = require('fs');
var path=require("path");

router.get("/download",(req,res) => {  
    var filePath = path.join(__dirname, './');
    console.log(filePath)
    fs.readFile(filePath+"public/resume/-wcnhFIzXhLOzoC4C5lD9CYz.jpg", (err, data) => {
        res.set({
            'Content-Type': 'application/octet-stream',  //告诉浏览器这是一个二进制文件
            'Content-Disposition': 'attachment; filename=upload.jpg'  //告诉浏览器这是一个附件要下载是png图片
        });
        res.end(data)
    })
})
router.post('/file-upload',mutipartMiddeware, (req,res) => {
    //这里打印可以看到接收到文件的信息。
    console.log(req.files);
    /*//do something
    * 成功接受到浏览器传来的文件。我们可以在这里写对文件的一系列操作。例如重命名，修改文件储存路径 。等等。
    *
    *
    * */

    //给浏览器返回一个成功提示。
    res.send('upload success!');
});
module.exports = router;
