<template>
	<div>

		<el-form label-position="left" label-width="200px" :model="forms[userType]" :rules="rules" ref="form">
			<!-- 用户类型选择 -->
			<el-form-item label="用户类型">
				<el-select v-model="userType" placeholder="请选择">
					<el-option v-for="(item,key) in forms" :key="key" :label="key" :value="key"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item v-if="userType==='ChinaIndividual'" label="证件类型">
				<el-select v-model="idType" placeholder="请选择">
					<el-option v-for="(item,key) in idTypes" :key="key" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item v-if="!item.idType||item.idType===idType" v-for="(item,key) in forms[userType]" :key="key" :prop="key" class="formItem" :label="item.label">
				<div v-if="item.type==='string'">
					<el-input @change="update" v-model="item.value"></el-input>
					<span class="tips">{{item.tips}}</span>
				</div>
				<div v-else>
					<input class="imginput" type="file" :id="key" :ref="key" @change="imgChange(key)">
					<label class="imglabel" :for="key">上传图片</label>
					<span class="tips">{{item.tips}}</span>
					<div>
						<img :src="item.src" width="200px" height="200px" alt="">
					</div>
				</div>
			</el-form-item>

		</el-form>
		<div style="text-align:center;margin-bottom:200px;">
			<el-button @click="goNext">Next-></el-button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import { upLoadImg, doPatch, imgGet, doPost, doGet } from '@/api/api'
import { forms, rules } from './config.js'
export default {
	data() {
		return {
			userType: 'ChinaIndividual',
			idType: 'ChinaId',
			idTypes: ['ChinaId', 'Passport', 'HongKongMacauPermit', 'TaiwanPermit', 'Other'],
			forms: forms,
			rules: rules,
			fileList2: [],
			src: '',
			dirty: true
		}
	},
	mounted() {
		this.formInit();


	},
	destroyed() {
		window.removeEventListener('beforeunload', this.beforeunloadHandler)
	},
	computed: {
		...mapGetters(['profile']),

	},

	methods: {
		update(e) {
			if (this.dirty) {
				window.addEventListener('beforeunload', this.beforeunloadHandler);
				this.dirty = false;
			}
		},
		beforeunloadHandler(e) {
			e = e || window.event;
			console.log(e);
			// 兼容IE8和Firefox 4之前的版本  
			if (e) {
				e.returnValue = '关闭提示';
			}
			// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+  
			return '关闭提示';

		},
		imgChange(key) {
			if (this.dirty) {
				window.addEventListener('beforeunload', this.beforeunloadHandler);
				this.dirty = false;
			}
			let inputDOM = this.$refs[key][0];
			if (!inputDOM.files[0] || inputDOM.files[0].type.indexOf('image') == -1) return;
			// let size = Math.floor(inputDOM.files[0].size / 1024);
			// if (size > 2000) return;
			const formData = new FormData();
			formData.append('file', inputDOM.files[0]);
			this.upimg(formData, key);
		},
		upimg(formData, key) {
			upLoadImg(`/stores/${this.storeId}/private-images`, formData)
				.then(res => {
					this.forms[this.userType][key].value = res.data._id;
					let privateImageId = res.data._id;
					imgGet(`/stores/${this.storeId}/private-images/${privateImageId}/serve`).then(data => {
						this.forms[this.userType][key].src = data;
					})
				})
		},
		formPatch() {
			let obj = {};
			obj.type = this.userType;
			if (this.userType === 'ChinaIndividual') {
				obj.individualIdType = this.idType;
			}
			let form = this.forms[this.userType]
			for (var key in form) {
				if (!form[key].idType || form[key].idType === this.idType) {
					console.log(form[key].value);
					if (form[key].idType && form[key].idType === 'TaiwanPermit') {
						let k = key.substr(2);
						obj[k] = form[key].value;
					} else {
						obj[key] = form[key].value;

					}
				}
			}
			return doPatch(`/stores/${this.storeId}/verify-profile`, obj).then(res => {
				console.log(res);
				return doGet(`/stores/${this.storeId}/verify-profile`).then(res => {
					this.$store.dispatch('setProfile', res.data)
				})
			})
		},
		goNext() {
			this.formPatch().then(() => {
				this.$router.replace({ path: 'step3' })
			})
		},
		formInit: async function () {
			this.userType = this._(this.profile, 'type') || 'ChinaIndividual'
			this.idType = this._(this.profile, 'individualIdType') || 'ChinaId'
			if (this.idType === 'TaiwanPermit') {
				this.profile.TWindividualPermitId = this.profile.individualPermitId;
				this.profile.TWindividualPermitPhotoFront = this.profile.individualPermitPhotoFront;
				this.profile.TWindividualPermitPhotoBack = this.profile.individualPermitPhotoBack;
				delete this.profile.individualIdType;
				delete this.profile.individualPermitPhotoFront;
				delete this.profile.individualPermitPhotoBack;
			}
			for (var key in this.forms[this.userType]) {

				this.forms[this.userType][key].value = this._(this.profile, key);
				let privateImageId = this.forms[this.userType][key].value
				if (this.forms[this.userType][key].type === 'image' && privateImageId) {
					await imgGet(`/stores/${this.storeId}/private-images/${privateImageId}/serve`).then(data => {
						this.forms[this.userType][key].src = data;
					})
				}
			}
			console.log(this.forms);
			this.$refs.form.validate();
		}
	},
	components: {
	},

}
</script>


<style lang="scss" scoped>
.formItem {
  position: relative;
  .tips {
    color: #aaa;
    font-size: 12px;
    line-height: 10px;
  }
  .imginput {
    position: absolute;
    left: -9999px;
  }
  .imglabel {
    display: block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    background: #409eff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    margin: 10px 0;
  }
}
</style>
<style>
.el-select .el-input {
  /* width: 600px; */
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-form-item__content {
  line-height: 16px;
}
</style>