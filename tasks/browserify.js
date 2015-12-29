var path = require('path');
var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var mold = require('mold-source-map');
var exorcist = require('exorcist');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var pkg = require('../package.json');

var isDevelopment = process.env.NODE_ENV !== 'production';
var srcPath = 'js/';
var compPath = path.join(__dirname, '../js/views/components/');
var buildPath = 'build/assets/js';
var jsFile = pkg.name + '-' + pkg.version;
var libs = [
    'react',
    'react-dom',
    'react/addons',
    'react-router',
    'react-mixin',
    'react-date-picker',
    'flux/utils',
    'immutable',
    'classnames',
    'core-js/es6/promise',
    'moment/locale/ko',
    'moment-timezone',
    'moment',
    'history',
    'form-serialize'
];

exports.vendor = function(gulp, plugins) {
    return function() {
        var browserified;
        var bundle;

        browserified = browserify().transform(babelify.configure({
            presets: ['es2015', 'react'],
            plugins: ['transform-proto-to-assign']
        }));

        // 개발 환경 일때는 browser에서 JSX를 렌더링할 수
        // 있도록 babel-core/browser를 로드한다.
        if (isDevelopment) {
            libs.push('babel-core/browser');
        }

        // 라이브러리 목록을 순회하여 빌드 파일에 각 라이브러리를 삽입한다.
        // 삽입된 라이브러리는 require('xxx')로 사용할 수 있다.
        libs.forEach(function(lib) {
            browserified.require(lib);
        });

        bundle = browserified.bundle();

        if (isDevelopment) {
            bundle = bundle
                .pipe(source(jsFile + '.vendor.js'))
                .pipe(gulp.dest(buildPath));
        } else {
            bundle =  bundle
                .pipe(source(jsFile + '.vendor.min.js'))
                .pipe(buffer())
                .pipe(plugins.uglify())
                .pipe(gulp.dest(buildPath));
        }

        return bundle;
    };
};

exports.script = function(gulp, plugins) {
    return function() {
        var browserified;
        var bundle;

        // browserify 기본 옵션 값을 설정하고
        // transform으로 babelify를 지정한다.
        browserified = browserify(
            path.join(srcPath, 'app.js'),
            {debug: isDevelopment}
        ).transform(babelify.configure({
            presets: ['es2015', 'react'],
            plugins: [
                'transform-proto-to-assign',
                'transform-decorators-legacy',
                'transform-class-properties'
            ]
        }));

        // 라이브러리 목록을 순회하여 외부 라이브러리는
        // 제품 코드 내에서 제거한다.
        libs.forEach(function(lib) {
            browserified.external(lib);
        });

        // 컴포넌트 목록을 순회하여 require 구문으로
        // 컴포넌트를 불러 올 수 있도록 한다.
        if (isDevelopment) {
            fs.readdirSync(compPath).forEach(function(name) {
                name = name.replace('.js', '');
                browserified.require(compPath + name, {expose: name});
            });
        }

        bundle = browserified.bundle();

        if (isDevelopment) {
            bundle = bundle
                .pipe(mold.transformSourcesRelativeTo(path.join(__dirname, '../')))
                .pipe(exorcist(path.join(buildPath, jsFile + '.js.map')))
                .pipe(source(jsFile + '.js'))
                .pipe(gulp.dest(buildPath));
        } else {
            bundle =  bundle
                .pipe(source(jsFile + '.min.js'))
                .pipe(buffer())
                .pipe(plugins.uglify())
                .pipe(gulp.dest(buildPath));
        }

        return bundle;
    };
};
