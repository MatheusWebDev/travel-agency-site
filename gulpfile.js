var gulp  	 = require('gulp'),
  	watch 	 = require('gulp-watch'),
	cssVars		= require('postcss-simple-vars'),
	postcss 	= require('gulp-postcss'),
	cssImport	 = require('postcss-import'),
	cssNested		= require('postcss-nested'),
	browserSync		= require('browser-sync').create(),
	autoprefixer 	= require('autoprefixer');


gulp.task('default', function(){
	console.log("Ok - You create a gulp task.");
});

gulp.task('html', function(){
	console.log("Imagine something useful being done to your HTML here.");
});

gulp.task('styles', function(){
	return gulp.src('./app/assets/styles/style.css')
		.pipe(postcss([cssImport, cssVars, cssNested, autoprefixer]))
		.pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function(){
	
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}	
	});

	watch('./app/index.html', function() {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});

});

gulp.task('cssInject', ['styles'], function() {
   return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
});