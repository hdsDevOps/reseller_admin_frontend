const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
	output: {
		publicPath: "auto",
	},
                    
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},
      
	devServer: {
		port: 4001,
		historyApiFallback: true,
		allowedHosts: ["all"],
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},

	plugins: [
		new ModuleFederationPlugin({
			name: "customer",
			filename: "remoteEntry.js",
			remotes: {
				store: "store@https://store.admin.gworkspace.withhordanso.com/remoteEntry.js",
			},
			exposes: {
				"./Cart": "./src/components/Cart.tsx",
				"./CustomerApp": "./src/pages/index.tsx",
				"./Css": "./src/custom.css",
			},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
		new Dotenv(),
	],
});
