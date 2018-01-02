import Vue from 'vue'
// 引入VueRouter插件
import Router from 'vue-router'
// 引入主页
import Home from '@/pages/Home'
// 工作列表页
import Job from '@/pages/Job'
// 城市选择页面
import City from '@/pages/City'
// 工作详情页
import JobDetails from '@/pages/JobDetails'
// 公司详情页
import CompanyDetails from '@/pages/CompanyDetails'
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
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Job
    },
    {
      path: '/citylist',
      name: 'citys',
      component: City
    },
    {
      path: '/job_details',
      name: 'jobDetails',
      component: JobDetails
    },
    {
      path: '/comp_details',
      name: 'companyDetails',
      component: CompanyDetails
    }
  ]
})
