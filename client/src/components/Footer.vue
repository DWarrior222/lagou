<template>
  <div class="">
    <BackTop :height="100" :bottom="100">
        <div class="top">返回顶端</div>
    </BackTop>
    <div class="footer">
      <div class="wrapper">
        <div class="inner_wrapper">
          <a class="footer_app" href="https://www.lagou.com/app/download.html" rel="nofollow">拉勾APP<i class="icon_new">NEW</i></a>
          <a href="http://e.weibo.com/lagou720" target="_blank" rel="nofollow">拉勾微博</a>
          <a class="footer_wechat" href="javascript:;" rel="nofollow">拉勾微信</a>
          <a class="footer_mina" href="javascript:;" rel="nofollow">拉勾小程序</a>
          <a href="https://www.lagou.com/qa.html?t=1" target="_blank" rel="nofollow">帮助中心</a>
          <a href="https://www.lagou.com/about.html" target="_blank" rel="nofollow">联系我们</a>
          <a href="https://activity.lagou.com/activity/dist/business/index.html" target="_blank" rel="nofollow">招聘解决方案</a>
          <span class="tel">服务热线：<em>4006-2828-35 (9:00 -18:00)</em></span>
        </div>
        <div class="copyright">
          <span><em>©</em>2017 Lagou</span>
          <a target="_blank" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" rel="nofollow">京ICP备14023790号-2</a>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802024043" rel="nofollow">京公网安备 11010802024043号</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .footer {
    width: 980px;
    margin: 0 auto;
    background-color: #fff;
    height: 67px;
    position: relative;
    /*z-index: 1001;*/
  }
  .footer .inner_wrapper {
    padding-top: 12px;
    text-align: center;
    /*float: right;*/
    height: 14px;
    line-height: 14px;
    white-space: nowrap;
  }
  .footer .inner_wrapper a {
    margin-right: 12px;
    /*font-size: 14px;*/
    display: inline-block;
  }
  .footer .inner_wrapper a, .footer .inner_wrapper span.tel {
    float: left;
    color: #555;
    font-size: 14px;
    text-decoration: none;
  }
  .footer .icon_new {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 30px;
    height: 16px;
    margin-left: 3px;
    overflow: hidden;
    background: url(//static.lagou.com/www/static/common/widgets/footer_c/modules/img/app-download/new_v1_a261f5c.png) no-repeat;
    vertical-align: text-top;
    text-indent: -99em;
  }
  .footer .copyright {
    clear: both;
    height: 12px;
    margin: 0 auto;
    padding-top: 13px;
    padding-bottom: 14px;
    color: #d5d5d5;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
  }
  .top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
  .footer .copyright a {
    color: inherit;
  }
</style>
