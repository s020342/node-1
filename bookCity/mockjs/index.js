var app = require("../config/httpRequest.js")

var homeJson = require('./mock/home.json');
var hotJson = require('./mock/search-hot.json');
var zhuJson = require('./mock/search-zhu.json');
var tianJson = require('./mock/search-tian.json');
var detail_352876 = require('./mock/352876.json');
var recommend = require('./mock/recommend.json');

var articleClass = require('./mock/articleClass.json');
var articleDetail = require('./mock/articleDetail.json');
var chapterList = require('./mock/chapter-list.json');
var artical1 = require('./mock/artical/data1.json');
var artical2 = require('./mock/artical/data2.json');
var artical3 = require('./mock/artical/data3.json');
var artical4 = require('./mock/artical/data4.json');



var fetch = require("node-fetch")
    //存储历史记录
var history = {

}
var userList = [{
    userName: "zhangsan",
    password: "123456",
    userId: 1
}]
var obj = {
    '/api/home': homeJson,
    '/api/loadMore?pagenum=1&count=10': recommend,
    '/api/hot': hotJson,
    '/api/search?key=诛仙': zhuJson,
    '/api/search?key=择天记': tianJson,
    '/api/detail?fiction_id=352876': detail_352876,

    '/api/chapter?fiction_id=352876': chapterList,
    '/api/artical?fiction_id=352876&chapter_id=1': artical1,
    '/api/artical?fiction_id=352876&chapter_id=2': artical2,
    '/api/artical?fiction_id=352876&chapter_id=3': artical3,
    '/api/artical?fiction_id=352876&chapter_id=4': artical4
}

//首页首次加载所需数据
app.get("/api/home", (req, res, next) => {

        res.send(homeJson)
    })
    //首页滑动加载接口
app.get("/api/loadMore", (req, res, next) => {
    console.log(req.body)
    let { pagenum, count } = req.query
    let recommends = recommend
    let data = {...recommends,
        ... {
            items: recommends.items.slice((pagenum - 1) * count, pagenum * count)
        }
    }
    res.send(data)
})

//首页搜索接口
app.get("/api/search", (req, res, next) => {

    let { id, text } = req.query
    console.log(req.query)
        //首页搜索设置历史记录接口
    if (history.hasOwnProperty(id)) {
        history[id].push(text)

    } else {
        history[id] = [text]
    }
    //相应搜索到的数据
    let data = recommend.items.filter((i) => {
        if (i.title.includes(text) || i.authors.includes(text)) {
            return true
        } else {
            return false
        }

    })

    res.send(data)
})


//首页搜索获取历史记录接口
app.get("/api/getHistory", (req, res, next) => {
    console.log(req.body)
    let { id } = req.query

    if (history.hasOwnProperty(id)) {
        res.send({
            code: "2000",
            msg: "无数据",
            data: history[id]
        })
    } else {
        res.send({
            code: "2001",
            msg: "无数据"
        })
    }


})

//分类列表接口
app.get("/api/getArticleClass", (req, res, next) => {

    let { id } = req.query
    console.log(id)
    let data = null
    articleClass.some((i) => {
        if (i.ad_setting_id == id) {
            data = i
            return true
        } else {
            return false
        }
    })

    if (data) {
        res.send({
            code: "2010",
            msg: "有数据",
            data
        })
    } else {
        res.send({
            code: "2011",
            msg: "无数据"
        })
    }


})


//文章详情
app.get("/api/getArticleDetail", (req, res, next) => {

    let { id } = req.query
    console.log(id)
    let data = []
    articleDetail.forEach(i => {
        data.push(...i.data.data)
    });
    console.log(data)
        // console.log(articleDetail)
    var result = null
    data.some((i) => {
        if (i.fiction_id == id) {
            result = i
            return true
        } else {
            return false
        }
    })

    if (result) {
        res.send({
            code: "2010",
            msg: "有数据",
            data: result
        })
    } else {
        res.send({
            code: "2011",
            msg: "无数据"
        })
    }

})


//登录接口
app.post("/api/login", (req, res, next) => {
    let { userName, password } = req.body
    var result = null
    userList.some((i) => {
        if (i.userName == userName && i.password == password) {
            result = i
            return true
        } else {
            return false
        }
    })

    if (result) {
        res.send({
            code: "2010",
            msg: "有数据",
            data: result.userId
        })
    } else {
        res.send({
            code: "2011",
            msg: "无数据"
        })
    }
})

function randomNum(num) {
    let str = ""
    for (let i = 0; i < num; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

//注册接口
app.post("/api/register", (req, res, next) => {
    let { userName, password } = req.body
    var result = null
    let state = userList.every((i) => {
        if (i.userName != userName) {
            return true
        } else {
            return false
        }
    })

    if (state) {
        let obj = {
            userName,
            password,
            userId: randomNum(10)
        }
        console.log(obj)
        userList.push(obj)

        res.send({
            code: "2010",
            msg: "注册成功"
        })
    } else {
        res.send({
            code: "2011",
            msg: "用户名已存在"
        })
    }
})


var articleRead = [{
    fiction_id: 46525,
    chapterList: [{
            chapter_id: 1,
            url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=2edfe283fce845c98e4040cf8d339fb2&token=NuXIzAh93h2w99ricPIxalBX-zOpF5Pc5geLw3shDXqpVT4U21tYEPnsmXPWfZ4xw2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=h1GkIamDm5WdRZvqrtiOuyL41us"
        },
        {
            chapter_id: 2,
            url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=a65656b16bef4d5d908c58a0be1fe7af&token=NuXIzAh93h2w99ricPIxasFLxx8GjRlX9ptXrfY_tex0V-Uei5y4t_WXXyRfhDTew2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=KjHzro1LGIktTYB51iLb4aCJey4"
        },
        {
            chapter_id: 3,
            url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=30aab1eeb8ef4824a651a197e4b8c458&token=NuXIzAh93h2w99ricPIxalRJSknBP7rWF0TpXqiGzXZ7UNU6MzdZaInTtuvmz5Gcw2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=gVjYf_Jy8kUCwKJuSc2uiSPnoxA"
        },
        {
            chapter_id: 4,
            url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=ef1b7d89339a4a46bde4a9027ebb3386&token=NuXIzAh93h2w99ricPIxasVR1KdQApCLK57GLHbNbKAAgokiAuYaQMi690VsHva0w2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=4jmoetLE0L-wvE79agnDDs5l0lE"
        }
    ]
}]

//接口代理
app.get("/api/articleRead", (req, res, next) => {
    let { fiction_id, chapter_id } = req.query
    var result = null
    let state = articleRead.some((i) => {
        if (i.fiction_id == fiction_id) {
            return i.chapterList.some((j) => {
                if (j.chapter_id == chapter_id) {
                    result = j.url
                    return true
                } else {
                    return false
                }
            })

        } else {
            return false
        }
    })


    if (state) {
        fetch(result)
            .then(res => res.text())
            .then((body) => {
                // console.log(body)
                try {
                    function duokan_fiction_chapter(data) {

                        res.send({
                            code: "2010",
                            data,
                            msg: "数据读取成功"
                        })
                    }
                    eval(body)

                } catch (err) {
                    res.send({
                        code: "2010",
                        msg: "数据不存在"
                    })
                }
            })
    } else {
        res.send({
            code: "2011",
            msg: "数据不存在"
        })
    }
})
var articleList = require("./mock/articleList.json")


//文章章节列表
app.get("/api/getArticleList", (req, res, next) => {
    let { fiction_id } = req.query


    res.send({
        code: "2010",
        data: articleList,
        msg: "数据读取成功"
    })
})

module.exports = app.run