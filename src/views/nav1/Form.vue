<template>
	<div>
		<el-form ref="form" label-position="right" label-width="70px" :model="form" @submit.prevent="onSubmit" style="margin:20px;width:95%;min-width:600px;">
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="HIS号">
						<el-input v-model="form.hisNo">
							<el-select v-model="form.hisType" slot="prepend">
								<el-option label="门诊" value="1"></el-option>
								<el-option label="住院" value="2"></el-option>
							</el-select>
							<el-button class="el-icon-search" slot="append"></el-button>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="姓名" label-width="90px">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="性别">
						<el-select v-model="form.sex" placeholder="请选择性别">
							<el-option label="男" value="M"></el-option>
							<el-option label="女" value="F"></el-option>
						</el-select>
					</el-form-item>	
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="年龄">
						<el-input v-model="form.age">
							<template slot="append">岁</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="联系电话">
						<el-input v-model="form.phoneNum"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="门诊/住院号" label-width="90px">
						<el-input v-model="form.outPatientNo"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="床号">
						<el-input v-model="form.inPatientNo"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="病历号">
						<el-input v-model="form.recordNum"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="身份证号">
						<el-input v-model="form.cardNo"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="病人类型" label-width="90px">
						<el-select v-model="form.patientType" placeholder="请选择病人类型">
							<el-option label="男" value="M"></el-option>
							<el-option label="女" value="F"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="是否维护" prop="isRemain">
						<el-switch on-text="" off-text="" v-model="form.isRemain"></el-switch>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="赔险设备">
						<el-input v-model="form.equipment"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="18">
					<el-form-item label="地址">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" style="text-align:center">
					<el-button type="primary">手工预约</el-button>
					<el-button @click.native.prevent>重置</el-button>
				</el-col>
			</el-row>
		</el-form>

		<el-table :data="users" border style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="applyNo" label="申请单号" width="120">
			</el-table-column>
			<el-table-column prop="hisProjectName" label="HIS项目" width="100">
			</el-table-column>
			<el-table-column prop="checkItem" label="检查项目" width="100">
			</el-table-column>
			<el-table-column prop="checkType" label="检查类型" width="120">
			</el-table-column>
			<el-table-column prop="doctorName" label="申请医生" width="120">
			</el-table-column>
			<el-table-column prop="applyDate" label="申请时间" width="120">
			</el-table-column>
			<el-table-column prop="appointmentyStatus" label="预约状态" width="120">
			</el-table-column>
			<el-table-column prop="free" label="费用" width="120">
			</el-table-column>
			<el-table-column prop="freeStatus" label="收费状态" width="120">
			</el-table-column>
			<el-table-column prop="hospitalName" label="检查医院" width="120">
			</el-table-column>
			<el-table-column prop="appointmentDate" label="预约时间" width="120">
			</el-table-column>
			<el-table-column label="操作" width="120">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style>
  .el-input .el-select .el-input {
    width: 90px;
  }
  /* .el-input .el-button {

  } */
</style>

<script>
	export default {
		data() {
			return {
				form: {
					hisNo: '',
					hisType: '1',
					name: '',
					sex: '',
					age: '',
					phoneNum: '',
					outPatientNo: '',
					inPatientNo: '',
					recordNum: '',
					cardNo: '',
					patientType: '',
					isRemain: false,
					equipment: '',
					address: ''
				},
				users: []
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>