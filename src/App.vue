<template>
	<div>
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
	mounted() {
	},
	data() {
		return {
			active: 0
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
