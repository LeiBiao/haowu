<template>
  <div class="search">
    <!-- 头部 -->
    <app-header :headerName="headerName" :isHeadShow="isHeadShow"></app-header>
    <!-- 搜索 -->
    <form action="/">
      <van-search
        v-model="pram.query"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @input="onInput"
      />
    </form>
    <!-- 搜索结果 -->
    <van-cell-group v-for="item of searchGoods" :key="item.goods_id">
      <van-cell :title="item.goods_name" @click="toDetails(item.goods_id)" />
    </van-cell-group>
  </div>
</template>

<script>
import { Toast } from "vant";
import appHeader from "../../components/header";
export default {
  name: "search",
  components: { appHeader },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "商品详情",
      isHeadShow: true,
      // 搜索接口参数
      pram: {
        query: "",
      },
      //搜索后的数据
      searchGoods: [],
      // 定时器
      time1: -1,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onCancel() {
      this.pram.query = "";
    },
    onInput() {
      // 去空格
      this.pram.query = this.pram.query.trim();
      //防抖
      clearTimeout(this.time1);
      this.time1 = setTimeout(() => {
        this.qSearch();
      }, 1000); //延时1s
    },
    qSearch() {
      this.axios
        .get("goods/qsearch", {
          params: this.pram,
        })
        .then((result) => {
          this.searchGoods = result.data.message;
          console.log(this.searchGoods);
        });
    },
    // 跳转到详情
    toDetails(id) {
      this.$router.push(`/detalis/${id}`);
    },
  },
};
</script>

<style scoped lang="less">
.search {
  .van-cell__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>
