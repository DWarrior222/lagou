<template id="">
  <div class="">
    <button type="button" @click="updateBaseInfo" name="button">基本信息</button>
    <form enctype="multipart/form-data" action="/api/upload/file-upload" method="post">
      <input type="file" name="thumbnail" value="">
      <input type="text" name="userId" v-model="userId">
      <input type="submit" name="" value="上传文件">
    </form>
    <a href="../assets/images/加载资源.png" download="加载资源.png">a</a>
  </div>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
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
    computed: {
      ...mapState(['userId'])
    },
    mounted () {
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
    }
  }
</script>
<style media="screen">

</style>
