var path = require('path');
var pkg = require('../package.json');

var imgPath = path.join(__dirname, '../build/assets/img');
var imageFile2x = 'sp_' + pkg.name + '_2x.png';
var imageFile = 'sp_' + pkg.name + '.png';

module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src([path.join(imgPath, imageFile2x)])
            .pipe(plugins.imageResize({
                width: '50%',
                height: '50%'
            }))
            .pipe(plugins.rename(imageFile))
            .pipe(gulp.dest(imgPath));
    };
};
