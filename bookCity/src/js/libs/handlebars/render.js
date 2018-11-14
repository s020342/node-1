define([
    "$",
    "handlebars",
    "hdbexpress",
], function($, Handlebars) {
    function render(template, data, target) {
        //用jquery获取模板
        var tpl = $(template).html();
        //预编译模板
        var template = Handlebars.compile(tpl)


        //匹配内容
        var dom = template(data);
        // console.log(dom)
        //输入模板
        $(target).html(dom);

    }
    return render
});