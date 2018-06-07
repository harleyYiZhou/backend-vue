<template>
	<div class="one">
		<h2>Verify Business</h2>
		<p>Why?</p>
		<p>
			Please verify business before 2018-30 we will delete your store if not refied
		</p>
		<div style="text-align:center">
			<el-button @click="goNext">Next-></el-button>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		goNext() {
			this.$router.replace({ path: 'step2' })
		},
	}
}
</script>

<style lang="scss">
.one {
  text-align: center;
}
</style>
