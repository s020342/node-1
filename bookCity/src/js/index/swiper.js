require(["/js/app.js", "require"], (data, require) => {
    require(["$", "swiper", "event"], ($, Swiper, event) => {


        var mySwiper = new Swiper(".swiper-container", {

                pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                },
                onSlideChangeEnd: function(swiper) {
                    //切换结束时，告诉我现在是第几个slide
                    var index = swiper.activeIndex
                    $('.book-head li').eq(index).addClass('cur').siblings().removeClass('cur')
                }

            })
            //通过event进行用户点击事件监听
        event.on("scroll", function(index) {
            mySwiper.slideTo(index)
        })
    })
})