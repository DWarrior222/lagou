<template>
  <div id="signin">
    <div class="top-bar-wrap">
      <top-bar areaflag="false"></top-bar>
    </div>
    <div class="signin-box">
      <Form class="signin" ref="formSignin" :model="formSignin" :rules="ruleSignin">
          <FormItem prop="username" label="邮箱/手机号">
              <Input v-model="formSignin.username" name="username" placeholder="可直接使用ASO100账号登录"></Input>
          </FormItem>
          <FormItem prop="password" label="密码">
              <Input v-model="formSignin.password" name="password" type="password" placeholder="密码"></Input>
          </FormItem>
          <FormItem prop="code" v-if="needCode" class="code" label="验证码">
              <Input v-model="formSignin.code" name="code" placeholder="验证码">
                  <img :src="verifyCodeUrl" @click="refreshCode" slot="append">
              </Input>
          </FormItem>
          <FormItem class="related">
              <div>
                  沒有账号？
                  <router-link
                    to="/account/signup"
                    tag="a">
                  注册
                  </router-link>
              </div>
              <div class="forget">
                  <router-link
                    to="/account/findPwd"
                    target="_blank"
                    tag="a">
                  忘记密码？
                  </router-link>
              </div>
          </FormItem>

          <FormItem class="submit">
              <Button type="primary" @click="handleSubmit('formSignin')">登录</Button>
          </FormItem>

          <Modal
              class="modal-no-footer"
              v-model="showActive"
              title="恭喜您登录成功"
              cancel-text=""
              ok-text=""
              @on-cancel="closeActive"
              :mask-closable="false">
              <div class="subscribe-popup">
                  <div class="subscribe-box">
                      <p>您已获得&nbsp;<span>一个月VIP特权</span></p>
                      <p>解锁ASO100全部VIP功能</p>
                      <p>但仅限七麦数据网站使用</p>
                      <p>快去体验高阶数据服务吧！</p>
                      <Button style="margin-top: 30px; padding: 6px 25px; font-size: 14px;" type="primary" @click="closeActive()">立即体验</Button>

                  </div>
              </div>
          </Modal>
      </Form>
    </div>
  </div>
</template>

<script>

import Public from '../Public'

