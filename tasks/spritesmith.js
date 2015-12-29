var path = require('path');
var fs = require('fs');
var Mustache = require('mustache');
var pkg = require('../package.json');

var imgPath = path.join(__dirname, '../build/assets/img');
var srcPath = path.join(__dirname, '../build/assets/img/sp');
var scssPath = path.join(__dirname, '../scss/core');

var imageFile = 'sp_' + pkg.name + '_2x.png';
var scssFile = '_sprites.scss';
var templateFile = 'sprites.mustache';

module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src([path.join(srcPath, '**/*')])
            .pipe(plugins.spritesmith({
                imgName: path.join(imgPath, imageFile),
                cssName: path.join(scssPath, scssFile),
                imgPath: '../img/' + imageFile,
                padding: 4,
                cssSpritesheetName: 'sp-' + pkg.name,
                cssTemplate: function(params) {
                    var template = fs.readFileSync(templateFile, 'utf8');

                    return Mustache.render(template, params);
                },
                cssOpts: {
                    // 비 레티나용 이미지 경로를 반환하는 함수
                    path: function() {
                        return function(text, render) {
                            return render(text).replace('_2x', '');
                        };
                    },
                    // zerounit 검증을 통과하기 위해 0px를
                    // 0으로 변환하는 함수
                    zerounit: function() {
                        return function(text, render) {
                            var value = render(text);
                            return value === '0px' ? '0' : value;
                        };
                    },
                    // 레티나 대응을 위해서
                    // width, height, offset을 pixel ratio로 나눔
                    retina: function() {
                        return function(text, render) {
                            var pixelRatio = 2;
                            return parseInt(render(text), 10) / pixelRatio + 'px';
                        };
                    }
                }
            }))
            .pipe(gulp.dest('./'));
    };
};
