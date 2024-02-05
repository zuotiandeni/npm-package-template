const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	mode: 'production',
	// devtool:'source-map',
	entry: './package/index.js',
	output: {
		path: path.resolve(__dirname, '../'),
		publicPath: '/dist/',
		filename: 'index.js',
		chunkFilename: '[id].js',
		libraryExport: 'default', // 有了它就可以解构export default的对象了
		libraryTarget: 'commonjs2',
	},
	externals: {
		vue: 'Vue', // 排除 Vue
		'element-ui': {
			// 排除 ElementUI
			commonjs: 'element-ui',
			commonjs2: 'element-ui',
			amd: 'element-ui',
			root: 'ELEMENT',
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											// 其他选项
										},
									],
								],
							},
						},
					},
				],
			},
			{
				test: /\.less$/i,
				use: [
					// compiles Less to CSS
					'style-loader',
					'css-loader',
					'less-loader',
				],
			},
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				use: 'vue-loader',
			},
		],
	},
	plugins: [
		// make sure to include the plugin!
		new VueLoaderPlugin(),
	],
}
