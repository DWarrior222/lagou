<template>
  <div class="search-content">
    <div class="search-container">
      <form class="form">
        <div class="search-box">
          <input type="text" @click="searchPromptFlag=true" @blur="hideSearchPrompt" name="keyword" value="" autocomplete="off" placeholder="输入职位关键词">
          <input type="submit" name="submit" value="搜索">
          <input type="hidden" name="" value="" v-model="search_text">
        </div>
        <div class="search-drop-box" v-show="searchPromptFlag">
          <ul class="drop-list">
            <p style="padding: 5px 10px; color: #999">猜你要搜</p>
            <li class="drop-list-item" @mousedown="test">1</li>
            <li class="drop-list-item">2</li>
            <li class="drop-list-item">3</li>
            <li class="drop-list-item">4</li>
            <li class="drop-list-item">5</li>
            <li class="drop-list-item">6</li>
          </ul>
        </div>
        <div class="hot-search-box">
          <dl class="hot-search">
            <dt>热门搜索</dt>
            <dd>用户运营</dd>
            <dd>用户运营</dd>
            <dd>用户运营</dd>
            <dd>用户运营</dd>
            <dd>用户运营</dd>
          </dl>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        search_text: '',
        searchPromptFlag: false
      }
    },
    methods: {
      hideSearchPrompt () {
        this.searchPromptFlag = false
      },
      test () {
        console.log(1)
      }
    },
    directives: {
      focus: {
        update (el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>
  .search-content {
    width: 980px;
    margin: 0 auto;
  }
  .search-container {
    width: 700px;
    margin-left: 50%;
    transform: translateX(-50%);
    position: relative;
  }
  input[name=keyword] {
    width: 560px;
    height: 50px;
    font-size: 20px;
    float: left;
    outline-color: none;
    border-right: none;
  }
  input[name=keyword]:focus {
    border-color: #00b38a;
  }
  input[name=submit] {
    float: left;
    width: 140px;
    height: 50px;
    border: none;
    outline: none;
    background-color: #00b38a;
    float: left;
    font-size: 18px;
    color: #FFF;
    cursor: pointer;
  }
  .search-box {
    overflow: hidden;
  }
  .search-drop-box {
    width: 559px;
    position: absolute;
    top: 50px;
    left: 1px;
    background-color: white;
  }
  .search-drop-box .drop-list .drop-list-item {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    cursor: pointer;
  }
  .search-drop-box .drop-list .drop-list-item:hover {
    background-color: #00b38a;
  }
  .hot-search-box {
    margin-top: 10px;
  }
  .hot-search dt, .hot-search dd {
    display: inline-block;
  }
  .hot-search dt {
    margin-right: 10px;
    font-size: 14px;
    color: #777;
  }
  .hot-search dd {
    color: #00b38a;
    margin: 0 5px;
  }
</style>
