<template>
	<div>
		<div style="text-align:center">
			<div id="qrcode" ref="qrcode">
			</div>
			<div>{{time}}</div>
			<el-button @click="goNext">Submit</el-button>
		</div>
	</div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
	mounted() {
		this.qrcode();
		this.reload();
	},
	data() {
		return {
			time: new Date(),
		}
	},
	methods: {
		qrcode() {
			let qrcode = new QRCode('qrcode', {
				width: 100,
				height: 100, // 高度  
				text: 'http://www.baidu.com' // 二维码内容  
				// render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
				// background: '#f0f'  
				// foreground: '#ff0'  
			})
			console.log(qrcode)
		},
		goNext() {

		},
		reload() {
			setInterval(() => {
				this.time = new Date();
			}, 1000)
		}
	}
}
</script>

<style>
</style>
