<template>
  <div class="index">
    <!-- 头部 -->
    <app-header :headerName="headerName" :isHeadShow="isHeadShow"></app-header>
    <!-- 搜索栏 -->
    <index-search></index-search>
    <!-- 轮播图 -->
    <i-swper :swiper="swiper"> </i-swper>
    <!-- 导航 -->
    <iNav :navList="navList"></iNav>
    <!-- 楼层 -->
    <div class="floor" v-for="(item1, index) of floorList" :key="index">
      <!--楼层 标题 -->
      <div class="floor-top">
        <img :src="item1.floor_title.image_src" alt="" />
      </div>
      <!-- 楼层内容 -->
      <div class="floor-title">
        <router-link
          class="title_img"
          :to="`/cateList/${item2.navigator_url.split('=')[1]}`"
          v-for="item2 of item1.product_list"
          :key="item2.name"
        >
          <img :src="item2.image_src" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from "../../components/header";
import IndexSearch from "../../components/search";
import iSwper from "./component/swiper/index";
import iNav from "./component/nav/nav";
export default {
  name: "index",
  components: { appHeader, IndexSearch, iSwper, iNav },

  Tabbarprops: {},
  data() {
    return {
      // 头部名称
      headerName: "好物 APP",
      isHeadShow: false,
      // 轮播图
      swiper: [],
      //导航
      navList: [],
      //楼层
      floorList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 获取轮播图数据
    this.axios.get("/home/swiperdata").then((result) => {
      this.swiper = result.data.message;
      // console.log(this.swiper);
    });
    // 获取导航数据
    this.axios.get("/home/catitems").then((result) => {
      this.navList = result.data.message;
      // console.log(this.navList);
    });
    // 获取楼层数据
    this.axios.get("/home/floordata").then((result) => {
      this.floorList = result.data.message;
      // console.log(result.data);
    });
  },
  methods: {},
};
</script>

<style scoped lang="less">
.floor {
  .floor-top {
    img {
      width: 100%;
    }
  }
  .floor-title {
    .title_img {
      float: left;
      width: 33.33%;
      &:nth-last-child(-n + 4) {
        //原图高度232+386
        //  232/386=33.33vw/height
        // 后4張圖片的寬度是原图一半
        height: 33.33vw * 386/232/2;
        border-left: 10px solid #fff;
      }
      &:nth-child(2),
      &:nth-child(3) {
        border-bottom: 10px solid #fff;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
