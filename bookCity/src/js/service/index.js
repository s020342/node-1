define([
    "$",
], function($, Handlebars) {
    let service = {
        homeService() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/home",
                    type: "get"
                }).then((data) => {
                    resolve(data)
                })
            })
        },
        loadMoreService(option) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/loadMore",
                    type: "get",
                    data: option
                }).then((data) => {
                    resolve(data)
                })
            })
        },
        indexSearchService(option) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/search",
                    type: "get",
                    data: option
                }).then((data) => {
                    resolve(data)
                })
            })
        },
        indexgetHistoryService(option) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/getHistory",
                    type: "get",
                    data: option
                }).then((data) => {
                    resolve(data)
                })
            })
        }
    }
    return service
});