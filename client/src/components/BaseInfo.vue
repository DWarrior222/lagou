<template lang="html">
  <div id="baseinfo">
    <!-- <button type="button" @click="updateBaseInfo" name="button">基本信息</button> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: '',
      person_name: '关帅杰',
      sex: 1,
      age: 22,
      contact_infor: '18392703919',
      autograph: '我就是我，努力做自己',
      college_name: '宝鸡文理学院',
      intention_city: '北京',
      intention_salary: '8k'
    }
  },
  methods: {
    updateBaseInfo () {
      let baseInfo = {
        person_name: this.person_name,
        sex: this.sex,
        age: this.age,
        contact_infor: this.contact_infor,
        autograph: this.autograph,
        college_name: this.college_name,
        intention_city: this.intention_city,
        intention_salary: this.intention_salary
      }
      let userId = this.userId
      console.log(userId)
      this.$http.post('/userBaseInfo/updateBaseInfo', {baseInfo, userId})
      .then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.userId = localStorage.getItem('userid')
  }
}
</script>

<style lang="css">
</style>
