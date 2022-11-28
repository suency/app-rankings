<template>
	<view class="dark_mode">
		<view :class="{'popup-show':displayConfirm}" class="flex-col page space-y-30">
			<view class="topHeader">
				<text class="text">RANKINGS</text>
				<view class="search" @click="search">
					<image src="/static/search.png" />
				</view>
			</view>
			
			<view class="flex-col space-y-27">
				<view class="flex-row justify-between section_2">

					<view v-for="(item,index) in menu_list" class="flex-col font_1" :key="index"
						@click="swichMenu(index)" :class="{ 'text-wrapper': item.isActive }">{{item.name}}</view>
				</view>
				<!-- <image src="/static/amd_1.png"></image> -->
				<view class="flex-col section_3">
					<view class="flex-col list">
						<view v-show="menu_list[0].isActive" @click="details(item)" style="position: relative;" class="flex-row list-item"
							:key="i" v-for="(item, i) in filterGPUList">
							<text class="font_2 text_4">{{item.rank}}</text>
							<view :class="[item?.gpuVendor=='Nvidia'?'nvidia':'amd']" class="iconSize">{{item?.gpuVendor=='Nvidia'?'N':'A'}}</view>
							<!-- <image class="image image_2"
								:src="item?.gpuVendor=='Nvidia'?'/static/nvidia_1.png':'/static/amd_1.png'" /> -->
							<view class="flex-col items-start group_3 space-y-9">
								<text class="font_3">{{item.showName}}</text>
								<text class="font_4 text_6">{{item.score}} SCORE</text>
								<!-- <image class="arrow_right" src="/static/Foward.png" /> -->
								<!-- <view class="arrow_right">
									>
								</view> -->
							</view>
						</view>
						<view v-show="menu_list[1].isActive" @click="details(item)" style="position: relative;" class="flex-row list-item" 
							:key="i" v-for="(item, i) in filterCPUList">
							<text class="font_2 text_4">{{item.rank}}</text>
							<view :class="[item?.kernel==''?'amd':'intel']" class="iconSize">{{item?.kernel==''?'A':'I'}}</view>
							<!-- <image class="image image_2"
								:src="item?.kernel==''?'/static/amd_1.png':'/static/intel.png'" /> -->
							<view class="flex-col items-start group_3 space-y-9">
								<text class="font_3">{{item.showName}}</text>
								<text class="font_4 text_6">{{item.score}} SCORE</text>
								<!-- <image class="arrow_right" src="/static/Foward.png" /> -->
								<!-- <view class="arrow_right">
									>
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="masksearch" v-if="displayConfirm" @click="searchButton">
			<view class="flex-col section_7 space-y-26">
			  <text class="font_4 text_10">Search Keyword</text>
			  <view class="flex-col">
			    <view class="flex-col items-start text-wrapper_3">
					
					<input v-model="searchContent" class="uni-input" focus placeholder="type your search name" placeholder-style="line-height:50rpx"/>
					</view>
			    <view class="flex-col items-center button"><text class="text_12">Search</text></view>
			  </view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		onReady() {
		uni.setNavigationBarColor({
		        frontColor: '#ffffff'
		    })	
		},
		data() {
			return {
				displayConfirm:false,
				searchContent:"",
				gpu_list: [
					/* {
					"showName": "AMD Ryzen Threadripper P",
					"score": 1976866,
					"rank": 1,
					"platformType": 0,
					"coreNum": "64",
					"threadNum": "128",
					"coreSpeed": "2.70 GHz",
					"maxSpeed": "4.50 GHz",
					"tdp": "280 W",
					"memoryType": "",
					"launchPrice": "",
					"launchDate": "",
					"1stCache": "32 KB, 16-Way, 64 byte lines",
					"2ndCache": "64 x 512 KB, 8-Way, 64  byte lines",
					"3rdCache": "256 MB, 8-Way, 64 byte lines",
					"memoryChannels": "8",
					"socket": "sWRX8",
					"kernel": "",
					"series": "Ryzen Threadripper PRO",
					"urlkey": "65499749286b2aa103562f3ba26ecb9b",
					"defeat": "100.00"
				} */
				],
				cpu_list: [
					/* {
					    "showName": "AMD Ryzen Threadripper PRO 5995WX",
					    "score": 1976866,
					    "rank": 1,
					    "platformType": 0,
					    "coreNum": "64",
					    "threadNum": "128",
					    "coreSpeed": "2.70 GHz",
					    "maxSpeed": "4.50 GHz",
					    "tdp": "280 W",
					    "memoryType": "",
					    "launchPrice": "",
					    "launchDate": "",
					    "1stCache": "32 KB, 16-Way, 64 byte lines",
					    "2ndCache": "64 x 512 KB, 8-Way, 64  byte lines",
					    "3rdCache": "256 MB, 8-Way, 64 byte lines",
					    "memoryChannels": "8",
					    "socket": "sWRX8",
					    "kernel": "",
					    "series": "Ryzen Threadripper PRO",
					    "urlkey": "65499749286b2aa103562f3ba26ecb9b",
					    "defeat": "100.00"
					} */
				],
				menu_list: [{
					name: "GPU",
					id: 1,
					isActive: true
				}, {
					name: "CPU",
					id: 1,
					isActive: false
				}]
			};
		},
		mounted() {
			this.requestData({
				which: 'web_gpu',
				whichList: '',
				platformType: 'desktop'
			})
			this.requestData({
				which: 'web_cpu',
				whichList: '',
				platformType: 'desktop'
			})
		},
		computed:{
			filterGPUList(){
				let that = this;
				return that.gpu_list.filter((item,index)=>{
					return item.showName.includes(that.searchContent)
				})
			},
			filterCPUList(){
				let that = this;
				return that.cpu_list.filter((item,index)=>{
					return item.showName.includes(that.searchContent)
				})
			}
		},
		methods: {
			searchButton(){
				//console.log(this.searchContent)
				uni.showTabBar()
				this.displayConfirm = false
			},
			details(info){
				uni.navigateTo({
					url: '/pages/details/details?info='+ JSON.stringify(info)
				});
				console.log(info)
			},
			search(){
				this.displayConfirm = true
				uni.hideTabBar()
			},
			swichMenu(index) {
				this.menu_list.forEach((e, i) => {
					e.isActive = false
				})
				this.menu_list[index].isActive = true
				/* if (index === 0) {
					this.requestData({
						which: 'web_gpu',
						whichList: '',
						platformType: 'desktop'
					})
				} else {
					this.requestData({
						which: 'web_cpu',
						whichList: '',
						platformType: 'desktop'
					})
				} */
				//this.requestData()
			},
			requestData({
				which,
				whichList,
				platformType
			}) {
				uni.showLoading({
					title: 'Loading data...'
				});
				let that = this
				let url = ''
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						console.log('运行Android上');
						url = 'http://www1.ludashi.com/web/getRankingList'
						//url = '/web/getRankingList'
						break;
					case 'ios':
						console.log('运行iOS上');
						url = 'http://www1.ludashi.com/web/getRankingList'
						break;
					default:
						console.log('运行在开发者工具上');
						url = '/web/getRankingList'
						break;
				}

				//http://www1.ludashi.com/web/getRankingList

				uni.request({
					url, //仅为示例，并非真实接口地址。'/web/getRankingList'
					method: 'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						which,
						whichList,
						platformType
					},
					success: function(res) {
						if (which === "web_gpu") {
							//that.gpu_list = Object.freeze(res.data.data)
							that.gpu_list = res.data.data
						} else {
							//that.cpu_list = Object.freeze(res.data.data)
							that.cpu_list = res.data.data
						}

						uni.hideLoading()
						//console.log(that.gpu_list);
					}
				});
			}
		},
	};
