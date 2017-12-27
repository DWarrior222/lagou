let STORAGE_KEY = 'searchText'
export default {
  fetch: function () {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY))
    } catch (error) {
      return []
    }
  },
  save: function (searchText) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchText))
  }
}
