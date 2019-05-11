<template>
	<div style="width: 100%">
		<el-collapse v-model="activeNames">
			<el-collapse-item title="基本信息" name="1">
				<el-form ref="form" label-position="right" label-width="70px" :model="form" @submit.prevent="onSubmit" style="margin:20px;width:95%;min-width:600px;">
					<el-row :gutter="10">
						<el-col :span="12">
							<el-form-item label="HIS号" prop="HisCode">
								<el-input v-model="form.HisCode">
									<el-select v-model="form.PatientType" slot="prepend">
										<el-option label="门诊" value="1"></el-option>
										<el-option label="住院" value="2"></el-option>
										<el-option label="体检病人" value="3"></el-option>
									</el-select>
									<el-button class="el-icon-search" slot="append" @click="search"></el-button>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="姓名" label-width="90px" prop="PatientName">
								<el-input v-model="form.PatientName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="性别" prop="Sex">
								<el-select v-model="form.Sex" placeholder="请选择性别">
									<el-option label="男" value="男"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-form-item>	
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="6">
							<el-form-item label="年龄" prop="Age">
								<el-input v-model="form.Age">
									<template slot="append">岁</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="联系电话" prop="PhoneNumber">
								<el-input v-model="form.PhoneNumber"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="门诊/住院号" label-width="90px" prop="PatientID">
								<el-input v-model="form.PatientID"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="床号" prop="BedNo">
								<el-input v-model="form.BedNo"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="6">
							<el-form-item label="病历号" prop="PatientRecordNo">
								<el-input v-model="form.PatientRecordNo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="身份证号" prop="ChinaIdCard">
								<el-input v-model="form.ChinaIdCard"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="病人类型" label-width="90px" prop="PatientType">
								<el-select v-model="form.PatientType" placeholder="请选择病人类型">
									<el-option label="门诊" value="1"></el-option>
									<el-option label="住院" value="2"></el-option>
									<el-option label="体检病人" value="3"></el-option>
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
							<el-form-item label="地址" prop="Address">
								<el-input v-model="form.Address"></el-input>
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
			</el-collapse-item>
		</el-collapse>

		<el-table :data="users" border style="width: 100%;">
			<el-table-column type="selection" min-width="55">
			</el-table-column>
			<el-table-column prop="OrderId" label="申请单号" min-width="120">
			</el-table-column>
			<el-table-column prop="HisItem" label="HIS项目" min-width="100">
			</el-table-column>
			<el-table-column prop="StudyItem" label="检查项目" min-width="100">
			</el-table-column>
			<el-table-column prop="StudyType" label="检查类型" min-width="120">
			</el-table-column>
			<el-table-column prop="AppDoctor" label="申请医生" min-width="120">
			</el-table-column>
			<el-table-column prop="RegisterTime" label="申请时间" min-width="120">
			</el-table-column>
			<el-table-column prop="AppStatus" label="预约状态" min-width="120"
			:filter-method="appointmentyStatusTag"
			:filters="[{ text: '已预约', value: '1' }, { text: '未预约', value: '0' }]">
			</el-table-column>
			<el-table-column prop="ItemFee" label="费用" min-width="120">
			</el-table-column>
			<el-table-column prop="FeeStatus" label="收费状态" min-width="120">
			</el-table-column>
			<el-table-column prop="ExcuteHospital" label="检查医院" min-width="120">
			</el-table-column>
			<el-table-column prop="AppTime" label="预约时间" min-width="120">
			</el-table-column>
			<el-table-column label="操作" min-width="200" fixed="right">
				<template slot-scope="scope">
					<el-button type="text" v-if="scope.row.AppStatus == '1'" 
					class="el-icon-edit" @click="dialogFormVisible = true"> 修改</el-button>
					<el-button type="text" v-if="scope.row.AppStatus == '1'" 
					class="el-icon-delete" @click="dialogFormVisible = true"> 取消</el-button>	
					<el-button type="text" v-if="scope.row.AppStatus == '0'" 
					class="el-icon-date" @click="dialogFormVisible = true"> 预约</el-button>
				</template>
			</el-table-column>
		</el-table>
		

		<!--弹出手工预约页面-->
		<el-dialog id="appointmentDialog" title="手工预约" :visible.sync="dialogFormVisible">
			<el-form :model="appointmentForm" label-position="right" :rules="appointmentRules">
				<el-row :gutter="10" style="margin-bottom: 5px; margin-top 5px;">
					<el-col :span="12">
						<el-form-item label="检查医院" prop="studyHospital">
							<el-select v-model="appointmentForm.studyHospital" placeholder="请选择医院" @change="selectAppointmentDate">
								<el-option label="B医院" value="B医院"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="检查类型" prop="studyType">
							<el-select v-model="appointmentForm.studyType" placeholder="请选择检查类型" @change="selectAppointmentDate">
								<el-option label="CT" value="CT"></el-option>
								<el-option label="MR" value="MR"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" style="margin-bottom: 5px; margin-top 5px;">
					<el-col :span="12">
						<el-form-item label="检查项目" prop="studyItem">
							<el-select v-model="appointmentForm.studyItem" placeholder="请选择检查项目" @change="selectAppointmentDate">
								<el-option label="腹部平扫" value="腹部平扫"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="扫描方式" prop="scanType">
							<el-select v-model="appointmentForm.scanType" placeholder="请选择扫描方式" @change="selectAppointmentDate">
								<el-option label="平扫" value="平扫"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="9">
						<datepicker :inline="true" :language='zh' v-model="appointmentForm.appDate"
						:highlighted="highlighted" calendar-class="calendar-class"></datepicker>
					</el-col>
					<el-col :span="15">
						<el-card class="box-card" shadow="never">
							<div slot="header" class="clearfix">
								<span>2019-04-21</span>
								<span style="float: right;">0/10=已预约号源/总号源</span>
							</div>
							<div class="list">
								<div v-for="(item, index) in this.appDateList" :key="index">
									<el-card shadow="never" class="item">
											<div>{{item.BegTime}}-{{item.EndTime}}</div>
											<div style="margin-top:8px">
												{{item.AppedNumber}}/{{item.TotalNumber}}
												<el-checkbox style="float: right;"></el-checkbox>
											</div>
									</el-card>
								</div>
							</div>
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

