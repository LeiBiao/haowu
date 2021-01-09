<template>
  <div class="iNav">
    <van-grid icon-size="60px" :border="false">
      <van-grid-item
        v-for="(item, i) in navList"
        :key="i"
        :icon="item.image_src"
        to="/category"
      ></van-grid-item>
    </van-grid>
  </div>
</template>




<script>
export default {
  name: "",
  components: {},
  props: ["navList"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // console.log(this.navList);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
