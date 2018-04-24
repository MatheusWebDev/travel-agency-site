var gulp = require('gulp'),
  	watch = require('gulp-watch'),
  	browserSync	= require('browser-sync').create();

gulp.task('watch', function(){
	
	browserSync.init({
		//notify: false,
		server: {
			baseDir: "./app"
		}//,
	  //  port: process.env.PORT, // https://travel-agency-site-matheussky.c9users.io:8080/index.html
	  //  ui: { port: 8081 } 
	});

	watch('./app/index.html', function() {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});
	
	watch('./app/assets/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh');
	});

});

gulp.task('cssInject', ['styles'], function() {
   return gulp.src('./app/temp/styles/*.css')
	.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
	browserSync.reload();
});