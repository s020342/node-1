var gulp = require('gulp');
var browserify = require('gulp-browserify'); //模块化的打包
var uglify = require('gulp-uglify'); //js的压缩
var concat = require('gulp-concat'); //文件合并
var sass = require('gulp-sass'); //sass编译
// var less = require('gulp-less');//less编译
var cleanCSS = require('gulp-clean-css'); //css的压缩
var rev = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换
var sequence = require('gulp-sequence');
var htmlmin = require('gulp-htmlmin'); //html压缩为一行
var autoprefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
const config = require("./config.js")

//js模块化打包
gulp.task("BuildJsModule", () => {
        if (config.jsModule) {
            gulp.src(config.build.js.entry)
                .pipe(browserify({
                    insertGlobals: true,
                    debug: !gulp.env.production
                }))
                .pipe(uglify())
                .pipe(rev()) //md5加密,对于文件名进行重新设置
                .pipe(gulp.dest(config.build.js.output))
                .pipe(rev.manifest()) //- 生成一个rev-manifest.json
                .pipe(gulp.dest(`${config.build.path}/rev/js`)) //将re-manifest.json存放到的路径
                .on("end", () => {
                    gulp.src([`${config.build.path}/rev/js/*.json`, `${config.build.page.output}/**/*.html`]) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
                        .pipe(revCollector({
                            replaceReved: true,
                        })) //- 执行文件内css名的替换
                        .pipe(gulp.dest(config.build.page.output)); //- 替换后的文件输出的目录
                })
        } else {
            gulp.src(config.build.js.entry)
                .pipe(uglify())
                .pipe(rev()) //md5加密,对于文件名进行重新设置
                .pipe(gulp.dest(config.build.js.output))
                .pipe(rev.manifest()) //- 生成一个rev-manifest.json
                .pipe(gulp.dest(`${config.build.path}/rev/js`)) //将re-manifest.json存放到的路径
                .on("end", () => {
                    gulp.src([`${config.build.path}/rev/js/*.json`, `${config.build.page.output}/**/*.html`]) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
                        .pipe(revCollector({
                            replaceReved: true,
                        })) //- 执行文件内css名的替换
                        .pipe(gulp.dest(config.build.page.output)); //- 替换后的文件输出的目录
                })
        }

    })
    // js检测
gulp.task("BuildJsEslint", function() {
        gulp.src(config.build.js.entry)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.results(results => {
                // Called once for all ESLint results.
                console.log(`Total Results: ${results.length}`);
                console.log(`Total Warnings: ${results.warningCount}`);
                console.log(`Total Errors: ${results.errorCount}`);
            }))

    })
    //sass编译
gulp.task("Buildsass", () => {
        gulp.src(config.build.sass.entry)
            .pipe(sass())
            .pipe(autoprefixer({
                borwsers: ['last 2 versions', 'Android > 4.0']
            }))

        .pipe(rev()) //md5加密
            .pipe(gulp.dest(config.build.sass.output)) //输出到本地的路径
            .pipe(rev.manifest()) //- 生成一个rev-manifest.json
            .pipe(gulp.dest(`${config.build.path}/rev/sass`)) //将re-manifest.json存放到的路径
            .on("end", () => {
                gulp.src([`${config.build.path}/rev/sass/*.json`, `${config.build.page.output}/**/*.html`]) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
                    .pipe(revCollector({
                        replaceReved: true,

                    })) //- 执行文件内css名的替换
                    .pipe(gulp.dest(config.build.page.output)); //- 替换后的文件输出的目录
            })
    })
    //css拷贝
gulp.task("BuildcssCopy", () => {
    gulp.src(config.build.css.entry)

    .pipe(autoprefixer({
            borwsers: ['last 2 versions', 'Android > 4.0']
        }))
        .pipe(rev()) //md5加密
        .pipe(gulp.dest(config.build.sass.output)) //输出到本地的路径
        .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(`${config.build.path}/rev/css`)) //将re-manifest.json存放到的路径
        .on("end", () => {
            gulp.src([`${config.build.path}/rev/css/*.json`, `${config.build.page.output}/**/*.html`]) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
                .pipe(revCollector({
                    replaceReved: true,

                })) //- 执行文件内css名的替换
                .pipe(gulp.dest(config.build.page.output)); //- 替换后的文件输出的目录
        })
})

//static拷贝
gulp.task("BuildstaticCopy", () => {
    gulp.src(config.build.static.entry)
        .pipe(gulp.dest(config.build.static.output))
})

//html拷贝
gulp.task("BuildhtmlCopy", () => {
    gulp.src(config.build.page.entry)
        .pipe(gulp.dest(config.build.page.output))
})




gulp.task("build", ["Buildsass", "BuildcssCopy", "BuildstaticCopy", "BuildhtmlCopy"], () => {
    config.esLint.esLintUse ? sequence(['BuildJsEslint', "BuildJsModule"], () => {

    }) : sequence(['BuildJsModule'], () => {

    })
})