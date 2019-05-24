<template>
	<div style="margin:10px">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item><i class="el-icon-menu"></i>  基础字典管理</el-breadcrumb-item>
			<el-breadcrumb-item>常用字典管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin:15px;width:40%;display:flex;">
			<el-button type="primary" style="margin-right:5px" @click="editDictDialogVisible = true">
        <i class="el-icon-plus" style="margin-right: 5px;font-size: 0.5px;"></i>新增字典
      </el-button>
			<el-input v-model="input" placeholder="字典类型/字典值/字典值拼音首字母">
				<el-button class="el-icon-search" slot="append">查询</el-button>
			</el-input>
		</div>
		<el-table
			:data="dictData"
			border
			style="width: 100%">
			<el-table-column
			prop="dictType"
			label="字典类型"
			width="200">
			</el-table-column>
			<el-table-column
			prop="dictValue"
			label="字典值"
			width="200">
			</el-table-column>
			<el-table-column
			prop="dictValue"
			label="隐藏"
			width="300">
			</el-table-column>
			<el-table-column
			prop="order"
			label="顺序"
			width="120">
			</el-table-column>
			<el-table-column
			prop="remark"
			label="备注"
			width="200">
			</el-table-column>
			<el-table-column
			fixed="right"
			label="操作"
			width="150">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
					<el-button type="danger" size="small" @click="hiddenDict(scope.row)">隐藏</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--弹出手工预约页面-->
		<el-dialog id="editDictDialog" :title="editDictDialogTitle" :visible.sync="editDictDialogVisible">
			<el-form :model="editDictForm" label-width="100px" :rules="editDictRules">
        <el-form-item label="字典类型" prop="dictType">
          <el-select v-model="editDictForm.dictType" placeholder="请选择字典类型">
            <el-option label="检查方式" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典值" prop="dictValue">
          <el-input v-model="editDictForm.dictValue"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="order">
          <el-input-number v-model="editDictForm.order" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="2" v-model="editDictForm.remark"></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<el-button @click="editDictDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editDictDialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dictData: [
					{
						"dictType":"1",
						"dictValue":"1",
						"hidden":"1",
						"order":"1",
						"remark":"1"
					}
				],
				editDictDialogVisible: false,
        editDictDialogTitle:'新增字典',
        editDictForm: {
          "dictType":"",
          "dictValue":"",
          "order":"1",
          "remark":""
        },
        editDeptRules: {
          dictType: [
						{ required: true, message: '请选择字典类型', trigger: 'change' }
          ],
          dictValue: [
						{ required: true, message: '请输入字典值', trigger: 'change' }
          ],
          order: [
						{ required: true, message: '请输入显示顺序', trigger: 'change' }
          ]
        }
			}
    },
    methods: {
      handleClick(row){
        this.editDictDialogTitle = '修改字典';
        this.editDictDialogVisible = true;
      },
      hiddenDict(row){
        this.$confirm('此操作将隐藏该字典, 是否继续?', '提示', {
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
			}	
    }
	}

</script>

<style scoped>

</style>