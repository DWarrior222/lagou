<template id="">
  <div class="home-body">
    <div class="top-bar-wrap">
      <top-bar></top-bar>
    </div>
    <div class="main">
      <div class="search-wrap">
        <search></search>
      </div>
      <div class="carousel-wrap">
        <carousel></carousel>
      </div>
      <div class="job-container">
        <h2 class="title">推荐职位</h2>
        <div class="job-content">
          <div v-show="waiting" class="wait-img">
            <figure>
              <img src="../assets/images/wait.gif" alt="">
              <figcaption>正在加载数据，请等待...</figcaption>
            </figure>
          </div>
          <div class="find-fail" v-show="findFail">没找到数据</div>
          <ul class="job-list">
            <li v-for="(item, index) in jobList">
              <div class="job-content">
                <div class="job-infor">
                  <router-link tag="h3" :to="{name: 'jobDetails', params: {jobid: item[0].id}}">{{ item[0].title }}</router-link>
                  <p><i>{{ item[0].salary }}</i></p>
                </div>
              </div>
              <div class="layout-line"></div>
              <div class="company-content">
                <div class="company-infor">
                  <router-link tag="h3" :to="{name: 'companyDetails', params: {compid: item[1].id}}">{{ item[1].shortname }}</router-link>
                  <p class="address">{{item[1].address}}</p>
                  <p>
                    <i v-for="(value, idx) in item[2]">{{ value.name }}</i>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button type="button" class="nextpage" name="button" @click="nextPage">换一组</button>
      </div>
    </div>
    <div class="footer-wrap">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Public from '../Public'
  import Model from '../components/Model'
  import Search from '../components/Search'
  import Carousel from '../components/Carousel'
  import {mapState} from 'vuex'
  export default {
    mixins: [Public],
    components: {
      Model,
      Search,
      Carousel
    },
    computed: {
      ...mapState(['cityList'])
    },
    data () {
      return {
        // cityList: [],
        isShowModel: false,
        jobList: [],
        nowPage: 1,
        waiting: true,
        findFail: false
      }
    },
    methods: {
      nextPage () {
        let page = this.nowPage
        page++
        this.nowPage = page
        this.recJob()
      },
      recJob () {
        this.jobList = []
        this.waiting = true
        this.$http.get('/job/rec_job?page=' + this.nowPage)
        .then(res => {
           // console.log(res)
          this.waiting = false
          this.jobList = res.data.data
          if (!this.jobList) {
            this.waiting = false
            this.findFail = true
          }
        })
      }
    },
    mounted () {
      this.$http.get('/city/getcity')
      .then(res => {
        // this.cityList = res.data.data
        let cityList = res.data.data
        this.$store.dispatch('getCity', cityList)
      })
      this.recJob()
    }
  }
</script>
<style scoped>
  .home-body {
    background: #fff;
  }
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
  .job-container {
    width: 980px;
    margin: 20px auto;
    overflow: hidden;
  }
  .job-container .title {
    text-align: center;
    margin-bottom: 20px;
  }
  .job-content .job-list li {
    border: 1px solid #EAEEED;
    width: 225px;
    height: 180px;
    margin: 10px;
    padding: 10px;
    float: left;
  }
  .job-content h3,.company-content h3 {
    color: #00b38a;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .job-content .job-infor p i {
    padding: 0 10px;
  }
  .job-content .job-infor p i:first-child {
    padding-left: 0px;
    color: #fd5f39;
    font-size: 16px;
  }
  .layout-line {
    width: 100%;
    border: 1px dotted #ccc;
    margin: 10px 0;
  }
  .company-infor p i {
    border: 1px solid #e1f2fa;
    margin-right: 6px;
    margin-bottom: 10px;
    font-size: 12px;
    background-color: #ebf8ea;
    color: #3d9ccc;
  }
  .job-content .job-infor p {
    line-height: 35px;
  }
  .company-infor .address {
    margin: 10px 0 5px 0;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nextpage {
    margin: 20px 0;
    border: 1px solid #00B38A;
    font-size: 16px;
    color: #00b38a;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    margin-left: 50%;
    transform: translateX(-50%)
  }
  .nextpage:hover {
    color: #fff;
    background: #00b38a;
  }

  .wait-img {
    width: 980px;
    text-align: center;
  }
  .find-fail {
    text-align: center;
    line-height: 300px;
    font-weight: bold;
    color: #00b38a;
    font-size: 25px;
  }
</style>
