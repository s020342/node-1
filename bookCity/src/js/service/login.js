define([
    "$",
], function($, Handlebars) {
    let service = {
        loginService(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/login",
                    type: "post",
                    data
                }).then((data) => {
                    resolve(data)
                })
            })
        },
    }
    return service
});