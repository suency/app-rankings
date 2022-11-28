<template>
	<view class="detailWrap">
		<view class="flex-row group space-x-14 back" @click="goback">
			<image class="image" src="/static/arrow_left.png" />
			<text class="text">BACK</text>
		</view>
		<view class="flex-col page space-y-24">
			<text class="text">{{info.showName}}</text>
			<view class="flex-col space-y-6">
				<view class="flex-row justify-between list-item"  v-for="(val, key, index) in info">
					<text class="font_1 text_2">{{key}}</text>
					<text class="font_1 text_4">{{val}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: function(option) {
			let resData = JSON.parse(option.info);
			delete resData.urlkey;
			this.info = resData
			//console.log(this.info)
		},
		data() {
			return {
				info:{}
			};
		},
		methods: {
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.detailWrap {
		box-sizing: border-box;
		padding-top: 80rpx;
	}

	.group {
		padding: 0 8rpx;
		margin-top: 30rpx;
		margin-left: 40rpx;
	}

	body {
		background-color: #151515;
	}

	.image {
		margin-top: 4rpx;
		width: 28rpx;
		height: 32rpx;
	}

	.font_1 {
		font-size: 32rpx;
		font-family: 'Helvetica';
		line-height: 38rpx;
		color: #ffffff;
	}

	.list-item {
		padding: 18rpx 40rpx 20rpx;
		background-color: #212121;
		border-radius: 20rpx;
	}

	.text_2 {
		margin-bottom: 4rpx;
	}

	.text_4 {
		margin-top: 4rpx;
	}

	.page {
		padding: 50rpx 40rpx;
		background-color: #151515;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.text {
		margin-left: 14rpx;
		align-self: flex-start;
		color: #ffffff;
		font-size: 28rpx;
		font-family: 'Helvetica';
		line-height: 34rpx;
		letter-spacing: 4rpx;
		text-transform: uppercase;
	}

	.space-y-24>view:not(:first-child),
	.space-y-24>text:not(:first-child),
	.space-y-24>image:not(:first-child) {
		margin-top: 48rpx;
	}

	.space-y-6>view:not(:first-child),
	.space-y-6>text:not(:first-child),
	.space-y-6>image:not(:first-child) {
		margin-top: 12rpx;
	}
</style>
