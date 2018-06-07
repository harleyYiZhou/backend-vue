<template>
	<div class="container layout">
		<div class="goBack">
			<i @click="goBack" v-show="this.active-1" class="el-icon-back"></i>
		</div>
		<el-steps :active="active-1" class="step" finish-status="success">
			<el-step :title="active===1?'进行中':active>1?'已完成':''"></el-step>
			<el-step :title="active===2?'进行中':active>2?'已完成':''"></el-step>
			<el-step :title="active===3?'进行中':active>3?'已完成':''"></el-step>
		</el-steps>
		<router-view />

	</div>
</template>

<script>
import { doGet } from '@/api/api.js'
export default {
	name: 'App',
	mounted() {
		this.getStatus();
	},
	computed: {
		active() {
			return parseInt(this.$route.name.substr(-1, 1))
		}
	},
	data() {
		return {
			// active: 0
		}
	},
	methods: {
		goNext() {
			if (this.active === 2) {
				return;
			}
			this.active++;
			this.goPath();
		},
		goBack() {
			if (this.active - 1) {
				this.$router.replace({ path: 'step' + (this.active - 1) })
			}
		},
		goPath() {
			let path;
			switch (this.active) {
				case 0: path = 'step1'; break;
				case 1: path = 'step2'; break;
				case 2: path = 'step3'; break;
			}
			this.$router.replace({ path: path })
		},
		getStatus() {
			doGet(`/stores/${this.storeId}/verify-profile`).then(res => {
				this.$store.dispatch('setProfile', res.data).then(() => {
					console.log('success');
				})
			})
		}
	}

}
</script>

<style lang="scss" >
.step {
  margin-bottom: 40px;
}
.layout {
  margin-top: 60px;
  .goBack {
    margin-bottom: 20px;
    cursor: pointer;
    font-size: 26px;
  }
}
</style>
