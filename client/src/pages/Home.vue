<template id="">
  <div class="home-body">
    <div class="top-bar-wrap">
      <top-bar></top-bar>
    </div>
    <div class="main">
      <div class="search-wrap">
        <search></search>
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in cityList">{{ item.name }} {{ item.pinyin }}</li>
    </ul>
    <div class="footer-wrap">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Public from '../Public'
  import Model from '../components/Model'
  import Search from '../components/Search'
  export default {
    mixins: [Public],
    components: {
      Model,
      Search
    },
    data () {
      return {
        cityList: [],
        isShowModel: false
      }
    },
    mounted () {
      this.$http.get('/city/getcity')
      .then(res => {
        this.cityList = res.data.data
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

</style>
