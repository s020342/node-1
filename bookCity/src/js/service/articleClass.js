define([
    "$",
], function($) {
    let service = {
        articleClassService(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/getArticleClass",
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