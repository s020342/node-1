require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.articleList", "render", "base64", "phoneEvent"], ($, querystring, ServiceArticleList, render, base64, $e) => {
        let { articleListService } = ServiceArticleList
        let articleId = sessionStorage.getItem("articleId")

        console.log(articleId)

        if (articleId) {
            articleListService({ fiction_id: articleId }).then((data) => {
                console.log(data.data)
                init(data.data[0])
            })
        }


        function init(data) {

            render("#wrap", data, ".wrap")
                // listen()
        }

        function listen() {

            // for (const key in eventObj) {
            //     if (eventObj.hasOwnProperty(key)) {
            //         eventObj[key]()
            //     }
            // }
        }
    })
})