<template>
	<div>
		<el-form ref="form" label-position="right" label-width="70px" :model="form" @submit.prevent="onSubmit" style="margin:20px;width:95%;min-width:600px;">
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="HIS号" prop="hisNo">
						<el-input v-model="form.hisNo">
							<el-select v-model="form.hisType" slot="prepend">
								<el-option label="门诊" value="1"></el-option>
								<el-option label="住院" value="2"></el-option>
							</el-select>
							<el-button class="el-icon-search" slot="append" @click="search"></el-button>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="姓名" label-width="90px" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="性别" prop="sex">
						<el-select v-model="form.sex" placeholder="请选择性别">
							<el-option label="男" value="M"></el-option>
							<el-option label="女" value="F"></el-option>
						</el-select>
					</el-form-item>	
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="年龄" prop="age">
						<el-input v-model="form.age">
							<template slot="append">岁</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="联系电话" prop="phoneNum">
						<el-input v-model="form.phoneNum"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="门诊/住院号" label-width="90px" prop="outPatientNo">
						<el-input v-model="form.outPatientNo"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="床号" prop="inPatientNo">
						<el-input v-model="form.inPatientNo"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="病历号" prop="recordNum">
						<el-input v-model="form.recordNum"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="身份证号" prop="cardNo">
						<el-input v-model="form.cardNo"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="病人类型" label-width="90px" prop="patientType">
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
					<el-form-item label="陪检设备" prop="equipment">
						<el-input v-model="form.equipment"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="18">
					<el-form-item label="地址" prop="address">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" style="text-align:center">
					<el-button type="primary">手工预约</el-button>
					<el-button @click="reset">重置</el-button>
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
			<el-table-column label="操作" width="140">
				<!-- <template scope="scope">
					<el-button type="text" class="el-icon-date" @click="appointment(scope.$index, scope.row)"> 预约</el-button>	
				</template> -->
				<template>
					<el-button type="text" class="el-icon-date" @click="dialogFormVisible = true"> 预约</el-button>	
				</template>
			</el-table-column>
		</el-table>

		<!--弹出手工预约页面-->
		<el-dialog id="appointmentDialog" title="手工预约" :visible.sync="dialogFormVisible">
			<el-form :model="appointmentForm" label-position="right" :rules="appointmentRules">
				<el-row :gutter="10" style="margin-bottom: 5px; margin-top 5px;">
					<el-col :span="12">
						<el-form-item label="检查医院" prop="hospital">
							<el-select v-model="appointmentForm.hospital" placeholder="请选择医院">
								<el-option label="江阴市中医院" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="检查类型" prop="checkType">
							<el-select v-model="appointmentForm.checkType" placeholder="请选择检查类型">
								<el-option label="CT" value="1"></el-option>
								<el-option label="MR" value="2"></el-option>
							</el-select>
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
					<el-col :span="9">
						<datepicker :inline="true" :language="zh" v-model="appointmentForm.date"></datepicker>
					</el-col>
					<el-col :span="15">
						<el-card class="box-card" shadow="never">
							<div slot="header" class="clearfix">
								<span>2019-04-21</span>
								<span style="float: right;">0/10=已预约号源/总号源</span>
							</div>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-card shadow="never">
										<div>08:00-08:30</div>
										<div style="margin-top:8px">
											0/4
											<el-checkbox style="float: right;"></el-checkbox>
										</div>
									</el-card>
								</el-col>
								<el-col :span="6">
									<el-card shadow="never">
										<div>08:00-08:30</div>
										<div style="margin-top:8px">
											0/4
											<el-checkbox style="float: right;"></el-checkbox>
										</div>
									</el-card>
								</el-col>
								<el-col :span="6">
									<el-card shadow="never">
										<div>08:00-08:30</div>
										<div style="margin-top:8px">
											0/4
											<el-checkbox style="float: right;"></el-checkbox>
										</div>
									</el-card>
								</el-col>
								<el-col :span="6">
									<el-card shadow="never">
										<div>08:00-08:30</div>
										<div style="margin-top:8px">
											0/4
											<el-checkbox style="float: right;"></el-checkbox>
										</div>
									</el-card>
								</el-col>
							</el-row>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-card shadow="never">
										<div>08:00-08:30</div>
										<div style="margin-top:8px">
											0/4
											<el-checkbox style="float: right;"></el-checkbox>
										</div>
									</el-card>
								</el-col>
								<el-col :span="6">
									<el-card shadow="never">
										<div>08:00-08:30</div>
										<div style="margin-top:8px">
											0/4
											<el-checkbox style="float: right;"></el-checkbox>
										</div>
									</el-card>
								</el-col>
								<el-col :span="6">
									<el-card shadow="never">
										<div>08:00-08:30</div>
										<div style="margin-top:8px">
											0/4
											<el-checkbox style="float: right;"></el-checkbox>
										</div>
									</el-card>
								</el-col>
								<el-col :span="6">
									<el-card shadow="never">
										<div>08:00-08:30</div>
										<div style="margin-top:8px">
											0/4
											<el-checkbox style="float: right;"></el-checkbox>
										</div>
									</el-card>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false; successDialogVisible = true;">确 定</el-button>
			</div>
		</el-dialog>

		<!--预约成功页面-->
		<el-dialog id="appointmentSuccessDialog"
			title="信息提醒"
			:visible.sync="successDialogVisible">
			<div class="el-icon-date successMsg" type="text">  恭喜你预约成功</div>
			<hr style="width: 290px">
			<div type="text" style="font-size:15px; display:block; text-align: center; color: #909399;">预约检查时间：2019-04-21 10:00-10:30</div>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<el-button type="primary" @click="successDialogVisible = false">关闭并打印</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<style>
  .el-input .el-select .el-input {
    width: 90px;
  }
  #appointmentDialog .el-dialog--small {
	  width: 62%
  }

  #appointmentSuccessDialog .el-dialog--small {
	  width: 25%;
  }

  #appointmentDialog .el-dialog .el-row {
    margin-bottom: 20px;
      &:last-child {
      margin-bottom: 0;
    }
  }

  .successMsg {
	font-size: 25px;
    text-align: center;
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

<script>
	import { selectPatientInfo } from "../../api/api";
	import Datepicker from 'vuejs-datepicker';
	import {zh} from 'vuejs-datepicker/dist/locale'
	export default {
		components: {
			// 时间选择器
			Datepicker
		},
		data() {
			return {
				zh: zh,
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
				users: [{
					applyNo: "123",
					hisProjectName: "测试",
					checkItem: "头部"
				}],
				dialogFormVisible: false,
				successDialogVisible: false,
				appointmentForm: {
					hospital: '',
					checkType: '',
					date: ''
				},
				appointmentRules: {
					hospital: [
						{ required: true, message: '请选择医院', trigger: 'change' }
					],
					checkType: [
						{ required: true, message: '请选择检查类型', trigger: 'change' }
					]
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			reset(){
				this.$refs.form.resetFields();
			},
			search(){
				var patientParams = {
					hisNo: this.form.hisNo,
					hisType: this.form.hisType
				};
				selectPatientInfo(patientParams).then(data => {
					console.log('正确回调');
				});
			},
			appointment(index, row){
				
			}
		}
	}

</script>