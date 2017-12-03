<template id="">
  <div>
    <div class="top-bar-wrap">
      <top-bar></top-bar>
    </div>
    <ul>
      <li v-for="(item, index) in cityList">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script type="text/javascript">
  import Public from '../Public'
  import Model from '../components/Model'
  export default {
    mixins: [Public],
    components: {
      Model
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
  .top-bar-wrap {
    width: 100%;
    height: 50px;
    min-width: 980px;
    background-color: #333;
  }
  
</style>
