<template>
  <div class="header">
    <van-nav-bar
      :fixed="fixedShow"
      :title="headerName"
      :left-arrow="isShow"
      @click-left="$router.back(-1)"
    />
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: ["headerName", "isHeadShow", "fixedShow"],
  data() {
    return {
      isShow: true,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.isShow = this.isHeadShow;
  },
  methods: {},
};
</script>

<style scoped lang="less">
.header {
  [class*="van-hairline"]::after {
    border: none;
  }
  /deep/.van-nav-bar__content {
    background: #1cb6fe;
    color: #fff;
    .van-ellipsis {
      color: #fff;
    }
  }
}
</style>
