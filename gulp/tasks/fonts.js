/**
 * Fonts Task
 * This task copies font files from source to destination.
 */
import gulp    from 'gulp';
import plumber from 'gulp-plumber';
import notify  from 'gulp-notify';
import copy    from 'gulp-copy';
import newer   from 'gulp-newer';
import { fonts } from '../config/app.js';

/**
 * Copy font files from source to destination.
 * @return {Stream} The processed font files.
 */
const taskFonts = () => gulp
	.src(fonts.src)
	.pipe(plumber({
		errorHandler : notify.onError((error) => ({
			title   : 'Fonts',
			message : error.message,
		})),
	}))
	.pipe(newer(fonts.dest))
	.pipe(copy(fonts.dest, { prefix : 2 }));

export default taskFonts;
