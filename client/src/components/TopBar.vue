<template id="">
  <div class="top-bar">
    <div class="tbar-logo tbar-left">
      <a href="/"><img src="../assets/images/logo_1c5763c.png" alt="logo"></a>
    </div>
    <div v-show="areaShow" class="city-select tbar-left">
      <a href="javascript:;" @click="switchCity">
        <span class="area">{{ nowCityName }}</span>
        <i>[切换城市]</i><i class="iconfont icon-coordinates"></i>
      </a>
    </div>
    <div v-show="!nickname" class="tbar-user">
      <a class="login tbar-a" @click="loginModalFlag=true">登录</a>
      <i></i>
      <a class="regis tbar-a" @click="regisModalFlag=true">注册</a>
    </div>
    <div v-show="nickname" class="tbar-user tbar-right">
      <a class="resume tbar-a">简历</a>
      <i></i>
      <a class="delivery-box tbar-a">投递箱</a>
      <i></i>
      <div class="drop-box" @mouseenter="dropMenuFlag=true" @mouseleave="dropMenuFlag=false">
        <a class="username tbar-a iconfont icon-unfold">
          {{ nickname }}
        </a>
        <div v-show="dropMenuFlag" class="user-drop-menu">
          <span class="iconfont icon-interactive">消息 <b class="msg-number">1</b></span>
          <span class="iconfont icon-undo" @click="Logout">退出</span>
        </div>
      </div>
    </div>


    <transition name="fade">
      <div class="model" v-show="loginModalFlag">
        <div class="">
          <span class="close-model iconfont icon-close" @click="loginModalFlag=false"></span>
          <h2>密码登录</h2>
          <div class="form">
            <input type="text" name="" value="" v-model="username" placeholder="请输入用户名">
            <!-- <span v-show="true">请输入有效的用户名</span> -->
            <input type="password" name="" value="" v-model="password" placeholder="请输入密码">
            <!-- <span v-show="true">账号密码不匹配</span> -->
          </div>
          <div class="btn-login" @click="Login">
            <button type="button" name="button">登录</button>
          </div>
        </div>
      </div>
    </transition>
    <div v-show="loginModalFlag" @click.self="loginModalFlag=false" class="login-model"></div>

    <transition name="fade">
      <div v-show="regisModalFlag" class="model">
        <div class="">
          <span class="close-model iconfont icon-close" @click="regisModalFlag=false"></span>
          <h2>注册账号</h2>
          <div class="form">
            <input type="text" name="" value="" v-model="username" placeholder="请输入用户名">
            <span v-show="regisErr1">{{ err1Mes }}</span>
            <input type="password" name="" value="" v-model="password" placeholder="请输入密码">
            <span v-show="regisErr2">{{ err2Mes }}</span>
          </div>
          <div class="btn-login" @click="Register">
            <button type="button" name="button" @click="Register">注册</button>
          </div>
        </div>
      </div>
    </transition>
    <div v-show="regisModalFlag" @click.self="regisModalFlag=false" class="login-model"></div>

    <transition name="fade">
      <div v-show="areaModalFlag" class="model area-model" transition="modal-scale">
        <div class="">
          <span class="close-model iconfont icon-close" @click="areaModalFlag=false"></span>
          <div id="cboxLoadedContent" style="width: 502px; overflow: hidden; height: 450px;">
            <h2>切换城市</h2>
            <div id="changeCityBox" class="popup changeCityBox">
              <div class="changeCity_header">
                <strong>亲爱的用户您好：</strong>
                <p class="tips">切换城市分站，让我们为您提供更准确的职位信息。</p>
              </div>
              <p class="checkTips">点击进入
                <a class="tab focus" :data-cityId="nowCityId" href="javascript:void(0);">{{ nowCityName }}</a>
                or 切换到以下城市
              </p>
              <ul class="clearfix">
                <li v-for="(item, index) in cityList" @click="switchCityComfirm(item)">
                  <a class="tab" @click="areaModalFlag=false" :data-cityId="item.id" href="javascript:void(0);">
                    {{ item.name }}
                  </a>
                </li>
                <li>
                  <router-link class="tab other-city" to="/citylist">其他城市</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div v-show="areaModalFlag" @click.self="areaModalFlag=false" class="login-model"></div>
  </div>
