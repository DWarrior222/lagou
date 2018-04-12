<template lang="html">
  <div id="baseinfo">
    <p style="margin: 20px 50px; font-size: 24px;">我的信息</p>
    <Form label-position="left" :label-width="100" style="margin-left: 100px; margin-top: 50px;">
        <FormItem label="姓名">
            <Input v-model="userInfo.person_name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="年龄">
            <Input v-model="userInfo.age" placeholder="Enter your age"></Input>
        </FormItem>
        <FormItem label="手机号">
            <Input v-model="userInfo.contact_infor"></Input>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="userInfo.sex">
            <Radio label="male">女</Radio>
            <Radio label="female">男</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="毕业学校">
            <Input v-model="userInfo.college_name"></Input>
        </FormItem>
        <FormItem label="意向城市">
            <Input v-model="userInfo.intention_city"></Input>
        </FormItem>
        <FormItem label="期待薪资">
            <Input v-model="userInfo.intention_salary"></Input>
        </FormItem>
        <FormItem label="用一句话体现自己">
            <Input v-model="userInfo.autograph" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <button type="button" v-show="saveShow" @click="updateBaseInfo" name="button" style="margin: 20px 50px; font-size: 20px; text-decoration: underline;">提交信息</button>
    </Form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: '',
      userInfo: {
        person_name: '',
        sex: 'male',
        age: '',
        contact_infor: '',
        autograph: '',
        college_name: '',
        intention_city: '',
        intention_salary: ''
      },
      saveShow: false,
      userInfoCopy: {
        person_name: '',
        sex: '',
        age: '',
        contact_infor: '',
        autograph: '',
        college_name: '',
        intention_city: '',
        intention_salary: ''
      }
    }
  },
  watch: {
    userInfo: {
      handler (v1, v2) {
        // console.log(v1, v2)
        // console.log('test')
        for (var key in v1) {
          if (this.userInfoCopy[key] !== v1[key]) {
            // console.log(this.userInfoCopy[key], v1[key])
            this.saveShow = true
            return
          }
        }
        this.saveShow = false
      },
      deep: true
    }
  },
  methods: {
    updateBaseInfo () {
      let baseInfo = this.userInfo
      let userId = this.userId
      // console.log(userId)
      this.$http.post('/userBaseInfo/updateBaseInfo', {baseInfo, userId})
      .then(res => {
        if (res.data.state === '00000') {
          this.$Message.success('更新成功')
          let data = res.data.data
          // console.log(data)
          for (var key in this.userInfoCopy) {
            this.userInfoCopy[key] = data[key]
          }
          this.saveShow = false
        }
        // console.log(res)
      })
    }
  },
  mounted () {
    this.userId = localStorage.getItem('userid')
    // console.log(this.userId)
    this.$http.post('/userBaseInfo/getUserBaseInfo', {userId: this.userId})
    .then(res => {
      // console.log(res)
      if (res.data.state === '00000') {
        let data = res.data.data
        // console.log(data)
        for (var key in this.userInfo) {
          this.userInfo[key] = data[key]
          this.userInfoCopy[key] = data[key]
        }
      }
    })
  }
}
</script>

<style lang="css">
#baseinfo {
  width: 600px;
}
</style>
