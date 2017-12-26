<template id="">
  <div class="">
    <div class="top-bar-wrap">
      <top-bar></top-bar>
    </div>
    <div class="main">
      <div class="search-wrap">
        <search></search>
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
    ...mapState(['jobList'])
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
