<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl"
				class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<span :class="['mui-control-item',item.id === 0?'mui-active':'']" data-wid="tab-top-subpage-1.html"
						v-for="(item,i) in category" :key="i" @click="getPhotoByCategory(item.id)">
						{{item.title}}
					</span>
				</div>
			</div>
		</div>
		<ul class="lazyul">
			<router-link tag="li" v-for="item in photolist" :key="item.id" :to="'/home/photoinfo/' + item.id">
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{item.title}}</h1>
					<div id="info-content">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
	</div>
</template>
<script>
	import mui from '../../../lib/mui/js/mui.js';
	export default {
		data() {
			return {
				category: [],
				photolist: []
			}
		},
		created() {
			this.getPhotoCategory();
			this.getPhotoByCategory(0);
		},
		methods: {
			async getPhotoCategory() {
				const {
					data
				} = await this.$http.get('http://api.cms.liulongbin.top/api/getimgcategory');
				if (data.status === 0) {
					data.message.unshift({
						title: '全部',
						id: 0
					});
					this.category = data.message;
				}
			},
			async getPhotoByCategory(id) {
				const {
					data
				} = await this.$http.get('http://api.cms.liulongbin.top/api/getimages/' + id);
				if (data.status === 0) {
					this.photolist = data.message;
				}
			}
		},
		mounted() {
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		}
	}
</script>
<style lang="less" scoped>
	.mui-slider {
		touch-action: none;
	}

	.lazyul {
		margin: 0;
		padding: 10px;

		li {
			background-color: #ccc;
			text-align: center;
			box-shadow: 0 0 7px gray;
			position: relative;

			&+li {
				margin-top: 10px;
			}

			img {
				vertical-align: middle;
				width: 100%;
			}

			img[lazy=loading] {
				width: 40px;
				height: 300px;
				margin: auto;
			}
		}
	}

	.info {
		color: #fff;
		position: absolute;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		max-height: 86px;
		overflow: hidden;

		.info-title {
			font-size: 14px;
		}

		.info-content {
			font-size: 13px;
		}
	}
</style>