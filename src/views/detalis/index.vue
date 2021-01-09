<template>
  <div class="detalis">
    <!-- 头部 -->
    <app-header :headerName="headerName" :isHeadShow="isHeadShow"></app-header>
    <!-- 轮播图 -->
    <div ref="swiperss">
      <i-swper :swiper="swiper"> </i-swper>
    </div>
    <!-- 商品名 -->
    <div class="title">
      <div class="price">¥{{ this.goods.goods_price }}</div>
      <div class="title-main">
        <p class="main-l">{{ this.goods.goods_name }}</p>
        <div class="main-r">
          <i
            class="icon iconfont icon-shoucang"
            :class="college"
            @click="clickCollect"
          ></i>
          <p>{{ this.college.msg }}</p>
        </div>
      </div>
    </div>
    <!-- 图文详情 -->
    <div class="about-photo">
      <div class="title-photo">
        图文详情<i class="icon iconfont icon-shouye"></i>
      </div>
      <div class="message" v-html="this.goods.goods_introduce"></div>
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
        color="#ee0a24"
        @click="totok"
      />
      <van-badge :content="fouceNum">
        <van-goods-action-icon icon="cart-o" text="购物车" @click="toCar" />
      </van-badge>
      <van-goods-action-button
        color="linear-gradient(to right,#FFCB1E,#FF8C18)"
        type="warning"
        text="加入购物车"
        @click="addCar"
        :disabled="btnDis"
      />
      <van-goods-action-button
        color="linear-gradient(to right,#FE5E33,#EF0E24)"
        type="danger"
        text="立即购买"
        @click="payFoit"
      />
    </van-goods-action>
  </div>
</template>

<script>
import appHeader from "../../components/header";
import iSwper from "./swiper/index";
import { ImagePreview } from "vant";
import { Dialog } from "vant";
export default {
  name: "detalis",
  components: { appHeader, iSwper, [Dialog.Component.name]: Dialog.Component },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "商品详情",
      isHeadShow: true,
      // 轮播图
      swiper: [],
      // 接口参数
      param: {
        //商品id
        goods_id: 0,
      },
      //商品信息
      goods: [],
      // 收藏夹样式
      college: {
        collec: false,
        msg: "收藏",
      },
      // 购物车按钮禁用
      btnDis: false,
      //徽标
      fouceNum: 0,
      //订单
      orderList: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.param.goods_id = this.$route.params.goods_id;
    this.fouceNum = this.$store.state.goods.length;
  },
  mounted() {
    this.onlodaData();
  },
  methods: {
    onlodaData() {
      // 获取商品详情数据
      this.axios.get("/goods/detail", { params: this.param }).then((result) => {
        this.swiper = result.data.message.pics;
        this.goods = result.data.message;

        for (var item of this.$store.state.CollectList) {
          if (item.goods_id == this.goods.goods_id) {
            this.college.collec = item.collec;
            this.college.msg = item.msg;
          }
        }

        //获取所有img标签
        // const imgs = articleContent.querySelectorAll("img");
        // console.log(imgs);  NodeList []
        //  数据改变会影响视图更新,DOM数据不会立即渲染,所以获取到的imgs为空
        //随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中
        this.$nextTick(() => {
          this.perviewImage();
        });
      });
    },
    perviewImage() {
      // 获取轮播图DOM实例
      const articleContent = this.$refs["swiperss"];
      const imgs = articleContent.querySelectorAll("img");

      const imgPaths = [];
      imgs.forEach((img, i) => {
        imgPaths.push(img.src);
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: i,
          });
        };
      });
    },
    // 收藏夹
    clickCollect() {
      if (this.college.collec) {
        this.goods.collec = false;
        this.goods.msg = "收藏";
      } else {
        this.goods.collec = true;
        this.goods.msg = "已收藏";
      }
      this.college.collec = this.goods.collec;
      this.college.msg = this.goods.msg;
      this.$store.commit("setCollect", this.goods);
    },
    //加入购物车
    addCar() {
      this.$store.commit("setGoods", this.goods);
      Dialog.alert({
        message: "该商品已添加至购物车",
      }).then(() => {
        this.btnDis = true;
        this.fouceNum = this.$store.state.goods.length;
      });
    },
    // 跳转购物车
    toCar() {
      this.$router.push("/shopcar");
    },
    //客服
    totok() {
      Dialog.alert({
        message: "该服务暂未开通",
      });
    },
    // 支付
    payFoit() {
      Dialog.alert({
        message: "确认支付吗?",
        theme: "round-button",
      }).then(() => {
        var date = new Date();
        this.goods.payTime = Date.now();
        this.orderList.push({
          goodName: this.goods.goods_name,
          price: this.goods.goods_price,
          num: 1,
          payTime: this.goods.payTime,
          goods_id: this.goods.goods_id,
        });
        this.$store.commit("setOrder", this.orderList[0]);
        localStorage.setItem(
          "order",
          JSON.stringify(this.$store.state.orderList)
        );
      });
    },
  },
};
</script>

<style scoped lang="less">
.detalis {
  .title {
    width: 100%;
    height: 100px;
    border-top: 8px solid #f1f1f1;
    border-bottom: 8px solid #f1f1f1;
    // background: #ff00ff;
    .price {
      color: red;
      padding: 5px 20px;
      height: 35%;
      font-size: 20px;
      font-weight: 600;
    }
    .title-main {
      display: flex;
      height: 54%;
      .main-l {
        color: #666666;
        font-size: 18px;
        flex: 3;
        padding: 5px 15px 5px 15px;
        border-right: 3px solid #ccc;
        margin-bottom: 5px;
        border-radius: 2px;
        // background: #00f;
        word-break: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .main-r {
        flex: 1;
        color: #666666;
        // background: #ff0;
        .icon-shoucang {
          font-size: 20px;
          margin-left: 32px;
          text-align: center;
        }
        .collec {
          color: #ffa300;
        }
        p {
          font-size: 16px;
          padding: 5px 0;
          text-align: center;
        }
      }
    }
  }
  .about-photo {
    margin-bottom: 50px;
    .title-photo {
      font-size: 16px;
      color: #fb5430;
      font-weight: 600;
      padding: 10px;
      border-bottom: 8px solid #f1f1f1;
      i {
        margin-left: 5px;
      }
    }
  }
  /deep/.van-badge {
    margin-right: 10px;
  }
}
</style>
