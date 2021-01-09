<template>
  <div class="collect">
    <!-- 头部 -->
    <app-header :headerName="headerName" :isHeadShow="isHeadShow"></app-header>
    <!-- 空状态 -->
    <van-empty
      v-if="emptyShow"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="未收藏商品"
    />
    <!-- 列表 -->
    <van-list>
      <van-cell class="item" v-for="(item, index) of CollectList" :key="index">
        <van-swipe-cell class="del" :before-close="beforeClose">
          <div class="inner_item" @click="toDetails(item.goods_id)">
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
              text="取消"
              type="danger"
              class="delete-button"
              @click="del(index)"
            />
          </template>
        </van-swipe-cell>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import appHeader from "../../components/header";
import { mapState } from "vuex";

export default {
  name: "collect",
  components: { appHeader },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "收藏夹",
      isHeadShow: true,
      //空状态
      emptyShow: true,
    };
  },
  computed: {
    ...mapState(["CollectList"]),
  },
  watch: {},
  created() {},
  mounted() {
    //空状态
    if (this.CollectList[0]) {
      this.emptyShow = false;
    } else {
      this.emptyShow = true;
    }
  },
  methods: {
    //滑动删除
    beforeClose({ position, instance }) {
      switch (position) {
        case "right":
          break;
      }
    },
    del(index) {
      this.CollectList.splice(index, 1);
      if (!this.CollectList[0]) {
        this.emptyShow = true;
      }
    },

    // 跳转到详情
    toDetails(id) {
      this.$router.push(`/detalis/${id}`);
    },
  },
};
</script>

<style scoped lang="less">
.collect {
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
