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
      <div class="job_container">
        <h2 class="title">推荐职位</h2>
        <div class="job_content">

        </div>
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
        isShowModel: false
      }
    },
    mounted () {
      this.$http.get('/city/getcity')
      .then(res => {
        // this.cityList = res.data.data
        let cityList = res.data.data
        this.$store.dispatch('getCity', cityList)
      })
      this.$http.get('/job/rec_job?page=' + 1)
      .then(res => {
        console.log(res)
      })
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
  .job_container {
    width: 980px;
    margin: 0 auto;
  }
  .job_container .title {
    text-align: center;
  }
</style>
