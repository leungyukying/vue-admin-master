<template>
  <div style="margin:10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <i class="el-icon-menu"></i> 接口维护管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>HIS接口管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-con">
      <div class="left-part">
        <div
          class="item-con"
          :class="{active: selectHispital === item}"
          v-for="item in HospitalList"
          :key="item.HospitalName"
          @click="onSelect(item)"
        >{{item.HospitalName}}</div>
      </div>
      <div class="right-part">
        <el-form :model="model" label-width="200px">
          <el-form-item label="接口类型" prop="deptName">
            <el-select v-model="model.InterfaceType">
              <el-option label="restful" value="2"></el-option>
              <el-option label="webservice" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="获取申请单的地址" prop="deptName">
            <el-input size="small" v-model="model.GetOrderAddress"></el-input>
          </el-form-item>
          <el-form-item label="获取部位的地址" prop="deptName">
            <el-input size="small" v-model="model.GetBodyPartAddress"></el-input>
          </el-form-item>
          <el-form-item label="提交预约的地址" prop="deptName">
            <el-input size="small" v-model="model.PostAppAddress"></el-input>
          </el-form-item>
          <el-form-item label="收费查询地址" prop="deptName">
            <el-input size="small" v-model="model.LookUpFeeAddress"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="deptName">
            <el-input type="textarea" size="small" v-model="model.OtherInfo"></el-input>
          </el-form-item>
        </el-form>
        <div class="tool-con">
          <el-button type="primary" size="small" @click="save">保存</el-button>
          <el-button type="danger" size="small">删除</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, addUser } from "../../api/api.3";
export default {
  data() {
    return {
      HospitalList: [],
      selectHispital: null,
      model: {
        InterfaceType: "",
        GetOrderAddress: "",
        GetBodyPartAddress: "",
        PostAppAddress: "",
        LookUpFeeAddress: "",
        OtherInfo: ""
      }
    };
  },
  methods: {
    onSelect(item) {
      this.selectHispital = item;
      Object.assign(this.model, this.selectHispital);
    },
    save() {
      addUser(
        { ...this.model, HospitalName: this.selectHispital.HospitalName },
        "updateHisInterface"
      ).then(res => {
        this.$message.success("保存成功");
        this.getData();
      });
    },
    getData() {
      getList("T_APP_HISINTERFACE").then(res => {
        this.HospitalList = res.data;
        !this.selectHispital && (this.selectHispital = res.data[0]);
        this.selectHispital &&
          (this.selectHispital = res.data.find(
            item => item.HospitalName === this.selectHispital.HospitalName
          ));

        Object.assign(this.model, this.selectHispital);
      });
    }
  },
  created() {
    this.getData();
  },
  components: {}
};
</script>

<style lang='scss' scoped>
.main-con {
  margin: 20px 10px;
  display: flex;
  align-items: stretch;
  min-height: calc(100vh - 145px);
  .left-part {
    width: 150px;
    background: #f6f6f6;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
    .item-con {
      padding: 5px;
      cursor: pointer;
      &.active {
        color: #20a0ff;
      }
      &:hover {
        color: #20a0ff;
      }
    }
  }
  .right-part {
    flex: 1;
    width: 0;
    max-width: 700px;
    .tool-con {
      text-align: center;
    }
  }
}
</style>