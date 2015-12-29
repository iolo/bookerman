var gulp = require('gulp-param')(require('gulp'), process.argv);
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var loader = require('./tasks/loader')(gulp, plugins);

// Build(s) for JavaaScript.
gulp.task('jslint', loader('jslint'));
gulp.task('vendor', loader('browserify', 'vendor'));
gulp.task('script', loader('browserify', 'script'));

// Build(s) for Markup
gulp.task('htmlinclude', loader('htmlinclude'));
gulp.task('spritesmith', loader('spritesmith'));
gulp.task('imageresize', loader('imageresize'));
gulp.task('scsslint', loader('scsslint'));
gulp.task('sass', loader('sass'));

gulp.task('default:script', function() {
    runSequence('jslint', ['vendor', 'script']);
});

gulp.task('default:html', function() {
    runSequence(['htmlinclude', 'spritesmith'], 'imageresize', 'scsslint', 'sass');
});

gulp.task('default', ['default:script', 'default:html'], function(watch) {
    if (watch) {
        gulp.watch('js/**/*.js', function() {
            runSequence('script');
        });

        gulp.watch('scss/**/*.scss', function() {
            runSequence('sass');
        });
    }
});
