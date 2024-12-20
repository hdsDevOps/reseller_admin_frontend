const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;
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
    allowedHosts: ["all"]
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
        store: `store@http://localhost:4030/remoteEntry.js`,
				auth: `auth@http://localhost:4002/remoteEntry.js`,
				customer: `customer@http://localhost:4001/remoteEntry.js`,
				paymenthistory: `paymenthistory@http://localhost:4005/remoteEntry.js`,
				role: `role@http://localhost:4006/remoteEntry.js`,
				settings: `settings@http://localhost:4007/remoteEntry.js`,
				subscription: `subscription@http://localhost:4004/remoteEntry.js`,
				vouchernotification: `vouchernotification@http://localhost:4003/remoteEntry.js`,

        // store: `store@https://store.admin.gworkspace.withhordanso.com/remoteEntry.js`,
				// auth: `auth@https://userauth.admin.gworkspace.withhordanso.com/remoteEntry.js`,
				// customer: `customer@https://customer.admin.gworkspace.withhordanso.com/remoteEntry.js`,
				// paymenthistory: `paymenthistory@https://paymenthistory.admin.gworkspace.withhordanso.com/remoteEntry.js`,
				// role: `role@https://role.admin.gworkspace.withhordanso.com/remoteEntry.js`,
				// settings: `settings@https://settings.admin.gworkspace.withhordanso.com/remoteEntry.js`,
				// subscription: `subscription@https://subscription.admin.gworkspace.withhordanso.com/remoteEntry.js`,
				// vouchernotification: `vouchernotification@https://vouchernotification.admin.gworkspace.withhordanso.com/remoteEntry.js`,
      },
      exposes: {
        "./Navbar": "./src/components/Navbar.tsx",
        "./Header": "./src/components/Header.tsx",
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