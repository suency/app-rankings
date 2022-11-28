<template>
	<view>
		<view class="flex-col page">
			<view class="flex-row group space-x-14">
				<image class="image"
					src="/static/arrow_left.png" />
				<text class="text">BACK</text>
			</view>
			<view class="flex-col group_2">
				<view class="flex-col list space-y-12">
					<view class="flex-col items-start text-wrapper"><text class="font_1 text_5">More Infomation</text></view>
					<view class="flex-row justify-between">
						<text class="font_1">Privacy & Data</text>
					</view>
				</view>
				<view class="flex-col items-start text-wrapper"><text class="font_1 text_5">Get help</text></view>
				<view class="flex-col items-start text-wrapper view_2"><text class="font_1 text_5">Log out</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {

		}
	}
</script>

<style>
	body {
		background-color: #151515;
	}

	.page {
		padding: 142rpx 40rpx 98rpx;
		background-color: #151515;
		width: 100%;
		height: 80vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.group {
		padding: 0 8rpx;
	}

	.space-x-14>view:not(:first-child),
	.space-x-14>text:not(:first-child),
	.space-x-14>image:not(:first-child) {
		margin-left: 28rpx;
	}

	.image {
		margin-top: 4rpx;
		width: 28rpx;
		height: 32rpx;
	}

	.text {
		color: #ffffff;
		font-size: 28rpx;
		font-family: '.AppleSystemUIFont';
		line-height: 34rpx;
		letter-spacing: 4rpx;
		text-transform: uppercase;
	}

	.group_2 {
		margin-top: 96rpx;
	}

	.list {
		padding-bottom: 24rpx;
	}

	.space-y-12>view:not(:first-child),
	.space-y-12>text:not(:first-child),
	.space-y-12>image:not(:first-child) {
		margin-top: 24rpx;
	}

	.font_1 {
		font-size: 32rpx;
		font-family: '.AppleSystemUIFont';
		line-height: 36rpx;
		color: #ffffff;
	}

	.image_2 {
		margin-right: 8rpx;
		align-self: center;
		width: 18rpx;
		height: 22rpx;
	}

	.text-wrapper {
		padding: 50rpx 0 58rpx;
		background-color: #212121;
		border-radius: 40rpx;
	}

	.text_5 {
		margin-left: 40rpx;
	}

	.view_2 {
		margin-top: 24rpx;
	}

	.button {
		margin-top: 292rpx;
		padding: 24rpx 40rpx 16rpx;
		align-self: center;
		background-color: #212121;
		box-shadow: 0px 40rpx 60rpx 0px #00000066;
		border-radius: 56rpx;
		width: 439rpx;
	}

	.space-x-20>view:not(:first-child),
	.space-x-20>text:not(:first-child),
	.space-x-20>image:not(:first-child) {
		margin-left: 40rpx;
	}

	.image-wrapper {
		margin-top: 24rpx;
		width: 93rpx;
	}

	.image_6 {
		width: 46rpx;
		height: 48rpx;
	}

	.view_4 {
		margin-top: 0;
	}

	.image_7 {
		width: 93rpx;
		height: 103rpx;
	}

	.image_8 {
		width: 38rpx;
		height: 48rpx;
	}
</style>