</script>

<style lang="scss">
	.dark_mode {
		background-color: #151515;

		.page {
			background-color: #151515;
		}

		.text {
			background-image: radial-gradient(ellipse 87.25% 497.63% at 95.36% 14.36%, #ffcf14 0%, #ee8fff 55.86%, #38deff 100%);
		}

		.section_2 {
			background-color: #212121;
		}

		view.text-wrapper {
			background-image: radial-gradient(ellipse 89.84% 298.54% at 95.36% 14.36%, #ffd840 0%, #f3acff 55.86%, #8aecff 100%);
			color: #000000;
		}

		.font_1 {
			color: #ffffff;
		}

		.text_2 {
			color: #000000;
		}

		.section_3 {
			background-color: #212121;
		}

		.list-item {
			border-bottom: solid 2rpx #2c2c2c;
		}

		.font_2 {
			color: #ffffff;
		}

		.font_3 {
			color: #ffffff;
		}

		.font_4 {
			color: #8e8e93;
		}
	}

	.light_mode {
		.page {
			background-color: #ffffff;
		}

		.text {
			background-image: radial-gradient(ellipse 87.25% 497.63% at 95.36% 14.36%, #ffcf14 0%, #ee8fff 55.86%, #38deff 100%);
		}

		.section_2 {
			background-color: #f8f8f9;
		}

		view.text-wrapper {
			background-image: radial-gradient(ellipse 89.84% 298.54% at 95.36% 14.36%, #ffd840 0%, #f3acff 55.86%, #8aecff 100%);
			color: #ffffff;
		}

		.font_1 {
			color: #000000;
		}

		.text_2 {
			color: #ffffff;
		}

		.section_3 {
			background-color: #f8f8f9;
		}

		.list-item {
			border-bottom: solid 2rpx #ebebeb;
		}

		.font_2 {
			color: #000000;
		}

		.font_3 {
			color: #000000;
		}

		.font_4 {
			color: #8e8e93;
		}
	}
	
	body{
		background-color: #151515;
	}
	
	.iconSize{
		width: 50rpx;
		height: 50rpx;
		color:#ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20rpx 20rpx 0 20rpx;
	}
	.nvidia{
		background: #4caf50;
	}
	.amd{
		background: #e3163d;
	}
	.intel{
		background: #0072bb;
	}
	
	.popup-show {
	        overflow: hidden;
	        position: fixed;
	        height: 100%;
	        width: 100%;
	    }
	/* mask */
	.uni-input{
		color:#ffffff;
		padding-left: 20rpx;
		font-size: 38rpx;
		line-height: 20rpx;
	}
	.masksearch{
		position: fixed;
		width: 100vw;
		top:0;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.5);
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		padding: 50rpx;
		overflow: hidden;
	}
	
	.section_7 {
	  margin: 0 40rpx;
	  padding: 74rpx 50rpx 64rpx 64rpx;
	  background-color: #212121;
	  box-shadow: 0px 40rpx 60rpx 0px #00000066;
	  border-radius: 48rpx;
	  position: relative;
	  width: 100%;
	}
	
	.font_4 {
	  font-size: 50rpx;
	  font-family: 'Helvetica';
	  letter-spacing: -0.04rpx;
	  line-height: 58rpx;
	  color: #ffffff;
	}
	
	.text_10 {
	  align-self: flex-start;
	  font-size: 48rpx;
	}
	.text-wrapper_3 {
	  padding: 32rpx 0 30rpx;
	  background-color: #151515;
	  border-radius: 40rpx;
	  border: solid 4rpx #4e4e4e;
	}
	.button {
	  margin: 50rpx 8rpx 0;
	  padding: 40rpx 0 46rpx;
	  background-image: radial-gradient(ellipse 88.36% 372.77% at 95.36% 14.36%, #ffd840 0%, #f3acff 55.86%, #8aecff 100%);
	  border-radius: 44rpx;
	}
	.text_11 {
	  margin-left: 52rpx;
	  font-size: 48rpx;
	}
	.text_12 {
	  color: #000000;
	  font-size: 36rpx;
	  font-family: '.AppleSystemUIFont';
	  line-height: 42rpx;
	}
	.space-y-26 > view:not(:first-child),
	.space-y-26 > text:not(:first-child),
	.space-y-26 > image:not(:first-child) {
	  margin-top: 52rpx;
	}
	/* mask */
	
	.topHeader{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.search image{
		width: 40rpx;
		height: 40rpx;
	}
	.search{
		width: 80rpx;
		height: 80rpx;
		background-color: #212121;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.arrow_right {
		position: absolute;
		right: 10rpx;
		top:40rpx;
		width: 20rpx;
		height: 20rpx;
		color:#ffffff;
	}

	.page {
		padding: 120rpx 28rpx 0 40rpx;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.space-y-30>view:not(:first-child),
	.space-y-30>text:not(:first-child),
	.space-y-30>image:not(:first-child) {
		margin-top: 30rpx;
	}

	.text {
		margin-left: 40rpx;
		color: transparent;
		font-size: 80rpx;
		font-family: 'Helvetica';
		line-height: 96rpx;
		letter-spacing: -0.04rpx;
		-webkit-background-clip: text;
	}

	.space-y-27>view:not(:first-child),
	.space-y-27>text:not(:first-child),
	.space-y-27>image:not(:first-child) {
		margin-top: 30rpx;
	}

	.section_2 {
		margin-left: 12rpx;
		padding: 16rpx 16rpx;
		border-radius: 64rpx;
	}

	.font_1 {
		border-radius: 48rpx;
		font-size: 36rpx;
		font-family: 'Helvetica';
		line-height: 44rpx;
		width: 319rpx;
		height: 96rpx;
		padding: 24rpx 0 28rpx;
		align-items: center;
	}

	.text_3 {
		margin-right: 120rpx;
		align-self: center;

	}

	.section_3 {
		margin-right: 12rpx;
		padding: 4rpx 0 50rpx;
		overflow-y: scroll;
		/* border-radius: 48rpx 48rpx 0 0; */
		border-radius: 48rpx;
		width: 100%;
		height: 69vh;
	}

	.list {
		margin: 0 25rpx;
	}

	.list-item {
		padding: 40rpx 20rpx 38rpx;
	}

	.font_2 {
		font-size: 32rpx;
		font-family: '.AppleSystemUIFont';
		letter-spacing: -0.02rpx;
		line-height: 36rpx;
	}

	.text_4 {
		align-self: center;
	}

	.image {
		flex-shrink: 0;
		border-radius: 50%;
		width: 88rpx;
		height: 96rpx;
	}

	.image_2 {
		margin-left: 20rpx;
	}

	.group_3 {
		margin: 4rpx 0 4rpx 8rpx;
		flex: 1 1 auto;
	}

	.space-y-9>view:not(:first-child),
	.space-y-9>text:not(:first-child),
	.space-y-9>image:not(:first-child) {
		margin-top: 18rpx;
	}

	.font_3 {
		font-size: 32rpx;
		font-family: '.AppleSystemUIFont';
		line-height: 36rpx;
	}

	.font_4 {
		font-size: 28rpx;
		font-family: '.AppleSystemUIFont';
		letter-spacing: -0.02rpx;
		line-height: 36rpx;
	}

	.text_6 {
		line-height: 34rpx;
	}
</style>
