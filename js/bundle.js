var e;
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(d) {
    "use strict";
    var s, r = window.Slick || {};
    (s = 0, r = function(e, t) {
        var i, n = this;
        n.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: d(e),
            appendDots: d(e),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(e, t) {
                return d('<button type="button" />').text(t + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, n.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, d.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = d(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, i = d(e).data("slick") || {}, n.options = d.extend({}, n.defaults, t, i), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = d.proxy(n.autoPlay, n), n.autoPlayClear = d.proxy(n.autoPlayClear, n), n.autoPlayIterator = d.proxy(n.autoPlayIterator, n), n.changeSlide = d.proxy(n.changeSlide, n), n.clickHandler = d.proxy(n.clickHandler, n), n.selectHandler = d.proxy(n.selectHandler, n), n.setPosition = d.proxy(n.setPosition, n), n.swipeHandler = d.proxy(n.swipeHandler, n), n.dragHandler = d.proxy(n.dragHandler, n), n.keyHandler = d.proxy(n.keyHandler, n), n.instanceUid = s++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, r.prototype.addSlide = r.prototype.slickAdd = function(e, t, i) {
        var n = this;
        if ("boolean" == typeof t) i = t, t = null;
        else if (t < 0 || t >= n.slideCount) return !1;
        n.unload(), "number" == typeof t ? 0 === t && 0 === n.$slides.length ? d(e).appendTo(n.$slideTrack) : i ? d(e).insertBefore(n.$slides.eq(t)) : d(e).insertAfter(n.$slides.eq(t)) : !0 === i ? d(e).prependTo(n.$slideTrack) : d(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(e, t) {
            d(t).attr("data-slick-index", e)
        }), n.$slidesCache = n.$slides, n.reinit()
    }, r.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, r.prototype.animateSlide = function(e, t) {
        var i = {},
            n = this;
        n.animateHeight(), !0 === n.options.rtl && !1 === n.options.vertical && (e = -e), !1 === n.transformsEnabled ? !1 === n.options.vertical ? n.$slideTrack.animate({
            left: e
        }, n.options.speed, n.options.easing, t) : n.$slideTrack.animate({
            top: e
        }, n.options.speed, n.options.easing, t) : !1 === n.cssTransitions ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft), d({
            animStart: n.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: n.options.speed,
            easing: n.options.easing,
            step: function(e) {
                e = Math.ceil(e), !1 === n.options.vertical ? i[n.animType] = "translate(" + e + "px, 0px)" : i[n.animType] = "translate(0px," + e + "px)", n.$slideTrack.css(i)
            },
            complete: function() {
                t && t.call()
            }
        })) : (n.applyTransition(), e = Math.ceil(e), !1 === n.options.vertical ? i[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(i), t && setTimeout(function() {
            n.disableTransition(), t.call()
        }, n.options.speed))
    }, r.prototype.getNavTarget = function() {
        var e = this.options.asNavFor;
        return e && null !== e && (e = d(e).not(this.$slider)), e
    }, r.prototype.asNavFor = function(t) {
        var e = this.getNavTarget();
        null !== e && "object" == typeof e && e.each(function() {
            var e = d(this).slick("getSlick");
            e.unslicked || e.slideHandler(t, !0)
        })
    }, r.prototype.applyTransition = function(e) {
        var t = this,
            i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, r.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, r.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }, r.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, r.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = d(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = d(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, r.prototype.buildDots = function() {
        var e, t, i = this;
        if (!0 === i.options.dots) {
            for (i.$slider.addClass("slick-dotted"), t = d("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) t.append(d("<li />").append(i.options.customPaging.call(this, i, e)));
            i.$dots = t.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
        }
    }, r.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            d(t).attr("data-slick-index", e).data("originalStyling", d(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? d('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), d("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, r.prototype.buildRows = function() {
        var e, t, i, n, s, o, r, a = this;
        if (n = document.createDocumentFragment(), o = a.$slider.children(), 1 < a.options.rows) {
            for (r = a.options.slidesPerRow * a.options.rows, s = Math.ceil(o.length / r), e = 0; e < s; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var d = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var c = e * r + (t * a.options.slidesPerRow + i);
                        o.get(c) && d.appendChild(o.get(c))
                    }
                    l.appendChild(d)
                }
                n.appendChild(l)
            }
            a.$slider.empty().append(n), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, r.prototype.checkResponsive = function(e, t) {
        var i, n, s, o = this,
            r = !1,
            a = o.$slider.width(),
            l = window.innerWidth || d(window).width();
        if ("window" === o.respondTo ? s = l : "slider" === o.respondTo ? s = a : "min" === o.respondTo && (s = Math.min(l, a)), o.options.responsive && o.options.responsive.length && null !== o.options.responsive) {
            for (i in n = null, o.breakpoints) o.breakpoints.hasOwnProperty(i) && (!1 === o.originalSettings.mobileFirst ? s < o.breakpoints[i] && (n = o.breakpoints[i]) : s > o.breakpoints[i] && (n = o.breakpoints[i]));
            null !== n ? null !== o.activeBreakpoint ? (n !== o.activeBreakpoint || t) && (o.activeBreakpoint = n, "unslick" === o.breakpointSettings[n] ? o.unslick(n) : (o.options = d.extend({}, o.originalSettings, o.breakpointSettings[n]), !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e)), r = n) : (o.activeBreakpoint = n, "unslick" === o.breakpointSettings[n] ? o.unslick(n) : (o.options = d.extend({}, o.originalSettings, o.breakpointSettings[n]), !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e)), r = n) : null !== o.activeBreakpoint && (o.activeBreakpoint = null, o.options = o.originalSettings, !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e), r = n), e || !1 === r || o.$slider.trigger("breakpoint", [o, r])
        }
    }, r.prototype.changeSlide = function(e, t) {
        var i, n, s = this,
            o = d(e.currentTarget);
        switch (o.is("a") && e.preventDefault(), o.is("li") || (o = o.closest("li")), i = s.slideCount % s.options.slidesToScroll != 0 ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, e.data.message) {
            case "previous":
                n = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - n, !1, t);
                break;
            case "next":
                n = 0 === i ? s.options.slidesToScroll : i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + n, !1, t);
                break;
            case "index":
                var r = 0 === e.data.index ? 0 : e.data.index || o.index() * s.options.slidesToScroll;
                s.slideHandler(s.checkNavigable(r), !1, t), o.children().trigger("focus");
                break;
            default:
                return
        }
    }, r.prototype.checkNavigable = function(e) {
        var t, i;
        if (i = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
        else
            for (var n in t) {
                if (e < t[n]) {
                    e = i;
                    break
                }
                i = t[n]
            }
        return e
    }, r.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (d("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", d.proxy(e.interrupt, e, !0)).off("mouseleave.slick", d.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), d(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().off("click.slick", e.selectHandler), d(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), d(window).off("resize.slick.slick-" + e.instanceUid, e.resize), d("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), d(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, r.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", d.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", d.proxy(e.interrupt, e, !1))
    }, r.prototype.cleanUpRows = function() {
        var e;
        1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e))
    }, r.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, r.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), d(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            d(this).attr("style", d(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, r.prototype.disableTransition = function(e) {
        var t = {};
        t[this.transitionType] = "", !1 === this.options.fade ? this.$slideTrack.css(t) : this.$slides.eq(e).css(t)
    }, r.prototype.fadeSlide = function(e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), t && setTimeout(function() {
            i.disableTransition(e), t.call()
        }, i.options.speed))
    }, r.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, r.prototype.filterSlides = r.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, r.prototype.focusHandler = function() {
        var i = this;
        i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(e) {
            e.stopImmediatePropagation();
            var t = d(this);
            setTimeout(function() {
                i.options.pauseOnFocus && (i.focussed = t.is(":focus"), i.autoPlay())
            }, 0)
        })
    }, r.prototype.getCurrent = r.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, r.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            i = 0,
            n = 0;
        if (!0 === e.options.infinite)
            if (e.slideCount <= e.options.slidesToShow) ++n;
            else
                for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode) n = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return n - 1
    }, r.prototype.getLeft = function(e) {
        var t, i, n, s, o = this,
            r = 0;
        return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, s = -1, !0 === o.options.vertical && !0 === o.options.centerMode && (2 === o.options.slidesToShow ? s = -1.5 : 1 === o.options.slidesToShow && (s = -2)), r = i * o.options.slidesToShow * s), o.slideCount % o.options.slidesToScroll != 0 && e + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (r = e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (e - o.slideCount)) * o.slideWidth * -1, (o.options.slidesToShow - (e - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, o.slideCount % o.options.slidesToScroll * i * -1))) : e + o.options.slidesToShow > o.slideCount && (o.slideOffset = (e + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (e + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (r = o.slideOffset = 0), !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), t = !1 === o.options.vertical ? e * o.slideWidth * -1 + o.slideOffset : e * i * -1 + r, !0 === o.options.variableWidth && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow), t = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === o.options.centerMode && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow + 1), t = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, t += (o.$list.width() - n.outerWidth()) / 2)), t
    }, r.prototype.getOption = r.prototype.slickGetOption = function(e) {
        return this.options[e]
    }, r.prototype.getNavigableIndexes = function() {
        var e, t = this,
            i = 0,
            n = 0,
            s = [];
        for (e = !1 === t.options.infinite ? t.slideCount : (i = -1 * t.options.slidesToScroll, n = -1 * t.options.slidesToScroll, 2 * t.slideCount); i < e;) s.push(i), i = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return s
    }, r.prototype.getSlick = function() {
        return this
    }, r.prototype.getSlideCount = function() {
        var i, n, s = this;
        return n = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, !0 === s.options.swipeToSlide ? (s.$slideTrack.find(".slick-slide").each(function(e, t) {
            if (t.offsetLeft - n + d(t).outerWidth() / 2 > -1 * s.swipeLeft) return i = t, !1
        }), Math.abs(d(i).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
    }, r.prototype.goTo = r.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, r.prototype.init = function(e) {
        var t = this;
        d(t.$slider).hasClass("slick-initialized") || (d(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, r.prototype.initADA = function() {
        var i = this,
            n = Math.ceil(i.slideCount / i.options.slidesToShow),
            s = i.getNavigableIndexes().filter(function(e) {
                return 0 <= e && e < i.slideCount
            });
        i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
            var t = s.indexOf(e);
            d(this).attr({
                role: "tabpanel",
                id: "slick-slide" + i.instanceUid + e,
                tabindex: -1
            }), -1 !== t && d(this).attr({
                "aria-describedby": "slick-slide-control" + i.instanceUid + t
            })
        }), i.$dots.attr("role", "tablist").find("li").each(function(e) {
            var t = s[e];
            d(this).attr({
                role: "presentation"
            }), d(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + i.instanceUid + e,
                "aria-controls": "slick-slide" + i.instanceUid + t,
                "aria-label": e + 1 + " of " + n,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(i.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var e = i.currentSlide, t = e + i.options.slidesToShow; e < t; e++) i.$slides.eq(e).attr("tabindex", 0);
        i.activateADA()
    }, r.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }, r.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (d("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && d("li", e.$dots).on("mouseenter.slick", d.proxy(e.interrupt, e, !0)).on("mouseleave.slick", d.proxy(e.interrupt, e, !1))
    }, r.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", d.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", d.proxy(e.interrupt, e, !1)))
    }, r.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), d(document).on(e.visibilityChange, d.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler), d(window).on("orientationchange.slick.slick-" + e.instanceUid, d.proxy(e.orientationChange, e)), d(window).on("resize.slick.slick-" + e.instanceUid, d.proxy(e.resize, e)), d("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), d(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), d(e.setPosition)
    }, r.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, r.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }, r.prototype.lazyLoad = function() {
        function e(e) {
            d("img[data-lazy]", e).each(function() {
                var e = d(this),
                    t = d(this).attr("data-lazy"),
                    i = d(this).attr("data-srcset"),
                    n = d(this).attr("data-sizes") || o.$slider.attr("data-sizes"),
                    s = document.createElement("img");
                s.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        i && (e.attr("srcset", i), n && e.attr("sizes", n)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), o.$slider.trigger("lazyLoaded", [o, e, t])
                    })
                }, s.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), o.$slider.trigger("lazyLoadError", [o, e, t])
                }, s.src = t
            })
        }
        var t, i, n, o = this;
        if (!0 === o.options.centerMode ? n = !0 === o.options.infinite ? (i = o.currentSlide + (o.options.slidesToShow / 2 + 1)) + o.options.slidesToShow + 2 : (i = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1)), o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide) : (i = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide, n = Math.ceil(i + o.options.slidesToShow), !0 === o.options.fade && (0 < i && i--, n <= o.slideCount && n++)), t = o.$slider.find(".slick-slide").slice(i, n), "anticipated" === o.options.lazyLoad)
            for (var s = i - 1, r = n, a = o.$slider.find(".slick-slide"), l = 0; l < o.options.slidesToScroll; l++) s < 0 && (s = o.slideCount - 1), t = (t = t.add(a.eq(s))).add(a.eq(r)), s--, r++;
        e(t), o.slideCount <= o.options.slidesToShow ? e(o.$slider.find(".slick-slide")) : o.currentSlide >= o.slideCount - o.options.slidesToShow ? e(o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)) : 0 === o.currentSlide && e(o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow))
    }, r.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, r.prototype.next = r.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, r.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition()
    }, r.prototype.pause = r.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0
    }, r.prototype.play = r.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, r.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && d(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, r.prototype.prev = r.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, r.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, r.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, i, n, s, o, r = this,
            a = d("img[data-lazy]", r.$slider);
        a.length ? (t = a.first(), i = t.attr("data-lazy"), n = t.attr("data-srcset"), s = t.attr("data-sizes") || r.$slider.attr("data-sizes"), (o = document.createElement("img")).onload = function() {
            n && (t.attr("srcset", n), s && t.attr("sizes", s)), t.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === r.options.adaptiveHeight && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, t, i]), r.progressiveLazyLoad()
        }, o.onerror = function() {
            e < 3 ? setTimeout(function() {
                r.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, i]), r.progressiveLazyLoad())
        }, o.src = i) : r.$slider.trigger("allImagesLoaded", [r])
    }, r.prototype.refresh = function(e) {
        var t, i, n = this;
        i = n.slideCount - n.options.slidesToShow, !n.options.infinite && n.currentSlide > i && (n.currentSlide = i), n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0), t = n.currentSlide, n.destroy(!0), d.extend(n, n.initials, {
            currentSlide: t
        }), n.init(), e || n.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, r.prototype.registerBreakpoints = function() {
        var e, t, i, n = this,
            s = n.options.responsive || null;
        if ("array" === d.type(s) && s.length) {
            for (e in n.respondTo = n.options.respondTo || "window", s)
                if (i = n.breakpoints.length - 1, s.hasOwnProperty(e)) {
                    for (t = s[e].breakpoint; 0 <= i;) n.breakpoints[i] && n.breakpoints[i] === t && n.breakpoints.splice(i, 1), i--;
                    n.breakpoints.push(t), n.breakpointSettings[t] = s[e].settings
                }
            n.breakpoints.sort(function(e, t) {
                return n.options.mobileFirst ? e - t : t - e
            })
        }
    }, r.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, r.prototype.resize = function() {
        var e = this;
        d(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = d(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, r.prototype.removeSlide = r.prototype.slickRemove = function(e, t, i) {
        var n = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : n.slideCount - 1 : !0 === t ? --e : e, n.slideCount < 1 || e < 0 || e > n.slideCount - 1) return !1;
        n.unload(), !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(e).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
    }, r.prototype.setCSS = function(e) {
        var t, i, n = this,
            s = {};
        !0 === n.options.rtl && (e = -e), t = "left" == n.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(e) + "px" : "0px", s[n.positionProp] = e, !1 === n.transformsEnabled || (!(s = {}) === n.cssTransitions ? s[n.animType] = "translate(" + t + ", " + i + ")" : s[n.animType] = "translate3d(" + t + ", " + i + ", 0px)"), n.$slideTrack.css(s)
    }, r.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, r.prototype.setFade = function() {
        var i, n = this;
        n.$slides.each(function(e, t) {
            i = n.slideWidth * e * -1, !0 === n.options.rtl ? d(t).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            }) : d(t).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            })
        }), n.$slides.eq(n.currentSlide).css({
            zIndex: n.options.zIndex - 1,
            opacity: 1
        })
    }, r.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, r.prototype.setOption = r.prototype.slickSetOption = function() {
        var e, t, i, n, s, o = this,
            r = !1;
        if ("object" === d.type(arguments[0]) ? (i = arguments[0], r = arguments[1], s = "multiple") : "string" === d.type(arguments[0]) && (i = arguments[0], n = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === d.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")), "single" === s) o.options[i] = n;
        else if ("multiple" === s) d.each(i, function(e, t) {
            o.options[e] = t
        });
        else if ("responsive" === s)
            for (t in n)
                if ("array" !== d.type(o.options.responsive)) o.options.responsive = [n[t]];
                else {
                    for (e = o.options.responsive.length - 1; 0 <= e;) o.options.responsive[e].breakpoint === n[t].breakpoint && o.options.responsive.splice(e, 1), e--;
                    o.options.responsive.push(n[t])
                }
        r && (o.unload(), o.reinit())
    }, r.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, r.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, r.prototype.setSlideClasses = function(e) {
        var t, i, n, s, o = this;
        if (i = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), o.$slides.eq(e).addClass("slick-current"), !0 === o.options.centerMode) {
            var r = o.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(o.options.slidesToShow / 2), !0 === o.options.infinite && (t <= e && e <= o.slideCount - 1 - t ? o.$slides.slice(e - t + r, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = o.options.slidesToShow + e, i.slice(n - t + 1 + r, n + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - o.options.slidesToShow).addClass("slick-center") : e === o.slideCount - 1 && i.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(e).addClass("slick-center")
        } else 0 <= e && e <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(e, e + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= o.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (s = o.slideCount % o.options.slidesToShow, n = !0 === o.options.infinite ? o.options.slidesToShow + e : e, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - e < o.options.slidesToShow ? i.slice(n - (o.options.slidesToShow - s), n + s).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== o.options.lazyLoad && "anticipated" !== o.options.lazyLoad || o.lazyLoad()
    }, r.prototype.setupInfinite = function() {
        var e, t, i, n = this;
        if (!0 === n.options.fade && (n.options.centerMode = !1), !0 === n.options.infinite && !1 === n.options.fade && (t = null, n.slideCount > n.options.slidesToShow)) {
            for (i = !0 === n.options.centerMode ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - i; e -= 1) t = e - 1, d(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < i + n.slideCount; e += 1) t = e, d(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
            n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                d(this).attr("id", "")
            })
        }
    }, r.prototype.interrupt = function(e) {
        e || this.autoPlay(), this.interrupted = e
    }, r.prototype.selectHandler = function(e) {
        var t = d(e.target).is(".slick-slide") ? d(e.target) : d(e.target).parents(".slick-slide"),
            i = parseInt(t.attr("data-slick-index"));
        i || (i = 0), this.slideCount <= this.options.slidesToShow ? this.slideHandler(i, !1, !0) : this.slideHandler(i)
    }, r.prototype.slideHandler = function(e, t, i) {
        var n, s, o, r, a, l = null,
            d = this;
        if (t = t || !1, !(!0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === e))
            if (!1 === t && d.asNavFor(e), n = e, l = d.getLeft(n), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll)) !1 === d.options.fade && (n = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
                d.postSlide(n)
            }) : d.postSlide(n));
            else if (!1 === d.options.infinite && !0 === d.options.centerMode && (e < 0 || e > d.slideCount - d.options.slidesToScroll)) !1 === d.options.fade && (n = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
            d.postSlide(n)
        }) : d.postSlide(n));
        else {
            if (d.options.autoplay && clearInterval(d.autoPlayTimer), s = n < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + n : n >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : n - d.slideCount : n, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, s]), o = d.currentSlide, d.currentSlide = s, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (a = (a = d.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide), d.updateDots(), d.updateArrows(), !0 === d.options.fade) return !0 !== i ? (d.fadeSlideOut(o), d.fadeSlide(s, function() {
                d.postSlide(s)
            })) : d.postSlide(s), void d.animateHeight();
            !0 !== i ? d.animateSlide(l, function() {
                d.postSlide(s)
            }) : d.postSlide(s)
        }
    }, r.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, r.prototype.swipeDirection = function() {
        var e, t, i, n, s = this;
        return e = s.touchObject.startX - s.touchObject.curX, t = s.touchObject.startY - s.touchObject.curY, i = Math.atan2(t, e), (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)), n <= 45 && 0 <= n ? !1 === s.options.rtl ? "left" : "right" : n <= 360 && 315 <= n ? !1 === s.options.rtl ? "left" : "right" : 135 <= n && n <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? 35 <= n && n <= 135 ? "down" : "up" : "vertical"
    }, r.prototype.swipeEnd = function(e) {
        var t, i, n = this;
        if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1;
        if (n.interrupted = !1, n.shouldClick = !(10 < n.touchObject.swipeLength), void 0 === n.touchObject.curX) return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
                case "left":
                case "down":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    }, r.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, r.prototype.swipeMove = function(e) {
        var t, i, n, s, o, r, a = this;
        return o = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || o && 1 !== o.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== o ? o[0].pageX : e.clientX, a.touchObject.curY = void 0 !== o ? o[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && 4 < r ? !(a.scrolling = !0) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r), i = a.swipeDirection(), void 0 !== e.originalEvent && 4 < a.touchObject.swipeLength && (a.swiping = !0, e.preventDefault()), s = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (s = a.touchObject.curY > a.touchObject.startY ? 1 : -1), n = a.touchObject.swipeLength, (a.touchObject.edgeHit = !1) === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + n * s : a.swipeLeft = t + n * (a.$list.height() / a.listWidth) * s, !0 === a.options.verticalSwiping && (a.swipeLeft = t + n * s), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
    }, r.prototype.swipeStart = function(e) {
        var t, i = this;
        if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return !(i.touchObject = {});
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, i.dragging = !0
    }, r.prototype.unfilterSlides = r.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, r.prototype.unload = function() {
        var e = this;
        d(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, r.prototype.unslick = function(e) {
        this.$slider.trigger("unslick", [this, e]), this.destroy()
    }, r.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, r.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }, r.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
    }, d.fn.slick = function() {
        var e, t, i = this,
            n = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            o = i.length;
        for (e = 0; e < o; e++)
            if ("object" == typeof n || void 0 === n ? i[e].slick = new r(i[e], n) : t = i[e].slick[n].apply(i[e].slick, s), void 0 !== t) return t;
        return i
    }
}), e = function(c) {
    var h, n, u, s, p, t, l = "Close",
        d = "BeforeClose",
        m = "MarkupParse",
        f = "Open",
        g = ".mfp",
        v = "mfp-ready",
        i = "mfp-removing",
        r = "mfp-prevent-close",
        e = function() {},
        a = !!window.jQuery,
        y = c(window),
        w = function(e, t) {
            h.ev.on("mfp" + e + g, t)
        },
        b = function(e, t, i, n) {
            var s = document.createElement("div");
            return s.className = "mfp-" + e, i && (s.innerHTML = i), n ? t && t.appendChild(s) : (s = c(s), t && s.appendTo(t)), s
        },
        _ = function(e, t) {
            h.ev.triggerHandler("mfp" + e, t), h.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), h.st.callbacks[e] && h.st.callbacks[e].apply(h, c.isArray(t) ? t : [t]))
        },
        T = function(e) {
            return e === t && h.currTemplate.closeBtn || (h.currTemplate.closeBtn = c(h.st.closeMarkup.replace("%title%", h.st.tClose)), t = e), h.currTemplate.closeBtn
        },
        o = function() {
            c.magnificPopup.instance || ((h = new e).init(), c.magnificPopup.instance = h)
        };
    e.prototype = {
        constructor: e,
        init: function() {
            var e = navigator.appVersion;
            h.isLowIE = h.isIE8 = document.all && !document.addEventListener, h.isAndroid = /android/gi.test(e), h.isIOS = /iphone|ipad|ipod/gi.test(e), h.supportsTransition = function() {
                var e = document.createElement("p").style,
                    t = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== e.transition) return !0;
                for (; t.length;)
                    if (t.pop() + "Transition" in e) return !0;
                return !1
            }(), h.probablyMobile = h.isAndroid || h.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), u = c(document), h.popupsCache = {}
        },
        open: function(e) {
            var t;
            if (!1 === e.isObj) {
                h.items = e.items.toArray(), h.index = 0;
                var i, n = e.items;
                for (t = 0; t < n.length; t++)
                    if ((i = n[t]).parsed && (i = i.el[0]), i === e.el[0]) {
                        h.index = t;
                        break
                    }
            } else h.items = c.isArray(e.items) ? e.items : [e.items], h.index = e.index || 0;
            if (!h.isOpen) {
                h.types = [], p = "", e.mainEl && e.mainEl.length ? h.ev = e.mainEl.eq(0) : h.ev = u, e.key ? (h.popupsCache[e.key] || (h.popupsCache[e.key] = {}), h.currTemplate = h.popupsCache[e.key]) : h.currTemplate = {}, h.st = c.extend(!0, {}, c.magnificPopup.defaults, e), h.fixedContentPos = "auto" === h.st.fixedContentPos ? !h.probablyMobile : h.st.fixedContentPos, h.st.modal && (h.st.closeOnContentClick = !1, h.st.closeOnBgClick = !1, h.st.showCloseBtn = !1, h.st.enableEscapeKey = !1), h.bgOverlay || (h.bgOverlay = b("bg").on("click" + g, function() {
                    h.close()
                }), h.wrap = b("wrap").attr("tabindex", -1).on("click" + g, function(e) {
                    h._checkIfClose(e.target) && h.close()
                }), h.container = b("container", h.wrap)), h.contentContainer = b("content"), h.st.preloader && (h.preloader = b("preloader", h.container, h.st.tLoading));
                var s = c.magnificPopup.modules;
                for (t = 0; t < s.length; t++) {
                    var o = s[t];
                    o = o.charAt(0).toUpperCase() + o.slice(1), h["init" + o].call(h)
                }
                _("BeforeOpen"), h.st.showCloseBtn && (h.st.closeBtnInside ? (w(m, function(e, t, i, n) {
                    i.close_replaceWith = T(n.type)
                }), p += " mfp-close-btn-in") : h.wrap.append(T())), h.st.alignTop && (p += " mfp-align-top"), h.fixedContentPos ? h.wrap.css({
                    overflow: h.st.overflowY,
                    overflowX: "hidden",
                    overflowY: h.st.overflowY
                }) : h.wrap.css({
                    top: y.scrollTop(),
                    position: "absolute"
                }), (!1 === h.st.fixedBgPos || "auto" === h.st.fixedBgPos && !h.fixedContentPos) && h.bgOverlay.css({
                    height: u.height(),
                    position: "absolute"
                }), h.st.enableEscapeKey && u.on("keyup" + g, function(e) {
                    27 === e.keyCode && h.close()
                }), y.on("resize" + g, function() {
                    h.updateSize()
                }), h.st.closeOnContentClick || (p += " mfp-auto-cursor"), p && h.wrap.addClass(p);
                var r = h.wH = y.height(),
                    a = {};
                if (h.fixedContentPos && h._hasScrollBar(r)) {
                    var l = h._getScrollbarSize();
                    l && (a.marginRight = l)
                }
                h.fixedContentPos && (h.isIE7 ? c("body, html").css("overflow", "hidden") : a.overflow = "hidden");
                var d = h.st.mainClass;
                return h.isIE7 && (d += " mfp-ie7"), d && h._addClassToMFP(d), h.updateItemHTML(), _("BuildControls"), c("html").css(a), h.bgOverlay.add(h.wrap).prependTo(h.st.prependTo || c(document.body)), h._lastFocusedEl = document.activeElement, setTimeout(function() {
                    h.content ? (h._addClassToMFP(v), h._setFocus()) : h.bgOverlay.addClass(v), u.on("focusin" + g, h._onFocusIn)
                }, 16), h.isOpen = !0, h.updateSize(r), _(f), e
            }
            h.updateItemHTML()
        },
        close: function() {
            h.isOpen && (_(d), h.isOpen = !1, h.st.removalDelay && !h.isLowIE && h.supportsTransition ? (h._addClassToMFP(i), setTimeout(function() {
                h._close()
            }, h.st.removalDelay)) : h._close())
        },
        _close: function() {
            _(l);
            var e = i + " " + v + " ";
            if (h.bgOverlay.detach(), h.wrap.detach(), h.container.empty(), h.st.mainClass && (e += h.st.mainClass + " "), h._removeClassFromMFP(e), h.fixedContentPos) {
                var t = {
                    marginRight: ""
                };
                h.isIE7 ? c("body, html").css("overflow", "") : t.overflow = "", c("html").css(t)
            }
            u.off("keyup.mfp focusin" + g), h.ev.off(g), h.wrap.attr("class", "mfp-wrap").removeAttr("style"), h.bgOverlay.attr("class", "mfp-bg"), h.container.attr("class", "mfp-container"), !h.st.showCloseBtn || h.st.closeBtnInside && !0 !== h.currTemplate[h.currItem.type] || h.currTemplate.closeBtn && h.currTemplate.closeBtn.detach(), h.st.autoFocusLast && h._lastFocusedEl && c(h._lastFocusedEl).focus(), h.currItem = null, h.content = null, h.currTemplate = null, h.prevHeight = 0, _("AfterClose")
        },
        updateSize: function(e) {
            if (h.isIOS) {
                var t = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * t;
                h.wrap.css("height", i), h.wH = i
            } else h.wH = e || y.height();
            h.fixedContentPos || h.wrap.css("height", h.wH), _("Resize")
        },
        updateItemHTML: function() {
            var e = h.items[h.index];
            h.contentContainer.detach(), h.content && h.content.detach(), e.parsed || (e = h.parseEl(h.index));
            var t = e.type;
            if (_("BeforeChange", [h.currItem ? h.currItem.type : "", t]), h.currItem = e, !h.currTemplate[t]) {
                var i = !!h.st[t] && h.st[t].markup;
                _("FirstMarkupParse", i), h.currTemplate[t] = !i || c(i)
            }
            s && s !== e.type && h.container.removeClass("mfp-" + s + "-holder");
            var n = h["get" + t.charAt(0).toUpperCase() + t.slice(1)](e, h.currTemplate[t]);
            h.appendContent(n, t), e.preloaded = !0, _("Change", e), s = e.type, h.container.prepend(h.contentContainer), _("AfterChange")
        },
        appendContent: function(e, t) {
            (h.content = e) ? h.st.showCloseBtn && h.st.closeBtnInside && !0 === h.currTemplate[t] ? h.content.find(".mfp-close").length || h.content.append(T()) : h.content = e: h.content = "", _("BeforeAppend"), h.container.addClass("mfp-" + t + "-holder"), h.contentContainer.append(h.content)
        },
        parseEl: function(e) {
            var t, i = h.items[e];
            if ((i = i.tagName ? {
                    el: c(i)
                } : (t = i.type, {
                    data: i,
                    src: i.src
                })).el) {
                for (var n = h.types, s = 0; s < n.length; s++)
                    if (i.el.hasClass("mfp-" + n[s])) {
                        t = n[s];
                        break
                    }
                i.src = i.el.attr("data-mfp-src"), i.src || (i.src = i.el.attr("href"))
            }
            return i.type = t || h.st.type || "inline", i.index = e, i.parsed = !0, h.items[e] = i, _("ElementParse", i), h.items[e]
        },
        addGroup: function(t, i) {
            var e = function(e) {
                e.mfpEl = this, h._openClick(e, t, i)
            };
            i || (i = {});
            var n = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(n).on(n, e)) : (i.isObj = !1, i.delegate ? t.off(n).on(n, i.delegate, e) : (i.items = t).off(n).on(n, e))
        },
        _openClick: function(e, t, i) {
            if ((void 0 !== i.midClick ? i.midClick : c.magnificPopup.defaults.midClick) || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                var n = void 0 !== i.disableOn ? i.disableOn : c.magnificPopup.defaults.disableOn;
                if (n)
                    if (c.isFunction(n)) {
                        if (!n.call(h)) return !0
                    } else if (y.width() < n) return !0;
                e.type && (e.preventDefault(), h.isOpen && e.stopPropagation()), i.el = c(e.mfpEl), i.delegate && (i.items = t.find(i.delegate)), h.open(i)
            }
        },
        updateStatus: function(e, t) {
            if (h.preloader) {
                n !== e && h.container.removeClass("mfp-s-" + n), t || "loading" !== e || (t = h.st.tLoading);
                var i = {
                    status: e,
                    text: t
                };
                _("UpdateStatus", i), e = i.status, t = i.text, h.preloader.html(t), h.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), h.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(e) {
            if (!c(e).hasClass(r)) {
                var t = h.st.closeOnContentClick,
                    i = h.st.closeOnBgClick;
                if (t && i) return !0;
                if (!h.content || c(e).hasClass("mfp-close") || h.preloader && e === h.preloader[0]) return !0;
                if (e === h.content[0] || c.contains(h.content[0], e)) {
                    if (t) return !0
                } else if (i && c.contains(document, e)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            h.bgOverlay.addClass(e), h.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), h.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (h.isIE7 ? u.height() : document.body.scrollHeight) > (e || y.height())
        },
        _setFocus: function() {
            (h.st.focus ? h.content.find(h.st.focus).eq(0) : h.wrap).focus()
        },
        _onFocusIn: function(e) {
            return e.target === h.wrap[0] || c.contains(h.wrap[0], e.target) ? void 0 : (h._setFocus(), !1)
        },
        _parseMarkup: function(s, e, t) {
            var o;
            t.data && (e = c.extend(t.data, e)), _(m, [s, e, t]), c.each(e, function(e, t) {
                if (void 0 === t || !1 === t) return !0;
                if (1 < (o = e.split("_")).length) {
                    var i = s.find(g + "-" + o[0]);
                    if (0 < i.length) {
                        var n = o[1];
                        "replaceWith" === n ? i[0] !== t[0] && i.replaceWith(t) : "img" === n ? i.is("img") ? i.attr("src", t) : i.replaceWith(c("<img>").attr("src", t).attr("class", i.attr("class"))) : i.attr(o[1], t)
                    }
                } else s.find(g + "-" + e).html(t)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === h.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), h.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return h.scrollbarSize
        }
    }, c.magnificPopup = {
        instance: null,
        proto: e.prototype,
        modules: [],
        open: function(e, t) {
            return o(), (e = e ? c.extend(!0, {}, e) : {}).isObj = !0, e.index = t || 0, this.instance.open(e)
        },
        close: function() {
            return c.magnificPopup.instance && c.magnificPopup.instance.close()
        },
        registerModule: function(e, t) {
            t.options && (c.magnificPopup.defaults[e] = t.options), c.extend(this.proto, t.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, c.fn.magnificPopup = function(e) {
        o();
        var t = c(this);
        if ("string" == typeof e)
            if ("open" === e) {
                var i, n = a ? t.data("magnificPopup") : t[0].magnificPopup,
                    s = parseInt(arguments[1], 10) || 0;
                i = n.items ? n.items[s] : (i = t, n.delegate && (i = i.find(n.delegate)), i.eq(s)), h._openClick({
                    mfpEl: i
                }, t, n)
            } else h.isOpen && h[e].apply(h, Array.prototype.slice.call(arguments, 1));
        else e = c.extend(!0, {}, e), a ? t.data("magnificPopup", e) : t[0].magnificPopup = e, h.addGroup(t, e);
        return t
    };
    var k, C, S, z = "inline",
        x = function() {
            S && (C.after(S.addClass(k)).detach(), S = null)
        };
    c.magnificPopup.registerModule(z, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                h.types.push(z), w(l + "." + z, function() {
                    x()
                })
            },
            getInline: function(e, t) {
                if (x(), e.src) {
                    var i = h.st.inline,
                        n = c(e.src);
                    if (n.length) {
                        var s = n[0].parentNode;
                        s && s.tagName && (C || (k = i.hiddenClass, C = b(k), k = "mfp-" + k), S = n.after(C).detach().removeClass(k)), h.updateStatus("ready")
                    } else h.updateStatus("error", i.tNotFound), n = c("<div>");
                    return e.inlineElement = n
                }
                return h.updateStatus("ready"), h._parseMarkup(t, {}, e), t
            }
        }
    });
    var E, D = "ajax",
        I = function() {
            E && c(document.body).removeClass(E)
        },
        A = function() {
            I(), h.req && h.req.abort()
        };
    c.magnificPopup.registerModule(D, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                h.types.push(D), E = h.st.ajax.cursor, w(l + "." + D, A), w("BeforeChange." + D, A)
            },
            getAjax: function(s) {
                E && c(document.body).addClass(E), h.updateStatus("loading");
                var e = c.extend({
                    url: s.src,
                    success: function(e, t, i) {
                        var n = {
                            data: e,
                            xhr: i
                        };
                        _("ParseAjax", n), h.appendContent(c(n.data), D), s.finished = !0, I(), h._setFocus(), setTimeout(function() {
                            h.wrap.addClass(v)
                        }, 16), h.updateStatus("ready"), _("AjaxContentAdded")
                    },
                    error: function() {
                        I(), s.finished = s.loadError = !0, h.updateStatus("error", h.st.ajax.tError.replace("%url%", s.src))
                    }
                }, h.st.ajax.settings);
                return h.req = c.ajax(e), ""
            }
        }
    });
    var W;
    c.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var e = h.st.image,
                    t = ".image";
                h.types.push("image"), w(f + t, function() {
                    "image" === h.currItem.type && e.cursor && c(document.body).addClass(e.cursor)
                }), w(l + t, function() {
                    e.cursor && c(document.body).removeClass(e.cursor), y.off("resize" + g)
                }), w("Resize" + t, h.resizeImage), h.isLowIE && w("AfterChange", h.resizeImage)
            },
            resizeImage: function() {
                var e = h.currItem;
                if (e && e.img && h.st.image.verticalFit) {
                    var t = 0;
                    h.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", h.wH - t)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, W && clearInterval(W), e.isCheckingImgSize = !1, _("ImageHasSize", e), e.imgHidden && (h.content && h.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(t) {
                var i = 0,
                    n = t.img[0],
                    s = function(e) {
                        W && clearInterval(W), W = setInterval(function() {
                            return 0 < n.naturalWidth ? void h._onImageHasSize(t) : (200 < i && clearInterval(W), void(3 === ++i ? s(10) : 40 === i ? s(50) : 100 === i && s(500)))
                        }, e)
                    };
                s(1)
            },
            getImage: function(e, t) {
                var i = 0,
                    n = function() {
                        e && (e.img[0].complete ? (e.img.off(".mfploader"), e === h.currItem && (h._onImageHasSize(e), h.updateStatus("ready")), e.hasSize = !0, e.loaded = !0, _("ImageLoadComplete")) : ++i < 200 ? setTimeout(n, 100) : s())
                    },
                    s = function() {
                        e && (e.img.off(".mfploader"), e === h.currItem && (h._onImageHasSize(e), h.updateStatus("error", o.tError.replace("%url%", e.src))), e.hasSize = !0, e.loaded = !0, e.loadError = !0)
                    },
                    o = h.st.image,
                    r = t.find(".mfp-img");
                if (r.length) {
                    var a = document.createElement("img");
                    a.className = "mfp-img", e.el && e.el.find("img").length && (a.alt = e.el.find("img").attr("alt")), e.img = c(a).on("load.mfploader", n).on("error.mfploader", s), a.src = e.src, r.is("img") && (e.img = e.img.clone()), 0 < (a = e.img[0]).naturalWidth ? e.hasSize = !0 : a.width || (e.hasSize = !1)
                }
                return h._parseMarkup(t, {
                    title: function(e) {
                        if (e.data && void 0 !== e.data.title) return e.data.title;
                        var t = h.st.image.titleSrc;
                        if (t) {
                            if (c.isFunction(t)) return t.call(h, e);
                            if (e.el) return e.el.attr(t) || ""
                        }
                        return ""
                    }(e),
                    img_replaceWith: e.img
                }, e), h.resizeImage(), e.hasSize ? (W && clearInterval(W), e.loadError ? (t.addClass("mfp-loading"), h.updateStatus("error", o.tError.replace("%url%", e.src))) : (t.removeClass("mfp-loading"), h.updateStatus("ready"))) : (h.updateStatus("loading"), e.loading = !0, e.hasSize || (e.imgHidden = !0, t.addClass("mfp-loading"), h.findImageSize(e))), t
            }
        }
    });
    var L;
    c.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, o = h.st.zoom,
                    t = ".zoom";
                if (o.enabled && h.supportsTransition) {
                    var i, n, s = o.duration,
                        r = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + o.duration / 1e3 + "s " + o.easing,
                                n = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                s = "transition";
                            return n["-webkit-" + s] = n["-moz-" + s] = n["-o-" + s] = n[s] = i, t.css(n), t
                        },
                        a = function() {
                            h.content.css("visibility", "visible")
                        };
                    w("BuildControls" + t, function() {
                        if (h._allowZoom()) {
                            if (clearTimeout(i), h.content.css("visibility", "hidden"), !(e = h._getItemToZoom())) return void a();
                            (n = r(e)).css(h._getOffset()), h.wrap.append(n), i = setTimeout(function() {
                                n.css(h._getOffset(!0)), i = setTimeout(function() {
                                    a(), setTimeout(function() {
                                        n.remove(), e = n = null, _("ZoomAnimationEnded")
                                    }, 16)
                                }, s)
                            }, 16)
                        }
                    }), w(d + t, function() {
                        if (h._allowZoom()) {
                            if (clearTimeout(i), h.st.removalDelay = s, !e) {
                                if (!(e = h._getItemToZoom())) return;
                                n = r(e)
                            }
                            n.css(h._getOffset(!0)), h.wrap.append(n), h.content.css("visibility", "hidden"), setTimeout(function() {
                                n.css(h._getOffset())
                            }, 16)
                        }
                    }), w(l + t, function() {
                        h._allowZoom() && (a(), n && n.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === h.currItem.type
            },
            _getItemToZoom: function() {
                return !!h.currItem.hasSize && h.currItem.img
            },
            _getOffset: function(e) {
                var t, i = (t = e ? h.currItem.img : h.st.zoom.opener(h.currItem.el || h.currItem)).offset(),
                    n = parseInt(t.css("padding-top"), 10),
                    s = parseInt(t.css("padding-bottom"), 10);
                i.top -= c(window).scrollTop() - n;
                var o = {
                    width: t.width(),
                    height: (a ? t.innerHeight() : t[0].offsetHeight) - s - n
                };
                return void 0 === L && (L = void 0 !== document.createElement("p").style.MozTransform), L ? o["-moz-transform"] = o.transform = "translate(" + i.left + "px," + i.top + "px)" : (o.left = i.left, o.top = i.top), o
            }
        }
    });
    var F = "iframe",
        H = function(e) {
            if (h.currTemplate[F]) {
                var t = h.currTemplate[F].find("iframe");
                t.length && (e || (t[0].src = "//about:blank"), h.isIE8 && t.css("display", e ? "block" : "none"))
            }
        };
    c.magnificPopup.registerModule(F, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                h.types.push(F), w("BeforeChange", function(e, t, i) {
                    t !== i && (t === F ? H() : i === F && H(!0))
                }), w(l + "." + F, function() {
                    H()
                })
            },
            getIframe: function(e, t) {
                var i = e.src,
                    n = h.st.iframe;
                c.each(n.patterns, function() {
                    return -1 < i.indexOf(this.index) ? (this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), i = this.src.replace("%id%", i), !1) : void 0
                });
                var s = {};
                return n.srcAction && (s[n.srcAction] = i), h._parseMarkup(t, s, e), h.updateStatus("ready"), t
            }
        }
    });
    var $ = function(e) {
            var t = h.items.length;
            return t - 1 < e ? e - t : e < 0 ? t + e : e
        },
        O = function(e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        };
    c.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var o = h.st.gallery,
                    e = ".mfp-gallery";
                return h.direction = !0, !(!o || !o.enabled) && (p += " mfp-gallery", w(f + e, function() {
                    o.navigateByImgClick && h.wrap.on("click" + e, ".mfp-img", function() {
                        return 1 < h.items.length ? (h.next(), !1) : void 0
                    }), u.on("keydown" + e, function(e) {
                        37 === e.keyCode ? h.prev() : 39 === e.keyCode && h.next()
                    })
                }), w("UpdateStatus" + e, function(e, t) {
                    t.text && (t.text = O(t.text, h.currItem.index, h.items.length))
                }), w(m + e, function(e, t, i, n) {
                    var s = h.items.length;
                    i.counter = 1 < s ? O(o.tCounter, n.index, s) : ""
                }), w("BuildControls" + e, function() {
                    if (1 < h.items.length && o.arrows && !h.arrowLeft) {
                        var e = o.arrowMarkup,
                            t = h.arrowLeft = c(e.replace(/%title%/gi, o.tPrev).replace(/%dir%/gi, "left")).addClass(r),
                            i = h.arrowRight = c(e.replace(/%title%/gi, o.tNext).replace(/%dir%/gi, "right")).addClass(r);
                        t.click(function() {
                            h.prev()
                        }), i.click(function() {
                            h.next()
                        }), h.container.append(t.add(i))
                    }
                }), w("Change" + e, function() {
                    h._preloadTimeout && clearTimeout(h._preloadTimeout), h._preloadTimeout = setTimeout(function() {
                        h.preloadNearbyImages(), h._preloadTimeout = null
                    }, 16)
                }), void w(l + e, function() {
                    u.off(e), h.wrap.off("click" + e), h.arrowRight = h.arrowLeft = null
                }))
            },
            next: function() {
                h.direction = !0, h.index = $(h.index + 1), h.updateItemHTML()
            },
            prev: function() {
                h.direction = !1, h.index = $(h.index - 1), h.updateItemHTML()
            },
            goTo: function(e) {
                h.direction = e >= h.index, h.index = e, h.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, t = h.st.gallery.preload,
                    i = Math.min(t[0], h.items.length),
                    n = Math.min(t[1], h.items.length);
                for (e = 1; e <= (h.direction ? n : i); e++) h._preloadItem(h.index + e);
                for (e = 1; e <= (h.direction ? i : n); e++) h._preloadItem(h.index - e)
            },
            _preloadItem: function(e) {
                if (e = $(e), !h.items[e].preloaded) {
                    var t = h.items[e];
                    t.parsed || (t = h.parseEl(e)), _("LazyLoad", t), "image" === t.type && (t.img = c('<img class="mfp-img" />').on("load.mfploader", function() {
                        t.hasSize = !0
                    }).on("error.mfploader", function() {
                        t.hasSize = !0, t.loadError = !0, _("LazyLoadError", t)
                    }).attr("src", t.src)), t.preloaded = !0
                }
            }
        }
    });
    var P = "retina";
    c.magnificPopup.registerModule(P, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (1 < window.devicePixelRatio) {
                    var i = h.st.retina,
                        n = i.ratio;
                    1 < (n = isNaN(n) ? n() : n) && (w("ImageHasSize." + P, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    }), w("ElementParse." + P, function(e, t) {
                        t.src = i.replaceSrc(t, n)
                    }))
                }
            }
        }
    }), o()
}, "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto);
var t, r, o, i, s, n, a, l, d, u, c, h, m, p, f, g, v, y, w, b, _, T, k, C, S, z, x, E, D, I, A, W, L, F, H, O, P, M, R, j;

