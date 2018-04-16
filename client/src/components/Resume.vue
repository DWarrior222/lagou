<template lang="html">
  <div id="resume">
    <div style="margin-left: 20px;" class="my-resume">
      <!-- 我的简历：<a :href="href" :download="resumeName">{{ resumeName }}</a> -->
      我的简历：<a href="javascript:;" @click="download">{{ resumeName }}</a>
      <i v-if="!resumeName">没有简历请上传</i>
      <a href="javascript:;" @click="clearResume">
         <Icon v-if="!!resumeName" type="close" size="18" style="color: #3399ff; cursor: pointer;"></Icon>
      </a>
    </div>
    <form enctype="multipart/form-data" action="/api/upload/file-upload" method="post">
      <input id="file" ref="File" type="file" name="thumbnail" @change="handleUpload($event)" value="">
      <input type="text" name="userId" v-model="userId">
      <input id="submit" type="button" name="" value="上传文件">
    </form>
    <label v-if="!resumeName" class="file-label" for="file">
      <div class="file-model" style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击上传简历</p>
      </div>
      <div style="text-align: center;" v-if="file !== null && !resumeName">Upload file: {{ file.name }}</div>

      <label class="submit-label" v-if="file !== null" for="submit">
        <Button style="margin: 20px 150px; width: 240px;" type="primary" :loading="loading" v-if="file !== null" icon="checkmark-round" @click="submitForm">
          <span v-if="!loading">上传简历</span>
          <span v-else>Loading...</span>
        </Button>
      </label>
    </label>

  </div>
</template>

<script>
export default {
  data () {
    return {
      file: null,
      loadingStatus: false,
      resumeName: '',
      href: '',
      userId: '',
      loading: false
    }
  },
  updated () {

  },
  methods: {
    handleUpload (e) {
      this.file = e.target.files[0]
      if (this.file.name.search(/(.docx)|(.doc)|(.pdf)/g) !== -1) {
        this.$Message.success('简历可上传')
      } else {
        this.$Message.error('类型不正确')
        this.file = null
      }
    },
    submitForm () {
      this.loading = true
      let file = document.querySelector('#file')
      let formData = new FormData()
      formData.append('test-upload', file.files[0])
      this.$http.post('/upload?userId=' + this.userId, formData)
      .then(res => {
        // console.log(res)
        if (res.data.state === '00000') {
          this.resumeName = res.data.data.resume
          this.$Message.success('简历上传成功')
          this.loading = false
        }
      })
    },
    clearResume () {
      this.$http.post('/userInfo/updateResume', {userId: this.userId})
      .then(res => {
        // console.log(res)
        if (res.data.state === '00000') {
          this.resumeName = ''
          this.file = null
        }
      })
    },
    download () {
      let URL = '../../client/src/assets/resume/'
      this.$http.get('/userInfo/downloadSingle?dir=' + URL + '&name=' + this.resumeName)
      .then(res => {
        console.log(res)
        // if (res.data.state === '00000') {
        //   this.resumeName = ''
        //   this.file = null
        // }
      })
    }
  },
  mounted () {
    this.userId = localStorage.getItem('userid')
    console.log(this.userId)
    this.$http.post('/userInfo/getUserInfo', {userId: this.userId})
    .then(res => {
      // console.log(res)
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
    margin: 20px 50px;
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
