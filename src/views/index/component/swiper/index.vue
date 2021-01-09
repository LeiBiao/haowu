<template>
  <div class="iSwiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, i) of swiper" :key="i"
        ><router-link :to="`/detalis/${item.goods_id}`"
          ><img :src="item.image_src" alt="" /></router-link
      ></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "iSwiper",
  components: {},
  props: ["swiper"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.iSwiper {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    width: 100%;
    height: 170px;
    img {
      width: 100%;
    }
  }
}
</style>
