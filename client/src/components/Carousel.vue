<template id="">
  <div class="">
    <div class="carousel">
      <swiper :options="swiperOption" :autoPlay='true' :showIndicator='true' interval="2500" duration="500" ref="mySwiper">
        <!-- slides -->
        <swiper-slide><a href="javascript:;"><img src="https://www.lgstatic.com/i/image2/M00/18/CA/CgotOVn79oOAeLIqAAN8kyryYMw710.JPG"></a></swiper-slide>
        <swiper-slide><a href="javascript:;"><img src="https://www.lgstatic.com/i/image2/M00/35/3D/CgoB5lpEYnaAQZTPABAJd8HftRo467.PNG"></a></swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
    </div>
  </div>
</template>
<script type="text/javascript">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
export default {
  name: 'carrousel',
  data () {
    return {
      swiperOption: {
        // notNextTick: true,
        // autoplay: 1000,
        // pagination: '.swiper-pagination',
        // paginationType: 'progress',
        // autoplayDisableOnInteraction: false,
        // prevButton: '.swiper-button-prev',
        // nextButton: '.swiper-button-next',
        // scrollbar: '.swiper-scrollbar'
        loop: true
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style scoped>
  .carousel {
    width: 980px;
    margin: 20px auto;
  }
</style>
