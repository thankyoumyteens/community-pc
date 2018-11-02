const gulp = require('gulp');
const del = require('del');

/**
 * 清理上次发布的文件
 * @returns {*}
 */
function cleanOutput() {
  return del(['../../dist'], {force: true});
}

/**
 * 将代码复制到dist目录
 * @param done
 * @returns {Object|void}
 */
function copyFile(done) {
  return gulp
    .src('../../src/**/*', {base: '../../src'})
    .pipe(gulp.dest('../../dist'));
}

/**
 * 清理React源文件
 * @returns {*}
 */
function cleanFile() {
  return del(['../../dist/static/script', '../../src/static/js', '../../dist/resources'], {force: true});
}

gulp.task('default', gulp.series(cleanOutput, copyFile, cleanFile));