var gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  plumber = require("gulp-plumber"),
  browserSync = require("browser-sync");

gulp.task("sass", function() {
  return gulp
    .src("./scss/**/style.scss")
    .pipe(plumber())
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: ["last 3 version", "IE 11"]
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function() {
  gulp.watch("./scss/**/*.scss", ["sass"]);
  gulp.watch(["./index.html", "./js/*.js"]).on("change", browserSync.reload);
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("default", ["sass", "browser-sync", "watch"]);
