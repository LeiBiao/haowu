<template>
  <div class="login">
    <!-- 头部 -->
    <app-header :headerName="headerName" :isHeadShow="isHeadShow"></app-header>
    <van-form
      :show-error="false"
      :show-error-message="false"
      ref="login-from"
      @submit="onSubmit"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="验证码"
        placeholder="验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="timeShow"
            :time="1000 * 60"
            format="ss s"
            @finish="timeShow = false"
          />
          <van-button
            v-else
            @click.prevent="onLoginY"
            round
            size="small"
            type="primary"
            :loading="isSendSmsLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
    <div class="tis">
      <p class="msg">验证码请求时间可能过长,可以使用测试账号</p>
      <p class="box">手机号:13922222222</p>
      <p class="pass">验证码:246810</p>
    </div>
  </div>
</template>

<script>
import appHeader from "../../components/header";

export default {
  name: "login",
  components: { appHeader },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "登录/注册",
      isHeadShow: true,
      user: {
        mobile: "", // 手机号
        code: "", // 验证码
      },
      // 验证规则
      formRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[3-9]\d{9}$/, message: "请输入正确手机格式" },
        ],
        code: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      // 倒计时显示
      timeShow: false,
      // 加载按钮
      isSendSmsLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      this.onLogin();
    },
    onLogin() {
      this.axios
        .post(
          "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
          this.user
        )
        .then((result) => {
          // console.log(result);
          //  将Tooken存入vuex
          this.$store.commit("setUser", result.data.data);
          this.$router.push(`/my`);
        });
    },
    //验证码
    async onLoginY() {
      try {
        // 验证手机号
        await this.$refs["login-from"].validate("mobile");
        this.isSendSmsLoading = true; // 展示按钮的 loading 状态，防止用户多次点击触发发送行为
        this.axios
          .get(
            `http://ttapi.research.itcast.cn/app/v1_0/sms/codes/${this.user.mobile}`
          )
          .then((result) => {
            console.log(result);
          });
        this.timeShow = true;
      } catch (err) {
        this.$toast({ message: err.message, position: "top" });
      }
      // 关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false;
    },
    //验证失败触发
    onFailed(err) {
      if (err.errors[0]) {
        this.$toast({ message: err.errors[0].message, position: "top" });
      }
    },
  },
};
</script>

<style scoped lang="less">
.login {
  .van-button {
    background: #1cb6fe;
    color: #fff;
  }
  p {
    line-height: 30px;
    margin-left: 20px;
    font-size: 16px;
  }
}
</style>
