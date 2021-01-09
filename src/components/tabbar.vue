<template>
  <div class="tabbar">
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="search">分类</van-tabbar-item>
      <van-tabbar-item to="/shopcar" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/my" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
