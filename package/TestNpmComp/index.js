import TestNpmComp from './index.vue'

/* istanbul ignore next */
TestNpmComp.install = Vue => {
	Vue.component(TestNpmComp.name, TestNpmComp)
}

export default TestNpmComp
