//Prettier 支持可以配置参数不多，2022.12.1日查看时，总共才 21 个，这里是所有参数的说明 prettier options
//参考地址：https://prettier.io/docs/en/options.html#print-width
//该文件修改，要重新启动vscode才能生效，否则不生效
//解决代码风格的的问题
module.exports = {
	printWidth: 120, //（默认值）单行代码超出 80 个字符自动换行
	tabWidth: 2, //（默认值）一个 tab 键缩进相当于 2 个空格
	useTabs: true, // 行缩进使用 tab 键代替空格
	semi: false, //（默认值）语句的末尾加上分号
	singleQuote: true, // 使用单引号
	quoteProps: 'as-needed', //（默认值）仅仅当必须的时候才会加上双引号
	jsxSingleQuote: true, // 在 JSX 中使用单引号
	trailingComma: 'all', // 不用在多行的逗号分隔的句法结构的最后一行的末尾加上逗号
	bracketSpacing: true, //（默认值）在括号和对象的文字之间加上一个空格
	bracketSameLine: false, // (默认值)元素的 > 单独占一行
	arrowParens: 'avoid', // 当箭头函数中只有一个参数的时候可以忽略括弧
	htmlWhitespaceSensitivity: 'ignore', // vue template 中的结束标签结尾尖括号掉到了下一行
	vueIndentScriptAndStyle: false, //（默认值）对于 .vue 文件，不缩进 <script> 和 <style> 里的内容
	endOfLine: 'lf', //(默认值) Linux and macOS as well as inside git repos
	// endOfLine:'crlf',                     //(默认值) Linux and macOS as well as inside git repos
	embeddedLanguageFormatting: 'auto', //（默认值）允许自动格式化内嵌的代码块
}
