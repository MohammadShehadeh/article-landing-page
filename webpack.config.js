const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		script: './src/assets/js/script.js',
	},
	output: {
		path: path.resolve(__dirname, './public/dist/js/'),
		filename: '[name].js',
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'src/assets/img', to: path.resolve(__dirname, './public/dist/img/') },
				{ from: 'src/views', to: path.resolve(__dirname, './public/') },
			],
		}),
	],
};