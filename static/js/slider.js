var Slider = {
        isScrolling: false, /*初始化动画是否进行中*/
        newClass: function (obj) {
            obj = obj || {};
            if (this.isScrolling == false) {
                this.init.prototype = Slider;
                this.isScrolling = true;
            }
            return new this.init(obj);
            /*实例化一个对象*/
        },
        init: function (options) {
            var _this = this;
            this.options = options;
            this.options.slideBox = this.options.slide.querySelector('.slide-box');
            this.options.sMain = this.options.slide.querySelectorAll('.sMain');
            this.options.slideItem = this.options.slide.querySelector('.slide-item');
            this.options.leftBtn = this.options.slide.querySelector(".slide-btn-left");
            this.options.rightBtn = this.options.slide.querySelector(".slide-btn-right");
            !this.options.item ? this.options.item = 0 : true;
            !this.options.slideItem ? this.curItem = null : this.options.sItem = this.options.slideItem.querySelectorAll("li");
            this.curItem();
            this.newStyle();
            this.options.fn ? this.options.fn() : false;
            /*绑定触摸事件*/
            this.bindTouch();
            if (this.options.switch == true) {
                this.setIn = setInterval(
                    function () {
                        if (!_this.isScrolling) {
                            return;
                        }
                        _this.nextPage();
                    }, _this.options.time);
            }
        },

        newStyle: function () {
            this.winWidth = this.options.slide.offsetWidth;
            this.options.winWidth ? this.winWidth = this.options.winWidth * this.winWidth : this.winWidth = window.innerWidth;
            this.options.minWidth ? this.minWidth = this.winWidth * this.options.minWidth : this.minWidth = 0;
            this.options.slideBox.style.width = this.winWidth * this.options.sMain.length + "px";
            this.options.slideBox.style.width = this.winWidth * this.options.sMain.length + "px";
            for (var i = 0; i < this.options.sMain.length; i++) {
                this.options.sMain[i].style.width = this.winWidth + "px";
            }
            this.newCss(this.options.slide, {
                "position": "relative",
                "width": this.winWidth,
                "z-index": "1",
                "display": "block"
            });
            this.newCss(this.options.slideBox, {
                "width": this.winWidth * this.options.sMain.length + "px",
                "z-index": " 2"
            });
            this.newCss(this.options.sMain, {
                "float": "left",
                "z-index": "3"
            });

        },
        bindTouch: function () {
            var _this = this;
            var startPos = null;
            window.onresize = function () {
                _this.newStyle();
                _this.options.fn ? _this.options.fn() : false;
            };
            if (this.options.sItem) {
                for (var i = 0; i < this.options.sItem.length; i++) {
                    this.options.sItem[i].addEventListener('click', function () {
                        clearInterval(_this.setIn);
                        _this.options.item = $(this).index();
                        _this.objAnimation();
                        _this.curItem();
                        if (_this.options.switch == true) {
                            _this.setIn = setInterval(
                                function () {
                                    _this.nextPage();
                                }, _this.options.time);
                        }
                    }, false)
                }
            }
            if (this.options.leftBtn) {
                this.options.leftBtn.addEventListener('click', function () {
                    _this.isScrolling = true;
                    clearInterval(_this.setIn);
                    _this.prevPage();
                    if (_this.options.switch == true) {
                        _this.setIn = setInterval(
                            function () {
                                _this.nextPage();
                            }, _this.options.time);
                    }
                }, false);
                this.options.rightBtn.addEventListener('click', function () {
                    _this.isScrolling = true;
                    clearInterval(_this.setIn);
                    _this.nextPage();
                    if (_this.options.switch == true) {
                        _this.setIn = setInterval(
                            function () {
                                _this.nextPage();
                            }, _this.options.time);
                    }
                }, false);
            }
            this.options.slideBox.addEventListener('touchstart', function (event) {
                _this.isScrolling = true;
                clearInterval(_this.setIn);
                var startTouch = event.changedTouches[0];
                startPos = {
                    x: startTouch.pageX,
                    y: startTouch.pageY,
                    time: +new Date()
                };
                event.preventDefault();
            }, false);

            this.options.slideBox.addEventListener('touchmove', function (event) {
                if (!_this.isScrolling) {
                    return;
                }
                var moveTouch = event.changedTouches[0];
                var movePos = {
                    x: moveTouch.pageX - startPos.x,
                    y: moveTouch.pageY - startPos.y
                };

                _this.isScrolling = Math.abs(movePos.x) > Math.abs(movePos.y);
                if (_this.isScrolling) {
                    var moveOffset = movePos.x - _this.options.item * _this.winWidth;
                    _this.animationStar(moveOffset, 0);
                }
            }, false);

            this.options.slideBox.addEventListener('touchend', function (event) {
                if (!_this.isScrolling) {
                    return;
                }
                var duration = +new Date() - startPos.time;
                var endTouch = event.changedTouches[0];
                var endPos = {
                    x: endTouch.pageX - startPos.x,
                    y: endTouch.pageY - startPos.y
                };
                if (duration > 10) {
                    if (Math.abs(endPos.x) > 50) {
                        if (endPos.x > 0) {
                            if (_this.options.item == 0) {
                                _this.isScrolling = false;
                                _this.objAnimation();
                            } else {
                                _this.prevPage();
                            }

                        } else if (endPos.x < 0) {
                            if (_this.options.item == _this.options.sMain.length - 1) {
                                _this.isScrolling = false;
                                _this.objAnimation();
                            } else {
                                _this.nextPage();
                            }

                        } else {
                            _this.objAnimation();
                            _this.isScrolling = false;
                        }
                    } else {
                        _this.objAnimation();
                        _this.isScrolling = false;
                    }
                }
                if (_this.options.switch == true) {
                    _this.setIn = setInterval(
                        function () {
                            if (!_this.isScrolling) {
                                return;
                            }
                            _this.nextPage();
                        }, _this.options.time);
                }
            }, false)
        }
        ,
        nextPage: function () {
            if (this.isScrolling == false) {
                return;
            }
            if (this.options.item >= this.options.sMain.length - 1) {
                this.options.item = -1;
            }
            this.options.item++;
            this.objAnimation();
            /*处理动画*/
            this.curItem();
            /*显示当前索引值*/
        }
        ,
        prevPage: function () {
            if (this.isScrolling == false) {
                return;
            }
            if (this.options.item <= 0) {
                this.options.item = this.options.sMain.length - 1;
            }
            this.options.item--;
            this.objAnimation();
            this.curItem();
        }
        ,
        curItem: function () {
            for (var i = 0; i < this.options.sItem.length; i++) {
                this.options.sItem[i].className = "";
            }
            this.options.sItem[this.options.item].className = "cur";
        }
        ,
        objAnimation: function () {
            this.setEq = -(this.options.item * this.winWidth - this.minWidth);
            this.animationStar(this.setEq, 500);
        }
        ,
        animationStar: function (num, time) {
            this.newCss(this.options.slideBox, {
                "-webkit-transform": "translate3d(" + num + "px,0,0)",
                "-moz-transform": "translate3d(" + num + "px,0,0)",
                "-ms-transform": "translate3d(" + num + "px,0,0)",
                "transform": "translate3d(" + num + "px,0,0)",
                "-webkit-transition": time + "ms",
                "-moz-transition": time + "ms",
                "-ms-transition": time + "ms",
                "transition": time + "ms"
            });
        }
        ,
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
    }
    ;
