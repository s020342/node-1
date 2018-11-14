require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.articleRead", "render", "base64", "phoneEvent"], ($, querystring, ServiceArticleRead, render, base64, $e) => {
        let { articleReadService } = ServiceArticleRead
        let chapter_id = localStorage.getItem("chapter_id") ? localStorage.getItem("chapter_id") : 1
        localStorage.setItem("chapter_id", chapter_id)


        var articleArr = []

        function getData(id) {
            let articleChapter = localStorage.getItem("articleChapter")
            if (articleChapter) {
                let arr = JSON.parse(articleChapter)
                articleArr = arr
                let newArr = articleArr.filter((i) => {
                    if (i.id == id) {
                        return true
                    } else {
                        return false
                    }
                })
                if (newArr.length > 0) {
                    init(newArr[0])
                } else {
                    articleReadService({ fiction_id: 46525, chapter_id: id }).then((data) => {

                        let currentData = JSON.parse(base64.decode(data.data))
                        currentData.id = id
                        articleArr.push(currentData)
                        init(currentData)
                    })
                }
            } else {

                articleReadService({ fiction_id: 46525, chapter_id: id }).then((data) => {

                    let currentData = JSON.parse(base64.decode(data.data))
                    currentData.id = id
                    articleArr.push(currentData)
                    init(currentData)

                })
            }

        }

        getData(chapter_id)

        function init(data) {

            render("#read-container", data, ".read-container")
            listen()
        }

        function listen() {
            let eventObj = {
                //初次加载默认设置
                memoryControl() {
                    //默认字体大小
                    let articleSize = localStorage.getItem("articleSize") ? localStorage.getItem("articleSize") : "12px"
                    localStorage.setItem("articleSize", articleSize)
                    $(".read-content div").css("font-size", articleSize)
                        //默认背景颜色
                    let articleBG = localStorage.getItem("articleBG") ? localStorage.getItem("articleBG") : "white"
                    let articleColor = localStorage.getItem("articleColor") ? localStorage.getItem("articleColor") : "black"
                    localStorage.setItem("articleColor", articleColor)
                    localStorage.setItem("articleBG", articleBG)
                    $(".read-content").css("color", articleColor)
                    $(".read-content").css("background", articleBG)
                },
                //弹出层的显示：
                popupControl() {
                    let state = true
                    $e("body").tap(() => {
                        console.log(111)
                        if (state) {
                            $(".read-mark-f").show()
                            $(".read-mark-h").show()
                        } else {
                            $(".read-mark-f").hide()
                            $(".read-mark-h").hide()
                        }
                        state = !state
                            // $(".read-mark-h").toggle()
                            // $(".read-mark-f").toggle()
                    })
                },
                //章节切换
                cutControl() {
                    $e(".read-mark-prev").tap(() => {
                        let chapter_id = parseInt(localStorage.getItem("chapter_id")) - 1
                        getData(chapter_id)
                        localStorage.setItem("chapter_id", chapter_id)

                    })
                    $e(".read-mark-next").tap(() => {
                        let chapter_id = parseInt(localStorage.getItem("chapter_id")) + 1
                        getData(chapter_id)
                        localStorage.setItem("chapter_id", chapter_id)
                            // articleReadService({ fiction_id: 46525, chapter_id }).then((data) => {
                            //     
                            //     console.log(data)
                            //     console.log(JSON.parse(base64.decode(data.data)))
                            //     init(JSON.parse(base64.decode(data.data)))
                            // })
                    })
                },
                //字体调整
                fontControl() {
                    var state = true
                    $e(".read-font").tap((e) => {
                        e.stopPropagation()
                        if (state) {
                            $(".read-control-color").show()
                        } else {
                            $(".read-control-color").hide()
                        }
                        state = !state
                    })
                    $e(".read-big").tap((e) => {
                        e.stopPropagation()
                        let currentFont = parseInt($(".read-content div").css("font-size")) * 1.2
                        let articleSize = currentFont + "px"
                        localStorage.setItem("articleSize", articleSize)
                        $(".read-content div").css("font-size", articleSize)


                    })
                    $e(".read-small").tap((e) => {
                        e.stopPropagation()

                        let currentFont = parseInt($(".read-content div").css("font-size"))
                        if (currentFont > 12) {
                            currentFont = currentFont * 0.8
                        }
                        let articleSize = currentFont + "px"
                        localStorage.setItem("articleSize", articleSize)
                        $(".read-content div").css("font-size", articleSize)

                    })

                    $(".read-control-color-b-span").on("click", false, function(event) {
                        event.stopPropagation();
                        console.log(event)


                    })
                },
                //切换模式
                styleControl() {

                    $e(".read-night").tap((e) => {
                        e.stopPropagation()
                        console.log(1)
                        if ($(".read-night p").text() == "夜间") {
                            $(".daytime").show().siblings().hide()
                            $(".read-night p").text("白天")

                            let articleColor = "white"
                            let articleBG = "#0f1410"
                            localStorage.setItem("articleColor", articleColor)
                            localStorage.setItem("articleBG", articleBG)
                            $(".read-content").css("color", articleColor)
                            $(".read-content").css("background", articleBG)
                        } else {
                            let articleColor = "#0f1410"
                            let articleBG = "white"
                            localStorage.setItem("articleColor", articleColor)
                            localStorage.setItem("articleBG", articleBG)
                            $(".read-content").css("color", articleColor)
                            $(".read-content").css("background", articleBG)
                            $(".night").show().siblings().hide()
                            $(".read-night p").text("夜间")
                        }

                    })

                },
                //下载模式
                downControl() {
                    $e(".read-download").tap((e) => {
                        e.stopPropagation()
                        localStorage.setItem("articleChapter", JSON.stringify(articleArr))
                    })
                },
                //展示目录
                showArticleList() {
                    $e(".read-catalog").tap(() => {
                        window.location.href = "/page/articleList.html"
                    })
                },
                //返回
                goback() {
                    $e(".icon-angle-left").tap((e) => {
                        window.location.href = sessionStorage.getItem("page")
                    })
                }
            }
            for (const key in eventObj) {
                if (eventObj.hasOwnProperty(key)) {
                    eventObj[key]()
                }
            }
        }
    })
})