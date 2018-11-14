//格式化url参数
define([

], function() {
    return function(url) {
        let str = url.slice(1)
        let arr = str.split("&")
        let obj = {}
        arr.forEach((i) => {
            let everyI = i.split("=")
            obj[everyI[0]] = everyI[1]
        });
        return obj
    }
});