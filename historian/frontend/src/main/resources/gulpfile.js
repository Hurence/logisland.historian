// package vars
const pkg = require("./package.json");

// gulp
const gulp = require("gulp");


// load all plugins in "devDependencies" into the variable $
/*const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});*/

const onError = (err) => {
    console.log(err);
};

var browserSync = require('browser-sync').create("historian server");
var runSequence = require('run-sequence');

gulp.task('default', function(callback) {
    runSequence('browserSync', 'watch',
      callback
    )
})

gulp.task('watch', function(){
    gulp.watch('templates/**/*.ftl', browserSync.reload); 
})
/*
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'webapp-dev'
        },
    })
})
*/
gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "http://localhost:8701/"
    })
})
