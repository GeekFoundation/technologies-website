/**
 * This task processes JavaScript files.
 */
import gulp          from 'gulp'; // Gulp task runner
import plumber       from 'gulp-plumber'; // Error handler for Gulp
import notify        from 'gulp-notify'; // Notification plugin for Gulp
import webpack       from 'webpack'; // Webpack bundler
import gulpWebpack   from 'webpack-stream'; // Gulp integration for Webpack
import browserSync   from 'browser-sync'; // Live reloading server
import { js }          from '../config/app.js'; // Configuration for JavaScript files
import webpackConfig from '../webpack.config.js'; // Webpack configuration

/**
 * Process JavaScript files.
 * @function
 * @return {Stream} The processed JavaScript files.
 */
const javascriptTask = () => gulp.src(js.src) // Source files
			   .pipe(plumber({ // Error handling
				   errorHandler : notify.onError((error) => ({
					   title   : 'JavaScript',
					   message : error.message,
				   })),
			   }))
			   .pipe(gulpWebpack(webpackConfig, webpack)) // Use webpack to bundle the JavaScript files
			   .pipe(gulp.dest(js.dest)) // Destination folder
			   .pipe(browserSync.stream()); // Reload the browser

export default javascriptTask;
