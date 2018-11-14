define([
    "$",
    "base64",
], function($, base64) {
    let service = {
        articleDetailService(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/getArticleDetail",
                    type: "get",
                    data: data
                }).then((data) => {
                    resolve(data)
                })
            })
        },
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
        },
        articleContentService(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/articleRead",
                    type: "get",
                    data: data
                }).then((data) => {
                    resolve(data)
                })
            })
        },
        async articleAllService(data) {
            let reqdatas = await service.articleListService(data)
            console.log(reqdatas)
            let reqdata = reqdatas.data[0].items
            console.log(reqdata.length)
            let promiseArr = []
            for (let i = 0; i < reqdata.length; i++) {

                promiseArr.push(service.articleContentService({ fiction_id: reqdatas.data[0].fiction_id, chapter_id: reqdata[i].chapter_id }))
            }

            let allData = await Promise.all(promiseArr)

            let result = allData.map((i, index) => {
                let currentData = JSON.parse(base64.decode(i.data))
                currentData.id = reqdata[index].chapter_id
                return currentData
            })
            return result
        }
    }
    return service
})