</template>

<script type="text/javascript">
  import nowCityStorage from '../store/localStorage'
  import { mapState } from 'vuex'
  // import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    data () {
      return {
        loginModalFlag: false,
        regisModalFlag: false,
        areaModalFlag: false,
        dropMenuFlag: false,
        judgeCityList: [],
        cityList: [],
        nickname: '',
        username: 'luyuan',
        password: 'shuai2121',
        regisErr1: false,
        regisErr2: false,
        err1Mes: '',
        err2Mes: '',
        areaShow: true
      }
    },
    props: [
      'areaflag'
    ],
    computed: {
      ...mapState(['nowCityName', 'nowCityId'])
    },
    methods: {
      Login () {
        let params = {
          username: this.username,
          password: this.password
        }
        this.$http.post('/users/login', params)
        .then(res => {
          console.log(res)
          this.loginModalFlag = false
          this.nickname = res.data.data.username
        })
      },
      Register () {
        let params = {
          username: this.username,
          password: this.password
        }
        this.$http.post('/users/register', params)
        .then(res => {
          switch (res.data.state) {
            case '00002':
              this.err1Mes = '用户名已被注册'
              this.regisErr1 = true
              break
            case '00000':
              this.regisErr1 = false
              this.regisModalFlag = false
              break
            default:
              break
          }
        })
      },
      Logout () {
        this.$http.post('/users/logout')
        .then(res => {
          console.log(res)
          if (res.data.state === '00000') {
            this.nickname = ''
          }
        })
      },
      switchCity () {
        let nowCityId = this.nowCityId
        // debugger
        let flag = true
        this.judgeCityList.forEach(item => {
          if (item.id === nowCityId) {
            console.log(item)
            flag = false
            if (this.$route.path !== '/citylist') {
              this.areaModalFlag = true
            }
          }
        })
        if (flag) {
          this.$router.push('citylist')
        }
      },
      switchCityComfirm (item) {
        let nowCityName = item.name
        let nowCityId = item.id
        this.$store.dispatch('switchCity', {nowCityName, nowCityId})
        nowCityStorage.save({nowCityName, nowCityId})
        this.cityInitAgain()
      },
      cityInitAgain () {
        this.$http.get('/city/getcity')
        .then(res => {
          this.cityList = (res.data.data).slice(0, 5)
          let list1 = {'id': 1, 'name': '全国'}
          this.$set(list1, 'id', 1)
          this.$set(list1, 'name', '全国')
          this.judgeCityList = (res.data.data).slice(0, 5)
          this.judgeCityList.unshift(list1)
          if (this.nowCityId === 1) return
          this.cityList.forEach((value, index) => {
            if (value.id === this.nowCityId) {
              this.cityList.splice(index, 1)
            }
          })
          this.cityList.unshift(list1)
        })
      },
      checkLogin () {
        this.$http.get('/users/checkLogin')
        .then(res => {
          if (res.data.state === '00000') {
            this.nickname = res.data.data
          }
        })
      },
      cityInit () {
        let {nowCityName, nowCityId} = nowCityStorage.fetch()
        this.$store.dispatch('switchCity', {nowCityName, nowCityId})
        this.cityInitAgain()
      }
    },
    mounted () {
      this.checkLogin()
      this.cityInit()
      console.log(this.areaflag)
      if (this.areaflag === 'false') {
        this.areaShow = false
      }
    },
    watch: {
      nowCityId: {
        handler (value1, value2) {
          this.cityInit()
        }
      }
    }
  }
</script>

