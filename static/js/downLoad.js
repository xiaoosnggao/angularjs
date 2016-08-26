var downLoad = {
    isScrolling: false, /*初始化动画是否进行中*/
    newClass: function (obj) {
        obj = obj || {};
        if (this.isScrolling == false) {
            this.init.prototype = downLoad;
            this.isScrolling = true;
        }
        return new this.init(obj);
        /*实例化一个对象*/
    },
    init: function (options) {
        this.options = options;
        this.options.slideBox = this.options.slide.querySelector(this.options.slideBoxClass);
        var refreshFn = "<div class='loding refresh'><div class='loader'><div class='loader-inner line-spin-fade-loader'><div></div><div></div><div></div><div></div> <div></div> <div></div> <div></div> <div></div> </div> </div> <div class='loader-info'> 松开刷新 </div> </div>";
        var loading = "<div class='loding loding-end'><div class='loader'><div class='loader-inner line-spin-fade-loader'><div></div><div></div><div></div><div></div> <div></div> <div></div> <div></div> <div></div> </div> </div> <div class='loader-info'> 松开加载 </div> </div>";

        $(this.options.slideBox).append(loading, refreshFn);
        this.refresh = this.options.slide.querySelector(".refresh");
        this.refreshInfo = this.refresh.querySelector(".loader-info");
        this.lodingEnd = this.options.slide.querySelector(".loding-end");
        this.lodingEndInfo = this.lodingEnd.querySelector(".loader-info");
        this.body = $("body");
        this.end = 0;
        this.bodyScrollTop = $(this.body).scrollTop();
        this.bodyHeight = $(this.body).height() - $(window).height();
        if (this.options.type == "loading") {
            $(this.refresh).hide();
        }
        if (this.options.type == "refreshFn") {
            $(this.lodingEnd).hide();
        }
        /*绑定触摸事件*/
        this.newStyle();
        this.bindTouch();
    },

    newStyle: function () {
        this.newCss(this.options.slide, {
            "position": "relative",
            "z-index": "1",
            "display": "block",
            "overflow": " hidden"
        });
        this.newCss(this.options.slideBox, {
            "z-index": " 2"
        });
    },
    bindTouch: function () {
        var _this = this;
        var startPos = null;
        var movePos = null;
        var moveTouch = null;
        var moveOffset = 0;
        var endTouch = null;
        this.options.slideBox.addEventListener('touchstart', function (event) {
            var startTouch = event.changedTouches[0];
            startPos = {
                y: startTouch.pageY,
                time: +new Date()
            };
            _this.refreshInfo.innerText = "松开刷新";
            _this.lodingEndInfo.innerText = "松开加载";
        }, false);
        this.options.slideBox.addEventListener('touchmove', function (event) {
            moveTouch = event.changedTouches[0];
            movePos = {
                y: moveTouch.pageY - startPos.y + _this.end
            };
            _this.bodyScrollTop = $(_this.body).scrollTop();
            _this.bodyHeight = $(_this.body).height() - $(window).height();

            moveOffset = movePos.y;

            if (_this.options.type == "loading") {
                if (_this.bodyScrollTop >= _this.bodyHeight) {
                    _this.animationStar(moveOffset, 0);
                }
            } else {
                if (_this.bodyScrollTop <= 0 || _this.bodyScrollTop >= _this.bodyHeight) {
                    _this.animationStar(moveOffset, 0);
                }
            }
        }, false);

        this.options.slideBox.addEventListener('touchend', function (event) {
            if (!movePos) {
                return;
            }
            var duration = +new Date() - startPos.time;
            endTouch = {
                y: movePos.y,
                touchY: moveTouch.pageY
            };
            if (duration > 200) {
                if (_this.options.type == "loading") {
                    _this.loading();
                }
                if (_this.options.type == "refreshFn") {
                    _this.refreshFn();
                }
                if (_this.options.type == "all") {
                    _this.refreshFn();
                    _this.loading();
                }
            }
        }, false);
    },
    refreshFn: function () {
        var _this = this;
        if (this.bodyScrollTop <= 0) {
            this.end = $(this.refresh).height() + 30;
            this.animationStar(this.end, 500);
            $(this.refresh).show(200);
            var isRefresh = this.options.refreshFn();
            if (isRefresh) {
                this.refreshInfo.innerText = "刷新成功";
            } else {
                this.refreshInfo.innerText = "数据请求失败";
            }
            setTimeout(function () {
                _this.animationStar(0, 200);
            }, 800)
        } else {
            this.animationStar(0, 500);
        }

    },
    loading: function () {
        var _this = this;
        if (this.bodyScrollTop >= this.bodyHeight) {
            this.end = -($(this.lodingEnd).height() + 30);
            this.animationStar(this.end, 500);
            var isLoading = this.options.loading();
            if (isLoading) {
                this.lodingEndInfo.innerText = "加载成功";
            } else {
                this.lodingEndInfo.innerText = "数据请求失败";
            }
            setTimeout(function () {
                _this.animationStar(0, 200);
            }, 800);
        } else {
            this.animationStar(0, 500);
        }

    },
    animationStar: function (num, time) {
        this.newCss(this.options.slideBox, {
            "-webkit-transform": "translate3d(0," + num + "px,0)",
            "-moz-transform": "translate3d(0," + num + "px,0)",
            "-ms-transform": "translate3d(0," + num + "px,0)",
            "transform": "translate3d(0," + num + "px,0)",
            "-webkit-transition": time + "ms ease-out",
            "-moz-transition": time + "ms ease-out",
            "-ms-transition": time + "ms ease-out",
            "transition": time + "ms ease-out"
        });
    },
    newCss: function (ele, obj) {
        if (ele.length) {
            for (var s = 0; s < ele.length; s++) {
                for (var i in obj) {
                    ele[s].style[i] = obj[i];
                }
            }
        } else {
            for (var i in obj) {
                ele.style[i] = obj[i];
            }
        }
    }
};
