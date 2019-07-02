const gulp = require("gulp");
const vuePack = require("gulp-vue-pack");

gulp.task("build1", function() {
    console.log('build1');
    return gulp.src("components/**/*.vue")
        .pipe(vuePack())
        .pipe(gulp.dest("build/"));
});

gulp.task("build2", function() {
    console.log('build2');
    return gulp.src("components/**/*.vue")
        .pipe(vuePack())
        .pipe(gulp.dest("build/"));
});
// gulp.series
gulp.task('default', gulp.parallel(['build1', 'build2'], (cb)=>{
    cb();
}));