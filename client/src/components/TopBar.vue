<template id="">
  <div class="top-bar">
    <div class="tbar-logo tbar-left">
      <a href="javascript:;"><img src="../assets/images/logo_1c5763c.png" alt="logo"></a>
    </div>
    <div class="city-select tbar-left">
      <a href="javascript:;">
        <span class="area">全国</span>
        <i>[切换城市]</i>
      </a>
    </div>
    <div v-show="!nickname" class="tbar-user tbar-right">
      <a class="login tbar-a" @click="loginModalFlag=true">登录</a>
      <i></i>
      <a class="regis tbar-a" @click="regisModalFlag=true">注册</a>
    </div>
    <div v-show="nickname" class="tbar-user tbar-right">
      <a class="resume tbar-a">简历</a>
      <i></i>
      <a class="delivery-box tbar-a">投递箱</a>
      <i></i>
      <a class="username tbar-a">{{ nickname }}</a>
    </div>

    <div class="model" v-show="loginModalFlag">
      <div class="">
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
    <div v-show="loginModalFlag" @click.self="loginModalFlag=false" class="login-model"></div>

    <div v-show="regisModalFlag" class="model">
      <div class="">
        <h2>注册账号</h2>
        <div class="form">
          <input type="text" name="" value="" v-model="username" placeholder="请输入用户名">
          <!-- <span v-show="true">请输入有效的用户名</span> -->
          <input type="password" name="" value="" v-model="password" placeholder="请输入密码">
          <!-- <span v-show="true">账号密码不匹配</span> -->
        </div>
        <div class="btn-login" @click="Register">
          <button type="button" name="button">注册</button>
        </div>
      </div>
    </div>
    <div v-show="regisModalFlag" @click.self="regisModalFlag=false" class="login-model"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        loginModalFlag: false,
        regisModalFlag: false,
        nickname: '',
        username: 'asdfghjkl',
        password: 'shuai2121'
      }
    },
    methods: {
      Login () {
        let params = {
          username: this.username,
          password: this.password
        }
        console.log(params)
        this.$http.post('/users/login', params)
        .then(res => {
          console.log(res)
          this.loginModalFlag = false
          this.nickname = res.data.result.username
        })
      },
      Register () {
      }
    }
  }
</script>

<style scoped>
  .top-bar {
    width: 980px;
    height: 50px;
    margin: 0 auto;
    line-height: 50px;
    color: #ccc;
  }
  .tbar-left {
    float: left;
  }
  .tbar-right {
    float: right
  }
  .tbar-logo {
    margin: 8px 20px 0 0;
  }
  .city-select a:hover {
    color: white;
  }
  .tbar-user {
    display: flex;
  }
  .tbar-user .tbar-a {
    margin: 0 10px;
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
</style>
