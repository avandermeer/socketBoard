// const angular = require('angular'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
	entry: {
		app: './assets/js/boot.js',
		vendor: ['angular']
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'app.bundle.js'
	},
	// module: {
	// 	rules: [
	// 		{test: /\.(js|jsx)$/, use: 'babel-loader'}
	// 	]
	// },
	plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",

			filename: "vendor.js",
			// (Give the chunk a different name)

			minChunks: Infinity,
			// (with more entries, this ensures that no other module
			//  goes into the vendor chunk)
		}),
		// new HtmlWebpackPlugin({template: './src/index.html'})
	]
};

module.exports = config;