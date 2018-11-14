require(["/js/app.js", "require"], (data, require) => {
    require(["$", "render", "Index.scroll", "Index.swiper", "Service.index", "event"], ($, render, Bscroll, Swiper, ServiceIndex, event) => {


        //主函数
        function init(data) {
            console.log(ServiceIndex)
            let { homeService, loadMoreService } = ServiceIndex
            Promise.all([homeService(), loadMoreService({ pagenum: 1, count: 2 })]).then((data) => {
                console.log(data)
                renderInit(data)
                listen(data)
            }).catch((err) => {
                console.log(err)
            })
        }
        init()
            //全局存储中心
        var store = {
                upData: []
            }
            //数据处理
        function dataInit(data) {
            let homeData = data[0]
                // store.upData = data[1].items
            let handle = {
                //顶部轮播数据
                topData() {
                    return homeData.items[0].data.data.filter((i, index) => {
                        if (index > 1) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                //本周最火
                hotData() {
                    return homeData.items[1]
                },
                //推荐
                moreData() {
                    return homeData.items.slice(2, homeData.items.length - 3)
                },
                //上拉加载获取数据
                getUpData() {
                    return store.upData
                },
                //上拉加载设置数据
                setUpData(arr) {
                    store.upData = [...store.upData, ...arr]
                }
            }
            return handle
        }


        //渲染初始化
        function renderInit(data) {
            let { topData, hotData, moreData, setUpData, getUpData } = dataInit(data)
                //    头部渲染
            render("#top_banner", topData(), ".classify")
                // 本周最火
            render("#hot", hotData(), ".hot")

            //自动渲染推荐
            render("#more", moreData(), ".more")
                //给upData设置初始数据
            setUpData(data[1].items)
            console.log(getUpData())
            sessionStorage.setItem("moreData", JSON.stringify(getUpData()))
            render("#books", getUpData(), ".books")


        }
        //事件监听
        function listen(data) {
            let { topData, hotData, moreData } = dataInit(data)
            let listen = {
                    //推荐换一换监听
                    changeRecommendListen() {
                        let data = moreData()
                        data.forEach((i, index) => {
                            $(".change" + index).click(() => {
                                // console.log(22)
                                let newData = data[index].data.data.sort((a, b) => {
                                    return Math.random() - 0.5
                                })
                                data[index].data.data = newData
                                render("#more", data, ".more")
                                listen.changeRecommendListen(data)
                            })
                        });
                    },
                    //书城书架切换
                    changeBookListen() {

                        $(".book-head li").click(function() {
                            event.emit("scroll", $(this).index())

                            $(this).addClass("cur").siblings().removeClass("cur");
                        })
                    },
                    //首页搜索点击切换
                    changeIndexSearchListen() {

                        $("#indexSearch input").focus(function() {
                            event.emit("scroll", 1)

                            $(".book-head li").eq(1).addClass("cur").siblings().removeClass("cur");
                        })
                    },

                    //搜索页设置历史记录事件
                    changeHistorySetListen() {
                        let { indexSearchService } = ServiceIndex
                        $(".searchText").blur(function() {

                            indexSearchService({ id: sessionStorage.getItem("userId"), text: $(this).val() }).then((data) => {
                                console.log(data)
                                render("#books-all", data, ".books-all")
                            })
                        })
                    },
                    //搜索页读取历史记录事件
                    changeHistoryListen() {
                        let { indexgetHistoryService } = ServiceIndex
                        var state = true
                        $(".searchText")[0].oninput = function() {
                            if (state) {
                                state = false
                                indexgetHistoryService({ id: sessionStorage.getItem("userId"), text: $(this).val() }).then((data) => {
                                    state = true
                                    console.log(data)
                                        // render("#books-all", data, ".books-all")
                                })
                            }

                        }
                        $(".searchText").focus(function() {
                            if (!sessionStorage.getItem("userId")) {
                                sessionStorage.setItem("page", "/page/index.html")
                                window.location.href = "/page/login.html"
                            }

                        })
                    },
                    //分类跳转
                    articleClassGoListen() {
                        let { indexgetHistoryService } = ServiceIndex
                        var state = true
                        $(".articleClassGo").click(function() {
                            // $(this).index()
                            window.location.href = "/page/articleClass.html?id=" + $(this).attr("id")
                        })
                    },
                }
                //监听的调用
            for (let i in listen) {
                listen[i]()
            }

        }
    })
})