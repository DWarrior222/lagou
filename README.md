# lagou

## 项目初始化
初始化一个本地库
```
git init
```
### mongodb导入数据库
得到拉钩数据

github上拿到拉钩的数据
爬虫地址：https://github.com/GuozhuHe/webspider
```
本系统是一个主要使用python3, celery和requests来爬取职位数据的爬虫，实现了定时任务，出错重试，日志记录，
自动更改Cookies等的功能，并使用ECharts + Bootstrap 来构建前端页面，来展示爬取到的数据
```

导入mongodb数据库

创建数据库和集合
$ mongoimport --db lagoutest --collection citys --type csv --headerline --ignoreBlanks --file city.csv

注意：
需要csv文件中编码为utf-8
需要csv文件中的数据规范符合mongodb的数据规范，容易出现错误的地方是数据当中的双引号"" 最好不要用英文状态下的，否则导入数据会出错

集合                 路由
```
city                /city

company             /company

company_industry    /companyInd

industry            /industry

job                 /job

job_keyword         /jobKey

keyword             /keyword

```
### api初始化
生成包管理配置文件package.json
```
npm init -y
```
安装依赖插件
```
npm i -S cookie-parser express md5 mongoose silly-datetime

express .
```
修改生成的express框架，删除不需要的view等目录

初始化db.js routes 和 管理数据库的models

连接数据库，启动api服务
```
mongod

node ./bin/www
```
postman测试api
http://localhost:3000/city/getcity

定义Schema的时候，最好指定数据集合，例如
```
let citySchema = new mongoose.Schema({
  "id": {type: Number},
  "name": {type: String}
}, { collection: "citys" });
```
### Vue项目初始化 Vue-cli
生成项目
```
$ vue init webpack lagou

cd lagou

npm install

npm run dev
```
安装所需常用插件
```
npm i -S axios vue-axios vue-infinite-scroll vue-lazyload vuex
或者
yarn add axios vue-axios vue-infinite-scroll vue-lazyload vuex
```
src目录新建pages目录 store目录 util目录 Public.js文件并修改代码 assets目录下引入初始化css文件 等等

获取数据
```
在组件文件中请求数据并显示在浏览器中
```
## 项目开发
git和github进行协同开发流程了解

https://www.cnblogs.com/wawahaha/p/5171187.html

大概流程是：
创建组织 (在组织中创建仓库  在组织中创建team  给这个team添加其他成员)
在组织中给仓库添加team并且设置权限
team成员fork源仓库
在自己的github中，将fork的仓库克隆到本地

在本地仓库中创建一个功能分支，开发功能(在未开发完成期间，只需要提交本地仓库中，不需要推送到远程)
```
git checkout develop     # 切换到`develop`分支  
git checkout -b feature-discuss     # 分出一个功能性分支
```
功能开发完成后，切换到dev分支，将功能分支合并到本地的dev分支(前提是这个功能已经开发完成)，push到自己的远程仓库
```
git checkout dev
git merge --no-ff feature
git push origin dev
```
向管理员提交pull request
```
假设我完成了“讨论”功能（当然，你还可能对自己的develop进行了多次合并，完成了多个功能），经过测试以后，觉得没问题，就可以请求管理员把自己仓库的develop分支合并到源仓库的develop分支中，这就是传说中的pull request。
```
管理员对我的代码进行review。
在他的本地测试新建一个测试分支，测试我的代码
```
git checkout develop # 进入他本地的develop分支  
git checkout -b livoras-develop # 从develop分支中分出一个叫livoras-develop的测试分支测试我的代码
git pull https://github.com/livoras/git-demo.git develop # 把我的代码pull到测试分支中，进行测试
```
判断是否同意合并到源仓库的develop中，如果经过测试没问题，可以把我的代码合并到源仓库的develop中：
```
git checkout develop
git merge --no-ff livoras-develop
git push origin develop
```
然后我的开发仓库的功能分支到达了源仓库的develop分支中
