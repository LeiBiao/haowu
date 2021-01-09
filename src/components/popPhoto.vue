<template>
  <div class="popPhoto">
    <img :src="image" alt="" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      class="toolBar"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { Form } from "vant";
import { mapState } from "vuex";
export default {
  name: "popPhoto",
  components: {},
  props: ["file"],
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
    };
  },
  computed: { ...mapState(["user"]) },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onConfirm() {
      const fd = new FormData();
      fd.append("photo", this.file);
      // console.log(fd.get("photo"));
      this.axios({
        method: "patch",
        url: "http://ttapi.research.itcast.cn/app/v1_0/user/photo",
        data: fd,
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });
      this.$toast.success("保存成功");
      // 更新父组件头像
      this.$emit("update-photo", this.image);
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
.van-popup {
  background-color: #2a2c36;
}
.popPhoto {
  .toolBar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
