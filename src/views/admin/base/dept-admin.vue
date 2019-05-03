<template>
	<div style="margin:10px">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin:15px;width:30%;display:flex;">
			<el-button type="primary" style="margin-right:5px"><i class="el-icon-plus" style="margin-right: 5px;font-size: 0.5px;"></i>新增机构</el-button>
			<el-input v-model="input" placeholder="机构名称/编码/地址/备注">
				<el-button class="el-icon-search" slot="append" @click="search">查询</el-button>
			</el-input>
		</div>
		<el-table
			:data="deptData"
			border
			style="width: 100%">
			<el-table-column
			prop="deptName"
			label="机构名称"
			width="200">
			</el-table-column>
			<el-table-column
			prop="deptCode"
			label="机构编码"
			width="200">
			</el-table-column>
			<el-table-column
			prop="preDeptName"
			label="上级医院机构"
			width="170">
			</el-table-column>
			<el-table-column
			prop="checkType"
			label="检查类型"
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
			prop="address"
			label="地址"
			width="200">
			</el-table-column>
			<el-table-column
			prop="marker"
			label="备注"
			width="200">
			</el-table-column>
			<el-table-column
			fixed="right"
			label="操作"
			width="150">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
					<el-button type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--弹出手工预约页面-->
		<el-dialog id="editDeptDialog" :title="editDeptDialogTitle" :visible.sync="editDeptDialogVisible">
			<el-form :model="editDeptForm" label-position="right" :rules="editDeptRules">
				<el-row :gutter="10" style="margin-bottom: 5px; margin-top 5px;">
					<el-col :span="24">
						<el-form-item label="机构名称" prop="deptName">
							<el-input></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" style="margin-bottom: 5px; margin-top 5px;">
					<el-col :span="12">
						<el-form-item label="检查项目" prop="checkItem">
							<el-select v-model="appointmentForm.checkItem" placeholder="请选择检查项目">
								<el-option label="头颅平扫（增强）" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="扫描方式" prop="scanType">
							<el-select v-model="appointmentForm.scanType" placeholder="请选择扫描方式">
								<el-option label="增强" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false; successDialogVisible = true;">确 定</el-button>
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
						"deptName":"1",
						"deptCode":"1",
						"preDeptName":"1",
						"checkType":"1",
						"hidden":"1",
						"order":"1",
						"phoneNum":"1",
						"address":"1",
						"marker":"1"
					}
				],
				editDeptDialogVisible: false,
				editDeptDialogTitle:'新增机构'
			}
		}
	}

</script>

<style scoped>

</style>