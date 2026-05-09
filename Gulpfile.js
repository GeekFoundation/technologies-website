/**
 * Main task file
 */
import gulp        from 'gulp';
import browserSync from 'browser-sync';
import app, {
	sass, js, images, html, fonts,
}                  from './gulp/config/app.js';
import taskHtml    from './gulp/tasks/html.js';
import taskImages  from './gulp/tasks/images.js';
import taskJs      from './gulp/tasks/javascript.js';
import taskSass    from './gulp/tasks/sass.js';
import taskSprite  from './gulp/tasks/sprite.js';
import taskFonts   from './gulp/tasks/fonts.js';

const server = () => {
	browserSync.init(app.browserSync);
};

const watcher = () => {
	gulp.watch(html.watch, gulp.series(taskHtml));
	gulp.watch(fonts.watch, gulp.series(taskFonts));
	gulp.watch(sass.watch, gulp.series(taskSass));
	gulp.watch(js.watch, gulp.series(taskJs));
	gulp.watch(images.watch, gulp.series(taskImages)).on('all', browserSync.reload);
};

const build = gulp.series(
	gulp.parallel(taskImages, taskFonts, taskHtml, taskJs, taskSass),
);

const dev = gulp.series(
	build,
	gulp.parallel(server, watcher),
);

const docker = gulp.series(
	build,
	gulp.parallel(watcher),
);

export {
	taskImages,
	taskJs,
	taskSass,
	taskHtml,
	taskSprite,
	taskFonts,
	server,
	docker,
	dev,
};

export default process.env.NODE_ENV === 'production' ? build : dev;
