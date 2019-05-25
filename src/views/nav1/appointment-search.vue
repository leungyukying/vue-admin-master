<template>
	<div style="width: 100%">
		<el-collapse v-model="activeNames">
			<el-collapse-item title="基本信息" name="1">
        <el-form ref="searchForm" label-position="right" label-width="70px" :model="searchForm"
        @submit.prevent="onSubmit" style="margin:20px;width:95%;min-width:600px;">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="预约时间" prop="appointmentDate">
                <el-date-picker
                  v-model="searchForm.appointmentDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="HIS号" label-width="90px" prop="hisNo">
                <el-input v-model="searchForm.hisNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预约状态" label-width="90px" prop="appointmentStatus">
                <el-select v-model="searchForm.appointmentStatus">
                  <el-option label="已预约" value="1"></el-option>
                  <el-option label="未预约" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="患者姓名" label-width="90px" prop="patientName">
                <el-input v-model="searchForm.patientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话" label-width="90px" prop="phoneNum">
                <el-input v-model="searchForm.phoneNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="门诊/住院号" label-width="90px" prop="outPatientNo">
                <el-input v-model="searchForm.outPatientNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请医院" label-width="90px" prop="applyHospital">
                <el-select v-model="searchForm.applyHospital" placeholder="请选择医院">
                  <el-option label="江阴市中医院" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="申请医生" label-width="90px" prop="doctorName">
                <el-input v-model="searchForm.doctorName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="检查医院" label-width="90px" prop="checkHospital">
                <el-select v-model="searchForm.checkHospital" placeholder="请选择医院">
                  <el-option label="江阴市中医院" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="检查类型" label-width="90px" prop="checkType">
                <el-select v-model="searchForm.checkType">
                  <el-option label="CT" value="1"></el-option>
                  <el-option label="MR" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align:center">
              <el-button type="primary" @click="search">确认</el-button>
              <el-button @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
			</el-collapse-item>
		</el-collapse>

		<!--列表-->
		<el-table :data="appointmentList" border style="width: 100%;">
			<el-table-column prop="AppStatus" label="预约状态" width="120">
			</el-table-column>
			<el-table-column prop="ItemFee" label="费用" width="100">
			</el-table-column>
			<el-table-column prop="freeStatus" label="收费状态" width="100">
			</el-table-column>
			<el-table-column prop="ExcuteHospital" label="申请医院" width="120">
			</el-table-column>
			<el-table-column prop="AppDoctor" label="申请医生" width="120">
			</el-table-column>
			<el-table-column prop="applyDepartment" label="申请科室" width="120">
			</el-table-column>
			<el-table-column prop="OrderId" label="申请单号" width="120">
			</el-table-column>
			<el-table-column prop="Modality" label="陪检设备" width="120">
			</el-table-column>
			<el-table-column prop="BedNo" label="床号" width="120">
			</el-table-column>
			<el-table-column prop="PatientType" label="病人类型" width="120">
			</el-table-column>
			<el-table-column label="操作" width="140">
				<!-- <template scope="scope">
					<el-button type="text" class="el-icon-date" @click="appointment(scope.$index, scope.row)"> 预约</el-button>	
				</template> -->
				<template>
					<el-button type="text" class="el-icon-date" @click="dialogFormVisible = true" isEditOrNew='edit'> 修改</el-button>
          <el-button type="text" class="el-icon-date" @click="dialogFormVisible = true"> 取消</el-button>
          <el-button type="text" class="el-icon-date" @click="dialogFormVisible = true"> 重打</el-button>	
				</template>

        	<!-- <template slot-scope="scope">
					<el-button type="text" v-if="scope.row.AppStatus == '1'" 
					class="el-icon-edit" @click="dialogFormVisible = true; isEditOrNew='edit'"> 修改</el-button>
					<el-button type="text" v-if="scope.row.AppStatus == '1'" 
					class="el-icon-delete" @click="cancelAppointmentDialogOpen(scope.row)"> 取消</el-button>	
					<el-button type="text" v-if="scope.row.AppStatus == '0'" 
					class="el-icon-date" @click="dialogFormVisible = true; isEditOrNew='new'; selectDataItem=scope.row;"> 预约</el-button>
				</template> -->
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import { getUserList } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
        activeNames: ['1'],
				searchForm: {
					appointmentDate: '',
					hisNo: '',
					appointmentStatus: '',
					patientName: '',
					phoneNum: '',
					outPatientNo: '',
					applyHospital: '',
					doctorName: '',
					checkHospital: '',
					checkType: ''
        },
        isEditOrNew: 'new', // 新增还是编辑
        appointmentList: []
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
						searcahCondition: {
							AppBeginTime: this.dateFormatToString(this.searchForm.appointmentDate[0]),
							AppEndTime: this.dateFormatToString(this.searchForm.appointmentDate[1]),
							AppStatus: this.searchForm.appointmentStatus,
							PatientName: this.searchForm.patientName,
							PhoneNumber: this.searchForm.phoneNum,
							PatientId: this.searchForm.outPatientNo,
							APPHospital: this.searchForm.applyHospital,
							AppDoctor: this.searchForm.doctorName,
							ExcuteHospital: this.searchForm.checkHospital,
							StudyType:this.searchForm.checkType,
						},
					}
				}

				var patientParams = {
					msgHeader : '{"root":{"HeaderInfor":{"serviceName":"searchAppInfor"}}',
					msgBody : JSON.stringify(msgBody)
				}
				const res = await this.$http.post("/AppSearchInfor/searchInfor.asmx/callInterface", patientParams);
				if(res.data.length > 0){
					this.form = res.data[0];
				}
      },
      dateFormatToString(date){
				date = new Date(date);
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
			}
		}
	};

</script>

<style scoped>

</style>