<style lang="less">
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

	.vdp-datepicker__calendar .cell.selected {
		background: #fff !important;
		border: 1px solid blue;
	}

	.vdp-datepicker__calendar .cell.highlighted{
		background: #fff !important;
		border: 1px solid green;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		.item {
			margin-left: 10px;
			margin-top: 10px;
		} 	
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
				activeNames: ['1'],
				form: {
					HisCode: '',
					hisType: '1',
					PatientName: '',
					Sex: '',
					Age: '',
					PhoneNumber: '',
					PatientID: '',
					BedNo: '',
					PatientRecordNo: '',
					ChinaIdCard: '',
					PatientType: '1',
					isRemain: false,
					equipment: '',
					Address: ''
				},
				users: [],
				dialogFormVisible: false,
				successDialogVisible: false,
				appointmentForm: {
					studyHospital: '',
					studyType: '',
					studyItem: '',
					scanType: '',
					appDate: new Date()
				},
				appDateList:[],
				appointmentRules: {
					hospital: [
						{ required: true, message: '请选择医院', trigger: 'change' }
					],
					checkType: [
						{ required: true, message: '请选择检查类型', trigger: 'change' }
					]
				},
				highlighted: {
					dates: []
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
			async search(){
				var msgBody = {
					root: {
						"patientType": this.form.PatientType,
        		"HisCode": '1523654'
					}
				}

				var patientParams = {
					msgHeader : '{"root":{"serviceName":"getPatientInfor"}',
					msgBody : JSON.stringify(msgBody)
				}
				const res = await this.$http.post("/GetHisInforInterface/registerInforInterface.asmx/callInterface", patientParams);
				if(res.data.length > 0){
					this.form = res.data[0];
				}

				patientParams = {
					msgHeader : '{"root":{"serviceName":"getOrderInfor"}',
					msgBody : JSON.stringify(msgBody)
				}
				const res1 = await this.$http.post("/GetHisInforInterface/registerInforInterface.asmx/callInterface", patientParams);
				if(res1.data.length > 0){
					this.users = res1.data;
				}


			},
			async selectAppointmentDate() {
				if(this.appointmentForm.studyHospital != undefined && this.appointmentForm.studyHospital != '' 
				&& this.appointmentForm.studyType != undefined && this.appointmentForm.studyType != ''){
					var msgBody = {
						root: {
							studyHospital: this.appointmentForm.studyHospital,
							studyType: this.appointmentForm.studyType,
							studyItem: this.appointmentForm.studyItem,
							scanType: this.appointmentForm.scanType,
							appDate: '2019-05-08'
							// appDate: this.dateToString(this.appointmentForm.appDate)
						}
					}
					
					var appParams = {
						msgHeader : '{"root":{"serviceName":"getAppNmber"}',
						msgBody : JSON.stringify(msgBody)
					}
					const res = await this.$http.post('/AppInterface/AppService.asmx/callInterface', appParams);

					if (res.data.errorInfor != undefined && res.data.errorInfor != ''){
						this.$message({
							message: res.data.errorInfor,
							type: 'warning',
							showClose: true
						});
					}
				
					res.data.forEach((item, index)=>{
							//this.highlighted.dates.push(this.stringTimeToDate(item.date));
							var appDateItem = {
								BegTime: item.BegTime.substring(0,5),
								EndTime: item.EndTime.substring(0,5),
								AppedNumber: item.AppedNumber,
								TotalNumber: item.TotalNumber
							}

							this.appDateList.push(appDateItem);
					});
				}
			},
			appointment(index, row){
				
			},
			appointmentyStatusTag(value, row){
				row.appointmentyStatus = value;
			},
			dateToString(date){
				var year = date.getFullYear(); 
				var month =(date.getMonth() + 1).toString(); 
				var day = (date.getDate()).toString();  
				if (month.length == 1) { 
						month = "0" + month; 
				} 
				if (day.length == 1) { 
						day = "0" + day; 
				}
				var dateTime = year + "-" + month + "-" + day;
				return dateTime; 
			},
			stringTimeToDate(timeStr){
        var resDate;
        if(timeStr.indexOf("-")!=-1){
          var nyrArr=timeStr.split(' ')[0].split('-');
          resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2]);
        }
        if(timeStr.indexOf(".")!=-1){
          var nyrArr=timeStr.split(' ')[0].split('.');
          var sfmArr=timeStr.split(' ')[1].split(':');
          resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2],sfmArr[0],sfmArr[1],0,0);
        }
        if(timeStr.indexOf("/")!=-1){
          var nyrArr=timeStr.split(' ')[0].split('/');
          var sfmArr=timeStr.split(' ')[1].split(':');
          resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2],sfmArr[0],sfmArr[1],0,0);
        }
        return resDate;
      }
		}
	}
</script>