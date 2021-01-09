<template>
  <div class="categroy">
    <!-- 头部 -->
    <app-header :headerName="headerName"></app-header>
    <!-- 搜索栏 -->
    <index-search></index-search>
    <!-- 侧边导航 -->
    <van-sidebar class="c-sidebar" v-model="activeKey" @change="onChange">
      <van-sidebar-item v-for="(item, i) of listLeft" :key="i" :title="item" />
    </van-sidebar>
    <!-- 右侧商品 -->
    <div class="right">
      <div class="right-list" v-for="item1 of listRight" :key="item1.cat_id">
        <span class="title">{{ item1.cat_name }}</span>
        <router-link
          :to="`/cateList/${item2.cat_id}`"
          class="right-item"
          v-for="item2 of item1.children"
          :key="item2.cat_id"
        >
          <img :src="item2.cat_icon" alt="" />
          <p>{{ item2.cat_name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from "../../components/header";
import IndexSearch from "../../components/search";
export default {
  name: "categroy",
  components: { appHeader, IndexSearch },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "商品分类",
      // 总数据
      cates: [],
      // 左侧菜单
      listLeft: [],
      // 右侧菜单
      listRight: [],
      // 侧边导航
      activeKey: 0,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    // 获取分类数据
    getData() {
      this.axios.get("/categories").then((result) => {
        this.cates = result.data.message;
        // 从总数据中提取,新建左侧菜单数据
        this.listLeft = this.cates.map((mes) => mes.cat_name);
        // 右侧数据
        const { children } = this.cates[this.activeKey];
        this.listRight = children;
      });
    },
    onChange(index) {
      this.activeKey = index;
      // 右侧数据
      const { children } = this.cates[this.activeKey];
      this.listRight = children;
      // console.log(this.activeKey);
    },
  },
};
</script>

<style scoped lang="less">
.categroy {
  background: #fff;
  .c-sidebar {
    float: left;
    height: 100vh;
    overflow: scroll;
  }
  .right {
    display: inline-block;
    width: 78%;
    height: 100vh;
    overflow: scroll;
    .right-list {
      font-size: 16px;
      img {
        height: 58px;
      }
      .title {
        float: left;
        width: 100%;
        height: 30px;
        display: block;
        text-align: center;
        padding: 10px 0;
        font-weight: 600;
      }
      .right-item {
        width: 33.33%;
        float: left;
        padding: 20px;

        img {
          width: 100%;
        }
        p {
          color: #000;
          font-size: 10px;
          text-align: center;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
