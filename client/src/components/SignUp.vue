<template>
    <div id="signup">
      <div class="top-bar-wrap">
        <top-bar areaflag="false"></top-bar>
      </div>


    <!-- 用户注册 -->
      <Form v-show="!updateUserInfo.update" class="signup" ref="formSignup" :model="formSignup" :rules="ruleSignup">
          <FormItem prop="username" label="用户名">
              <Input v-model="formSignup.username" name="username" placeholder="用户名"></Input>
          </FormItem>
          <FormItem prop="password" label="密码">
              <Input v-model="formSignup.password" name="password" type="password" placeholder="密码"></Input>
          </FormItem>
          <!-- <FormItem prop="email" label="邮箱">
              <Input v-model="formSignup.email" name="email" placeholder="邮箱"></Input>
          </FormItem> -->

          <FormItem class="submit">
              <Button type="primary" @click="formSignupSubmit">注册</Button>
          </FormItem>
          <FormItem class="related">
            <div>
                已有账号？
                <router-link
                  to="/signin"
                  tag="a"
                >
                登录
                </router-link>
            </div>
        </FormItem>
      </Form>
    <!-- 用户完善信息 -->
   <!--  <Form v-show="updateUserInfo.update" class="signup" ref="formUpdate" :model="formUpdate" :rules="ruleUpdate">
        <FormItem class="notice">
            <p>请完善资料后方可访问七麦数据</p>
        </FormItem>
        <FormItem v-if="updateUserInfo.realname" prop="realname" label="昵称">
            <Input v-model="formUpdate.realname" placeholder="昵称"></Input>
        </FormItem>
        <FormItem v-if="updateUserInfo.email" prop="email" label="邮箱">
            <Input v-model="formUpdate.email" placeholder="邮箱"></Input>
        </FormItem>
        <FormItem v-if="updateUserInfo.phone" prop="phone" label="手机号">
            <Input v-model="formUpdate.phone" placeholder="手机号"></Input>
        </FormItem>
        <FormItem v-show="updateUserInfo.phone" prop="phoneCode" class="phone-code" label="手机验证码">
            <Input v-model="formUpdate.phoneCode" placeholder="手机验证码">
            <Button type="primary" :disabled="sendCodeStatus.disabled" :loading="sendCodeStatus.loading" class="get-phone-code" slot="append" @click="handleSendCode('formUpdate')">{{sendCodeStatus.text}}</Button>
            </Input>
        </FormItem>
        <FormItem class="submit">
            <Button type="primary" @click="formUpdateSubmit">确定</Button>
        </FormItem>
    </Form> -->

      <Modal
          class="modal-no-footer"
          v-model="showWechatQrcode"
          title="恭喜您注册成功"
          cancel-text=""
          ok-text=""
          @on-cancel="closeWechatQrcode"
          :mask-closable="false">
      </Modal>
    </div>
</template>

