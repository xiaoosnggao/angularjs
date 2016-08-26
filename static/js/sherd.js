/**
 * Created by Administrator on 2016/6/14.
 */

//控制列表显示隐藏
$(function () {
    $(".wxc-icon-caret").parents(".wxc-cells").on("click", function (e) {
        if (!$(this).find(".wxc-icon-caret").is(".cur")) {
            $(".wxc-cells-warp").removeClass('show');
            $(this).next(".wxc-cells-warp").addClass('show');
            $('.wxc-icon-caret').removeClass('cur');
            $(this).find('.wxc-icon-caret').addClass('cur');
        } else {
            $(this).next(".wxc-cells-warp").removeClass('show');
            $(this).find('.wxc-icon-caret').removeClass('cur');
        }
        e.stopPropagation();
    })
});


//头部下拉选择
$.fn.sKongHeadSelect = function (option) {
    var $thit = $(this);
    var html = $("<div></div>", {
        class: 'wxc-mask',
        click: function () {
            $(this).parent().fadeOut(200);
        }
    });
    $(option.eleL ).on("click", function () {
        $(option.eleShowL).fadeIn(200).append(html).siblings(".wxc-alert-dg").fadeOut(200).find(".wxc-mask").remove();
    });
    $(option.eleR).on("click", function () {
        $( option.eleShowR).fadeIn(200).append(html).siblings(".wxc-alert-dg").fadeOut(200).find(".wxc-mask").remove();
    });
    $(option.eleR).on("click", function () {
        $(option.eleShowR).fadeIn(200).siblings(".wxc-alert-dg").fadeOut(200);

    });

    $(this).find(".wxc-head-dq-bg").on("click", function () {
        $(option.eleShowL).fadeOut(200);
    });
    $(this).find(option.eleShowL).find(".wxc-cell").on("click", function () {
        $(this).addClass("hot").siblings().removeClass("hot");
        $thit.find(option.eleL).text($(this).text());
        $(option.eleShowL).fadeOut(200);
    });

    $(this).find(".wxc-content-ever .wxc-content-hd").on("click", function () {
        var ele = $(this).parents(".wxc-content-ever");
        if (ele.is(".down")) {
            ele.removeClass("down");
        } else {
            ele.addClass("down");
        }
    })
};

//input 清空内容
$(function () {
    $(".wxc-cells-input").find(".wxc-input").on("keyup", function () {
        var ele = $(this).siblings(".wxc-icon-close");
        var seachIcon = $(this).siblings(".wxc-icon-seach");
        var seachBtn = $(this).parents(".wxc-cells-input").siblings(".wxc-seach-btn");
        seachIcon.fadeOut(200);
        seachBtn.fadeIn(200);
        if (ele.length > 0) {
            ele.show();
        } else {
            var html = $("<i></i>", {
                class: 'wxc-icon wxc-icon-close',
                click: function () {
                    var str = "";
                    $(this).siblings(".wxc-input").val(str);
                    $(this).fadeOut(100);
                    seachIcon.fadeIn(200);
                    seachBtn.fadeOut(200);
                }
            }).append();
            $(this).parent().append(html);
        }
        if ($(this).val() == "") {
            ele.fadeOut(100);
            seachIcon.fadeIn(200);
            seachBtn.fadeOut(200);
        }
    });
});

$(function () {
    var html = $("<div></div>", {
        class: 'wxc-mask',
        click: function () {
            $(this).fadeOut(100);
            $(".wxc-dialog").fadeOut(200);
        }
    });
    $(".wxc-dialog-show").on("click", function () {
        if ($(".wxc-mask").length > 0) {
            $(".wxc-mask").fadeIn(200);
        } else {
            $('body').append(html);
        }
        $(".wxc-dialog").fadeIn(200);
    });
    $(".default").on("click",function(){
        $(".wxc-mask").fadeOut(100);
        $(".wxc-dialog").fadeOut(200);
    })
});

$(function () {
    $(".wxc-select-bg-hot").find(".wxc-check").on("change", function () {
        var _this = $(this);
        var patent = _this.parents(".wxc-cell");
        if (_this.is(':checked')) {
            patent.addClass("hot");
        } else {
            patent.removeClass("hot")
        }
    })
});
