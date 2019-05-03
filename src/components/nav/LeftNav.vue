<template>
  <el-col :span="24" class="main" style="top:0px">
    <!--左侧导航-->
     <el-menu
      class="el-menu-vertical-demo" style="width: 14%"
      default-active="/admin/adminList/deptAdmin"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect" :router="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>基础字典管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/adminList/deptAdmin">医疗机构管理</el-menu-item>
          <el-menu-item index="/admin/adminList/bodyAdmin">检查部位管理</el-menu-item>
          <el-menu-item index="/admin/adminList/dictionaryAdmin">常用字典管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!--右侧内容区-->
    <section style="width:89%">
      <div>
        <el-col :span="24">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </div>
    </section>
  </el-col>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect: function (a, b) {
			}
    }
  }
</script>
<style scoped>

</style>