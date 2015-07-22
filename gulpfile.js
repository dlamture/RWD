var gulp = require("gulp");
var gutil = require("gulp-util");
var compass = require("gulp-compass");
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
//var uglify = require('gulp-uglify');

gulp.task('webserver', function(){
    gulp.src('./') //來源路徑,起始目錄
        .pipe(webserver({
            host: '0.0.0.0', //host設定'0.0.0.0'，就可以用內網檢視
    		port: 8080, //設定一個沒在使用的port
    		livereload: true, //auto refresh
    		open: true //執行gulp時自動開啟browser
        }));
});

gulp.task('compass', function(){
	gulp.src('./sass/*.scss') //來源路徑,起始目錄
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(compass({ //這段內輸入config.rb的內容
            raw: 'Encoding.default_external = \'utf-8\'\n', //讓SCSS檔案註解可以用中文
			css: './css', //compass輸出位置
			sass: './sass', //sass來源路徑
			image: './img', //img來源路徑
            font: './font', //font來源路徑
			style: 'nested', //CSS壓縮格式，預設(nested)
			sourcemap: true, //compass 1.0 sourcemap
            comments: false, //是否要註解，預設(true)
            require: ['susy', 'breakpoint'] //額外套件 susy, breakpoint
		}))
		.on('error', function (err) {
			// Would like to catch the error here
		})
		.pipe(minifyCSS());
});

gulp.task('watch', function() { //自定一個watch的排程名稱
	gulp.watch(['./sass/*.scss', './sass/**/*.scss'], ['compass']);
    gutil.log('Watching source files for changes... Press ' + gutil.colors.cyan('CTRL + C') + ' to stop.');
});

gulp.task('default',['compass', 'webserver', 'watch']);
