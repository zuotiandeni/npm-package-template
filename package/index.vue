<template>
	<div>这是包内容</div>
</template>

<script>
export default {
	name: 'TestNpmComp',
	mounted() {
		this.test()
	},
	methods: {
		test() {
			const arr1 = [1, 2, 3].map(item => {
				console.log(item)
				return item
			})
			const arr = [1, 2, 3]
			console.log(arr.at(-1), arr1)
		},
	},
}
</script>

<style scoped></style>
