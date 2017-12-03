import Vue from 'vue'
// 引入VueRouter插件
import Router from 'vue-router'
// 引入主页
import Home from '@/pages/Home'
// 使用VueRouter组件
Vue.use(Router)
// 导出VueRouter的实例
export default new Router({
  // 配置路由
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Home
    }
  ]
})
