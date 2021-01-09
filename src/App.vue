<template>
  <div id="app">
    <!-- 底部 -->
    <app-tabbar v-if="tabberShow"></app-tabbar>
    <keep-alive :include="cachePage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import appTabbar from "./components/tabbar";
import { mapState } from "vuex";
export default {
  name: "",
  components: { appTabbar },
  props: {},
  data() {
    return {
      tabberShow: true,
      goods_id: "",
    };
  },
  computed: {
    ...mapState(["cachePage"]),
  },

  watch: {
    $route(to, from) {
      this.goods_id = this.$route.params.goods_id;
      if (
        this.$route.path === `/detalis/${this.goods_id}` ||
        this.$route.path === "/shopcar" ||
        this.$route.path === "/login" ||
        this.$route.path === "/edit" ||
        this.$route.path === "/robot"
      ) {
        this.tabberShow = false;
      } else {
        this.tabberShow = true;
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="scss">
</style>
