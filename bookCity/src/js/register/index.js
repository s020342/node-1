require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.register"], ($, querystring, ServiceRegister) => {
        let { registerService } = ServiceRegister

        $("#reg").click(() => {
            let obj = {
                userName: $("#user").val(),
                password: $("#pwd").val()
            }
            registerService(obj).then((data) => {
                if (data.code == "2010") {

                    window.location.href = "/page/login.html" + window.location.search
                } else {
                    alert("注册失败")
                }
            })
        })

    })
})