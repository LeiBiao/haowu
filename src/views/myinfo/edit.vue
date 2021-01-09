<template>
  <div class="edit">
    <!-- 头部 -->
    <app-header :headerName="headerName" :isHeadShow="isHeadShow"></app-header>
    <van-cell-group>
      <input
        type="file"
        hidden
        ref="file"
        accept="image/*"
        @change="onFileChange"
      />
      <van-cell title="头像" value="内容" center is-link>
        <van-image
          fit="cover"
          round
          width="35px"
          height="35px"
          :src="deitUser.photo"
          @click="$refs.file.click()"
        />
      </van-cell>
      <van-cell
        title="昵称"
        :value="deitUser.name"
        @click="showPopup"
        is-link
      />
      <van-cell
        @click="showPicker = true"
        title="性别"
        :value="sexValue"
        is-link
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-cell title="生日" :value="deitUser.birthday" />
      <!-- 修改用户名 -->
      <van-popup
        v-model="showPop"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <pop-name
          @close="showPop = false"
          @popName="deitUser.name = $event"
          :name="deitUser.name"
        />
      </van-popup>
      <!-- 修改用户头像 -->
      <van-popup
        v-model="photoPop"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <pop-photo
          :file="preViewphoto"
          @close="photoPop = false"
          @update-photo="user.photo = $event"
        ></pop-photo>
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import appHeader from "../../components/header";
import popName from "../../components/popNmae";
import popPhoto from "../../components/popPhoto";
import { mapState } from "vuex";

export default {
  name: "edit",
  components: { appHeader, popName, popPhoto },
  props: {},
  data() {
    return {
      // 头部名称
      headerName: "编辑资料",
      isHeadShow: true,
      //个人质料
      deitUser: {},
      //弹出层
      showPop: false,
      photoPop: false,
      showPicker: false,
      columns: ["男", "女"],
      sexValue: "",
      //上传预览图片
      preViewphoto: null,
    };
  },
  computed: { ...mapState(["user"]) },
  watch: {},
  created() {},
  mounted() {
    this.axios({
      method: "get",
      url: "http://ttapi.research.itcast.cn/app/v1_0/user/profile",
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    }).then((res) => {
      res.data.data.name =
        window.localStorage.getItem("name") || res.data.data.name;
      this.deitUser = res.data.data;
      // console.log(this.deitUser);
    });

    this.sexValue =
      localStorage.getItem("sex") || this.deitUser.gender ? "男" : "女";
  },
  methods: {
    showPopup() {
      this.showPop = true;
    },
    onConfirm(value) {
      localStorage.setItem("sex", value);
      this.sexValue = value;
      this.showPicker = false;
    },
    onFileChange() {
      this.photoPop = true;
      // 可以用于在浏览器上预览本地图片或者视频
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0]);
      // this.preViewphoto = blob;
      // console.log(this.$refs.file.files[0]);
      const file = this.$refs.file.files[0];
      this.preViewphoto = file;
      //确保相同文件也能触发change事件
      this.$refs.file.value = "";
    },
  },
};
</script>

<style scoped lang="less">
</style>
