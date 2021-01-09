<template>
  <div class="iSearch">
    <div class="search-box" @click="onSearch">
      <van-icon name="search" />
      <span>搜索</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "isearch",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {
      this.$router.push(`/search`);
    },
  },
};
</script>

<style scoped lang="less">
.iSearch {
  width: 100%;
  height: 40px;

  background: #1cb6fe;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-box {
    width: 95%;
    height: 30px;
    border-radius: 5px;
    background: #fff;
    color: #525252;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    .van-icon-search::before {
      font-size: 16px;
    }
  }
}
</style>
