<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
	created() {
		this.$i18n.locale = localStorage.getItem('language')
	},
	data() {
		return {
			active: 0
		}
	},
	mounted() {
		this.$i18n.locale = localStorage.getItem('language')
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
			this.active--;
			this.goPath();

		},
		goPath() {
			let path;
			switch (this.active) {
				case 0: path = 'verifyBusinessOne'; break;
				case 1: path = 'verifyBusinessTwo'; break;
				case 2: path = 'verifyBusinessThree'; break;
			}
			this.$router.replace({ path: path })
		},

	}

}
</script>

<style lang="scss" >
@import '/css/spacing.css';
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
html{
	height: 100%;
}
body{
	height: 100%;
}
#app{
	height: 100%;
	background: #fafafa;
}
</style>
