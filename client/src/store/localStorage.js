let STORAGE_KEY = 'nowCity'
export default {
  fetch: function () {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"nowCityName": "全国", "nowCityId": 1}')
    } catch (error) {
      return []
    }
  },
  save: function (nowCity) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nowCity))
  }
}
