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
登陆功能
```
模态框登录
未作验证
```
注册功能
```
模态框注册
未作验证
```
退出功能
```
退出后清掉cookie值
```
刷新检查登陆功能
```
钩子验证是否登录
```
加载城市功能
```
获取保存在localStorage中的选择过的城市数据.(再次刷新页面的情况下不需要再次选择城市)默认为全国
钩子加载城市数据，并初始化data变量cityList

```
切换城市功能
```
vuex中维护当前选择城市的id(nowCityId) 和 name(nowCityName) 值
切换城市会改变vuex中nowCityId 和 nowCityName，并且会将这组值保存在localStorage中
刷新页面会获取保存在localStorage中的这组值，并处理数据，使之正确显示在页面中
```
### 首页搜索框组件
自定义指令
directives: {
  focus: {
    update (el) {
      el.focus()
    }
  }
}

点击事件，失去焦点事件，按下鼠标事件

click事件触发条件，鼠标按下，鼠标松开触发一次点击事件，但在按下之后，触发了input的blur事件，所以这个click事件并没有完成，就出现了冲突的情况。

其实在MongoDB里面，find()和findOne()的用法是一样的，举个例子：findOne({name:”mongo”})和find({name:”mongo”}).limit(1)其实是等效的。它们的参数也是一样的，只不过find()和findOne()返回的不同而已。

### 搜索的api
关联查询尝试失败，手动关联
有两个参数是，地区和关键字

### 工作列表页
关键字搜索时，从主页跳转到jobs页面，保留搜索的关键字

1.路由改变时传递参数
router-link组件的to属性传递参数 或者 this.#router.push传递参数
在目标页面通过this.$route.params接收参数

2.locaStorage本地存储
