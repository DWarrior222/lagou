<template id="">
  <div id="carousel">
    <div class="carousel">
      <Carousel v-model="carouselShow" loop>
        <CarouselItem>
            <div class="demo-carousel"><a href="https://activity.lagou.com/topic/xinmei0326.html"><img src="https://www.lgstatic.com/i/image3/M00/43/0E/CgpOIFq3hCCAF5lGAAOgLuMRliw558.PNG"></a></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><a href="https://activity.lagou.com/topic/travelmeaning.html"><img src="https://www.lgstatic.com/i/image2/M00/35/3D/CgoB5lpEYnaAQZTPABAJd8HftRo467.PNG"></a></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><a href="https://www.lagou.com/gongsi/120539.html"><img src="https://www.lgstatic.com/i/image3/M00/39/C3/CgpOIFqrbmeAL1VZAAYMqww9zfs542.JPG"></a></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><a href="https://activity.lagou.com/topic/51xinyongka.html"><img src="https://www.lgstatic.com/i/image3/M00/3F/B1/Cgq2xlqyPOOAJ5xyAASzifAkNh8439.PNG"></a></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><a href="https://activity.lagou.com/activity/dist/speedEntry/pc/index2.html?num=27"><img src="https://www.lgstatic.com/i/image3/M00/41/CD/CgpOIFq0pwuANoXuAAUG7z1pAMI975.PNG"></a></div>
        </CarouselItem>
    </Carousel>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'carrousel',
  data () {
    return {
      carouselShow: 0,
      setting: {
        // autoplay: false,
        // autoplaySpeed: 2000,
        // dots: 'inside',
        // radiusDot: false,
        // trigger: 'click',
        arrow: 'never'
      }
    }
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
<style>
  #carousel .ivu-carousel-dots {
    bottom: 20px;
  }
  #carousel .ivu-carousel-dots li button {
    background: #fff;
  }
</style>
