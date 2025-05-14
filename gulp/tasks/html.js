/**
 * Html Task
 * This task processes HTML files.
 */
import gulp        from 'gulp'; // Gulp task runner
import plumber     from 'gulp-plumber'; // Prevent pipe breaking caused by errors
import notify      from 'gulp-notify'; // Notification plugin for Gulp
import twig        from 'gulp-twig'; // Twig template compiler for Gulp
import data        from 'gulp-data'; // Plugin for passing data to templates
import browserSync from 'browser-sync'; // Live browser reload
import path        from 'path'; // Node.js path module
import fs          from 'fs'; // Node.js file system module
import beautify    from 'gulp-jsbeautifier'; // Plugin to beautify HTML, CSS, and JavaScript code
import app         from '../config/app.js'; // Configuration object for the HTML task

/**
 * Processes HTML files using Twig template engine.
 * @return {Stream} The processed HTML files.
 */
const htmlTask = () => gulp.src(app.html.src, {base:app.html.base})
						   .pipe(plumber({
							   errorHandler:notify.onError((error) => ({
								   title  :'HTML',
								   message:error.message
							   }))
						   }))
						   .pipe(data((file) => {
							   const filePath = `${app.html.data + path.basename(file.path)}.json`;
							   if (fs.existsSync(filePath)) {
								   return JSON.parse(fs.readFileSync(filePath));
							   }
						   }))
						   .pipe(twig({
							   onError:notify.onError((error) => ({
								   title  :'TWIG',
								   message:error.message
							   }))
						   }))
						   .pipe(beautify({
							   unformatted:['script', 'code', 'pre'],
							   html       :{
								   indent_char     :'   ',
								   indent_with_tabs:true,
								   js              :{
									   indent_size:'   '
								   },
								   css             :{
									   indent_size:'   '
								   }
							   }
						   }))
						   .pipe(gulp.dest(app.html.dest))
						   .pipe(browserSync.stream({once:true}));

export default htmlTask;
