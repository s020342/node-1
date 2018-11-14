const url = require("url")
var gulp = require('gulp');
var webserver = require('gulp-webserver'); //web服务热启动
var browserify = require('gulp-browserify'); //模块化的打包
var sass = require('gulp-sass'); //sass编译
var autoprefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
var sequence = require('gulp-sequence'); //gulp启动任务的命令
var chokidar = require('chokidar'); //文件监听
const eslint = require('gulp-eslint');

const config = require("./config.js")
    //js模块化打包
gulp.task("jsModule", () => {
        if (config.jsModule) {
            gulp.src(config.dev.js.entry)
                .pipe(browserify({
                    insertGlobals: true,
                    debug: !gulp.env.production
                }))
                .pipe(gulp.dest(config.dev.js.output))
        } else {
            gulp.src(config.dev.js.entry)
                .pipe(gulp.dest(config.dev.js.output))
        }

    })
    // js检测
gulp.task("devJsEslint", function() {
        gulp.src(config.dev.js.entry)
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
gulp.task("sass", () => {
        gulp.src(config.dev.sass.entry)
            .pipe(sass())
            .pipe(autoprefixer({
                borwsers: ['last 2 versions', 'Android > 4.0']
            }))
            .pipe(gulp.dest(config.dev.sass.output))
    })
    //css拷贝
gulp.task("cssCopy", () => {
    gulp.src(config.dev.css.entry)

    .pipe(autoprefixer({
            borwsers: ['last 2 versions', 'Android > 4.0']
        }))
        .pipe(gulp.dest(config.dev.css.output))
})

//static拷贝
gulp.task("staticCopy", () => {
        gulp.src(config.dev.static.entry)
            .pipe(gulp.dest(config.dev.static.output))
    })
    //html拷贝
gulp.task("htmlCopyServer", () => {
        gulp.src(config.dev.page.entry)
            .pipe(gulp.dest(config.dev.page.output))
            .on('end', () => {
                // 只有监听到html复制完毕，才会启动服务
                sequence(['server'], () => {
                    console.log("服务启动")
                })
            });
    })
    //html拷贝
gulp.task("htmlCopy", ["jsModule", "sass"], () => {
        gulp.src(config.dev.page.entry)
            .pipe(gulp.dest(config.dev.page.output))
    })
    //启动热服务
gulp.task('server', function() {
    gulp.src(config.dev.path)
        .pipe(webserver({
            livereload: config.dev.livereload,
            directoryListing: config.dev.directoryListing,
            open: config.dev.open,
            host: config.dev.host,
            port: config.dev.port,
            middleware: require("../mockjs/index.js")
                // middleware: function(req, res, next) {
                //     var pathName = url.parse(req.url).pathname
                //     middlewareData.forEach(function(i) {
                //         switch (i.route) {
                //             case pathName:
                //                 {
                //                     i.handle(req, res, next, url)
                //                 }
                //                 break;
                //         }
                //     })

            //     next()
            // },
        }));
});



gulp.task("taskListen", () => {
    //html文件的监听
    chokidar.watch(config.dev.page.entry).on("all", () => {
            sequence(['htmlCopy'], () => {
                console.log("html更新成功")
            })
        })
        //sass文件的监听
    chokidar.watch(config.dev.sass.entry).on("all", () => {
            sequence(['sass'], () => {
                console.log("sass更新成功")
            })
        })
        //css文件的监听
    chokidar.watch(config.dev.css.entry).on("all", () => {
            sequence(['cssCopy'], () => {
                console.log("css")
            })
        })
        //js文件的监听
    chokidar.watch(config.dev.js.entry).on("all", () => {
            config.esLint.esLintUse ? sequence(['devJsEslint', "jsModule"], () => {

                console.log("js更新成功")
            }) : sequence(['jsModule'], () => {
                console.log("js更新成功")
            })

        })
        //static文件的监听
    chokidar.watch(config.dev.static.entry).on("all", () => {
        sequence(['staticCopy'], () => {
            console.log("static更新成功")
        })
    })
})

gulp.task("Copy", ["sass", "cssCopy", "staticCopy"], () => {
    console.log("初次启动进行文件拷贝")
})

gulp.task("dev", () => {

    sequence(['Copy'], () => {
        config.esLint.esLintUse ? sequence(['devJsEslint', "jsModule"], () => {
            sequence(["htmlCopyServer"], () => {})

        }) : sequence(['jsModule'], () => {
            sequence(["htmlCopyServer"], () => {})
        })
    })


    sequence(['taskListen'], () => {
        console.log("监听成功")
    })

})