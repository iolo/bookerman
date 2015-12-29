var path = require('path');
var pkg = require('../package.json');

var isDevelopment = process.env.NODE_ENV !== 'production';
var srcPath = path.join(__dirname, '../html');
var distPath = path.join(__dirname, '../build');

module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src([path.join(srcPath, '*.html')])
            .pipe(plugins.fileInclude({
                prefix: '@@',
                context: {
                    version: pkg.name + '-' + pkg.version,
                    min: isDevelopment ? '' : '.min'
                }
            }))
            .pipe(gulp.dest(distPath));
    };
};
