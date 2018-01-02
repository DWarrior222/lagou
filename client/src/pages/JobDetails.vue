<template id="">
  <div class="">
    JobDetails
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    // console.log(this.$route.params)
    let jobid = this.$route.params.jobid
    console.log(jobid)
    this.$http.get('/job/details?jobid=' + jobid)
    .then(res => {
      console.log(res)
    })
  }
}
</script>
<style scoped>

</style>
