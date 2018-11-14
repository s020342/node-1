define([
    "$",
], function($, Handlebars) {
    let service = {
        registerService(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/register",
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