define([
    "$",
], function($) {
    let service = {
        articleReadService(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/articleRead",
                    type: "get",
                    data
                }).then((data) => {
                    resolve(data)
                })
            })
        }
    }
    return service
})