<template>
  <div class="order">
    <!-- 头部 -->
    <app-header
      :headerName="headerName"
      :isHeadShow="isHeadShow"
      :fixedShow="isfixed"
    ></app-header>
    <!-- 空状态 -->
    <van-empty
      v-if="show"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无订单"
    />
    <!-- 订单列表 -->

    <div class="order-list">
      <ul
        v-for="(item, index) of orderList"
        :key="index"
        @click="toDetails(item.goods_id)"
      >
        <van-swipe-cell>
          <li class="orderId">
            <div>订单名称</div>
            <div class="name">{{ item.goodName }}</div>
          </li>
          <li class="ordernum">
            <div>订单数量</div>
            <div>×{{ item.num }}</div>
          </li>
          <li>
            <div>订单单价</div>
            <div class="price">¥{{ item.price }}</div>
          </li>
          <li class="orderPrice">
            <div>订单总价</div>
            <div class="price">¥{{ item.priceCount }}</div>
          </li>
          <li class="orderData">
            <div>订单时间</div>
            <div class="data">{{ item.payTime }}</div>
          </li>
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
      </ul>
    </div>
  </div>
</template>

<script>
import appHeader from "../../components/header";
import formatDate from "../../components/formData/formatDara";
export default {
  name: "order",
  components: { appHeader },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "订单列表",
      isHeadShow: true,
      isfixed: true,
      //订单列表
      orderList: [],
      // 空状态
      show: true,
    };
  },
  computed: {},
  watch: {
    orderList(newValue, oldValue) {
      // console.log(newValue);
      // 空状态
      if (newValue.length !== 0) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
  },
  created() {
    // 给订单列表赋值
    for (let k in JSON.parse(localStorage.getItem("order"))) {
      this.orderList.push(JSON.parse(localStorage.getItem("order"))[k]);
    }
  },
  mounted() {
    //给orderlist赋值
    console.log(this.orderList);
    this.orderList.forEach((item) => {
      item.payTime = formatDate(item.payTime);
      item.priceCount = item.num * item.price;
    });
  },
  methods: {
    beforeClose({ position, instance }) {
      switch (position) {
        case "right":
          break;
      }
    },
    // 删除
    del(index) {
      this.orderList.splice(index, 1);
      localStorage.setItem("order", JSON.stringify(this.orderList));
    },
    // 跳转到详情
    toDetails(id) {
      this.$router.push(`/detalis/${id}`);
    },
  },
};
</script>

<style scoped lang="less">
.custom-image {
  height: 80vh;
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
}
.order {
  .order-list {
    width: 100%;
    font-size: 16px;
    color: #9094a8;
    padding: 10px;
    margin-top: 46px;
    ul {
      padding: 10px;
      background: #fff;
      margin-bottom: 3px;
      .delete-button {
        height: 100%;
        margin-left: 15px;
        padding: 8px;
        // width: 80%;
      }
      li {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        height: 30px;
      }
      .name {
        text-align: end;
        width: 60%;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        font-size: 20px;
        color: red;
      }
      .data {
        font-weight: 600;
        color: #000;
      }
    }
  }
}
</style>
