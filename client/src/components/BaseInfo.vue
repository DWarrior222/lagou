<template lang="html">
  <div id="baseinfo">
    <p style="margin: 20px 50px; font-size: 24px;">我的信息</p>
    <Form label-position="left" :label-width="100" style="margin-left: 100px; margin-top: 50px;">
        <FormItem label="姓名">
            <Input v-model="person_name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="年龄">
            <Input v-model="age" placeholder="Enter your age"></Input>
        </FormItem>
        <FormItem label="手机号">
            <Input v-model="contact_infor"></Input>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="sex">
            <Radio label="1">女</Radio>
            <Radio label="2">男</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="毕业学校">
            <Input v-model="college_name"></Input>
        </FormItem>
        <FormItem label="意向城市">
            <Input v-model="intention_city"></Input>
        </FormItem>
        <FormItem label="期待薪资">
            <Input v-model="intention_salary"></Input>
        </FormItem>
        <FormItem label="用一句话体现自己">
            <Input v-model="autograph" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <button type="button" @click="updateBaseInfo" name="button" style="margin: 20px 50px; font-size: 20px; text-decoration: underline;">提交信息</button>
    </Form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: '',
      person_name: '',
      sex: '1',
      age: '',
      contact_infor: '',
      autograph: '',
      college_name: '',
      intention_city: '',
      intention_salary: ''
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
    console.log(this.userId)
    this.$http.post('/userBaseInfo/getUserBaseInfo', {userId: this.userId})
    .then(res => {
      console.log(res)
      if (res.data.state === '00000') {
        let data = res.data.data
        console.log(data)
        for (var key in data) {
          this[key] = data[key]
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
