// Load plugins
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({camelize: true}),
	webpack = require('webpack-stream'),
	sass = require('gulp-sass');
	// browserSync = require('browser-sync').create();
	// del = require('del');

gulp.task('script', function() {
	return gulp.src('js/app.js')
		.pipe(webpack({
			output: {
				filename: 'app.js'
			}
		}))
		.on('error', onError)
		.pipe(plugins.uglify())
		// .pipe(plugins.livereload(server))

		.pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
	return gulp.src('./sass/app.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(plugins.autoprefixer())
		// .pipe(plugins.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
		.pipe(plugins.minifyCss({keepSpecialComments: 1}))
		// .pipe(plugins.livereload(server))
		.pipe(plugins.rename('style.css'))
		.pipe(gulp.dest('./'));
		// .pipe(browserSync.stream());
});


gulp.task('open', ['sass', 'script'], function() {
	// var files = [
	// 	'./style.css',
	// 	'./dist/app.js',
	// ];

	// browserSync.init(files, {
	// 	// server: "e:/www/tsjernobyl"
	// 	proxy: "192.168.178.90:1080"
	// });

	// Watch .scss files
	gulp.watch('./sass/**/*.scss', ['sass']);

	// Watch .js files
	gulp.watch('./js/**/*.js', ['script']);

	// // Watch font files
	// gulp.watch('./node_modules/bootstrap-sass/**/*.{ttf,woff,eof,eot,svg,woff2}', ['fonts-copy']);

	// gulp.watch("./*.html").on('change', browserSync.reload);
	// gulp.watch("./*.php").on('change', browserSync.reload);
});

// gulp.task('browser-sync', function() {
// 	browserSync.init({
// 		proxy: "ntbb.live.dev"
// 	});
// });

// Default task
gulp.task('default', ['sass', 'script']);

/**
 * ERROR FUNCTION
 * @param err
 */
function onError(err) {
	console.log(err);
	this.emit('end');
}