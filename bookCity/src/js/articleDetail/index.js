require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.articleDetail", "render"], ($, querystring, ServiceDetailClass, render) => {
        let { articleDetailService, articleAllService } = ServiceDetailClass

        let query = querystring(window.location.search)
        sessionStorage.setItem("articleId", query.id)
        articleDetailService(query).then((data) => {

            init(data)
            listen()
        })

        function init(data) {
            render("#wrap", data.data, ".wrap")
            $(".col").click(() => {
                if (!sessionStorage.getItem("userId")) {
                    sessionStorage.setItem("page", window.location.href)
                    window.location.href = "/page/login.html"

                } else {
                    let id = sessionStorage.getItem("articleId")
                    window.location.href = "/page/articleRead.html?id=" + $(this).attr("id")
                }

            })
        }

        function listen(data) {

            $(".download").click(() => {
                console.log(22)
                articleAllService(query).then((data) => {
                    localStorage.setItem("articleChapter", JSON.stringify(data))
                })

            })
        }
    })
})