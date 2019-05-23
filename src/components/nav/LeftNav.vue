<template>
  <el-col :span="24" class="left-nav-main" style="top:0px">
    <!--左侧导航-->
    <el-menu
      class="el-menu-vertical-demo"
      default-active="/admin/adminList/deptAdmin"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :router="true"
      :unique-opened="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>基础字典管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/adminList/deptAdmin">医疗机构管理</el-menu-item>
          <el-menu-item index="/admin/adminList/bodyAdmin">检查部位管理</el-menu-item>
          <el-menu-item index="/admin/adminList/dictionaryAdmin">常用字典管理</el-menu-item>
          <el-menu-item index="/admin/adminList/typeAdmin">检查类型管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>号源管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/adminList/hygl">号源管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>接口维护管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/adminList/ynhyjkgl">HIS接口管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统参数管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/adminList/hmdgl">黑名单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!--右侧内容区-->
    <section>
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
    handleSelect: function(a, b) {}
  }
};
</script>
<style lang="scss" scoped>
.left-nav-main {
  width: 100%;
  /deep/ {
    .el-menu {
      position: fixed;
      top: 70px;
      left: 0;
      bottom: 0;
      width: 200px;
    }
    section {
      margin-left: 200px;
      padding: 10px 10px;
    }
  }
}
</style>