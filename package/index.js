import TestNpmComp from './TestNpmComp/index'

export default {
	// installOptions：根据自己实际需求去确认是否需要，或者字段等...
	install: Vue => {
		Vue.component(TestNpmComp.name, TestNpmComp)
	},
	TestNpmComp,
}
