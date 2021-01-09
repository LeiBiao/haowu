<template>
  <div class="shopCar">
    <!-- 头部 -->
    <app-header :headerName="headerName" :isHeadShow="isHeadShow"></app-header>
    <!-- 空状态 -->
    <van-empty
      v-if="emptyShow"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="请添加商品"
    />
    <!-- 列表 -->
    <van-list>
      <van-cell class="item" v-for="(item, index) of goods" :key="index">
        <van-swipe-cell class="del" :before-close="beforeClose">
          <div class="inner_item">
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
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="del(index)"
            />
          </template>
        </van-swipe-cell>
        <div class="out_item">
          <div class="buy_num">购买数量</div>
          <van-stepper
            @change="onChange"
            class="stepper"
            v-model="item.num"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </van-cell>
    </van-list>
    <!-- 底部tab栏 -->
    <div class="tab_tool">
      <div class="tool_item">
        实际付款:
        <span class="price">¥{{ sumPrice }}</span>
      </div>
      <div class="tool_item btn_buy">
        <span class="pay" @click="payFoit">立即支付</span>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from "../../components/header";
import { mapState } from "vuex";
import { Dialog } from "vant";

export default {
  name: "shopCar",
  components: { appHeader },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "购物车",
      isHeadShow: true,
      //总价
      sumPrice: 0,
      //当前购物车订单列表
      orderList: [],
      // 空状态
      emptyShow: true,
    };
  },
  computed: {
    ...mapState(["goods", "show"]),
  },
  watch: {
    goods(newValue) {
      if (newValue.length == 0) {
        this.sumPrice = 0;
      }
    },
  },
  created() {
    //空状态
    if (this.$store.state.goods[0]) {
      this.emptyShow = false;
    } else {
      this.emptyShow = true;
    }
  },
  mounted() {
    this.getSumPrice();
  },
  methods: {
    // 步进器点击事件
    onChange() {
      this.getSumPrice();
    },
    //滑动删除
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
      switch (position) {
        case "right":
          break;
      }
    },
    // 删除
    del(index) {
      this.goods.splice(index, 1);
      this.getSumPrice();
      console.log(this.$store.state.goods.length);
      //空状态
      if (!this.$store.state.goods[0]) {
        this.emptyShow = true;
      }
    },
    //计算总价
    getSumPrice() {
      this.sumPrice = 0;
      for (let k in this.goods) {
        this.sumPrice += this.goods[k].num * this.goods[k].goods_price;
      }
    },
    // 支付
    payFoit() {
      this.orderList = [];
      Dialog.alert({
        message: "确认支付吗?",
        theme: "round-button",
      }).then(() => {
        var date = new Date();
        for (let item of this.goods) {
          item.payTime = Date.now();
          this.orderList.push({
            goodName: item.goods_name,
            price: item.goods_price,
            num: item.num,
            payTime: item.payTime,
            goods_id: item.goods_id,
          });
          // 清空购物车
          this.$store.state.goods = [];
          this.emptyShow = true;
        }
        this.orderList.forEach((item) => {
          this.$store.commit("setOrder", item);
        });
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
.shopCar {
  .custom-image {
    height: 80vh;
    .custom-image .van-empty__image {
      width: 90px;
      height: 90px;
    }
  }

  .van-list {
    margin-bottom: 50px;

    .item {
      // height: 170px;
      padding-bottom: 0;
      .del {
        .goods-card {
          margin: 0;
        }

        .delete-button {
          height: 100%;
        }
      }
      .inner_item {
        padding: 10px;
        background: #f5f4f6;
        height: 120px;
        .lItem {
          padding: 5px;

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
      .out_item {
        height: 50px;
        // background: yellow;
        padding: 10px;

        .buy_num {
          font-size: 16px;
          color: #666;
          float: left;
        }
        .stepper {
          float: right;
        }
      }
    }
  }
  .tab_tool {
    position: fixed;
    display: flex;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45px;
    background: #fff;
    .tool_item {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      .price {
        color: #f9544e;
        font-size: 20px;
        margin-left: 5px;
      }
    }

    .btn_buy {
      flex: 1;
      .pay {
        width: 90px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        display: inline-block;
        background: #f9544e;
        border-radius: 25px;
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>
