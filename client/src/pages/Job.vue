<template id="">
  <div class="">
    <div class="top-bar-wrap">
      <top-bar></top-bar>
    </div>
    <div class="main">
      <div class="search-wrap">
        <search></search>
      </div>
      <div class="filter-wrap">
        <div class="work-place">
          <dl class="">
            <dt>工作地点：</dt>
            <dd>全国</dd>
            <dd>北京</dd>
            <dd>上海</dd>
            <dd>深圳</dd>
            <dd>成都</dd>
            <dd>杭州</dd>
            <dd>西安</dd>
          </dl>
        </div>
        <div class="work-experience">
          <dl class="">
            <dt>工作经验</dt>
            <dd>不限</dd>
            <dd>应届毕业生</dd>
            <dd>3年及以下</dd>
            <dd>3-5年</dd>
            <dd>5-10年</dd>
            <dd>10年以上</dd>
            <dd>不要求</dd>
          </dl>
        </div>
        <div class="education">

        </div>
        <div class="fund-profile">

        </div>
        <div class="industry">

        </div>
      </div>
      <div class="job-wrap">
        <ul>
          <li v-for="(item, index) in jobList">
            <span>{{ item[0].title }}</span>
            <span>{{ item[1].fullname }}</span>
          </li>
        </ul>
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
import { mapState } from 'vuex'
export default {
  mixins: [Public],
  components: {
    Model,
    Search
  },
  computed: {
    ...mapState(['jobList', 'nowCityId'])
  },
  data () {
    return {
      cityList: [],
      isShowModel: false
    }
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
</style>
