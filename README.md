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
关键字搜索工作时，从主页跳转到jobs页面，保留搜索的关键字，两个方法

1.路由改变时传递参数
```
router-link组件的to属性传递参数 或者 this.#router.push传递参数
在目标页面通过this.$route.params接收参数
```
2.locaStorage本地存储


### 城市选择页面
实现了按字母将城市排序的功能

服务端
```
手动为数据增加一个字段pinyin，它是城市的汉语拼音
利用一个汉语转拼音的插件，将每条数据中的城市名称转换得到拼音，再将拼音添加到数据中。
```
渲染到前端
```
通过v-for遍历一个包含26个英文字母数组，每一个字母代表一组城市，
在内部通过v-for遍历所有的城市列表，就是cityList(包含pinyin字段)，通过判断外层v-for的项和内层v-for的项中的pinyin字段的首字母  是否相同， 相同则插入这一项，否则不插入
```
在city页面选择完城市后，通过router.go(-1)返回上一个路由
使用了vue-router的话，使用router.go(-1)可以实现。history.go操作的是浏览器的路由，在单页应用中这样操作肯定是返回不到上一页的。

左上角的城市选择：

之前实现的是，全国和6个城市，选择这其中的哪个城市，都会切换到该城市，并且从其他的六个选项中删除这个已选中的城市，

结果是实现不管你点这其中哪个城市，其他城市就会跑到其他的六个选项中

后来想要实现可选择所有的城市

那就有两种情况：
1.当前所选择的城市是之前默认的6个城市之一
那么不需要跳转到citylist页面
2.当前所选择的城市不是默认的6个城市之一
那么需要跳转到citylist页面

这是为了保证原本实现的功能还可用(仿照猎聘网)

### jobs页面信息过滤模块
静态效果的实现
选择项：
```

每一条过滤信息都用一个函数来控制，将选择的项经过验证放到一个已选条件的数组中（selecting），然后遍历selecting数组将选择的信息渲染到页面

选择项的时候的验证，同一个过滤信息只能有一个选项，用一个变量保存当前选择的选项，再次点击同个过滤条件的一个选项时，先判断已选条件的数组中，有没有当前变量中保存的值，如果有先删除在添加
```
取消项：
```
点击每一行最左侧的选项就可以取消选择，回到默认情况
或者点击底部选择项的取消，也可以取消选择的项，

取消项的时候，点击每一条过滤条件的默认或者点击已选条件的取消都可以取消，这其中实际上是，通过删除已选条件数组中的需要取消的项，然后在清空变量的值，因为变量的值负责提示用户你当前选择是哪个，清空则显示默认项。
```
城市选择：
```
在不同组件中，通过vuex关联当前选择的城市信息，所以城市的情况特殊一点。

第一种情况：
在过滤模块中选择城市，需要通过修改vuex中保存的城市信息和本地保存的城市信息
但这样可能会破坏之前的一些设置，需要通过watch监听变化，并恰当处理
第二种情况：
这种情况实际上和第一种情况相反，在其他组件中修改城市信息，也就修改了vuex，那需要在当前的过滤条件中体现出来，还是要通过watch监听，当vuex中城市信息改变时，找到过滤条件中对应的城市项，添加到已选条件的数组中。

本来地，再选择城市后，需要再次请求数据，但是我这里没有做还是实现了，我在search组件中，通过watch监听，只要vuex中的城市信息改变就会重新获取数据。
```
通过watch 和 vuex配合，实在方便了不少。

### jobs页面工作信息展示
在这里修改了获取工作的api

实现功能，为每一个工作的公司获取了它所属的行业
关于工作所属城市：

工作的数据中城市信息为city数据表中的id信息

解决：在主页通过生命周期函数，也就是钩子，将城市信息保存在vuex中，在jobs页面，通过一个普通函数处理并返回正确的城市信息
### 分页
关于分页，实现的比较简单，原因是一次性数据查询会非常非常的慢(我写接口比较渣)，所以通过每访问下一页的时候，再去请求数据。

### 主页轮播


### 主页的工作信息展示

<router-view>可以传递props，支持v-ref,同时也可以使用v-transition和transition-mode来获得场景切换效果，被渲染的组件将注册到父级组件的this.$对象上。
