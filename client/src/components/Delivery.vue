<template lang="html">
  <div id="delivery">
    <div class="top-bar-wrap">
      <top-bar areaflag="false"></top-bar>
    </div>
    <div class="nav-col">
      <div class="" style="margin: 0 0 30px 0">
        <h1>
          <em></em> 简历投递箱
        </h1>
      </div>
      <div class="no-collect" v-show="prompt">
        没有记录
      </div>
      <ul>
        <li v-for="(item, index) in sendList" style="background:#eee;padding: 20px; margin-bottom:20px;" >
          <Card :bordered="false">
            <div class="co_item">
              <h2 :title="item.job_name">
                <router-link tag="a" :to="{name: 'jobDetails', params: {jobid: item.job_id}}">
                  <em style="max-width: 200px;">{{item.job_name}}</em>
                  <span>( {{item.job_salary}} )</span>
                </router-link>
                <!-- <a href="javascript:;">

                </a> -->
              </h2>
              <!-- <span class="co_time">发布时间：2018-03-06 11:36</span> -->
              <div class="co_cate">{{item.comp_name}}</div>
              <!-- <span class="co_youhuo c7">{{item.job_welfare}}</span> -->
              <span class="collection_status">{{item.resume_status}}</span>
              <!-- <a href="javascript:;" class="collectionCancel collection_link collected" @click="cancelCollect($event, item.job_id)"><span class="cancel">取消收藏</span><span style="display: none;">已取消收藏</span> </a> -->
            </div>
          </Card>
        </li>
      </ul>
      <!-- <Page :total="100" show-elevator></Page> -->
    </div>
    <div class="footer-wrap">
      <v-footer></v-footer>
    </div>
  </div>

</template>

<script>

import Public from '../Public'
export default {
  data () {
    return {
      sendList: [],
      isCollect: false,
      prompt: false
    }
  },
  mixins: [Public],
  methods: {
    cancelCollect (e, jobId) {
      console.log(e.target.className)
      if (e.target.className !== 'cancel') return
      let userId = this.userId
      this.$http.post('/userInfo/updateUnCollect', {userId, jobId})
      .then(res => {
        console.log(res)
        if (res.data.state === '00000') {
          this.isCollect = false
          this.$Message.success('取消收藏成功')
          // this.isCollect = true
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'block'
        } else {
          this.$Message.error('取消收藏失败')
        }
      })
    }
  },
  mounted () {
    this.userId = localStorage.getItem('userid')
    if (!this.userId) {
      this.$router.push('/')
    }
    this.$http.post('/userInfo/getUserInfo', {userId: this.userId})
    .then(res => {
      console.log(res)
      if (res.data.state === '00000') {
        this.sendList = res.data.data.send_job
        if (this.sendList.length === 0) {
          this.prompt = true
        }
      }
      if (res.data.state === '00002') {
        this.prompt = true
      }
    })
  }
}
</script>

<style lang="scss">
 #delivery {
   .top-bar-wrap {
     width: 100%;
     height: 50px;
     min-width: 980px;
     background-color: #333;
   }
   .nav-col {
     width: 980px;
     min-height: 651px;
     margin: 100px auto;
     .no-collect {
        font-size: 18px;
        min-height: 120px;
        background: url(//www.lgstatic.com/www/static/mycenter-sidenav/modules/common/img/noresult_95_d8b37c3.png) 160px 0 no-repeat;
        padding: 60px 0 0 270px;
        margin: 80px 300px;
        line-height: 32px;
     }
   }
   .co_item {
     // width: 600px;
     h2 {
       a {
         font-size: 18px;
         color: #0d9572;
         margin: 0 0 3px;
         float: left;
         max-width: 214px;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
       }
     }
     .co_cate {
       padding-top: 10px;
       clear: both;
       color: #555;
     }
     .collection_status {
        position: absolute;
        right: 20px;
        bottom: 12px;
       font-size: 14px;
       color: #555;
       float: right;
       margin-left: 10px;
     }
     .collectionCancel {
       font-size: 14px;
       color: #019875;
       float: right;
       margin-left: 10px;
       margin-top: 4px;
       line-height: 1;
       padding-left: 10px;
       margin-left: 0;
       position: relative;
     }
   }
 }
</style>
