define([
    "$",
], function($) {
    let service = {
        articleListService(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/getArticleList",
                    type: "get",
                    data: data
                }).then((data) => {
                    resolve(data)
                })
            })
        }
    }
    return service

})