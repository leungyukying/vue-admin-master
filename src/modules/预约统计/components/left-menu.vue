<template>
  <div class="containter">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#fff"
    >
      <el-menu-item index="4" @click="$router.push('/yysqtj')">
        <i class="el-icon-setting"></i>
        <span slot="title" :style="$route.path === '/yysqtj' && {color: '#20a0ff'}">预约申请统计</span>
      </el-menu-item>
      <el-menu-item index="5" @click="$router.push('/yyjstj')">
        <i class="el-icon-setting"></i>
        <span slot="title" :style="$route.path === '/yyjstj' && {color: '#20a0ff'}">预约接收统计</span>
      </el-menu-item>
      <el-menu-item index="6" @click="$router.push('/yysqmx')">
        <i class="el-icon-setting"></i>
        <span slot="title" :style="$route.path === '/yysqmx' && {color: '#20a0ff'}">预约申请明细</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>



<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.containter {
  /deep/ .el-menu {
    background: #fff;
  }
}
</style>