<style scoped>
  .other-city {
    /* margin: 10px 35px; */
    text-decoration: underline;
  }
  .top-bar {
    width: 980px;
    height: 50px;
    margin: 0 auto;
    line-height: 50px;
    color: #ccc;
    position: relative;
    z-index: 93
  }
  .tbar-left {
    float: left;
  }
  .tbar-right {
    position: relative;
  }
  .tbar-logo {
    margin: 8px 20px 0 0;
  }
  .city-select a:hover {
    color: white;
  }
  .tbar-user {
    float: right;
    display: flex;
  }
  .tbar-user .tbar-a {
    margin: 0 20px;
    cursor: pointer;
  }
  .tbar-user .tbar-a:hover {
    color: white;
  }
  .tbar-user i {
    height: 16px;
    margin-top: 17px;
    width: 0px;
    border-left: 0.5px dotted #7b7c7d;
    border-right: 0.5px dotted #7b7c7d;
  }
  .model {
    position: absolute;
    z-index: 100;
    margin: auto;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    width: 400px;
    height: 350px;
    padding: 40px;
    background: white;
    overflow: hidden;
    line-height: normal;
  }
  .form {
    padding: 20px 0;
  }
  .form input {
    font-size: 16px;
    width: 100%;
    margin: 6px 0;
    border: none;
    border-bottom: 1px solid #ccc;
  }
  .btn-login {
    cursor: pointer;
    color: #fff;
    border-color: #00b38a;
    background-color: #00b38a;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
  }
  .login-model {
    position: fixed;
    z-index: 99;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .user-drop-menu {
    padding: 10px 0;
    width: 100px;
    position: absolute;
    top:50px;
    right: -10px;
    display: flex;
    flex-direction: column;
    background: #666;
  }
  .user-drop-menu span {
    cursor: pointer;
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  .user-drop-menu span:hover {
    background: #999;
    color: white;
  }
  .icon-unfold:before {
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .close-model {
    position: absolute;
    z-index: 10;
    right: 20px;
    top: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  .msg-number {
    padding-left: 10px;
  }
  .city-select .area {
    font-size: 20px;
  }

  .area-model {
    padding: 0px;
    width: 500px;
    height: 430px;
  }
  .area-model h2 {
    font-size: 18px;
    color: #fff;
    background: #00b38a;
    height: 44px;
    width: 100%;
    text-indent: 1em;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 44px;
  }
  #changeCityBox {
    margin-top: 30px;
    width: 100%;
    padding: 30px 40px;
  }
  .popup {
    font: 14px/22px "Hiragino Sans GB","Microsoft Yahei",SimSun,Arial;
    color: #555;
    padding: 36px 30px;
    width: 440px;
    overflow: hidden;
  }
  .changeCity_header {
    border-bottom: 1px dotted #e5e5e5;
    height: 92px;
  }
  .checkTips {
    margin: 26px 0 14px;
  }
  .clearfix {
    list-style: none;
    padding-left: 24px;
    margin: 0;
    /*display: flex;*/
  }
  .clearfix li {
    float: left;
    width: 102px;
    margin: 11px 12px
  }
  .changeCity_header strong {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
    font-weight: 400;
  }
  .changeCity_header .tips {
    font-size: 16px;
    color: #555;
    line-height: 42px;
  }
  .changeCityBox .tab:hover, .changeCityBox .tab.focus {
    border: 1px solid #00b38a;
    color: #555;
    width: 100px;
    height: 50px;
    line-height: 50px;
  }
  .changeCityBox .checkTips .tab {
    margin: 0 12px;
  }
  .changeCityBox .tab {
    font-size: 16px;
    display: inline-block;
    width: 100px;
    height: 50px;
    color: #999;
    text-align: center;
    line-height: 50px;
    border: 1px solid #dce4e6;
    border-radius: 1px;
    box-sizing: border-box;
  }
  .changeCityBox li {
    float: left;
    width: 102px;
    margin: 11px 12px;
  }
  .changeCityBox .changeCity_footer {
    color: #777;
    font-size: 14px;
    margin: 14px 0 0;
  }
  .icon-interactive:before, .icon-undo:before {
    position: absolute;
    left: 3px;
    line-height: 30px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
