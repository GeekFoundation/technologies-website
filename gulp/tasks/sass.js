/**
 * Working with css/sass task
 */
import gulp          from 'gulp';
import plumber       from 'gulp-plumber';
import notify        from 'gulp-notify';
import * as dartSass from 'sass';
import gulpSass      from 'gulp-sass';
import sourcemaps    from 'gulp-sourcemaps';
import postcss       from 'gulp-postcss';
import prefixer      from 'autoprefixer';
import fontpie       from 'postcss-fontpie';
import gulpif        from 'gulp-if';
import csso          from 'gulp-csso';
import browserSync   from 'browser-sync';
import { sass, env }   from '../config/app.js';

// Initialize the Sass compiler
const scss = gulpSass(dartSass);

// Config for postcss
const processors = [
	prefixer(sass.prefix),
	fontpie(sass.font),
];

/**
 * Compile Sass and process with Postcss
 *
 * This task is responsible for compiling the Sass source code located in the
 * `sass` folder into a single CSS file. The Postcss plugin is used to apply the
 * configuration options from the `config/app.js` file.
 */
const sassTask = () => gulp.src(sass.src)
						   .pipe(plumber({
							   errorHandler : notify.onError((error) => ({
								   title   : 'Sass',
								   message : error.message,
							   })),
						   }))
						   .pipe(gulpif(env.isDevelopment, sourcemaps.init()))
						   .pipe(scss(sass.settings))
						   .pipe(postcss(processors))
						   .pipe(csso())
						   .pipe(gulpif(env.isDevelopment, sourcemaps.write(sass.map)))
						   .pipe(gulp.dest(sass.dest))
						   .pipe(browserSync.stream());

export default sassTask;
