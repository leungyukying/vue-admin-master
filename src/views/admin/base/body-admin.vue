<template>
	<div style="margin:10px">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item><i class="el-icon-menu"></i>  基础字典管理</el-breadcrumb-item>
			<el-breadcrumb-item>检查部位管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin:15px;width:50%;display:flex;">
			<el-button type="primary" style="margin-right:5px" @click="editDeptDialogVisible = true">
        <i class="el-icon-plus" style="margin-right: 5px;font-size: 0.5px;"></i>新增部位
      </el-button>
      <el-button type="primary" style="margin-right:5px; margin-left:0px" @click="deleteBody">
        <i class="el-icon-delete" style="margin-right: 5px;font-size: 0.5px;"></i>批量删除
      </el-button>
			<el-input v-model="input" placeholder="部位名称/拼音字母/检查类型/注意事项">
				<el-button class="el-icon-search" slot="append">查询</el-button>
			</el-input>
		</div>
		<el-table
			:data="deptData"
			border
			style="width: 100%">
      <el-table-column
      type="selection"
      width="50">
    </el-table-column>
			<el-table-column
			prop="bodyName"
			label="部位名称"
			width="200">
			</el-table-column>
			<el-table-column
			prop="checkType"
			label="检查类型"
			width="120">
			</el-table-column>
			<el-table-column
			prop="notice"
			label="注意事项"
			width="120">
			</el-table-column>
			<el-table-column
			prop="hidden"
			label="隐藏"
			width="300">
			</el-table-column>
			<el-table-column
			prop="order"
			label="顺序"
			width="120">
			</el-table-column>
			<el-table-column
			prop="phoneNum"
			label="电话号码"
			width="160">
			</el-table-column>
			<el-table-column
			prop="bodyDescribe"
			label="部位描述"
			width="200">
			</el-table-column>
			<el-table-column
			fixed="right"
			label="操作"
			width="150">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
					<el-button type="danger" size="small" @click="hiddenDept(scope.row)">隐藏</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--弹出手工预约页面-->
		<el-dialog id="editDeptDialog" :title="editDeptDialogTitle" :visible.sync="editDeptDialogVisible">
			<el-form :model="editDeptForm" label-width="100px" :rules="editDeptRules">
        <el-form-item label="部位名称" prop="bodyName">
          <el-input v-model="editDeptForm.bodyName"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="order">
          <el-input-number v-model="editDeptForm.order" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="检查类型" prop="checkType">
          <el-select v-model="editDeptForm.checkType" placeholder="请选择检查类型">
            <el-option label="CT" value="1"></el-option>
            <el-option label="MR" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注意事项" prop="notice">
          <el-input v-model="editDeptForm.notice"></el-input>
        </el-form-item>
        <el-form-item label="部位描述" prop="bodyDescribe">
          <el-input v-model="editDeptForm.bodyDescribe"></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<el-button @click="editDeptDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editDeptDialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				deptData: [
					{
						"bodyName":"1",
						"checkType":"1",
						"notice":"1",
						"checkType":"1",
						"hidden":"1",
						"order":"1",
						"phoneNum":"1",
						"bodyDescribe":"1"
					}
				],
				editDeptDialogVisible: false,
        editDeptDialogTitle:'新增部位',
        editDeptForm: {
          "bodyName":"",
          "order":"1",
          "checkType":"",
          "notice":"",
          "bodyDescribe":""
        },
        editDeptRules: {
          bodyName: [
						{ required: true, message: '请输入机构名称', trigger: 'change' }
          ],
          order: [
						{ required: true, message: '请输入显示顺序', trigger: 'change' }
          ],
          checkType: [
						{ required: true, message: '请选择检查类型', trigger: 'change' }
					]
        }
			}
    },
    methods: {
      handleClick(row){
        this.editDeptDialogTitle = '修改部位';
        this.editDeptDialogVisible = true;
      },
      hiddenDept(row){
        this.$confirm('此操作将隐藏该检查部位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '隐藏成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消隐藏'
          });          
        });
      },
      deleteBody(){
        this.$confirm('此操作将删除部位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
	}

</script>

<style scoped>

</style>