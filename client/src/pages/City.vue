<template id="">
  <div>
    <div class="top-bar-wrap">
      <top-bar></top-bar>
    </div>
    <div class="main">
      <div class="city-list-wrap">
        <dl class="common-city-list">
          <dt>常用城市</dt>
          <dd v-for="(item, index) in commonCityList" :class="{'nowcity': nowCityId===item.id}" @click="switchCityComfirm(item)">{{ item.name }}</dd>
        </dl>
        <div class="other-city">
          <p class="other-city-prompt">按首字母查找</p>


          <ul class="other-city-list">
            <li v-if="" v-for="(item, index) in letterArray">
              <div class="">
                <b>{{ item }}</b>
              </div>
              <div class="">
                <span v-for="(value, idx) in cityList" :class="{'nowcity': nowCityId===value.id}" v-if="item===value.pinyin.substr(0, 1)" :data-cityId="value.id" @click="switchCityComfirm(value)">{{ value.name }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-wrap">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
import Public from '../Public'
import Model from '../components/Model'
import Search from '../components/Search'
import nowCityStorage from '../store/localStorage'
import { mapState } from 'vuex'
export default {
  mixins: [Public],
  components: {
    Model,
    Search
  },
  data () {
    return {
      flag: false,
      letterArray: [],
      cityList: [],
      commonCityList: [],
      isShowModel: false
    }
  },
  computed: {
    ...mapState(['nowCityName', 'nowCityId'])
  },
  methods: {
    initLetterArray () {
      for (let i = 1; i <= 26; i++) {
        let letter = String.fromCharCode(64 + parseInt(i))
        if (letter !== 'I' && letter !== 'O' && letter !== 'U' && letter !== 'V') {
          this.letterArray.push(String.fromCharCode(64 + parseInt(i)))
        }
      }
    },
    switchCityComfirm (item) {
      let nowCityName = item.name
      let nowCityId = item.id
      this.$store.dispatch('switchCity', {nowCityName, nowCityId})
      nowCityStorage.save({nowCityName, nowCityId})
      // this.$router.push('jobs')
      this.$router.go(-1)
      // console.log(history)
      // if (this. === '') {
      //   this.$router.push('/')
      // } else {
      // }
    }
  },
  mounted () {
    this.initLetterArray()
    this.$http.get('/city/getcity')
    .then(res => {
      this.cityList = res.data.data
      this.commonCityList = (this.cityList).slice(0, 12)
    })
  }
}
</script>
<style scoped>
  .top-bar-wrap {
    width: 100%;
    height: 50px;
    min-width: 980px;
    background-color: #333;
  }
  .main {
    width: 100%;
    min-width: 980px;
  }
  .search-wrap {
    background: #F2F5F4;
    padding: 30px 0 28px;
  }
  .footer-wrap {
    border-top: 1px solid #ebebeb;
    width: 100%;
    min-width: 980px;
    background-color: white;
  }
  .city-list-wrap {
    width: 980px;
    margin: 100px auto;
    background: #fff;
    border: 1px solid #d4d4d4;
  }
  .common-city-list {
    padding: 30px 20px;
    display: flex;
    line-height: 22px;
    border-bottom: 1px solid #d4d4d4;
  }
  .common-city-list dt {
    padding: 2px 20px 2px 0;
    font-weight: bold;
  }
  .common-city-list dd {
    margin: 0 5px;
    padding: 2px 8px;
  }
  .common-city-list dd:hover {
    background: #00b38a;
    color: white;
    cursor: pointer;
  }
  .other-city {
    padding: 30px 20px;
  }
  .other-city-prompt {
    font-weight: bold;
  }
  .other-city-list {
    padding: 20px 0;
  }
  .other-city-list li {
    padding: 10px 20px;
    line-height: 22px;
    display: flex;
  }
  .other-city-list li b {
    margin-right: 20px;
    width: 30px;
    height: 30px;
    background: #fafafa;
    text-align: center;
    line-height: 30px;
    display: inline-block;
  }
  .other-city-list li span {
    margin: 5px 5px;
    padding: 2px 8px;
    display: inline-block;
  }
  .other-city-list li:hover {
    background: #fafafa;
  }
  .other-city-list li:hover>div>b {
    background: #ccc;
    color: white;
  }
  .other-city-list li span:hover {
    background: #00b38a;
    color: white;
    cursor: pointer;
  }
  .other-city-list li span.nowcity {
    background: #00b38a;
    color: white;
  }
  .common-city-list dd.nowcity {
    background: #00b38a;
    color: white;
  }
</style>
