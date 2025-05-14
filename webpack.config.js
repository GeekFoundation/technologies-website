/**
 * Webpack Config
 */

// Dependencies
import webpack from 'webpack';

// Config
import TerserPlugin        from 'terser-webpack-plugin';
import { env, js as config } from './gulpfile.babel.js/config/app';

// Plugins

/**
 * The webpack configuration object.
 * @typedef {Object} WebpackConfig
 * @property {string} mode - The mode webpack is configured to run in, either 'production' or 'development'
 * @property {Object} entry - The entry points for the webpack bundle
 * @property {Object} module - The configuration object for webpack's module handling
 * @property {Object} output - The configuration object for webpack's output handling
 * @property {Object} optimization - The configuration object for webpack's optimization handling
 * @property {boolean} optimization.usedExports - Indicates whether webpack should identify and remove unused exports from the final bundle
 * @property {boolean} optimization.minimize - Indicates whether webpack should minimize the final bundle
 * @property {Array} optimization.minimizer - An array of minimizer plugins to use with webpack
 * @property {Array} plugins - An array of plugins to use with webpack
 */

/**
 * The webpack configuration object.
 * @type {WebpackConfig}
 */
const webpackConfig = {
	mode   : env.isProduction ? 'production' : 'development', // Set the mode based on whether we're in production
	entry  : config.entry, // Set the entry points for the webpack bundle
	module : config.module, // Set the module handling configuration object
	output : {
		filename : '[name].js', // Set the output filename for the webpack bundle
	},
	optimization : {
		usedExports : true, // Tell webpack to identify and remove unused exports
		minimize    : true, // Tell webpack to minimize the final bundle
		minimizer   : [
			new TerserPlugin({ // Use the TerserPlugin to minimize the final bundle
				parallel : 4,
				include  : /\.min\.js$/,
			}),
		],
	},
	plugins : [
		new webpack.BannerPlugin({ // Use the BannerPlugin to add a banner to the final bundle
			banner : config.banner,
		}),
	],
};

if (env.isProduction) {
	console.log('\x1b[42m\x1b[30m%s\x1b[0m', 'Production mode');
	webpackConfig.devtool = 'hidden-source-map';
} else {
	console.log('\x1b[47m\x1b[31m%s\x1b[0m', 'Development mode');
	webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig; // Export the webpack configuration object
