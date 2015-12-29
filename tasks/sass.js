var path = require('path');
var autoprefixer = require('autoprefixer');
var pkg = require('../package.json');

var isDevelopment = process.env.NODE_ENV !== 'production';
var scssPath = path.join(__dirname, '../scss');
var cssPath = path.join(__dirname, '../build/assets/css');
var cssFile = pkg.name + '-' + pkg.version + '.css';
var minifyFile = pkg.name + '-' + pkg.version + '.min.css';

module.exports = function(gulp, plugins) {
    return function() {
        var bundle = gulp.src([path.join(scssPath, '**/*.scss')])
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.postcss([
                autoprefixer({
                    browsers: ['last 2 versions', '> 1%', 'IE 7'],
                    cascade: false
                })
            ]));

        if (isDevelopment) {
            bundle = bundle
                .pipe(plugins.rename(cssFile))
                .pipe(plugins.sourcemaps.write('./'))
                .pipe(gulp.dest(cssPath));
        } else {
            bundle = bundle
                .pipe(plugins.minifyCss())
                .pipe(plugins.rename(minifyFile))
                .pipe(gulp.dest(cssPath));
        }

        return bundle;
    };
};
