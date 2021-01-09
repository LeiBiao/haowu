<template>
  <div class="myinfo">
    <!-- 头部 -->
    <app-header :headerName="headerName"></app-header>
    <div class="aboutMe">
      <van-image
        round
        fit="cover"
        width="70"
        height="70"
        :src="
          this.user
            ? userInfo.photo
            : 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1607932163&di=7f3ff525015d9cfe7ba8a901238e88aa&src=http://bpic.588ku.com/element_origin_min_pic/01/53/99/175746f89e43799.jpg'
        "
        @click="toLogin"
      />
      <span class="name">{{ this.user ? userInfo.name : "登录/注册" }}</span>
      <van-button
        class="user_info"
        plain
        size="mini"
        round
        type="info"
        to="/edit"
        >编辑资料</van-button
      >
      <div class="collect">
        <van-grid :border="false">
          <van-grid-item text="收藏的店铺">
            <span slot="icon">0</span>
          </van-grid-item>
          <van-grid-item text="收藏的商品" @click="goCollect">
            <span slot="icon">{{ this.$store.getters.collectLen }}</span>
          </van-grid-item>
          <van-grid-item text="关注的商品">
            <span slot="icon">{{ this.$store.getters.collectLen }}</span>
          </van-grid-item>
          <van-grid-item text="我的足迹">
            <span slot="icon">6</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <div class="order" v-if="user">
      <van-grid clickable :column-num="4">
        <van-grid-item
          icon="icon iconfont icon-caidan"
          text="全部订单"
          to="/order"
        />
        <van-grid-item
          icon="icon iconfont icon-shouye"
          text="待付款"
          to="/order"
        />
        <van-grid-item
          icon="icon iconfont icon-wuliu"
          text="待收货"
          to="/order"
        />
        <van-grid-item
          icon="icon iconfont icon-fukuantongzhi"
          text="售后服务"
          to="/"
        />
      </van-grid>
    </div>
    <van-cell-group class="address" v-if="user">
      <van-cell title="收货地址管理" />
    </van-cell-group>
    <van-cell-group class="kefu">
      <van-cell title="联系客服" value="400-456-1000" />
      <van-cell title="意见反馈" />
      <van-cell title="关于我们" />
      <van-cell v-if="user" class="loginInto" title="退出登录" @click="dia" />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import appHeader from "../../components/header";
export default {
  name: "myinfo",
  components: { appHeader },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "我的",
      //用户信息
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    if (this.user) {
      this.getUser();
    }
  },
  mounted() {},
  methods: {
    goCollect() {
      this.$router.push(`/collect`);
    },
    //获取用户信息
    getUser() {
      this.axios({
        method: "get",
        url: "http://ttapi.research.itcast.cn/app/v1_0/user",
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      }).then((res) => {
        if (window.localStorage.getItem("name")) {
          res.data.data.name = window.localStorage.getItem("name");
        }
        this.userInfo = res.data.data;
      });
    },
    // 退出登录
    dia() {
      // 提示用户确认退出
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗?",
        })
        .then(() => {
          //确认执行
          //  清除用户登录状态
          this.$store.commit("setUser", null);
          localStorage.removeItem("user");
        })
        .catch(() => {
          //取消执行
        });
    },
    toLogin() {
      let token = localStorage.getItem("user");
      if (!token) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped lang="less">
.myinfo {
  position: relative;

  .aboutMe {
    height: 200px;
    background: url("./background.png") no-repeat;
    background-size: cover;
    position: relative;
    .van-image {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%);
    }
    .user_info {
      color: #666;
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .name {
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%);
      font-size: 18px;
      color: #fff;
    }
    .collect {
      height: 50px;
      .van-grid {
        position: absolute;
        bottom: 0;
        left: 50%;

        transform: translate(-50%, 30%);
        width: 90%;
        height: 50px;
        /deep/.van-grid-item {
          height: 100%;
          .van-grid-item__icon-wrapper {
            font-size: 16px;
            color: #f9544e;
          }
          .van-grid-item__text {
            font-size: 12px;
          }
        }
      }
    }
  }

  .order {
    margin-top: 25px;
  }
  .address {
    margin: 10px 0;
  }
  .kefu {
    margin: 10px 0;
  }
  .loginInto {
    text-align: center;
    color: red;
  }
}
</style>
