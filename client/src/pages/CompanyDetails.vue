<template id="">
  <div class="company-details-body">
    <div class="top-bar-wrap">
      <top-bar areaflag="false"></top-bar>
    </div>
    <div v-show="waiting" class="wait-img">
      <figure>
        <img src="../assets/images/wait.gif" alt="">
        <figcaption>正在加载数据，请等待...</figcaption>
      </figure>
    </div>
    <div class="details-head-wrap" v-for="item in compDetails">
      <div class="details-head">
        <div class="details-head-l">
          <h1>{{ item[0].shortname }}</h1>
          <p>{{ item[0].advantage }}</p>
          <div class="">
            发布于拉勾网
          </div>
        </div>
      </div>
    </div>
    <div class="option-wrap" v-show="compDetails.length">
      <div class="option">
        <span :class="{'current': option===1}" @click="option=1">公司主页</span>
        <span :class="{'current': option===2}" @click="option=2">招聘职位({{jobLength}})</span>
      </div>
    </div>

    <div class="main" v-for="item in compDetails">
      <div v-show="option===1" style="display: flex">
        <div class="company-details-content">
          <h3>公司介绍</h3>
          <p v-for="(int, intIndex) in introduce">{{ int }}</p>
          <h3>公司位置</h3>
          <iframe width="600px" height="300px" :src="iframeSrc"></iframe>
        </div>
        <div class="company-infor">
          <h3>公司基本信息</h3>
          <p class="iconfont icon-label_fill"> 行业： <span v-for="value in item[2]">{{ value.name }} </span></p>
          <p class="iconfont icon-coordinates_fill"> 公司地址：<span>{{ item[0].address }}</span></p>
        </div>
      </div>
      <div v-show="option===2" style="display: flex">
        <div class="company-details-content">
          <ul class="job-list">
            <li v-for="jobItem in item[1]">
              <router-link tag="b" :to="{name: 'jobDetails', params: {jobid: jobItem.id}}">{{ jobItem.title }}</router-link>
              <span>{{ jobItem.salary }}</span>
            </li>
          </ul>
        </div>
        <div class="company-infor">
          <h3>公司基本信息</h3>
          <p class="iconfont icon-label_fill"> 行业： <span v-for="value in item[2]">{{ value.name }} </span></p>
          <p class="iconfont icon-coordinates_fill"> 公司地址：<span>{{ item[0].address }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Public from '../Public'
export default {
  mixins: [Public],
  data () {
    return {
      compid: '',
      compDetails: [],
      waiting: true,
      introduce: [],
      iframeSrc: 'http://m.amap.com/navi/?dest=116.470098,39.992838&destName=阜通西&hideRouteIcon=1&key=8435189a62d4c879c5a7750394127979',
      option: 1,
      jobLength: 0
    }
  },
  methods: {
    compStorage (compid) {
      let STORAGE_KEY = 'compid'
      const compSetter = {
        fetch: function () {
          try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY))
          } catch (error) {
            return []
          }
        },
        save: function (compid) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(compid))
        }
      }
      if (compid) {
        this.compid = compid
      } else {
        this.compid = compSetter.fetch()
      }
      compSetter.save(this.compid)
    },
    handDescription () {
      console.log(this.compDetails[0][0].introduce)
      let introduce = this.compDetails[0][0].introduce
      // console.log(introduce.split(/\s+[0-9][、.]/g))
      console.log(introduce.split(/[：；。]\s+/g))
      // this.introduce = introduce.split(/[：；。]?\s+[0-9][.、]/g)
      this.introduce = introduce.split(/[：；。]\s*/g)
    }
  },
  mounted () {
    let compid = this.$route.params.compid
    this.waiting = true
    this.compStorage(compid)
    this.$http.get('/comp/details?compid=' + this.compid)
    .then(res => {
      console.log(res)
      this.compDetails = res.data.data
      this.iframeSrc = 'http://m.amap.com/navi/?dest=116.470098,39.992838&destName=' + this.compDetails[0][0].address + '&hideRouteIcon=1&key=8435189a62d4c879c5a7750394127979'
      this.jobLength = this.compDetails[0][1].length
      this.waiting = false
      this.handDescription()
    })
  }
}
</script>
<style scoped>
  .company-details-body {
    background: #fff;
  }
  .top-bar-wrap {
    width: 100%;
    height: 50px;
    min-width: 980px;
    background-color: #333;
  }
  .details-head-wrap {
    /* height: 145px; */
    padding: 20px 20px 10px 20px;
    background: #f2f5f4;
  }
  .main {
    width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
  }
  .details-head {
    width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .details-head h1 {
    font-size: 36px;
    color: #333;
    line-height: 36px;
  }
  .details-head-l span {
    line-height: 24px;
  }
  .details-head-l p {
    font-size: 14px;
    margin: 15px 0 8px 0;
  }
  .company-details-content {
    padding-right: 20px;
    width: 700px;
    background: #fff;
  }
  .company-infor {
    width: 240px;
  }
  .main h3 {
    line-height: 50px;
    font-weight: bold;
  }
  .main p {
    margin: 20px 0;
  }
  .option-wrap {
    background: #f2f5f4;
    height: 50px;
    line-height: 48px;
  }
  .option {
    width: 980px;
    margin: 0 auto;
    display: flex;
  }
  .option span {
    cursor: pointer;
    margin-right: 25px;
    border-bottom: 2px solid #f2f5f4;
    box-sizing: border-box;
    font-size: 18px;
  }
  .option .current {
    border-bottom: 2px solid #00b38a;
  }
  .company-details-content .job-list li b {
    color: #00b38a;
    cursor: pointer;
    font-size: 18px;
  }
  .company-details-content .job-list li span {
    font-size: 16px;
    color: #fd5f39;
    margin-top: 10px;
  }
  .company-details-content .job-list li {
    height: 85px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ededed;
    border-left: 5px solid #00b38a;
    font-size: 14px;
    display: flex;
    flex-direction: column;
  }
  .wait-img figure {
    text-align: center;
    line-height: 300px;
    display: flex;
    font-size: 22px;
  }
</style>
