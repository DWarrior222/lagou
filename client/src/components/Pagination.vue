<template id="">
  <div class="">
    <div class="page-container">
      <button :class="{'stop-last': flag}" type="button" name="button" @click="lastPage">上一页</button>
      <button class="next" type="button" name="button" @click="nextPage">下一页</button>
      当前是第 <button type="button" name="button">{{ nowPage }}</button> 页
      <label for="page-number"> 跳转到 <input type="number" name="page-number" v-model="skipPage"> 页</label>
      <button type="button" name="button" @click="skip">确定</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapState} from 'vuex'
export default {
  data () {
    return {
      pageArray: [],
      skipPage: '',
      flag: true
    }
  },
  computed: {
    ...mapState(['nowPage'])
  },
  methods: {
    nextPage () {
      let page = this.nowPage
      page++
      if (page > 1) {
        this.flag = false
      }
       // console.log(page)
      this.$store.dispatch('increasePage', page)
    },
    lastPage () {
      let page = this.nowPage
      page = Math.max(--page, 1)
      if (page === 1) {
        this.flag = true
      } else {
        this.flag = false
      }
       // console.log(page)
      this.$store.dispatch('decreasePage', page)
    },
    skip () {
      let page = this.skipPage
      this.$store.dispatch('skip', page)
    }
  }
}
</script>

<style scoped>
  .page-container {
    width: 980px;
    margin: 0 auto;
  }
  .page-container button {
    padding: 2px 3px;
    font-size: 14px;
    background: #f6f6f6;
  }
  .page-container button:hover {
    background: #00b38a;
    color: white;
  }
  .page-container button.stop-last:hover {
    background: #f6f6f6;
    color: silver;
  }
  .page-container input[type=number] {
    text-align: center;
    padding: 0px;
    width: 32px;
    height: 30px;
  }
  .page-container .stop-last{
    color: silver!important;
    cursor: default!important;
  }
</style>
