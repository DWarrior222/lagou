<template lang="html">
  <div id="resume">
    <div style="margin-left: 20px;" class="my-resume">
      我的简历：<a :href="href" :download="resumeName">{{ resumeName }}</a>
      <i v-if="!resumeName">没有简历请上传</i>
      <a href="javascript:;" @click="clearResume">
         <Icon v-if="!!resumeName" type="close" size="18" style="color: #3399ff; cursor: pointer;"></Icon>
      </a>
    </div>
    <form enctype="multipart/form-data" action="/api/upload/file-upload" method="post">
      <input id="file" type="file" name="thumbnail" @change="handleUpload($event)" value="">
      <input type="text" name="userId" v-model="userId">
      <input id="submit" type="submit" name="" value="上传文件">
    </form>
    <label v-if="!resumeName" class="file-label" for="file">
      <div class="file-model" style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击上传简历</p>
      </div>
      <label class="submit-label" v-if="file !== null" for="submit">上传文件</label>
    </label>

    <div v-if="file !== null">Upload file: {{ file.name }}</div>
  </div>
</template>

<script>
export default {
  props: [
    'userId'
  ],
  data () {
    return {
      file: null,
      loadingStatus: false,
      resumeName: '',
      href: ''
    }
  },
  updated () {
    // document.querySelector('.ivu-upload-drag .ivu-upload-input').setAttribute('name', 'thumbnail')
  },
  methods: {
    handleUpload (e) {
      this.file = e.target.files[0]
      console.log(this.file)
    },
    // submitForm () {
    //   this.$http.post('/upload/file-upload', {userId: this.userId, thumbnail: this.file})
    //   .then(res => {
    //     console.log(res)
    //     if (res.data.state === '00000') {
    //       this.resumeName = ''
    //     }
    //   })
    // },
    clearResume () {
      console.log('test')
      this.$http.post('/userInfo/updateResume', {userId: this.userId})
      .then(res => {
        console.log(res)
        if (res.data.state === '00000') {
          this.resumeName = ''
        }
      })
    }
  },
  mounted () {
    console.log(this.userId)
    this.$http.post('/userInfo/getUserInfo', {userId: this.userId})
    .then(res => {
      console.log(res)
      if (res.data.state === '00000') {
        this.resumeName = res.data.data.resume
        this.href = '../assets/resume/' + this.resumeName
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  /* .ivu-upload-drag .ivu-upload-input {

  } */
  #resume {
    .my-resume {
      font-size: 16px;
      line-height: 25px;
    }
    form {
      display: none;
      #file {
        // visibility: hidden;
        display: none;
      }
      input[name='userId'] {
        // visibility: hidden;
        display: none;
      }
    }
    #submit {
      display: none;
    }
    label {
      width: 200px;
      .file-model {
        width: 500px;
        margin: 20px;
        text-align: center;
        cursor: pointer;
        border: 1px dashed #dddee1;
        &:hover {
          border: 1px dashed #2d8cf0;
        }
      }
    }
  }
</style>
