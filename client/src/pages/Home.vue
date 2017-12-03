<template id="">
  <div class="">
    <top-bar></top-bar>
    <ul>
      <li v-for="(item, index) in cityList">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script type="text/javascript">
  import Public from '../Public'
  export default {
    mixins: [Public],
    data () {
      return {
        cityList: []
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
