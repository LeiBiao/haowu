<template>
  <div class="iSwiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#EB4450">
      <van-swipe-item v-for="item of swiper" :key="item.pics_id"
        ><img :src="item.pics_sma" alt=""
      /></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "dSwiper",
  components: {},
  props: ["swiper"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    // console.log(this.swiper);
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.iSwiper {
  .my-swipe {
    /deep/.van-swipe__indicator {
      background: #646464;
    }
    .van-swipe-item {
      text-align: center;
      width: 375px;
      height: 255px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
