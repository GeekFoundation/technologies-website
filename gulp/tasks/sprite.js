/**
 * Sprite generation
 */

// Import required plugins
import gulp               from 'gulp'; // Gulp task runner
import plumber            from 'gulp-plumber'; // Prevent pipe breaking caused by errors
import notify             from 'gulp-notify'; // Desktop notifications for Gulp tasks
import sprite             from 'gulp-svg-sprite'; // Generate SVG sprites
import {sprite as config} from '../config/app.js'; // Configuration for SVG sprites

export default () => gulp.src(config.src)
// Catching error
						 .pipe(plumber({
							 errorHandler:notify.onError((error) => ({
								 title  :'Sprite',
								 message:error.message
							 }))
						 }))
// Generating svg sprite
						 .pipe(sprite(config.config))
// Write the final css to the folder
						 .pipe(gulp.dest(config.dest));
