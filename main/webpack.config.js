const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

module.exports = (_, argv) => ({
  output: {
    publicPath: "auto",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
    
	devServer: {
		port: 4000,
		historyApiFallback: true,
		allowedHosts: ["all"],
		watchFiles: [path.resolve(__dirname, 'src')],
		onListening: function (devServer) {
		  const port = devServer.server.address().port
	
		  printCompilationMessage('compiling', port)
	
		  devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
			setImmediate(() => {
			  if (stats.hasErrors()) {
				printCompilationMessage('failure', port)
			  } else {
				printCompilationMessage('success', port)
			  }
			})
		  })
		}
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
			name: "main",
			filename: "remoteEntry.js",
			remotes: {
				store: "https://store.admin.gworkspace.withhordanso.com/remoteEntry.js",
				auth: "https://auth.admin.gworkspace.withhordanso.com/remoteEntry.js",
				customer: "https://customer.admin.gworkspace.withhordanso.com/remoteEntry.js",
				paymenthistory: "https://paymenthistory.admin.gworkspace.withhordanso.com/remoteEntry.js",
				role: "https://role.admin.gworkspace.withhordanso.com/remoteEntry.js",
				settings: "https://settings.admin.gworkspace.withhordanso.com/remoteEntry.js",
				subscription: "https://subscription.admin.gworkspace.withhordanso.com/remoteEntry.js",
				vouchernotification: "https://vouchernotification.admin.gworkspace.withhordanso.com/remoteEntry.js",
			},
			exposes: {},
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
    new Dotenv()
  ],
});
