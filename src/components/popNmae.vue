<template>
  <div class="popNmae">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <van-field
      v-model="valueName"
      maxlength="7"
      label="修改昵称"
      input-align="right"
      clearable
    />
  </div>
</template>

<script>
export default {
  name: "header",
  components: {},
  props: ["name"],
  data() {
    return {
      isShow: true,
      valueName: this.name,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
      });
      try {
        this.axios({
          method: "patch",
          url: "http://ttapi.research.itcast.cn/app/v1_0/user/profile",
          data: { name: this.valueNmame },
          headers: {
            Authorization: `Bearer ${this.$store.state.user.token}`,
          },
        });

        this.$toast.success("保存成功");
        window.localStorage.setItem("name", this.valueName);
        let geterName = localStorage.getItem("name");
        this.$emit("popName", geterName);
        this.$emit("close");
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail("昵称已存在");
        }
      }
    },
  },
};
</script>

<style lang="less">
.van-popup {
  background-color: #f7f8fa;
}
</style>
