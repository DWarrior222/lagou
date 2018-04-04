<template id="">
  <div class="job-details-body">
    <div class="top-bar-wrap">
      <top-bar areaflag="false"></top-bar>
    </div>
    <div v-show="waiting" class="wait-img">
      <figure>
        <img src="../assets/images/wait.gif" alt="">
        <figcaption>正在加载数据，请等待...</figcaption>
      </figure>
    </div>
    <div class="details-head-wrap" v-for="item in jobDetails">
      <div class="details-head">
        <div class="details-head-l">
          <span>{{ item[0].department }}</span>
          <h1>{{ item[0].title }}</h1>
          <p>{{ item[0].salary }}</p>
          <div class="">
            发布于拉勾网
          </div>
        </div>
        <div class="details-head-r">
          <div :class="{'collect': true, 'collected': isCollect, 'un-collect': !isCollect}" @click="collect(item)">
            <i :class="{'iconfont': true, 'icon-collection': !isCollect, 'icon-collection_fill': isCollect}"></i><span>{{ collectMessage }}</span>
          </div>
          <div class="send">
            投个简历
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-for="item in jobDetails">
      <div class="job-details-content">
        <h3>职位诱惑</h3>
        <p>{{ item[0].advantage }}</p>
        <h3>职位描述</h3>
        <p v-for="(des, desIndex) in description" v-show="des.trim()!==''">{{ des }}</p>
      </div>
      <div class="company-infor">
        <h3> <router-link :to="{name: 'companyDetails', params: {compid: item[1].id}}">{{ item[1].shortname }}</router-link> </h3>
        <p class="iconfont icon-label_fill"> 行业： <span v-for="value in item[2]">{{ value.name }}</span></p>
        <p class="iconfont icon-coordinates_fill"> 公司地址：<span>{{ item[1].address }}</span></p>
      </div>
    </div>
    <div class="footer-wrap">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script type="text/javascript">
import Public from '../Public'
export default {
  mixins: [Public],
  data () {
    return {
      jobDetails: [],
      description: [],
      isCollect: false,
      collectMessage: '收藏',
      jobid: '',
      waiting: true
    }
  },
  methods: {
    jobStorage (jobid) {
      let STORAGE_KEY = 'jobid'
      const jobSetter = {
        fetch: function () {
          try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY))
          } catch (error) {
            return []
          }
        },
        save: function (jobid) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(jobid))
        }
      }

      if (jobid) {
        this.jobid = jobid
      } else {
        this.jobid = jobSetter.fetch()
      }
      jobSetter.save(this.jobid)
    },
    handDescription () {
       // console.log(this.jobDetails[0][0].description)
      let description = this.jobDetails[0][0].description
      //  // console.log(description.split(/\s+[0-9][、.]/g))
       // console.log(description.split(/[：；。]\s+/g))
      // this.description = description.split(/[：；。]?\s+[0-9][.、]/g)
      this.description = description.split(/[：；。]?\s+/g)
    },
    collect (item) {
      console.log(item)
      let jobId = item[0].id
      let jobName = item[0].title
      let jobSalary = item[0].salary
      let compName = item[1].fullname
      let compCity = item[1].address
      let jobWelfare = item[0].advantage
      let collectJob = {
        'job_id': jobId,
        'job_name': jobName,
        'job_salary': jobSalary,
        'comp_name': compName,
        'comp_city': compCity,
        'job_welfare': jobWelfare
      }
      console.log(jobId)
      // let userId = 1515098992797
      let userId = 1522462861029
      this.$http.post('/userInfo/updateCollect', {userId, collectJob})
      .then(res => {
        console.log(res)
      })
      this.isCollect = !this.isCollect
      this.collectMessage = this.isCollect ? '已收藏' : '收藏'
    }
  },
  mounted () {
    this.waiting = true
    let jobid = this.$route.params.jobid
    this.jobStorage(jobid)
    this.$http.get('/job/details?jobid=' + this.jobid)
    .then(res => {
       // console.log(res)
      this.jobDetails = res.data.data
      this.waiting = false
      this.handDescription()
    })
  }
}
</script>
<style scoped>
  .job-details-body {
    background: #fff;
  }
  .top-bar-wrap {
    width: 100%;
    height: 50px;
    min-width: 980px;
    background-color: #333;
  }
  .main {
    width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
  }
  .details-head-wrap {
    height: 170px;
    padding: 20px;
    background: #f2f5f4;
  }
  .details-head {
    width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .job-details-content {
    width: 720px;
    background: #fff;
  }
  .company-infor {
    width: 240px;
  }
  .company-infor h3 a {
    color: #00b38a;
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
    color: #fd5f39;
    font-size: 18px;
    margin: 15px 0 8px 0;
  }
  .main h3 {
    line-height: 50px;
    font-weight: bold;
  }
  .main p {
    line-height: 30px;
  }
  .details-head-r {
    display: flex;
    padding-top: 40px;
  }
  .details-head-r .collect {
    display: flex;
    padding-left: 27px;
    height: 44px;
    width: 104px;
    line-height: 44px;
    text-align: center;
    border: 1px solid #00b38a;
    border-radius: 3px;
    background-color: #ebf0ef;
    cursor: pointer;
    font-size: 14px;
    color: #00b38a;
  }
  .details-head-r .collected {
    padding-left: 20px;
  }
  .details-head-r .un-collect {
    padding-left: 27px;
  }
  .details-head-r .send {
    /* width: 80px; */
    text-align: center;
    margin-left: 25px;
    padding: 0 30px;
    border: 1px solid #00b38a;
    border-radius: 3px;
    height: 44px;
    line-height: 44px;
    font-size: 18px;
    background-color: #00b38a;
    color: #fff;
    cursor: pointer;
  }
  .details-head-r .send:hover {
    background-color: #00a57f;
    border-color: #00a57f;
  }
  .details-head-r .collect i {
    font-size: 22px;
  }
  .wait-img figure {
    text-align: center;
    line-height: 300px;
    display: flex;
    font-size: 22px;
  }
  .footer-wrap {
    border-top: 1px solid #ebebeb;
    width: 100%;
    min-width: 980px;
    background-color: white;
  }
</style>
