import gulp     from 'gulp'; // Gulp task runner
import plumber  from 'gulp-plumber'; // Prevent pipe breaking caused by errors
import notify   from 'gulp-notify'; // Image optimization
import webp     from 'gulp-webp'; // WebP conversion
import fileSize from 'gulp-size'; // Display file size
import debug    from 'gulp-debug'; // Debugging utility
import changed  from 'gulp-changed'; // Only pass through changed files
import { images } from '../config/app.js';

let imagemin;
let gifsicle;
let mozjpeg;
let optipng;
let
	svgo;

async function initializeImagemin() {
	const imageminModule = await import('gulp-imagemin');
	imagemin             = imageminModule.default;
	({
		gifsicle,
		mozjpeg,
		optipng,
		svgo,
	} = imageminModule);
}

const optimizeImagesTask = async () => {
	await initializeImagemin();
	return gulp.src(images.src, {
		base     : images.base,
		encoding : false,
	})
		.pipe(changed(images.dest))
		.pipe(plumber({
			errorHandler : notify.onError((error) => ({
				title   : 'Optimizing images',
				message : error.message,
			})),
		}))
		.pipe(debug({ title : 'Original images:' }))
		.pipe(imagemin([
			gifsicle(images.gif),
			mozjpeg(images.jpg),
			optipng(images.png),
			svgo({
				plugins : images.svg,
			}),
		]))
		.pipe(debug({ title : 'Optimized images:' }))
		.pipe(gulp.dest(images.dest))
		.pipe(fileSize());
};

/**
 * Convert Images to WebP Task
 * This task converts images to WebP format using the gulp-webp plugin.
 * It only processes changed files and handles errors gracefully.
 *
 * @returns {Stream} A stream of images converted to WebP format.
 */
const convertToWebpTask = () => gulp.src(images.src, {
	base     : images.base,
	encoding : false,
})
	.pipe(changed(images.dest, { extension : '.webp' })) // Only pass through changed files with .webp extension
	.pipe(plumber({ // Handle errors gracefully
		errorHandler : notify.onError((error) => ({
			title   : 'Converting to WebP',
			message : error.message,
		})),
	}))
	.pipe(webp({ quality : 85 })) // Convert images to WebP format with specified quality
	.pipe(debug({ title : 'Converted to webp:' })) // Log converted images to the console
	.pipe(gulp.dest(images.dest)) // Save converted images to destination folder
	.pipe(fileSize()); // Display file size of the converted images

const taskImages = gulp.parallel(optimizeImagesTask, convertToWebpTask);

export default taskImages;
