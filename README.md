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
本系统是一个主要使用python3, celery和requests来爬取职位数据的爬虫，实现了定时任务，出错重试，日志记录，自动更改Cookies等的功能，并使用ECharts + Bootstrap 来构建前端页面，来展示爬取到的数据
```

导入mongodb数据库

创建数据库和集合
$ mongoimport --db lagoutest --collection citys --type csv --headerline --ignoreBlanks --file city.csv

注意：
需要csv文件中编码为utf-8
需要csv文件中的数据规范符合mongodb的数据规范，容易出现错误的地方是数据当中的双引号"" 最好不要用英文状态下的，否则导入数据会出错

集合名称：
city                /city
company             /company
company_industry    /companyInd
industry            /industry
job                 /job
job_keyword         /jobKey
keyword             /keyword

增加集合：
users

resume
字段
resume_id           Number
user_id             Number
job_id              Array



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
## 首页

### 首页top-bar组件

登陆注册功能，
登录或非登录的状态
未完成..
