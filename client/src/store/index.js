import Vue from 'vue'
// 引入Vuex模块
import Vuex from 'vuex'
// 将Vuex插件作为Vue的插件注册
Vue.use(Vuex)
// 导出Vuex的Store实例
export default new Vuex.Store({
  // 状态
  state: {
    nowCityName: '全国',
    nowCityId: 1,
    jobList: []
  },
  // 更改
  mutations: {
    switchCity (state, nowCity) {
      console.log(nowCity)
      const {nowCityName, nowCityId} = nowCity
      state.nowCityName = nowCityName
      state.nowCityId = nowCityId
    },
    getJobList (state, jobList) {
      state.jobList = jobList
    }
  },
  // 行为
  actions: {
    switchCity: ({commit}, nowCity) => commit('switchCity', nowCity),
    getJobList: ({commit}, jobList) => commit('getJobList', jobList)
  }
})
