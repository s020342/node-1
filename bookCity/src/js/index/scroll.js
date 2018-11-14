require(["/js/app.js", "require"], (data, require) => {
    require(["$", "render", "bscroll", "swiper", "Service.index"], ($, render, BScroll, Swiper, ServiceIndex) => {
        let scroll = new BScroll('.wrapper', {
            scrollY: true,
            click: true,
            pullDownRefresh: {
                threshold: 60,
                stop: 55
            },
            pullUpLoad: {
                threshold: -100
            }
        })

        scroll.on("pullingDown", function() {
            document.getElementsByClassName("b-scroll")[0].setAttribute("data-top", "正在刷新");
            setTimeout(() => {
                document.getElementsByClassName("b-scroll")[0].setAttribute("data-top", "刷新完成");
                setTimeout(() => {
                    window.location.reload()
                    scroll.finishPullDown();
                    document.getElementsByClassName("b-scroll")[0].setAttribute("data-top", "下拉刷新");
                }, 300)
            }, 1000)
        })
        var page = 2
        scroll.on("pullingUp", function() {
            document.getElementsByClassName("b-scroll")[0].setAttribute("data-bot", "释放加载");
            if (this.y < this.maxScrollY) {
                //基于service请求数据
                let { loadMoreService } = ServiceIndex
                if (page < 3) {
                    loadMoreService({ pagenum: page, count: 2 }).then((data) => {
                        let moreData = sessionStorage.getItem("moreData")
                        let arr = [...JSON.parse(moreData), ...data.items]
                        sessionStorage.setItem("moreData", JSON.stringify(arr))
                        render("#books", arr, ".books")
                        scroll.refresh();
                        scroll.finishPullUp();
                        page++
                        document.getElementsByClassName("b-scroll")[0].setAttribute("data-bot", "下拉加载");
                    })
                } else {
                    scroll.refresh();
                    scroll.finishPullUp();
                    document.getElementsByClassName("b-scroll")[0].setAttribute("data-bot", "下拉加载");
                }
            }
        })
    })
})