const Dotenv = require('dotenv-webpack');

module.exports = {
	publicPath: '/project-tz',
	configureWebpack: {
		plugins: [
			new Dotenv()
		],
	},
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
					@import "@/assets/_variables.scss";
				`
			}
		}
	}
};
