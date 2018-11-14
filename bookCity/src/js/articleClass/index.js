require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.articleClass", "render"], ($, querystring, ServiceArticleClass, render) => {
        let { articleClassService } = ServiceArticleClass
        let query = querystring(window.location.search)

        articleClassService(query).then((data) => {
            console.log(data)
            init(data)
        })

        function init(data) {
            render("#wrap", data.data, ".wrap")
            $(".goDetail").click(function() {
                window.location.href = "/page/articleDetail.html?id=" + $(this).attr("id")
            })
        }
    })
})