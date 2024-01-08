// 解决代码中存在的问题避免错误,关闭：0，警告：1，错误：2
module.exports = {
	// 规则到此不往上找
	root: true,
	// env环境设置，预定义全局变量,这些环境并不是互斥的，所以你可以同时定义多个
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	// 扩展风格，extends属性值可以省略包名的前缀 eslint-config-
	extends: [
		'plugin:vue/recommended',
		'airbnb-base',
		// 'prettier', // eslint-config-prettier 来关掉 (disable) 所有和 Prettier 冲突的 ESLint 的配置,prettier 一定要是最后一个，才能确保覆盖
		'plugin:prettier/recommended', // 同时使用了 eslint-plugin-prettier 和 eslint-config-prettier 可以这么配置
	],
	settings: {
		'import/resolver': { webpack: { config: 'build/webpack.config.js' } },
	},
	// 针对个别文件设置新的检查规则
	// 要为特定类型的文件指定处理器，请使用 overrides 键和 processor 键的组合
	// 若要禁用一组文件的配置文件中的规则，请使用 overrides 和 files
	overrides: [],
	parserOptions: {
		// 指定要使用的 ECMAScript 版本
		ecmaVersion: 'latest',
		// 设置为 script (默认) 或 module（如果你的代码是 ECMAScript 模块)
		sourceType: 'module',
	},
	// 插件名称可以省略 eslint-plugin- 前缀。插件可以处理除js外的别的文件格式，引入插件的目的就是为了增强 ESLint 的检查能力和范围。
	plugins: ['vue', 'prettier'],
	// 规则列表// https://github.com/airbnb/javascript
	rules: {
		// 提醒你不要直接修改函数的入参，为这个规则添加一个白名单，即指定的入参名称不予限制
		// 'no-param-reassign': [
		// 	'error',
		// 	{
		// 		props: true,
		// 		ignorePropertyModificationsFor: [
		// 			'e', // for e.returnvalue
		// 			'ctx', // for Koa routing
		// 			'req', // for Express requests
		// 			'request', // for Express requests
		// 			'res', // for Express responses
		// 			'response', // for Express responses
		// 			'state', // for vuex state
		// 		],
		// 	},
		// ],
		// 提醒你不要直接修改函数的入参
		'no-param-reassign': 0,
		// .vue文件必须是多个字符
		'vue/multi-word-component-names': 0,
		// 禁止变量声明覆盖外层作用域的变量
		'no-shadow': ['error', { allow: ['state', 'getters'] }],
	},
}