export default {
    mixins: [Public],
    data() {
        return {
            formSignin: {
                username: '',
                password: '',
            },
            ruleSignin: {
                username: [
                    { required: true, message: '邮箱/手机号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            needCode: false,
            timestamp: +new Date,

            showActive: false,

            showWechatQrcode: false,
            loadingQrcode: true,
            qrcodeUri: '',

            interval: null,

            noBindWechat: false,     // 账号是否绑定过微信
        }
    },
    // computed: {
    //     verifyCodeUrl: function() {
    //         return this.apiURI + '/account/getVerifyCodeImage?' + this.timestamp;
    //     }
    // },
    // created() {
    //     if (!this.$isServer) {
    //         const apiUrl = '/account/pageCheck/type/signin';
    //         this.$http.get(apiUrl).then((res)=>{
    //             let data = res.data;
    //             if(data.code != 10000) this.$Message.error(data.msg);
    //
    //             if (data.l) this.success();
    //             this.needCode = data.n;
    //
    //         }).catch((error)=>{
    //             // next()
    //         })
    //     }
    // },
    // mounted() {
    //     on(document, 'keyup', this.keyup);
    // },
    // beforeDestroy () {
    //     off(document, 'keyup', this.keyup);
    // },
    methods: {
        // keyup(e) {
        //     if (e.keyCode == 13) {
        //         this.handleSubmit('formSignin');
        //     }
        // },
        // handleSubmit(name) {        // 提交登录信息
        //
        //     // 解决QQ浏览器 获取不到自动填充密码的数据
        //     [].forEach.call(this.$refs[name].$el.querySelectorAll('input'), (item) => {
        //         this.formSignin[item.name] = item.value
        //     })
        //
        //     this.$refs[name].validate((valid) => {
        //         if (!valid) {
        //             // this.$Message.error('用户数据验证失败!');
        //             return false
        //         }
        //
        //         const apiUrl = '/account/signinForm';
        //         this.$http.post(apiUrl, this.formSignin).then((res) => {
        //
        //             const data = res.data;
        //
        //             // TODO 显示二维码
        //
        //             // 登录失败
        //             if(data.code != 10000){
        //
        //                 if (data.code == 10106) {
        //                     this.$router.push({
        //                         path: '/account/signup'
        //                     });
        //                 } else {
        //
        //                     if (this.needCode) {
        //                         // 此次提交前用户需要输入验证码
        //                         this.refreshCode();
        //                     } else {
        //                         // 此次提交前用户不需要输入验证码
        //                         // 但是这次需要了
        //                         if (data.needcode) {
        //                             this.needCode = data.needcode;
        //                             return this.refreshCode();
        //                         }
        //                     }
        //
        //                     this.$Message.error({
        //                         content: data.msg,
        //                         duration: 3
        //                     });
        //                 }
        //                 return false;
        //             }
        //
        //             // 论坛登录
        //             asynSignin();
        //
        //             if (data.userinfo)
        //                 this.$store.commit('updateUserInfo', data.userinfo);
        //
        //             this.success(data.msg);
        //
        //         }).catch((error)=>{
        //             this.$Message.error('网络错误，请稍后重试');
        //         });
        //
        //     })
        // },
        // closeActive() {
        //
        //     let path = this.$route.query.r ? this.$route.query.r : '/';
        //     //登陆注册等页面跳转首页，个人中心可以跳转
        //     if (path.indexOf('/account/') !== -1 && path.indexOf('/account/setting/') < 0) path = '/';
        //
        //     // console.log(path);
        //     this.$router.push({
        //         path: path
        //     });
        // },
        // success(msg) {              // 登录成功
        //
        //     if (getCookie('activityVip')) {
        //         delCookie('activityVip');
        //         this.showActive = true;
        //     } else {
        //
        //         msg && this.$Message.success(msg);
        //
        //         let path = this.$route.query.r ? this.$route.query.r : '/';
        //         //登陆注册等页面跳转首页，个人中心可以跳转
        //         if (path.indexOf('/account/') !== -1 && path.indexOf('/account/setting/') < 0) path = '/';
        //
        //         // console.log(path);
        //         if (path.indexOf('https://') !== -1){
        //             window.location.href = path;
        //         }else{
        //             this.$router.push({
        //                 path: path
        //             });
        //         }
        //     }
        // },
        // refreshCode() {             // 点击刷新二维码
        //     this.timestamp = +new Date;
        // },
        // getWechatQrcode() {         // 获取微信登录二维码
        //     let apiUrl = '/account/getWechatLoginQrcode'
        //
        //     if (this.showWechatQrcode) return false;
        //
        //     this.showWechatQrcode = true;
        //     this.loadingQrcode = true;
        //
        //     this.$http.get(apiUrl).then((res)=>{
        //         this.loadingQrcode = false;
        //         let data = res.data;
        //         // 登录失败
        //         if(data.code != 10000){
        //             this.$Message.error({
        //                 content: data.msg,
        //                 duration: 3
        //             });
        //             return false;
        //         }
        //
        //         this.qrcodeUri = data.imgsrc;
        //
        //         this.checkWechatLogin();
        //
        //     }).catch((error)=>{
        //         this.$Message.error('网络错误，请稍后重试');
        //     })
        // },
        // closeWechatQrcode() {       // 关闭二维码弹框
        //     // console.log('close');
        //     clearInterval(this.interval);
        // },
        // checkWechatLogin() {        // 检测是否扫描微信
        //
        //     let checkTimes = 0;
        //     let apiUrl = '/account/checkLogingetOpenId';
        //
        //     this.interval = setInterval(() =>{
        //         if (checkTimes++ >= 100) clearInterval(this.interval);
        //
        //         this.$http.get(apiUrl).then((res)=>{
        //             let data = res.data;
        //
        //             if (data.code != 10107) {
        //
        //                 this.showWechatQrcode = false;
        //                 clearInterval(this.interval);
        //             }
        //
        //             // 用户扫码登录了
        //             if(data.code == 10000){
        //
        //                 // 论坛登录
        //                 asynSignin();
        //
        //                 if (data.userinfo)
        //                     this.$store.commit('updateUserInfo', data.userinfo);
        //
        //                 this.success(data.msg);
        //             } else if (data.code == 10130) {
        //
        //                 this.noBindWechatModal();
        //             }
        //
        //         }).catch((error)=>{
        //
        //             this.$Message.error('网络错误，请稍后重试');
        //         })
        //
        //     }, 1500);
        // },
        // noBindWechatModal() {
        //     this.$Modal.info({
        //         title: '',
        //         render: (h)=> {
        //             return h('div', {
        //                 class: {
        //                     'notice-popup': true
        //                 }
        //             }, [
        //                 h('div', {
        //                     class: 'notice-bind-wechat'
        //                 }, [
        //                     h('p', '该微信号没有绑定七麦数据账号，'),
        //                     h('p', '您可以选择绑定一个已有账号或者创建一个新账号。'),
        //                     h('Button', {
        //                         props: {
        //                             type: 'primary'
        //                         },
        //                         domProps: {
        //                             innerHTML: '绑定已有账号'
        //                         },
        //                         on: {
        //                             click: () => {
        //                                 this.noBindWechatHandle('wechatBindAccount')
        //                             }
        //                         }
        //                     }),
        //                     h('Button', {
        //                         props: {
        //                             type: 'primary'
        //                         },
        //                         domProps: {
        //                             innerHTML: '创建新账号'
        //                         },
        //                         on: {
        //                             click: () => {
        //                                 this.noBindWechatHandle('signup')
        //                             }
        //                         }
        //                     })
        //                 ])
        //             ]);
        //         },
        //         okText: '关闭',
        //     })
        // },
        // noBindWechatHandle(type) {
        //
        //     this.$Modal.remove()
        //
        //     this.$router.push({
        //         // name: 'index',
        //         path: '/account/'+type
        //     });
        // },
    },
    components:{

    }
}
</script>

<style lang="scss">

@import './../assets/css/common.scss';

.signin {
    width: 512px;
    margin: 0 auto;
    border: 1px solid #dde5ee;
    padding: 32px 40px;
    background: #fff;

    .ivu-form-item {

        margin-bottom: 20px;

        .ivu-form-item-label {
            font-size: 14px;
            line-height: 1.5;
            padding: 0 0 10px;

            &:before {
                display: none;
            }
        }

        .ivu-input {
            height: 46px;
            border: 1px solid #e6e6e6;
            background-color: #f5f5f5;
            font-size: 14px;

            &:focus {
                border-color: #33c2a1;
                outline: 0;
                box-shadow: 0 0 3px 2px rgba(0, 179, 138, 0.2);
            }
        }
        &.ivu-form-item-error {
            .ivu-input {
                border-color: #ff3300;
                &:focus {
                    border-color: #ff3300;
                    outline: 0;
                    box-shadow: 0 0 3px 2px rgba(255, 51, 0, 0.2);
                }
            }
        }

        &.code {
            .ivu-input-group-append {
                padding: 0;
                overflow: hidden;

                img {
                    cursor: pointer;
                    display: block;
                    width: 80px;
                    height: 44px;
                }
            }
        }

        &.related {
            margin-bottom: 24px;

            .ivu-form-item-content {
                @include clearfix;
                font-size: 12px;
                line-height: 1.5;
                >div {
                    float: left;
                }

                .forget {
                    float: right;
                }
            }
        }

        &.submit {
            .ivu-form-item-content {
                text-align: center;

                .ivu-btn {
                    padding: 0;
                    height: 41px;
                    width: 196px;
                    font-size: 16px;
                }
            }
        }

        &.divider {
            margin-bottom: 17px;

            .ivu-form-item-content {
                font-size: 12px;
                line-height: 1.5;
                >div {
                    width: 196px;
                    margin: 0 auto;
                    text-align: center;
                    position: relative;

                    &:before,
                    &:after {
                        content: '';
                        display: block;
                        top: 9px;
                        position: absolute;
                        width: 74px;
                        height: 1px;
                        background-color: #c3cbd6;
                    }
                    &:before {
                        left: 0;
                    }
                    &:after {
                        right: 0;
                    }

                }
            }
        }

        &.wechat {

            .ivu-form-item-content {

                font-size: 12px;
                line-height: 1.5;
                text-align: center;

                > div {
                    width: 48px;
                    margin: 0 auto;
                }
                .iconfont {
                    width: 34px;
                    height: 34px;
                    line-height: 34px;
                    color: #fff;
                    font-size: 24px;
                    background-color: $font-link-color;
                    border-radius: 100%;
                    display: block;
                    margin: 0 auto;
                    margin-bottom: 4px;
                }
            }
        }
    }
}

#signin {

  .signin-box {
    .signin {
      margin-top: 200px;
    }
  }
}

</style>
<style media="screen" scoped>
.top-bar-wrap {
  width: 100%;
  height: 50px;
  min-width: 980px;
  background-color: #333;
}
.footer-wrap {
  border-top: 1px solid #ebebeb;
  width: 100%;
  min-width: 980px;
  background-color: white;
}
</style>
