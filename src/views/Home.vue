<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="6">
				<div class="logo">
					区域医技预约
				</div>
			</el-col>
			<el-col :span="14">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" :router="true" mode="horizontal" class="my-menu el-menu-demo" @open="handleopen" @close="handleclose" @select="handleselect">
					<!-- <template v-for="(item, index) in $router.options.routes">
						<el-menu-item :key="index" :index="item.path" v-if="!item.hidden">{{item.name}}</el-menu-item>
					</template> -->
					<el-menu-item index="/form">信息登记</el-menu-item>
					<el-menu-item index="/appointmentSearch">预约查询</el-menu-item>
					<el-menu-item index="/yytj">预约统计</el-menu-item>
					<el-menu-item index="/hmd">黑名单</el-menu-item>
					<el-menu-item index="/admin">后台管理</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<router-view></router-view>
			<!-- <section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section> -->
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 70px;
			line-height: 70px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo{
				text-align: center;
				font-size: 27px;
				font-weight: bold;
			}
			.my-menu{
				height: 70px;
				line-height: 70px;
				background: $color-primary;
				line-height: bold;
				.el-menu-item {
					height: 70px;
					line-height: 70px;
					font-size: 16px;
					background: $color-primary;
					color:#48576a;
					border-bottom: $color-primary;
				}
				.el-menu-item:hover {
					color: #fff;
					border-bottom: 5px solid #fff;;
				}
				.is-active{
					color: #fff;
					border-bottom: 5px solid #fff;;
				}
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 71px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>