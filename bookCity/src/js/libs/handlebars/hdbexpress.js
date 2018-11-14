define([
    'handlebars'
], function(Handlebars) {
    //handlebars所有自定义表达式
    Handlebars.registerHelper('format', function(date, options) {
        return new Date(date).toLocaleString();
    });
    Handlebars.registerHelper("equal", function(v1, v2, options) {
        console.log(options)
        if (v1 == v2) {
            //满足添加继续执行
            return options.fn(this);
        } else {
            //不满足条件执行{{else}}部分
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("for", function(v1, options) {
        console.log(v1)
        if (v1 instanceof Array) {
            let newArr = v1.map((i) => {
                return options.fn(i);
            }).join("")
            return newArr
        } else {
            return options.fn("请输入正确的数据格式，数组");
        }
    });
    Handlebars.registerHelper("testif", function(data, origin, target, type, options) {
        // console.log(data, origin, target)
        if (origin !== 0) {
            switch (type) {
                case 1:
                    {
                        if (origin < target + 1) {
                            data.list = origin + 1
                            return options.fn(data)
                        }
                    }
                    break
                case 2:
                    {
                        if (origin > target) {
                            return options.fn(data)
                        }
                    }
                    break
                case 3:
                    {
                        if (origin <= target) {
                            return options.fn(data)
                        }
                    }
                    break
                case 4:
                    {
                        if (origin >= target) {
                            return options.fn(data)
                        }
                    }
                    break
                case 5:
                    {
                        if (origin == target) {
                            return options.fn(data)
                        }
                    }
                    break
            }
        }



    });



});