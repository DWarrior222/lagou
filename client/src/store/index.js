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
    jobList: [],
    search_text: '',
    nowPage: 1,
    cityList: [],
    userId: ''
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
    },
    getSearchText (state, searchText) {
      state.search_text = searchText
    },
    skip (state, page) {
      state.nowPage = page
    },
    getCity (state, cityList) {
      state.cityList = cityList
    },
    clearJobList (state, jobList) {
      state.jobList = jobList
    },
    getUserId (state, userId) {
      state.userId = userId
    }
  },
  // 行为
  actions: {
    switchCity: ({commit}, nowCity) => commit('switchCity', nowCity),
    getJobList: ({commit}, jobList) => commit('getJobList', jobList),
    clearJobList: ({commit}, jobList) => commit('clearJobList', jobList),
    getSearchText: ({commit}, searchText) => commit('getSearchText', searchText),
    decreasePage: ({commit}, page) => commit('skip', page),
    increasePage: ({commit}, page) => commit('skip', page),
    skip: ({commit}, page) => commit('skip', page),
    getCity: ({commit}, cityList) => commit('getCity', cityList),
    getUserId: ({commit}, userId) => commit('getUserId', userId)
  }
})