<script>
// import { initGeetest } from '../libs/geetest'
import Public from '../Public'
export default {
  mixins: [Public],
  data () {
    return {
      formSignup: {
        username: '',
        password: '',
        email: ''
      },
      ruleSignup: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: this.usernameCheck, trigger: 'change' },
          { validator: this.usernameCheck, trigger: 'blur' },
          { validator: this.checkUserinfo, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: this.passwordCheck, trigger: 'change' },
          { validator: this.passwordCheck, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'change' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
          { validator: this.checkUserinfo, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: this.phoneCheck, trigger: 'change' },
          { validator: this.phoneCheck, trigger: 'blur' },
          { validator: this.checkUserinfo, trigger: 'blur' }
        ]
      },
      formUpdate: {
        realname: '',
        company: '',
        appname: '',
        email: '',
        phone: '',
        phoneCode: ''
      },
      ruleUpdate: {
        realname: [
          { required: true, message: '昵称', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '公司名称', trigger: 'blur' }
        ],
        appname: [
          { required: true, message: '应用名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空1', trigger: 'change' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'change' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
          { validator: this.checkUserinfo, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { validator: this.phoneCheck, trigger: 'change' },
          { validator: this.phoneCheck, trigger: 'blur' },
          { validator: this.checkUserinfo, trigger: 'blur' }
        ]
      },

      needPhone: true,

      // 手机号验证正则
      phoneReg: /^1[3|4|5|7|8]\d{9}$/,
      usernameReg: /^[A-Za-z0-9]{4,16}$/,
      passwdReg: /^.{6,16}$/,

      // 发送手机验证码 状态
      sendCodeStatus: {
        text: '加载中...',
        loading: true,
        disabled: true
      },
      // 极验
      geetest: null,

      interval: null,
      timeout: 60,

      updateUserInfo: {
        update: false,
        realname: true,
        company: false,
        appname: false,
        email: false,
        phone: false
      },

      showWechatQrcode: false,

      geetestType: 'formSignup'

    }
  },
  // beforeRouteEnter(to, from, next) {
  //
  //     // 进入路由前 登录检测
  //     const apiUrl = '/account/pageCheck/type/signup'
  //     axios.get(apiUrl).then((res)=>{
  //         let data = res.data
  //         next(vm => {
  //
  //             vm.phoneReg = new RegExp(data.reg_p)
  //             vm.usernameReg = new RegExp(data.reg_u)
  //             vm.passwdReg = new RegExp(data.reg_pa)
  //
  //             vm.updateUserInfo = Object.assign(vm.updateUserInfo, data.update)
  //
  //             vm.needPhone = data.need_p
  //
  //             if(data.code != 10000) return false
  //
  //             if (data.l && !data.update.update) vm.reffrrer()
  //         })
  //     }).catch((error)=>{
  //         next()
  //     })
  // },
  computed: {
      // vipShow(){
      //     return this.moment(new Date()).isAfter('2018-02-14') && this.moment(new Date()).isBefore('2018-02-22')
      // }
  },
  // mounted() {
  //     if (this.needPhone || (!this.updateUserInfo.update && !this.updateUserInfo.phone)) {
  //         // 初始化极验
  //         this.loadGeetest()
  //     }
  //
  // },
  methods: {
    noticeFaild (value) {
      this.$Message.error(value)
    },
    noticeSuccess (value) {
      this.$Message.success(value)
    },
    formSignupSubmit () {
      // 解决QQ浏览器 获取不到自动填充密码的数据
      [].forEach.call(this.$refs.formSignup.$el.querySelectorAll('input'), (item) => {
        this.formSignup[item.name] = item.value
      })

      this.$refs.formSignup.validate((valid) => {
        if (!valid) {
          this.$Message.error('用户数据验证失败!')
          return false
        }
        const apiUrl = '/users/register'
        console.log(this.formSignup)
        this.$http.post(apiUrl, this.formSignup).then((res) => {
          const data = res.data
          // 登录失败
          console.log(data)
          if (data.state === '00000') {
            this.noticeSuccess('Successful registration')
            // this.$http.post('/users/login', this.formSignin).then((res) => {
            //   // console.log(res)
            //   const data = res.data
            //
            //   this.success(data)
            // })
            this.$router.push('/signin')
          } else {
            this.noticeFaild(data.message)
          }

          // 第二步，完善用户信息
          // this.updateUserInfo.update = true
          // asynSignin()
          // if (res.data.userinfo) {
          //   this.$store.commit('updateUserInfo', res.data.userinfo)
          // }

          // if (data.type && data.type === 'signin') {
          //   this.reffrrer()
          // } else {
          //   this.showWechatQrcode = true
          // }
        })
      })
    },
    // 初始化极验
    // loadGeetest () {
    //   // 加随机数防止缓存
    //   let geetestInfoUri = '/error/geetestInfo?rand=' + Math.round(Math.random() * 100)
    //   this.$http.get(geetestInfoUri).then((res) => {
    //     let config = res.data
    //     initGeetest({
    //       gt: config.gt,
    //       challenge: config.challenge,
    //       offline: !config.success,
    //       new_captcha: config.new_captcha,
    //       product: 'bind'
    //       // width: "300px"
    //     }, this.handlerPopup)
    //   })
    // },
    // formUpdateSubmit() {        // 提交完善信息

    //     this.$refs.formUpdate.validate((valid) => {
    //         if (!valid) {
    //             this.$Message.error('用户数据验证失败!')
    //             return false
    //         }
    //         const apiUrl = '/account/signupModifyUserInfo'
    //         this.$http.post(apiUrl, this.formUpdate).then((res) => {

    //             const data = res.data
    //             // 登录失败
    //             if(data.code != 10000){

    //                 this.$Message.error({
    //                     content: data.msg,
    //                     duration: 3
    //                 })
    //                 return false
    //             }

    //             asynSignin()
    //             if (res.data.userinfo){
    //                 this.$store.commit('updateUserInfo', res.data.userinfo)
    //             }

    //             if (data.type && data.type=='signin') {
    //                 this.reffrrer()
    //             } else {
    //                 this.showWechatQrcode = true
    //             }

    //         }).catch((error)=>{
    //             this.$Message.error('网络错误，请稍后重试')
    //         })
    //     })
    // },

    // handlerPopup(captchaObj) {  // 初始化极验回调
    //
    //     this.geetest = captchaObj
    //     this.geetest.onReady(() => {
    //         this.sendCodeStatus.loading = false
    //         this.sendCodeStatus.text = '获取验证码'
    //     }).onSuccess(() => {
    //         this.sendCode()
    //     })
    // },
    handleSendCode (name) {
      // 点击发送验证码
      // if (name) this.geetestType = name
      // 极验验证
      this.geetest.verify()
    },
    // sendCode() {                // 发送验证码
    //
    //     let validate = this.geetest.getValidate()
    //     if (!validate) return
    //
    //     let apiUrl = '/account/sendPhoneCodeBySignup'
    //     let params = {}
    //     params.validate = validate
    //     params.phone = this[this.geetestType].phone
    //
    //     this.$http.post(apiUrl, params).then((res) => {
    //
    //         this.geetest.reset()
    //
    //         const data = res.data
    //         // 登录失败
    //         if(data.code != 10000){
    //             this.$Message.error({
    //                 content: data.msg,
    //                 duration: 3
    //             })
    //             return false
    //         }
    //         this.sendCodeSuccess()
    //
    //     }).catch((error)=>{
    //         this.$Message.error('网络错误，请稍后重试')
    //     })
    // },
    // sendCodeSuccess() {         // 验证码发送成功
    //     let timeout = this.timeout
    //     this.sendCodeStatus.disabled = true
    //     this.sendCodeStatus.text = '等待'+(timeout--)+'秒'
    //
    //     this.interval = setInterval(() => {
    //         if (timeout <= 0) {
    //             this.sendCodeStatus.text = '获取验证码'
    //             this.sendCodeStatus.disabled = false
    //             clearInterval(this.interval)
    //         } else {
    //             this.sendCodeStatus.text = '等待'+(timeout--)+'秒'
    //         }
    //     }, 1000)
    // },
    // reffrrer() {                // 已登录用户
    //
    //     if (document.referrer) {
    //         this.$router.go(-1)
    //     } else {
    //         this.$router.push({
    //             name: 'index',
    //             path: '/'
    //         })
    //     }
    // },
    usernameCheck (rule, value, callback) {
      // 用户名前端验证
      if (value.match(this.usernameReg)) {
        callback()
      } else {
        callback(new Error('用户名长度4-16个字符, 仅限使用英文和数字'))
      }
    },
    // phoneCheck(rule, value, callback) {     // 手机号前端验证
    //
    //     if (value.match(this.phoneReg)) {
    //         this.sendCodeStatus.disabled = false
    //         callback()
    //     } else {
    //         this.sendCodeStatus.disabled = true
    //         callback(new Error('手机号格式不符合规则'))
    //     }
    // },
    passwordCheck (rule, value, callback) {
      // 密码前端验证
      if (value.match(this.passwdReg)) {
        callback()
      } else {
        callback(new Error('密码长度6-16位，支持数字、字母、字符'))
      }
    },
    // checkUserinfo(rule, value, callback) {  // 检测用户信息
    //
    //     // callback()
    //     // return false
    //
    //     let apiUrl = '/account/userInfoCheck'
    //     let params = {}
    //
    //     params.field = rule.field
    //     params.value = value
    //
    //     this.$http.post(apiUrl, params).then((res) => {
    //
    //         const data = res.data
    //         if (data.code == 10000) {
    //             callback()
    //         }else if(data.code == 10104){
    //             callback(new Error(data.msg))
    //         }
    //
    //         // return callback(new Error(data.msg))
    //
    //     }).catch((error)=>{
    //         this.$Message.error('网络错误，请稍后重试')
    //     })
    // },
    closeWechatQrcode () {
        // this.reffrrer()
    }
  }
}
</script>

<style lang="scss">

@import './../assets/css/common.scss';

.signup {
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

        .ivu-input-icon-validate {
            top: 7px;
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

        &.notice {
            margin-top: -10px;

            .ivu-form-item-content {
                text-align: center;
                font-size: 18px;
            }
        }

        &.phone-code {
            margin-bottom: 55px;

            .ivu-input-group-append {
                padding: 0;
                overflow: hidden;

                .ivu-btn {
                    cursor: pointer;
                    padding: 0;
                    width: 105px;
                    height: 46px;
                    color: #fff;
                    background-color: $font-link-color;
                    border-color: $font-link-color;

                    &[disabled] {
                        color: #c3cbd6;
                        background-color: #f7f7f7;
                        border-color: #d7dde4;
                    }
                }
            }
        }

        &.submit {
            margin-bottom: 25px;

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

        &.related {
            .ivu-form-item-content {
                font-size: 14px;
                text-align: center;

            }
        }

    }
}
#signup{
  .signup {
    margin-top: 150px;
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
