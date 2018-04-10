<template id="">
  <div id="user">
    <div class="top-bar-wrap">
      <top-bar areaflag="false"></top-bar>
    </div>
    <div class="nav-col">
      <Menu @on-select="select" active-name="1">
          <!-- <MenuGroup title=""> -->
          <MenuItem name="baseinfo" :class="{'ivu-menu-item-active ivu-menu-item-selected': initselect}">
              <Icon type="document-text"></Icon>
              我的信息
          </MenuItem>
          <MenuItem name="change-password">
              <Icon type="chatbubbles"></Icon>
              修改密码
          </MenuItem>
          <MenuItem name="my-resume">
              <Icon type="heart"></Icon>
              我的简历
          </MenuItem>
              <!-- <MenuItem name="4">
                  <Icon type="heart-broken"></Icon>
                  流失用户
              </MenuItem> -->
          <!-- </MenuGroup> -->

      </Menu>
      <div class="content">
        <baseInfo v-if="selectName === 'baseinfo' || selectName === ''"></baseInfo>
        <resume :userId="userId" v-if="selectName === 'my-resume'"></resume>
        <changePassword v-if="selectName === 'change-password'"></changePassword>
      </div>
      <!-- <br>
      <p>Change theme</p>
      <RadioGroup v-model="theme3">
          <Radio label="light"></Radio>
          <Radio label="dark"></Radio>
      </RadioGroup> -->
    </div>

    <!-- <form enctype="multipart/form-data" action="/api/upload/file-upload" method="post">
      <input type="file" name="thumbnail" value="">
      <input type="text" name="userId" v-model="userId">
      <input type="submit" name="" value="上传文件">
    </form> -->
    <!-- <a href="../assets/images/加载资源.png" download="加载资源.png">a</a> -->

    <div class="footer-wrap">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script type="text/javascript">
  import baseInfo from '../components/BaseInfo'
  import resume from '../components/Resume'
  import changePassword from '../components/ChangePassword'
  // import { mapState } from 'vuex'
  import Public from '../Public'

  export default {
    mixins: [Public],
    data () {
      return {
        userId: '',
        initselect: true,
        selectName: '',
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
    components: {
      baseInfo,
      resume,
      changePassword
    },
    computed: {
      // ...mapState(['userId'])
    },
    mounted () {
      this.userId = parseInt(localStorage.getItem('userid'))
    },
    methods: {
      select (name) {
        console.log(name)
        this.initselect = false
        this.selectName = name
        if (name === 'baseinfo') {

        }
      },
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
<style lang="scss">
 #user {
   .top-bar-wrap {
     width: 100%;
     height: 50px;
     min-width: 980px;
     background-color: #333;
   }
   .nav-col {
     width: 980px;
     margin: 100px auto;
     display: flex;
   }
 }
</style>
