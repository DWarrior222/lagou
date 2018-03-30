<template>
  <div class="search-content">
    <div class="search-container">
      <form class="form" method="post" @submit.prevent="submit">
        <div class="search-box">
          <input type="text" @click="getKeys" v-model="search_text" @keyup="getKeys" @blur="hideSearchPrompt" name="keyword" value="" autocomplete="off" placeholder="输入职位关键词">
          <input type="submit" name="submit" value="搜索">
          <input type="hidden" name="" value="" v-model="search_text">
        </div>
        <div class="search-drop-box" :style="{'z-index': zIndex}" v-show="searchPromptFlag">
          <ul class="drop-list">
            <p v-show="keyList.length!==0" style="padding: 5px 10px; color: #999">猜你要搜</p>
            <li v-for="(item, index) in keyList" :key="'key' + index" :key-id="item.id" class="drop-list-item" @mousedown="searchJob(item)">{{ item.name }}</li>
          </ul>
        </div>
        <div class="hot-search-box">
          <dl class="hot-search">
            <dt>热门搜索</dt>
            <dd v-for="item in hotList" @click="searchJob(item)">{{ item.name }}</dd>
          </dl>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {mapState} from 'vuex'
  import storageSearchText from '../store/storageSearchText'
  export default {
    data () {
      return {
        search_text: '',
        searchPromptFlag: false,
        keyList: [],
        promptMessage: '',
        zIndex: 9999,
        hotList: [
          {name: '运营'},
          {name: 'java'},
          {name: '算法'},
          {name: '产品经理'},
          {name: 'web前端'},
          {name: 'php'},
          {name: 'Android'},
          {name: 'ios'}
        ]
      }
    },
    computed: {
      ...mapState(['jobList', 'nowCityId', 'nowPage'])
    },
    mounted () {
      if (this.$route.name === 'jobs') {
        this.search_text = storageSearchText.fetch().searchText
        let searchText = this.search_text
        this.search(searchText)
      }
    },
    methods: {
      hideSearchPrompt () {
        this.searchPromptFlag = false
      },
      searchJob (item) {
        let searchText = item.name
        this.search_text = searchText
        this.search(searchText)
      },
      searchCallback (res, searchText) {
        let jobList = res.data.data
         // console.log(jobList)
        this.$store.dispatch('getJobList', jobList)
        if (this.$route.path === '/') {
          this.$router.push({name: 'jobs', params: {searchText: searchText}})
        }
        if (res.data.state === '00002') {
          this.promptMessage = '没有更多的信息'
        }
      },
      search (searchText) {
        let jobList = []
        this.$store.dispatch('clearJobList', jobList)
        storageSearchText.save({searchText})
        let cityId = this.$store.state.nowCityId
        let page = this.nowPage
        if (cityId === 1) {
          this.$http.post('/job/key_alljob?page=' + page, {searchText})
          .then(res => {
             // console.log(res)
            this.searchCallback(res, searchText)
          })
        } else {
          this.$http.post('/job/key_job?page=' + page, {searchText, cityId})
          .then(res => {
             // console.log(res)
            this.searchCallback(res, searchText)
          })
        }
      },
      getKeys () {
        // const zIndex = 1111
        this.searchPromptFlag = true
        let searchText = this.search_text.trim()
        let keyDefault = 'java'
        this.$http.post('/key/get_keys', {searchText, keyDefault})
        .then(res => {
          this.keyList = res.data.data.slice(0, 10)
        })
      },
      submit () {
        let searchText = this.search_text
        this.search(searchText)
      }
    },
    watch: {
      nowCityId: {
        handler (value1, value2) {
          if (this.$route.path === '/jobs') {
            let searchText = this.search_text
            this.search(searchText)
          }
        }
      },
      nowPage: {
        handler (value1, value2) {
          let searchText = this.search_text
          this.search(searchText)
        }
      }
    }
  }
</script>

<style scoped>
  .search-content {
    width: 980px;
    margin: 0 auto;
    position: relative;
    z-index: 90
  }
  .search-container {
    width: 700px;
    margin-left: 50%;
    transform: translateX(-50%);
    position: relative;
  }
  input[name=keyword] {
    width: 560px;
    height: 50px;
    font-size: 20px;
    float: left;
    outline-color: none;
    border-right: none;
  }
  input[name=keyword]:focus {
    border-color: #00b38a;
  }
  input[name=submit] {
    float: left;
    width: 140px;
    height: 50px;
    border: none;
    outline: none;
    background-color: #00b38a;
    float: left;
    font-size: 18px;
    color: #FFF;
    cursor: pointer;
  }
  .search-box {
    overflow: hidden;
  }
  .search-drop-box {
    width: 559px;
    position: absolute;
    top: 50px;
    z-index: 999;
    left: 1px;
    background-color: white;
  }
  .search-drop-box .drop-list .drop-list-item {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    cursor: pointer;
  }
  .search-drop-box .drop-list .drop-list-item:hover {
    background-color: #00b38a;
  }
  .hot-search-box {
    margin-top: 10px;
  }
  .hot-search dt, .hot-search dd {
    display: inline-block;
  }
  .hot-search dt {
    margin-right: 10px;
    font-size: 14px;
    color: #777;
  }
  .hot-search dd {
    color: #00b38a;
    margin: 0 10px;
    cursor: pointer;
  }
</style>