function N(i, n) {
    var s;
    n = n || 500;
    return function() {
        var e = this,
            t = arguments;
        clearTimeout(s), s = setTimeout(function() {
            i.apply(e, Array.prototype.slice.call(t))
        }, n)
    }
}
$("body").append('<div class="mm-fullscreen-bg"></div>'), $.fn.initMM = function() {
        var n = {
            $mobilemenu: $(".panel-menu"),
            mm_close_button: "Close",
            mm_back_button: "Back",
            mm_breakpoint: 1024,
            mm_enable_breakpoint: !1,
            mm_mobile_button: !1,
            remember_state: !1,
            second_button: !1,
            init: function(e, t) {
                var i = this;
                if (!i.$mobilemenu.length) return console.log('You not have <nav class="panel-menu">menu</nav>. See Documentation'), !1;
                null != t && i.parse_arguments(t), i.$mobilemenu.parse_mm(n), i.$mobilemenu.init_mm(n), i.mm_enable_breakpoint && i.$mobilemenu.check_resolution_mm(n), e.mm_handler(n)
            },
            parse_arguments: function(e) {
                var i = this;
                Object(e).hasOwnProperty("menu_class") && (i.$mobilemenu = $("." + e.menu_class)), $.each(e, function(e, t) {
                    switch (e) {
                        case "right":
                            t && i.$mobilemenu.addClass("mm-right");
                            break;
                        case "close_button_name":
                            i.mm_close_button = t;
                            break;
                        case "back_button_name":
                            i.mm_back_button = t;
                            break;
                        case "width":
                            i.$mobilemenu.css("width", t);
                            break;
                        case "breakpoint":
                            i.mm_breakpoint = t;
                            break;
                        case "enable_breakpoint":
                            i.mm_enable_breakpoint = t;
                            break;
                        case "mobile_button":
                            i.mm_mobile_button = t;
                            break;
                        case "remember_state":
                            i.remember_state = t;
                            break;
                        case "second_button":
                            i.second_button = t
                    }
                })
            },
            show_button_in_mobile: function(e) {
                var t = this;
                t.mm_mobile_button && (window.innerWidth > t.mm_breakpoint ? e.hide() : e.show(), $(window).resize(function() {
                    window.innerWidth > t.mm_breakpoint ? e.hide() : e.show()
                }))
            }
        };
        n.init($(this), arguments[0]), n.show_button_in_mobile($(this))
    }, $.fn.check_resolution_mm = function(e) {
        var t = $(this);
        $(window).resize(function() {
            if (!$("body").hasClass("mm-open") || !t.hasClass("mmitemopen")) return !1;
            window.innerWidth > e.mm_breakpoint && t.closemm(e)
        })
    }, $.fn.mm_handler = function(t) {
        $(this).click(function(e) {
            e.preventDefault(), t.$mobilemenu.openmm()
        }), 0 != t.second_button && $(t.second_button).click(function(e) {
            e.preventDefault(), t.$mobilemenu.openmm()
        })
    }, $.fn.parse_mm = function(o) {
        var e, r = $(this).clone(),
            a = $('<div class="mmpanels"></div>'),
            l = !1,
            t = 0,
            i = !1,
            d = !1;
        $(this).empty(), r.find("a").each(function() {
            i = $(this), (e = i.parent().find("ul").first()).length && (t++, e.prepend("<li></li>").find("li").first().append(i.clone().addClass("mm-original-link")), i.attr("href", "#mm" + t).attr("data-target", "#mm" + t).addClass("mm-next-level"))
        }), r.find("ul").each(function(e) {
            var t, i, n, s;
            d = !1, l = $('<div class="mmpanel mmhidden">').attr("id", "mm" + e).append($(this)), d = 0 == e ? (l.addClass("mmopened").addClass("mmcurrent").removeClass("mmhidden"), n = r.find(".mm-closebtn").html(), s = o.mm_close_button, '<li class="mm-close-parent"><a href="#close" data-target="#close" class="mm-close">' + (n = null == n ? s : n) + "</a></li>") : (t = r.find(".mm-backbtn").html(), i = o.mm_back_button, '<li><a href="#" data-target="#" class="mm-prev-level">' + (t = null == t ? i : t) + "</a></li>"), l.find("ul").first().prepend(d), a.append(l)
        }), $(this).append(a)
    }, $.fn.init_mm = function(s) {
        var o = $(this);
        o.find("a").each(function() {
            $(this).click(function(e) {
                var t = $(this),
                    i = !1,
                    n = "";
                return t.hasClass("mm-next-level") ? (e.preventDefault(), n = t.attr("href"), (i = o.find(".mmcurrent")).addClass("mmsubopened").removeClass("mmcurrent"), o.find(n).removeClass("mmhidden"), setTimeout(function() {
                    o.find(n).scrollTop(0).addClass("mmcurrent").addClass("mmopened")
                }, 0), setTimeout(function() {
                    i.addClass("mmhidden")
                }, 300), !1) : t.hasClass("mm-prev-level") ? (e.preventDefault(), n = t.attr("href"), (i = o.find(".mmcurrent")).removeClass("mmcurrent").removeClass("mmopened"), o.find(".mmsubopened").last().removeClass("mmhidden").scrollTop(0).removeClass("mmsubopened").addClass("mmcurrent"), setTimeout(function() {
                    i.addClass("mmhidden")
                }, 300), !1) : t.hasClass("mm-close") ? (o.closemm(s), !1) : void 0
            })
        }), $(".mm-fullscreen-bg").click(function(e) {
            e.preventDefault(), o.closemm(s)
        })
    }, $.fn.openmm = function() {
        var e = $(this);
        e.show(), setTimeout(function() {
            $("body").addClass("mm-open"), e.addClass("mmitemopen"), $(".mm-fullscreen-bg").fadeIn(300)
        }, 0)
    }, $.fn.closemm = function(e) {
        var t = $(this);
        t.addClass("mmhide"), $(".mm-fullscreen-bg").fadeOut(300), setTimeout(function() {
            ! function(e, t) {
                t.remember_state || (e.find(".mmpanel").toggleClass("mmsubopened mmcurrent mmopened", !1).addClass("mmhidden"), e.find("#mm0").addClass("mmopened").addClass("mmcurrent").removeClass("mmhidden"));
                e.toggleClass("mmhide mmitemopen", !1).hide(), $("body").removeClass("mm-open")
            }(t, e)
        }, 300)
    }, t = window, r = jQuery, g = {
        classes: "",
        inline: f = !(p = "datepicker"),
        language: "ru",
        startDate: new Date,
        firstDay: "",
        weekends: [6, 0],
        dateFormat: "",
        altField: "",
        altFieldDateFormat: "@",
        toggleSelected: !0,
        keyboardNav: !0,
        position: "bottom left",
        offset: 12,
        view: "days",
        minView: "days",
        showOtherMonths: !0,
        selectOtherMonths: !0,
        moveToOtherMonthsOnSelect: !0,
        showOtherYears: !0,
        selectOtherYears: !0,
        moveToOtherYearsOnSelect: !0,
        minDate: "",
        maxDate: "",
        disableNavWhenOutOfRange: !0,
        multipleDates: !1,
        multipleDatesSeparator: ",",
        range: !1,
        todayButton: !1,
        clearButton: !1,
        showEvent: "focus",
        autoClose: !1,
        monthsField: "monthsShort",
        prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
        nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
        navTitles: {
            days: "MM, <i>yyyy</i>",
            months: "yyyy",
            years: "yyyy1 - yyyy2"
        },
        timepicker: !1,
        onlyTimepicker: !1,
        dateTimeSeparator: " ",
        timeFormat: "",
        minHours: 0,
        maxHours: 24,
        minMinutes: 0,
        maxMinutes: 59,
        hoursStep: 1,
        minutesStep: 1,
        onSelect: "",
        onShow: "",
        onHide: "",
        onChangeMonth: "",
        onChangeYear: "",
        onChangeDecade: "",
        onChangeView: "",
        onRenderCell: ""
    }, v = {
        ctrlRight: [17, 39],
        ctrlUp: [17, 38],
        ctrlLeft: [17, 37],
        ctrlDown: [17, 40],
        shiftRight: [16, 39],
        shiftUp: [16, 38],
        shiftLeft: [16, 37],
        shiftDown: [16, 40],
        altUp: [18, 38],
        altRight: [18, 39],
        altLeft: [18, 37],
        altDown: [18, 40],
        ctrlShiftUp: [16, 17, 38]
    }, (m = y = function(e, t) {
        this.el = e, this.$el = r(e), this.opts = r.extend(!0, {}, g, t, this.$el.data()), c == o && (c = r("body")), this.opts.startDate || (this.opts.startDate = new Date), "INPUT" == this.el.nodeName && (this.elIsInput = !0), this.opts.altField && (this.$altField = "string" == typeof this.opts.altField ? r(this.opts.altField) : this.opts.altField), this.inited = !1, this.visible = !1, this.silent = !1, this.currentDate = this.opts.startDate, this.currentView = this.opts.view, this._createShortCuts(), this.selectedDates = [], this.views = {}, this.keys = [], this.minRange = "", this.maxRange = "", this._prevOnSelectValue = "", this.init()
    }).prototype = {
        VERSION: "2.2.3",
        viewIndexes: ["days", "months", "years"],
        init: function() {
            f || this.opts.inline || !this.elIsInput || this._buildDatepickersContainer(), this._buildBaseHtml(), this._defineLocale(this.opts.language), this._syncWithMinMaxDates(), this.elIsInput && (this.opts.inline || (this._setPositionClasses(this.opts.position), this._bindEvents()), this.opts.keyboardNav && !this.opts.onlyTimepicker && this._bindKeyboardEvents(), this.$datepicker.on("mousedown", this._onMouseDownDatepicker.bind(this)), this.$datepicker.on("mouseup", this._onMouseUpDatepicker.bind(this))), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.timepicker && (this.timepicker = new r.fn.datepicker.Timepicker(this, this.opts), this._bindTimepickerEvents()), this.opts.onlyTimepicker && this.$datepicker.addClass("-only-timepicker-"), this.views[this.currentView] = new r.fn.datepicker.Body(this, this.currentView, this.opts), this.views[this.currentView].show(), this.nav = new r.fn.datepicker.Navigation(this, this.opts), this.view = this.currentView, this.$el.on("clickCell.adp", this._onClickCell.bind(this)), this.$datepicker.on("mouseenter", ".datepicker--cell", this._onMouseEnterCell.bind(this)), this.$datepicker.on("mouseleave", ".datepicker--cell", this._onMouseLeaveCell.bind(this)), this.inited = !0
        },
        _createShortCuts: function() {
            this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-86399999136e5), this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(86399999136e5)
        },
        _bindEvents: function() {
            this.$el.on(this.opts.showEvent + ".adp", this._onShowEvent.bind(this)), this.$el.on("mouseup.adp", this._onMouseUpEl.bind(this)), this.$el.on("blur.adp", this._onBlur.bind(this)), this.$el.on("keyup.adp", this._onKeyUpGeneral.bind(this)), r(t).on("resize.adp", this._onResize.bind(this)), r("body").on("mouseup.adp", this._onMouseUpBody.bind(this))
        },
        _bindKeyboardEvents: function() {
            this.$el.on("keydown.adp", this._onKeyDown.bind(this)), this.$el.on("keyup.adp", this._onKeyUp.bind(this)), this.$el.on("hotKey.adp", this._onHotKey.bind(this))
        },
        _bindTimepickerEvents: function() {
            this.$el.on("timeChange.adp", this._onTimeChange.bind(this))
        },
        isWeekend: function(e) {
            return -1 !== this.opts.weekends.indexOf(e)
        },
        _defineLocale: function(e) {
            "string" == typeof e ? (this.loc = r.fn.datepicker.language[e], this.loc || (console.warn("Can't find language \"" + e + '" in Datepicker.language, will use "ru" instead'), this.loc = r.extend(!0, {}, r.fn.datepicker.language.ru)), this.loc = r.extend(!0, {}, r.fn.datepicker.language.ru, r.fn.datepicker.language[e])) : this.loc = r.extend(!0, {}, r.fn.datepicker.language.ru, e), this.opts.dateFormat && (this.loc.dateFormat = this.opts.dateFormat), this.opts.timeFormat && (this.loc.timeFormat = this.opts.timeFormat), "" !== this.opts.firstDay && (this.loc.firstDay = this.opts.firstDay), this.opts.timepicker && (this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator)), this.opts.onlyTimepicker && (this.loc.dateFormat = this.loc.timeFormat);
            var t = this._getWordBoundaryRegExp;
            (this.loc.timeFormat.match(t("aa")) || this.loc.timeFormat.match(t("AA"))) && (this.ampm = !0)
        },
        _buildDatepickersContainer: function() {
            f = !0, c.append('<div class="datepickers-container" id="datepickers-container"></div>'), h = r("#datepickers-container")
        },
        _buildBaseHtml: function() {
            var e, t = r('<div class="datepicker-inline">');
            e = "INPUT" == this.el.nodeName ? this.opts.inline ? t.insertAfter(this.$el) : h : t.appendTo(this.$el), this.$datepicker = r('<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>').appendTo(e), this.$content = r(".datepicker--content", this.$datepicker), this.$nav = r(".datepicker--nav", this.$datepicker)
        },
        _triggerOnChange: function() {
            if (!this.selectedDates.length) {
                if ("" === this._prevOnSelectValue) return;
                return this._prevOnSelectValue = "", this.opts.onSelect("", "", this)
            }
            var e, t = this.selectedDates,
                i = m.getParsedDate(t[0]),
                n = this,
                s = new Date(i.year, i.month, i.date, i.hours, i.minutes);
            e = t.map(function(e) {
                return n.formatDate(n.loc.dateFormat, e)
            }).join(this.opts.multipleDatesSeparator), (this.opts.multipleDates || this.opts.range) && (s = t.map(function(e) {
                var t = m.getParsedDate(e);
                return new Date(t.year, t.month, t.date, t.hours, t.minutes)
            })), this._prevOnSelectValue = e, this.opts.onSelect(e, s, this)
        },
        next: function() {
            var e = this.parsedDate,
                t = this.opts;
            switch (this.view) {
                case "days":
                    this.date = new Date(e.year, e.month + 1, 1), t.onChangeMonth && t.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                    break;
                case "months":
                    this.date = new Date(e.year + 1, e.month, 1), t.onChangeYear && t.onChangeYear(this.parsedDate.year);
                    break;
                case "years":
                    this.date = new Date(e.year + 10, 0, 1), t.onChangeDecade && t.onChangeDecade(this.curDecade)
            }
        },
        prev: function() {
            var e = this.parsedDate,
                t = this.opts;
            switch (this.view) {
                case "days":
                    this.date = new Date(e.year, e.month - 1, 1), t.onChangeMonth && t.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                    break;
                case "months":
                    this.date = new Date(e.year - 1, e.month, 1), t.onChangeYear && t.onChangeYear(this.parsedDate.year);
                    break;
                case "years":
                    this.date = new Date(e.year - 10, 0, 1), t.onChangeDecade && t.onChangeDecade(this.curDecade)
            }
        },
        formatDate: function(e, t) {
            t = t || this.date;
            var i, n = e,
                s = this._getWordBoundaryRegExp,
                o = this.loc,
                r = m.getLeadingZeroNum,
                a = m.getDecade(t),
                l = m.getParsedDate(t),
                d = l.fullHours,
                c = l.hours,
                h = e.match(s("aa")) || e.match(s("AA")),
                u = "am",
                p = this._replacer;
            switch (this.opts.timepicker && this.timepicker && h && (d = r((i = this.timepicker._getValidHoursFromDate(t, h)).hours), c = i.hours, u = i.dayPeriod), !0) {
                case /@/.test(n):
                    n = n.replace(/@/, t.getTime());
                case /aa/.test(n):
                    n = p(n, s("aa"), u);
                case /AA/.test(n):
                    n = p(n, s("AA"), u.toUpperCase());
                case /dd/.test(n):
                    n = p(n, s("dd"), l.fullDate);
                case /d/.test(n):
                    n = p(n, s("d"), l.date);
                case /DD/.test(n):
                    n = p(n, s("DD"), o.days[l.day]);
                case /D/.test(n):
                    n = p(n, s("D"), o.daysShort[l.day]);
                case /mm/.test(n):
                    n = p(n, s("mm"), l.fullMonth);
                case /m/.test(n):
                    n = p(n, s("m"), l.month + 1);
                case /MM/.test(n):
                    n = p(n, s("MM"), this.loc.months[l.month]);
                case /M/.test(n):
                    n = p(n, s("M"), o.monthsShort[l.month]);
                case /ii/.test(n):
                    n = p(n, s("ii"), l.fullMinutes);
                case /i/.test(n):
                    n = p(n, s("i"), l.minutes);
                case /hh/.test(n):
                    n = p(n, s("hh"), d);
                case /h/.test(n):
                    n = p(n, s("h"), c);
                case /yyyy/.test(n):
                    n = p(n, s("yyyy"), l.year);
                case /yyyy1/.test(n):
                    n = p(n, s("yyyy1"), a[0]);
                case /yyyy2/.test(n):
                    n = p(n, s("yyyy2"), a[1]);
                case /yy/.test(n):
                    n = p(n, s("yy"), l.year.toString().slice(-2))
            }
            return n
        },
        _replacer: function(e, t, s) {
            return e.replace(t, function(e, t, i, n) {
                return t + s + n
            })
        },
        _getWordBoundaryRegExp: function(e) {
            var t = "\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";
            return new RegExp("(^|>|" + t + ")(" + e + ")($|<|" + t + ")", "g")
        },
        selectDate: function(e) {
            var t = this,
                i = t.opts,
                n = t.parsedDate,
                s = t.selectedDates.length,
                o = "";
            if (Array.isArray(e)) e.forEach(function(e) {
                t.selectDate(e)
            });
            else if (e instanceof Date) {
                if (this.lastSelectedDate = e, this.timepicker && this.timepicker._setTime(e), t._trigger("selectDate", e), this.timepicker && (e.setHours(this.timepicker.hours), e.setMinutes(this.timepicker.minutes)), "days" == t.view && e.getMonth() != n.month && i.moveToOtherMonthsOnSelect && (o = new Date(e.getFullYear(), e.getMonth(), 1)), "years" == t.view && e.getFullYear() != n.year && i.moveToOtherYearsOnSelect && (o = new Date(e.getFullYear(), 0, 1)), o && (t.silent = !0, t.date = o, t.silent = !1, t.nav._render()), i.multipleDates && !i.range) {
                    if (s === i.multipleDates) return;
                    t._isSelected(e) || t.selectedDates.push(e)
                } else i.range ? 2 == s ? (t.selectedDates = [e], t.minRange = e, t.maxRange = "") : 1 == s ? (t.selectedDates.push(e), t.maxRange ? t.minRange = e : t.maxRange = e, m.bigger(t.maxRange, t.minRange) && (t.maxRange = t.minRange, t.minRange = e), t.selectedDates = [t.minRange, t.maxRange]) : (t.selectedDates = [e], t.minRange = e) : t.selectedDates = [e];
                t._setInputValue(), i.onSelect && t._triggerOnChange(), i.autoClose && !this.timepickerIsActive && (i.multipleDates || i.range ? i.range && 2 == t.selectedDates.length && t.hide() : t.hide()), t.views[this.currentView]._render()
            }
        },
        removeDate: function(i) {
            var n = this.selectedDates,
                s = this;
            if (i instanceof Date) return n.some(function(e, t) {
                return m.isSame(e, i) ? (n.splice(t, 1), s.selectedDates.length ? s.lastSelectedDate = s.selectedDates[s.selectedDates.length - 1] : (s.minRange = "", s.maxRange = "", s.lastSelectedDate = ""), s.views[s.currentView]._render(), s._setInputValue(), s.opts.onSelect && s._triggerOnChange(), !0) : void 0
            })
        },
        today: function() {
            this.silent = !0, this.view = this.opts.minView, this.silent = !1, this.date = new Date, this.opts.todayButton instanceof Date && this.selectDate(this.opts.todayButton)
        },
        clear: function() {
            this.selectedDates = [], this.minRange = "", this.maxRange = "", this.views[this.currentView]._render(), this._setInputValue(), this.opts.onSelect && this._triggerOnChange()
        },
        update: function(e, t) {
            var i = arguments.length,
                n = this.lastSelectedDate;
            return 2 == i ? this.opts[e] = t : 1 == i && "object" == typeof e && (this.opts = r.extend(!0, this.opts, e)), this._createShortCuts(), this._syncWithMinMaxDates(), this._defineLocale(this.opts.language), this.nav._addButtonsIfNeed(), this.opts.onlyTimepicker || this.nav._render(), this.views[this.currentView]._render(), this.elIsInput && !this.opts.inline && (this._setPositionClasses(this.opts.position), this.visible && this.setPosition(this.opts.position)), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.onlyTimepicker && this.$datepicker.addClass("-only-timepicker-"), this.opts.timepicker && (n && this.timepicker._handleDate(n), this.timepicker._updateRanges(), this.timepicker._updateCurrentTime(), n && (n.setHours(this.timepicker.hours), n.setMinutes(this.timepicker.minutes))), this._setInputValue(), this
        },
        _syncWithMinMaxDates: function() {
            var e = this.date.getTime();
            this.silent = !0, this.minTime > e && (this.date = this.minDate), this.maxTime < e && (this.date = this.maxDate), this.silent = !1
        },
        _isSelected: function(t, i) {
            var n = !1;
            return this.selectedDates.some(function(e) {
                return m.isSame(e, t, i) ? (n = e, !0) : void 0
            }), n
        },
        _setInputValue: function() {
            var e, t = this,
                i = t.opts,
                n = t.loc.dateFormat,
                s = i.altFieldDateFormat,
                o = t.selectedDates.map(function(e) {
                    return t.formatDate(n, e)
                });
            i.altField && t.$altField.length && (e = (e = this.selectedDates.map(function(e) {
                return t.formatDate(s, e)
            })).join(this.opts.multipleDatesSeparator), this.$altField.val(e)), o = o.join(this.opts.multipleDatesSeparator), this.$el.val(o)
        },
        _isInRange: function(e, t) {
            var i = e.getTime(),
                n = m.getParsedDate(e),
                s = m.getParsedDate(this.minDate),
                o = m.getParsedDate(this.maxDate),
                r = new Date(n.year, n.month, s.date).getTime(),
                a = new Date(n.year, n.month, o.date).getTime(),
                l = {
                    day: i >= this.minTime && i <= this.maxTime,
                    month: r >= this.minTime && a <= this.maxTime,
                    year: n.year >= s.year && n.year <= o.year
                };
            return t ? l[t] : l.day
        },
        _getDimensions: function(e) {
            var t = e.offset();
            return {
                width: e.outerWidth(),
                height: e.outerHeight(),
                left: t.left,
                top: t.top
            }
        },
        _getDateFromCell: function(e) {
            var t = this.parsedDate,
                i = e.data("year") || t.year,
                n = e.data("month") == o ? t.month : e.data("month"),
                s = e.data("date") || 1;
            return new Date(i, n, s)
        },
        _setPositionClasses: function(e) {
            var t = (e = e.split(" "))[0],
                i = "datepicker -" + t + "-" + e[1] + "- -from-" + t + "-";
            this.visible && (i += " active"), this.$datepicker.removeAttr("class").addClass(i)
        },
        setPosition: function(e) {
            e = e || this.opts.position;
            var t, i, n = this._getDimensions(this.$el),
                s = this._getDimensions(this.$datepicker),
                o = e.split(" "),
                r = this.opts.offset,
                a = o[0],
                l = o[1];
            switch (a) {
                case "top":
                    t = n.top - s.height - r;
                    break;
                case "right":
                    i = n.left + n.width + r;
                    break;
                case "bottom":
                    t = n.top + n.height + r;
                    break;
                case "left":
                    i = n.left - s.width - r
            }
            switch (l) {
                case "top":
                    t = n.top;
                    break;
                case "right":
                    i = n.left + n.width - s.width;
                    break;
                case "bottom":
                    t = n.top + n.height - s.height;
                    break;
                case "left":
                    i = n.left;
                    break;
                case "center":
                    /left|right/.test(a) ? t = n.top + n.height / 2 - s.height / 2 : i = n.left + n.width / 2 - s.width / 2
            }
            this.$datepicker.css({
                left: i,
                top: t
            })
        },
        show: function() {
            var e = this.opts.onShow;
            this.setPosition(this.opts.position), this.$datepicker.addClass("active"), this.visible = !0, e && this._bindVisionEvents(e)
        },
        hide: function() {
            var e = this.opts.onHide;
            this.$datepicker.removeClass("active").css({
                left: "-100000px"
            }), this.focused = "", this.keys = [], this.inFocus = !1, this.visible = !1, this.$el.blur(), e && this._bindVisionEvents(e)
        },
        down: function(e) {
            this._changeView(e, "down")
        },
        up: function(e) {
            this._changeView(e, "up")
        },
        _bindVisionEvents: function(e) {
            this.$datepicker.off("transitionend.dp"), e(this, !1), this.$datepicker.one("transitionend.dp", e.bind(this, this, !0))
        },
        _changeView: function(e, t) {
            e = e || this.focused || this.date;
            var i = "up" == t ? this.viewIndex + 1 : this.viewIndex - 1;
            2 < i && (i = 2), i < 0 && (i = 0), this.silent = !0, this.date = new Date(e.getFullYear(), e.getMonth(), 1), this.silent = !1, this.view = this.viewIndexes[i]
        },
        _handleHotKey: function(e) {
            var t, i, n, s = m.getParsedDate(this._getFocusedDate()),
                o = this.opts,
                r = !1,
                a = !1,
                l = !1,
                d = s.year,
                c = s.month,
                h = s.date;
            switch (e) {
                case "ctrlRight":
                case "ctrlUp":
                    c += 1, r = !0;
                    break;
                case "ctrlLeft":
                case "ctrlDown":
                    c -= 1, r = !0;
                    break;
                case "shiftRight":
                case "shiftUp":
                    a = !0, d += 1;
                    break;
                case "shiftLeft":
                case "shiftDown":
                    a = !0, d -= 1;
                    break;
                case "altRight":
                case "altUp":
                    l = !0, d += 10;
                    break;
                case "altLeft":
                case "altDown":
                    l = !0, d -= 10;
                    break;
                case "ctrlShiftUp":
                    this.up()
            }
            n = m.getDaysCount(new Date(d, c)), i = new Date(d, c, h), n < h && (h = n), i.getTime() < this.minTime ? i = this.minDate : i.getTime() > this.maxTime && (i = this.maxDate), this.focused = i, t = m.getParsedDate(i), r && o.onChangeMonth && o.onChangeMonth(t.month, t.year), a && o.onChangeYear && o.onChangeYear(t.year), l && o.onChangeDecade && o.onChangeDecade(this.curDecade)
        },
        _registerKey: function(t) {
            this.keys.some(function(e) {
                return e == t
            }) || this.keys.push(t)
        },
        _unRegisterKey: function(e) {
            var t = this.keys.indexOf(e);
            this.keys.splice(t, 1)
        },
        _isHotKeyPressed: function() {
            var e, t = !1,
                i = this.keys.sort();
            for (var n in v) e = v[n], i.length == e.length && e.every(function(e, t) {
                return e == i[t]
            }) && (this._trigger("hotKey", n), t = !0);
            return t
        },
        _trigger: function(e, t) {
            this.$el.trigger(e, t)
        },
        _focusNextCell: function(e, t) {
            t = t || this.cellType;
            var i = m.getParsedDate(this._getFocusedDate()),
                n = i.year,
                s = i.month,
                o = i.date;
            if (!this._isHotKeyPressed()) {
                switch (e) {
                    case 37:
                        "day" == t && (o -= 1), "month" == t && (s -= 1), "year" == t && (n -= 1);
                        break;
                    case 38:
                        "day" == t && (o -= 7), "month" == t && (s -= 3), "year" == t && (n -= 4);
                        break;
                    case 39:
                        "day" == t && (o += 1), "month" == t && (s += 1), "year" == t && (n += 1);
                        break;
                    case 40:
                        "day" == t && (o += 7), "month" == t && (s += 3), "year" == t && (n += 4)
                }
                var r = new Date(n, s, o);
                r.getTime() < this.minTime ? r = this.minDate : r.getTime() > this.maxTime && (r = this.maxDate), this.focused = r
            }
        },
        _getFocusedDate: function() {
            var e = this.focused || this.selectedDates[this.selectedDates.length - 1],
                t = this.parsedDate;
            if (!e) switch (this.view) {
                case "days":
                    e = new Date(t.year, t.month, (new Date).getDate());
                    break;
                case "months":
                    e = new Date(t.year, t.month, 1);
                    break;
                case "years":
                    e = new Date(t.year, 0, 1)
            }
            return e
        },
        _getCell: function(e, t) {
            t = t || this.cellType;
            var i, n = m.getParsedDate(e),
                s = '.datepicker--cell[data-year="' + n.year + '"]';
            switch (t) {
                case "month":
                    s = '[data-month="' + n.month + '"]';
                    break;
                case "day":
                    s += '[data-month="' + n.month + '"][data-date="' + n.date + '"]'
            }
            return (i = this.views[this.currentView].$el.find(s)).length ? i : r("")
        },
        destroy: function() {
            var e = this;
            e.$el.off(".adp").data("datepicker", ""), e.selectedDates = [], e.focused = "", e.views = {}, e.keys = [], e.minRange = "", e.maxRange = "", e.opts.inline || !e.elIsInput ? e.$datepicker.closest(".datepicker-inline").remove() : e.$datepicker.remove()
        },
        _handleAlreadySelectedDates: function(e, t) {
            this.opts.range ? this.opts.toggleSelected ? this.removeDate(t) : 2 != this.selectedDates.length && this._trigger("clickCell", t) : this.opts.toggleSelected && this.removeDate(t), this.opts.toggleSelected || (this.lastSelectedDate = e, this.opts.timepicker && (this.timepicker._setTime(e), this.timepicker.update()))
        },
        _onShowEvent: function(e) {
            this.visible || this.show()
        },
        _onBlur: function() {
            !this.inFocus && this.visible && this.hide()
        },
        _onMouseDownDatepicker: function(e) {
            this.inFocus = !0
        },
        _onMouseUpDatepicker: function(e) {
            this.inFocus = !1, e.originalEvent.inFocus = !0, e.originalEvent.timepickerFocus || this.$el.focus()
        },
        _onKeyUpGeneral: function(e) {
            this.$el.val() || this.clear()
        },
        _onResize: function() {
            this.visible && this.setPosition()
        },
        _onMouseUpBody: function(e) {
            e.originalEvent.inFocus || this.visible && !this.inFocus && this.hide()
        },
        _onMouseUpEl: function(e) {
            e.originalEvent.inFocus = !0, setTimeout(this._onKeyUpGeneral.bind(this), 4)
        },
        _onKeyDown: function(e) {
            var t = e.which;
            if (this._registerKey(t), 37 <= t && t <= 40 && (e.preventDefault(), this._focusNextCell(t)), 13 == t && this.focused) {
                if (this._getCell(this.focused).hasClass("-disabled-")) return;
                if (this.view != this.opts.minView) this.down();
                else {
                    var i = this._isSelected(this.focused, this.cellType);
                    if (!i) return this.timepicker && (this.focused.setHours(this.timepicker.hours), this.focused.setMinutes(this.timepicker.minutes)), void this.selectDate(this.focused);
                    this._handleAlreadySelectedDates(i, this.focused)
                }
            }
            27 == t && this.hide()
        },
        _onKeyUp: function(e) {
            var t = e.which;
            this._unRegisterKey(t)
        },
        _onHotKey: function(e, t) {
            this._handleHotKey(t)
        },
        _onMouseEnterCell: function(e) {
            var t = r(e.target).closest(".datepicker--cell"),
                i = this._getDateFromCell(t);
            this.silent = !0, this.focused && (this.focused = ""), t.addClass("-focus-"), this.focused = i, this.silent = !1, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", m.less(this.minRange, this.focused) && (this.maxRange = this.minRange, this.minRange = ""), this.views[this.currentView]._update())
        },
        _onMouseLeaveCell: function(e) {
            r(e.target).closest(".datepicker--cell").removeClass("-focus-"), this.silent = !0, this.focused = "", this.silent = !1
        },
        _onTimeChange: function(e, t, i) {
            var n = new Date,
                s = !1;
            this.selectedDates.length && (s = !0, n = this.lastSelectedDate), n.setHours(t), n.setMinutes(i), s || this._getCell(n).hasClass("-disabled-") ? (this._setInputValue(), this.opts.onSelect && this._triggerOnChange()) : this.selectDate(n)
        },
        _onClickCell: function(e, t) {
            this.timepicker && (t.setHours(this.timepicker.hours), t.setMinutes(this.timepicker.minutes)), this.selectDate(t)
        },
        set focused(e) {
            if (!e && this.focused) {
                var t = this._getCell(this.focused);
                t.length && t.removeClass("-focus-")
            }
            this._focused = e, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", m.less(this.minRange, this._focused) && (this.maxRange = this.minRange, this.minRange = "")), this.silent || (this.date = e)
        },
        get focused() {
            return this._focused
        },
        get parsedDate() {
            return m.getParsedDate(this.date)
        },
        set date(e) {
            return e instanceof Date ? (this.currentDate = e, this.inited && !this.silent && (this.views[this.view]._render(), this.nav._render(), this.visible && this.elIsInput && this.setPosition()), e) : void 0
        },
        get date() {
            return this.currentDate
        },
        set view(e) {
            return this.viewIndex = this.viewIndexes.indexOf(e), this.viewIndex < 0 ? void 0 : (this.prevView = this.currentView, this.currentView = e, this.inited && (this.views[e] ? this.views[e]._render() : this.views[e] = new r.fn.datepicker.Body(this, e, this.opts), this.views[this.prevView].hide(), this.views[e].show(), this.nav._render(), this.opts.onChangeView && this.opts.onChangeView(e), this.elIsInput && this.visible && this.setPosition()), e)
        },
        get view() {
            return this.currentView
        },
        get cellType() {
            return this.view.substring(0, this.view.length - 1)
        },
        get minTime() {
            var e = m.getParsedDate(this.minDate);
            return new Date(e.year, e.month, e.date).getTime()
        },
        get maxTime() {
            var e = m.getParsedDate(this.maxDate);
            return new Date(e.year, e.month, e.date).getTime()
        },
        get curDecade() {
            return m.getDecade(this.date)
        }
    }, m.getDaysCount = function(e) {
        return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate()
    }, m.getParsedDate = function(e) {
        return {
            year: e.getFullYear(),
            month: e.getMonth(),
            fullMonth: e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1,
            date: e.getDate(),
            fullDate: e.getDate() < 10 ? "0" + e.getDate() : e.getDate(),
            day: e.getDay(),
            hours: e.getHours(),
            fullHours: e.getHours() < 10 ? "0" + e.getHours() : e.getHours(),
            minutes: e.getMinutes(),
            fullMinutes: e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes()
        }
    }, m.getDecade = function(e) {
        var t = 10 * Math.floor(e.getFullYear() / 10);
        return [t, t + 9]
    }, m.template = function(e, i) {
        return e.replace(/#\{([\w]+)\}/g, function(e, t) {
            return i[t] || 0 === i[t] ? i[t] : void 0
        })
    }, m.isSame = function(e, t, i) {
        if (!e || !t) return !1;
        var n = m.getParsedDate(e),
            s = m.getParsedDate(t),
            o = i || "day";
        return {
            day: n.date == s.date && n.month == s.month && n.year == s.year,
            month: n.month == s.month && n.year == s.year,
            year: n.year == s.year
        }[o]
    }, m.less = function(e, t, i) {
        return !(!e || !t) && t.getTime() < e.getTime()
    }, m.bigger = function(e, t, i) {
        return !(!e || !t) && t.getTime() > e.getTime()
    }, m.getLeadingZeroNum = function(e) {
        return parseInt(e) < 10 ? "0" + e : e
    }, m.resetTime = function(e) {
        return "object" == typeof e ? (e = m.getParsedDate(e), new Date(e.year, e.month, e.date)) : void 0
    }, r.fn.datepicker = function(t) {
        return this.each(function() {
            if (r.data(this, p)) {
                var e = r.data(this, p);
                e.opts = r.extend(!0, e.opts, t), e.update()
            } else r.data(this, p, new y(this, t))
        })
    }, r.fn.datepicker.Constructor = y, r.fn.datepicker.language = {
        ru: {
            days: ["Ð’Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ", "ÐŸÐ¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº", "Ð’Ñ‚Ð¾Ñ€Ð½Ð¸Ðº", "Ð¡Ñ€ÐµÐ´Ð°", "Ð§ÐµÑ‚Ð²ÐµÑ€Ð³", "ÐŸÑÑ‚Ð½Ð¸Ñ†Ð°", "Ð¡ÑƒÐ±Ð±Ð¾Ñ‚Ð°"],
            daysShort: ["Ð’Ð¾Ñ", "ÐŸÐ¾Ð½", "Ð’Ñ‚Ð¾", "Ð¡Ñ€Ðµ", "Ð§ÐµÑ‚", "ÐŸÑÑ‚", "Ð¡ÑƒÐ±"],
            daysMin: ["Ð’Ñ", "ÐŸÐ½", "Ð’Ñ‚", "Ð¡Ñ€", "Ð§Ñ‚", "ÐŸÑ‚", "Ð¡Ð±"],
            months: ["Ð¯Ð½Ð²Ð°Ñ€ÑŒ", "Ð¤ÐµÐ²Ñ€Ð°Ð»ÑŒ", "ÐœÐ°Ñ€Ñ‚", "ÐÐ¿Ñ€ÐµÐ»ÑŒ", "ÐœÐ°Ð¹", "Ð˜ÑŽÐ½ÑŒ", "Ð˜ÑŽÐ»ÑŒ", "ÐÐ²Ð³ÑƒÑÑ‚", "Ð¡ÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ", "ÐžÐºÑ‚ÑÐ±Ñ€ÑŒ", "ÐÐ¾ÑÐ±Ñ€ÑŒ", "Ð”ÐµÐºÐ°Ð±Ñ€ÑŒ"],
            monthsShort: ["Ð¯Ð½Ð²", "Ð¤ÐµÐ²", "ÐœÐ°Ñ€", "ÐÐ¿Ñ€", "ÐœÐ°Ð¹", "Ð˜ÑŽÐ½", "Ð˜ÑŽÐ»", "ÐÐ²Ð³", "Ð¡ÐµÐ½", "ÐžÐºÑ‚", "ÐÐ¾Ñ", "Ð”ÐµÐº"],
            today: "Ð¡ÐµÐ³Ð¾Ð´Ð½Ñ",
            clear: "ÐžÑ‡Ð¸ÑÑ‚Ð¸Ñ‚ÑŒ",
            dateFormat: "dd.mm.yyyy",
            timeFormat: "hh:ii",
            firstDay: 1
        }
    }, r(function() {
        r(".datepicker-here").datepicker()
    }), l = {
        days: '<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',
        months: '<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',
        years: '<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>'
    }, d = r.fn.datepicker, u = d.Constructor, d.Body = function(e, t, i) {
        this.d = e, this.type = t, this.opts = i, this.$el = r(""), this.opts.onlyTimepicker || this.init()
    }, d.Body.prototype = {
        init: function() {
            this._buildBaseHtml(), this._render(), this._bindEvents()
        },
        _bindEvents: function() {
            this.$el.on("click", ".datepicker--cell", r.proxy(this._onClickCell, this))
        },
        _buildBaseHtml: function() {
            this.$el = r(l[this.type]).appendTo(this.d.$content), this.$names = r(".datepicker--days-names", this.$el), this.$cells = r(".datepicker--cells", this.$el)
        },
        _getDayNamesHtml: function(e, t, i, n) {
            return t = t != o ? t : e, i = i || "", 7 < (n = n != o ? n : 0) ? i : 7 == t ? this._getDayNamesHtml(e, 0, i, ++n) : (i += '<div class="datepicker--day-name' + (this.d.isWeekend(t) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[t] + "</div>", this._getDayNamesHtml(e, ++t, i, ++n))
        },
        _getCellContents: function(e, t) {
            var i = "datepicker--cell datepicker--cell-" + t,
                n = new Date,
                s = this.d,
                o = u.resetTime(s.minRange),
                r = u.resetTime(s.maxRange),
                a = s.opts,
                l = u.getParsedDate(e),
                d = {},
                c = l.date;
            switch (t) {
                case "day":
                    s.isWeekend(l.day) && (i += " -weekend-"), l.month != this.d.parsedDate.month && (i += " -other-month-", a.selectOtherMonths || (i += " -disabled-"), a.showOtherMonths || (c = ""));
                    break;
                case "month":
                    c = s.loc[s.opts.monthsField][l.month];
                    break;
                case "year":
                    var h = s.curDecade;
                    c = l.year, (l.year < h[0] || l.year > h[1]) && (i += " -other-decade-", a.selectOtherYears || (i += " -disabled-"), a.showOtherYears || (c = ""))
            }
            return a.onRenderCell && (c = (d = a.onRenderCell(e, t) || {}).html ? d.html : c, i += d.classes ? " " + d.classes : ""), a.range && (u.isSame(o, e, t) && (i += " -range-from-"), u.isSame(r, e, t) && (i += " -range-to-"), 1 == s.selectedDates.length && s.focused ? ((u.bigger(o, e) && u.less(s.focused, e) || u.less(r, e) && u.bigger(s.focused, e)) && (i += " -in-range-"), u.less(r, e) && u.isSame(s.focused, e) && (i += " -range-from-"), u.bigger(o, e) && u.isSame(s.focused, e) && (i += " -range-to-")) : 2 == s.selectedDates.length && u.bigger(o, e) && u.less(r, e) && (i += " -in-range-")), u.isSame(n, e, t) && (i += " -current-"), s.focused && u.isSame(e, s.focused, t) && (i += " -focus-"), s._isSelected(e, t) && (i += " -selected-"), (!s._isInRange(e, t) || d.disabled) && (i += " -disabled-"), {
                html: c,
                classes: i
            }
        },
        _getDaysHtml: function(e) {
            for (var t, i, n = u.getDaysCount(e), s = new Date(e.getFullYear(), e.getMonth(), 1).getDay(), o = new Date(e.getFullYear(), e.getMonth(), n).getDay(), r = s - this.d.loc.firstDay, a = 6 - o + this.d.loc.firstDay, l = "", d = 1 - (r = r < 0 ? r + 7 : r), c = n + (a = 6 < a ? a - 7 : a); d <= c; d++) i = e.getFullYear(), t = e.getMonth(), l += this._getDayHtml(new Date(i, t, d));
            return l
        },
        _getDayHtml: function(e) {
            var t = this._getCellContents(e, "day");
            return '<div class="' + t.classes + '" data-date="' + e.getDate() + '" data-month="' + e.getMonth() + '" data-year="' + e.getFullYear() + '">' + t.html + "</div>"
        },
        _getMonthsHtml: function(e) {
            for (var t = "", i = u.getParsedDate(e), n = 0; n < 12;) t += this._getMonthHtml(new Date(i.year, n)), n++;
            return t
        },
        _getMonthHtml: function(e) {
            var t = this._getCellContents(e, "month");
            return '<div class="' + t.classes + '" data-month="' + e.getMonth() + '">' + t.html + "</div>"
        },
        _getYearsHtml: function(e) {
            for (var t = (u.getParsedDate(e), u.getDecade(e)), i = "", n = t[0] - 1; n <= t[1] + 1; n++) i += this._getYearHtml(new Date(n, 0));
            return i
        },
        _getYearHtml: function(e) {
            var t = this._getCellContents(e, "year");
            return '<div class="' + t.classes + '" data-year="' + e.getFullYear() + '">' + t.html + "</div>"
        },
        _renderTypes: {
            days: function() {
                var e = this._getDayNamesHtml(this.d.loc.firstDay),
                    t = this._getDaysHtml(this.d.currentDate);
                this.$cells.html(t), this.$names.html(e)
            },
            months: function() {
                var e = this._getMonthsHtml(this.d.currentDate);
                this.$cells.html(e)
            },
            years: function() {
                var e = this._getYearsHtml(this.d.currentDate);
                this.$cells.html(e)
            }
        },
        _render: function() {
            this.opts.onlyTimepicker || this._renderTypes[this.type].bind(this)()
        },
        _update: function() {
            var i, n, s, e = r(".datepicker--cell", this.$cells),
                o = this;
            e.each(function(e, t) {
                n = r(this), s = o.d._getDateFromCell(r(this)), i = o._getCellContents(s, o.d.cellType), n.attr("class", i.classes)
            })
        },
        show: function() {
            this.opts.onlyTimepicker || (this.$el.addClass("active"), this.acitve = !0)
        },
        hide: function() {
            this.$el.removeClass("active"), this.active = !1
        },
        _handleClick: function(e) {
            var t = e.data("date") || 1,
                i = e.data("month") || 0,
                n = e.data("year") || this.d.parsedDate.year,
                s = this.d;
            if (s.view == this.opts.minView) {
                var o = new Date(n, i, t),
                    r = this.d._isSelected(o, this.d.cellType);
                return r ? void s._handleAlreadySelectedDates.bind(s, r, o)() : void s._trigger("clickCell", o)
            }
            s.down(new Date(n, i, t))
        },
        _onClickCell: function(e) {
            var t = r(e.target).closest(".datepicker--cell");
            t.hasClass("-disabled-") || this._handleClick.bind(this)(t)
        }
    }, n = r.fn.datepicker, a = n.Constructor, n.Navigation = function(e, t) {
        this.d = e, this.opts = t, this.$buttonsContainer = "", this.init()
    }, n.Navigation.prototype = {
        init: function() {
            this._buildBaseHtml(), this._bindEvents()
        },
        _bindEvents: function() {
            this.d.$nav.on("click", ".datepicker--nav-action", r.proxy(this._onClickNavButton, this)), this.d.$nav.on("click", ".datepicker--nav-title", r.proxy(this._onClickNavTitle, this)), this.d.$datepicker.on("click", ".datepicker--button", r.proxy(this._onClickNavButton, this))
        },
        _buildBaseHtml: function() {
            this.opts.onlyTimepicker || this._render(), this._addButtonsIfNeed()
        },
        _addButtonsIfNeed: function() {
            this.opts.todayButton && this._addButton("today"), this.opts.clearButton && this._addButton("clear")
        },
        _render: function() {
            var e = this._getTitle(this.d.currentDate),
                t = a.template('<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>', r.extend({
                    title: e
                }, this.opts));
            this.d.$nav.html(t), "years" == this.d.view && r(".datepicker--nav-title", this.d.$nav).addClass("-disabled-"), this.setNavStatus()
        },
        _getTitle: function(e) {
            return this.d.formatDate(this.opts.navTitles[this.d.view], e)
        },
        _addButton: function(e) {
            this.$buttonsContainer.length || this._addButtonsContainer();
            var t = {
                    action: e,
                    label: this.d.loc[e]
                },
                i = a.template('<span class="datepicker--button" data-action="#{action}">#{label}</span>', t);
            r("[data-action=" + e + "]", this.$buttonsContainer).length || this.$buttonsContainer.append(i)
        },
        _addButtonsContainer: function() {
            this.d.$datepicker.append('<div class="datepicker--buttons"></div>'), this.$buttonsContainer = r(".datepicker--buttons", this.d.$datepicker)
        },
        setNavStatus: function() {
            if ((this.opts.minDate || this.opts.maxDate) && this.opts.disableNavWhenOutOfRange) {
                var e = this.d.parsedDate,
                    t = e.month,
                    i = e.year,
                    n = e.date;
                switch (this.d.view) {
                    case "days":
                        this.d._isInRange(new Date(i, t - 1, 1), "month") || this._disableNav("prev"), this.d._isInRange(new Date(i, t + 1, 1), "month") || this._disableNav("next");
                        break;
                    case "months":
                        this.d._isInRange(new Date(i - 1, t, n), "year") || this._disableNav("prev"), this.d._isInRange(new Date(i + 1, t, n), "year") || this._disableNav("next");
                        break;
                    case "years":
                        var s = a.getDecade(this.d.date);
                        this.d._isInRange(new Date(s[0] - 1, 0, 1), "year") || this._disableNav("prev"), this.d._isInRange(new Date(s[1] + 1, 0, 1), "year") || this._disableNav("next")
                }
            }
        },
        _disableNav: function(e) {
            r('[data-action="' + e + '"]', this.d.$nav).addClass("-disabled-")
        },
        _activateNav: function(e) {
            r('[data-action="' + e + '"]', this.d.$nav).removeClass("-disabled-")
        },
        _onClickNavButton: function(e) {
            var t = r(e.target).closest("[data-action]").data("action");
            this.d[t]()
        },
        _onClickNavTitle: function(e) {
            return r(e.target).hasClass("-disabled-") ? void 0 : "days" == this.d.view ? this.d.view = "months" : void(this.d.view = "years")
        }
    }, i = r.fn.datepicker, s = i.Constructor, i.Timepicker = function(e, t) {
        this.d = e, this.opts = t, this.init()
    }, i.Timepicker.prototype = {
        init: function() {
            var e = "input";
            this._setTime(this.d.date), this._buildHTML(), navigator.userAgent.match(/trident/gi) && (e = "change"), this.d.$el.on("selectDate", this._onSelectDate.bind(this)), this.$ranges.on(e, this._onChangeRange.bind(this)), this.$ranges.on("mouseup", this._onMouseUpRange.bind(this)), this.$ranges.on("mousemove focus ", this._onMouseEnterRange.bind(this)), this.$ranges.on("mouseout blur", this._onMouseOutRange.bind(this))
        },
        _setTime: function(e) {
            var t = s.getParsedDate(e);
            this._handleDate(e), this.hours = t.hours < this.minHours ? this.minHours : t.hours, this.minutes = t.minutes < this.minMinutes ? this.minMinutes : t.minutes
        },
        _setMinTimeFromDate: function(e) {
            this.minHours = e.getHours(), this.minMinutes = e.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() > e.getHours() && (this.minMinutes = this.opts.minMinutes)
        },
        _setMaxTimeFromDate: function(e) {
            this.maxHours = e.getHours(), this.maxMinutes = e.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() < e.getHours() && (this.maxMinutes = this.opts.maxMinutes)
        },
        _setDefaultMinMaxTime: function() {
            var e = this.opts;
            this.minHours = e.minHours < 0 || 23 < e.minHours ? 0 : e.minHours, this.minMinutes = e.minMinutes < 0 || 59 < e.minMinutes ? 0 : e.minMinutes, this.maxHours = e.maxHours < 0 || 23 < e.maxHours ? 23 : e.maxHours, this.maxMinutes = e.maxMinutes < 0 || 59 < e.maxMinutes ? 59 : e.maxMinutes
        },
        _validateHoursMinutes: function(e) {
            this.hours < this.minHours ? this.hours = this.minHours : this.hours > this.maxHours && (this.hours = this.maxHours), this.minutes < this.minMinutes ? this.minutes = this.minMinutes : this.minutes > this.maxMinutes && (this.minutes = this.maxMinutes)
        },
        _buildHTML: function() {
            var e = s.getLeadingZeroNum,
                t = {
                    hourMin: this.minHours,
                    hourMax: e(this.maxHours),
                    hourStep: this.opts.hoursStep,
                    hourValue: this.hours,
                    hourVisible: e(this.displayHours),
                    minMin: this.minMinutes,
                    minMax: e(this.maxMinutes),
                    minStep: this.opts.minutesStep,
                    minValue: e(this.minutes)
                },
                i = s.template('<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>', t);
            this.$timepicker = r(i).appendTo(this.d.$datepicker), this.$ranges = r('[type="range"]', this.$timepicker), this.$hours = r('[name="hours"]', this.$timepicker), this.$minutes = r('[name="minutes"]', this.$timepicker), this.$hoursText = r(".datepicker--time-current-hours", this.$timepicker), this.$minutesText = r(".datepicker--time-current-minutes", this.$timepicker), this.d.ampm && (this.$ampm = r('<span class="datepicker--time-current-ampm">').appendTo(r(".datepicker--time-current", this.$timepicker)).html(this.dayPeriod), this.$timepicker.addClass("-am-pm-"))
        },
        _updateCurrentTime: function() {
            var e = s.getLeadingZeroNum(this.displayHours),
                t = s.getLeadingZeroNum(this.minutes);
            this.$hoursText.html(e), this.$minutesText.html(t), this.d.ampm && this.$ampm.html(this.dayPeriod)
        },
        _updateRanges: function() {
            this.$hours.attr({
                min: this.minHours,
                max: this.maxHours
            }).val(this.hours), this.$minutes.attr({
                min: this.minMinutes,
                max: this.maxMinutes
            }).val(this.minutes)
        },
        _handleDate: function(e) {
            this._setDefaultMinMaxTime(), e && (s.isSame(e, this.d.opts.minDate) ? this._setMinTimeFromDate(this.d.opts.minDate) : s.isSame(e, this.d.opts.maxDate) && this._setMaxTimeFromDate(this.d.opts.maxDate)), this._validateHoursMinutes(e)
        },
        update: function() {
            this._updateRanges(), this._updateCurrentTime()
        },
        _getValidHoursFromDate: function(e, t) {
            var i = e;
            e instanceof Date && (i = s.getParsedDate(e).hours);
            var n = "am";
            if (t || this.d.ampm) switch (!0) {
                case 0 == i:
                    i = 12;
                    break;
                case 12 == i:
                    n = "pm";
                    break;
                case 11 < i:
                    i -= 12, n = "pm"
            }
            return {
                hours: i,
                dayPeriod: n
            }
        },
        set hours(e) {
            this._hours = e;
            var t = this._getValidHoursFromDate(e);
            this.displayHours = t.hours, this.dayPeriod = t.dayPeriod
        },
        get hours() {
            return this._hours
        },
        _onChangeRange: function(e) {
            var t = r(e.target),
                i = t.attr("name");
            this.d.timepickerIsActive = !0, this[i] = t.val(), this._updateCurrentTime(), this.d._trigger("timeChange", [this.hours, this.minutes]), this._handleDate(this.d.lastSelectedDate), this.update()
        },
        _onSelectDate: function(e, t) {
            this._handleDate(t), this.update()
        },
        _onMouseEnterRange: function(e) {
            var t = r(e.target).attr("name");
            r(".datepicker--time-current-" + t, this.$timepicker).addClass("-focus-")
        },
        _onMouseOutRange: function(e) {
            var t = r(e.target).attr("name");
            this.d.inFocus || r(".datepicker--time-current-" + t, this.$timepicker).removeClass("-focus-")
        },
        _onMouseUpRange: function(e) {
            this.d.timepickerIsActive = !1
        }
    },
    function o(r, a, l) {
        function d(i, e) {
            if (!a[i]) {
                if (!r[i]) {
                    var t = "function" == typeof require && require;
                    if (!e && t) return t(i, !0);
                    if (c) return c(i, !0);
                    var n = new Error("Cannot find module '" + i + "'");
                    throw n.code = "MODULE_NOT_FOUND", n
                }
                var s = a[i] = {
                    exports: {}
                };
                r[i][0].call(s.exports, function(e) {
                    var t = r[i][1][e];
                    return d(t || e)
                }, s, s.exports, o, r, a, l)
            }
            return a[i].exports
        }
        for (var c = "function" == typeof require && require, e = 0; e < l.length; e++) d(l[e]);
        return d
    }({
        1: [function(e, t, i) {
            "use strict";
            var s = e("../main"),
                o = e("../plugin/instances");

            function n(n) {
                n.fn.perfectScrollbar = function(i) {
                    return this.each(function() {
                        if ("object" == typeof i || void 0 === i) {
                            var e = i;
                            o.get(this) || s.initialize(this, e)
                        } else {
                            var t = i;
                            "update" === t ? s.update(this) : "destroy" === t && s.destroy(this)
                        }
                        return n(this)
                    })
                }
            }
            if ("function" == typeof define && define.amd) define(["jquery"], n);
            else {
                var r = window.jQuery ? window.jQuery : window.$;
                void 0 !== r && n(r)
            }
            t.exports = n
        }, {
            "../main": 7,
            "../plugin/instances": 18
        }],
        2: [function(e, t, i) {
            "use strict";
            i.add = function(e, t) {
                var i, n, s;
                e.classList ? e.classList.add(t) : (n = t, (s = (i = e).className.split(" ")).indexOf(n) < 0 && s.push(n), i.className = s.join(" "))
            }, i.remove = function(e, t) {
                var i, n, s, o;
                e.classList ? e.classList.remove(t) : (n = t, s = (i = e).className.split(" "), 0 <= (o = s.indexOf(n)) && s.splice(o, 1), i.className = s.join(" "))
            }, i.list = function(e) {
                return e.classList ? Array.prototype.slice.apply(e.classList) : e.className.split(" ")
            }
        }, {}],
        3: [function(e, t, i) {
            "use strict";
            var n = {};
            n.e = function(e, t) {
                var i = document.createElement(e);
                return i.className = t, i
            }, n.appendTo = function(e, t) {
                return t.appendChild(e), e
            }, n.css = function(e, t, i) {
                return "object" == typeof t ? function(e, t) {
                    for (var i in t) {
                        var n = t[i];
                        "number" == typeof n && (n = n.toString() + "px"), e.style[i] = n
                    }
                    return e
                }(e, t) : void 0 === i ? (r = e, a = t, window.getComputedStyle(r)[a]) : (n = e, s = t, "number" == typeof(o = i) && (o = o.toString() + "px"), n.style[s] = o, n);
                var n, s, o, r, a
            }, n.matches = function(e, t) {
                return void 0 !== e.matches ? e.matches(t) : void 0 !== e.matchesSelector ? e.matchesSelector(t) : void 0 !== e.webkitMatchesSelector ? e.webkitMatchesSelector(t) : void 0 !== e.mozMatchesSelector ? e.mozMatchesSelector(t) : void 0 !== e.msMatchesSelector ? e.msMatchesSelector(t) : void 0
            }, n.remove = function(e) {
                void 0 !== e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e)
            }, n.queryChildren = function(e, t) {
                return Array.prototype.filter.call(e.childNodes, function(e) {
                    return n.matches(e, t)
                })
            }, t.exports = n
        }, {}],
        4: [function(e, t, i) {
            "use strict";
            var n = function(e) {
                this.element = e, this.events = {}
            };
            n.prototype.bind = function(e, t) {
                void 0 === this.events[e] && (this.events[e] = []), this.events[e].push(t), this.element.addEventListener(e, t, !1)
            }, n.prototype.unbind = function(t, i) {
                var n = void 0 !== i;
                this.events[t] = this.events[t].filter(function(e) {
                    return !(!n || e === i) || (this.element.removeEventListener(t, e, !1), !1)
                }, this)
            }, n.prototype.unbindAll = function() {
                for (var e in this.events) this.unbind(e)
            };
            var s = function() {
                this.eventElements = []
            };
            s.prototype.eventElement = function(t) {
                var e = this.eventElements.filter(function(e) {
                    return e.element === t
                })[0];
                return void 0 === e && (e = new n(t), this.eventElements.push(e)), e
            }, s.prototype.bind = function(e, t, i) {
                this.eventElement(e).bind(t, i)
            }, s.prototype.unbind = function(e, t, i) {
                this.eventElement(e).unbind(t, i)
            }, s.prototype.unbindAll = function() {
                for (var e = 0; e < this.eventElements.length; e++) this.eventElements[e].unbindAll()
            }, s.prototype.once = function(e, t, i) {
                var n = this.eventElement(e),
                    s = function(e) {
                        n.unbind(t, s), i(e)
                    };
                n.bind(t, s)
            }, t.exports = s
        }, {}],
        5: [function(e, t, i) {
            "use strict";
            t.exports = function() {
                function e() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }
                return function() {
                    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
                }
            }()
        }, {}],
        6: [function(e, t, i) {
            "use strict";
            var s = e("./class"),
                n = e("./dom");
            i.toInt = function(e) {
                return parseInt(e, 10) || 0
            }, i.clone = function(e) {
                if (null === e) return null;
                if ("object" != typeof e) return e;
                var t = {};
                for (var i in e) t[i] = this.clone(e[i]);
                return t
            }, i.extend = function(e, t) {
                var i = this.clone(e);
                for (var n in t) i[n] = this.clone(t[n]);
                return i
            }, i.isEditable = function(e) {
                return n.matches(e, "input,[contenteditable]") || n.matches(e, "select,[contenteditable]") || n.matches(e, "textarea,[contenteditable]") || n.matches(e, "button,[contenteditable]")
            }, i.removePsClasses = function(e) {
                for (var t = s.list(e), i = 0; i < t.length; i++) {
                    var n = t[i];
                    0 === n.indexOf("ps-") && s.remove(e, n)
                }
            }, i.outerWidth = function(e) {
                return this.toInt(n.css(e, "width")) + this.toInt(n.css(e, "paddingLeft")) + this.toInt(n.css(e, "paddingRight")) + this.toInt(n.css(e, "borderLeftWidth")) + this.toInt(n.css(e, "borderRightWidth"))
            }, i.startScrolling = function(e, t) {
                s.add(e, "ps-in-scrolling"), void 0 !== t ? s.add(e, "ps-" + t) : (s.add(e, "ps-x"), s.add(e, "ps-y"))
            }, i.stopScrolling = function(e, t) {
                s.remove(e, "ps-in-scrolling"), void 0 !== t ? s.remove(e, "ps-" + t) : (s.remove(e, "ps-x"), s.remove(e, "ps-y"))
            }, i.env = {
                isWebKit: "WebkitAppearance" in document.documentElement.style,
                supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
        }, {
            "./class": 2,
            "./dom": 3
        }],
        7: [function(e, t, i) {
            "use strict";
            var n = e("./plugin/destroy"),
                s = e("./plugin/initialize"),
                o = e("./plugin/update");
            t.exports = {
                initialize: s,
                update: o,
                destroy: n
            }
        }, {
            "./plugin/destroy": 9,
            "./plugin/initialize": 17,
            "./plugin/update": 21
        }],
        8: [function(e, t, i) {
            "use strict";
            t.exports = {
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                stopPropagationOnClick: !0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipePropagation: !0,
                useBothWheelAxes: !1,
                useKeyboard: !0,
                useSelectionScroll: !1,
                wheelPropagation: !1,
                wheelSpeed: 1,
                theme: "default"
            }
        }, {}],
        9: [function(e, t, i) {
            "use strict";
            var n = e("../lib/dom"),
                s = e("../lib/helper"),
                o = e("./instances");
            t.exports = function(e) {
                var t = o.get(e);
                t && (t.event.unbindAll(), n.remove(t.scrollbarX), n.remove(t.scrollbarY), n.remove(t.scrollbarXRail), n.remove(t.scrollbarYRail), s.removePsClasses(e), o.remove(e))
            }
        }, {
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18
        }],
        10: [function(e, t, i) {
            "use strict";
            var r = e("../../lib/helper"),
                n = e("../instances"),
                a = e("../update-geometry"),
                l = e("../update-scroll");
            t.exports = function(e) {
                ! function(n, s) {
                    function o(e) {
                        return e.getBoundingClientRect()
                    }
                    var e = window.Event.prototype.stopPropagation.bind;
                    s.settings.stopPropagationOnClick && s.event.bind(s.scrollbarY, "click", e), s.event.bind(s.scrollbarYRail, "click", function(e) {
                        var t = r.toInt(s.scrollbarYHeight / 2),
                            i = s.railYRatio * (e.pageY - window.pageYOffset - o(s.scrollbarYRail).top - t) / (s.railYRatio * (s.railYHeight - s.scrollbarYHeight));
                        i < 0 ? i = 0 : 1 < i && (i = 1), l(n, "top", (s.contentHeight - s.containerHeight) * i), a(n), e.stopPropagation()
                    }), s.settings.stopPropagationOnClick && s.event.bind(s.scrollbarX, "click", e), s.event.bind(s.scrollbarXRail, "click", function(e) {
                        var t = r.toInt(s.scrollbarXWidth / 2),
                            i = s.railXRatio * (e.pageX - window.pageXOffset - o(s.scrollbarXRail).left - t) / (s.railXRatio * (s.railXWidth - s.scrollbarXWidth));
                        i < 0 ? i = 0 : 1 < i && (i = 1), l(n, "left", (s.contentWidth - s.containerWidth) * i - s.negativeScrollAdjustment), a(n), e.stopPropagation()
                    })
                }(e, n.get(e))
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        11: [function(e, t, i) {
            "use strict";
            var a = e("../../lib/dom"),
                l = e("../../lib/helper"),
                n = e("../instances"),
                d = e("../update-geometry"),
                c = e("../update-scroll");

            function s(s, o) {
                var r = null,
                    t = null;
                var i = function(e) {
                        ! function(e) {
                            var t = r + e * o.railXRatio,
                                i = Math.max(0, o.scrollbarXRail.getBoundingClientRect().left) + o.railXRatio * (o.railXWidth - o.scrollbarXWidth);
                            o.scrollbarXLeft = t < 0 ? 0 : i < t ? i : t;
                            var n = l.toInt(o.scrollbarXLeft * (o.contentWidth - o.containerWidth) / (o.containerWidth - o.railXRatio * o.scrollbarXWidth)) - o.negativeScrollAdjustment;
                            c(s, "left", n)
                        }(e.pageX - t), d(s), e.stopPropagation(), e.preventDefault()
                    },
                    n = function() {
                        l.stopScrolling(s, "x"), o.event.unbind(o.ownerDocument, "mousemove", i)
                    };
                o.event.bind(o.scrollbarX, "mousedown", function(e) {
                    t = e.pageX, r = l.toInt(a.css(o.scrollbarX, "left")) * o.railXRatio, l.startScrolling(s, "x"), o.event.bind(o.ownerDocument, "mousemove", i), o.event.once(o.ownerDocument, "mouseup", n), e.stopPropagation(), e.preventDefault()
                })
            }

            function o(s, o) {
                var r = null,
                    t = null;
                var i = function(e) {
                        ! function(e) {
                            var t = r + e * o.railYRatio,
                                i = Math.max(0, o.scrollbarYRail.getBoundingClientRect().top) + o.railYRatio * (o.railYHeight - o.scrollbarYHeight);
                            o.scrollbarYTop = t < 0 ? 0 : i < t ? i : t;
                            var n = l.toInt(o.scrollbarYTop * (o.contentHeight - o.containerHeight) / (o.containerHeight - o.railYRatio * o.scrollbarYHeight));
                            c(s, "top", n)
                        }(e.pageY - t), d(s), e.stopPropagation(), e.preventDefault()
                    },
                    n = function() {
                        l.stopScrolling(s, "y"), o.event.unbind(o.ownerDocument, "mousemove", i)
                    };
                o.event.bind(o.scrollbarY, "mousedown", function(e) {
                    t = e.pageY, r = l.toInt(a.css(o.scrollbarY, "top")) * o.railYRatio, l.startScrolling(s, "y"), o.event.bind(o.ownerDocument, "mousemove", i), o.event.once(o.ownerDocument, "mouseup", n), e.stopPropagation(), e.preventDefault()
                })
            }
            t.exports = function(e) {
                var t = n.get(e);
                s(e, t), o(e, t)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        12: [function(e, t, i) {
            "use strict";
            var l = e("../../lib/helper"),
                d = e("../../lib/dom"),
                n = e("../instances"),
                c = e("../update-geometry"),
                h = e("../update-scroll");

            function s(o, r) {
                var a = !1;
                r.event.bind(o, "mouseenter", function() {
                    a = !0
                }), r.event.bind(o, "mouseleave", function() {
                    a = !1
                });
                r.event.bind(r.ownerDocument, "keydown", function(e) {
                    if (!e.isDefaultPrevented || !e.isDefaultPrevented()) {
                        var t = d.matches(r.scrollbarX, ":focus") || d.matches(r.scrollbarY, ":focus");
                        if (a || t) {
                            var i = document.activeElement ? document.activeElement : r.ownerDocument.activeElement;
                            if (i) {
                                for (; i.shadowRoot;) i = i.shadowRoot.activeElement;
                                if (l.isEditable(i)) return
                            }
                            var n = 0,
                                s = 0;
                            switch (e.which) {
                                case 37:
                                    n = -30;
                                    break;
                                case 38:
                                    s = 30;
                                    break;
                                case 39:
                                    n = 30;
                                    break;
                                case 40:
                                    s = -30;
                                    break;
                                case 33:
                                    s = 90;
                                    break;
                                case 32:
                                    s = e.shiftKey ? 90 : -90;
                                    break;
                                case 34:
                                    s = -90;
                                    break;
                                case 35:
                                    s = e.ctrlKey ? -r.contentHeight : -r.containerHeight;
                                    break;
                                case 36:
                                    s = e.ctrlKey ? o.scrollTop : r.containerHeight;
                                    break;
                                default:
                                    return
                            }
                            h(o, "top", o.scrollTop - s), h(o, "left", o.scrollLeft + n), c(o),
                                function(e, t) {
                                    var i = o.scrollTop;
                                    if (0 === e) {
                                        if (!r.scrollbarYActive) return !1;
                                        if (0 === i && 0 < t || i >= r.contentHeight - r.containerHeight && t < 0) return !r.settings.wheelPropagation
                                    }
                                    var n = o.scrollLeft;
                                    if (0 === t) {
                                        if (!r.scrollbarXActive) return !1;
                                        if (0 === n && e < 0 || n >= r.contentWidth - r.containerWidth && 0 < e) return !r.settings.wheelPropagation
                                    }
                                    return !0
                                }(n, s) && e.preventDefault()
                        }
                    }
                })
            }
            t.exports = function(e) {
                s(e, n.get(e))
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        13: [function(e, t, i) {
            "use strict";
            var n = e("../instances"),
                c = e("../update-geometry"),
                h = e("../update-scroll");

            function s(a, l) {
                var d = !1;

                function e(e) {
                    var t, i, n, s = (i = (t = e).deltaX, n = -1 * t.deltaY, void 0 !== i && void 0 !== n || (i = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (i *= 10, n *= 10), i != i && n != n && (i = 0, n = t.wheelDelta), [i, n]),
                        o = s[0],
                        r = s[1];
                    (function(e, t) {
                        var i = a.querySelector("textarea:hover");
                        if (i) {
                            var n = i.scrollHeight - i.clientHeight;
                            if (0 < n && !(0 === i.scrollTop && 0 < t || i.scrollTop === n && t < 0)) return !0;
                            var s = i.scrollLeft - i.clientWidth;
                            if (0 < s && !(0 === i.scrollLeft && e < 0 || i.scrollLeft === s && 0 < e)) return !0
                        }
                        return !1
                    })(o, r) || (d = !1, l.settings.useBothWheelAxes ? l.scrollbarYActive && !l.scrollbarXActive ? (h(a, "top", r ? a.scrollTop - r * l.settings.wheelSpeed : a.scrollTop + o * l.settings.wheelSpeed), d = !0) : l.scrollbarXActive && !l.scrollbarYActive && (h(a, "left", o ? a.scrollLeft + o * l.settings.wheelSpeed : a.scrollLeft - r * l.settings.wheelSpeed), d = !0) : (h(a, "top", a.scrollTop - r * l.settings.wheelSpeed), h(a, "left", a.scrollLeft + o * l.settings.wheelSpeed)), c(a), (d = d || function(e, t) {
                        var i = a.scrollTop;
                        if (0 === e) {
                            if (!l.scrollbarYActive) return !1;
                            if (0 === i && 0 < t || i >= l.contentHeight - l.containerHeight && t < 0) return !l.settings.wheelPropagation
                        }
                        var n = a.scrollLeft;
                        if (0 === t) {
                            if (!l.scrollbarXActive) return !1;
                            if (0 === n && e < 0 || n >= l.contentWidth - l.containerWidth && 0 < e) return !l.settings.wheelPropagation
                        }
                        return !0
                    }(o, r)) && (e.stopPropagation(), e.preventDefault()))
                }
                void 0 !== window.onwheel ? l.event.bind(a, "wheel", e) : void 0 !== window.onmousewheel && l.event.bind(a, "mousewheel", e)
            }
            t.exports = function(e) {
                s(e, n.get(e))
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        14: [function(e, t, i) {
            "use strict";
            var n = e("../instances"),
                s = e("../update-geometry");
            t.exports = function(e) {
                var t, i = n.get(e);
                t = e, i.event.bind(t, "scroll", function() {
                    s(t)
                })
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19
        }],
        15: [function(e, t, i) {
            "use strict";
            var u = e("../../lib/helper"),
                p = e("../instances"),
                m = e("../update-geometry"),
                f = e("../update-scroll");

            function n(a, e) {
                var l = null,
                    d = {
                        top: 0,
                        left: 0
                    };

                function c() {
                    l && (clearInterval(l), l = null), u.stopScrolling(a)
                }
                var h = !1;
                e.event.bind(e.ownerDocument, "selectionchange", function() {
                    var e;
                    a.contains(0 === (e = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "").toString().length ? null : e.getRangeAt(0).commonAncestorContainer) ? h = !0 : (h = !1, c())
                }), e.event.bind(window, "mouseup", function() {
                    h && (h = !1, c())
                }), e.event.bind(window, "mousemove", function(e) {
                    if (h) {
                        var t = e.pageX,
                            i = e.pageY,
                            n = a.offsetLeft,
                            s = a.offsetLeft + a.offsetWidth,
                            o = a.offsetTop,
                            r = a.offsetTop + a.offsetHeight;
                        t < n + 3 ? (d.left = -5, u.startScrolling(a, "x")) : s - 3 < t ? (d.left = 5, u.startScrolling(a, "x")) : d.left = 0, i < o + 3 ? (d.top = o + 3 - i < 5 ? -5 : -20, u.startScrolling(a, "y")) : r - 3 < i ? (d.top = i - r + 3 < 5 ? 5 : 20, u.startScrolling(a, "y")) : d.top = 0, 0 === d.top && 0 === d.left ? c() : l || (l = setInterval(function() {
                            p.get(a) ? (f(a, "top", a.scrollTop + d.top), f(a, "left", a.scrollLeft + d.left), m(a)) : clearInterval(l)
                        }, 50))
                    }
                })
            }
            t.exports = function(e) {
                n(e, p.get(e))
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        16: [function(e, t, i) {
            "use strict";
            var y = e("../instances"),
                w = e("../update-geometry"),
                b = e("../update-scroll");

            function n(a, l, e, t) {
                function d(e, t) {
                    b(a, "top", a.scrollTop - t), b(a, "left", a.scrollLeft - e), w(a)
                }
                var c = {},
                    h = 0,
                    u = {},
                    i = null,
                    p = !1,
                    m = !1;

                function n() {
                    p = !0
                }

                function s() {
                    p = !1
                }

                function f(e) {
                    return e.targetTouches ? e.targetTouches[0] : e
                }

                function g(e) {
                    return !(!e.targetTouches || 1 !== e.targetTouches.length) || !(!e.pointerType || "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                }

                function o(e) {
                    if (g(e)) {
                        m = !0;
                        var t = f(e);
                        c.pageX = t.pageX, c.pageY = t.pageY, h = (new Date).getTime(), null !== i && clearInterval(i), e.stopPropagation()
                    }
                }

                function r(e) {
                    if (!p && m && g(e)) {
                        var t = f(e),
                            i = {
                                pageX: t.pageX,
                                pageY: t.pageY
                            },
                            n = i.pageX - c.pageX,
                            s = i.pageY - c.pageY;
                        d(n, s), c = i;
                        var o = (new Date).getTime(),
                            r = o - h;
                        0 < r && (u.x = n / r, u.y = s / r, h = o),
                            function(e, t) {
                                var i = a.scrollTop,
                                    n = a.scrollLeft,
                                    s = Math.abs(e),
                                    o = Math.abs(t);
                                if (s < o) {
                                    if (t < 0 && i === l.contentHeight - l.containerHeight || 0 < t && 0 === i) return !l.settings.swipePropagation
                                } else if (o < s && (e < 0 && n === l.contentWidth - l.containerWidth || 0 < e && 0 === n)) return !l.settings.swipePropagation;
                                return !0
                            }(n, s) && (e.stopPropagation(), e.preventDefault())
                    }
                }

                function v() {
                    !p && m && (m = !1, clearInterval(i), i = setInterval(function() {
                        y.get(a) ? Math.abs(u.x) < .01 && Math.abs(u.y) < .01 ? clearInterval(i) : (d(30 * u.x, 30 * u.y), u.x *= .8, u.y *= .8) : clearInterval(i)
                    }, 10))
                }
                e && (l.event.bind(window, "touchstart", n), l.event.bind(window, "touchend", s), l.event.bind(a, "touchstart", o), l.event.bind(a, "touchmove", r), l.event.bind(a, "touchend", v)), t && (window.PointerEvent ? (l.event.bind(window, "pointerdown", n), l.event.bind(window, "pointerup", s), l.event.bind(a, "pointerdown", o), l.event.bind(a, "pointermove", r), l.event.bind(a, "pointerup", v)) : window.MSPointerEvent && (l.event.bind(window, "MSPointerDown", n), l.event.bind(window, "MSPointerUp", s), l.event.bind(a, "MSPointerDown", o), l.event.bind(a, "MSPointerMove", r), l.event.bind(a, "MSPointerUp", v)))
            }
            t.exports = function(e, t, i) {
                n(e, y.get(e), t, i)
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        17: [function(e, t, i) {
            "use strict";
            var n = e("../lib/class"),
                s = e("../lib/helper"),
                o = e("./instances"),
                r = e("./update-geometry"),
                a = e("./handler/click-rail"),
                l = e("./handler/drag-scrollbar"),
                d = e("./handler/keyboard"),
                c = e("./handler/mouse-wheel"),
                h = e("./handler/native-scroll"),
                u = e("./handler/selection"),
                p = e("./handler/touch");
            t.exports = function(e, t) {
                t = "object" == typeof t ? t : {}, n.add(e, "ps-container");
                var i = o.add(e);
                i.settings = s.extend(i.settings, t), n.add(e, "ps-theme-" + i.settings.theme), a(e), l(e), c(e), h(e), i.settings.useSelectionScroll && u(e), (s.env.supportsTouch || s.env.supportsIePointer) && p(e, s.env.supportsTouch, s.env.supportsIePointer), i.settings.useKeyboard && d(e), r(e)
            }
        }, {
            "../lib/class": 2,
            "../lib/helper": 6,
            "./handler/click-rail": 10,
            "./handler/drag-scrollbar": 11,
            "./handler/keyboard": 12,
            "./handler/mouse-wheel": 13,
            "./handler/native-scroll": 14,
            "./handler/selection": 15,
            "./handler/touch": 16,
            "./instances": 18,
            "./update-geometry": 19
        }],
        18: [function(e, t, i) {
            "use strict";
            var r = e("../lib/class"),
                a = e("../lib/dom"),
                l = e("./default-setting"),
                d = e("../lib/event-manager"),
                s = e("../lib/guid"),
                c = e("../lib/helper"),
                o = {};

            function h(e) {
                var t, i, n = this;

                function s() {
                    r.add(e, "ps-focus")
                }

                function o() {
                    r.remove(e, "ps-focus")
                }
                n.settings = c.clone(l), n.containerWidth = null, n.containerHeight = null, n.contentWidth = null, n.contentHeight = null, n.isRtl = "rtl" === a.css(e, "direction"), n.isNegativeScroll = (i = e.scrollLeft, e.scrollLeft = -1, t = e.scrollLeft < 0, e.scrollLeft = i, t), n.negativeScrollAdjustment = n.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, n.event = new d, n.ownerDocument = e.ownerDocument || document, n.scrollbarXRail = a.appendTo(a.e("div", "ps-scrollbar-x-rail"), e), n.scrollbarX = a.appendTo(a.e("div", "ps-scrollbar-x"), n.scrollbarXRail), n.scrollbarX.setAttribute("tabindex", 0), n.event.bind(n.scrollbarX, "focus", s), n.event.bind(n.scrollbarX, "blur", o), n.scrollbarXActive = null, n.scrollbarXWidth = null, n.scrollbarXLeft = null, n.scrollbarXBottom = c.toInt(a.css(n.scrollbarXRail, "bottom")), n.isScrollbarXUsingBottom = n.scrollbarXBottom == n.scrollbarXBottom, n.scrollbarXTop = n.isScrollbarXUsingBottom ? null : c.toInt(a.css(n.scrollbarXRail, "top")), n.railBorderXWidth = c.toInt(a.css(n.scrollbarXRail, "borderLeftWidth")) + c.toInt(a.css(n.scrollbarXRail, "borderRightWidth")), a.css(n.scrollbarXRail, "display", "block"), n.railXMarginWidth = c.toInt(a.css(n.scrollbarXRail, "marginLeft")) + c.toInt(a.css(n.scrollbarXRail, "marginRight")), a.css(n.scrollbarXRail, "display", ""), n.railXWidth = null, n.railXRatio = null, n.scrollbarYRail = a.appendTo(a.e("div", "ps-scrollbar-y-rail"), e), n.scrollbarY = a.appendTo(a.e("div", "ps-scrollbar-y"), n.scrollbarYRail), n.scrollbarY.setAttribute("tabindex", 0), n.event.bind(n.scrollbarY, "focus", s), n.event.bind(n.scrollbarY, "blur", o), n.scrollbarYActive = null, n.scrollbarYHeight = null, n.scrollbarYTop = null, n.scrollbarYRight = c.toInt(a.css(n.scrollbarYRail, "right")), n.isScrollbarYUsingRight = n.scrollbarYRight == n.scrollbarYRight, n.scrollbarYLeft = n.isScrollbarYUsingRight ? null : c.toInt(a.css(n.scrollbarYRail, "left")), n.scrollbarYOuterWidth = n.isRtl ? c.outerWidth(n.scrollbarY) : null, n.railBorderYWidth = c.toInt(a.css(n.scrollbarYRail, "borderTopWidth")) + c.toInt(a.css(n.scrollbarYRail, "borderBottomWidth")), a.css(n.scrollbarYRail, "display", "block"), n.railYMarginHeight = c.toInt(a.css(n.scrollbarYRail, "marginTop")) + c.toInt(a.css(n.scrollbarYRail, "marginBottom")), a.css(n.scrollbarYRail, "display", ""), n.railYHeight = null, n.railYRatio = null
            }

            function n(e) {
                return void 0 === e.dataset ? e.getAttribute("data-ps-id") : e.dataset.psId
            }
            i.add = function(e) {
                var t, i, n = s();
                return i = n, void 0 === (t = e).dataset ? t.setAttribute("data-ps-id", i) : t.dataset.psId = i, o[n] = new h(e), o[n]
            }, i.remove = function(e) {
                var t;
                delete o[n(e)], void 0 === (t = e).dataset ? t.removeAttribute("data-ps-id") : delete t.dataset.psId
            }, i.get = function(e) {
                return o[n(e)]
            }
        }, {
            "../lib/class": 2,
            "../lib/dom": 3,
            "../lib/event-manager": 4,
            "../lib/guid": 5,
            "../lib/helper": 6,
            "./default-setting": 8
        }],
        19: [function(e, t, i) {
            "use strict";
            var n = e("../lib/class"),
                s = e("../lib/dom"),
                o = e("../lib/helper"),
                r = e("./instances"),
                a = e("./update-scroll");

            function l(e, t) {
                return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t
            }
            t.exports = function(e) {
                var t, i = r.get(e);
                i.containerWidth = e.clientWidth, i.containerHeight = e.clientHeight, i.contentWidth = e.scrollWidth, i.contentHeight = e.scrollHeight, e.contains(i.scrollbarXRail) || (0 < (t = s.queryChildren(e, ".ps-scrollbar-x-rail")).length && t.forEach(function(e) {
                        s.remove(e)
                    }), s.appendTo(i.scrollbarXRail, e)), e.contains(i.scrollbarYRail) || (0 < (t = s.queryChildren(e, ".ps-scrollbar-y-rail")).length && t.forEach(function(e) {
                        s.remove(e)
                    }), s.appendTo(i.scrollbarYRail, e)), !i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth ? (i.scrollbarXActive = !0, i.railXWidth = i.containerWidth - i.railXMarginWidth, i.railXRatio = i.containerWidth / i.railXWidth, i.scrollbarXWidth = l(i, o.toInt(i.railXWidth * i.containerWidth / i.contentWidth)), i.scrollbarXLeft = o.toInt((i.negativeScrollAdjustment + e.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth))) : i.scrollbarXActive = !1, !i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight ? (i.scrollbarYActive = !0, i.railYHeight = i.containerHeight - i.railYMarginHeight, i.railYRatio = i.containerHeight / i.railYHeight, i.scrollbarYHeight = l(i, o.toInt(i.railYHeight * i.containerHeight / i.contentHeight)), i.scrollbarYTop = o.toInt(e.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight))) : i.scrollbarYActive = !1, i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth && (i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth), i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight && (i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight),
                    function(e, t) {
                        var i = {
                            width: t.railXWidth
                        };
                        t.isRtl ? i.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : i.left = e.scrollLeft, t.isScrollbarXUsingBottom ? i.bottom = t.scrollbarXBottom - e.scrollTop : i.top = t.scrollbarXTop + e.scrollTop, s.css(t.scrollbarXRail, i);
                        var n = {
                            top: e.scrollTop,
                            height: t.railYHeight
                        };
                        t.isScrollbarYUsingRight ? t.isRtl ? n.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth : n.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + 2 * t.containerWidth - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : n.left = t.scrollbarYLeft + e.scrollLeft, s.css(t.scrollbarYRail, n), s.css(t.scrollbarX, {
                            left: t.scrollbarXLeft,
                            width: t.scrollbarXWidth - t.railBorderXWidth
                        }), s.css(t.scrollbarY, {
                            top: t.scrollbarYTop,
                            height: t.scrollbarYHeight - t.railBorderYWidth
                        })
                    }(e, i), i.scrollbarXActive ? n.add(e, "ps-active-x") : (n.remove(e, "ps-active-x"), i.scrollbarXWidth = 0, i.scrollbarXLeft = 0, a(e, "left", 0)), i.scrollbarYActive ? n.add(e, "ps-active-y") : (n.remove(e, "ps-active-y"), i.scrollbarYHeight = 0, i.scrollbarYTop = 0, a(e, "top", 0))
            }
        }, {
            "../lib/class": 2,
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18,
            "./update-scroll": 20
        }],
        20: [function(e, t, i) {
            "use strict";
            var s, o, r = e("./instances"),
                a = document.createEvent("Event"),
                l = document.createEvent("Event"),
                d = document.createEvent("Event"),
                c = document.createEvent("Event"),
                h = document.createEvent("Event"),
                u = document.createEvent("Event"),
                p = document.createEvent("Event"),
                m = document.createEvent("Event"),
                f = document.createEvent("Event"),
                g = document.createEvent("Event");
            a.initEvent("ps-scroll-up", !0, !0), l.initEvent("ps-scroll-down", !0, !0), d.initEvent("ps-scroll-left", !0, !0), c.initEvent("ps-scroll-right", !0, !0), h.initEvent("ps-scroll-y", !0, !0), u.initEvent("ps-scroll-x", !0, !0), p.initEvent("ps-x-reach-start", !0, !0), m.initEvent("ps-x-reach-end", !0, !0), f.initEvent("ps-y-reach-start", !0, !0), g.initEvent("ps-y-reach-end", !0, !0), t.exports = function(e, t, i) {
                if (void 0 === e) throw "You must provide an element to the update-scroll function";
                if (void 0 === t) throw "You must provide an axis to the update-scroll function";
                if (void 0 === i) throw "You must provide a value to the update-scroll function";
                "top" === t && i <= 0 && (e.scrollTop = i = 0, e.dispatchEvent(f)), "left" === t && i <= 0 && (e.scrollLeft = i = 0, e.dispatchEvent(p));
                var n = r.get(e);
                "top" === t && i >= n.contentHeight - n.containerHeight && (e.scrollTop = i = n.contentHeight - n.containerHeight, e.dispatchEvent(g)), "left" === t && i >= n.contentWidth - n.containerWidth && (e.scrollLeft = i = n.contentWidth - n.containerWidth, e.dispatchEvent(m)), s || (s = e.scrollTop), o || (o = e.scrollLeft), "top" === t && i < s && e.dispatchEvent(a), "top" === t && s < i && e.dispatchEvent(l), "left" === t && i < o && e.dispatchEvent(d), "left" === t && o < i && e.dispatchEvent(c), "top" === t && (e.scrollTop = s = i, e.dispatchEvent(h)), "left" === t && (e.scrollLeft = o = i, e.dispatchEvent(u))
            }
        }, {
            "./instances": 18
        }],
        21: [function(e, t, i) {
            "use strict";
            var n = e("../lib/dom"),
                s = e("../lib/helper"),
                o = e("./instances"),
                r = e("./update-geometry"),
                a = e("./update-scroll");
            t.exports = function(e) {
                var t = o.get(e);
                t && (t.negativeScrollAdjustment = t.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, n.css(t.scrollbarXRail, "display", "block"), n.css(t.scrollbarYRail, "display", "block"), t.railXMarginWidth = s.toInt(n.css(t.scrollbarXRail, "marginLeft")) + s.toInt(n.css(t.scrollbarXRail, "marginRight")), t.railYMarginHeight = s.toInt(n.css(t.scrollbarYRail, "marginTop")) + s.toInt(n.css(t.scrollbarYRail, "marginBottom")), n.css(t.scrollbarXRail, "display", "none"), n.css(t.scrollbarYRail, "display", "none"), r(e), a(e, "top", e.scrollTop), a(e, "left", e.scrollLeft), n.css(t.scrollbarXRail, "display", ""), n.css(t.scrollbarYRail, "display", ""))
            }
        }, {
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18,
            "./update-geometry": 19,
            "./update-scroll": 20
        }]
    }, {}, [1]), "function" != typeof Object.create && (Object.create = function(e) {
        function t() {}
        return t.prototype = e, new t
    }), w = jQuery, window, document, b = {
        init: function(e, t) {
            var i = this;
            i.elem = t, i.$elem = w(t), i.imageSrc = i.$elem.data("zoom-image") ? i.$elem.data("zoom-image") : i.$elem.attr("src"), i.options = w.extend({}, w.fn.elevateZoom.options, e), i.options.tint && (i.options.lensColour = "none", i.options.lensOpacity = "1"), "inner" == i.options.zoomType && (i.options.showLens = !1), i.$elem.parent().removeAttr("title").removeAttr("alt"), i.zoomImage = i.imageSrc, i.refresh(1), w("#" + i.options.gallery + " a").click(function(e) {
                return i.options.galleryActiveClass && (w("#" + i.options.gallery + " a").removeClass(i.options.galleryActiveClass), w(this).addClass(i.options.galleryActiveClass)), e.preventDefault(), w(this).data("zoom-image") ? i.zoomImagePre = w(this).data("zoom-image") : i.zoomImagePre = w(this).data("image"), i.swaptheimage(w(this).data("image"), i.zoomImagePre), !1
            })
        },
        refresh: function(e) {
            var t = this;
            setTimeout(function() {
                t.fetch(t.imageSrc)
            }, e || t.options.refresh)
        },
        fetch: function(e) {
            var t = this,
                i = new Image;
            i.onload = function() {
                t.largeWidth = i.width, t.largeHeight = i.height, t.startZoom(), t.currentImage = t.imageSrc, t.options.onZoomedImageLoaded(t.$elem)
            }, i.src = e
        },
        startZoom: function() {
            var i = this;
            if (i.nzWidth = i.$elem.width(), i.nzHeight = i.$elem.height(), i.isWindowActive = !1, i.isLensActive = !1, i.isTintActive = !1, i.overWindow = !1, i.options.imageCrossfade && (i.zoomWrap = i.$elem.wrap('<div style="height:' + i.nzHeight + "px;width:" + i.nzWidth + 'px;" class="zoomWrapper" />'), i.$elem.css("position", "absolute")), i.zoomLock = 1, i.scrollingLock = !1, i.changeBgSize = !1, i.currentZoomLevel = i.options.zoomLevel, i.nzOffset = i.$elem.offset(), i.widthRatio = i.largeWidth / i.currentZoomLevel / i.nzWidth, i.heightRatio = i.largeHeight / i.currentZoomLevel / i.nzHeight, "window" == i.options.zoomType && (i.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(i.options.zoomWindowBgColour) + ";width: " + String(i.options.zoomWindowWidth) + "px;height: " + String(i.options.zoomWindowHeight) + "px;float: left;background-size: " + i.largeWidth / i.currentZoomLevel + "px " + i.largeHeight / i.currentZoomLevel + "px;display: none;z-index:100;border: " + String(i.options.borderSize) + "px solid " + i.options.borderColour + ";background-repeat: no-repeat;position: absolute;"), "inner" == i.options.zoomType) {
                var e = i.$elem.css("border-left-width");
                i.zoomWindowStyle = "overflow: hidden;margin-left: " + String(e) + ";margin-top: " + String(e) + ";background-position: 0px 0px;width: " + String(i.nzWidth) + "px;height: " + String(i.nzHeight) + "px;float: left;display: none;cursor:" + i.options.cursor + ";px solid " + i.options.borderColour + ";background-repeat: no-repeat;position: absolute;"
            }
            "window" == i.options.zoomType && (lensHeight = i.nzHeight < i.options.zoomWindowWidth / i.widthRatio ? i.nzHeight : String(i.options.zoomWindowHeight / i.heightRatio), lensWidth = i.largeWidth < i.options.zoomWindowWidth ? i.nzWidth : i.options.zoomWindowWidth / i.widthRatio, i.lensStyle = "background-position: 0px 0px;width: " + String(i.options.zoomWindowWidth / i.widthRatio) + "px;height: " + String(i.options.zoomWindowHeight / i.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" + i.options.lensOpacity + ";filter: alpha(opacity = " + 100 * i.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + i.options.lensColour + ";cursor:" + i.options.cursor + ";border: " + i.options.lensBorderSize + "px solid " + i.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;"), i.tintStyle = "display: block;position: absolute;background-color: " + i.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + i.nzWidth + "px;height: " + i.nzHeight + "px;", i.lensRound = "", "lens" == i.options.zoomType && (i.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(i.options.borderSize) + "px solid " + i.options.borderColour + ";width:" + String(i.options.lensSize) + "px;height:" + String(i.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;"), "round" == i.options.lensShape && (i.lensRound = "border-top-left-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-top-right-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-bottom-left-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-bottom-right-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;"), i.zoomContainer = w('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + i.nzOffset.left + "px;top:" + i.nzOffset.top + "px;height:" + i.nzHeight + "px;width:" + i.nzWidth + 'px;"></div>'), w("body").append(i.zoomContainer), i.options.containLensZoom && "lens" == i.options.zoomType && i.zoomContainer.css("overflow", "hidden"), "inner" != i.options.zoomType && (i.zoomLens = w("<div class='zoomLens' style='" + i.lensStyle + i.lensRound + "'>&nbsp;</div>").appendTo(i.zoomContainer).click(function() {
                i.$elem.trigger("click")
            }), i.options.tint && (i.tintContainer = w("<div/>").addClass("tintContainer"), i.zoomTint = w("<div class='zoomTint' style='" + i.tintStyle + "'></div>"), i.zoomLens.wrap(i.tintContainer), i.zoomTintcss = i.zoomLens.after(i.zoomTint), i.zoomTintImage = w('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + i.nzWidth + "px; height: " + i.nzHeight + 'px;" src="' + i.imageSrc + '">').appendTo(i.zoomLens).click(function() {
                i.$elem.trigger("click")
            }))), isNaN(i.options.zoomWindowPosition) ? i.zoomWindow = w("<div style='z-index:999;left:" + i.windowOffsetLeft + "px;top:" + i.windowOffsetTop + "px;" + i.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function() {
                i.$elem.trigger("click")
            }) : i.zoomWindow = w("<div style='z-index:999;left:" + i.windowOffsetLeft + "px;top:" + i.windowOffsetTop + "px;" + i.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(i.zoomContainer).click(function() {
                i.$elem.trigger("click")
            }), i.zoomWindowContainer = w("<div/>").addClass("zoomWindowContainer").css("width", i.options.zoomWindowWidth), i.zoomWindow.wrap(i.zoomWindowContainer), "lens" == i.options.zoomType && i.zoomLens.css({
                backgroundImage: "url('" + i.imageSrc + "')"
            }), "window" == i.options.zoomType && i.zoomWindow.css({
                backgroundImage: "url('" + i.imageSrc + "')"
            }), "inner" == i.options.zoomType && i.zoomWindow.css({
                backgroundImage: "url('" + i.imageSrc + "')"
            }), i.$elem.bind("touchmove", function(e) {
                e.preventDefault(), i.setPosition(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
            }), i.zoomContainer.bind("touchmove", function(e) {
                "inner" == i.options.zoomType && i.showHideWindow("show"), e.preventDefault(), i.setPosition(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
            }), i.zoomContainer.bind("touchend", function(e) {
                i.showHideWindow("hide"), i.options.showLens && i.showHideLens("hide"), i.options.tint && "inner" != i.options.zoomType && i.showHideTint("hide")
            }), i.$elem.bind("touchend", function(e) {
                i.showHideWindow("hide"), i.options.showLens && i.showHideLens("hide"), i.options.tint && "inner" != i.options.zoomType && i.showHideTint("hide")
            }), i.options.showLens && (i.zoomLens.bind("touchmove", function(e) {
                e.preventDefault(), i.setPosition(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
            }), i.zoomLens.bind("touchend", function(e) {
                i.showHideWindow("hide"), i.options.showLens && i.showHideLens("hide"), i.options.tint && "inner" != i.options.zoomType && i.showHideTint("hide")
            })), i.$elem.bind("mousemove", function(e) {
                0 == i.overWindow && i.setElements("show"), i.lastX === e.clientX && i.lastY === e.clientY || (i.setPosition(e), i.currentLoc = e), i.lastX = e.clientX, i.lastY = e.clientY
            }), i.zoomContainer.bind("mousemove", function(e) {
                0 == i.overWindow && i.setElements("show"), i.lastX === e.clientX && i.lastY === e.clientY || (i.setPosition(e), i.currentLoc = e), i.lastX = e.clientX, i.lastY = e.clientY
            }), "inner" != i.options.zoomType && i.zoomLens.bind("mousemove", function(e) {
                i.lastX === e.clientX && i.lastY === e.clientY || (i.setPosition(e), i.currentLoc = e), i.lastX = e.clientX, i.lastY = e.clientY
            }), i.options.tint && "inner" != i.options.zoomType && i.zoomTint.bind("mousemove", function(e) {
                i.lastX === e.clientX && i.lastY === e.clientY || (i.setPosition(e), i.currentLoc = e), i.lastX = e.clientX, i.lastY = e.clientY
            }), "inner" == i.options.zoomType && i.zoomWindow.bind("mousemove", function(e) {
                i.lastX === e.clientX && i.lastY === e.clientY || (i.setPosition(e), i.currentLoc = e), i.lastX = e.clientX, i.lastY = e.clientY
            }), i.zoomContainer.add(i.$elem).mouseenter(function() {
                0 == i.overWindow && i.setElements("show")
            }).mouseleave(function() {
                i.scrollLock || i.setElements("hide")
            }), "inner" != i.options.zoomType && i.zoomWindow.mouseenter(function() {
                i.overWindow = !0, i.setElements("hide")
            }).mouseleave(function() {
                i.overWindow = !1
            }), i.minZoomLevel = i.options.minZoomLevel ? i.options.minZoomLevel : 2 * i.options.scrollZoomIncrement, i.options.scrollZoom && i.zoomContainer.add(i.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(e) {
                i.scrollLock = !0, clearTimeout(w.data(this, "timer")), w.data(this, "timer", setTimeout(function() {
                    i.scrollLock = !1
                }, 250));
                var t = e.originalEvent.wheelDelta || -1 * e.originalEvent.detail;
                return e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), 0 < t / 120 ? i.currentZoomLevel >= i.minZoomLevel && i.changeZoomLevel(i.currentZoomLevel - i.options.scrollZoomIncrement) : i.options.maxZoomLevel ? i.currentZoomLevel <= i.options.maxZoomLevel && i.changeZoomLevel(parseFloat(i.currentZoomLevel) + i.options.scrollZoomIncrement) : i.changeZoomLevel(parseFloat(i.currentZoomLevel) + i.options.scrollZoomIncrement), !1
            })
        },
        setElements: function(e) {
            if (!this.options.zoomEnabled) return !1;
            "show" == e && this.isWindowSet && ("inner" == this.options.zoomType && this.showHideWindow("show"), "window" == this.options.zoomType && this.showHideWindow("show"), this.options.showLens && this.showHideLens("show"), this.options.tint && "inner" != this.options.zoomType && this.showHideTint("show")), "hide" == e && ("window" == this.options.zoomType && this.showHideWindow("hide"), this.options.tint || this.showHideWindow("hide"), this.options.showLens && this.showHideLens("hide"), this.options.tint && this.showHideTint("hide"))
        },
        setPosition: function(e) {
            if (!this.options.zoomEnabled) return !1;
            this.nzHeight = this.$elem.height(), this.nzWidth = this.$elem.width(), this.nzOffset = this.$elem.offset(), this.options.tint && "inner" != this.options.zoomType && (this.zoomTint.css({
                top: 0
            }), this.zoomTint.css({
                left: 0
            })), this.options.responsive && !this.options.scrollZoom && this.options.showLens && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "lens" != this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight), this.options.tint && (this.zoomTintImage.css("width", this.nzWidth), this.zoomTintImage.css("height", this.nzHeight))), "lens" == this.options.zoomType && this.zoomLens.css({
                width: String(this.options.lensSize) + "px",
                height: String(this.options.lensSize) + "px"
            })), this.zoomContainer.css({
                top: this.nzOffset.top
            }), this.zoomContainer.css({
                left: this.nzOffset.left
            }), this.mouseLeft = parseInt(e.pageX - this.nzOffset.left), this.mouseTop = parseInt(e.pageY - this.nzOffset.top), "window" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.zoomLens.height() / 2, this.Eboppos = this.mouseTop > this.nzHeight - this.zoomLens.height() / 2 - 2 * this.options.lensBorderSize, this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2, this.Eroppos = this.mouseLeft > this.nzWidth - this.zoomLens.width() / 2 - 2 * this.options.lensBorderSize), "inner" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio, this.Eboppos = this.mouseTop > this.nzHeight - this.nzHeight / 2 / this.heightRatio, this.Eloppos = this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio, this.Eroppos = this.mouseLeft > this.nzWidth - this.nzWidth / 2 / this.widthRatio - 2 * this.options.lensBorderSize), this.mouseLeft <= 0 || this.mouseTop < 0 || this.mouseLeft > this.nzWidth || this.mouseTop > this.nzHeight ? this.setElements("hide") : (this.options.showLens && (this.lensLeftPos = String(this.mouseLeft - this.zoomLens.width() / 2), this.lensTopPos = String(this.mouseTop - this.zoomLens.height() / 2)), this.Etoppos && (this.lensTopPos = 0), this.Eloppos && (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0), "window" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), "inner" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)), "lens" == this.options.zoomType && (this.windowLeftPos = String(-1 * ((e.pageX - this.nzOffset.left) * this.widthRatio - this.zoomLens.width() / 2)), this.windowTopPos = String(-1 * ((e.pageY - this.nzOffset.top) * this.heightRatio - this.zoomLens.height() / 2)), this.zoomLens.css({
                backgroundPosition: this.windowLeftPos + "px " + this.windowTopPos + "px"
            }), this.changeBgSize && (this.nzHeight > this.nzWidth ? ("lens" == this.options.zoomType && this.zoomLens.css({
                "background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"
            }), this.zoomWindow.css({
                "background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"
            })) : ("lens" == this.options.zoomType && this.zoomLens.css({
                "background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"
            }), this.zoomWindow.css({
                "background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"
            })), this.changeBgSize = !1), this.setWindowPostition(e)), this.options.tint && "inner" != this.options.zoomType && this.setTintPosition(e), "window" == this.options.zoomType && this.setWindowPostition(e), "inner" == this.options.zoomType && this.setWindowPostition(e), this.options.showLens && (this.fullwidth && "lens" != this.options.zoomType && (this.lensLeftPos = 0), this.zoomLens.css({
                left: this.lensLeftPos + "px",
                top: this.lensTopPos + "px"
            })))
        },
        showHideWindow: function(e) {
            "show" != e || this.isWindowActive || (this.options.zoomWindowFadeIn ? this.zoomWindow.stop(!0, !0, !1).fadeIn(this.options.zoomWindowFadeIn) : this.zoomWindow.show(), this.isWindowActive = !0), "hide" == e && this.isWindowActive && (this.options.zoomWindowFadeOut ? this.zoomWindow.stop(!0, !0).fadeOut(this.options.zoomWindowFadeOut) : this.zoomWindow.hide(), this.isWindowActive = !1)
        },
        showHideLens: function(e) {
            "show" != e || this.isLensActive || (this.options.lensFadeIn ? this.zoomLens.stop(!0, !0, !1).fadeIn(this.options.lensFadeIn) : this.zoomLens.show(), this.isLensActive = !0), "hide" == e && this.isLensActive && (this.options.lensFadeOut ? this.zoomLens.stop(!0, !0).fadeOut(this.options.lensFadeOut) : this.zoomLens.hide(), this.isLensActive = !1)
        },
        showHideTint: function(e) {
            "show" != e || this.isTintActive || (this.options.zoomTintFadeIn ? this.zoomTint.css({
                opacity: this.options.tintOpacity
            }).animate().stop(!0, !0).fadeIn("slow") : (this.zoomTint.css({
                opacity: this.options.tintOpacity
            }).animate(), this.zoomTint.show()), this.isTintActive = !0), "hide" == e && this.isTintActive && (this.options.zoomTintFadeOut ? this.zoomTint.stop(!0, !0).fadeOut(this.options.zoomTintFadeOut) : this.zoomTint.hide(), this.isTintActive = !1)
        },
        setLensPostition: function(e) {},
        setWindowPostition: function(e) {
            var t = this;
            if (isNaN(t.options.zoomWindowPosition)) t.externalContainer = w("#" + t.options.zoomWindowPosition), t.externalContainerWidth = t.externalContainer.width(), t.externalContainerHeight = t.externalContainer.height(), t.externalContainerOffset = t.externalContainer.offset(), t.windowOffsetTop = t.externalContainerOffset.top, t.windowOffsetLeft = t.externalContainerOffset.left;
            else switch (t.options.zoomWindowPosition) {
                case 1:
                    t.windowOffsetTop = t.options.zoomWindowOffety, t.windowOffsetLeft = +t.nzWidth;
                    break;
                case 2:
                    t.options.zoomWindowHeight > t.nzHeight && (t.windowOffsetTop = -1 * (t.options.zoomWindowHeight / 2 - t.nzHeight / 2), t.windowOffsetLeft = t.nzWidth);
                    break;
                case 3:
                    t.windowOffsetTop = t.nzHeight - t.zoomWindow.height() - 2 * t.options.borderSize, t.windowOffsetLeft = t.nzWidth;
                    break;
                case 4:
                    t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = t.nzWidth;
                    break;
                case 5:
                    t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = t.nzWidth - t.zoomWindow.width() - 2 * t.options.borderSize;
                    break;
                case 6:
                    t.options.zoomWindowHeight > t.nzHeight && (t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = -1 * (t.options.zoomWindowWidth / 2 - t.nzWidth / 2 + 2 * t.options.borderSize));
                    break;
                case 7:
                    t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = 0;
                    break;
                case 8:
                    t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize);
                    break;
                case 9:
                    t.windowOffsetTop = t.nzHeight - t.zoomWindow.height() - 2 * t.options.borderSize, t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize);
                    break;
                case 10:
                    t.options.zoomWindowHeight > t.nzHeight && (t.windowOffsetTop = -1 * (t.options.zoomWindowHeight / 2 - t.nzHeight / 2), t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize));
                    break;
                case 11:
                    t.windowOffsetTop = t.options.zoomWindowOffety, t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize);
                    break;
                case 12:
                    t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize);
                    break;
                case 13:
                    t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = 0;
                    break;
                case 14:
                    t.options.zoomWindowHeight > t.nzHeight && (t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = -1 * (t.options.zoomWindowWidth / 2 - t.nzWidth / 2 + 2 * t.options.borderSize));
                    break;
                case 15:
                    t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = t.nzWidth - t.zoomWindow.width() - 2 * t.options.borderSize;
                    break;
                case 16:
                    t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = t.nzWidth;
                    break;
                default:
                    t.windowOffsetTop = t.options.zoomWindowOffety, t.windowOffsetLeft = t.nzWidth
            }
            t.isWindowSet = !0, t.windowOffsetTop += t.options.zoomWindowOffety, t.windowOffsetLeft += t.options.zoomWindowOffetx, t.zoomWindow.css({
                top: t.windowOffsetTop
            }), t.zoomWindow.css({
                left: t.windowOffsetLeft
            }), "inner" == t.options.zoomType && (t.zoomWindow.css({
                top: 0
            }), t.zoomWindow.css({
                left: 0
            })), t.windowLeftPos = String(-1 * ((e.pageX - t.nzOffset.left) * t.widthRatio - t.zoomWindow.width() / 2)), t.windowTopPos = String(-1 * ((e.pageY - t.nzOffset.top) * t.heightRatio - t.zoomWindow.height() / 2)), t.Etoppos && (t.windowTopPos = 0), t.Eloppos && (t.windowLeftPos = 0), t.Eboppos && (t.windowTopPos = -1 * (t.largeHeight / t.currentZoomLevel - t.zoomWindow.height())), t.Eroppos && (t.windowLeftPos = -1 * (t.largeWidth / t.currentZoomLevel - t.zoomWindow.width())), t.fullheight && (t.windowTopPos = 0), t.fullwidth && (t.windowLeftPos = 0), "window" != t.options.zoomType && "inner" != t.options.zoomType || (1 == t.zoomLock && (t.widthRatio <= 1 && (t.windowLeftPos = 0), t.heightRatio <= 1 && (t.windowTopPos = 0)), t.largeHeight < t.options.zoomWindowHeight && (t.windowTopPos = 0), t.largeWidth < t.options.zoomWindowWidth && (t.windowLeftPos = 0), t.options.easing ? (t.xp || (t.xp = 0), t.yp || (t.yp = 0), t.loop || (t.loop = setInterval(function() {
                t.xp += (t.windowLeftPos - t.xp) / t.options.easingAmount, t.yp += (t.windowTopPos - t.yp) / t.options.easingAmount, t.scrollingLock ? (clearInterval(t.loop), t.xp = t.windowLeftPos, t.yp = t.windowTopPos, t.xp = -1 * ((e.pageX - t.nzOffset.left) * t.widthRatio - t.zoomWindow.width() / 2), t.yp = -1 * ((e.pageY - t.nzOffset.top) * t.heightRatio - t.zoomWindow.height() / 2), t.changeBgSize && (t.nzHeight > t.nzWidth ? ("lens" == t.options.zoomType && t.zoomLens.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                }), t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                })) : ("lens" != t.options.zoomType && t.zoomLens.css({
                    "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvalueheight + "px"
                }), t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                })), t.changeBgSize = !1), t.zoomWindow.css({
                    backgroundPosition: t.windowLeftPos + "px " + t.windowTopPos + "px"
                }), t.scrollingLock = !1, t.loop = !1) : (t.changeBgSize && (t.nzHeight > t.nzWidth ? ("lens" == t.options.zoomType && t.zoomLens.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                }), t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                })) : ("lens" != t.options.zoomType && t.zoomLens.css({
                    "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                }), t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                })), t.changeBgSize = !1), t.zoomWindow.css({
                    backgroundPosition: t.xp + "px " + t.yp + "px"
                }))
            }, 16))) : (t.changeBgSize && (t.nzHeight > t.nzWidth ? ("lens" == t.options.zoomType && t.zoomLens.css({
                "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
            }), t.zoomWindow.css({
                "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
            })) : ("lens" == t.options.zoomType && t.zoomLens.css({
                "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
            }), t.largeHeight / t.newvaluewidth < t.options.zoomWindowHeight ? t.zoomWindow.css({
                "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
            }) : t.zoomWindow.css({
                "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
            })), t.changeBgSize = !1), t.zoomWindow.css({
                backgroundPosition: t.windowLeftPos + "px " + t.windowTopPos + "px"
            })))
        },
        setTintPosition: function(e) {
            this.nzOffset = this.$elem.offset(), this.tintpos = String(-1 * (e.pageX - this.nzOffset.left - this.zoomLens.width() / 2)), this.tintposy = String(-1 * (e.pageY - this.nzOffset.top - this.zoomLens.height() / 2)), this.Etoppos && (this.tintposy = 0), this.Eloppos && (this.tintpos = 0), this.Eboppos && (this.tintposy = -1 * (this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize)), this.Eroppos && (this.tintpos = -1 * (this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), this.options.tint && (this.fullheight && (this.tintposy = 0), this.fullwidth && (this.tintpos = 0), this.zoomTintImage.css({
                left: this.tintpos + "px"
            }), this.zoomTintImage.css({
                top: this.tintposy + "px"
            }))
        },
        swaptheimage: function(e, t) {
            var i = this,
                n = new Image;
            i.options.loadingIcon && (i.spinner = w("<div style=\"background: url('" + i.options.loadingIcon + "') no-repeat center;height:" + i.nzHeight + "px;width:" + i.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>'), i.$elem.after(i.spinner)), i.options.onImageSwap(i.$elem), n.onload = function() {
                i.largeWidth = n.width, i.largeHeight = n.height, i.zoomImage = t, i.zoomWindow.css({
                    "background-size": i.largeWidth + "px " + i.largeHeight + "px"
                }), i.zoomWindow.css({
                    "background-size": i.largeWidth + "px " + i.largeHeight + "px"
                }), i.swapAction(e, t)
            }, n.src = t
        },
        swapAction: function(e, t) {
            var i = this,
                n = new Image;
            if (n.onload = function() {
                    i.nzHeight = n.height, i.nzWidth = n.width, i.options.onImageSwapComplete(i.$elem), i.doneCallback()
                }, n.src = e, i.currentZoomLevel = i.options.zoomLevel, i.options.maxZoomLevel = !1, "lens" == i.options.zoomType && i.zoomLens.css({
                    backgroundImage: "url('" + t + "')"
                }), "window" == i.options.zoomType && i.zoomWindow.css({
                    backgroundImage: "url('" + t + "')"
                }), "inner" == i.options.zoomType && i.zoomWindow.css({
                    backgroundImage: "url('" + t + "')"
                }), i.currentImage = t, i.options.imageCrossfade) {
                var s = i.$elem,
                    o = s.clone();
                i.$elem.attr("src", e), i.$elem.after(o), o.stop(!0).fadeOut(i.options.imageCrossfade, function() {
                    w(this).remove()
                }), i.$elem.width("auto").removeAttr("width"), i.$elem.height("auto").removeAttr("height"), s.fadeIn(i.options.imageCrossfade), i.options.tint && "inner" != i.options.zoomType && (o = (s = i.zoomTintImage).clone(), i.zoomTintImage.attr("src", t), i.zoomTintImage.after(o), o.stop(!0).fadeOut(i.options.imageCrossfade, function() {
                    w(this).remove()
                }), s.fadeIn(i.options.imageCrossfade), i.zoomTint.css({
                    height: i.$elem.height()
                }), i.zoomTint.css({
                    width: i.$elem.width()
                })), i.zoomContainer.css("height", i.$elem.height()), i.zoomContainer.css("width", i.$elem.width()), "inner" != i.options.zoomType || i.options.constrainType || (i.zoomWrap.parent().css("height", i.$elem.height()), i.zoomWrap.parent().css("width", i.$elem.width()), i.zoomWindow.css("height", i.$elem.height()), i.zoomWindow.css("width", i.$elem.width()))
            } else i.$elem.attr("src", e), i.options.tint && (i.zoomTintImage.attr("src", t), i.zoomTintImage.attr("height", i.$elem.height()), i.zoomTintImage.css({
                height: i.$elem.height()
            }), i.zoomTint.css({
                height: i.$elem.height()
            })), i.zoomContainer.css("height", i.$elem.height()), i.zoomContainer.css("width", i.$elem.width());
            i.options.imageCrossfade && (i.zoomWrap.css("height", i.$elem.height()), i.zoomWrap.css("width", i.$elem.width())), i.options.constrainType && ("height" == i.options.constrainType && (i.zoomContainer.css("height", i.options.constrainSize), i.zoomContainer.css("width", "auto"), i.options.imageCrossfade ? (i.zoomWrap.css("height", i.options.constrainSize), i.zoomWrap.css("width", "auto"), i.constwidth = i.zoomWrap.width()) : (i.$elem.css("height", i.options.constrainSize), i.$elem.css("width", "auto"), i.constwidth = i.$elem.width()), "inner" == i.options.zoomType && (i.zoomWrap.parent().css("height", i.options.constrainSize), i.zoomWrap.parent().css("width", i.constwidth), i.zoomWindow.css("height", i.options.constrainSize), i.zoomWindow.css("width", i.constwidth)), i.options.tint && (i.tintContainer.css("height", i.options.constrainSize), i.tintContainer.css("width", i.constwidth), i.zoomTint.css("height", i.options.constrainSize), i.zoomTint.css("width", i.constwidth), i.zoomTintImage.css("height", i.options.constrainSize), i.zoomTintImage.css("width", i.constwidth))), "width" == i.options.constrainType && (i.zoomContainer.css("height", "auto"), i.zoomContainer.css("width", i.options.constrainSize), i.options.imageCrossfade ? (i.zoomWrap.css("height", "auto"), i.zoomWrap.css("width", i.options.constrainSize), i.constheight = i.zoomWrap.height()) : (i.$elem.css("height", "auto"), i.$elem.css("width", i.options.constrainSize), i.constheight = i.$elem.height()), "inner" == i.options.zoomType && (i.zoomWrap.parent().css("height", i.constheight), i.zoomWrap.parent().css("width", i.options.constrainSize), i.zoomWindow.css("height", i.constheight), i.zoomWindow.css("width", i.options.constrainSize)), i.options.tint && (i.tintContainer.css("height", i.constheight), i.tintContainer.css("width", i.options.constrainSize), i.zoomTint.css("height", i.constheight), i.zoomTint.css("width", i.options.constrainSize), i.zoomTintImage.css("height", i.constheight), i.zoomTintImage.css("width", i.options.constrainSize))))
        },
        doneCallback: function() {
            this.options.loadingIcon && this.spinner.hide(), this.nzOffset = this.$elem.offset(), this.nzWidth = this.$elem.width(), this.nzHeight = this.$elem.height(), this.currentZoomLevel = this.options.zoomLevel, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "window" == this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens && (this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight)))
        },
        getCurrentImage: function() {
            return this.zoomImage
        },
        getGalleryList: function() {
            var t = this;
            return t.gallerylist = [], t.options.gallery ? w("#" + t.options.gallery + " a").each(function() {
                var e = "";
                w(this).data("zoom-image") ? e = w(this).data("zoom-image") : w(this).data("image") && (e = w(this).data("image")), e == t.zoomImage ? t.gallerylist.unshift({
                    href: "" + e,
                    title: w(this).find("img").attr("title")
                }) : t.gallerylist.push({
                    href: "" + e,
                    title: w(this).find("img").attr("title")
                })
            }) : t.gallerylist.push({
                href: "" + t.zoomImage,
                title: w(this).find("img").attr("title")
            }), t.gallerylist
        },
        changeZoomLevel: function(e) {
            this.scrollingLock = !0, this.newvalue = parseFloat(e).toFixed(2), newvalue = parseFloat(e).toFixed(2), maxheightnewvalue = this.largeHeight / (this.options.zoomWindowHeight / this.nzHeight * this.nzHeight), maxwidthtnewvalue = this.largeWidth / (this.options.zoomWindowWidth / this.nzWidth * this.nzWidth), "inner" != this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / maxheightnewvalue / this.nzHeight, this.newvalueheight = maxheightnewvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / maxwidthtnewvalue / this.nzWidth, this.newvaluewidth = maxwidthtnewvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1), "lens" == this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.fullwidth = !0, this.newvaluewidth = maxheightnewvalue) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1))), "inner" == this.options.zoomType && (maxheightnewvalue = parseFloat(this.largeHeight / this.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(this.largeWidth / this.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1)), scrcontinue = !1, "inner" == this.options.zoomType && (this.nzWidth > this.nzHeight && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0)), this.nzHeight > this.nzWidth && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0))), "inner" != this.options.zoomType && (scrcontinue = !0), scrcontinue && (this.zoomLock = 0, this.changeZoom = !0, this.options.zoomWindowHeight / this.heightRatio <= this.nzHeight && (this.currentZoomLevel = this.newvalueheight, "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({
                height: String(this.options.zoomWindowHeight / this.heightRatio) + "px"
            })), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), this.options.zoomWindowWidth / this.widthRatio <= this.nzWidth && ("inner" != this.options.zoomType && this.newvaluewidth > this.newvalueheight && (this.currentZoomLevel = this.newvaluewidth), "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({
                width: String(this.options.zoomWindowWidth / this.widthRatio) + "px"
            })), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), "inner" == this.options.zoomType && (this.changeBgSize = !0, this.nzWidth > this.nzHeight && (this.currentZoomLevel = this.newvaluewidth), this.nzHeight > this.nzWidth && (this.currentZoomLevel = this.newvaluewidth))), this.setPosition(this.currentLoc)
        },
        closeAll: function() {
            self.zoomWindow && self.zoomWindow.hide(), self.zoomLens && self.zoomLens.hide(), self.zoomTint && self.zoomTint.hide()
        },
        changeState: function(e) {
            "enable" == e && (this.options.zoomEnabled = !0), "disable" == e && (this.options.zoomEnabled = !1)
        }
    }, w.fn.elevateZoom = function(t) {
        return this.each(function() {
            var e = Object.create(b);
            e.init(t, this), w.data(this, "elevateZoom", e)
        })
    }, w.fn.elevateZoom.options = {
        zoomActivation: "hover",
        zoomEnabled: !0,
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: !1,
        scrollZoomIncrement: .1,
        minZoomLevel: !1,
        maxZoomLevel: !1,
        easing: !1,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: .4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: .4,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: !1,
        constrainType: !1,
        constrainSize: !1,
        loadingIcon: !1,
        cursor: "default",
        responsive: !0,
        onComplete: w.noop,
        onZoomedImageLoaded: function() {},
        onImageSwap: w.noop,
        onImageSwapComplete: w.noop
    }, _ = "undefined" != typeof window ? window : this, T = function() {
        function e() {}
        var t = e.prototype;
        return t.on = function(e, t) {
            if (e && t) {
                var i = this._events = this._events || {},
                    n = i[e] = i[e] || [];
                return -1 == n.indexOf(t) && n.push(t), this
            }
        }, t.once = function(e, t) {
            if (e && t) {
                this.on(e, t);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[e] = i[e] || {})[t] = !0, this
            }
        }, t.off = function(e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = i.indexOf(t);
                return -1 != n && i.splice(n, 1), this
            }
        }, t.emitEvent = function(e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                i = i.slice(0), t = t || [];
                for (var n = this._onceEvents && this._onceEvents[e], s = 0; s < i.length; s++) {
                    var o = i[s];
                    n && n[o] && (this.off(e, o), delete n[o]), o.apply(this, t)
                }
                return this
            }
        }, t.allOff = function() {
            delete this._events, delete this._onceEvents
        }, e
    }, "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", T) : "object" == typeof module && module.exports ? module.exports = T() : _.EvEmitter = T(),
    function(t, i) {
        "use strict";
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(e) {
            return i(t, e)
        }) : "object" == typeof module && module.exports ? module.exports = i(t, require("ev-emitter")) : t.imagesLoaded = i(t, t.EvEmitter)
    }("undefined" != typeof window ? window : this, function(t, e) {
        function o(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }

        function r(e, t, i) {
            if (!(this instanceof r)) return new r(e, t, i);
            var n, s = e;
            return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = (n = s, Array.isArray(n) ? n : "object" == typeof n && "number" == typeof n.length ? d.call(n) : [n]), this.options = o({}, this.options), "function" == typeof t ? i = t : o(this.options, t), i && this.on("always", i), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(this.check.bind(this))) : void l.error("Bad element for imagesLoaded " + (s || e))
        }

        function i(e) {
            this.img = e
        }

        function n(e, t) {
            this.url = e, this.element = t, this.img = new Image
        }
        var a = t.jQuery,
            l = t.console,
            d = Array.prototype.slice;
        (r.prototype = Object.create(e.prototype)).options = {}, r.prototype.getImages = function() {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, r.prototype.addElementImages = function(e) {
            "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
            var t = e.nodeType;
            if (t && c[t]) {
                for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var s = i[n];
                    this.addImage(s)
                }
                if ("string" == typeof this.options.background) {
                    var o = e.querySelectorAll(this.options.background);
                    for (n = 0; n < o.length; n++) {
                        var r = o[n];
                        this.addElementBackgroundImages(r)
                    }
                }
            }
        };
        var c = {
            1: !0,
            9: !0,
            11: !0
        };
        return r.prototype.addElementBackgroundImages = function(e) {
            var t = getComputedStyle(e);
            if (t)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                    var s = n && n[2];
                    s && this.addBackground(s, e), n = i.exec(t.backgroundImage)
                }
        }, r.prototype.addImage = function(e) {
            var t = new i(e);
            this.images.push(t)
        }, r.prototype.addBackground = function(e, t) {
            var i = new n(e, t);
            this.images.push(i)
        }, r.prototype.check = function() {
            function t(e, t, i) {
                setTimeout(function() {
                    n.progress(e, t, i)
                })
            }
            var n = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
                e.once("progress", t), e.check()
            }) : void this.complete()
        }, r.prototype.progress = function(e, t, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, e, t)
        }, r.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this)
            }
        }, (i.prototype = Object.create(e.prototype)).check = function() {
            return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
        }, i.prototype.getIsImageComplete = function() {
            return this.img.complete && this.img.naturalWidth
        }, i.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
        }, i.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, i.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, i.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, i.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, (n.prototype = Object.create(i.prototype)).check = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, n.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, n.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
        }, r.makeJQueryPlugin = function(e) {
            (e = e || t.jQuery) && ((a = e).fn.imagesLoaded = function(e, t) {
                return new r(this, e, t).jqDeferred.promise(a(this))
            })
        }, r.makeJQueryPlugin(), r
    }), k = this, C = function(e, t, c) {
        "use strict";

        function n(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function r(e, t, i) {
            return t && n(e.prototype, t), i && n(e, i), e
        }

        function h() {
            return (h = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                }
                return e
            }).apply(this, arguments)
        }
        t = t && t.hasOwnProperty("default") ? t.default : t, c = c && c.hasOwnProperty("default") ? c.default : c;
        var s, i, o, a, l, d, u, p, m, f, g, v, y, w, b, _, T, k, C, S, z, x, E, D, I, A, W, L, F, H, $, O, P, M, R, j, N, B, Y, X, q, U, V, Q, K, Z, G, J, ee, te, ie, ne, se, oe, re, ae, le, de, ce, he, ue, pe, me, fe, ge, ve, ye, we, be, _e, Te, ke, Ce, Se, ze, xe, Ee, De, Ie, Ae, We, Le, Fe, He, $e, Oe, Pe, Me, Re, je, Ne, Be, Ye, Xe, qe, Ue, Ve, Qe, Ke, Ze, Ge, Je, et, tt, it, nt, st, ot, rt, at, lt, dt, ct, ht, ut, pt, mt, ft, gt, vt, yt, wt, bt, _t, Tt, kt, Ct, St, zt, xt, Et, Dt, It, At, Wt, Lt, Ft, Ht, $t, Ot, Pt, Mt, Rt = (Ot = t, Pt = !1, Mt = {
                TRANSITION_END: "bsTransitionEnd",
                getUID: function(e) {
                    for (; e += ~~(1e6 * Math.random()), document.getElementById(e););
                    return e
                },
                getSelectorFromElement: function(e) {
                    var t, i = e.getAttribute("data-target");
                    i && "#" !== i || (i = e.getAttribute("href") || ""), "#" === i.charAt(0) && (t = i, i = t = "function" == typeof Ot.escapeSelector ? Ot.escapeSelector(t).substr(1) : t.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
                    try {
                        return 0 < Ot(document).find(i).length ? i : null
                    } catch (e) {
                        return null
                    }
                },
                reflow: function(e) {
                    return e.offsetHeight
                },
                triggerTransitionEnd: function(e) {
                    Ot(e).trigger(Pt.end)
                },
                supportsTransitionEnd: function() {
                    return Boolean(Pt)
                },
                isElement: function(e) {
                    return (e[0] || e).nodeType
                },
                typeCheckConfig: function(e, t, i) {
                    for (var n in i)
                        if (Object.prototype.hasOwnProperty.call(i, n)) {
                            var s = i[n],
                                o = t[n],
                                r = o && Mt.isElement(o) ? "element" : (a = o, {}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                            if (!new RegExp(s).test(r)) throw new Error(e.toUpperCase() + ': Option "' + n + '" provided type "' + r + '" but expected type "' + s + '".')
                        }
                    var a
                }
            }, Pt = ("undefined" == typeof window || !window.QUnit) && {
                end: "transitionend"
            }, Ot.fn.emulateTransitionEnd = function(e) {
                var t = this,
                    i = !1;
                return Ot(this).one(Mt.TRANSITION_END, function() {
                    i = !0
                }), setTimeout(function() {
                    i || Mt.triggerTransitionEnd(t)
                }, e), this
            }, Mt.supportsTransitionEnd() && (Ot.event.special[Mt.TRANSITION_END] = {
                bindType: Pt.end,
                delegateType: Pt.end,
                handle: function(e) {
                    if (Ot(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }), Mt),
            jt = (i = "alert", a = "." + (o = "bs.alert"), l = (s = t).fn[i], d = {
                CLOSE: "close" + a,
                CLOSED: "closed" + a,
                CLICK_DATA_API: "click" + a + ".data-api"
            }, "alert", "fade", "show", u = function() {
                function n(e) {
                    this._element = e
                }
                var e = n.prototype;
                return e.close = function(e) {
                    e = e || this._element;
                    var t = this._getRootElement(e);
                    this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
                }, e.dispose = function() {
                    s.removeData(this._element, o), this._element = null
                }, e._getRootElement = function(e) {
                    var t = Rt.getSelectorFromElement(e),
                        i = !1;
                    return t && (i = s(t)[0]), i || (i = s(e).closest(".alert")[0]), i
                }, e._triggerCloseEvent = function(e) {
                    var t = s.Event(d.CLOSE);
                    return s(e).trigger(t), t
                }, e._removeElement = function(t) {
                    var i = this;
                    s(t).removeClass("show"), Rt.supportsTransitionEnd() && s(t).hasClass("fade") ? s(t).one(Rt.TRANSITION_END, function(e) {
                        return i._destroyElement(t, e)
                    }).emulateTransitionEnd(150) : this._destroyElement(t)
                }, e._destroyElement = function(e) {
                    s(e).detach().trigger(d.CLOSED).remove()
                }, n._jQueryInterface = function(i) {
                    return this.each(function() {
                        var e = s(this),
                            t = e.data(o);
                        t || (t = new n(this), e.data(o, t)), "close" === i && t[i](this)
                    })
                }, n._handleDismiss = function(t) {
                    return function(e) {
                        e && e.preventDefault(), t.close(this)
                    }
                }, r(n, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }]), n
            }(), s(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', u._handleDismiss(new u)), s.fn[i] = u._jQueryInterface, s.fn[i].Constructor = u, s.fn[i].noConflict = function() {
                return s.fn[i] = l, u._jQueryInterface
            }, u),
            Nt = (m = "button", g = "." + (f = "bs.button"), v = ".data-api", y = (p = t).fn[m], w = "active", "btn", b = '[data-toggle^="button"]', '[data-toggle="buttons"]', "input", ".active", ".btn", _ = {
                CLICK_DATA_API: "click" + g + v,
                FOCUS_BLUR_DATA_API: "focus" + g + v + " blur" + g + v
            }, T = function() {
                function i(e) {
                    this._element = e
                }
                var e = i.prototype;
                return e.toggle = function() {
                    var e = !0,
                        t = !0,
                        i = p(this._element).closest('[data-toggle="buttons"]')[0];
                    if (i) {
                        var n = p(this._element).find("input")[0];
                        if (n) {
                            if ("radio" === n.type)
                                if (n.checked && p(this._element).hasClass(w)) e = !1;
                                else {
                                    var s = p(i).find(".active")[0];
                                    s && p(s).removeClass(w)
                                }
                            if (e) {
                                if (n.hasAttribute("disabled") || i.hasAttribute("disabled") || n.classList.contains("disabled") || i.classList.contains("disabled")) return;
                                n.checked = !p(this._element).hasClass(w), p(n).trigger("change")
                            }
                            n.focus(), t = !1
                        }
                    }
                    t && this._element.setAttribute("aria-pressed", !p(this._element).hasClass(w)), e && p(this._element).toggleClass(w)
                }, e.dispose = function() {
                    p.removeData(this._element, f), this._element = null
                }, i._jQueryInterface = function(t) {
                    return this.each(function() {
                        var e = p(this).data(f);
                        e || (e = new i(this), p(this).data(f, e)), "toggle" === t && e[t]()
                    })
                }, r(i, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }]), i
            }(), p(document).on(_.CLICK_DATA_API, b, function(e) {
                e.preventDefault();
                var t = e.target;
                p(t).hasClass("btn") || (t = p(t).closest(".btn")), T._jQueryInterface.call(p(t), "toggle")
            }).on(_.FOCUS_BLUR_DATA_API, b, function(e) {
                var t = p(e.target).closest(".btn")[0];
                p(t).toggleClass("focus", /^focus(in)?$/.test(e.type))
            }), p.fn[m] = T._jQueryInterface, p.fn[m].Constructor = T, p.fn[m].noConflict = function() {
                return p.fn[m] = y, T._jQueryInterface
            }, T),
            Bt = (wt = "carousel", _t = "." + (bt = "bs.carousel"), Tt = (yt = t).fn[wt], kt = {
                interval: 5e3,
                keyboard: !0,
                slide: !1,
                pause: "hover",
                wrap: !0
            }, Ct = {
                interval: "(number|boolean)",
                keyboard: "boolean",
                slide: "(boolean|string)",
                pause: "(string|boolean)",
                wrap: "boolean"
            }, St = "next", zt = "prev", xt = {
                SLIDE: "slide" + _t,
                SLID: "slid" + _t,
                KEYDOWN: "keydown" + _t,
                MOUSEENTER: "mouseenter" + _t,
                MOUSELEAVE: "mouseleave" + _t,
                TOUCHEND: "touchend" + _t,
                LOAD_DATA_API: "load" + _t + ".data-api",
                CLICK_DATA_API: "click" + _t + ".data-api"
            }, Et = "active", Dt = ".active", It = ".active.carousel-item", At = ".carousel-item", Wt = ".carousel-item-next, .carousel-item-prev", Lt = ".carousel-indicators", Ft = "[data-slide], [data-slide-to]", Ht = '[data-ride="carousel"]', $t = function() {
                function o(e, t) {
                    this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(t), this._element = yt(e)[0], this._indicatorsElement = yt(this._element).find(Lt)[0], this._addEventListeners()
                }
                var e = o.prototype;
                return e.next = function() {
                    this._isSliding || this._slide(St)
                }, e.nextWhenVisible = function() {
                    !document.hidden && yt(this._element).is(":visible") && "hidden" !== yt(this._element).css("visibility") && this.next()
                }, e.prev = function() {
                    this._isSliding || this._slide(zt)
                }, e.pause = function(e) {
                    e || (this._isPaused = !0), yt(this._element).find(Wt)[0] && Rt.supportsTransitionEnd() && (Rt.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                }, e.cycle = function(e) {
                    e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                }, e.to = function(e) {
                    var t = this;
                    this._activeElement = yt(this._element).find(It)[0];
                    var i = this._getItemIndex(this._activeElement);
                    if (!(e > this._items.length - 1 || e < 0))
                        if (this._isSliding) yt(this._element).one(xt.SLID, function() {
                            return t.to(e)
                        });
                        else {
                            if (i === e) return this.pause(), void this.cycle();
                            var n = i < e ? St : zt;
                            this._slide(n, this._items[e])
                        }
                }, e.dispose = function() {
                    yt(this._element).off(_t), yt.removeData(this._element, bt), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                }, e._getConfig = function(e) {
                    return e = h({}, kt, e), Rt.typeCheckConfig(wt, e, Ct), e
                }, e._addEventListeners = function() {
                    var t = this;
                    this._config.keyboard && yt(this._element).on(xt.KEYDOWN, function(e) {
                        return t._keydown(e)
                    }), "hover" === this._config.pause && (yt(this._element).on(xt.MOUSEENTER, function(e) {
                        return t.pause(e)
                    }).on(xt.MOUSELEAVE, function(e) {
                        return t.cycle(e)
                    }), "ontouchstart" in document.documentElement && yt(this._element).on(xt.TOUCHEND, function() {
                        t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function(e) {
                            return t.cycle(e)
                        }, 500 + t._config.interval)
                    }))
                }, e._keydown = function(e) {
                    if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                        case 37:
                            e.preventDefault(), this.prev();
                            break;
                        case 39:
                            e.preventDefault(), this.next()
                    }
                }, e._getItemIndex = function(e) {
                    return this._items = yt.makeArray(yt(e).parent().find(At)), this._items.indexOf(e)
                }, e._getItemByDirection = function(e, t) {
                    var i = e === St,
                        n = e === zt,
                        s = this._getItemIndex(t),
                        o = this._items.length - 1;
                    if ((n && 0 === s || i && s === o) && !this._config.wrap) return t;
                    var r = (s + (e === zt ? -1 : 1)) % this._items.length;
                    return -1 === r ? this._items[this._items.length - 1] : this._items[r]
                }, e._triggerSlideEvent = function(e, t) {
                    var i = this._getItemIndex(e),
                        n = this._getItemIndex(yt(this._element).find(It)[0]),
                        s = yt.Event(xt.SLIDE, {
                            relatedTarget: e,
                            direction: t,
                            from: n,
                            to: i
                        });
                    return yt(this._element).trigger(s), s
                }, e._setActiveIndicatorElement = function(e) {
                    if (this._indicatorsElement) {
                        yt(this._indicatorsElement).find(Dt).removeClass(Et);
                        var t = this._indicatorsElement.children[this._getItemIndex(e)];
                        t && yt(t).addClass(Et)
                    }
                }, e._slide = function(e, t) {
                    var i, n, s, o = this,
                        r = yt(this._element).find(It)[0],
                        a = this._getItemIndex(r),
                        l = t || r && this._getItemByDirection(e, r),
                        d = this._getItemIndex(l),
                        c = Boolean(this._interval);
                    if (s = e === St ? (i = "carousel-item-left", n = "carousel-item-next", "left") : (i = "carousel-item-right", n = "carousel-item-prev", "right"), l && yt(l).hasClass(Et)) this._isSliding = !1;
                    else if (!this._triggerSlideEvent(l, s).isDefaultPrevented() && r && l) {
                        this._isSliding = !0, c && this.pause(), this._setActiveIndicatorElement(l);
                        var h = yt.Event(xt.SLID, {
                            relatedTarget: l,
                            direction: s,
                            from: a,
                            to: d
                        });
                        Rt.supportsTransitionEnd() && yt(this._element).hasClass("slide") ? (yt(l).addClass(n), Rt.reflow(l), yt(r).addClass(i), yt(l).addClass(i), yt(r).one(Rt.TRANSITION_END, function() {
                            yt(l).removeClass(i + " " + n).addClass(Et), yt(r).removeClass(Et + " " + n + " " + i), o._isSliding = !1, setTimeout(function() {
                                return yt(o._element).trigger(h)
                            }, 0)
                        }).emulateTransitionEnd(600)) : (yt(r).removeClass(Et), yt(l).addClass(Et), this._isSliding = !1, yt(this._element).trigger(h)), c && this.cycle()
                    }
                }, o._jQueryInterface = function(n) {
                    return this.each(function() {
                        var e = yt(this).data(bt),
                            t = h({}, kt, yt(this).data());
                        "object" == typeof n && (t = h({}, t, n));
                        var i = "string" == typeof n ? n : t.slide;
                        if (e || (e = new o(this, t), yt(this).data(bt, e)), "number" == typeof n) e.to(n);
                        else if ("string" == typeof i) {
                            if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                            e[i]()
                        } else t.interval && (e.pause(), e.cycle())
                    })
                }, o._dataApiClickHandler = function(e) {
                    var t = Rt.getSelectorFromElement(this);
                    if (t) {
                        var i = yt(t)[0];
                        if (i && yt(i).hasClass("carousel")) {
                            var n = h({}, yt(i).data(), yt(this).data()),
                                s = this.getAttribute("data-slide-to");
                            s && (n.interval = !1), o._jQueryInterface.call(yt(i), n), s && yt(i).data(bt).to(s), e.preventDefault()
                        }
                    }
                }, r(o, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return kt
                    }
                }]), o
            }(), yt(document).on(xt.CLICK_DATA_API, Ft, $t._dataApiClickHandler), yt(window).on(xt.LOAD_DATA_API, function() {
                yt(Ht).each(function() {
                    var e = yt(this);
                    $t._jQueryInterface.call(e, e.data())
                })
            }), yt.fn[wt] = $t._jQueryInterface, yt.fn[wt].Constructor = $t, yt.fn[wt].noConflict = function() {
                return yt.fn[wt] = Tt, $t._jQueryInterface
            }, $t),
            Yt = (st = "collapse", rt = "." + (ot = "bs.collapse"), at = (nt = t).fn[st], lt = {
                toggle: !0,
                parent: ""
            }, dt = {
                toggle: "boolean",
                parent: "(string|element)"
            }, ct = {
                SHOW: "show" + rt,
                SHOWN: "shown" + rt,
                HIDE: "hide" + rt,
                HIDDEN: "hidden" + rt,
                CLICK_DATA_API: "click" + rt + ".data-api"
            }, ht = "show", ut = "collapse", pt = "collapsing", mt = "collapsed", ft = ".show, .collapsing", gt = '[data-toggle="collapse"]', vt = function() {
                function a(e, t) {
                    this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = nt.makeArray(nt('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                    for (var i = nt(gt), n = 0; n < i.length; n++) {
                        var s = i[n],
                            o = Rt.getSelectorFromElement(s);
                        null !== o && 0 < nt(o).filter(e).length && (this._selector = o, this._triggerArray.push(s))
                    }
                    this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                }
                var e = a.prototype;
                return e.toggle = function() {
                    nt(this._element).hasClass(ht) ? this.hide() : this.show()
                }, e.show = function() {
                    var e, t, i = this;
                    if (!(this._isTransitioning || nt(this._element).hasClass(ht) || (this._parent && 0 === (e = nt.makeArray(nt(this._parent).find(ft).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), e && (t = nt(e).not(this._selector).data(ot)) && t._isTransitioning))) {
                        var n = nt.Event(ct.SHOW);
                        if (nt(this._element).trigger(n), !n.isDefaultPrevented()) {
                            e && (a._jQueryInterface.call(nt(e).not(this._selector), "hide"), t || nt(e).data(ot, null));
                            var s = this._getDimension();
                            nt(this._element).removeClass(ut).addClass(pt), (this._element.style[s] = 0) < this._triggerArray.length && nt(this._triggerArray).removeClass(mt).attr("aria-expanded", !0), this.setTransitioning(!0);
                            var o = function() {
                                nt(i._element).removeClass(pt).addClass(ut).addClass(ht), i._element.style[s] = "", i.setTransitioning(!1), nt(i._element).trigger(ct.SHOWN)
                            };
                            if (Rt.supportsTransitionEnd()) {
                                var r = "scroll" + (s[0].toUpperCase() + s.slice(1));
                                nt(this._element).one(Rt.TRANSITION_END, o).emulateTransitionEnd(600), this._element.style[s] = this._element[r] + "px"
                            } else o()
                        }
                    }
                }, e.hide = function() {
                    var e = this;
                    if (!this._isTransitioning && nt(this._element).hasClass(ht)) {
                        var t = nt.Event(ct.HIDE);
                        if (nt(this._element).trigger(t), !t.isDefaultPrevented()) {
                            var i = this._getDimension();
                            if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", Rt.reflow(this._element), nt(this._element).addClass(pt).removeClass(ut).removeClass(ht), 0 < this._triggerArray.length)
                                for (var n = 0; n < this._triggerArray.length; n++) {
                                    var s = this._triggerArray[n],
                                        o = Rt.getSelectorFromElement(s);
                                    null !== o && (nt(o).hasClass(ht) || nt(s).addClass(mt).attr("aria-expanded", !1))
                                }
                            this.setTransitioning(!0);
                            var r = function() {
                                e.setTransitioning(!1), nt(e._element).removeClass(pt).addClass(ut).trigger(ct.HIDDEN)
                            };
                            this._element.style[i] = "", Rt.supportsTransitionEnd() ? nt(this._element).one(Rt.TRANSITION_END, r).emulateTransitionEnd(600) : r()
                        }
                    }
                }, e.setTransitioning = function(e) {
                    this._isTransitioning = e
                }, e.dispose = function() {
                    nt.removeData(this._element, ot), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                }, e._getConfig = function(e) {
                    return (e = h({}, lt, e)).toggle = Boolean(e.toggle), Rt.typeCheckConfig(st, e, dt), e
                }, e._getDimension = function() {
                    return nt(this._element).hasClass("width") ? "width" : "height"
                }, e._getParent = function() {
                    var i = this,
                        e = null;
                    Rt.isElement(this._config.parent) ? (e = this._config.parent, void 0 !== this._config.parent.jquery && (e = this._config.parent[0])) : e = nt(this._config.parent)[0];
                    var t = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                    return nt(e).find(t).each(function(e, t) {
                        i._addAriaAndCollapsedClass(a._getTargetFromElement(t), [t])
                    }), e
                }, e._addAriaAndCollapsedClass = function(e, t) {
                    if (e) {
                        var i = nt(e).hasClass(ht);
                        0 < t.length && nt(t).toggleClass(mt, !i).attr("aria-expanded", i)
                    }
                }, a._getTargetFromElement = function(e) {
                    var t = Rt.getSelectorFromElement(e);
                    return t ? nt(t)[0] : null
                }, a._jQueryInterface = function(n) {
                    return this.each(function() {
                        var e = nt(this),
                            t = e.data(ot),
                            i = h({}, lt, e.data(), "object" == typeof n && n);
                        if (!t && i.toggle && /show|hide/.test(n) && (i.toggle = !1), t || (t = new a(this, i), e.data(ot, t)), "string" == typeof n) {
                            if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                            t[n]()
                        }
                    })
                }, r(a, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return lt
                    }
                }]), a
            }(), nt(document).on(ct.CLICK_DATA_API, gt, function(e) {
                "A" === e.currentTarget.tagName && e.preventDefault();
                var i = nt(this),
                    t = Rt.getSelectorFromElement(this);
                nt(t).each(function() {
                    var e = nt(this),
                        t = e.data(ot) ? "toggle" : i.data();
                    vt._jQueryInterface.call(e, t)
                })
            }), nt.fn[st] = vt._jQueryInterface, nt.fn[st].Constructor = vt, nt.fn[st].noConflict = function() {
                return nt.fn[st] = at, vt._jQueryInterface
            }, vt),
            Xt = (Ne = "dropdown", Ye = "." + (Be = "bs.dropdown"), Xe = ".data-api", qe = (je = t).fn[Ne], Ue = new RegExp("38|40|27"), Ve = {
                HIDE: "hide" + Ye,
                HIDDEN: "hidden" + Ye,
                SHOW: "show" + Ye,
                SHOWN: "shown" + Ye,
                CLICK: "click" + Ye,
                CLICK_DATA_API: "click" + Ye + Xe,
                KEYDOWN_DATA_API: "keydown" + Ye + Xe,
                KEYUP_DATA_API: "keyup" + Ye + Xe
            }, Qe = "disabled", Ke = "show", Ze = "dropdown-menu-right", Ge = '[data-toggle="dropdown"]', Je = ".dropdown-menu", et = {
                offset: 0,
                flip: !0,
                boundary: "scrollParent"
            }, tt = {
                offset: "(number|string|function)",
                flip: "boolean",
                boundary: "(string|element)"
            }, it = function() {
                function l(e, t) {
                    this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                }
                var e = l.prototype;
                return e.toggle = function() {
                    if (!this._element.disabled && !je(this._element).hasClass(Qe)) {
                        var e = l._getParentFromElement(this._element),
                            t = je(this._menu).hasClass(Ke);
                        if (l._clearMenus(), !t) {
                            var i = {
                                    relatedTarget: this._element
                                },
                                n = je.Event(Ve.SHOW, i);
                            if (je(e).trigger(n), !n.isDefaultPrevented()) {
                                if (!this._inNavbar) {
                                    if (void 0 === c) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                    var s = this._element;
                                    je(e).hasClass("dropup") && (je(this._menu).hasClass("dropdown-menu-left") || je(this._menu).hasClass(Ze)) && (s = e), "scrollParent" !== this._config.boundary && je(e).addClass("position-static"), this._popper = new c(s, this._menu, this._getPopperConfig())
                                }
                                "ontouchstart" in document.documentElement && 0 === je(e).closest(".navbar-nav").length && je("body").children().on("mouseover", null, je.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), je(this._menu).toggleClass(Ke), je(e).toggleClass(Ke).trigger(je.Event(Ve.SHOWN, i))
                            }
                        }
                    }
                }, e.dispose = function() {
                    je.removeData(this._element, Be), je(this._element).off(Ye), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
                }, e.update = function() {
                    this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                }, e._addEventListeners = function() {
                    var t = this;
                    je(this._element).on(Ve.CLICK, function(e) {
                        e.preventDefault(), e.stopPropagation(), t.toggle()
                    })
                }, e._getConfig = function(e) {
                    return e = h({}, this.constructor.Default, je(this._element).data(), e), Rt.typeCheckConfig(Ne, e, this.constructor.DefaultType), e
                }, e._getMenuElement = function() {
                    if (!this._menu) {
                        var e = l._getParentFromElement(this._element);
                        this._menu = je(e).find(Je)[0]
                    }
                    return this._menu
                }, e._getPlacement = function() {
                    var e = je(this._element).parent(),
                        t = "bottom-start";
                    return e.hasClass("dropup") ? (t = "top-start", je(this._menu).hasClass(Ze) && (t = "top-end")) : e.hasClass("dropright") ? t = "right-start" : e.hasClass("dropleft") ? t = "left-start" : je(this._menu).hasClass(Ze) && (t = "bottom-end"), t
                }, e._detectNavbar = function() {
                    return 0 < je(this._element).closest(".navbar").length
                }, e._getPopperConfig = function() {
                    var t = this,
                        e = {};
                    return "function" == typeof this._config.offset ? e.fn = function(e) {
                        return e.offsets = h({}, e.offsets, t._config.offset(e.offsets) || {}), e
                    } : e.offset = this._config.offset, {
                        placement: this._getPlacement(),
                        modifiers: {
                            offset: e,
                            flip: {
                                enabled: this._config.flip
                            },
                            preventOverflow: {
                                boundariesElement: this._config.boundary
                            }
                        }
                    }
                }, l._jQueryInterface = function(t) {
                    return this.each(function() {
                        var e = je(this).data(Be);
                        if (e || (e = new l(this, "object" == typeof t ? t : null), je(this).data(Be, e)), "string" == typeof t) {
                            if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');
                            e[t]()
                        }
                    })
                }, l._clearMenus = function(e) {
                    if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                        for (var t = je.makeArray(je(Ge)), i = 0; i < t.length; i++) {
                            var n = l._getParentFromElement(t[i]),
                                s = je(t[i]).data(Be),
                                o = {
                                    relatedTarget: t[i]
                                };
                            if (s) {
                                var r = s._menu;
                                if (je(n).hasClass(Ke) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && je.contains(n, e.target))) {
                                    var a = je.Event(Ve.HIDE, o);
                                    je(n).trigger(a), a.isDefaultPrevented() || ("ontouchstart" in document.documentElement && je("body").children().off("mouseover", null, je.noop), t[i].setAttribute("aria-expanded", "false"), je(r).removeClass(Ke), je(n).removeClass(Ke).trigger(je.Event(Ve.HIDDEN, o)))
                                }
                            }
                        }
                }, l._getParentFromElement = function(e) {
                    var t, i = Rt.getSelectorFromElement(e);
                    return i && (t = je(i)[0]), t || e.parentNode
                }, l._dataApiKeydownHandler = function(e) {
                    if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || je(e.target).closest(Je).length)) : Ue.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !je(this).hasClass(Qe))) {
                        var t = l._getParentFromElement(this),
                            i = je(t).hasClass(Ke);
                        if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
                            var n = je(t).find(".dropdown-menu .dropdown-item:not(.disabled)").get();
                            if (0 !== n.length) {
                                var s = n.indexOf(e.target);
                                38 === e.which && 0 < s && s--, 40 === e.which && s < n.length - 1 && s++, s < 0 && (s = 0), n[s].focus()
                            }
                        } else {
                            if (27 === e.which) {
                                var o = je(t).find(Ge)[0];
                                je(o).trigger("focus")
                            }
                            je(this).trigger("click")
                        }
                    }
                }, r(l, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return et
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return tt
                    }
                }]), l
            }(), je(document).on(Ve.KEYDOWN_DATA_API, Ge, it._dataApiKeydownHandler).on(Ve.KEYDOWN_DATA_API, Je, it._dataApiKeydownHandler).on(Ve.CLICK_DATA_API + " " + Ve.KEYUP_DATA_API, it._clearMenus).on(Ve.CLICK_DATA_API, Ge, function(e) {
                e.preventDefault(), e.stopPropagation(), it._jQueryInterface.call(je(this), "toggle")
            }).on(Ve.CLICK_DATA_API, ".dropdown form", function(e) {
                e.stopPropagation()
            }), je.fn[Ne] = it._jQueryInterface, je.fn[Ne].Constructor = it, je.fn[Ne].noConflict = function() {
                return je.fn[Ne] = qe, it._jQueryInterface
            }, it),
            qt = (ze = "." + (Se = "bs.modal"), xe = (Ce = t).fn.modal, Ee = {
                backdrop: !0,
                keyboard: !0,
                focus: !0,
                show: !0
            }, De = {
                backdrop: "(boolean|string)",
                keyboard: "boolean",
                focus: "boolean",
                show: "boolean"
            }, Ie = {
                HIDE: "hide" + ze,
                HIDDEN: "hidden" + ze,
                SHOW: "show" + ze,
                SHOWN: "shown" + ze,
                FOCUSIN: "focusin" + ze,
                RESIZE: "resize" + ze,
                CLICK_DISMISS: "click.dismiss" + ze,
                KEYDOWN_DISMISS: "keydown.dismiss" + ze,
                MOUSEUP_DISMISS: "mouseup.dismiss" + ze,
                MOUSEDOWN_DISMISS: "mousedown.dismiss" + ze,
                CLICK_DATA_API: "click" + ze + ".data-api"
            }, Ae = "modal-open", We = "fade", Le = "show", Fe = ".modal-dialog", He = '[data-toggle="modal"]', $e = '[data-dismiss="modal"]', Oe = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Pe = ".sticky-top", Me = ".navbar-toggler", Re = function() {
                function s(e, t) {
                    this._config = this._getConfig(t), this._element = e, this._dialog = Ce(e).find(Fe)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                }
                var e = s.prototype;
                return e.toggle = function(e) {
                    return this._isShown ? this.hide() : this.show(e)
                }, e.show = function(e) {
                    var t = this;
                    if (!this._isTransitioning && !this._isShown) {
                        Rt.supportsTransitionEnd() && Ce(this._element).hasClass(We) && (this._isTransitioning = !0);
                        var i = Ce.Event(Ie.SHOW, {
                            relatedTarget: e
                        });
                        Ce(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), Ce(document.body).addClass(Ae), this._setEscapeEvent(), this._setResizeEvent(), Ce(this._element).on(Ie.CLICK_DISMISS, $e, function(e) {
                            return t.hide(e)
                        }), Ce(this._dialog).on(Ie.MOUSEDOWN_DISMISS, function() {
                            Ce(t._element).one(Ie.MOUSEUP_DISMISS, function(e) {
                                Ce(e.target).is(t._element) && (t._ignoreBackdropClick = !0)
                            })
                        }), this._showBackdrop(function() {
                            return t._showElement(e)
                        }))
                    }
                }, e.hide = function(e) {
                    var t = this;
                    if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                        var i = Ce.Event(Ie.HIDE);
                        if (Ce(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                            this._isShown = !1;
                            var n = Rt.supportsTransitionEnd() && Ce(this._element).hasClass(We);
                            n && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), Ce(document).off(Ie.FOCUSIN), Ce(this._element).removeClass(Le), Ce(this._element).off(Ie.CLICK_DISMISS), Ce(this._dialog).off(Ie.MOUSEDOWN_DISMISS), n ? Ce(this._element).one(Rt.TRANSITION_END, function(e) {
                                return t._hideModal(e)
                            }).emulateTransitionEnd(300) : this._hideModal()
                        }
                    }
                }, e.dispose = function() {
                    Ce.removeData(this._element, Se), Ce(window, document, this._element, this._backdrop).off(ze), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                }, e.handleUpdate = function() {
                    this._adjustDialog()
                }, e._getConfig = function(e) {
                    return e = h({}, Ee, e), Rt.typeCheckConfig("modal", e, De), e
                }, e._showElement = function(e) {
                    var t = this,
                        i = Rt.supportsTransitionEnd() && Ce(this._element).hasClass(We);
                    this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && Rt.reflow(this._element), Ce(this._element).addClass(Le), this._config.focus && this._enforceFocus();
                    var n = Ce.Event(Ie.SHOWN, {
                            relatedTarget: e
                        }),
                        s = function() {
                            t._config.focus && t._element.focus(), t._isTransitioning = !1, Ce(t._element).trigger(n)
                        };
                    i ? Ce(this._dialog).one(Rt.TRANSITION_END, s).emulateTransitionEnd(300) : s()
                }, e._enforceFocus = function() {
                    var t = this;
                    Ce(document).off(Ie.FOCUSIN).on(Ie.FOCUSIN, function(e) {
                        document !== e.target && t._element !== e.target && 0 === Ce(t._element).has(e.target).length && t._element.focus()
                    })
                }, e._setEscapeEvent = function() {
                    var t = this;
                    this._isShown && this._config.keyboard ? Ce(this._element).on(Ie.KEYDOWN_DISMISS, function(e) {
                        27 === e.which && (e.preventDefault(), t.hide())
                    }) : this._isShown || Ce(this._element).off(Ie.KEYDOWN_DISMISS)
                }, e._setResizeEvent = function() {
                    var t = this;
                    this._isShown ? Ce(window).on(Ie.RESIZE, function(e) {
                        return t.handleUpdate(e)
                    }) : Ce(window).off(Ie.RESIZE)
                }, e._hideModal = function() {
                    var e = this;
                    this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                        Ce(document.body).removeClass(Ae), e._resetAdjustments(), e._resetScrollbar(), Ce(e._element).trigger(Ie.HIDDEN)
                    })
                }, e._removeBackdrop = function() {
                    this._backdrop && (Ce(this._backdrop).remove(), this._backdrop = null)
                }, e._showBackdrop = function(e) {
                    var t = this,
                        i = Ce(this._element).hasClass(We) ? We : "";
                    if (this._isShown && this._config.backdrop) {
                        var n = Rt.supportsTransitionEnd() && i;
                        if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", i && Ce(this._backdrop).addClass(i), Ce(this._backdrop).appendTo(document.body), Ce(this._element).on(Ie.CLICK_DISMISS, function(e) {
                                t._ignoreBackdropClick ? t._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === t._config.backdrop ? t._element.focus() : t.hide())
                            }), n && Rt.reflow(this._backdrop), Ce(this._backdrop).addClass(Le), !e) return;
                        if (!n) return void e();
                        Ce(this._backdrop).one(Rt.TRANSITION_END, e).emulateTransitionEnd(150)
                    } else if (!this._isShown && this._backdrop) {
                        Ce(this._backdrop).removeClass(Le);
                        var s = function() {
                            t._removeBackdrop(), e && e()
                        };
                        Rt.supportsTransitionEnd() && Ce(this._element).hasClass(We) ? Ce(this._backdrop).one(Rt.TRANSITION_END, s).emulateTransitionEnd(150) : s()
                    } else e && e()
                }, e._adjustDialog = function() {
                    var e = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                }, e._resetAdjustments = function() {
                    this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                }, e._checkScrollbar = function() {
                    var e = document.body.getBoundingClientRect();
                    this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                }, e._setScrollbar = function() {
                    var s = this;
                    if (this._isBodyOverflowing) {
                        Ce(Oe).each(function(e, t) {
                            var i = Ce(t)[0].style.paddingRight,
                                n = Ce(t).css("padding-right");
                            Ce(t).data("padding-right", i).css("padding-right", parseFloat(n) + s._scrollbarWidth + "px")
                        }), Ce(Pe).each(function(e, t) {
                            var i = Ce(t)[0].style.marginRight,
                                n = Ce(t).css("margin-right");
                            Ce(t).data("margin-right", i).css("margin-right", parseFloat(n) - s._scrollbarWidth + "px")
                        }), Ce(Me).each(function(e, t) {
                            var i = Ce(t)[0].style.marginRight,
                                n = Ce(t).css("margin-right");
                            Ce(t).data("margin-right", i).css("margin-right", parseFloat(n) + s._scrollbarWidth + "px")
                        });
                        var e = document.body.style.paddingRight,
                            t = Ce("body").css("padding-right");
                        Ce("body").data("padding-right", e).css("padding-right", parseFloat(t) + this._scrollbarWidth + "px")
                    }
                }, e._resetScrollbar = function() {
                    Ce(Oe).each(function(e, t) {
                        var i = Ce(t).data("padding-right");
                        void 0 !== i && Ce(t).css("padding-right", i).removeData("padding-right")
                    }), Ce(Pe + ", " + Me).each(function(e, t) {
                        var i = Ce(t).data("margin-right");
                        void 0 !== i && Ce(t).css("margin-right", i).removeData("margin-right")
                    });
                    var e = Ce("body").data("padding-right");
                    void 0 !== e && Ce("body").css("padding-right", e).removeData("padding-right")
                }, e._getScrollbarWidth = function() {
                    var e = document.createElement("div");
                    e.className = "modal-scrollbar-measure", document.body.appendChild(e);
                    var t = e.getBoundingClientRect().width - e.clientWidth;
                    return document.body.removeChild(e), t
                }, s._jQueryInterface = function(i, n) {
                    return this.each(function() {
                        var e = Ce(this).data(Se),
                            t = h({}, s.Default, Ce(this).data(), "object" == typeof i && i);
                        if (e || (e = new s(this, t), Ce(this).data(Se, e)), "string" == typeof i) {
                            if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                            e[i](n)
                        } else t.show && e.show(n)
                    })
                }, r(s, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return Ee
                    }
                }]), s
            }(), Ce(document).on(Ie.CLICK_DATA_API, He, function(e) {
                var t, i = this,
                    n = Rt.getSelectorFromElement(this);
                n && (t = Ce(n)[0]);
                var s = Ce(t).data(Se) ? "toggle" : h({}, Ce(t).data(), Ce(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
                var o = Ce(t).one(Ie.SHOW, function(e) {
                    e.isDefaultPrevented() || o.one(Ie.HIDDEN, function() {
                        Ce(i).is(":visible") && i.focus()
                    })
                });
                Re._jQueryInterface.call(Ce(t), s, this)
            }), Ce.fn.modal = Re._jQueryInterface, Ce.fn.modal.Constructor = Re, Ce.fn.modal.noConflict = function() {
                return Ce.fn.modal = xe, Re._jQueryInterface
            }, Re),
            Ut = (de = "tooltip", he = "." + (ce = "bs.tooltip"), ue = (le = t).fn[de], pe = new RegExp("(^|\\s)bs-tooltip\\S+", "g"), ge = {
                animation: !0,
                template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !(fe = {
                    AUTO: "auto",
                    TOP: "top",
                    RIGHT: "right",
                    BOTTOM: "bottom",
                    LEFT: "left"
                }),
                selector: !(me = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "(number|string)",
                    container: "(string|element|boolean)",
                    fallbackPlacement: "(string|array)",
                    boundary: "(string|element)"
                }),
                placement: "top",
                offset: 0,
                container: !1,
                fallbackPlacement: "flip",
                boundary: "scrollParent"
            }, ye = {
                HIDE: "hide" + he,
                HIDDEN: "hidden" + he,
                SHOW: (ve = "show") + he,
                SHOWN: "shown" + he,
                INSERTED: "inserted" + he,
                CLICK: "click" + he,
                FOCUSIN: "focusin" + he,
                FOCUSOUT: "focusout" + he,
                MOUSEENTER: "mouseenter" + he,
                MOUSELEAVE: "mouseleave" + he
            }, we = "fade", be = "show", _e = "hover", Te = "focus", ke = function() {
                function d(e, t) {
                    if (void 0 === c) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                    this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
                }
                var e = d.prototype;
                return e.enable = function() {
                    this._isEnabled = !0
                }, e.disable = function() {
                    this._isEnabled = !1
                }, e.toggleEnabled = function() {
                    this._isEnabled = !this._isEnabled
                }, e.toggle = function(e) {
                    if (this._isEnabled)
                        if (e) {
                            var t = this.constructor.DATA_KEY,
                                i = le(e.currentTarget).data(t);
                            i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), le(e.currentTarget).data(t, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                        } else {
                            if (le(this.getTipElement()).hasClass(be)) return void this._leave(null, this);
                            this._enter(null, this)
                        }
                }, e.dispose = function() {
                    clearTimeout(this._timeout), le.removeData(this.element, this.constructor.DATA_KEY), le(this.element).off(this.constructor.EVENT_KEY), le(this.element).closest(".modal").off("hide.bs.modal"), this.tip && le(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                }, e.show = function() {
                    var t = this;
                    if ("none" === le(this.element).css("display")) throw new Error("Please use show on visible elements");
                    var e = le.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        le(this.element).trigger(e);
                        var i = le.contains(this.element.ownerDocument.documentElement, this.element);
                        if (e.isDefaultPrevented() || !i) return;
                        var n = this.getTipElement(),
                            s = Rt.getUID(this.constructor.NAME);
                        n.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && le(n).addClass(we);
                        var o = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement,
                            r = this._getAttachment(o);
                        this.addAttachmentClass(r);
                        var a = !1 === this.config.container ? document.body : le(this.config.container);
                        le(n).data(this.constructor.DATA_KEY, this), le.contains(this.element.ownerDocument.documentElement, this.tip) || le(n).appendTo(a), le(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new c(this.element, n, {
                            placement: r,
                            modifiers: {
                                offset: {
                                    offset: this.config.offset
                                },
                                flip: {
                                    behavior: this.config.fallbackPlacement
                                },
                                arrow: {
                                    element: ".arrow"
                                },
                                preventOverflow: {
                                    boundariesElement: this.config.boundary
                                }
                            },
                            onCreate: function(e) {
                                e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                            },
                            onUpdate: function(e) {
                                t._handlePopperPlacementChange(e)
                            }
                        }), le(n).addClass(be), "ontouchstart" in document.documentElement && le("body").children().on("mouseover", null, le.noop);
                        var l = function() {
                            t.config.animation && t._fixTransition();
                            var e = t._hoverState;
                            t._hoverState = null, le(t.element).trigger(t.constructor.Event.SHOWN), "out" === e && t._leave(null, t)
                        };
                        Rt.supportsTransitionEnd() && le(this.tip).hasClass(we) ? le(this.tip).one(Rt.TRANSITION_END, l).emulateTransitionEnd(d._TRANSITION_DURATION) : l()
                    }
                }, e.hide = function(e) {
                    var t = this,
                        i = this.getTipElement(),
                        n = le.Event(this.constructor.Event.HIDE),
                        s = function() {
                            t._hoverState !== ve && i.parentNode && i.parentNode.removeChild(i), t._cleanTipClass(), t.element.removeAttribute("aria-describedby"), le(t.element).trigger(t.constructor.Event.HIDDEN), null !== t._popper && t._popper.destroy(), e && e()
                        };
                    le(this.element).trigger(n), n.isDefaultPrevented() || (le(i).removeClass(be), "ontouchstart" in document.documentElement && le("body").children().off("mouseover", null, le.noop), this._activeTrigger.click = !1, this._activeTrigger[Te] = !1, this._activeTrigger[_e] = !1, Rt.supportsTransitionEnd() && le(this.tip).hasClass(we) ? le(i).one(Rt.TRANSITION_END, s).emulateTransitionEnd(150) : s(), this._hoverState = "")
                }, e.update = function() {
                    null !== this._popper && this._popper.scheduleUpdate()
                }, e.isWithContent = function() {
                    return Boolean(this.getTitle())
                }, e.addAttachmentClass = function(e) {
                    le(this.getTipElement()).addClass("bs-tooltip-" + e)
                }, e.getTipElement = function() {
                    return this.tip = this.tip || le(this.config.template)[0], this.tip
                }, e.setContent = function() {
                    var e = le(this.getTipElement());
                    this.setElementContent(e.find(".tooltip-inner"), this.getTitle()), e.removeClass(we + " " + be)
                }, e.setElementContent = function(e, t) {
                    var i = this.config.html;
                    "object" == typeof t && (t.nodeType || t.jquery) ? i ? le(t).parent().is(e) || e.empty().append(t) : e.text(le(t).text()) : e[i ? "html" : "text"](t)
                }, e.getTitle = function() {
                    var e = this.element.getAttribute("data-original-title");
                    return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
                }, e._getAttachment = function(e) {
                    return fe[e.toUpperCase()]
                }, e._setListeners = function() {
                    var n = this;
                    this.config.trigger.split(" ").forEach(function(e) {
                        if ("click" === e) le(n.element).on(n.constructor.Event.CLICK, n.config.selector, function(e) {
                            return n.toggle(e)
                        });
                        else if ("manual" !== e) {
                            var t = e === _e ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN,
                                i = e === _e ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT;
                            le(n.element).on(t, n.config.selector, function(e) {
                                return n._enter(e)
                            }).on(i, n.config.selector, function(e) {
                                return n._leave(e)
                            })
                        }
                        le(n.element).closest(".modal").on("hide.bs.modal", function() {
                            return n.hide()
                        })
                    }), this.config.selector ? this.config = h({}, this.config, {
                        trigger: "manual",
                        selector: ""
                    }) : this._fixTitle()
                }, e._fixTitle = function() {
                    var e = typeof this.element.getAttribute("data-original-title");
                    (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                }, e._enter = function(e, t) {
                    var i = this.constructor.DATA_KEY;
                    (t = t || le(e.currentTarget).data(i)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), le(e.currentTarget).data(i, t)), e && (t._activeTrigger["focusin" === e.type ? Te : _e] = !0), le(t.getTipElement()).hasClass(be) || t._hoverState === ve ? t._hoverState = ve : (clearTimeout(t._timeout), t._hoverState = ve, t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function() {
                        t._hoverState === ve && t.show()
                    }, t.config.delay.show) : t.show())
                }, e._leave = function(e, t) {
                    var i = this.constructor.DATA_KEY;
                    (t = t || le(e.currentTarget).data(i)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), le(e.currentTarget).data(i, t)), e && (t._activeTrigger["focusout" === e.type ? Te : _e] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = "out", t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function() {
                        "out" === t._hoverState && t.hide()
                    }, t.config.delay.hide) : t.hide())
                }, e._isWithActiveTrigger = function() {
                    for (var e in this._activeTrigger)
                        if (this._activeTrigger[e]) return !0;
                    return !1
                }, e._getConfig = function(e) {
                    return "number" == typeof(e = h({}, this.constructor.Default, le(this.element).data(), e)).delay && (e.delay = {
                        show: e.delay,
                        hide: e.delay
                    }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), Rt.typeCheckConfig(de, e, this.constructor.DefaultType), e
                }, e._getDelegateConfig = function() {
                    var e = {};
                    if (this.config)
                        for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                    return e
                }, e._cleanTipClass = function() {
                    var e = le(this.getTipElement()),
                        t = e.attr("class").match(pe);
                    null !== t && 0 < t.length && e.removeClass(t.join(""))
                }, e._handlePopperPlacementChange = function(e) {
                    this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
                }, e._fixTransition = function() {
                    var e = this.getTipElement(),
                        t = this.config.animation;
                    null === e.getAttribute("x-placement") && (le(e).removeClass(we), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t)
                }, d._jQueryInterface = function(i) {
                    return this.each(function() {
                        var e = le(this).data(ce),
                            t = "object" == typeof i && i;
                        if ((e || !/dispose|hide/.test(i)) && (e || (e = new d(this, t), le(this).data(ce, e)), "string" == typeof i)) {
                            if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                            e[i]()
                        }
                    })
                }, r(d, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return ge
                    }
                }, {
                    key: "NAME",
                    get: function() {
                        return de
                    }
                }, {
                    key: "DATA_KEY",
                    get: function() {
                        return ce
                    }
                }, {
                    key: "Event",
                    get: function() {
                        return ye
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function() {
                        return he
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return me
                    }
                }]), d
            }(), le.fn[de] = ke._jQueryInterface, le.fn[de].Constructor = ke, le.fn[de].noConflict = function() {
                return le.fn[de] = ue, ke._jQueryInterface
            }, ke),
            Vt = (J = "popover", te = "." + (ee = "bs.popover"), ie = (G = t).fn[J], ne = new RegExp("(^|\\s)bs-popover\\S+", "g"), se = h({}, Ut.Default, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
            }), oe = h({}, Ut.DefaultType, {
                content: "(string|element|function)"
            }), re = {
                HIDE: "hide" + te,
                HIDDEN: "hidden" + te,
                SHOW: "show" + te,
                SHOWN: "shown" + te,
                INSERTED: "inserted" + te,
                CLICK: "click" + te,
                FOCUSIN: "focusin" + te,
                FOCUSOUT: "focusout" + te,
                MOUSEENTER: "mouseenter" + te,
                MOUSELEAVE: "mouseleave" + te
            }, ae = function(e) {
                var t, i;

                function n() {
                    return e.apply(this, arguments) || this
                }
                i = e, (t = n).prototype = Object.create(i.prototype), (t.prototype.constructor = t).__proto__ = i;
                var s = n.prototype;
                return s.isWithContent = function() {
                    return this.getTitle() || this._getContent()
                }, s.addAttachmentClass = function(e) {
                    G(this.getTipElement()).addClass("bs-popover-" + e)
                }, s.getTipElement = function() {
                    return this.tip = this.tip || G(this.config.template)[0], this.tip
                }, s.setContent = function() {
                    var e = G(this.getTipElement());
                    this.setElementContent(e.find(".popover-header"), this.getTitle());
                    var t = this._getContent();
                    "function" == typeof t && (t = t.call(this.element)), this.setElementContent(e.find(".popover-body"), t), e.removeClass("fade show")
                }, s._getContent = function() {
                    return this.element.getAttribute("data-content") || this.config.content
                }, s._cleanTipClass = function() {
                    var e = G(this.getTipElement()),
                        t = e.attr("class").match(ne);
                    null !== t && 0 < t.length && e.removeClass(t.join(""))
                }, n._jQueryInterface = function(i) {
                    return this.each(function() {
                        var e = G(this).data(ee),
                            t = "object" == typeof i ? i : null;
                        if ((e || !/destroy|hide/.test(i)) && (e || (e = new n(this, t), G(this).data(ee, e)), "string" == typeof i)) {
                            if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                            e[i]()
                        }
                    })
                }, r(n, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return se
                    }
                }, {
                    key: "NAME",
                    get: function() {
                        return J
                    }
                }, {
                    key: "DATA_KEY",
                    get: function() {
                        return ee
                    }
                }, {
                    key: "Event",
                    get: function() {
                        return re
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function() {
                        return te
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return oe
                    }
                }]), n
            }(Ut), G.fn[J] = ae._jQueryInterface, G.fn[J].Constructor = ae, G.fn[J].noConflict = function() {
                return G.fn[J] = ie, ae._jQueryInterface
            }, ae),
            Qt = (L = "scrollspy", H = "." + (F = "bs.scrollspy"), $ = (W = t).fn[L], O = {
                offset: 10,
                method: "auto",
                target: ""
            }, P = {
                offset: "number",
                method: "string",
                target: "(string|element)"
            }, M = {
                ACTIVATE: "activate" + H,
                SCROLL: "scroll" + H,
                LOAD_DATA_API: "load" + H + ".data-api"
            }, R = "active", j = '[data-spy="scroll"]', N = ".active", B = ".nav, .list-group", Y = ".nav-link", X = ".nav-item", q = ".list-group-item", U = ".dropdown", V = ".dropdown-item", Q = ".dropdown-toggle", K = "position", Z = function() {
                function i(e, t) {
                    var i = this;
                    this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + Y + "," + this._config.target + " " + q + "," + this._config.target + " " + V, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, W(this._scrollElement).on(M.SCROLL, function(e) {
                        return i._process(e)
                    }), this.refresh(), this._process()
                }
                var e = i.prototype;
                return e.refresh = function() {
                    var t = this,
                        e = this._scrollElement === this._scrollElement.window ? "offset" : K,
                        s = "auto" === this._config.method ? e : this._config.method,
                        o = s === K ? this._getScrollTop() : 0;
                    this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), W.makeArray(W(this._selector)).map(function(e) {
                        var t, i = Rt.getSelectorFromElement(e);
                        if (i && (t = W(i)[0]), t) {
                            var n = t.getBoundingClientRect();
                            if (n.width || n.height) return [W(t)[s]().top + o, i]
                        }
                        return null
                    }).filter(function(e) {
                        return e
                    }).sort(function(e, t) {
                        return e[0] - t[0]
                    }).forEach(function(e) {
                        t._offsets.push(e[0]), t._targets.push(e[1])
                    })
                }, e.dispose = function() {
                    W.removeData(this._element, F), W(this._scrollElement).off(H), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                }, e._getConfig = function(e) {
                    if ("string" != typeof(e = h({}, O, e)).target) {
                        var t = W(e.target).attr("id");
                        t || (t = Rt.getUID(L), W(e.target).attr("id", t)), e.target = "#" + t
                    }
                    return Rt.typeCheckConfig(L, e, P), e
                }, e._getScrollTop = function() {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                }, e._getScrollHeight = function() {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }, e._getOffsetHeight = function() {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                }, e._process = function() {
                    var e = this._getScrollTop() + this._config.offset,
                        t = this._getScrollHeight(),
                        i = this._config.offset + t - this._getOffsetHeight();
                    if (this._scrollHeight !== t && this.refresh(), i <= e) {
                        var n = this._targets[this._targets.length - 1];
                        this._activeTarget !== n && this._activate(n)
                    } else {
                        if (this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                        for (var s = this._offsets.length; s--;) this._activeTarget !== this._targets[s] && e >= this._offsets[s] && (void 0 === this._offsets[s + 1] || e < this._offsets[s + 1]) && this._activate(this._targets[s])
                    }
                }, e._activate = function(t) {
                    this._activeTarget = t, this._clear();
                    var e = this._selector.split(",");
                    e = e.map(function(e) {
                        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                    });
                    var i = W(e.join(","));
                    i.hasClass("dropdown-item") ? (i.closest(U).find(Q).addClass(R), i.addClass(R)) : (i.addClass(R), i.parents(B).prev(Y + ", " + q).addClass(R), i.parents(B).prev(X).children(Y).addClass(R)), W(this._scrollElement).trigger(M.ACTIVATE, {
                        relatedTarget: t
                    })
                }, e._clear = function() {
                    W(this._selector).filter(N).removeClass(R)
                }, i._jQueryInterface = function(t) {
                    return this.each(function() {
                        var e = W(this).data(F);
                        if (e || (e = new i(this, "object" == typeof t && t), W(this).data(F, e)), "string" == typeof t) {
                            if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');
                            e[t]()
                        }
                    })
                }, r(i, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return O
                    }
                }]), i
            }(), W(window).on(M.LOAD_DATA_API, function() {
                for (var e = W.makeArray(W(j)), t = e.length; t--;) {
                    var i = W(e[t]);
                    Z._jQueryInterface.call(i, i.data())
                }
            }), W.fn[L] = Z._jQueryInterface, W.fn[L].Constructor = Z, W.fn[L].noConflict = function() {
                return W.fn[L] = $, Z._jQueryInterface
            }, Z),
            Kt = (S = "." + (C = "bs.tab"), z = (k = t).fn.tab, x = {
                HIDE: "hide" + S,
                HIDDEN: "hidden" + S,
                SHOW: "show" + S,
                SHOWN: "shown" + S,
                CLICK_DATA_API: "click.bs.tab.data-api"
            }, E = "active", D = ".active", I = "> li > .active", A = function() {
                function n(e) {
                    this._element = e
                }
                var e = n.prototype;
                return e.show = function() {
                    var i = this;
                    if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && k(this._element).hasClass(E) || k(this._element).hasClass("disabled"))) {
                        var e, n, t = k(this._element).closest(".nav, .list-group")[0],
                            s = Rt.getSelectorFromElement(this._element);
                        if (t) {
                            var o = "UL" === t.nodeName ? I : D;
                            n = (n = k.makeArray(k(t).find(o)))[n.length - 1]
                        }
                        var r = k.Event(x.HIDE, {
                                relatedTarget: this._element
                            }),
                            a = k.Event(x.SHOW, {
                                relatedTarget: n
                            });
                        if (n && k(n).trigger(r), k(this._element).trigger(a), !a.isDefaultPrevented() && !r.isDefaultPrevented()) {
                            s && (e = k(s)[0]), this._activate(this._element, t);
                            var l = function() {
                                var e = k.Event(x.HIDDEN, {
                                        relatedTarget: i._element
                                    }),
                                    t = k.Event(x.SHOWN, {
                                        relatedTarget: n
                                    });
                                k(n).trigger(e), k(i._element).trigger(t)
                            };
                            e ? this._activate(e, e.parentNode, l) : l()
                        }
                    }
                }, e.dispose = function() {
                    k.removeData(this._element, C), this._element = null
                }, e._activate = function(e, t, i) {
                    var n = this,
                        s = ("UL" === t.nodeName ? k(t).find(I) : k(t).children(D))[0],
                        o = i && Rt.supportsTransitionEnd() && s && k(s).hasClass("fade"),
                        r = function() {
                            return n._transitionComplete(e, s, i)
                        };
                    s && o ? k(s).one(Rt.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                }, e._transitionComplete = function(e, t, i) {
                    if (t) {
                        k(t).removeClass("show " + E);
                        var n = k(t.parentNode).find("> .dropdown-menu .active")[0];
                        n && k(n).removeClass(E), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)
                    }
                    if (k(e).addClass(E), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), Rt.reflow(e), k(e).addClass("show"), e.parentNode && k(e.parentNode).hasClass("dropdown-menu")) {
                        var s = k(e).closest(".dropdown")[0];
                        s && k(s).find(".dropdown-toggle").addClass(E), e.setAttribute("aria-expanded", !0)
                    }
                    i && i()
                }, n._jQueryInterface = function(i) {
                    return this.each(function() {
                        var e = k(this),
                            t = e.data(C);
                        if (t || (t = new n(this), e.data(C, t)), "string" == typeof i) {
                            if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                            t[i]()
                        }
                    })
                }, r(n, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }]), n
            }(), k(document).on(x.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(e) {
                e.preventDefault(), A._jQueryInterface.call(k(this), "show")
            }), k.fn.tab = A._jQueryInterface, k.fn.tab.Constructor = A, k.fn.tab.noConflict = function() {
                return k.fn.tab = z, A._jQueryInterface
            }, A);
        ! function(e) {
            if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = e.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(t), e.Util = Rt, e.Alert = jt, e.Button = Nt, e.Carousel = Bt, e.Collapse = Yt, e.Dropdown = Xt, e.Modal = qt, e.Popover = Vt, e.Scrollspy = Qt, e.Tab = Kt, e.Tooltip = Ut, Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, "object" == typeof exports && "undefined" != typeof module ? C(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], C) : C(k.bootstrap = {}, k.jQuery, k.Popper), S = "undefined" != typeof window ? window : {}, z = function(n, p, o) {
        "use strict";
        var m, f;
        if (function() {
                var e, t = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                for (e in f = n.lazySizesConfig || n.lazysizesConfig || {}, t) e in f || (f[e] = t[e])
            }(), !p || !p.getElementsByClassName) return {
            init: function() {},
            cfg: f,
            noSupport: !0
        };
        var i, r, s, e, g, v, h, y, t, w, b, _, T, k, C, S, a, l, d, c, u, z, x, E, D, I, A, W, L, F, H, $, O, P, M, R, j, N, B, Y, X, q, U, V, Q, K, Z, G, J, ee, te = p.documentElement,
            ie = n.HTMLPictureElement,
            ne = "addEventListener",
            se = "getAttribute",
            oe = n[ne].bind(n),
            re = n.setTimeout,
            ae = n.requestAnimationFrame || re,
            le = n.requestIdleCallback,
            de = /^picture$/i,
            ce = ["load", "error", "lazyincluded", "_lazyloaded"],
            he = {},
            ue = Array.prototype.forEach,
            pe = function(e, t) {
                return he[t] || (he[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), he[t].test(e[se]("class") || "") && he[t]
            },
            me = function(e, t) {
                pe(e, t) || e.setAttribute("class", (e[se]("class") || "").trim() + " " + t)
            },
            fe = function(e, t) {
                var i;
                (i = pe(e, t)) && e.setAttribute("class", (e[se]("class") || "").replace(i, " "))
            },
            ge = function(t, i, e) {
                var n = e ? ne : "removeEventListener";
                e && ge(t, i), ce.forEach(function(e) {
                    t[n](e, i)
                })
            },
            ve = function(e, t, i, n, s) {
                var o = p.createEvent("Event");
                return i || (i = {}), i.instance = m, o.initEvent(t, !n, !s), o.detail = i, e.dispatchEvent(o), o
            },
            ye = function(e, t) {
                var i;
                !ie && (i = n.picturefill || f.pf) ? (t && t.src && !e[se]("srcset") && e.setAttribute("srcset", t.src), i({
                    reevaluate: !0,
                    elements: [e]
                })) : t && t.src && (e.src = t.src)
            },
            we = function(e, t) {
                return (getComputedStyle(e, null) || {})[t]
            },
            be = function(e, t, i) {
                for (i = i || e.offsetWidth; i < f.minSize && t && !e._lazysizesWidth;) i = t.offsetWidth, t = t.parentNode;
                return i
            },
            _e = (Z = [], G = K = [], (ee = function(e, t) {
                V && !t ? e.apply(this, arguments) : (G.push(e), Q || (Q = !0, (p.hidden ? re : ae)(J)))
            })._lsFlush = J = function() {
                var e = G;
                for (G = K.length ? Z : K, Q = !(V = !0); e.length;) e.shift()();
                V = !1
            }, ee),
            Te = function(i, e) {
                return e ? function() {
                    _e(i)
                } : function() {
                    var e = this,
                        t = arguments;
                    _e(function() {
                        i.apply(e, t)
                    })
                }
            },
            ke = function(e) {
                var t, i, n = function() {
                        t = null, e()
                    },
                    s = function() {
                        var e = o.now() - i;
                        e < 99 ? re(s, 99 - e) : (le || n)(n)
                    };
                return function() {
                    i = o.now(), t || (t = re(s, 99))
                }
            },
            Ce = (E = /^img$/i, D = /^iframe$/i, I = "onscroll" in n && !/(gle|ing)bot/.test(navigator.userAgent), L = -1, F = function(e) {
                W--, (!e || W < 0 || !e.target) && (W = 0)
            }, H = function(e) {
                return null == S && (S = "hidden" == we(p.body, "visibility")), S || !("hidden" == we(e.parentNode, "visibility") && "hidden" == we(e, "visibility"))
            }, $ = function(e, t) {
                var i, n = e,
                    s = H(e);
                for (_ -= t, C += t, T -= t, k += t; s && (n = n.offsetParent) && n != p.body && n != te;)(s = 0 < (we(n, "opacity") || 1)) && "visible" != we(n, "overflow") && (i = n.getBoundingClientRect(), s = k > i.left && T < i.right && C > i.top - 1 && _ < i.bottom + 1);
                return s
            }, a = O = function() {
                var e, t, i, n, s, o, r, a, l, d, c, h, u = m.elements;
                if ((y = f.loadMode) && W < 8 && (e = u.length)) {
                    for (t = 0, L++; t < e; t++)
                        if (u[t] && !u[t]._lazyRace)
                            if (!I || m.prematureUnveil && m.prematureUnveil(u[t])) Y(u[t]);
                            else if ((a = u[t][se]("data-expand")) && (o = 1 * a) || (o = A), d || (d = !f.expand || f.expand < 1 ? 500 < te.clientHeight && 500 < te.clientWidth ? 500 : 370 : f.expand, c = (m._defEx = d) * f.expFactor, h = f.hFac, S = null, A < c && W < 1 && 2 < L && 2 < y && !p.hidden ? (A = c, L = 0) : A = 1 < y && 1 < L && W < 6 ? d : 0), l !== o && (w = innerWidth + o * h, b = innerHeight + o, r = -1 * o, l = o), i = u[t].getBoundingClientRect(), (C = i.bottom) >= r && (_ = i.top) <= b && (k = i.right) >= r * h && (T = i.left) <= w && (C || k || T || _) && (f.loadHidden || H(u[t])) && (v && W < 3 && !a && (y < 3 || L < 4) || $(u[t], o))) {
                        if (Y(u[t]), s = !0, 9 < W) break
                    } else !s && v && !n && W < 4 && L < 4 && 2 < y && (g[0] || f.preloadAfterLoad) && (g[0] || !a && (C || k || T || _ || "auto" != u[t][se](f.sizesAttr))) && (n = g[0] || u[t]);
                    n && !s && Y(n)
                }
            }, d = W = A = 0, c = f.throttleDelay, u = f.ricTimeout, z = function() {
                l = !1, d = o.now(), a()
            }, x = le && 49 < u ? function() {
                le(z, {
                    timeout: u
                }), u !== f.ricTimeout && (u = f.ricTimeout)
            } : Te(function() {
                re(z)
            }, !0), P = function(e) {
                var t;
                (e = !0 === e) && (u = 33), l || (l = !0, (t = c - (o.now() - d)) < 0 && (t = 0), e || t < 9 ? x() : re(x, t))
            }, R = Te(M = function(e) {
                var t = e.target;
                t._lazyCache ? delete t._lazyCache : (F(e), me(t, f.loadedClass), fe(t, f.loadingClass), ge(t, j), ve(t, "lazyloaded"))
            }), j = function(e) {
                R({
                    target: e.target
                })
            }, N = function(e) {
                var t, i = e[se](f.srcsetAttr);
                (t = f.customMedia[e[se]("data-media") || e[se]("media")]) && e.setAttribute("media", t), i && e.setAttribute("srcset", i)
            }, B = Te(function(t, e, i, n, s) {
                var o, r, a, l, d, c;
                (d = ve(t, "lazybeforeunveil", e)).defaultPrevented || (n && (i ? me(t, f.autosizesClass) : t.setAttribute("sizes", n)), r = t[se](f.srcsetAttr), o = t[se](f.srcAttr), s && (l = (a = t.parentNode) && de.test(a.nodeName || "")), c = e.firesLoad || "src" in t && (r || o || l), d = {
                    target: t
                }, me(t, f.loadingClass), c && (clearTimeout(h), h = re(F, 2500), ge(t, j, !0)), l && ue.call(a.getElementsByTagName("source"), N), r ? t.setAttribute("srcset", r) : o && !l && (D.test(t.nodeName) ? function(t, i) {
                    try {
                        t.contentWindow.location.replace(i)
                    } catch (e) {
                        t.src = i
                    }
                }(t, o) : t.src = o), s && (r || l) && ye(t, {
                    src: o
                })), t._lazyRace && delete t._lazyRace, fe(t, f.lazyClass), _e(function() {
                    var e = t.complete && 1 < t.naturalWidth;
                    c && !e || (e && me(t, "ls-is-cached"), M(d), t._lazyCache = !0, re(function() {
                        "_lazyCache" in t && delete t._lazyCache
                    }, 9)), "lazy" == t.loading && W--
                }, !0)
            }), Y = function(e) {
                if (!e._lazyRace) {
                    var t, i = E.test(e.nodeName),
                        n = i && (e[se](f.sizesAttr) || e[se]("sizes")),
                        s = "auto" == n;
                    (!s && v || !i || !e[se]("src") && !e.srcset || e.complete || pe(e, f.errorClass) || !pe(e, f.lazyClass)) && (t = ve(e, "lazyunveilread").detail, s && Se.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, W++, B(e, t, s, n, i))
                }
            }, X = ke(function() {
                f.loadMode = 3, P()
            }), U = function() {
                v || (o.now() - t < 999 ? re(U, 999) : (v = !0, f.loadMode = 3, P(), oe("scroll", q, !0)))
            }, {
                _: function() {
                    t = o.now(), m.elements = p.getElementsByClassName(f.lazyClass), g = p.getElementsByClassName(f.lazyClass + " " + f.preloadClass), oe("scroll", P, !0), oe("resize", P, !0), oe("pageshow", function(e) {
                        if (e.persisted) {
                            var t = p.querySelectorAll("." + f.loadingClass);
                            t.length && t.forEach && ae(function() {
                                t.forEach(function(e) {
                                    e.complete && Y(e)
                                })
                            })
                        }
                    }), n.MutationObserver ? new MutationObserver(P).observe(te, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (te[ne]("DOMNodeInserted", P, !0), te[ne]("DOMAttrModified", P, !0), setInterval(P, 999)), oe("hashchange", P, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(e) {
                        p[ne](e, P, !0)
                    }), /d$|^c/.test(p.readyState) ? U() : (oe("load", U), p[ne]("DOMContentLoaded", P), re(U, 2e4)), m.elements.length ? (O(), _e._lsFlush()) : P()
                },
                checkElems: P,
                unveil: Y,
                _aLSL: q = function() {
                    3 == f.loadMode && (f.loadMode = 2), X()
                }
            }),
            Se = (r = Te(function(e, t, i, n) {
                var s, o, r;
                if (e._lazysizesWidth = n, n += "px", e.setAttribute("sizes", n), de.test(t.nodeName || ""))
                    for (o = 0, r = (s = t.getElementsByTagName("source")).length; o < r; o++) s[o].setAttribute("sizes", n);
                i.detail.dataAttr || ye(e, i.detail)
            }), s = function(e, t, i) {
                var n, s = e.parentNode;
                s && (i = be(e, s, i), (n = ve(e, "lazybeforesizes", {
                    width: i,
                    dataAttr: !!t
                })).defaultPrevented || (i = n.detail.width) && i !== e._lazysizesWidth && r(e, s, n, i))
            }, {
                _: function() {
                    i = p.getElementsByClassName(f.autosizesClass), oe("resize", e)
                },
                checkElems: e = ke(function() {
                    var e, t = i.length;
                    if (t)
                        for (e = 0; e < t; e++) s(i[e])
                }),
                updateElem: s
            }),
            ze = function() {
                !ze.i && p.getElementsByClassName && (ze.i = !0, Se._(), Ce._())
            };
        return re(function() {
            f.init && ze()
        }), m = {
            cfg: f,
            autoSizer: Se,
            loader: Ce,
            init: ze,
            uP: ye,
            aC: me,
            rC: fe,
            hC: pe,
            fire: ve,
            gW: be,
            rAF: _e
        }
    }(S, S.document, Date), S.lazySizes = z, "object" == typeof module && module.exports && (module.exports = z), x = window, D = function() {
        E(x.lazySizes), x.removeEventListener("lazyunveilread", D, !0)
    }, E = (E = function(e, h, u) {
        "use strict";
        var p, m, f, g, n, o, s, v, y;
        e.addEventListener && (p = u.cfg, m = /\s+/g, f = /\s*\|\s+|\s+\|\s*/g, g = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/, n = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/, o = /\(|\)|'/, s = {
            contain: 1,
            cover: 1
        }, v = function(e, t) {
            var i;
            t && ((i = t.match(n)) && i[1] ? e.setAttribute("type", i[1]) : e.setAttribute("media", p.customMedia[t] || t))
        }, y = function(e) {
            var t, i, n, s;
            e.target._lazybgset && (i = (t = e.target)._lazybgset, (n = t.currentSrc || t.src) && ((s = u.fire(i, "bgsetproxy", {
                src: n,
                useSrc: o.test(n) ? JSON.stringify(n) : n
            })).defaultPrevented || (i.style.backgroundImage = "url(" + s.detail.useSrc + ")")), t._lazybgsetLoading && (u.fire(i, "_lazyloaded", {}, !1, !0), delete t._lazybgsetLoading))
        }, addEventListener("lazybeforeunveil", function(e) {
            var t, i, n, s, o, r, a, l, d, c;
            !e.defaultPrevented && (t = e.target.getAttribute("data-bgset")) && (d = e.target, (c = h.createElement("img")).alt = "", c._lazybgsetLoading = !0, e.detail.firesLoad = !0, i = t, n = d, s = c, o = h.createElement("picture"), r = n.getAttribute(p.sizesAttr), a = n.getAttribute("data-ratio"), l = n.getAttribute("data-optimumx"), n._lazybgset && n._lazybgset.parentNode == n && n.removeChild(n._lazybgset), Object.defineProperty(s, "_lazybgset", {
                value: n,
                writable: !0
            }), Object.defineProperty(n, "_lazybgset", {
                value: o,
                writable: !0
            }), i = i.replace(m, " ").split(f), o.style.display = "none", s.className = p.lazyClass, 1 != i.length || r || (r = "auto"), i.forEach(function(e) {
                var t, i = h.createElement("source");
                r && "auto" != r && i.setAttribute("sizes", r), (t = e.match(g)) ? (i.setAttribute(p.srcsetAttr, t[1]), v(i, t[2]), v(i, t[3])) : i.setAttribute(p.srcsetAttr, e), o.appendChild(i)
            }), r && (s.setAttribute(p.sizesAttr, r), n.removeAttribute(p.sizesAttr), n.removeAttribute("sizes")), l && s.setAttribute("data-optimumx", l), a && s.setAttribute("data-ratio", a), o.appendChild(s), n.appendChild(o), setTimeout(function() {
                u.loader.unveil(c), u.rAF(function() {
                    u.fire(c, "_lazyloaded", {}, !0, !0), c.complete && y({
                        target: c
                    })
                })
            }))
        }), h.addEventListener("load", y, !0), e.addEventListener("lazybeforesizes", function(e) {
            var t, i, n;
            e.detail.instance == u && e.target._lazybgset && e.detail.dataAttr && (i = e.target._lazybgset, n = (getComputedStyle(i) || {
                getPropertyValue: function() {}
            }).getPropertyValue("background-size"), !s[n] && s[i.style.backgroundSize] && (n = i.style.backgroundSize), s[t = n] && (e.target._lazysizesParentFit = t, u.rAF(function() {
                e.target.setAttribute("data-parent-fit", t), e.target._lazysizesParentFit && delete e.target._lazysizesParentFit
            })))
        }, !0), h.documentElement.addEventListener("lazybeforesizes", function(e) {
            var t, i;
            !e.defaultPrevented && e.target._lazybgset && e.detail.instance == u && (e.detail.width = (t = e.target._lazybgset, i = u.gW(t, t.parentNode), (!t._lazysizesWidth || i > t._lazysizesWidth) && (t._lazysizesWidth = i), t._lazysizesWidth))
        }))
    }).bind(null, x, x.document), "object" == typeof module && module.exports ? E(require("lazysizes")) : "function" == typeof define && define.amd ? require(["lazysizes"], E) : x.lazySizes ? D() : x.addEventListener("lazyunveilread", D, !0),
    function(L) {
        "use strict";
        var v = {};
        v.fileapi = void 0 !== L("<input type='file'/>").get(0).files, v.formdata = void 0 !== window.FormData;
        var F = !!L.fn.prop;

        function i(e) {
            var t = e.data;
            e.isDefaultPrevented() || (e.preventDefault(), L(this).ajaxSubmit(t))
        }

        function n(e) {
            var t = e.target,
                i = L(t);
            if (!i.is("[type=submit],[type=image]")) {
                var n = i.closest("[type=submit]");
                if (0 === n.length) return;
                t = n[0]
            }
            var s = this;
            if ("image" == (s.clk = t).type)
                if (void 0 !== e.offsetX) s.clk_x = e.offsetX, s.clk_y = e.offsetY;
                else if ("function" == typeof L.fn.offset) {
                var o = i.offset();
                s.clk_x = e.pageX - o.left, s.clk_y = e.pageY - o.top
            } else s.clk_x = e.pageX - t.offsetLeft, s.clk_y = e.pageY - t.offsetTop;
            setTimeout(function() {
                s.clk = s.clk_x = s.clk_y = null
            }, 100)
        }

        function H() {
            if (L.fn.ajaxSubmit.debug) {
                var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e)
            }
        }
        L.fn.attr2 = function() {
            if (!F) return this.attr.apply(this, arguments);
            var e = this.prop.apply(this, arguments);
            return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
        }, L.fn.ajaxSubmit = function(D) {
            if (!this.length) return H("ajaxSubmit: skipping submit process - no element selected"), this;
            var I, e, t, A = this;
            "function" == typeof D && (D = {
                success: D
            }), I = this.attr2("method"), (t = (t = "string" == typeof(e = this.attr2("action")) ? L.trim(e) : "") || window.location.href || "") && (t = (t.match(/^([^#]+)/) || [])[1]), D = L.extend(!0, {
                url: t,
                success: L.ajaxSettings.success,
                type: I || "GET",
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
            }, D);
            var i = {};
            if (this.trigger("form-pre-serialize", [this, D, i]), i.veto) return H("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            if (D.beforeSerialize && !1 === D.beforeSerialize(this, D)) return H("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            var n = D.traditional;
            void 0 === n && (n = L.ajaxSettings.traditional);
            var s, W = [],
                o = this.formToArray(D.semantic, W);
            if (D.data && (D.extraData = D.data, s = L.param(D.data, n)), D.beforeSubmit && !1 === D.beforeSubmit(o, this, D)) return H("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            if (this.trigger("form-submit-validate", [o, this, D, i]), i.veto) return H("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            var r = L.param(o, n);
            s && (r = r ? r + "&" + s : s), "GET" == D.type.toUpperCase() ? (D.url += (0 <= D.url.indexOf("?") ? "&" : "?") + r, D.data = null) : D.data = r;
            var a = [];
            if (D.resetForm && a.push(function() {
                    A.resetForm()
                }), D.clearForm && a.push(function() {
                    A.clearForm(D.includeHidden)
                }), !D.dataType && D.target) {
                var l = D.success || function() {};
                a.push(function(e) {
                    var t = D.replaceTarget ? "replaceWith" : "html";
                    L(D.target)[t](e).each(l, arguments)
                })
            } else D.success && a.push(D.success);
            D.success = function(e, t, i) {
                for (var n = D.context || this, s = 0, o = a.length; s < o; s++) a[s].apply(n, [e, t, i || A, A])
            };
            var d = 0 < L('input[type=file]:enabled[value!=""]', this).length,
                c = "multipart/form-data",
                h = A.attr("enctype") == c || A.attr("encoding") == c,
                u = v.fileapi && v.formdata;
            H("fileAPI :" + u);
            var p, m = (d || h) && !u;
            !1 !== D.iframe && (D.iframe || m) ? D.closeKeepAlive ? L.get(D.closeKeepAlive, function() {
                p = g(o)
            }) : p = g(o) : p = (d || h) && u ? function(e) {
                for (var i = new FormData, t = 0; t < e.length; t++) i.append(e[t].name, e[t].value);
                if (D.extraData) {
                    var n = function(e) {
                        var t, i, n = L.param(e).split("&"),
                            s = n.length,
                            o = [];
                        for (t = 0; t < s; t++) n[t] = n[t].replace(/\+/g, " "), i = n[t].split("="), o.push([decodeURIComponent(i[0]), decodeURIComponent(i[1])]);
                        return o
                    }(D.extraData);
                    for (t = 0; t < n.length; t++) n[t] && i.append(n[t][0], n[t][1])
                }
                D.data = null;
                var s = L.extend(!0, {}, L.ajaxSettings, D, {
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    type: I || "POST"
                });
                D.uploadProgress && (s.xhr = function() {
                    var e = jQuery.ajaxSettings.xhr();
                    return e.upload && e.upload.addEventListener("progress", function(e) {
                        var t = 0,
                            i = e.loaded || e.position,
                            n = e.total;
                        e.lengthComputable && (t = Math.ceil(i / n * 100)), D.uploadProgress(e, i, n, t)
                    }, !1), e
                });
                s.data = null;
                var o = s.beforeSend;
                return s.beforeSend = function(e, t) {
                    t.data = i, o && o.call(this, e, t)
                }, L.ajax(s)
            }(o) : L.ajax(D), A.removeData("jqxhr").data("jqxhr", p);
            for (var f = 0; f < W.length; f++) W[f] = null;
            return this.trigger("form-submit-notify", [this, D]), this;

            function g(e) {
                var t, i, c, h, s, u, p, m, n, o, f, g, r = A[0],
                    v = L.Deferred();
                if (e)
                    for (i = 0; i < W.length; i++) t = L(W[i]), F ? t.prop("disabled", !1) : t.removeAttr("disabled");
                if ((c = L.extend(!0, {}, L.ajaxSettings, D)).context = c.context || c, s = "jqFormIO" + (new Date).getTime(), c.iframeTarget ? (o = (u = L(c.iframeTarget)).attr2("name")) ? s = o : u.attr2("name", s) : (u = L('<iframe name="' + s + '" src="' + c.iframeSrc + '" />')).css({
                        position: "absolute",
                        top: "-1000px",
                        left: "-1000px"
                    }), p = u[0], m = {
                        aborted: 0,
                        responseText: null,
                        responseXML: null,
                        status: 0,
                        statusText: "n/a",
                        getAllResponseHeaders: function() {},
                        getResponseHeader: function() {},
                        setRequestHeader: function() {},
                        abort: function(e) {
                            var t = "timeout" === e ? "timeout" : "aborted";
                            H("aborting upload... " + t), this.aborted = 1;
                            try {
                                p.contentWindow.document.execCommand && p.contentWindow.document.execCommand("Stop")
                            } catch (e) {}
                            u.attr("src", c.iframeSrc), m.error = t, c.error && c.error.call(c.context, m, t, e), h && L.event.trigger("ajaxError", [m, c, t]), c.complete && c.complete.call(c.context, m, t)
                        }
                    }, (h = c.global) && 0 == L.active++ && L.event.trigger("ajaxStart"), h && L.event.trigger("ajaxSend", [m, c]), c.beforeSend && !1 === c.beforeSend.call(c.context, m, c)) return c.global && L.active--, v.reject(), v;
                if (m.aborted) return v.reject(), v;
                (n = r.clk) && (o = n.name) && !n.disabled && (c.extraData = c.extraData || {}, c.extraData[o] = n.value, "image" == n.type && (c.extraData[o + ".x"] = r.clk_x, c.extraData[o + ".y"] = r.clk_y));
                var y = 1,
                    w = 2;

                function b(t) {
                    var i = null;
                    try {
                        t.contentWindow && (i = t.contentWindow.document)
                    } catch (e) {
                        H("cannot get iframe.contentWindow document: " + e)
                    }
                    if (i) return i;
                    try {
                        i = t.contentDocument ? t.contentDocument : t.document
                    } catch (e) {
                        H("cannot get iframe.contentDocument: " + e), i = t.document
                    }
                    return i
                }
                var a = L("meta[name=csrf-token]").attr("content"),
                    l = L("meta[name=csrf-param]").attr("content");

                function d() {
                    var e = A.attr2("target"),
                        t = A.attr2("action");
                    r.setAttribute("target", s), I || r.setAttribute("method", "POST"), t != c.url && r.setAttribute("action", c.url), c.skipEncodingOverride || I && !/post/i.test(I) || A.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    }), c.timeout && (g = setTimeout(function() {
                        f = !0, S(y)
                    }, c.timeout));
                    var i = [];
                    try {
                        if (c.extraData)
                            for (var n in c.extraData) c.extraData.hasOwnProperty(n) && (L.isPlainObject(c.extraData[n]) && c.extraData[n].hasOwnProperty("name") && c.extraData[n].hasOwnProperty("value") ? i.push(L('<input type="hidden" name="' + c.extraData[n].name + '">').val(c.extraData[n].value).appendTo(r)[0]) : i.push(L('<input type="hidden" name="' + n + '">').val(c.extraData[n]).appendTo(r)[0]));
                        c.iframeTarget || (u.appendTo("body"), p.attachEvent ? p.attachEvent("onload", S) : p.addEventListener("load", S, !1)), setTimeout(function e() {
                            try {
                                var t = b(p).readyState;
                                H("state = " + t), t && "uninitialized" == t.toLowerCase() && setTimeout(e, 50)
                            } catch (e) {
                                H("Server abort: ", e, " (", e.name, ")"), S(w), g && clearTimeout(g), g = void 0
                            }
                        }, 15);
                        try {
                            r.submit()
                        } catch (e) {
                            document.createElement("form").submit.apply(r)
                        }
                    } finally {
                        r.setAttribute("action", t), e ? r.setAttribute("target", e) : A.removeAttr("target"), L(i).remove()
                    }
                }
                l && a && (c.extraData = c.extraData || {}, c.extraData[l] = a), c.forceSync ? d() : setTimeout(d, 10);
                var _, T, k, C = 50;

                function S(e) {
                    if (!m.aborted && !k) {
                        if ((T = b(p)) || (H("cannot access response document"), e = w), e === y && m) return m.abort("timeout"), void v.reject(m, "timeout");
                        if (e == w && m) return m.abort("server abort"), void v.reject(m, "error", "server abort");
                        if (T && T.location.href != c.iframeSrc || f) {
                            p.detachEvent ? p.detachEvent("onload", S) : p.removeEventListener("load", S, !1);
                            var t, i = "success";
                            try {
                                if (f) throw "timeout";
                                var n = "xml" == c.dataType || T.XMLDocument || L.isXMLDoc(T);
                                if (H("isXml=" + n), !n && window.opera && (null === T.body || !T.body.innerHTML) && --C) return H("requeing onLoad callback, DOM not available"), void setTimeout(S, 250);
                                var s = T.body ? T.body : T.documentElement;
                                m.responseText = s ? s.innerHTML : null, m.responseXML = T.XMLDocument ? T.XMLDocument : T, n && (c.dataType = "xml"), m.getResponseHeader = function(e) {
                                    return {
                                        "content-type": c.dataType
                                    }[e]
                                }, s && (m.status = Number(s.getAttribute("status")) || m.status, m.statusText = s.getAttribute("statusText") || m.statusText);
                                var o = (c.dataType || "").toLowerCase(),
                                    r = /(json|script|text)/.test(o);
                                if (r || c.textarea) {
                                    var a = T.getElementsByTagName("textarea")[0];
                                    if (a) m.responseText = a.value, m.status = Number(a.getAttribute("status")) || m.status, m.statusText = a.getAttribute("statusText") || m.statusText;
                                    else if (r) {
                                        var l = T.getElementsByTagName("pre")[0],
                                            d = T.getElementsByTagName("body")[0];
                                        l ? m.responseText = l.textContent ? l.textContent : l.innerText : d && (m.responseText = d.textContent ? d.textContent : d.innerText)
                                    }
                                } else "xml" == o && !m.responseXML && m.responseText && (m.responseXML = z(m.responseText));
                                try {
                                    _ = E(m, o, c)
                                } catch (e) {
                                    i = "parsererror", m.error = t = e || i
                                }
                            } catch (e) {
                                H("error caught: ", e), i = "error", m.error = t = e || i
                            }
                            m.aborted && (H("upload aborted"), i = null), m.status && (i = 200 <= m.status && m.status < 300 || 304 === m.status ? "success" : "error"), "success" === i ? (c.success && c.success.call(c.context, _, "success", m), v.resolve(m.responseText, "success", m), h && L.event.trigger("ajaxSuccess", [m, c])) : i && (void 0 === t && (t = m.statusText), c.error && c.error.call(c.context, m, i, t), v.reject(m, "error", t), h && L.event.trigger("ajaxError", [m, c, t])), h && L.event.trigger("ajaxComplete", [m, c]), h && !--L.active && L.event.trigger("ajaxStop"), c.complete && c.complete.call(c.context, m, i), k = !0, c.timeout && clearTimeout(g), setTimeout(function() {
                                c.iframeTarget || u.remove(), m.responseXML = null
                            }, 100)
                        }
                    }
                }
                var z = L.parseXML || function(e, t) {
                        return window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                    },
                    x = L.parseJSON || function(e) {
                        return window.eval("(" + e + ")")
                    },
                    E = function(e, t, i) {
                        var n = e.getResponseHeader("content-type") || "",
                            s = "xml" === t || !t && 0 <= n.indexOf("xml"),
                            o = s ? e.responseXML : e.responseText;
                        return s && "parsererror" === o.documentElement.nodeName && L.error && L.error("parsererror"), i && i.dataFilter && (o = i.dataFilter(o, t)), "string" == typeof o && ("json" === t || !t && 0 <= n.indexOf("json") ? o = x(o) : ("script" === t || !t && 0 <= n.indexOf("javascript")) && L.globalEval(o)), o
                    };
                return v
            }
        }, L.fn.ajaxForm = function(e) {
            if ((e = e || {}).delegation = e.delegation && L.isFunction(L.fn.on), e.delegation || 0 !== this.length) return e.delegation ? (L(document).off("submit.form-plugin", this.selector, i).off("click.form-plugin", this.selector, n).on("submit.form-plugin", this.selector, e, i).on("click.form-plugin", this.selector, e, n), this) : this.ajaxFormUnbind().bind("submit.form-plugin", e, i).bind("click.form-plugin", e, n);
            var t = {
                s: this.selector,
                c: this.context
            };
            return !L.isReady && t.s ? (H("DOM not ready, queuing ajaxForm"), L(function() {
                L(t.s, t.c).ajaxForm(e)
            })) : H("terminating; zero elements found by selector" + (L.isReady ? "" : " (DOM not ready)")), this
        }, L.fn.ajaxFormUnbind = function() {
            return this.unbind("submit.form-plugin click.form-plugin")
        }, L.fn.formToArray = function(e, t) {
            var i = [];
            if (0 === this.length) return i;
            var n, s, o, r, a, l, d, c = this[0],
                h = e ? c.getElementsByTagName("*") : c.elements;
            if (!h) return i;
            for (n = 0, l = h.length; n < l; n++)
                if ((o = (a = h[n]).name) && !a.disabled)
                    if (e && c.clk && "image" == a.type) c.clk == a && (i.push({
                        name: o,
                        value: L(a).val(),
                        type: a.type
                    }), i.push({
                        name: o + ".x",
                        value: c.clk_x
                    }, {
                        name: o + ".y",
                        value: c.clk_y
                    }));
                    else if ((r = L.fieldValue(a, !0)) && r.constructor == Array)
                for (t && t.push(a), s = 0, d = r.length; s < d; s++) i.push({
                    name: o,
                    value: r[s]
                });
            else if (v.fileapi && "file" == a.type) {
                t && t.push(a);
                var u = a.files;
                if (u.length)
                    for (s = 0; s < u.length; s++) i.push({
                        name: o,
                        value: u[s],
                        type: a.type
                    });
                else i.push({
                    name: o,
                    value: "",
                    type: a.type
                })
            } else null != r && (t && t.push(a), i.push({
                name: o,
                value: r,
                type: a.type,
                required: a.required
            }));
            if (!e && c.clk) {
                var p = L(c.clk),
                    m = p[0];
                (o = m.name) && !m.disabled && "image" == m.type && (i.push({
                    name: o,
                    value: p.val()
                }), i.push({
                    name: o + ".x",
                    value: c.clk_x
                }, {
                    name: o + ".y",
                    value: c.clk_y
                }))
            }
            return i
        }, L.fn.formSerialize = function(e) {
            return L.param(this.formToArray(e))
        }, L.fn.fieldSerialize = function(s) {
            var o = [];
            return this.each(function() {
                var e = this.name;
                if (e) {
                    var t = L.fieldValue(this, s);
                    if (t && t.constructor == Array)
                        for (var i = 0, n = t.length; i < n; i++) o.push({
                            name: e,
                            value: t[i]
                        });
                    else null != t && o.push({
                        name: this.name,
                        value: t
                    })
                }
            }), L.param(o)
        }, L.fn.fieldValue = function(e) {
            for (var t = [], i = 0, n = this.length; i < n; i++) {
                var s = this[i],
                    o = L.fieldValue(s, e);
                null == o || o.constructor == Array && !o.length || (o.constructor == Array ? L.merge(t, o) : t.push(o))
            }
            return t
        }, L.fieldValue = function(e, t) {
            var i = e.name,
                n = e.type,
                s = e.tagName.toLowerCase();
            if (void 0 === t && (t = !0), t && (!i || e.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !e.checked || ("submit" == n || "image" == n) && e.form && e.form.clk != e || "select" == s && -1 == e.selectedIndex)) return null;
            if ("select" != s) return L(e).val();
            var o = e.selectedIndex;
            if (o < 0) return null;
            for (var r = [], a = e.options, l = "select-one" == n, d = l ? o + 1 : a.length, c = l ? o : 0; c < d; c++) {
                var h = a[c];
                if (h.selected) {
                    var u = h.value;
                    if (u || (u = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text : h.value), l) return u;
                    r.push(u)
                }
            }
            return r
        }, L.fn.clearForm = function(e) {
            return this.each(function() {
                L("input,select,textarea", this).clearFields(e)
            })
        }, L.fn.clearFields = L.fn.clearInputs = function(i) {
            var n = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function() {
                var e = this.type,
                    t = this.tagName.toLowerCase();
                n.test(e) || "textarea" == t ? this.value = "" : "checkbox" == e || "radio" == e ? this.checked = !1 : "select" == t ? this.selectedIndex = -1 : "file" == e ? /MSIE/.test(navigator.userAgent) ? L(this).replaceWith(L(this).clone(!0)) : L(this).val("") : i && (!0 === i && /hidden/.test(e) || "string" == typeof i && L(this).is(i)) && (this.value = "")
            })
        }, L.fn.resetForm = function() {
            return this.each(function() {
                ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
            })
        }, L.fn.enable = function(e) {
            return void 0 === e && (e = !0), this.each(function() {
                this.disabled = !e
            })
        }, L.fn.selected = function(i) {
            return void 0 === i && (i = !0), this.each(function() {
                var e = this.type;
                if ("checkbox" == e || "radio" == e) this.checked = i;
                else if ("option" == this.tagName.toLowerCase()) {
                    var t = L(this).parent("select");
                    i && t[0] && "select-one" == t[0].type && t.find("option").selected(!1), this.selected = i
                }
            })
        }, L.fn.ajaxSubmit.debug = !1
    }(jQuery), (A = jQuery).extend(A.fn, {
        validate: function(e) {
            if (this.length) {
                var i = A.data(this[0], "validator");
                return i || (this.attr("novalidate", "novalidate"), i = new A.validator(e, this[0]), A.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                    i.settings.submitHandler && (i.submitButton = e.target), A(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== A(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
                }), this.submit(function(t) {
                    function e() {
                        var e;
                        return !i.settings.submitHandler || (i.submitButton && (e = A("<input type='hidden'/>").attr("name", i.submitButton.name).val(A(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && e.remove(), !1)
                    }
                    return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, e()) : i.form() ? i.pendingRequest ? !(i.formSubmitted = !0) : e() : (i.focusInvalid(), !1)
                })), i)
            }
            e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
        },
        valid: function() {
            if (A(this[0]).is("form")) return this.validate().form();
            var e = !0,
                t = A(this[0].form).validate();
            return this.each(function() {
                e = e && t.element(this)
            }), e
        },
        removeAttrs: function(e) {
            var i = {},
                n = this;
            return A.each(e.split(/\s/), function(e, t) {
                i[t] = n.attr(t), n.removeAttr(t)
            }), i
        },
        rules: function(e, t) {
            var i = this[0];
            if (e) {
                var n = A.data(i.form, "validator").settings,
                    s = n.rules,
                    o = A.validator.staticRules(i);
                switch (e) {
                    case "add":
                        A.extend(o, A.validator.normalizeRule(t)), delete o.messages, s[i.name] = o, t.messages && (n.messages[i.name] = A.extend(n.messages[i.name], t.messages));
                        break;
                    case "remove":
                        if (!t) return delete s[i.name], o;
                        var r = {};
                        return A.each(t.split(/\s/), function(e, t) {
                            r[t] = o[t], delete o[t]
                        }), r
                }
            }
            var a = A.validator.normalizeRules(A.extend({}, A.validator.classRules(i), A.validator.attributeRules(i), A.validator.dataRules(i), A.validator.staticRules(i)), i);
            if (a.required) {
                var l = a.required;
                delete a.required, a = A.extend({
                    required: l
                }, a)
            }
            return a
        }
    }), A.extend(A.expr[":"], {
        blank: function(e) {
            return !A.trim("" + A(e).val())
        },
        filled: function(e) {
            return !!A.trim("" + A(e).val())
        },
        unchecked: function(e) {
            return !A(e).prop("checked")
        }
    }), A.validator = function(e, t) {
        this.settings = A.extend(!0, {}, A.validator.defaults, e), this.currentForm = t, this.init()
    }, A.validator.format = function(i, e) {
        return 1 === arguments.length ? function() {
            var e = A.makeArray(arguments);
            return e.unshift(i), A.validator.format.apply(this, e)
        } : (2 < arguments.length && e.constructor !== Array && (e = A.makeArray(arguments).slice(1)), e.constructor !== Array && (e = [e]), A.each(e, function(e, t) {
            i = i.replace(RegExp("\\{" + e + "\\}", "g"), function() {
                return t
            })
        }), i)
    }, A.extend(A.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: A([]),
            errorLabelContainer: A([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(e)).hide())
            },
            onfocusout: function(e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function(e, t) {
                (9 !== t.which || "" !== this.elementValue(e)) && (e.name in this.submitted || e === this.lastElement) && this.element(e)
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function(e, t, i) {
                "radio" === e.type ? this.findByName(e.name).addClass(t).removeClass(i) : A(e).addClass(t).removeClass(i)
            },
            unhighlight: function(e, t, i) {
                "radio" === e.type ? this.findByName(e.name).removeClass(t).addClass(i) : A(e).removeClass(t).addClass(i)
            }
        },
        setDefaults: function(e) {
            A.extend(A.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: A.validator.format("Please enter no more than {0} characters."),
            minlength: A.validator.format("Please enter at least {0} characters."),
            rangelength: A.validator.format("Please enter a value between {0} and {1} characters long."),
            range: A.validator.format("Please enter a value between {0} and {1}."),
            max: A.validator.format("Please enter a value less than or equal to {0}."),
            min: A.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function e(e) {
                    var t = A.data(this[0].form, "validator"),
                        i = "on" + e.type.replace(/^validate/, "");
                    t.settings[i] && t.settings[i].call(t, this[0], e)
                }
                this.labelContainer = A(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || A(this.currentForm), this.containers = A(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var n = this.groups = {};
                A.each(this.settings.groups, function(i, e) {
                    "string" == typeof e && (e = e.split(/\s/)), A.each(e, function(e, t) {
                        n[t] = i
                    })
                });
                var i = this.settings.rules;
                A.each(i, function(e, t) {
                    i[e] = A.validator.normalizeRule(t)
                }), A(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && A(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), A.extend(this.submitted, this.errorMap), this.invalid = A.extend({}, this.errorMap), this.valid() || A(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                return this.valid()
            },
            element: function(e) {
                e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = A(e);
                var t = !1 !== this.check(e);
                return t ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), t
            },
            showErrors: function(t) {
                if (t) {
                    for (var e in A.extend(this.errorMap, t), this.errorList = [], t) this.errorList.push({
                        message: t[e],
                        element: this.findByName(e)[0]
                    });
                    this.successList = A.grep(this.successList, function(e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                A.fn.resetForm && A(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(e) {
                var t = 0;
                for (var i in e) t++;
                return t
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    A(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === A.grep(this.errorList, function(e) {
                    return e.element.name === t.name
                }).length && t
            },
            elements: function() {
                var e = this,
                    t = {};
                return A(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in t || !e.objectLength(A(this).rules())) && (t[this.name] = !0)
                })
            },
            clean: function(e) {
                return A(e)[0]
            },
            errors: function() {
                var e = this.settings.errorClass.replace(" ", ".");
                return A(this.settings.errorElement + "." + e, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = A([]), this.toHide = A([]), this.currentElements = A([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(e) {
                this.reset(), this.toHide = this.errorsFor(e)
            },
            elementValue: function(e) {
                var t = A(e).attr("type"),
                    i = A(e).val();
                return "radio" === t || "checkbox" === t ? A("input[name='" + A(e).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var e, i = A(t).rules(),
                    n = !1,
                    s = this.elementValue(t);
                for (var o in i) {
                    var r = {
                        method: o,
                        parameters: i[o]
                    };
                    try {
                        if ("dependency-mismatch" === (e = A.validator.methods[o].call(this, s, t, r.parameters))) {
                            n = !0;
                            continue
                        }
                        if (n = !1, "pending" === e) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!e) return this.formatAndAdd(t, r), !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.", e), e
                    }
                }
                return n ? void 0 : (this.objectLength(i) && this.successList.push(t), !0)
            },
            customDataMessage: function(e, t) {
                return A(e).data("msg-" + t.toLowerCase()) || e.attributes && A(e).attr("data-msg-" + t.toLowerCase())
            },
            customMessage: function(e, t) {
                var i = this.settings.messages[e];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var e = 0; arguments.length > e; e++)
                    if (void 0 !== arguments[e]) return arguments[e]
            },
            defaultMessage: function(e, t) {
                return this.findDefined(this.customMessage(e.name, t), this.customDataMessage(e, t), !this.settings.ignoreTitle && e.title || void 0, A.validator.messages[t], "<strong>Warning: No message defined for " + e.name + "</strong>")
            },
            formatAndAdd: function(e, t) {
                var i = this.defaultMessage(e, t.method),
                    n = /\$?\{(\d+)\}/g;
                "function" == typeof i ? i = i.call(this, t.parameters, e) : n.test(i) && (i = A.validator.format(i.replace(n, "{$1}"), t.parameters)), this.errorList.push({
                    message: i,
                    element: e
                }), this.errorMap[e.name] = i, this.submitted[e.name] = i
            },
            addWrapper: function(e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
            },
            defaultShowErrors: function() {
                var e, t;
                for (e = 0; this.errorList[e]; e++) {
                    var i = this.errorList[e];
                    this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return A(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, t) {
                var i = this.errorsFor(e);
                i.length ? (i.removeClass(this.settings.validClass).addClass(this.settings.errorClass), i.html(t)) : (i = A("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(t || ""), this.settings.wrapper && (i = i.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(i).length || (this.settings.errorPlacement ? this.settings.errorPlacement(i, A(e)) : i.insertAfter(e))), !t && this.settings.success && (i.text(""), "string" == typeof this.settings.success ? i.addClass(this.settings.success) : this.settings.success(i, e)), this.toShow = this.toShow.add(i)
            },
            errorsFor: function(e) {
                var t = this.idOrName(e);
                return this.errors().filter(function() {
                    return A(this).attr("for") === t
                })
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function(e) {
                return this.checkable(e) && (e = this.findByName(e.name).not(this.settings.ignore)[0]), e
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function(e) {
                return A(this.currentForm).find("[name='" + e + "']")
            },
            getLength: function(e, t) {
                switch (t.nodeName.toLowerCase()) {
                    case "select":
                        return A("option:selected", t).length;
                    case "input":
                        if (this.checkable(t)) return this.findByName(t.name).filter(":checked").length
                }
                return e.length
            },
            depend: function(e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
            },
            dependTypes: {
                boolean: function(e) {
                    return e
                },
                string: function(e, t) {
                    return !!A(e, t.form).length
                },
                function: function(e, t) {
                    return e(t)
                }
            },
            optional: function(e) {
                var t = this.elementValue(e);
                return !A.validator.methods.required.call(this, t, e) && "dependency-mismatch"
            },
            startRequest: function(e) {
                this.pending[e.name] || (this.pendingRequest++, this.pending[e.name] = !0)
            },
            stopRequest: function(e, t) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], t && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (A(this.currentForm).submit(), this.formSubmitted = !1) : !t && 0 === this.pendingRequest && this.formSubmitted && (A(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(e) {
                return A.data(e, "previousValue") || A.data(e, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(e, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(e, t) {
            e.constructor === String ? this.classRuleSettings[e] = t : A.extend(this.classRuleSettings, e)
        },
        classRules: function(e) {
            var t = {},
                i = A(e).attr("class");
            return i && A.each(i.split(" "), function() {
                this in A.validator.classRuleSettings && A.extend(t, A.validator.classRuleSettings[this])
            }), t
        },
        attributeRules: function(e) {
            var t = {},
                i = A(e),
                n = i[0].getAttribute("type");
            for (var s in A.validator.methods) {
                var o;
                o = "required" === s ? ("" === (o = i.get(0).getAttribute(s)) && (o = !0), !!o) : i.attr(s), /min|max/.test(s) && (null === n || /number|range|text/.test(n)) && (o = Number(o)), o ? t[s] = o : n === s && "range" !== n && (t[s] = !0)
            }
            return t.maxlength && /-1|2147483647|524288/.test(t.maxlength) && delete t.maxlength, t
        },
        dataRules: function(e) {
            var t, i, n = {},
                s = A(e);
            for (t in A.validator.methods) void 0 !== (i = s.data("rule-" + t.toLowerCase())) && (n[t] = i);
            return n
        },
        staticRules: function(e) {
            var t = {},
                i = A.data(e.form, "validator");
            return i.settings.rules && (t = A.validator.normalizeRule(i.settings.rules[e.name]) || {}), t
        },
        normalizeRules: function(n, s) {
            return A.each(n, function(e, t) {
                if (!1 !== t) {
                    if (t.param || t.depends) {
                        var i = !0;
                        switch (typeof t.depends) {
                            case "string":
                                i = !!A(t.depends, s.form).length;
                                break;
                            case "function":
                                i = t.depends.call(s, s)
                        }
                        i ? n[e] = void 0 === t.param || t.param : delete n[e]
                    }
                } else delete n[e]
            }), A.each(n, function(e, t) {
                n[e] = A.isFunction(t) ? t(s) : t
            }), A.each(["minlength", "maxlength"], function() {
                n[this] && (n[this] = Number(n[this]))
            }), A.each(["rangelength", "range"], function() {
                var e;
                n[this] && (A.isArray(n[this]) ? n[this] = [Number(n[this][0]), Number(n[this][1])] : "string" == typeof n[this] && (e = n[this].split(/[\s,]+/), n[this] = [Number(e[0]), Number(e[1])]))
            }), A.validator.autoCreateRanges && (n.min && n.max && (n.range = [n.min, n.max], delete n.min, delete n.max), n.minlength && n.maxlength && (n.rangelength = [n.minlength, n.maxlength], delete n.minlength, delete n.maxlength)), n
        },
        normalizeRule: function(e) {
            if ("string" == typeof e) {
                var t = {};
                A.each(e.split(/\s/), function() {
                    t[this] = !0
                }), e = t
            }
            return e
        },
        addMethod: function(e, t, i) {
            A.validator.methods[e] = t, A.validator.messages[e] = void 0 !== i ? i : A.validator.messages[e], t.length < 3 && A.validator.addClassRules(e, A.validator.normalizeRule(e))
        },
        methods: {
            required: function(e, t, i) {
                if (!this.depend(i, t)) return "dependency-mismatch";
                if ("select" !== t.nodeName.toLowerCase()) return this.checkable(t) ? 0 < this.getLength(e, t) : 0 < A.trim(e).length;
                var n = A(t).val();
                return n && 0 < n.length
            },
            email: function(e, t) {
                return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)
            },
            url: function(e, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)
            },
            date: function(e, t) {
                return this.optional(t) || !/Invalid|NaN/.test("" + new Date(e))
            },
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(e)
            },
            number: function(e, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            creditcard: function(e, t) {
                if (this.optional(t)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(e)) return !1;
                for (var i = 0, n = 0, s = !1, o = (e = e.replace(/\D/g, "")).length - 1; 0 <= o; o--) {
                    var r = e.charAt(o);
                    n = parseInt(r, 10), s && 9 < (n *= 2) && (n -= 9), i += n, s = !s
                }
                return 0 == i % 10
            },
            minlength: function(e, t, i) {
                var n = A.isArray(e) ? e.length : this.getLength(A.trim(e), t);
                return this.optional(t) || i <= n
            },
            maxlength: function(e, t, i) {
                var n = A.isArray(e) ? e.length : this.getLength(A.trim(e), t);
                return this.optional(t) || n <= i
            },
            rangelength: function(e, t, i) {
                var n = A.isArray(e) ? e.length : this.getLength(A.trim(e), t);
                return this.optional(t) || n >= i[0] && i[1] >= n
            },
            min: function(e, t, i) {
                return this.optional(t) || i <= e
            },
            max: function(e, t, i) {
                return this.optional(t) || e <= i
            },
            range: function(e, t, i) {
                return this.optional(t) || e >= i[0] && i[1] >= e
            },
            equalTo: function(e, t, i) {
                var n = A(i);
                return this.settings.onfocusout && n.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    A(t).valid()
                }), e === n.val()
            },
            remote: function(o, r, e) {
                if (this.optional(r)) return "dependency-mismatch";
                var a = this.previousValue(r);
                if (this.settings.messages[r.name] || (this.settings.messages[r.name] = {}), a.originalMessage = this.settings.messages[r.name].remote, this.settings.messages[r.name].remote = a.message, e = "string" == typeof e && {
                        url: e
                    } || e, a.old === o) return a.valid;
                a.old = o;
                var l = this;
                this.startRequest(r);
                var t = {};
                return t[r.name] = o, A.ajax(A.extend(!0, {
                    url: e,
                    mode: "abort",
                    port: "validate" + r.name,
                    dataType: "json",
                    data: t,
                    success: function(e) {
                        l.settings.messages[r.name].remote = a.originalMessage;
                        var t = !0 === e || "true" === e;
                        if (t) {
                            var i = l.formSubmitted;
                            l.prepareElement(r), l.formSubmitted = i, l.successList.push(r), delete l.invalid[r.name], l.showErrors()
                        } else {
                            var n = {},
                                s = e || l.defaultMessage(r, "remote");
                            n[r.name] = a.message = A.isFunction(s) ? s(o) : s, l.invalid[r.name] = !0, l.showErrors(n)
                        }
                        a.valid = t, l.stopRequest(r, t)
                    }
                }, e)), "pending"
            }
        }
    }), A.format = A.validator.format,
    function(n) {
        var s = {};
        if (n.ajaxPrefilter) n.ajaxPrefilter(function(e, t, i) {
            var n = e.port;
            "abort" === e.mode && (s[n] && s[n].abort(), s[n] = i)
        });
        else {
            var o = n.ajax;
            n.ajax = function(e) {
                var t = ("mode" in e ? e : n.ajaxSettings).mode,
                    i = ("port" in e ? e : n.ajaxSettings).port;
                return "abort" === t ? (s[i] && s[i].abort(), s[i] = o.apply(this, arguments), s[i]) : o.apply(this, arguments)
            }
        }
    }(jQuery), (I = jQuery).extend(I.fn, {
        validateDelegate: function(i, e, n) {
            return this.bind(e, function(e) {
                var t = I(e.target);
                return t.is(i) ? n.apply(t, arguments) : void 0
            })
        }
    }), jQuery(function(t) {
        var i = t("#feedbackform");
        i.length && i.validate({
            rules: {
                name: {
                    required: !0,
                    minlength: 2
                },
                email: {
                    required: !0,
                    email: !0
                },
                message: {
                    required: !0
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "Please enter your email"
                },
                message: {
                    required: "Please enter your message"
                }
            },
            submitHandler: function(e) {
                t(e).ajaxSubmit({
                    type: "POST",
                    data: t(e).serialize(),
                    url: "external/form/contact-form.php",
                    success: function() {
                        t("#success").fadeIn(), i.each(function() {
                            this.reset()
                        })
                    },
                    error: function() {
                        i.fadeTo("slow", 1, function() {
                            t("#error").fadeIn()
                        })
                    }
                })
            }
        });
        var n = t("#subscribeform");
        n.length && n.validate({
            rules: {
                email: {
                    required: !0,
                    email: !0
                }
            },
            submitHandler: function(e) {
                t(e).ajaxSubmit({
                    type: "POST",
                    data: t(e).serialize(),
                    url: "external/form/newsletter-form.php",
                    success: function() {
                        t("#success").fadeIn(), n.each(function() {
                            this.reset()
                        })
                    },
                    error: function() {
                        n.fadeTo("slow", 1, function() {
                            t("#error").fadeIn()
                        })
                    }
                })
            }
        });
        var s = t("#jsFormMakeAppointment");
        s.length && s.validate({
            rules: {
                name: {
                    required: !0,
                    minlength: 2
                },
                email: {
                    required: !0,
                    email: !0
                },
                message: {
                    required: !0
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "Please enter your email"
                },
                message: {
                    required: "Please enter your message"
                }
            },
            submitHandler: function(e) {
                t(e).ajaxSubmit({
                    type: "POST",
                    data: t(e).serialize(),
                    url: "external/form/modal-make-appointment.php",
                    success: function() {
                        t("#success").fadeIn(), s.each(function() {
                            this.reset()
                        })
                    },
                    error: function() {
                        s.fadeTo("slow", 1, function() {
                            t("#error").fadeIn()
                        })
                    }
                })
            }
        });
        var o = t("#feedbackComment");
        o.length && o.validate({
            rules: {
                name: {
                    required: !0,
                    minlength: 2
                },
                email: {
                    required: !0,
                    email: !0
                },
                message: {
                    required: !0
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "Please enter your email"
                },
                message: {
                    required: "Please enter your message"
                }
            },
            submitHandler: function(e) {
                t(e).ajaxSubmit({
                    type: "POST",
                    data: t(e).serialize(),
                    url: "external/form/comment-form.php",
                    success: function() {
                        t("#success").fadeIn(), o.each(function() {
                            this.reset()
                        })
                    },
                    error: function() {
                        o.fadeTo("slow", 1, function() {
                            t("#error").fadeIn()
                        })
                    }
                })
            }
        })
    }), W = jQuery, L = {
        init: function(e) {
            return this.each(function() {
                var e = W(this),
                    t = e.find(".tt-item.tt-item__open"),
                    i = e.find(".tt-item .tt-item__title");
                t.find(".tt-item__content").slideToggle(100), i.on("click", function() {
                    W(this).parent().hasClass("tt-item__open") || W(this).parent().siblings().removeClass("tt-item__open").find(".tt-item__content").slideUp(200), W(this).next().slideToggle(200).parent().toggleClass("tt-item__open")
                })
            })
        }
    }, W.fn.accordeon = function(e) {
        return L[e] ? L[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? (console.info("Action " + e + "not found this plugin"), this) : L.init.apply(this, arguments)
    }, W("#tt-pageContent .js-accordeon").accordeon(), F = jQuery, H = F("#js-backtotop"), O = F(window), H.length && (H.on("click", function(e) {
        return F("html, body").animate({
            scrollTop: 0
        }, 500), !1
    }), O.scroll(function() {
        500 < O.scrollTop() ? H.stop((!0).false).addClass("pt-show") : H.stop((!0).false).removeClass("pt-show")
    })),
    function(e) {
        var t, i, n = jQuery("html");
        t = navigator.userAgent.toLowerCase(), i = function(e) {
            return -1 != t.indexOf(e)
        }, n.addClass([!/opera|webtv/i.test(t) && /msie (\d)/.test(t) ? "ie ie" + RegExp.$1 : i("firefox/2") ? "gecko ff2" : i("firefox/3") ? "gecko ff3" : i("gecko/") ? "gecko" : i("opera/9") ? "opera opera9" : /opera (\d)/.test(t) ? "opera opera" + RegExp.$1 : i("konqueror") ? "konqueror" : i("applewebkit/") ? "webkit safari" : i("mozilla/") ? "gecko" : "", i("x11") || i("linux") ? " linux" : i("mac") ? " mac" : i("win") ? " win" : ""].join(""));
        ("ontouchstart" in window || "onmsgesturechange" in window) && n.addClass("touch-device"), /Edge/.test(navigator.userAgent) && n.addClass("edge")
    }(),
    function(t) {
        var i = t("#tt-nav");
        if (!i.length) return;
        var n;
        i.find("> ul > li").each(function() {
            0 != t(this).children("ul").length && t(this).addClass("subMenu")
        }), n = window.location.href.split("#")[0].split("/").pop() || "index.html", i.find("li").each(function() {
            var e = t(this).find("a").attr("href");
            n == e && (t(this).addClass("active").closest(".subMenu").addClass("active"), i.addClass("defined-item"))
        }), i.hasClass("defined-item") || i.find("> ul > li:first-child").addClass("active"), i.find("li").on("mouseenter mouseleave", function(e) {
            t(this).toggleClass("is-hover")
        })
    }(jQuery),
    function(i) {
        if (!i("#tt-header .js-dropdown-cart").length) return;

        function n() {
            i("#tt-header .js-dropdown-cart").each(function() {
                i(this).removeClass("active"), setTimeout(function() {
                    i("#tt-header .js-dropdown-cart").find(".tt-obj__dropdown").children().remove()
                }, 200)
            })
        }
        i("body").on("click touchstart", ".js-dropdown-cart .tt-obj__btn", function(e) {
            if (e.preventDefault(), i(this).closest(".js-dropdown-cart").hasClass("active")) return n(), !1;
            i.ajax({
                url: "ajax-content/cart-dropdown.php",
                success: function(e) {
                    var t = i(e);
                    i(".js-dropdown-cart .tt-obj__dropdown").append(t)
                }
            }), i(this).closest(".tt-obj-cart").toggleClass("active")
        }), i("body").on("click touchstart", ".js-dropdown-cart .tt-obj__dropdown-close", function(e) {
            n()
        }), i(document).mouseup(function(e) {
            var t = i("#tt-header .js-dropdown-cart");
            t.is(e.target) || 0 !== t.has(e.target).length || n()
        }), i(window).resize(N(function(e) {
            n()
        }))
    }(jQuery),
    function(i) {
        var n = i("#filter-nav"),
            s = i("#filter-layout");
        if (!n.length && !s.length) return;
        var e;
        e = n.find(".active a").attr("href"), s.find("." + e).addClass("show");
        i("body").on("click touchstart", "#filter-nav .gallery-navitem", function(e) {
            if (e.preventDefault(), i(this).closest("li").hasClass("active")) return !1;
            i(this).closest("li").addClass("active").siblings().removeClass("active");
            var t = n.find(".active a").attr("href");
            s.find(".show").removeClass("show"), s.find("." + t).addClass("show")
        });
        var o = i("#js-more-include");
        if (!o.length) return;
        i("body").on("click touchstart", "#js-more-include > *", function(e) {
            var t = i("#js-more-include").data("include");
            e.preventDefault(), i.ajax({
                url: t,
                success: function(e) {
                    var t = i(e);
                    o.parent().append(t), o.remove()
                }
            })
        })
    }(jQuery),
    function(t) {
        var i = t("#f-nav");
        if (!i.length) return;
        var n;
        n = window.location.href.split("#")[0].split("/").pop() || "index.html", i.find("li").each(function() {
            var e = t(this).find("a").attr("href");
            n == e && (t(this).addClass("active").closest(".subMenu").addClass("active"), i.addClass("defined-item"))
        }), i.hasClass("defined-item") || i.find("> ul > li:first-child").addClass("active")
    }(jQuery),
    function(e) {
        if (!jQuery("#slider-snap").length) return;
        ! function() {
            var e = document.getElementById("slider-snap");
            if (e) {
                noUiSlider.create(e, {
                    start: [10, 5e3],
                    snap: !0,
                    connect: !0,
                    range: {
                        min: 10,
                        "10%": 10,
                        "20%": 1e3,
                        "30%": 2500,
                        "40%": 2e3,
                        "50%": 3500,
                        "60%": 3e3,
                        "70%": 3500,
                        "80%": 4e3,
                        "00%": 4500,
                        max: 5e3
                    }
                });
                var i = [document.getElementById("slider-snap-value-lower"), document.getElementById("slider-snap-value-upper")];
                e.noUiSlider.on("update", function(e, t) {
                    i[t].innerHTML = e[t]
                })
            }
        }()
    }(), jQuery("#tt-pageContent [data-slick]").slick({
        lazyLoad: "progressive",
        dots: !0,
        arrows: !1,
        infinite: !0,
        speed: 300,
        autoplay: !0,
        adaptiveHeight: !0,
        slidesToScroll: 1,
        pauseOnFocus: !1,
        pauseOnHover: !1
    }),
    function(i) {
        function t() {
            var e = i("#tt-pageContent .js-init-carusel-04"),
                t = window.innerWidth || document.body.clientWidth;
            if (!e.length) return !1;
            t <= 1024 ? e.slick({
                lazyLoad: "progressive",
                dots: !0,
                arrows: !1,
                infinite: !0,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: !0,
                autoplay: !0,
                autoplaySpeed: 4500,
                pauseOnFocus: !1,
                pauseOnHover: !1
            }) : e.filter(".slick-initialized").slick("unslick")
        }
        t(), i(window).resize(N(function(e) {
            t()
        }))
    }(jQuery),
    function(i) {
        function t() {
            var e = i("#tt-pageContent .js-init-carusel-05"),
                t = window.innerWidth || document.body.clientWidth;
            if (!e.length) return !1;
            t <= 1024 ? e.slick({
                lazyLoad: "progressive",
                dots: !0,
                arrows: !1,
                infinite: !0,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 1,
                adaptiveHeight: !0,
                autoplay: !0,
                autoplaySpeed: 2e3,
                pauseOnFocus: !1,
                pauseOnHover: !1,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }]
            }) : e.filter(".slick-initialized").slick("unslick")
        }
        t(), i(window).resize(N(function(e) {
            t()
        }))
    }(jQuery),
    function(s) {
        if (!s("#tt-pageContent .tt-slideinfo").length) return;
        s("#tt-pageContent .tt-slideinfo").on("mouseenter", function() {
            s(this).addClass("wide active").siblings().addClass("short")
        }).on("mouseleave", function() {
            s(this).removeClass("active").siblings().removeClass("short")
        }), s("body").on("click touchstart", ".tt-slideinfo .tt-item__btn > *", function(e) {
            var t, i, n = s(this);
            return s(this).closest(".tt-slideinfo").hasClass("open-info") ? ((i = n).html("+"), i.closest(".tt-slideinfo").removeClass("open-info")) : ((t = n).html("-"), t.closest(".tt-slideinfo").siblings().removeClass("open-info").find(".tt-item__btn  > *").html("+"), t.closest(".tt-slideinfo").addClass("open-info")), !1
        });

        function t() {
            var e = s("#tt-pageContent .tt-slideinfo-wrapper"),
                t = window.innerWidth || document.body.clientWidth;
            if (!e.length) return !1;
            t <= 767 ? e.slick({
                dots: !0,
                arrows: !1,
                infinite: !0,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1,
                adaptiveHeight: !0,
                autoplay: !0,
                autoplaySpeed: 2e3,
                responsive: [{
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            }) : e.filter(".slick-initialized").slick("unslick")
        }
        t(), s(window).resize(N(function(e) {
            t()
        }))
    }(jQuery),
    function(e) {
        e.fn.datepicker.language.en = {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear",
            dateFormat: "mm/dd/yyyy",
            timeFormat: "hh:ii aa",
            firstDay: 0
        };
        e("#modalMakeAppointment .js_datepicker-1").datepicker({
            language: "en"
        }).data("datepicker"), e("#orderform .datepicker-1").datepicker({
            language: "en"
        }).data("datepicker")
    }(jQuery),
    function(e) {
        var t = e("#tt-nav"),
            i = e("#tt-menu-toggle");
        if (t && i) {
            var n = t.find("ul").first().children().clone();
            e("#mobile-menu").find("ul").append(n), i.initMM({
                enable_breakpoint: !0,
                mobile_button: !0,
                breakpoint: 1025
            })
        }
    }(jQuery), P = jQuery, (M = P("#tt-pageContent .js-video-popup")).length && M.each(function() {
        P(this).magnificPopup({
            type: "iframe",
            iframe: {
                patterns: {
                    dailymotion: {
                        index: "dailymotion.com",
                        id: function(e) {
                            var t = e.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                            return null !== t ? void 0 !== t[4] ? t[4] : t[2] : null
                        },
                        src: "https://www.dailymotion.com/embed/video/%id%"
                    }
                }
            }
        })
    }), jQuery("#tt-pageContent .js-wrapper-gallery").magnificPopup({
        delegate: ".tt-gallery",
        type: "image",
        gallery: {
            enabled: !0
        }
    }),
    function(r) {
        function t() {
            if ((window.innerWidth || r(window).width()) <= 786) return r("#tt-pageContent .layout01").each(function() {
                r(this).find(".layout01__content-wrapper").removeAttr("style")
            }), !1;
            r("#tt-pageContent .layout01").each(function() {
                r(this).find(".layout01__content-wrapper").removeAttr("style");
                var e = r(this).find(".tt-img-main"),
                    t = parseInt(e.height() + 1, 10),
                    i = r(this).find(".layout01__content");
                if (parseInt(i.innerHeight(), 10) < t) {
                    var n = r(this).find(".layout01__content-wrapper"),
                        s = parseInt(n.css("margin-top"), 10),
                        o = parseInt(t - s, 10);
                    n.css("min-height", o)
                }
            })
        }
        r(window).on("load", function() {
            t()
        }), r(window).resize(N(function(e) {
            t()
        }))
    }(jQuery), jQuery, document.addEventListener("lazybeforeunveil", function(e) {
        var t = e.target.getAttribute("data-bg");
        t && (e.target.style.backgroundImage = "url(" + t + ")")
    }), R = jQuery, j = R("body"), setTimeout(function() {
        j.addClass("loaded")
    }, 1500), R(window).on("load", function() {
        return j.addClass("loaded"), !1
    }),
    function(r) {
        "use strict";
        var e, t, i = r("body"),
            n = {
                mainSlider: r("#js-mainSlider")
            };

        function a(e) {
            e.each(function() {
                var e = r(this),
                    t = e.data("animation-delay"),
                    i = "animated " + e.data("animation");
                e.css({
                    "animation-delay": t,
                    "-webkit-animation-delay": t
                }), e.addClass(i).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    e.removeClass(i)
                }), e.hasClass("animate") && e.removeClass("animation")
            })
        }
        n.mainSlider.length && ((e = n.mainSlider).find(".slide").first().imagesLoaded({
            background: !0
        }, function() {
            setTimeout(function() {
                e.parent().find(".loading-content").addClass("disable"), i.addClass("load-mainslider")
            }, 300)
        }), e.on("init", function(e, t) {
            var i = r("div.slide:first-child").find("[data-animation]");
            a(i)
        }), e.on("beforeChange", function(e, t, i, n) {
            var s = r('div.slide[data-slick-index="' + n + '"]'),
                o = s.find("[data-animation]");
            a(o)
        }), e.slick({
            arrows: !1,
            dots: !1,
            autoplay: !0,
            autoplaySpeed: 5500,
            fade: !0,
            speed: 1e3,
            pauseOnHover: !1,
            pauseOnDotsHover: !0,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: !1
                }
            }, {
                breakpoint: 1025,
                settings: {
                    dots: !1,
                    arrows: !1
                }
            }]
        })), t = "[data-bgslide]", n.mainSlider.find(t).each(function() {
            var e = r(this),
                t = e.attr("data-bgslide");
            e.css({
                "background-image": "url(" + t + ")"
            })
        })
    }(jQuery);
var B = document.getElementById("map"),
    Y = document.getElementById("map-contact");
if (B) {
    google.maps.event.addDomListener(window, "load", function() {
        var e = {
                zoom: 12,
                center: new google.maps.LatLng(40.67, -73.94),
                scrollwheel: !1,
                styles: [{
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#abd0fa"
                    }]
                }, {
                    featureType: "transit",
                    stylers: [{
                        color: "#808080"
                    }, {
                        visibility: "off"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#e1d9c6"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#eee9da"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "000"
                    }, {
                        weight: 1.8
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#d7d7d7"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#ebebeb"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [{
                        color: "#eee9da"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#fffbf8"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#fffbf8"
                    }]
                }, {
                    featureType: "landscape",
                    elementType: "geometry.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#fbf7ee"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#d6d6d6"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#3c3424"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#d6d6d6"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#aee9c6"
                    }]
                }]
            },
            t = document.getElementById("map"),
            i = new google.maps.Map(t, e);
        new google.maps.Marker({
            position: new google.maps.LatLng(40.67, -73.94),
            map: i,
            icon: "images/beachflag.png",
            title: "Snazzy!"
        })
    })
}
if (Y) {
    google.maps.event.addDomListener(window, "load", function() {
        var e = {
                zoom: 12,
                center: new google.maps.LatLng(40.67, -73.94),
                scrollwheel: !1,
                styles: [{
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#abd0fa"
                    }]
                }, {
                    featureType: "transit",
                    stylers: [{
                        color: "#808080"
                    }, {
                        visibility: "off"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#e1d9c6"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#eee9da"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "000"
                    }, {
                        weight: 1.8
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#d7d7d7"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#ebebeb"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [{
                        color: "#eee9da"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#fffbf8"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#fffbf8"
                    }]
                }, {
                    featureType: "landscape",
                    elementType: "geometry.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#fbf7ee"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#d6d6d6"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#3c3424"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#d6d6d6"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#aee9c6"
                    }]
                }]
            },
            t = document.getElementById("map-contact"),
            i = new google.maps.Map(t, e);
        new google.maps.Marker({
            position: new google.maps.LatLng(40.67, -73.94),
            map: i,
            icon: "images/beachflag.png",
            title: "Snazzy!"
        })
    })
}! function(a) {
    var e = a("#mobile-product");
    e.length && e.slick({
        dots: !0,
        arrows: !1,
        infinite: !0,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: !0,
        lazyLoad: "progressive"
    }), {
        scroll_zoom: !0,
        class_name: ".zoom-product",
        thumb_parent: a("#smallGallery"),
        scrollslider_parent: a(".slider-scroll-product"),
        checkNoZoom: function() {
            return a(this.class_name).parent().parent().hasClass("no-zoom")
        },
        init: function(e) {
            var t = this,
                i = window.innerWidth || a(window).width(),
                n = a(t.class_name),
                s = t.thumb_parent;
            if (t.initBigGalleryButtons(), t.scrollSlider(), 0 == n.length) return !1;
            if (!t.checkNoZoom()) {
                var o = n.parent().parent().attr("data-scrollzoom");
                o = o || t.scroll_zoom, t.scroll_zoom = "false" != o, 575 < i && t.configureZoomImage(), t.resize()
            }
            if (0 == s.length) return !1;
            t[-1 < s.parent().attr("class").indexOf("-vertical") ? "vertical" : "horizontal"](s), t.setBigImage(s)
        },
        configureZoomImage: function() {
            var e = this;
            a(".zoomContainer").remove(), a(this.class_name).each(function() {
                var e = a(this),
                    t = e.removeData("elevateZoom").clone();
                e.after(t).remove()
            }), setTimeout(function() {
                a(e.class_name).elevateZoom({
                    gallery: e.thumb_parent.attr("id"),
                    zoomType: "inner",
                    scrollZoom: Boolean(e.scroll_zoom),
                    cursor: "crosshair",
                    zoomWindowFadeIn: 300,
                    zoomWindowFadeOut: 300
                })
            }, 100)
        },
        resize: function() {
            var e = this;
            a(window).resize(function() {
                if ((window.innerWidth || a(window).width()) <= 575) return !1;
                e.configureZoomImage()
            })
        },
        horizontal: function(e) {
            e.slick({
                infinite: !0,
                dots: !1,
                arrows: !0,
                slidesToShow: 4,
                slidesToScroll: 1,
                nextArrow: '<a href="#" class="tt-custom-next"><i class="tt-icon icon-arrowhead-pointing-to-the-right-1"></i><span class="tt-text">more</span></button>',
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                }]
            })
        },
        vertical: function(e) {
            e.slick({
                vertical: !0,
                infinite: !0,
                slidesToShow: 4,
                slidesToScroll: 1,
                verticalSwiping: !0,
                arrows: !0,
                dots: !1,
                centerPadding: "0px",
                customPaging: "0px",
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                }]
            })
        },
        initBigGalleryButtons: function() {
            var e = a(".bigGallery");
            if (0 == e.length) return !1;
            a("body").on("mouseenter", ".zoomContainer", function() {
                e.find("button").addClass("show")
            }).on("mouseleave", ".zoomContainer", function() {
                e.find("button").removeClass("show")
            })
        },
        scrollSlider: function() {
            var i = this.scrollslider_parent;
            if (0 == i.length) return !1;
            i.on("init", function(e, t) {
                i.css({
                    opacity: 1
                })
            }), i.css({
                opacity: 0
            }).slick({
                infinite: !1,
                vertical: !0,
                verticalScrolling: !0,
                dots: !0,
                arrows: !1,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            }).mousewheel(function(e) {
                e.preventDefault(), e.deltaY < 0 ? a(this).slick("slickNext") : a(this).slick("slickPrev")
            })
        },
        setBigImage: function(o) {
            var r = this;
            o.find("a").on("click", function(e) {
                r.checkNoZoom() && e.preventDefault();
                var t = a(r.class_name),
                    i = r.checkNoZoom() ? "data-image" : "data-zoom-image",
                    n = r.checkNoZoom() ? "src" : "data-zoom-image",
                    s = a(this).attr(i);
                if (t.attr(n, s), !r.checkNoZoom()) return !1;
                o.find(".zoomGalleryActive").removeClass("zoomGalleryActive"), a(this).addClass("zoomGalleryActive")
            })
        }
    }.init();
    var t = a(".tt-input-counter");
    t.length && (t.find(".minus-btn, .plus-btn").on("click", function(e) {
        var t = a(this).parent().find("input"),
            i = parseInt(t.val(), 10) + parseInt("plus-btn" === e.currentTarget.className ? 1 : -1, 10);
        t.val(i).change()
    }), t.find("input").change(function() {
        var e = a(this),
            t = parseInt(e.val(), 10),
            i = parseInt(e.attr("size"), 10);
        t = Math.min(t, i), t = Math.max(t, 1), e.val(t)
    }).on("keypress", function(e) {
        13 === e.keyCode && e.preventDefault()
    }))
}(jQuery),
function(n) {
    var s = n("#js-filters-toggle"),
        o = n("#aside-js"),
        r = n("body"),
        a = n("html");
    if (s.length && s.length) {
        function l(e) {
            o.removeClass("column-open").perfectScrollbar("destroy");
            var t = -1 * parseInt(r.css("top").replace("px", ""), 10);
            return s.removeClass("tt-open-col"), r.removeAttr("style").removeClass("no-scroll").scrollTop(t), a.removeAttr("style").scrollTop(t), n("#modal-filter").off().remove(), !1
        }
        n("body").on("click", "#js-filters-toggle", function(e) {
            n(this).hasClass("tt-open-col") ? l() : function(e) {
                s.addClass("tt-open-col");
                var t = r.scrollTop() || a.scrollTop();
                o.addClass("column-open").perfectScrollbar(), r.css("top", -t).addClass("no-scroll").append('<div id="modal-filter"></div>');
                var i = n("#modal-filter").fadeTo("fast", 1);
                i.length && i.on("click", function() {
                    l()
                })
            }()
        }), n(window).on("resize", function() {
            r.hasClass("no-scroll") && l()
        })
    }
}(jQuery), window.onload = function() {
        var e = document.getElementById("js-init-sticky"),
            t = function(e) {
                for (var t = 0, i = 0; t += e.offsetTop || 0, i += e.offsetLeft || 0, e = e.offsetParent;);
                return {
                    top: t,
                    left: i
                }
            }(e),
            i = document.getElementById("js-filters-toggle");
        window.onscroll = function() {
            (document.documentElement.scrollTop || document.body.scrollTop) > t.top ? (e.classList.add("fixed"), i && i.classList.add("fixed")) : (e.classList.remove("fixed"), i && i.classList.remove("fixed"))
        }
    },
    function(e) {
        var t = e("#tt-header"),
            i = e(window);

        function n() {
            0 < i.scrollTop() ? t.addClass("stuck") : t.removeClass("stuck")
        }
        t.length && (i.scroll(function() {
            n()
        }), n())
    }(jQuery),
    function(t) {
        if (!t("#js-toggle-h-holder").length) return;
        t("body").on("click", "#js-toggle-h-holder", function(e) {
            return t(this).toggleClass("active").prev().slideToggle(300), !1
        })
    }(jQuery),
    function(t) {
        if (!t("#js-toggle-orderform").length) return;
        t("body").on("click", "#js-toggle-orderform", function(e) {
            return t(this).toggleClass("active").next().slideToggle(300), !1
        })
    }(jQuery);