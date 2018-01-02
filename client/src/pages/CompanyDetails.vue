<template id="">
  <div class="">
    CompanyDetails
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.$route.params)
    let compid = this.$route.params.compid
    console.log(compid)
    this.$http.get('/comp/details?compid=' + compid)
    .then(res => {
      console.log(res)
    })
  }
}
</script>
<style scoped>

</style>
