<template>
  <div class="cateList">
    <!-- 头部 -->
    <app-header :headerName="headerName"></app-header>
    <!-- 搜索栏 -->
    <index-search></index-search>
    <!-- tab -->
    <van-tabs v-model="active" @click="tabSelect(active)">
      <van-tab title="综合">
        <!-- 列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="fistLoda"
        >
          <van-cell class="item" v-for="item of list" :key="item.goods_id">
            <div @click="toDetails(item.goods_id)">
              <div class="lItem">
                <img
                  :src="
                    item.goods_small_logo
                      ? item.goods_small_logo
                      : 'http://image5.suning.cn/uimg/b2c/newcatentries/0070087466-000000000190720686_1_400x400.jpg'
                  "
                  alt=""
                />
              </div>
              <div class="rItem">
                <div class="title">{{ item.goods_name }}</div>
                <span class="price">¥{{ item.goods_price }}</span>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="销量">
        <!-- 列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="fistLoda"
        >
          <van-cell class="item" v-for="item of list" :key="item.goods_id">
            <div @click="toDetails(item.goods_id)">
              <div class="lItem">
                <img
                  :src="
                    item.goods_small_logo
                      ? item.goods_small_logo
                      : 'http://image5.suning.cn/uimg/b2c/newcatentries/0070087466-000000000190720686_1_400x400.jpg'
                  "
                  alt=""
                />
              </div>
              <div class="rItem">
                <div class="title">{{ item.goods_name }}</div>
                <span class="price">¥{{ item.goods_price }}</span>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="价格">
        <!-- 列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="fistLoda"
        >
          <van-cell class="item" v-for="item of list" :key="item.goods_id">
            <div @click="toDetails(item.goods_id)">
              <div class="lItem">
                <img
                  :src="
                    item.goods_small_logo
                      ? item.goods_small_logo
                      : 'http://image5.suning.cn/uimg/b2c/newcatentries/0070087466-000000000190720686_1_400x400.jpg'
                  "
                  alt=""
                />
              </div>
              <div class="rItem">
                <div class="title">{{ item.goods_name }}</div>
                <span class="price">¥{{ item.goods_price }}</span>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import appHeader from "../../components/header";
import IndexSearch from "../../components/search";
export default {
  name: "cateList",
  components: { appHeader, IndexSearch },
  data() {
    return {
      // 头部名称
      headerName: "商品列表",
      // tab
      active: 0,
      //list
      list: [],
      loading: false,
      finished: false,
      fistLoda: false,
      //接口
      pram: {
        query: "",
        cid: "",
        // 当前页码
        pagenum: 1,
        // 页容量
        pagesize: 10,
      },
      //总条目
      total: 0,
      //总页
      totalPages: 1,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUrlData();
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.axios
        .get("/goods/search", {
          params: this.pram,
        })
        .then((result) => {
          // this.list = result.data.message.goods;
          this.list = [...this.list, ...result.data.message.goods];
          this.total = result.data.message.total;
          this.totalPages = Math.ceil(this.total / this.pram.pagesize);
          this.loading = false;
        });
      // 清除cateList页面缓存
      // this.$store.commit("removeCachePage", "cateList");
    },
    // 触底事件
    onLoad() {
      // console.log(this.pram.pagenum);
      // console.log(this.totalPages);
      if (this.pram.pagenum >= this.totalPages) {
        // 加载状态结束
        this.finished = true;
        //
      } else {
        this.pram.pagenum++;
        this.getdata();
      }
    },
    // 判断路由参数类型
    getUrlData() {
      if (!isNaN(this.$route.params.cid)) {
        this.pram.cid = this.$route.params.cid || "";
      } else {
        this.pram.query = this.$route.params.cid || "";
      }

      console.log(this.pram.query);
    },
    // 跳转到详情
    toDetails(id) {
      this.$router.push(`/detalis/${id}`);
    },
    //价格排序
    sortPrice() {
      this.list.sort(function (a, b) {
        return a.goods_price - b.goods_price;
      });
    },
    //销量排序
    sortNum() {
      this.list.sort(function (a, b) {
        return a.goods_id - b.goods_id;
      });
    },
    //tab栏active选择
    tabSelect(active) {
      console.log(active);
      if (active == 1) {
        this.sortNum();
      }
      if (active == 2) {
        this.sortPrice();
      }
    },
  },
};

//bug:
// vant中List组件的onLoad事件不能获取getdata的totalPages值
//导致原因:onLoad事件比getdata先执行导致totalPages一直是初始值值
// 解决
// 为什么 List 初始化后会立即触发 load 事件？
// List 初始化后会触发一次 load 事件，用于加载第一屏的数据，这个特性可以通过immediate-check属性关闭。
</script>

<style scoped lang="less">
.cateList {
  .van-list {
    margin-bottom: 50px;
    .item {
      height: 120px;
      // background: chartreuse;
      .lItem {
        // display: inline-block;
        width: 30%;
        height: 100%;

        float: left;
        img {
          width: 100%;
        }
      }
      .rItem {
        float: left;
        width: 70%;
        padding-left: 15px;
        height: 100%;
        .title {
          margin-top: 5px;
          font-size: 18px;
          height: 50px;

          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .price {
          float: left;
          margin-top: 20px;
          color: red;
          font-size: 20px;
        }
      }
    }
  }
}
</style>





