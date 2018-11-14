// // var gulp = require("gulp")
// // var webserver = require('gulp-webserver'); //web服务热启动
// // var sass = require('gulp-sass'); //sass编译
// // var sequence = require('gulp-sequence');
// // var autoprefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
// // const eslint = require('gulp-eslint');
// // var browserify = require('gulp-browserify'); //模块化的打包
// // var mock = require("../mock/index.js")
// // var rev = require('gulp-rev'); //- 对文件名加MD5后缀
// // var revCollector = require('gulp-rev-collector'); //- 路径替换
// // const config = require("./config.js")
// // var chokidar = require('chokidar'); //文件监听

// // var gulp = require('gulp');
// // var browserify = require('gulp-browserify'); //模块化的打包
// // var uglify = require('gulp-uglify'); //js的压缩
// // var concat = require('gulp-concat'); //文件合并
// // var sass = require('gulp-sass'); //sass编译
// // // var less = require('gulp-less');//less编译
// // var cleanCSS = require('gulp-clean-css'); //css的压缩
// // var rev = require('gulp-rev'); //- 对文件名加MD5后缀
// // var revCollector = require('gulp-rev-collector'); //- 路径替换
// // var sequence = require('gulp-sequence');
// // var htmlmin = require('gulp-htmlmin'); //html压缩为一行

// const url = require("url")
// const gulp = require("gulp")
// const uglify = require("gulp-uglify")
// var cleanCSS = require('gulp-clean-css'); //css的压缩
// var autoprefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
// var htmlmin = require('gulp-htmlmin'); //html压缩为一行
// var webserver = require('gulp-webserver'); //web服务热启动


// var middlewareData = require("./unit/router.js")
//     //js压缩
// gulp.task("js", () => {
//         gulp.src("./src/**/*.js")
//             .pipe(uglify())
//             .pipe(gulp.dest("dist"))
//     })
//     //css压缩
// gulp.task("css", () => {
//         gulp.src("./src/**/*.css")
//             .pipe(autoprefixer({
//                 browsers: ['last 2 versions'],
//                 cascade: false
//             }))
//             .pipe(cleanCSS())
//             .pipe(gulp.dest("dist"))
//     })
//     //html压缩
// gulp.task("html", () => {
//         gulp.src("./src/**/*.html")
//             .pipe(htmlmin({
//                 removeComments: true, //清除HTML注释
//                 collapseWhitespace: true, //压缩HTML
//                 collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
//                 removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
//                 minifyJS: true, //压缩页面JS
//                 minifyCSS: true //压缩页面CSS
//             }))
//             .pipe(gulp.dest("dist"))
//     })
//     //启动热服务
// gulp.task('server', function() {
//     gulp.src("./src")
//         .pipe(webserver({
//             livereload: true,
//             directoryListing: true,
//             open: "/html/index.html",
//             host: "127.0.0.1",
//             port: "8080",
//             middleware: function(req, res, next) {
//                 var pathName = url.parse(req.url).pathname
//                 middlewareData.forEach(function(i) {
//                     switch (i.route) {
//                         case pathName:
//                             {
//                                 i.handle(req, res, next, url)
//                             }
//                             break;
//                     }
//                 })

//                 next()
//             },
//         }));
// });
// //任务的整合
// gulp.task("default", ["js", "css", "html"], () => {
//     console.log("处理完毕")
// })


require("./config/gulpfile.dev.js")
require("./config/gulpfile.build.js")