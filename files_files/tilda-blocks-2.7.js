 
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
    }
  }
} 
function t190_scrollToTop(){
    $('html, body').animate({scrollTop: 0}, 700);								
}	  
 
function t228__init(recid) {
    var el = $('#rec' + recid);
    var mobile = el.find('.t228__mobile');
    var fixedBlock = mobile.css('position') === 'fixed' && mobile.css('display') === 'block';

    setTimeout(function() {
        el.on('click', '.t-menusub__target-link', function () {
            if (isMobile) {
                if ($(this).hasClass('t-menusub__target-link_active')) {
                    el.find('.t228').trigger('overflow');
                } else {
                    el.find('.t228').trigger('nooverflow');
                }
            }
        });
        el.find('.t-menu__link-item:not(.t-menusub__target-link):not(.tooltipstered):not(.t794__tm-link)').on('click', function () {
            if ($(this).is('.tooltipstered, .t-menusub__target-link, .t794__tm-link, .t966__tm-link, .t978__tm-link')) { return; }
            if (fixedBlock) {
                mobile.trigger('click');
            }
        });

        el.find('.t-menusub__link-item').on('click', function () {
            if (fixedBlock) {
                mobile.trigger('click');
            }
        });
        
        el.find('.t228__right_buttons_but .t-btn').on('click', function () {
            if (fixedBlock) {
                mobile.trigger('click');
            }
        });
        
        el.find('.t228__positionabsolute');
        
        el.find('.t228').on('overflow', function() {
            t228_checkOverflow(recid);
        });
        
        el.find('.t228').on('nooverflow', function() {
            t228_checkNoOverflow(recid);
        });
    }, 500);
}

function t228_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1);
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1);
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1);
    }
    if (pathname == "") {
        pathname = "/";
    }
    $(".t228__list_item a[href='" + url + "']").addClass("t-active");
    $(".t228__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "/']").addClass("t-active");
}

function t228_checkAnchorLinks(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        var t228_navLinks = el.find(".t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function () {
                t228_catchScroll(t228_navLinks);
            }, 500);
        }
    }
}

function t228_checkOverflow(recid) {
    var el = $('#rec' + recid);
    var menu = el.find('.t228');
    var winHeight = $(window).height();
    
    if (menu.css('position') === 'fixed') {
        menu.addClass('t228__overflow');
        menu[0].style.setProperty('height', winHeight - $('.t228__mobile_container').outerHeight(true) + 'px', 'important');
    }
}

function t228_checkNoOverflow(recid) {
    var el = $('#rec' + recid);
    var menu = el.find('.t228');
    var submenus = el.find('.t966__tooltip-menu_mobile');
    
    if (menu.css('position') === 'fixed') {
        menu.removeClass('t228__overflow');
        menu[0].style.setProperty('height', 'auto');
    }
}


function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = [],
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function () {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection);
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this);
    });
    
    t228_sections.sort(function (a, b) {
        return b.offset().top - a.offset().top
    });

    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);

    t228_navLinks.click(function () {
        var clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function () {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function () {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
            }, t228_interval - (t228_now - t228_lastCall));
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
        }
    });
}

function t228_getSectionByHref(curlink) {
    var curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + curLinkValue + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + curLinkValue + "']");
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop();
    var t228_valueToReturn = t228_clickedSectionId;

    /*if first section is not at the page top (under first blocks)*/
    if (t228_sections.length !== 0 && t228_clickedSectionId === null && t228_sections[t228_sections.length - 1].offset().top > (t228_scrollPosition + 300)) {
        t228_navLinks.removeClass('t-active');
        return null;
    }

    $(t228_sections).each(function (e) {
        var t228_curSection = $(this),
            t228_id = t228_curSection.attr('id'),
            t228_sectionTop = t228_curSection.offset().top,
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];

        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null;
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null;
                }
            }
            return false;
        }
    });

    return t228_valueToReturn;
}

function t228_setWidth(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var left_exist = el.find('.t228__leftcontainer').length;
            var left_w = el.find('.t228__leftcontainer').outerWidth(true);
            var max_w = left_w;
            var right_exist = el.find('.t228__rightcontainer').length;
            var right_w = el.find('.t228__rightcontainer').outerWidth(true);
            var items_align = el.attr('data-menu-items-align');
            if (left_w < right_w) max_w = right_w;
            max_w = Math.ceil(max_w);
            var center_w = 0;
            el.find('.t228__centercontainer').find('li').each(function () {
                center_w += $(this).outerWidth(true);
            });
            var padd_w = 40;
            var maincontainer_width = el.find(".t228__maincontainer").outerWidth();
            if (maincontainer_width - max_w * 2 - padd_w * 2 > center_w + 20) {
                if (items_align == "center" || typeof items_align === "undefined") {
                    el.find(".t228__leftside").css("min-width", max_w + "px");
                    el.find(".t228__rightside").css("min-width", max_w + "px");
                    el.find(".t228__list").removeClass("t228__list_hidden");
                }
            } else {
                el.find(".t228__leftside").css("min-width", "");
                el.find(".t228__rightside").css("min-width", "");
            }
        });
    }
    
    el.find(".t228__centerside").removeClass("t228__centerside_hidden");
}

function t228_setBg(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor);
            }
        });
    } else {
        el.find(".t228").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes");
        });
    }
}

function t228_appearMenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                }

                appearoffset = parseInt(appearoffset, 10);

                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        var topoffset = el.data('top-offset');
                        if (topoffset && parseInt(topoffset) > 0) {
                            el.animate({
                                "opacity": "1",
                                "top": topoffset + "px"
                            }, 200, function () {});

                        } else {
                            el.animate({
                                "opacity": "1",
                                "top": "0px"
                            }, 200, function () {});
                        }
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden");
                    el.css("opacity", "0");
                }
            }
        });
    }

}

function t228_changebgopacitymenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow;
            } else {
                var menushadowvalue = '0.' + menushadow;
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || (typeof menushadow == "undefined" && menushadow == false)) {
                    el.css("box-shadow", "none");
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")");
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || (typeof menushadow == "undefined" && menushadow == false)) {
                    el.css("box-shadow", "none");
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")");
                }
            }
        });
    }
}

function t228_createMobileMenu(recid) {
    var el = $("#rec" + recid);
    var menu = el.find(".t228");
    var burger = el.find(".t228__mobile");
    burger.on('click', function (e) {
        menu.fadeToggle(300);
        burger.toggleClass("t228_opened");
    });
    $(window).bind('resize', t_throttle(function () {
        if ($(window).width() > 980) {
            menu.fadeIn(0);
        }
    }));
} 
function t270_scroll(hash, offset, speed) {
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return true;
    }

    var root = $('html, body');
    var target = "";

    if (speed === undefined) {
        speed = 400;
    }

    try {
        target = $(hash);
    } catch (event) {
        console.log("Exception t270: " + event.message);
        return true;
    }
    if (target.length === 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length === 0) {
            return true;
        }
    }

    var isHistoryChangeAllowed = window.location.hash !== hash;
    var complete = function () {
        if (!isHistoryChangeAllowed) {
            return;
        }

        if (history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }

        isHistoryChangeAllowed = false;
    }

    var dontChangeHistory = Boolean($('.t270').attr('data-history-disabled'));
    if (dontChangeHistory) {
        complete = function () {};
    }

    root.animate({
        scrollTop: target.offset().top - offset
    }, speed, complete);

    return true;
} 
window.t266showvideo = function(recid){
    $(document).ready(function(){
        var el = $('#coverCarry'+recid);
        var videourl = '';

        var youtubeid=$("#rec"+recid+" .t266__video-container").attr('data-content-popup-video-url-youtube');
        if(youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid;
        }

        $("body").addClass("t266__overflow");
		$("#rec"+recid+" .t266__cover").addClass("t266__hidden");
        $("#rec"+recid+" .t266__video-container").removeClass("t266__hidden");
        $("#rec"+recid+" .t266__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t266__iframe\" width=\"100%\" height=\"540\" src=\"" + videourl + "?rel=0&autoplay=1\" frameborder=\"0\" allowfullscreen></iframe><a class=\"t266__close-link\" href=\"javascript:t266hidevideo('"+recid+"');\"><div class=\"t266__close\"></div></a>");
    });
}

window.t266hidevideo = function(recid){
    $(document).ready(function(){
        $("body").removeClass("t266__overflow");
        $("#rec"+recid+" .t266__cover").removeClass("t266__hidden");
        $("#rec"+recid+" .t266__video-container").addClass("t266__hidden");
        $("#rec"+recid+" .t266__video-carier").html("<div class=\"t266__video-bg2\"></div>");
    });
} 
function t300_init() {
    $('.t300').each(function () {
        var $hook = $(this).attr('data-tooltip-hook'),
            $recid = $(this).attr('data-tooltip-id');
        if ($hook !== '') {
            var $obj = $('a[href="' + $hook + '"]:not(.tooltipstered)');
            var $content = $(this).find('.t300__content').html();
            var touchDevices = false;
            if ($hook.charAt(0) == '#') {
                touchDevices = true;
            }
            var position = $(this).attr('data-tooltip-position');
            if (position === '') {
                position = 'top';
            }
            $obj.tooltipster({
                theme: 't300__tooltipster-noir t300__tooltipster-noir_' + $recid + '',
                contentAsHTML: true,
                content: $content,
                interactive: true,
                touchDevices: touchDevices,
                position: position
            });
        }
    });
}

$(document).ready(function () {
    t300_init();
    setTimeout(function () {
        /* listener open t-store popup (e.g., st300 */
        $('body .t-store').each(function(i, el) {
            new MutationObserver(function (mutationsList, observer) {
                for (var mutation in mutationsList) {
                    var event = mutationsList[mutation];
                    if (event.type === 'attributes') {
                        if (event.target.className.indexOf('t-popup_show') != -1) {
                            t300_init();
                        }
                    }
                }
            }).observe(el, {
                attributes: true,
                attributeFilter: ['class'],
                subtree: true
            });
        });

        t300_init();
    }, 500);
});
 
function t280_showMenu(recid){
  var el=$("#rec"+recid);
  
  
  el.find('.t280__burger, .t280__menu__bg, .t280__menu__item:not(".tooltipstered"):not(".t280__menu__item_submenu"), .t978__tooltip-menu_mobile').click(function(e){
    if ($(this).is(".t280__menu__item.tooltipstered, .t794__tm-link")) { return; }
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var menuItemsLength = el.find('.t280__menu__item').length;
    /* Hack for big amount of items in menu */
    var isAndroid = /(android)/i.test(navigator.userAgent);
    if (window.location.hash && isChrome && menuItemsLength > 10 && isAndroid) {
        setTimeout(function () {
            var hash = window.location.hash;
            window.location.hash = "";
            window.location.hash = hash;
        }, 50);
    }
    
    if (!$(this).is(".t978__tm-link, .t966__tm-link")) {
        $('body').toggleClass('t280_opened');
        el.find('.t280').toggleClass('t280__main_opened');
    }
    
    t280_changeSize(recid);
    
    el.find(".t978__tm-link, .t966__tm-link").click(function() {
        t280_changeSize(recid);
        el.find(".t280__menu").css('transition', 'none');

        el.find(".t978__menu-link").click(function() {
            t280_changeSize(recid);
        });
    });
  });

  $('.t280').bind('clickedAnchorInTooltipMenu',function(){
    $('body').removeClass('t280_opened');
    el.find('.t280').removeClass('t280__main_opened');
  });
  
  if (el.find('.t-menusub__link-item')) {
    el.find('.t-menusub__link-item').on('click', function() {
      $('body').removeClass('t280_opened');
      el.find('.t280').removeClass('t280__main_opened');
    });
  }
}

function t280_changeSize(recid){
  var el=$("#rec"+recid);
  var div = el.find(".t280__menu").height();
  var bottomheight = el.find(".t280__bottom").height();
  var headerheight = el.find(".t280__container").height();
  var wrapper = el.find(".t280__menu__wrapper");
  var win = $(window).height() - bottomheight - headerheight - 160;
  if (div > win ) {
    wrapper.addClass('t280__menu_static');
  }
  else {
    wrapper.removeClass('t280__menu_static');
  }
}

function t280_changeBgOpacityMenu(recid) {
  var window_width=$(window).width();
  var record = $("#rec"+recid);
  record.find(".t280__container__bg").each(function() {
        var el=$(this);
        var bgcolor=el.attr("data-bgcolor-rgba");
        var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
        var bgopacity=el.attr("data-bgopacity");
        var bgopacity_afterscroll=el.attr("data-bgopacity2");
        var menu_shadow=el.attr("data-menu-shadow");
        if ($(window).scrollTop() > 20) {
            el.css("background-color",bgcolor_afterscroll);
            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
              el.css('box-shadow',menu_shadow);
            } else {
              el.css('box-shadow','none');
            }
        }else{
            el.css("background-color",bgcolor);
            if (bgopacity != "0" && bgopacity != "0.0") {
              el.css('box-shadow',menu_shadow);
            } else {
              el.css('box-shadow','none');
            }
        }
  });
}

function t280_appearMenu() {
  $('.t280').each(function() {
    var el = $(this);
    var appearoffset = el.attr('data-appearoffset');
    if (appearoffset != '') {
      if (appearoffset.indexOf('vh') > -1) {
        appearoffset = Math.floor(
          window.innerHeight * (parseInt(appearoffset) / 100)
        );
      }
      appearoffset = parseInt(appearoffset, 10);
      if ($(window).scrollTop() >= appearoffset) {
        if (el.css('visibility') == 'hidden') {
          el.finish();
          el.css('top', '-50px');
          el.css('opacity', '1');
          el.css('visibility', 'visible');
        }
      } else {
        el.stop();
        el.css('opacity', '0');
        el.css('visibility', 'hidden');
      }
    }
  });
}

function t280_highlight(recid){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t280__menu a[href='"+url+"']").addClass("t-active");
  $(".t280__menu a[href='"+url+"/']").addClass("t-active");
  $(".t280__menu a[href='"+pathname+"']").addClass("t-active");
  $(".t280__menu a[href='/"+pathname+"']").addClass("t-active");
  $(".t280__menu a[href='"+pathname+"/']").addClass("t-active");
  $(".t280__menu a[href='/"+pathname+"/']").addClass("t-active");
}
 
function t281_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    $('#rec' + recid).attr('data-popup-subscribe-inited', 'y');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');

    el.bind('scroll', t_throttle(function () {
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    }));

    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t281_showPopup(recid);
            t281_resizePopup(recid);
            e.preventDefault();
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
            if (analitics > '') {
                Tilda.sendEventToStatistics(analitics, hook);
            }
        });
    }
}

function t281_lockScroll() {
    var body = $("body");
    if (!body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        body.addClass('t-body_scroll-locked');
        body.css("top", "-" + bodyScrollTop + "px");
        body.attr("data-popup-scrolltop", bodyScrollTop);
    }
}

function t281_unlockScroll() {
    var body = $("body");
    if (body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = $("body").attr("data-popup-scrolltop");
        body.removeClass('t-body_scroll-locked');
        body.css("top", "");
        body.removeAttr("data-popup-scrolltop")
        window.scrollTo(0, bodyScrollTop);
    }
}

function t281_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup');

    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
    }, 50);

    $('body').addClass('t-body_popupshowed t281__body_popupshowed');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(function () {
            t281_lockScroll();
        }, 500);
    }

    el.find('.t-popup').mousedown(function (e) {
        if (e.target == this) {
            t281_closePopup(recid);
        }
    });

    el.find('.t-popup__close').click(function (e) {
        t281_closePopup(recid);
    });

    el.find('a[href*="#"]').click(function (e) {
        var url = $(this).attr('href');
        if (!url || (url.substring(0, 7) != '#price:' && url.substring(0, 7) != '#order:')) {
            t281_closePopup(recid);
            if (!url || url.substring(0, 7) == '#popup:') {
                setTimeout(function () {
                    $('body').addClass('t-body_popupshowed');
                }, 300);
            }
        }
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t281_closePopup(recid);
        }
    });
}

function t281_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed t281__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        t281_unlockScroll();
    }
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t281_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height() - 120,
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static');
    } else {
        popup.removeClass('t-popup__container-static');
    }
}

function t281_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                });
            }
        }

        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            });
        }
    }
} 
function t331_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t331_showPopup(recid);
      t331_resizePopup(recid);
      e.preventDefault();
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}

function t331_setHeight(recid){
  var el=$("#rec"+recid); 
  var div = el.find(".t331__video-carier");
  var ratiowidth = div.attr("data-video-width");
  var ratioheight = div.attr("data-video-height");
  if (ratioheight.indexOf('vh') !== -1) {
      ratioheight = parseInt(ratioheight, 10) * 0.01 * $(window).height();
  }
  ratioheight = parseInt(ratioheight, 10);
  var ratio = ratioheight/ratiowidth;     
  var height=div.width() * ratio;
  div.height(height);
  div.parent().height(height);
}

function t331_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  var youtubeid = el.find(".t331__youtube").attr('data-content-popup-video-url-youtube');
  var videourl = 'https://www.youtube.com/embed/' + youtubeid;
  el.find(".t331__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t331__iframe\" width=\"100.5%\" height=\"100.5%\" src=\"" + videourl + (videourl.indexOf('?') !== -1 ? '&' : '?') + "autoplay=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe>");

  popup.css('display', 'block');
  t331_setHeight(recid);
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');
  $('body').addClass('t331__body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) {
    t331_popup_close(recid);
    }
  });

  el.find('.t-popup__close').click(function(e){
    t331_popup_close(recid);
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t331_popup_close(recid); }
  });
}

function t331_popup_close(recid) {
    $('body').removeClass('t-body_popupshowed');
    $('body').removeClass('t331__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function () {
        $("#rec" + recid + " .t331__video-carier").html("");
        $('#rec' + recid + ' .t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t331_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height(),
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t331_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
    
  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }
  
  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
} 
function t390_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');

    el.bind('scroll', t_throttle(function () {
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    }, 200));

    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t390_showPopup(recid);
            t390_resizePopup(recid);
            e.preventDefault();
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7);
                }
                Tilda.sendEventToStatistics(analitics, virtTitle);
            }
        });
    }
    
    var curPath = window.location.pathname;
    var curFullPath = window.location.origin + curPath;
    
    /* Fix for Android unable to scroll to anchor point from "ScrollView"  */
    var isAndroid = /(android)/i.test(navigator.userAgent);
    if (isAndroid) {
        $('#rec' + recid).find('a[href^="#"]:not([href="#"],[href^="#price"],[href^="#popup"],[href^="#prodpopup"],[href^="#order"],a[href^="#!"]),a[href^="' + curPath + '#"]:not(a[href*="#!/tproduct/"],a[href*="#!/tab/"],[href*="#popup"]),a[href^="' + curFullPath + '#"]:not(a[href*="#!/tproduct/"],a[href*="#!/tab/"],[href*="#popup"])').click(function(e) {
            e.preventDefault();
            var hash = this.hash.trim();
            
            if (window.location.hash) {
                setTimeout(function () {
                    window.location.href = hash;
                }, 50);
            }
        });
    }
}

function t390_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup');

    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
    }, 50);

    $('body').addClass('t-body_popupshowed');

    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return;
        }
        if (e.target == this) {
            t390_closePopup(recid);
        }
    });

    el.find('.t-popup__close').click(function (e) {
        t390_closePopup(recid);
    });

    el.find('a[href*="#"]').click(function (e) {
        var url = $(this).attr('href');
        if (!url || url.substring(0, 7) != '#price:') {
            t390_closePopup(recid);
            if (!url || url.substring(0, 7) == '#popup:') {
                setTimeout(function () {
                    $('body').addClass('t-body_popupshowed');
                }, 300);
            }
        }
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t390_closePopup(recid);
        }
    });
}

function t390_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t390_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height() - 120,
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static');
    } else {
        popup.removeClass('t-popup__container-static');
    }
}
/* deprecated */
function t390_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                });
            }
        }

        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            });
        }
    }
} 

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).on('load', function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);if (typeof t_lazyload_update === 'function' && ab.css('overflow') === 'auto') {ab.bind('scroll', t_throttle(function() {if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {t_onFuncLoad('t_lazyload_update', function () {t_lazyload_update();});}}, 500));}if (window.location.hash !== '' && ab.css('overflow') === 'visible') {ab.css('overflow', 'hidden');setTimeout( function() { ab.css('overflow', 'visible');}, 1);}});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww;if($isMobile){ww=$(window).width();} else {ww=window.innerWidth;}window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww;if($isMobile){ww=$(window).width();} else {ww=window.innerWidth;}var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */if($isMobile){window.tn.window_height = parseInt($(window).height());} else {window.tn.window_height = parseInt(window.innerHeight);}if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}if(item.attr('data-elem-type')=='gallery'){t396_addGallery(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);var filter = ab.find('.t396__filter');var carrier = ab.find('.t396__carrier');var abHeightVh = t396_ab__getFieldValue(ab,'height_vh');if (window.isMobile && abHeightVh) {var height = document.documentElement.clientHeight * parseFloat( abHeightVh/100 );ab.css('height', height);filter.css('height', height);carrier.css('height', height);}}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).trigger('load');}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});<\/script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});<\/script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addGallery(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}if(eltype=='gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('width', parseFloat(value).toFixed(1)+'px');el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');if (eltype === 'gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('height',parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px');}}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);if (el.attr('data-elem-type') === 'image') {el_width = t396_elem__getWidth(el);var fileWidth = t396_elem__getFieldValue(el,'filewidth');var fileHeight = t396_elem__getFieldValue(el,'fileheight');if (fileWidth && fileHeight) {var ratio = parseInt(fileWidth) / parseInt(fileHeight);el_height = el_width / ratio;}}value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);if (el.attr('data-elem-type') === 'image') {el_width = t396_elem__getWidth(el);var fileWidth = t396_elem__getFieldValue(el,'filewidth');var fileHeight = t396_elem__getFieldValue(el,'fileheight');if (fileWidth && fileHeight) {var ratio = parseInt(fileWidth) / parseInt(fileHeight);el_height = el_width / ratio;}}value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html' || el.attr('data-elem-type')=='gallery'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided — hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;var tipElBottom = elBottom + padd + tipElHeight;if (winBottom > tipElBottom && winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElTop = elTop - padd - tipElHeight;var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom && winTop < tipElTop) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');}function t396_hex2rgba(hexStr, opacity){var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b, parseFloat(opacity)];} 
 
function t400_init(recid) {
    var el = $('#rec' + recid);

    var btn = el.find('.t400__submit');
    var hideBackText = btn.attr("data-hide-back-text");
    var showMoreText = btn.text();

    el.find('.t400__submit').click(function () {
        if (typeof hideBackText != 'undefined' && hideBackText.length > 0 && $(this).hasClass('t400__submit_hide-back')) {
            t400_alltabs_updateContent(recid);
            $(this).removeClass('t400__submit_hide-back');
            if (btn.hasClass('t400__submit-overflowed')) {
                btn.html("<span class=\"t400__text\">" + showMoreText + "</span>");
            } else {
                btn.html(showMoreText);
            }
            $('.t396').trigger('displayChanged');
            return;
        }

        var recids = $(this).attr('data-hidden-rec-ids').split(',');
        recids.forEach(function (recid) {
            var el = $('#rec' + recid);
            el.removeClass('t400__off');
            el.css('opacity', '');

            var video = el.find('.t-video-lazyload');
            if (video.length > 0) {
                if (video.parents('.t121').length > 0 || video.parents('.t223').length > 0 || video.parents('.t230').length > 0 || video.parents('.t368').length > 0) {
                    t400_updateVideoLazyLoad(video);
                }
            }

            el.find('.t-feed, .t-store, .t-store__product-snippet, .t117, .t121, .t132, .t223, .t226, .t228, .t229, .t230, .t268, .t279, .t341, .t346, .t347, .t349, .t351, .t353, .t384, .t385, .t386, .t396, .t400, .t404, .t409, .t410, .t412, .t418, .t422, .t425, .t428, .t433, .t456, .t477, .t478, .t480, .t486, .t498, .t504, .t506, .t509, .t511, .t517, .t518, .t519, .t520, .t531, .t532, .t533, .t538, .t539, .t544, .t545, .t552, .t554, .t570, .t577, .t592, .t598, .t599, .t601, .t604, .t605, .t609, .t615, .t616, .t650, .t659, .t670, .t675, .t686, .t688, .t694, .t698, .t700, .t726, .t728, .t730, .t734, .t738, .t740, .t744, .t754, .t760, .t762, .t764, .t774, .t776, .t778, .t780, .t786, .t798, .t799, .t801, .t813, .t814, .t822, .t826, .t827, .t829, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t881, .t902, .t912, .t923, .t937, .t958, .t959, .t979, .t982, .t983, .t989, .t994').trigger('displayChanged');
        });

        if (typeof hideBackText != 'undefined' && hideBackText.length > 0) {
            btn.addClass('t400__submit_hide-back');
            if (btn.hasClass('t400__submit-overflowed')) {
                btn.html("<span class=\"t400__text\">" + hideBackText + "</span>");
            } else {
                btn.html(hideBackText);
            }
        } else {
            el.addClass('t400__off').hide();
        }

        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    });

    t400_alltabs_updateContent(recid);
    t400_checkSize(recid);
    
    el.find('.t400').bind('displayChanged', function() {
        t400_checkSize(recid);
    });
}

function t400_alltabs_updateContent(recid) {
    var el = $('#rec' + recid);
    el.find(".t400__submit").each(function (i) {
        var recids = $(this).attr('data-hidden-rec-ids').split(',');
        recids.forEach(function (recid) {
            var el = $('#rec' + recid);
            el.attr('data-animationappear', 'off');
            el.attr('data-connect-with-tab', 'yes');
            el.addClass('t400__off');
        });
    });
}

function t400_checkSize(recid) {
    var el = $("#rec" + recid).find(".t400__submit");
    if (el.length) {
        var btnheight = el.height();
        var textheight = el[0].scrollHeight;
        if (btnheight < textheight) {
            var btntext = el.text();
            el.addClass("t400__submit-overflowed");
            el.html("<span class=\"t400__text\">" + btntext + "</span>");
        }
    }
}

function t400_updateVideoLazyLoad(video) {
    setTimeout(function () {
        video.each(function () {
            var div = $(this);

            var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
            if (height.indexOf('vh') != -1) {
                height = '100%';
            }

            var videoId = div.attr('data-videolazy-id').trim();
            var blockId = div.attr('data-blocklazy-id') || '';
            if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
                var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_';
            } else {
                var videoTwoId = '';
            }

            if (div.attr('data-videolazy-type') == 'youtube') {
                div.find('iframe').remove();
                div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>');
            }
        });
    }, 300);
}
 
t422_setHeight = function(recid) {
  if ($(window).width()>960) {
    t422_checkEqualHeight(recid);
  } else {
    $('#rec'+recid+' .t422__img-mobile').height(200);
    $('#rec'+recid+' .t422__text').height('auto');
  }
};

t422_checkEqualHeight = function(recid) {
  var t422__txtel=$('#rec'+recid+' .t422__text');
  var t422__imgel=$('#rec'+recid+' .t422__img');
  var t422__textwrapperel = $('#rec'+recid+' .t422__textwrapper');
  var t422__borderwidth = 0;
  if (t422__txtel.css("border-top-width") && t422__txtel.css("border-top-width")[1]!='p') {
    t422__borderwidth = + (t422__txtel.css("border-top-width")[0] + t422__txtel.css('border-top-width')[1]);
  }else{if (t422__txtel.css("border-top-width"))
    	t422__borderwidth = +(t422__txtel.css("border-top-width")[0]);
  }
  /* if (t422__imgel.height() < (t422__txtel.height() + t422__borderwidth*2)) {
      t422__imgel.height(t422__txtel.height() + t422__borderwidth*2);
  }else{if ((t422__imgel.height() - t422__borderwidth*2) > t422__txtel.height()) {
        t422__txtel.height(t422__imgel.height() - t422__borderwidth*2);
    }
  } */
  if (t422__imgel.height() < (t422__textwrapperel.outerHeight() + t422__borderwidth*2)) {
      t422__imgel.height(t422__textwrapperel.outerHeight() + t422__borderwidth*2);
  }else{if ((t422__imgel.height() - t422__borderwidth*2) > t422__textwrapperel.outerHeight()) {
        t422__textwrapperel.outerHeight(t422__imgel.height() - t422__borderwidth*2);
    }
  }
}; 
function t449_appearMenu(recid) {
    var window_width=$(window).width();
    if(window_width>980){
         $(".t449").each(function() {
                var el=$(this);
                var appearoffset=el.attr("data-appearoffset");
                var hideoffset=el.attr("data-hideoffset");
                if(appearoffset!=""){
                        if(appearoffset.indexOf('vh') > -1){
                            appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                        }

                        appearoffset=parseInt(appearoffset, 10);

                        if ($(window).scrollTop() >= appearoffset) {
                          if(el.hasClass('t449__beforeready')){
                              el.finish(); 
                              el.removeClass("t449__beforeready");
                          }
                        }else{
                          el.stop();
                          el.addClass("t449__beforeready");
                        }
                }

                if(hideoffset!=""){
                        if(hideoffset.indexOf('vh') > -1){
                            hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)));
                        }

                        hideoffset=parseInt(hideoffset, 10);

                        if ($(window).scrollTop()+$(window).height() >= $(document).height() - hideoffset) {
                          if(!el.hasClass('t449__beforeready')){
                              el.finish();
                              el.addClass("t449__beforeready");
                          }
                        }else{
                          if (appearoffset!="") {
                              if($(window).scrollTop() >= appearoffset){
                                el.stop();
                                el.removeClass("t449__beforeready");
                              }
                          }else{
                              el.stop();
                              el.removeClass("t449__beforeready");
                          }
                        }
                }
         });
    }
} 
function t570_init(recid){
if($(window).width()>750){
  t570_setMapHeight(recid);

  $(window).on('load', function() {
      t570_setMapHeight(recid);
  });

  $(window).on('resize', function(){
    t570_setMapHeight(recid);
  });
}
}

function t570_setMapHeight(recid) {
  var t570__el=$('#rec'+recid),
  	  t570__map = t570__el.find('.t-map');
  var t570__textwrapper = t570__el.find('.t570__col_text').height();
  t570__map.css('height', t570__textwrapper).trigger('sizechange');
} 
function t582_init(recid){
    $(document).ready(function() {
      var t582__showMenu;
      $(window).bind('scroll', t_throttle(function(){
        clearTimeout(t582__showMenu);
        t582__showMenu = setTimeout(function() {t582_appearMenu(recid);}, 50);
      }, 200));
      $('.t582').removeClass('t582__beforeready');
      t582_appearMenu(recid);
    });
}

function t582_appearMenu(recid) {
  $(".t582").each(function() {
    var el=$(this),
        appearoffset=el.attr("data-appearoffset"),
        window_width=$(window).width(),
				window_scrollTop=$(window).scrollTop(),
				window_height=$(window).height();
    if(window_width<=980 && appearoffset!=""){appearoffset="150";}
		if(appearoffset==""){appearoffset="0";}
    if(appearoffset.indexOf('vh') > -1){ appearoffset = Math.floor((window_height * (parseInt(appearoffset) / 100))); }
		appearoffset=parseInt(appearoffset, 10);

    if (window_scrollTop >= appearoffset && window_scrollTop+window_height+70 <= $(document).height()) {
      if(el.css('visibility') == 'hidden'){
          el.finish();
          el.css("bottom","-100px");
          el.css("visibility","visible");
          el.animate({"opacity": "1","bottom": "0"}, 400,function() {
          });
      }
    }else{
      el.stop();
      el.css("visibility","hidden");
        el.css("opacity","0");
    }
  });
}
 
function t585_init(recid) {
    var el = $('#rec' + recid);
    var toggler = el.find(".t585__header");

    var accordion = el.find('.t585__accordion');
    if (accordion) {
        accordion = accordion.attr('data-accordion');
    } else {
        accordion = "false";
    }
    
    var scrolltoExpand = el.find('.t585__accordion').attr('data-scroll-to-expanded');
    
    toggler.click(function () {
        if (accordion === "true") {
            toggler.not(this).removeClass("t585__opened").next().slideUp();
        }
        
        $(this).toggleClass("t585__opened");
        var _this = $(this);
        $(this).next().slideToggle(function() {
            if (scrolltoExpand === "true") {
                $('html, body').animate({
                    scrollTop: $(_this).offset().top || el.offset().top
                }, 300);
            }
        });
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    });
} 
function t599_init(recid){
  var el = $('#rec'+recid);

  if (el.find('.t599__title').length) {
    t599_equalHeight(el.find('.t599__title'));
  }
  if (el.find('.t599__descr').length) {
    t599_equalHeight(el.find('.t599__descr'));
  }
  if (el.find('.t599__price').length) {
    t599_equalHeight(el.find('.t599__price'));
  }
  if (el.find('.t599__subtitle').length) {
    t599_equalHeight(el.find('.t599__subtitle'));
  }
};

function t599_equalHeight(element) {
  var highestBox = 0;

  element.css('height','');

  element.each(function(){
    if($(this).height() > highestBox)highestBox = $(this).height(); 
  });

  if($(window).width()>=960){
      element.css('height', highestBox); 
  }else{
     element.css('height', '');    
  }
} 
function t602_init(recid) {
	$(window).on('scroll', t_throttle(function() {
        t602_setProgressBarWidth(recid);
    }, 100));
}

function t602_setProgressBarWidth(recid) {
	var t602_windowScrollTop = $(window).scrollTop(),
			t602_docHeight = $(document).height(),
			t602_winHeight = $(window).height();
			t602_scrollPercent = (t602_windowScrollTop / (t602_docHeight-t602_winHeight)) * 100;
	$(".t602__indicator").css('width', t602_scrollPercent + '%');
}
 
function t607_init(recid) {
	t607_checkAnchorLinks(recid);
}


function t607_checkAnchorLinks(recid) {
	if($(window).width()>=960) {
	  var t607_navLinks = $("#rec"+recid+" .t607__list_item a:not(.tooltipstered)[href*='#']");
      if (t607_navLinks.length>0){
      	t607_catchScroll(t607_navLinks);
      };
	}
}


function t607_catchScroll(t607_navLinks) {
    var t607_clickedSectionId = null,
      t607_sections = new Array(),
      t607_sectionIdTonavigationLink = {},
      t607_interval = 100,
      t607_lastCall,
      t607_timeoutId;
	t607_navLinks = $(t607_navLinks.get().reverse());
	t607_navLinks.each(function(){
		var t607_cursection = t607_getSectionByHref($(this));
		if (typeof t607_cursection.attr("id") != "undefined") { t607_sections.push(t607_cursection); }
		t607_sectionIdTonavigationLink[t607_cursection.attr("id")] = $(this);
	});
	t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
	setTimeout(function() { t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId); }, 1000);

	$(document).keydown(function(e) {
		var t607_direction = "";
		switch(e.which) {
				case 38: t607_direction = "top"; break;
				case 40: t607_direction = "bottom"; break;
				case 33: t607_direction = "top"; break;
				case 34: t607_direction = "bottom"; break;
				default: return;
		}
		if (t607_direction!="") {
			var t607_curActiveSectionId = t607_getSectionByHref(t607_navLinks.filter(".t-active")).attr("id"),
			 		t607_newActiveSectionIndex = $.map(t607_sections, function(obj, index) {
			    if(obj.attr("id") == t607_curActiveSectionId && t607_direction == "top") { return index + 1; }
					if(obj.attr("id") == t607_curActiveSectionId && t607_direction == "bottom") { return index - 1; }
			});
			var t607_newActiveSection = t607_sections[t607_newActiveSectionIndex[0]];
			if (typeof t607_newActiveSection == "undefined") { return; }

			t607_navLinks.removeClass('t-active');
			var	$root = $('html, body'),
					t607_offsetTop = $(".t607").attr("data-offset-top");
			t607_sectionIdTonavigationLink[t607_newActiveSection.attr("id")].addClass('t-active');
			t607_clickedSectionId = t607_newActiveSection.attr("id");
			if (typeof t607_offsetTop!="undefined") { $root.animate({ scrollTop: t607_newActiveSection.offset().top - t607_offsetTop}, 500); }
			else { $root.animate({ scrollTop: t607_newActiveSection.offset().top}, 500); }
		}
	});

	t607_navLinks.click(function() {
		if (!$(this).hasClass("tooltipstered")) {
		  t607_navLinks.removeClass('t-active');
			var t607_clickedSection = t607_getSectionByHref($(this)),
					$root = $('html, body'),
					t607_offsetTop = $(".t607").attr("data-offset-top");
		  if (!$(this).hasClass("t-active")) { t607_clickedSectionId = t607_clickedSection.attr("id"); }
          t607_sectionIdTonavigationLink[t607_clickedSection.attr("id")].addClass('t-active');          
          if (typeof t607_offsetTop!="undefined") { $root.animate({ scrollTop: t607_clickedSection.offset().top - t607_offsetTop}, 500); }
          else { $root.animate({ scrollTop: t607_clickedSection.offset().top}, 500); }
          return false;
		}
  	});

	$(window).scroll( function() {
		var t607_now = new Date().getTime();
		if (t607_lastCall && t607_now < (t607_lastCall + t607_interval) ) {
				clearTimeout(t607_timeoutId);
				t607_timeoutId = setTimeout(function () {
						t607_lastCall = t607_now;
						t607_clickedSectionId = t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
				}, t607_interval - (t607_now - t607_lastCall) );
		} else {
				t607_lastCall = t607_now;
				t607_clickedSectionId = t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
		}
	});
}


function t607_getSectionByHref (curlink) {
  var t651_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
  if (curlink.is('[href*="#rec"]')) {
      return $(".r[id='" + t651_curLinkValue.substring(1) + "']");
  } else {
      return $(".r[data-record-type='215']").has("a[name='" + t651_curLinkValue.substring(1) + "']");
  }
}


function t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId) {
	var t607_scrollPosition = $(window).scrollTop(),
		t607_valueToReturn = t607_clickedSectionId;

	/*if the first section is too small*/
	if (typeof t607_sections[t607_sections.length-2]!="undefined" && t607_sections[t607_sections.length-2].offset().top <= $(window).height()/2 && t607_scrollPosition == 0) {
		t607_navLinks.removeClass('t-active');
		t607_navLink = t607_sectionIdTonavigationLink[t607_sections[t607_sections.length-1].attr("id")];
		t607_navLink.addClass('t-active');
		return null;
	}

	$(t607_sections).each(function(e) {
			var t607_curSection = $(this),
					t607_sectionTop = t607_curSection.offset().top,
					t607_id = t607_curSection.attr('id'),
					t607_navLink = t607_sectionIdTonavigationLink[t607_id];
			if ((t607_scrollPosition + $(window).height()/2) >= t607_sectionTop || (t607_sections[0].attr("id") == t607_id && $(window).scrollTop() >= $(document).height() - $(window).height())) {
				if (t607_clickedSectionId == null && !t607_navLink.hasClass('t-active')) {					
					t607_navLinks.removeClass('t-active');
					t607_navLink.addClass('t-active');
					t607_valueToReturn = null;
				} else {
					if (t607_clickedSectionId != null && t607_id == t607_clickedSectionId) {
						t607_valueToReturn = null;
					}
				}
				return false;
			}
	});
	return t607_valueToReturn;
}
 
function t635_init(recid) {
    var el = $("#rec" + recid);
    var data = el.find(".t635__textholder");
    var animRecId = data.attr("data-recid");
    var screenmin = parseInt($("#rec" + animRecId).attr("data-screen-min"), 10);
    var screenmax = parseInt($("#rec" + animRecId).attr("data-screen-max"), 10);

    if (isNaN(screenmax) && isNaN(screenmin)) {
        t635_startType(recid);
    } else if (!isNaN(screenmax) && !isNaN(screenmin)) {
        if ($(window).width() >= screenmin && $(window).width() <= screenmax) {
            t635_startType(recid);
        }
    } else if (!isNaN(screenmax)) {
        if ($(window).width() <= screenmax) {
            t635_startType(recid);
        }
    } else if (!isNaN(screenmin)) {
        if ($(window).width() >= screenmin) {
            t635_startType(recid);
        }
    }
}

function t635_startType(recid) {
    var t635_el = $('#rec' + recid),
        t635_data = t635_el.find(".t635__textholder"),
        t635_animRecId = t635_data.attr("data-recid"),
        t635_animText = t635_findAnimElem(t635_animRecId),
        t635_phrasesList = [],
        t635_phrase1 = t635_data.attr("data-text1"),
        t635_phrase2 = t635_data.attr("data-text2"),
        t635_phrase3 = t635_data.attr("data-text3"),
        t635_phrase4 = t635_data.attr("data-text4"),
        t635_phrase5 = t635_data.attr("data-text5"),
        t635_speed = t635_data.attr("data-speed"),
        t635_loop = t635_data.attr("data-loop"),
        t635_backspaceDelay = t635_data.attr("data-backspacing-delay");
    if (typeof t635_animText == "undefined") {
        return;
    }
    if (typeof t635_phrase1 != "undefined") {
        t635_phrasesList.push(t635_phrase1.slice(0, 80));
    }
    if (typeof t635_phrase2 != "undefined") {
        t635_phrasesList.push(t635_phrase2.slice(0, 80));
    }
    if (typeof t635_phrase3 != "undefined") {
        t635_phrasesList.push(t635_phrase3.slice(0, 80));
    }
    if (typeof t635_phrase4 != "undefined") {
        t635_phrasesList.push(t635_phrase4.slice(0, 80));
    }
    if (typeof t635_phrase5 != "undefined") {
        t635_phrasesList.push(t635_phrase5.slice(0, 80));
    }

    if (t635_animText.length !== 0 && t635_phrasesList.length !== 0) {
        var t635_animTextHtml = t635_animText.html(),
            t635_animTextSplitted = t635_animTextHtml.split("|"),
            t635_curWin = $(window);
        t635_animText.html(t635_animTextSplitted[0] + "<span class=\"t635__typing-text\"></span>" + t635_animTextSplitted[1]);

        t635_updateAnimTextLimits(t635_animRecId);
        t635_curWin.bind('resize', t_throttle(function () {
            t635_updateAnimTextLimits(t635_animRecId);
        }, 200));
        var intervalUpdate = setInterval(function () {
            t635_updateAnimTextLimits(t635_animRecId);
        }, 5000);

        var t635_animatedText = $("#rec" + t635_animRecId + " .t635__typing-text"),
            t635_animTextTop = t635_animatedText.attr("data-top-limit"),
            t635_animTextBottom = t635_animatedText.attr("data-bottom-limit"),
            t635_winTop = t635_curWin.scrollTop(),
            t635_winBottom = t635_winTop + t635_curWin.height();
        t635_animateText(t635_animRecId, t635_phrasesList, t635_speed, t635_loop, t635_backspaceDelay);
        if (t635_animTextBottom < t635_winTop || t635_animTextTop > t635_winBottom) {
            $("#rec" + t635_animRecId + " .t635__typing-text").data('typed').pauseTyping();
            $("#rec" + t635_animRecId + " .t635__typing-text").html("");
        }

        t635_curWin.bind('scroll', t_throttle(function () {
            t635_animTextTop = t635_animatedText.attr("data-top-limit");
            t635_animTextBottom = t635_animatedText.attr("data-bottom-limit");
            t635_winTop = t635_curWin.scrollTop();
            t635_winBottom = t635_winTop + t635_curWin.height();
            if (t635_animTextBottom < t635_winTop || t635_animTextTop > t635_winBottom) {
                $("#rec" + t635_animRecId + " .t635__typing-text").data('typed').pauseTyping();
                $("#rec" + t635_animRecId + " .t635__typing-text").html("");
            } else {
                $("#rec" + t635_animRecId + " .t635__typing-text").data('typed').continueTyping();
            }
        }, 200));
    }
}

function t635_findAnimElem(animRecId) {
    var animRec = $("#rec" + animRecId);
    var animH1 = animRec.find("h1:contains(\'|\')").last();
    var animH2 = animRec.find("h2:contains(\'|\')").last();
    var animH3 = animRec.find("h3:contains(\'|\')").last();
    var animDiv = animRec.find("div:contains(\'|\')").last();
    if (typeof animH1 != "undefined" && animH1.length > 0) {
        return animH1;
    }
    if (typeof animH2 != "undefined" && animH2.length > 0) {
        return animH2;
    }
    if (typeof animH3 != "undefined" && animH3.length > 0) {
        return animH3;
    }
    if (typeof animDiv != "undefined" && animDiv.length > 0) {
        return animDiv;
    }
}

function t635_updateAnimTextLimits(t635_animRecId) {
    var t635_animatedBlock = $("#rec" + t635_animRecId),
        t635_animatedText = t635_animatedBlock.find(".t635__typing-text");
    if (typeof t635_animatedText.offset() != 'undefined') {
        t635_animatedText.attr("data-top-limit", t635_animatedText.offset().top);
        t635_animatedText.attr("data-bottom-limit", (t635_animatedBlock.offset().top + t635_animatedBlock.height()));
    }
}

function t635_animateText(t635_animRecId, t635_phrasesList, t635_speed, t635_loop, t635_backspaceDelay) {
    if (typeof t635_speed == "undefined") {
        t635_speed = 40;
    }
    if (typeof t635_backspaceDelay == "undefined") {
        t635_backspaceDelay = 800;
    }
    if (typeof t635_loop == "undefined") {
        t635_loop = true;
    } else {
        t635_loop = false;
    }
    $("#rec" + t635_animRecId + " .t635__typing-text").typed({
        strings: t635_phrasesList,
        typeSpeed: t635_speed * 1,
        startDelay: 600,
        backSpeed: 10,
        backDelay: t635_backspaceDelay * 1,
        loop: t635_loop,
        contentType: 'text'
    });
} 
function t658_init(recid){
	$('#rec'+recid).attr('data-animationappear','off').removeClass('r_hidden').removeClass('r_anim');
	var t658_el = $('#rec'+recid),
        t658_block = t658_el.find('.t658'),
        t658_closeBtn = t658_el.find('.t658__btn'),
        t658_storageItem = t658_block.attr('data-storage-item'),        
        t658_lastOpen = localStorage.getItem(t658_storageItem);
	if (t658_lastOpen==null || t658_block.attr('data-unpublish')) {		
		t658_block.css('display','block');
		setTimeout(function() {
			t658_block.removeClass('t658_closed');
		}, 500);
		$('body').addClass('t658__body_popupshowed');
	}
	t658_closeBtn.click(function(e){
		t658_block.addClass('t658_closed');
		setTimeout(function() {
			t658_block.css('display','none');
		}, 300);
		$('body').removeClass('t658__body_popupshowed');
        localStorage.setItem(t658_storageItem, Math.floor(Date.now() / 1000));
        e.preventDefault();
	});
}
 
function t668_init(recid) {
    var el = $('#rec' + recid);
    var toggler = el.find(".t668__header");
    var accordion = el.find('.t668__accordion');
    if (accordion) {
        accordion = accordion.attr('data-accordion');
    } else {
        accordion = "false";
    }

    toggler.click(function () {
        if (accordion === "true") {
            toggler.not(this).removeClass("t668__opened").next().slideUp();
        }

        $(this).toggleClass("t668__opened");
        $(this).next().slideToggle();
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    });
}
 
function t670_init(recid) {
    t670_imageHeight(recid);
    t670_show(recid);
    t670_hide(recid);
}

function t670_show(recid) {
    var el = $('#rec' + recid);
    var play = el.find('.t670__play');
    play.click(function () {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>");
        }
        $(this).next().css('z-index', '3');
    });
}

function t670_hide(recid) {
    var el = $('#rec' + recid);
    var body = el.find('.t670__frame');
    el.on('updateSlider', function () {
        body.html('').css('z-index', '');
    });
}

function t670_imageHeight(recid) {
    var el = $('#rec' + recid);
    var image = el.find('.t670__separator');
    image.each(function () {
        var width = $(this).attr('data-slider-image-width');
        var height = $(this).attr('data-slider-image-height');
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css('padding-bottom', padding + '%');
    });
} 
function t686_init(recid) {
    var el = $("#rec" + recid);

    t686_setHeight(recid);

    $(window).on('resize', t_throttle(function () {
        t686_setHeight(recid);
    }));

    el.find('.t686').bind('displayChanged', function () {
        t686_setHeight(recid);
    });
}

function t686_setHeight(recid) {
    var el = $('#rec' + recid + ' .t686'),
        ratio = el.attr('data-tile-ratio'),
        ratioHeight = el.find('.t686__col').width() * ratio;

    var largestHeight = 0;
    el.find('.t686__row').each(function () {

        $('.t686__table', this).each(function () {
            var curCol = $(this),
                curColHeight = curCol.find(".t686__textwrapper").outerHeight();
            if ($(this).find(".t686__cell").hasClass("t686__button-bottom")) {
                curColHeight += curCol.find(".t686__button-container").outerHeight();
            }
            if (curColHeight > largestHeight) {
                largestHeight = curColHeight;
            }
        });

        if ($(window).width() >= 960) {
            if (largestHeight > ratioHeight) {
                $('.t686__table', this).css('height', largestHeight);
            } else {
                $('.t686__table', this).css('height', ratioHeight);
            }
            $('.t686__table', this).css('min-height', 'auto');
        } else {
            $('.t686__table', this).css('min-height', ratioHeight);
            $('.t686__table', this).css('height', '');
        }

        if (t686_GetIEVersion() > 0) {
            var curRowHeight = $('.t686__table', this).css('height');
            $('.t686__bg', this).css('height', curRowHeight);
            $('.t686__overlay', this).css('height', curRowHeight);
        }
    });
}

function t686_GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    if (Idx > 0) {
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
    } else {
        if (!!navigator.userAgent.match(/Trident\/7\./)) {
            return 11;
        } else {
            return 0;
        }
    }
} 
function t696_onSuccess(t696_form){
	var t696_inputsWrapper = t696_form.find('.t-form__inputsbox');
    var t696_inputsHeight = t696_inputsWrapper.height();
    var t696_inputsOffset = t696_inputsWrapper.offset().top;
    var t696_inputsBottom = t696_inputsHeight + t696_inputsOffset;
	var t696_targetOffset = t696_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t696_target = t696_targetOffset - 200;
    }	else {
        var t696_target = t696_targetOffset - 100;
    }

    if (t696_targetOffset > $(window).scrollTop() || ($(document).height() - t696_inputsBottom) < ($(window).height() - 100)) {
        t696_inputsWrapper.addClass('t696__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);		
    } else {
        $('html, body').animate({ scrollTop: t696_target}, 400);
        setTimeout(function(){t696_inputsWrapper.addClass('t696__inputsbox_hidden');}, 400);
    }

	var successurl = t696_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

} 
function t702_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');

    el.bind('scroll', t_throttle(function () {
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    }));

    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t702_showPopup(recid);
            t702_resizePopup(recid);
            e.preventDefault();
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7);
                }
                Tilda.sendEventToStatistics(analitics, virtTitle);
            }
        });
    }
}

function t702_onSuccess(t702_form) {
    var t702_inputsWrapper = t702_form.find('.t-form__inputsbox');
    var t702_inputsHeight = t702_inputsWrapper.height();
    var t702_inputsOffset = t702_inputsWrapper.offset().top;
    var t702_inputsBottom = t702_inputsHeight + t702_inputsOffset;
    var t702_targetOffset = t702_form.find('.t-form__successbox').offset().top;

    if ($(window).width() > 960) {
        var t702_target = t702_targetOffset - 200;
    } else {
        var t702_target = t702_targetOffset - 100;
    }

    if (t702_targetOffset > $(window).scrollTop() || ($(document).height() - t702_inputsBottom) < ($(window).height() - 100)) {
        t702_inputsWrapper.addClass('t702__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50);
            }
        }, 300);
    } else {
        $('html, body').animate({
            scrollTop: t702_target
        }, 400);
        setTimeout(function () {
            t702_inputsWrapper.addClass('t702__inputsbox_hidden');
        }, 400);
    }

    var successurl = t702_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl;
        }, 500);
    }

}


function t702_lockScroll() {
    var body = $("body");
    if (!body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        body.addClass('t-body_scroll-locked');
        body.css("top", "-" + bodyScrollTop + "px");
        body.attr("data-popup-scrolltop", bodyScrollTop);
    }
}

function t702_unlockScroll() {
    var body = $("body");
    if (body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = $("body").attr("data-popup-scrolltop");
        body.removeClass('t-body_scroll-locked');
        body.css("top", "");
        body.removeAttr("data-popup-scrolltop")
        window.scrollTo(0, bodyScrollTop);
    }
}


function t702_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup');

    popup.css('display', 'block');
    el.find('.t-range').trigger('popupOpened');
    if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function () {
            t_lazyload_update();
        });
    }
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
    }, 50);

    $('body').addClass('t-body_popupshowed t702__body_popupshowed');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(function () {
            t702_lockScroll();
        }, 500);
    }
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return;
        }
        if (e.target == this) {
            t702_closePopup(recid);
        }
    });

    el.find('.t-popup__close').click(function (e) {
        t702_closePopup(recid);
    });

    el.find('.t-submit[href*="#"]').click(function (e) {
        if ($('body').hasClass('t-body_scroll-locked')) {
            $('body').removeClass('t-body_scroll-locked');
        }
    });

    el.find('a[href*="#"]').click(function (e) {
        var url = $(this).attr('href');
        if (!url || url.substring(0, 7) != '#price:') {
            t702_closePopup(recid);
            if (!url || url.substring(0, 7) == '#popup:') {
                setTimeout(function () {
                    $('body').addClass('t-body_popupshowed');
                }, 300);
            }
        }
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t702_closePopup(recid);
        }
    });
}

function t702_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed t702__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        t702_unlockScroll();
    }
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t702_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height() - 120,
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static');
    } else {
        popup.removeClass('t-popup__container-static');
    }
}
/* deprecated */
function t702_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                });
            }
        }

        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            });
        }
    }
} 
function t704_onSuccess(t704_form){
	var t704_inputsWrapper = t704_form.find('.t-form__inputsbox');
    var t704_inputsHeight = t704_inputsWrapper.height();
    var t704_inputsOffset = t704_inputsWrapper.offset().top;
    var t704_inputsBottom = t704_inputsHeight + t704_inputsOffset;
	var t704_targetOffset = t704_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t704_target = t704_targetOffset - 200;
    }	else {
        var t704_target = t704_targetOffset - 100;
    }

    if (t704_targetOffset > $(window).scrollTop() || ($(document).height() - t704_inputsBottom) < ($(window).height() - 100)) {
        t704_inputsWrapper.addClass('t704__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t704_target}, 400);
        setTimeout(function(){t704_inputsWrapper.addClass('t704__inputsbox_hidden');}, 400);
    }

	var successurl = t704_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}
 
function t706_onSuccessCallback(t706_form) {
    $(".t706__cartwin-products").slideUp(10, function () {});
    $(".t706__cartwin-bottom").slideUp(10, function () {});
    $(".t706 .t-form__inputsbox").slideUp(700, function () {});
    try {
        /*fix IOS11 cursor bug + general IOS background scroll*/
        tcart__unlockScroll();
    } catch (e) {}
} 
function t734_init(recid) {
    var rec = $('#rec' + recid);
    if ($('body').find('.t830').length > 0) {
        if (rec.find('.t-slds__items-wrapper').hasClass('t-slds_animated-none')) {
            t_onFuncLoad('t_sldsInit', function () {
                t_sldsInit(recid);
            });
        } else {
            setTimeout(function() {
                t_onFuncLoad('t_sldsInit', function () {
                    t_sldsInit(recid);
                });
            }, 500);   
        }
    } else {
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid);
        });
    }

    rec.find('.t734').bind('displayChanged', function() {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid);
        });
    });
} 
function t766_init(recid){
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid);
    });

  setTimeout(function(){
    t_onFuncLoad('t_prod__init', function () {
        t_prod__init(recid);
    });
    t766_initPopup(recid);
  }, 500);
}

function t766_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid);
    });
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t766_showPopup(recid);
      e.preventDefault();

      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}

function t766_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup'),
      sliderWrapper = el.find('.t-slds__items-wrapper'),
      sliderWidth = el.find('.t-slds__container').width(),
      pos = parseFloat(sliderWrapper.attr('data-slider-pos'));

  popup.css('display', 'block');

  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid);
    });
    sliderWrapper = el.find('.t-slds__items-wrapper');
    sliderWidth = el.find('.t-slds__container').width();
    pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid);
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid);
    });
    if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function () {
            t_lazyload_update();
        });
    }
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t766_closePopup(recid);
    }
  });

  el.find('.t-popup__close, .t766__close-text').click(function(e){
    t766_closePopup(recid);
  });

  el.find('a[href*="#"]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t766_closePopup(recid);
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t766_closePopup(recid); }
  });
}

function t766_closePopup(recid){
  $('body').removeClass('t-body_popupshowed');
  $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}
/* deprecated */
function t766_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }
  
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}
 
function t772_init(recid) {
    $('.t772__container_mobile-flex').bind('touchstart', function() {
        $('.t772__col').bind('touchmove', function() {
            if (typeof $(".t-records").attr('data-tilda-mode') == 'undefined') {
                if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                    t_onFuncLoad('t_lazyload_update', function () {
                        t_lazyload_update();
                    });
                }
            }
        });
    }).mouseup(function() {
        $('.t772__col').unbind('touchend');
    });
}
 
function t774_init(recid) {
    t774_unifyHeights(recid);

    $(window).on('resize', t_throttle(function () {
        t774_unifyHeights(recid)
    }, 200));

    $(".t774").on("displayChanged", function () {
        t774_unifyHeights(recid);
    });

    $(window).on('load', function () {
        t774_unifyHeights(recid);
    });

    setTimeout(function () {
        t774__updateLazyLoad(recid);
    }, 500);
}


function t774__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t774__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview" && window.lazy === "y") {
        scrollContainer.bind('scroll', t_throttle(function () {
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        }, 500));
    }
}


function t774_unifyHeights(recid) {
    var t774_el = $('#rec' + recid),
        t774_blocksPerRow = t774_el.find(".t774__container").attr("data-blocks-per-row"),
        t774_cols = t774_el.find(".t774__content"),
        t774_mobScroll = t774_el.find(".t774__scroll-icon-wrapper").length;

    if ($(window).width() <= 480 && t774_mobScroll == 0) {
        t774_cols.css("height", "auto");
        return;
    }

    var t774_perRow = +t774_blocksPerRow;
    if ($(window).width() <= 960 && t774_mobScroll > 0) {
        var t774_perRow = t774_cols.length;
    } else {
        if ($(window).width() <= 960) {
            var t774_perRow = 2;
        }
    }

    for (var i = 0; i < t774_cols.length; i += t774_perRow) {
        var t774_maxHeight = 0,
            t774_row = t774_cols.slice(i, i + t774_perRow);
        t774_row.each(function () {
            var t774_curText = $(this).find(".t774__textwrapper"),
                t774_curBtns = $(this).find(".t774__btn-wrapper, .t774__btntext-wrapper"),
                t774_itemHeight = t774_curText.outerHeight() + t774_curBtns.outerHeight();
            if (t774_itemHeight > t774_maxHeight) {
                t774_maxHeight = t774_itemHeight;
            }
        });
        t774_row.css("height", t774_maxHeight);
    }
} 
function t776__init(recid) {
    setTimeout(function() {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid);
        });
        t776_initPopup(recid);
        t776__hoverZoom_init(recid);
        t776__updateLazyLoad(recid);
        t776__alignButtons_init(recid);
        if (typeof t_store_addProductQuantityEvents !== 'undefined') {
            t776_initProductQuantity(recid);
        }
    }, 500);
}

function t776_initProductQuantity(recid) {
    var el = $('#rec' + recid);
    var productList = el.find(".t776__col, .t776__product-full");
    productList.each(function(i, product) {
        t_store_addProductQuantityEvents($(product));
    });
}

function t776__showMore(recid) {
    var el = $('#rec' + recid).find(".t776");
    var showmore = el.find('.t776__showmore');
    var cards_count = parseInt(el.attr('data-show-count'), 10);
    
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t776__dict('loadmore'));
        }
        
        showmore.show();
        el.find('.t776__col').hide();
    
        var cards_size = el.find('.t776__col').size();
        var x = cards_count;
        var y = cards_count;
        
        t776__showSeparator(el, x);
    
        el.find('.t776__col:lt(' + x + ')').show();
    
        showmore.click(function () {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t776__col:lt(' + x + ')').show();
            if (x == cards_size) {
                showmore.hide();
            }
            t776__showSeparator(el, x);
            if ($('#rec' + recid).find('[data-buttons-v-align]')[0]) {
                t776__alignButtons(recid);
            }
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        });
    }
}

function t776__showSeparator(el, x) {
    el.find('.t776__separator_number').addClass('t776__separator_hide');
    el.find('.t776__separator_hide').each(function() {
        if ($(this).attr('data-product-separator-number') <= x) {
            $(this).removeClass('t776__separator_hide');
        }
    });
}

function t776__dict(msg) {
    var dict = [];

    dict['loadmore'] = {
        EN: 'Load more',
        RU: 'Загрузить еще',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga más',
        PT: 'Carregue mais',
        UK: 'Завантажити ще',
        JA: 'もっと読み込む',
        ZH: '裝載更多',
    };

    var lang = window.browserLang;

    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang];
        } else {
            return dict[msg]['EN'];
        }
    }

    return 'Text not found "' + msg + '"';
}

function t776__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t776__alignButtons(recid);
            $(window).bind('resize', t_throttle(function() {
                    if (
                        typeof window.noAdaptive !== 'undefined' &&
                        window.noAdaptive === true &&
                        $isMobile
                    ) {
                        return;
                    }
                    t776__alignButtons(recid);
                })
            );

            el.find('.t776').bind('displayChanged', function() {
                t776__alignButtons(recid);
            });

            if ($isMobile) {
                $(window).on('orientationchange', function() {
                    t776__alignButtons(recid);
                });
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message);
        }
    }
}

function t776__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t776__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t776__container_mobile-flex')[0] ? true: false;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t776 .mobile-two-columns')[0] ? true: false;

    if (mobileView) {
        itemsInRow = 1;
    }

    if (tableView) {
        itemsInRow = 2;
    }
    
    if (mobileTwoItemsInRow) {
        itemsInRow = 2;
    }

    if (mobileOneRow) {
        itemsInRow = 999999;
    }

    var i = 1;
    var wrappersInRow = [];
    
    $.each(wrappers, function(key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto';
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight;
            }

            $.each(wrappersInRow, function(key, wrapper) {
                wrapper.style.height = maxHeight + 'px';
            });
            
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = [];
            }

            i++;
        }
    });
}

function t776__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid);
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    } 
}

function t776__updateLazyLoad(recid) {
    var scrollContainer = $("#rec"+recid+" .t776__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode!="edit" && curMode!="preview") {
        scrollContainer.bind('scroll', t_throttle(function() {
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        }));
    }
}

function t776_initPopup(recid){
    var rec=$('#rec' + recid);

    rec.find('[href^="#prodpopup"]').each(function(e) {
        var el_popup=rec.find('.t-popup');
        var el_prod=$(this).closest('.js-product');
        var lid_prod=el_prod.attr('data-product-lid');
        $(".r").find('a[href$="#!/tproduct/' + recid + '-' + lid_prod + '"]').click(function(e) {
            if (rec.find('[data-product-lid=' + lid_prod + ']').length) {
                rec.find('[data-product-lid=' + lid_prod + '] [href^="#prodpopup"]').triggerHandler('click');
            }
        });
    });

  rec.find('[href^="#prodpopup"]').one( "click", function(e) {
      e.preventDefault();	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
      var lid_prod=el_prod.attr('data-product-lid');
      t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid+' #t776__product-' + lid_prod + '');
      });
  });
  rec.find('[href^="#prodpopup"]').click(function(e){	
      e.preventDefault();
      t776_showPopup(recid);	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  el_popup.find('.js-product').css('display','none');
	  var el_fullprod=el_popup.find('.js-product[data-product-lid="'+lid_prod+'"]');
	  el_fullprod.css('display','block');

    var analitics=el_popup.attr('data-track-popup');
    if (analitics > '') {
        var virtTitle = el_fullprod.find('.js-product-name').text();
        if (! virtTitle) {
            virtTitle = 'prod'+lid_prod;
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
    }

      var curUrl = window.location.href;
      if (curUrl.indexOf('#!/tproduct/')<0 && curUrl.indexOf('%23!/tproduct/')<0) {
        if (typeof history.replaceState!='undefined'){
          window.history.replaceState('','',window.location.href+'#!/tproduct/'+recid+'-'+lid_prod);
        }
      }
      t776_updateSlider(recid+' #t776__product-' + lid_prod + '');
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
  });
  if ($('#record'+recid).length==0){ t776_checkUrl(recid); }
  t776_copyTypography(recid);
}

function t776_checkUrl(recid){
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex<0){ tprodIndex = curUrl.indexOf('%23!/tproduct/'); }
  if (tprodIndex>=0){
    var curUrl = curUrl.substring(tprodIndex,curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf('-')+1,curUrl.length);
    var rec=$('#rec'+recid);
    if (curUrl.indexOf(recid)>=0 && rec.find('[data-product-lid='+curProdLid+']').length) {
  	  rec.find('[data-product-lid='+curProdLid+'] [href^="#prodpopup"]').triggerHandler('click');
    }
  }
}

function t776_updateSlider(recid) {
    var el=$('#rec'+recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid);
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid);
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid);
    });
}

function t776_showPopup(recid){
  var el=$('#rec'+recid);
  var popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function () {
            t_lazyload_update();
        });
    }
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t776_closePopup();
    }
  });

  el.find('.t-popup__close, .t776__close-text').click(function(e){
    t776_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t776_closePopup();
    }
  });
}

function t776_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  var curUrl=window.location.href;
  var indexToRemove=curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove<0){ indexToRemove=curUrl.indexOf('%23!/tproduct/'); }
  curUrl=curUrl.substring(0,indexToRemove);
  setTimeout(function() {
    $(".t-popup").scrollTop(0);  
    $('.t-popup').not('.t-popup_show').css('display', 'none');
	if (typeof history.replaceState!='undefined'){
      window.history.replaceState('','',curUrl);
    }                                                                        	
  }, 300);
}

function t776_removeSizeStyles(styleStr){
	if(typeof styleStr!="undefined" && (styleStr.indexOf('font-size')>=0 || styleStr.indexOf('padding-top')>=0 || styleStr.indexOf('padding-bottom')>=0)){
		var styleStrSplitted = styleStr.split(';');
		styleStr = "";
		for (var i=0;i<styleStrSplitted.length;i++){
			if(styleStrSplitted[i].indexOf('font-size')>=0 || styleStrSplitted[i].indexOf('padding-top')>=0 || styleStrSplitted[i].indexOf('padding-bottom')>=0){
				styleStrSplitted.splice(i,1); i--; continue;
			}			
			if(styleStrSplitted[i]==""){continue;}
			styleStr+=styleStrSplitted[i]+";";
		}
	}
	return styleStr;
}

function t776_copyTypography(recid){
  var rec=$('#rec'+recid);
  var titleStyle=rec.find('.t776__title').attr('style');
	var descrStyle=rec.find('.t776__descr').attr('style');
	rec.find('.t-popup .t776__title').attr("style",t776_removeSizeStyles(titleStyle));
	rec.find('.t-popup .t776__descr, .t-popup .t776__text').attr("style",t776_removeSizeStyles(descrStyle));
} 
function t778__init(recid) {
    t_onFuncLoad('t_prod__init', function () {
        t_prod__init(recid);
    });
    t778_initPopup(recid);
    t778__hoverZoom_init(recid);
    t778__updateLazyLoad(recid);
    t778__alignButtons_init(recid);
    t778__showMore(recid);
    if (typeof t_store_addProductQuantityEvents !== 'undefined') {
        t778_initProductQuantity(recid);
    }
}

function t778_initProductQuantity(recid) {
    var el = $('#rec' + recid);
    var productList = el.find(".t778__col, .t778__product-full");
    productList.each(function(i, product) {
        t_store_addProductQuantityEvents($(product));
    });
}

function t778__showMore(recid) {
    var el = $('#rec' + recid).find(".t778");
    var showmore = el.find('.t778__showmore');
    var cards_count = parseInt(el.attr('data-show-count'), 10);
    
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t778__dict('loadmore'));
        }
        
        showmore.show();
        el.find('.t778__col').hide();
    
        var cards_size = el.find('.t778__col').size();
        var x = cards_count;
        var y = cards_count;
        
        t778__showSeparator(el, x);
    
        el.find('.t778__col:lt(' + x + ')').show();
    
        showmore.click(function () {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t778__col:lt(' + x + ')').show();
            el.trigger('displayChanged');
            if (x == cards_size) {
                showmore.hide();
            }
            t778__showSeparator(el, x);
            
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        });
    }
}

function t778__dict(msg) {
    var dict = [];

    dict['loadmore'] = {
        EN: 'Load more',
        RU: 'Загрузить еще',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga más',
        PT: 'Carregue mais',
        UK: 'Завантажити ще',
        JA: 'もっと読み込む',
        ZH: '裝載更多',
    };

    var lang = window.browserLang;

    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang];
        } else {
            return dict[msg]['EN'];
        }
    }

    return 'Text not found "' + msg + '"';
}

function t778__showSeparator(el, x) {
    el.find('.t778__separator_number').addClass('t778__separator_hide');
    el.find('.t778__separator_hide').each(function() {
        if ($(this).attr('data-product-separator-number') <= x) {
            $(this).removeClass('t778__separator_hide');
        }
    });
}

function t778__hoverZoom_init(recid) {
    if (isMobile) {
        return;
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    }
}

function t778__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t778__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function () {
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        }));
    }
}

function t778__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t778__alignButtons(recid);
            $(window).bind('resize', t_throttle(function () {
                if (
                    typeof window.noAdaptive !== 'undefined' &&
                    window.noAdaptive === true &&
                    $isMobile
                ) {
                    return;
                }
                t778__alignButtons(recid);
            }));

            el.find('.t778').bind('displayChanged', function () {
                t778__alignButtons(recid);
            });

            if ($isMobile) {
                $(window).on('orientationchange', function () {
                    t778__alignButtons(recid);
                });
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message);
        }
    }
}

function t778__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var contents = rec.find('.t778__content');
    var maxHeight = 0;
    var maxHeightBtns = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;

    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t778__container_mobile-flex')[0] ? true : false;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t778 .mobile-two-columns')[0] ? true : false;

    if (mobileView) {
        itemsInRow = 1;
    }

    if (tableView) {
        itemsInRow = 2;
    }

    if (mobileTwoItemsInRow) {
        itemsInRow = 2;
    }

    if (mobileOneRow) {
        itemsInRow = 999999;
    }

    var i = 1;
    var textWrappersInRow = [];
    var btnWrappersInRow = [];

    $.each(contents, function (key, content) {
        var textWrapper = $(content).find('.t778__textwrapper');
        if (textWrapper.length > 0) {
            textWrapper = textWrapper[0];
            textWrapper.style.height = 'auto';
            if (itemsInRow === 1) {
                textWrapper.style.height = 'auto';
            } else {
                textWrappersInRow.push(textWrapper);
                if (textWrapper.offsetHeight > maxHeight) {
                    maxHeight = textWrapper.offsetHeight;
                }
    
                $.each(textWrappersInRow, function (key, wrapper) {
                    wrapper.style.height = maxHeight + 'px';
                });
            }
        }

        var btnWrapper = $(content).find('.t778__btn-wrapper');
        if (btnWrapper.length > 0) {
            btnWrapper = btnWrapper[0];
            btnWrapper.style.marginTop = '';
            if (itemsInRow === 1) {
                btnWrapper.style.marginTop = '';
            } else {
                btnWrappersInRow.push(btnWrapper);
                if (btnWrapper.offsetHeight > maxHeightBtns) {
                    maxHeightBtns = btnWrapper.offsetHeight;
                }
    
                $.each(btnWrappersInRow, function (key, btn) {
                    if (maxHeightBtns > btn.offsetHeight) {
                        btn.style.marginTop = (maxHeightBtns - btn.offsetHeight) + 'px';
                    }
                });
            }
        }

        if (i === itemsInRow) {
            i = 0;
            maxHeight = 0;
            textWrappersInRow = [];
            maxHeightBtns = 0;
            btnWrappersInRow = [];
        }

        i++;
    });
}

function t778_initPopup(recid) {
    var rec = $('#rec' + recid);

    rec.find('[href^="#prodpopup"]').each(function (e) {
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        $(".r").find('a[href$="#!/tproduct/' + recid + '-' + lid_prod + '"]').click(function (e) {
            if (rec.find('[data-product-lid=' + lid_prod + ']').length) {
                rec.find('[data-product-lid=' + lid_prod + '] [href^="#prodpopup"]').triggerHandler('click');
            }
        });
    });

    rec.find('[href^="#prodpopup"]').one("click", function (e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid + ' #t778__product-' + lid_prod + '');
        });
    });
    rec.find('[href^="#prodpopup"]').click(function (e) {
        e.preventDefault();
        t778_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');

        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod;
            }
            Tilda.sendEventToStatistics(analitics, virtTitle);
        }

        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23!/tproduct/') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod);
            }
        }
        t778_updateSlider(recid + ' #t778__product-' + lid_prod + '');
        setTimeout(function () {
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        }, 500);
    });
    if ($('#record' + recid).length == 0) {
        t778_checkUrl(recid);
    }
    t778_copyTypography(recid);
}

function t778_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23!/tproduct/');
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click');
        }
    }
}

function t778_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid);
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid);
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid);
    });
}

function t778_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');

    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    }, 50);

    $('body').addClass('t-body_popupshowed');

    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return;
        }
        if (e.target == this) {
            t778_closePopup();
        }
    });

    el.find('.t-popup__close, .t778__close-text').click(function (e) {
        t778_closePopup();
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t778_closePopup();
        }
    });
}

function t778_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tproduct/');
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function () {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl);
        }
    }, 300);
}

function t778_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue;
            }
            if (styleStrSplitted[i] == "") {
                continue;
            }
            styleStr += styleStrSplitted[i] + ";";
        }
    }
    return styleStr;
}

function t778_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t778__title').attr('style');
    var descrStyle = rec.find('.t778__descr').attr('style');
    rec.find('.t-popup .t778__title').attr("style", t778_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t778__descr, .t-popup .t778__text').attr("style", t778_removeSizeStyles(descrStyle));
}

/* compability */
function t778_unifyHeights(recid) {
    var t778_el = $('#rec' + recid),
        t778_blocksPerRow = t778_el.find(".t778__container").attr("data-blocks-per-row"),
        t778_cols = t778_el.find(".t778__textwrapper"),
        t778_mobScroll = t778_el.find(".t778__scroll-icon-wrapper").length;

    if ($(window).width() <= 480 && t778_mobScroll == 0) {
        t778_cols.css("height", "auto");
        return;
    }

    var t778_perRow = +t778_blocksPerRow;
    if ($(window).width() <= 960 && t778_mobScroll > 0) {
        var t778_perRow = t778_cols.length;
    } else {
        if ($(window).width() <= 960) {
            var t778_perRow = 2;
        }
    }

    for (var i = 0; i < t778_cols.length; i += t778_perRow) {
        var t778_maxHeight = 0,
            t778_row = t778_cols.slice(i, i + t778_perRow);
        t778_row.each(function () {
            var t778_curText = $(this).find(".t778__textwrapper"),
                t778_curBtns = $(this).find(".t778__btn-wrapper_absolute"),
                t778_itemHeight = t778_curText.outerHeight() + t778_curBtns.outerHeight();
            if (t778_itemHeight > t778_maxHeight) {
                t778_maxHeight = t778_itemHeight;
            }
        });
        t778_row.css("height", t778_maxHeight);
    }
} 
function t802_insta_init(recid, instauser) {
    var projectid = $('#allrecords').attr('data-tilda-project-id');
    t802_insta_loadflow(recid, projectid, instauser);
}

function t802_insta_loadflow(recid, projectid, instauser) {
    if (instauser == '') {
        var url = "https://insta.tildacdn.com/fish/0.json";
    } else {
        var url = "https://insta.tildacdn.com/json/project" + projectid + "_" + instauser + ".json";
    }

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data) {
            if (typeof data == 'object') {
                t802_insta_draw(recid, data);
            } else {
                console.log('error. insta flow json not object');
                console.log(data);
            }
        },
        error: function () {
            console.log('error load instgram flow');
        },
        timeout: 1000 * 90
    });
}

function t802_insta_draw(recid, obj) {
    if (typeof obj.photos == 'undefined') {
        return;
    }
    $.each(obj.photos, function (index, item) {
        t802_insta_drawItem(recid, obj.username, item);
    });

    if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function () {
            t_lazyload_update();
        });
    }
}

function t802_insta_drawItem(recid, username, item) {
    var emptyEl = $("#rec" + recid).find(".t802__imgwrapper_empty").first();
    if (emptyEl.length > 0) {
        emptyEl.removeClass("t802__imgwrapper_empty");
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            emptyEl.append('<div class="t802__bgimg t-bgimg" data-original="' + item.url + '"></div>');
        } else {
            emptyEl.append('<div class="t802__bgimg" style="background-image:url(' + item.url + ')"></div>');
        }
        emptyEl.wrap('<a href="' + item.link + '" target="_blank"></a>');

        /*add text and filter for hover*/
        var hoverEl = emptyEl.find(".t802__hover-wrapper");
        if (hoverEl.length > 0 && isMobile == false) {
            var text = t802_insta_cropText(recid, '@' + username + ': ' + item.text);
            hoverEl.append('<div class="t802__hover-filter"></div>');
            hoverEl.append('<div class="t802__text t-text t-descr_xxs">' + text + '</div>');
        }
    }
}

function t802_insta_cropText(recid, text) {
    var colsInLine = $("#rec" + recid).find("[data-cols-in-line]").attr("data-cols-in-line");
    if (colsInLine == 6) {
        var maxLength = 90;
    } else {
        var maxLength = 130;
    }
    if (text.length > maxLength) {
        text = text.substring(0, maxLength);
        text = text.substring(0, Math.min(maxLength, text.lastIndexOf(" ")));
        text += ' ...';
    }
    return text;
} 
function t804_init(recid) {
var el = $("#rec" + recid);
var geodata = [];
    var key = el.find('.t_804_geo-datablock').children('.t_804_geo-key').html();
    var def = el.find('.t_804_geo-datablock').children('.t_804_geo-default').html();
    var data = el.find('.t_804_geo-datablock').children('.t_804_geo-data').children();
    data.each(function() {
        var valuesArr = $(this).children('.t_804_geo-geoip').html().split(';');
        var geo = [];

        $.each(valuesArr, function(index, value){
            if(value === '') { return true }

            var re = /,/g;
            var strVal = value.replace(re, '-');
            geo.push(strVal);
        });
        
        var value = $(this).children('.t_804_geo-value').html();
        geodata.push( {'value': value, 'geo': geo});
    });

    if(el.parent('#t-header').length || el.parent('#t-footer').length) {
        $('.t-rec').each(function() {
            var html = $(this).html();
            var replaced = html.replace(/(?!%%)[A-zА-яё0-9_-]*(?=%%)/ig, '<span data-replace-key="$&"></span>').replace(/%{2}/igm,'');
            if (replaced !== html) {
                $(this).html(replaced);
            }
        });
    }

    $.ajax({
        type: "GET",
        url: "https://geo.tildacdn.com/geo/full/",
        crossDomain: true,
        dataType : "json",
        success: function(data) {
            replaceGeo(data,key,geodata,def);
        },
        error: function(data) {
            replaceGeo(data,key,geodata,def);
        },
        timeout: 1000*15
    });

    function replaceGeo(data,key,geodata,def) {
        var city = data.city.name_en;
        var region = data.region.name_en;
        var country = data.country.iso;
        
        var fullMatch = country + '-' + region + '-' + city;
        var partMatch = country + '-' + region;
        
        var val = def;
        $.each(geodata, function(index, value) {
            if($.inArray(country, value.geo) != -1) {
                val = value.value;
            }
            if($.inArray(partMatch, value.geo) != -1) {
                val = value.value;
            }
            if($.inArray(fullMatch, value.geo) != -1) {
                val = value.value;
            }
        });
        $('[data-replace-key='+key+']').html(val);
    }
} 
function t806__init(recid) {
    t_onFuncLoad('tvote__init', function () {
	    tvote__init(recid);
    });
	var testWrap = $('#rec' + recid);
	var testContainer = testWrap.find('.t806');
	var rightAnswersCount;
	var testAnswers = testWrap.find('.t806__answers');
	var testBlock = testWrap.find('.t806__test');
	var testResultWrap = testWrap.find('.t806__result-wrap');
	var shareVK = testWrap.find('.t806__social-btn-vk');
	var shareFB = testWrap.find('.t806__social-btn-fb');
	var shareTwitter = testWrap.find('.t806__social-btn-twitter');
	var rightTestAnswers = [];
	var testImgSrc = [];
	var startTitle = testWrap.find('.t806__start-title').text();
	var startText = testWrap.find('.t806__start-text').text();
	var siteLocation = window.location.href;

	testBlock.addClass('t806__counter');
	testBlock.attr('data-count', 0);

	testResultWrap.each(function (i) {
		if ($(testResultWrap[i]).find('img').attr('src') !== '') {
			testImgSrc.push($(testResultWrap[i]).find('img').attr('src'));
		}
	});

	if (testImgSrc.length == 1) {
		testResultWrap.each(function (i) {
			$(testResultWrap[i]).find('img').attr('src', testImgSrc[0]);
			$(testResultWrap[i]).find('.t806__result-desc').removeClass('t806__result-desc_withoutimg');
			$(testResultWrap[i]).find('.t806__result-count, .t806__result-variant').css('color', '#ffffff');
		});
	}

	testAnswers.each(function () {
	    var answer = $(this).attr('data-right-answer') || '';
		rightTestAnswers.push(answer.trim());

		$(this).removeAttr('data-right-answer');
	});

	t806__changeRadio(recid, rightTestAnswers);
	t806__changeTestInput(recid);
	t806__startClickBtn(recid);
	t806__checkClickBtn(recid, rightTestAnswers);
	t806__nextClickBtn(recid);
	t806__resultClickBtn(recid);
	t806__restartClickBtn(recid, rightTestAnswers);

	shareVK.click(function () {
		t806_shareVK(recid, startTitle, siteLocation)
	});
	shareFB.click(function () {
		t806_shareFB(recid, startTitle, startText, siteLocation)
	});
	shareTwitter.click(function () {
		t806_shareTwitter(recid, startTitle, siteLocation)
	});

	t806__clearFormOnBackClick(testWrap);
}


function t806_scrollToTop(testBlock) {
	var topCoordinate = testBlock.offset().top;
	$('html, body').animate({
		scrollTop: topCoordinate
	}, 0);
}


function t806__clearFormOnBackClick(testWrap) {
	window.addEventListener('pagehide', function () {
		testWrap.find('.t806__input').prop('checked', false);
	});
}


function t806__startClickBtn(test) {
	var testWrap = $('#rec' + test);
	var questionFirst = 1;
	var testBtnStart = testWrap.find('.t806__start-btn');

	testBtnStart.on('click', function (e) {
		var testStart = $(this).parents('.t806__start');

		testStart.hide();
		testStart.next().show();
		t806__showNumber(test, questionFirst);

		t806_fixcontentheight(test);
		t806_scrollToTop(testWrap);

		if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
			if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
		}

		e.preventDefault();
	});
}


function t806__changeRadio(test, rightansw) {
	var testBlock = $('#rec' + test);
	var testInput = testBlock.find('.t806__input[type="radio"]');
	var lastQuestion = testBlock.find('.t806__question').last();

	lastQuestion.addClass('t806__lastquestion');

	testInput.change(function () {
		var rightAnswersCount = testBlock.find('.t806__counter').attr('data-count');
		var testItem = $(this).parents('#rec' + test + ' .t806__question');
		var testAnswers = $(this).parents('#rec' + test + ' .t806__answers');
		var answerVote = $(this).parents('#rec' + test + ' .t806__answers').find('.t806__answer .t-vote__btn-res');
		var currentRightAnswer = rightansw[testItem.attr('data-question-num') - 1];

		if ($(this).attr('type') === 'radio') {
			var checkedRadio = $(this).val();

			testAnswers.addClass('t806__answers_answered');

			if (testItem.hasClass('t806__lastquestion')) {
				testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_result').addClass('t806__btn_show');
			} else {
				testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_next').addClass('t806__btn_show');
			}

			testItem.find('.t806__input').attr('disabled', true);

			if (+checkedRadio === +currentRightAnswer) {
				rightAnswersCount++;
				testBlock.find('.t806__counter').attr('data-count', rightAnswersCount);
			}

			if (+testItem.find('.t806__input:checked').val() !== +currentRightAnswer) {
				testItem.find('.t806__input:checked').parents('.t806__answer').addClass('t806__answer_wrong');
			}
			testItem.find('.t806__input:checked').parent().siblings('.t806__details').show();

			testItem.find('.t806__input[value="' + currentRightAnswer + '"]').parents('.t806__answer').addClass('t806__answer_correct');

			answerVote.addClass('t806__answer-vote_show');

			testItem.find('.t806__input:checked').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity');
			testItem.find('.t806__input[type="radio"]').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity');
		}

		t806_fixcontentheight(test);
	});
}


function t806__changeTestInput(test) {
	var testBlock = $('#rec' + test);
	var testInput = testBlock.find('.t806__input[type="checkbox"]');
	var lastQuestion = testBlock.find('.t806__question').last();
	var checkedAnswerCheck = [];

	testBlock.find('.t806__answers').attr('data-test-checked', '');

	lastQuestion.addClass('t806__lastquestion');

	testInput.change(function () {
		var testAnswers = $(this).parents('#rec' + test + ' .t806__answers');

		if ($(this).attr('type') === 'checkbox') {
			testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_check').addClass('t806__btn_show');
		}

		if ($(this).attr('type') === 'checkbox' && $(this).is(':checked') && checkedAnswerCheck.indexOf($(this).val()) === -1) {
			checkedAnswerCheck.push($(this).val());
		}

		if ($(this).attr('type') === 'checkbox' && !$(this).is(":checked")) {
			checkedAnswerCheck.splice(checkedAnswerCheck.indexOf($(this).val()), 1);
		}

		testAnswers.attr('data-test-checked', checkedAnswerCheck.join(','));

		t806_fixcontentheight(test);
	});

	return checkedAnswerCheck;
}


function t806__checkClickBtn(test, rightansw) {
	var rightChecked = false;
	var testBlock = $('#rec' + test);
	var testBtnCheck = testBlock.find('.t806__btn_check');
	var testInput = testBlock.find('.t806__input');
	var checkedAnswersTruth = [];

	testBtnCheck.on('click', function (e) {
		var rightAnswersCount = testBlock.find('.t806__counter').attr('data-count');
		var testItem = $(this).parents('#rec' + test + ' .t806__question');
		var testAnswers = $(this).parents('#rec' + test + ' .t806__question').find('.t806__answers');
		var answerVote = $(this).parents('.t806__btn-wrapper').siblings('#rec' + test + ' .t806__answers').find('.t806__answer .t-vote__btn-res');
		var checkboxAnswersArr = [];
		var checkboxAnswers = rightansw[testItem.attr('data-question-num') - 1].split(',');
		var checkedAnswers = testAnswers.attr('data-test-checked').split(',');

		for (var i = 0; i < checkboxAnswers.length; i++) {
			checkboxAnswersArr.push(checkboxAnswers[i]);
		}

		testItem.find(testInput).attr('disabled', true);

		answerVote.addClass('t806__answer-vote_show');

		checkedAnswers.forEach(function (item, i) {
			var checkedCheckboxSort = checkedAnswers.sort();
			var checkboxAnswersArrSort = checkboxAnswersArr.sort();

			if (+checkedCheckboxSort[i] === +checkboxAnswersArrSort[i] && checkedCheckboxSort.length === checkboxAnswersArrSort.length) {
				checkedAnswersTruth.push(1);
			} else {
				checkedAnswersTruth.push(0);
			}
		});

		var rightChecked = checkedAnswersTruth.every(function (item) {
			return item == 1;
		});

		if (testItem.find(testInput).attr('type') === 'checkbox') {
			checkboxAnswersArr.forEach(function (item) {
				testItem.find('.t806__input[value="' + +item + '"]').parents('.t806__answer').addClass('t806__answer_correct');
			});

			checkedAnswers.forEach(function (item) {
				if (checkboxAnswersArr.indexOf(item) === -1) {
					testItem.find('.t806__input[value="' + +item + '"]:checked').parents('.t806__answer').addClass('t806__answer_wrong');
					testItem.find('.t806__input[value="' + +item + '"]').parent().siblings().show();
				}
			});
		}

		testItem.find('.t806__input:checked').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity');

		if (rightChecked) {
			rightAnswersCount++;
			testBlock.find('.t806__counter').attr('data-count', rightAnswersCount);
		}

		checkedAnswersTruth = [];

		$(this).removeClass('t806__btn_show');

		if (testItem.hasClass('t806__lastquestion')) {
			$(this).parents('.t806__question').find('.t806__btn_result').addClass('t806__btn_show');
		} else {
			$(this).parents('.t806__question').find('.t806__btn_next').addClass('t806__btn_show');
		}

		testAnswers.addClass('t806__answers_answered');

		t806_fixcontentheight(test);

		if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
			if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
		}

		testItem.find('.t806__input:checked').parent().siblings('.t806__details').show();
		t806__changeTestInput(test);

		e.preventDefault();
	});
}


function t806__nextClickBtn(test) {
	var testBlock = $('#rec' + test);
	var testBtnNext = testBlock.find('.t806__btn_next');
	var questionNumber;

	testBtnNext.on('click', function (e) {
		var parentTop = $(this).parents('#rec' + test + ' .t806').offset().top;
		var testItem = $(this).parents('#rec' + test + ' .t806__question');
		questionNumber = testItem.next().attr('data-question-num');

		testItem.hide();
		testItem.next().show();
		t806__showNumber(test, questionNumber);

		t806_fixcontentheight(test);
		t806_scrollToTop(testBlock);

		if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
			if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
		}

		e.preventDefault();
	});
}


function t806__resultClickBtn(test) {
	var testBtnResult = $('#rec' + test + ' .t806__btn_result');
	var testBlock = $('#rec' + test);

	testBtnResult.on('click', function (e) {
		var parentTop = $(this).parents('#rec' + test + ' .t806__test').offset().top;
		var testItem = $(this).parents('#rec' + test + ' .t806__question');

		testItem.hide();
		t806_scrollToTop(testBlock);
		t806__showResult(test);

		t806_fixcontentheight(test);

		if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
			if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
		}

		e.preventDefault();
	});
}


function t806__restartClickBtn(test, rightansw) {
	var testBlock = $('#rec' + test);
	var testContainer = testBlock.find('.t806');
	var testRestart = testBlock.find('.t806__btn_restart');
	var testItemAll = testBlock.find('.t806__question');

	testRestart.on('click', function (e) {
		testBlock.find('.t806__start').show();
		testBlock.find('.t806__result').hide();
		testBlock.find('.t806__btn_next').removeClass('t806__btn_show');
		testBlock.find('.t806__btn_result').removeClass('t806__btn_show');
		testBlock.find('.t806__btn_check').removeClass('t806__btn_show');
		testBlock.find('.t806__details').hide();
		testBlock.find('.t806__answers').removeClass('t806__answers_answered');
		testBlock.find('.t806__answers').attr('data-test-checked', '');
		testBlock.find('.t806__answer').removeClass('t806__answer_correct');
		testBlock.find('.t806__answer').removeClass('t806__answer_wrong');
		testBlock.find('.t806__input').parents('.t806__answer').removeClass('t806__answer_withoutopacity');
		testBlock.find('.t806__input').prop('checked', false);
		testBlock.find('.t806__input').removeAttr('disabled');
		testBlock.find('.t806__answer .t-vote__btn-res').removeClass('t806__answer-vote_show');
		$('#rec' + test + ' .t806__counter').attr('data-count', 0);
		testBlock.find('.t806__number').text(1 + '/' + testItemAll.length);

		t806_fixcontentheight(test);

		if (testContainer.hasClass('t806__test-reload')) {
			document.location.reload(true);
		}

		e.preventDefault();
	});
}


function t806__showResult(test) {
	var testBlock = $('#rec' + test);
	var testContainer = testBlock.find('.t806');
	var fullResult = testBlock.find('.t806__result');
	var startImg = testBlock.find('.t806__start-img img');
	var fullResultLength = fullResult.length;
	var allResult;
	var resultLength = testBlock.find('.t806__result').length;
	var rightAnswersCount = $('#rec' + test).find('.t806__counter').attr('data-count');
	var testItemAll = $('#rec' + test + ' .t806__question');
	var resultCount = $('#rec' + test + ' .t806__result .t806__result-count');
	var resultPercent = rightAnswersCount != 0 ? rightAnswersCount / testItemAll.length * 100 : 0;

	if (testContainer.hasClass('t806__result-new-calc')) {
		if (!Number.isInteger(resultPercent)) {
			resultPercent = resultPercent.toFixed(3);
		}
	}


	resultCount.text(rightAnswersCount + '/' + testItemAll.length);


	t806__openResultWrapper(testContainer, resultPercent, testBlock, fullResultLength);

	var resultData = [];

	fullResult.each(function (i) {
		if ($(fullResult[i]).css('display') == 'block') {
			resultData[0] = $(fullResult[i]).find('.t806__result-variant').text()
			resultData[1] = $(fullResult[i]).find('.t806__result-count').text();

			resultData[2] = '';
			var img = $(fullResult[i]).find('.t806__result-wrap img');

			if (testContainer.hasClass('t806__test-reload')) {
				if (img.length != 0) {
					if (typeof window.lazy !== 'undefined') {
						resultData[2] = img.attr('data-original') || img.attr('src');
					} else {
						resultData[2] = img.attr('src');
					}
				}

				if (img.length == 0 && startImg.length != 0) {
					if (typeof window.lazy !== 'undefined') {
						resultData[2] = startImg.attr('data-original') || img.attr('src');
					} else {
						resultData[2] = startImg.attr('src');
					}
				}
			}

			if (!testContainer.hasClass('t806__test-reload')) {
				if (img.length != 0) {
					resultData[2] = img.attr('src');
				}

				if (img.length == 0 && startImg.length != 0) {
					resultData[2] = startImg.attr('src');
				}
			}

			resultData[3] = $(fullResult[i]).attr('data-quiz-result-number');
		}
	});

	return resultData;
}


function t806__openResultWrapper(testContainer, resultPercent, testBlock, fullResultLength) {
	if (testContainer.hasClass('t806__result-new-calc')) {
		if (resultPercent <= 100 * 1 / fullResultLength) {
			testBlock.find('.t806__result_1').show();
			return;
		}

		for (var i = 0; i < fullResultLength; i++) {
			var minResult = 100 * (i + 1) / fullResultLength;
			var maxResult = 100 * (i + 2) / fullResultLength;
			minResult = Math.floor(minResult) == minResult ? minResult : minResult.toFixed(3);
			maxResult = Math.floor(maxResult) == maxResult ? maxResult : maxResult.toFixed(3);

			if (resultPercent >= minResult && resultPercent <= maxResult) {
				testBlock.find('.t806__result_' + (i + 2)).show();
				return;
			}
		}

		if (resultPercent > 100 * (fullResultLength - 1) / fullResultLength) {
			testBlock.find('.t806__result_' + fullResultLength).show();
			return;
		}
	} else {
		if (resultPercent <= 100 * 1 / fullResultLength) {
			testBlock.find('.t806__result_1').show();
		}

		for (var i = 0; i < fullResultLength; i++) {
			if (resultPercent > 100 * (i + 1) / fullResultLength && resultPercent <= 100 * (i + 2) / fullResultLength) {
				testBlock.find('.t806__result_' + (i + 2)).show();
			}
		}

		if (resultPercent > 100 * (fullResultLength - 1) / fullResultLength) {
			testBlock.find('.t806__result_' + fullResultLength).show();
		}
	}
}


function t806__showNumber(test, number) {
	var testItemNumber = $('#rec' + test + ' .t806__number');
	var testItemAll = $('#rec' + test + ' .t806__question');
	testItemNumber.html('<span>' + number + '</span>' + '<span>/</span>' + '<span>' + testItemAll.length + '</span>');
}


function t806_fixcontentheight(id) {
	/* correct cover height if content more when cover height */
	var el = $("#rec" + id);
	var hcover = el.find(".t-cover").height();
	var hcontent = el.find("div[data-hook-content]").outerHeight();
	if (hcontent > 300 && hcover < hcontent) {
		var hcontent = hcontent + 120;
		if (hcontent > 1000) {
			hcontent += 100;
		}
		el.find(".t-cover").height(hcontent);
		el.find(".t-cover__filter").height(hcontent);
		el.find(".t-cover__carrier").height(hcontent);
		el.find(".t-cover__wrapper").height(hcontent);
		if ($isMobile == false) {
			setTimeout(function () {
				var divvideo = el.find(".t-cover__carrier");
				if (divvideo.find('iframe').length > 0) {
					setWidthHeightYoutubeVideo(divvideo, hcontent + 'px');
				}
			}, 2000);
		}
	}
}


function t806_changeShareFBUrl(siteLocation, searchUrl) {
	var url = siteLocation.split('?')[0] + '?';
	var searchParametrs = decodeURIComponent(searchUrl.substring(1));
	var params = searchParametrs.split('&');

	params.forEach(function (item) {
		if (item.indexOf('fb_action_ids') == -1 && item.indexOf('fb_action_types') == -1 && item.indexOf('result') == -1) {
			url = url + item + '&';
		}
	});

	url = url.substring(0, url.length - 1);
	return url;
}


function t806_shareVK(recid, ptitle, purl) {
	var dataForShare = t806__showResult(recid);
	var text = dataForShare[0];
	var count = dataForShare[1];
	var slash = (dataForShare[2] || "").indexOf('/') == 0 ? '' : '/';
	var urlPathname = window.location.pathname.length > 1 ? window.location.pathname : '';
	var img = (dataForShare[2] || "").indexOf('://') != -1 ? dataForShare[2] : window.location.protocol + '//' + window.location.host + urlPathname + slash + dataForShare[2];
	var resultNumber = dataForShare[3];
	var idUrl = recid + resultNumber + 'vk';

	var urlValueImg = 'https://vote.tildacdn.com/vote/2/share/index.php?text=' + text;
	urlValueImg += '&result=' + count;
	if ((dataForShare[2] || "").length > 0) {
		urlValueImg += '&url=' + img;
	}
	urlValueImg += '&id=' + idUrl;
	urlValueImg += '&social=vk' + '&name=' + ptitle;

	var value = $.ajax({
		url: urlValueImg,
		type: 'GET',
		async: false,
		data: {
			format: 'json'
		},
		error: function (e) {
			console.log('t806 error: ' + e);
		},
		complete: function (data) {
			var urlImg = (data.responseJSON.url || '').replace(/\?.*/, '');
			var shareUrl = window.location.href.indexOf('#') != -1 ? purl.split('#')[0] : purl;
			url = 'http://vkontakte.ru/share.php?url=' + shareUrl + '&title=' + ptitle + '&description=' + ptitle + '&image=' + urlImg + '&noparse=true';
			t806__openPopup(url);
		}
	});
}


function t806_shareFB(recid, ptitle, pdescr, purl) {
	var dataForShare = t806__showResult(recid);
	var text = dataForShare[0];
	var count = dataForShare[1];
	var slash = (dataForShare[2] || "").indexOf('/') == 0 ? '' : '/';
	var urlPathname = window.location.pathname.length > 1 ? window.location.pathname : '';
	var img = (dataForShare[2] || "").indexOf('://') != -1 ? dataForShare[2] : window.location.protocol + '//' + window.location.host + urlPathname + slash + dataForShare[2];
	var resultNumber = dataForShare[3];
	var idUrl = recid + resultNumber + 'fb';
	var param = count.substring(0, count.indexOf('/')) + count.substring(count.indexOf('/') + 1);

	var urlValueImg = 'https://vote.tildacdn.com/vote/2/share/index.php?text=' + text;
	urlValueImg += '&result=' + count;
	if ((dataForShare[2] || "").length > 0) {
		urlValueImg += '&url=' + img;
	}
	urlValueImg += '&id=' + idUrl;
	urlValueImg += '&social=fb' + '&name=' + ptitle;

	var value = $.ajax({
		url: urlValueImg,
		type: 'GET',
		async: false,
		data: {
			format: 'json'
		},
		error: function (e) {
			console.log('t806 error: ' + e);
		},
		complete: function (data) {
			var urlImg = data.responseJSON.url;
			var searchUrl = window.location.search;
			purl = (searchUrl !== '' ? t806_changeShareFBUrl(purl, searchUrl) : purl) + '?result=' + param;

			FB.ui({
				method: 'share_open_graph',
				action_type: 'og.shares',
				action_properties: JSON.stringify({
					object: {
						'og:url': purl
					}
				})
			});
		}
	});
}


function t806_shareTwitter(recid, ptitle, purl) {
	var dataForShare = t806__showResult(recid);
	var testWrap = $('#rec' + recid);
	var testContainer = testWrap.find('.t806');
	var text = dataForShare[0];
	var count = dataForShare[1];
	var img = dataForShare[2];

	var resultCount = count.substring(0, count.indexOf('/'));
	var allCount = count.substring(count.indexOf('/') + 1)

	var result;

	if (testContainer.hasClass('t806__ru')) {
		result = 'Мой результат: ' + resultCount + ' из ' + allCount + '. ' + text;
	}
	if (testContainer.hasClass('t806__en')) {
		result = 'My result: ' + resultCount + ' out of ' + allCount + '. ' + text;
	}

	purl = purl.replace(/&/g, '%26');

	url = 'https://twitter.com/share?url=' + purl + '&text=' + result;
	url = encodeURI(url);

	t806__openPopup(url);
}


function t806__openPopup(url) {
	window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
} 
function t815_init(recid){
    var rec = $('#rec'+recid);
    var el = rec.find('.t815');
    var isFixed = (el.css('position') == 'fixed');
    var redactorMode = el.hasClass('t815_redactor-mode');

    if (!redactorMode) {
      	el.removeClass('t815__beforeready');

      	if (isFixed && el.attr('data-bgopacity-two')) {
            t815_changebgopacitymenu(recid);
            $(window).bind('scroll', t_throttle(function(){t815_changebgopacitymenu(recid)}, 200));
      	}

        if (isFixed && el.attr('data-appearoffset')) {
            el.removeClass('t815__beforeready');
            t815_appearMenu(recid);
            $(window).bind('scroll', t_throttle(function(){t815_appearMenu(recid)}, 200));
        }
    }

    t815_setBg(recid);
    $(window).bind('resize', t_throttle(function(){t815_setBg(recid);}, 200));
}


function t815_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t815").each(function() {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color",bgcolor);
            }
        });
    } else {
        $(".t815").each(function() {
            var el=$(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color",bgcolor);
            el.attr("data-bgcolor-setbyscript","yes");
        });
    }
}

function t815_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980){
        $(".t815").each(function() {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset!="") {
                if(appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                }

                appearoffset = parseInt(appearoffset, 10);

                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top","-50px");
                        el.css("visibility","visible");
                        el.animate({"opacity": "1","top": "0px"}, 200, function() {});
                    }
                } else {
                    el.stop();
                    el.css("visibility","hidden");
                }
            }
        });
    }
}

function t815_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if(window_width > 980){
        $(".t815").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow;
            } else {
                var menushadowvalue = '0.'+menushadow;
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if(bgopacitytwo == '0' || menushadow == ' '){
                  el.css("box-shadow", "none");
                } else {
                  el.css("box-shadow", "0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
                }
            } else {
                el.css("background-color",bgcolor);
                if (bgopacityone == '0.0' || menushadow == ' '){
                  el.css("box-shadow","none");
                } else {
                  el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
                }
            }
        });
    }
}
 
function t821_init(recid){
    var rec = $('#rec'+recid);
    var el = rec.find('.t821');
    var isFixed = (el.css('position') == 'fixed');
    var redactorMode = el.hasClass('t821_redactor-mode');

    if (!redactorMode) {
      	el.removeClass('t821__beforeready');

      	if (isFixed && el.attr('data-bgopacity-two')) {
            t821_changebgopacitymenu(recid);
            $(window).bind('scroll', t_throttle(function(){t821_changebgopacitymenu(recid)}, 200));
      	}

        if (isFixed && el.attr('data-appearoffset')) {
            el.removeClass('t821__beforeready');
            t821_appearMenu(recid);
            $(window).bind('scroll', t_throttle(function(){t821_appearMenu(recid)}, 200));
        }
    }

    t821_setBg(recid);
    $(window).bind('resize', t_throttle(function(){t821_setBg(recid);}, 200));
}


function t821_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t821").each(function() {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color",bgcolor);
            }
        });
    } else {
        $(".t821").each(function() {
            var el=$(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color",bgcolor);
            el.attr("data-bgcolor-setbyscript","yes");
        });
    }
}

function t821_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980){
        $(".t821").each(function() {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset!="") {
                if(appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                }

                appearoffset = parseInt(appearoffset, 10);

                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top","-50px");
                        el.css("visibility","visible");
                        el.animate({"opacity": "1","top": "0px"}, 200, function() {});
                    }
                } else {
                    el.stop();
                    el.css("visibility","hidden");
                }
            }
        });
    }
}

function t821_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if(window_width > 980){
        $(".t821").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow;
            } else {
                var menushadowvalue = '0.'+menushadow;
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if(bgopacitytwo == '0' || menushadow == ' '){
                  el.css("box-shadow", "none");
                } else {
                  el.css("box-shadow", "0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
                }
            } else {
                el.css("background-color",bgcolor);
                if (bgopacityone == '0.0' || menushadow == ' '){
                  el.css("box-shadow","none");
                } else {
                  el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
                }
            }
        });
    }
}


function t821_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t821"),
      burger=el.find(".t821__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t821_opened")
  })
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
}
 
function t833_init(recid) {
    t833_startAnimation(recid);
}


function t833_showOnCertainWidth(el, wrapper) {
    el.attr('class').split(' ').forEach(function (item) {
        if (item.indexOf('t-screen') !== -1) {
            wrapper.addClass(item);
        }
    });
}


function t833_startAnimation(recid) {
    var el = $('#rec' + recid);
    var wrapper = el.find('.t833__sliderwrapper');
    var wr = el.find('.t833');
    var recs = wr.attr('data-coverslider-rec-ids');

    t833_showOnCertainWidth(el, wrapper);

    if ($('#allrecords').attr('data-tilda-mode') === 'edit') {
        t833_addAnimation(el.find('.t833__demo'), wrapper);
        return;
    }

    if (typeof recs !== 'undefined') {
        recs = recs.split(',');
        /* append to certain blocks */
        recs.forEach(function (rec, index, array) {
            var curRec = $('#rec' + rec);
            var curWrapper = wrapper.clone().css('position', 'absolute');
            t833_addAnimation(curRec, curWrapper);
        });
    } else {
        var nextBlock = el.next(':has(.t-cover)');
        var prevBlock = el.prev(':has(.t-cover)');
        var curWrapper = wrapper.clone().css('position', 'absolute');
        if (nextBlock.length !== 0) {
            t833_addAnimation(nextBlock, curWrapper);
        } else if (prevBlock.length !== 0) {
            t833_addAnimation(prevBlock, curWrapper);
        }
    }
}

function t833_addAnimation(curRec, wrapper) {
    var isLoad = false;
    curRec.attr('data-animationappear', 'off').removeClass('r_hidden');
    
    var curRecType = curRec.attr('data-record-type');
    /* CR43 */
    var isT941 = curRecType === '941';
    var curRecId = curRec.attr('id');

    if (curRecType === '396') {
        /*if zero block*/
        curRec.find('.t396__filter').after(wrapper);
        wrapper.css('z-index', '0');
    }

    var coverWrapper = isT941 
        ? coverWrapper = curRec.find('.t941__cover-wrap') 
        : curRec.find('.t-cover');

    if (coverWrapper.length > 0) {
        /*if cover*/
        if (isT941) {
            wrapper.addClass('t941__cover');
            coverWrapper.append(wrapper);
        } else {
            coverWrapper.find('.t-cover__filter').after(wrapper);
        }
        
        wrapper.css('z-index', '0');
    }

    if (curRec.length !== 0) {
        $(window).on('load', function () {
            setTimeout(function () {
                isLoad = true;
                t833_changeSlide(curRec);
            }, 5000)
        });
    }
    
    /* Fix for FF */
    $(window).on('load', function () {
        setTimeout(function () {
            var timerId = setInterval(function () {
                if (!isLoad) {
                    isLoad = true;
                    t833_changeSlide(curRec);
                }
                if (isLoad) {
                    clearInterval(timerId);
                }
            }, 500);
        }, 5000)
    });

    var slider = curRec.find('.t833__slider');
    var slide = curRec.find('.t833__slide');
    var numberOfSlides = slide.length;

    if (numberOfSlides === 3 || numberOfSlides === 2) {
        slide.clone().appendTo(slider);
    }
}

function t833_changeSlide(curRec) {
    var sliderWrapper = curRec.find('.t833__sliderwrapper');
    
    if (sliderWrapper.length) {
        sliderWrapper.each(function(j) {
            var isLoaded = $(this).attr('data-loaded') && $(this).attr('data-loaded') === 'yes' ? true : false;
            
            if (!isLoaded) {
                var slide = $(this).find('.t833__slide');
                var firstSlide = $(this).find('.t833__slide:first-child');
                numberOfSlides = slide.length;
                
                firstSlide.addClass('t833__slide_fx1');
                setTimeout(t833_kenBurns(slide, numberOfSlides, 1), 5000);
                $(this).attr('data-loaded', 'yes');
            }
        });
    }
    
    function t833_kenBurns(slides, numberOfSlides, i) {
        if (i == numberOfSlides) {
            i = 0;
        }

        $(slides[i]).addClass('t833__slide_fx');

        if (i === 0) {
            $(slides[numberOfSlides - 2]).removeClass('t833__slide_fx t833__slide_fx1');
        }

        if (i === 1) {
            $(slides[numberOfSlides - 1]).removeClass('t833__slide_fx t833__slide_fx1');
            slides.removeClass('t833__slide_opacity');
        }

        if (i > 1) {
            $(slides[i - 2]).removeClass('t833__slide_fx t833__slide_fx1');
        }

        setTimeout(function() {
            t833_kenBurns(slides, numberOfSlides, i + 1);
        }, 5000);
    }
} 
function t868_setHeight(recid) {
  var rec = $('#rec' + recid);
  var div = rec.find('.t868__video-carier');
  var height = div.width() * 0.5625;
  div.height(height);
  div.parent().height(height);
}


function t868_initPopup(recid) {
  var rec = $('#rec' + recid);
  $('#rec' + recid).attr('data-animationappear', 'off');
  $('#rec' + recid).css('opacity', '1');
  var el = $('#rec' + recid).find('.t-popup');
  var hook = el.attr('data-tooltip-hook');
  var analitics = el.attr('data-track-popup');
  var customCodeHTML = t868__readCustomCode(rec);

  if (hook !== '') {
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t868_showPopup(recid, customCodeHTML);
      t868_resizePopup(recid);
      e.preventDefault();
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
          virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}


function t868__readCustomCode(rec) {
  var customCode = rec.find('.t868 .t868__code-wrap').html();
  rec.find('.t868 .t868__code-wrap').remove();
  return customCode;
}


function t868_showPopup(recid, customCodeHTML) {
  var rec = $('#rec' + recid);
  var popup = rec.find('.t-popup');
  var popupContainer = rec.find('.t-popup__container');
  popupContainer.append(customCodeHTML);

  popup.css('display', 'block');
  t868_setHeight(recid);
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');
  
  rec.find('.t-popup').click(function(e) {
    var container = e.target.closest('.t-popup__container');
    if (!container) {
      t868_closePopup(recid);
    }
  });

  rec.find('.t-popup__close').click(function(e) {
    t868_closePopup(recid);
  });

  rec.find('a[href*="#"]').click(function(e) {
    var url = $(this).attr('href');
    if (url.indexOf('#order') != -1) {
        var popupContainer = rec.find('.t-popup__container');
        setTimeout(function() {
            popupContainer.empty();
        }, 600);
    }
    if (!url || url.substring(0,7) != '#price:') {
      t868_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t868_closePopup(recid); }
  });
}


function t868_closePopup(recid) {
  var rec = $('#rec' + recid);
  var popup = rec.find('.t-popup');
  var popupContainer = rec.find('.t-popup__container');

  $('body').removeClass('t-body_popupshowed');
  $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');

  popupContainer.empty();

  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}


function t868_resizePopup(recid) {
  var rec = $('#rec' + recid);
  var div = rec.find('.t-popup__container').height();
  var win = $(window).height();
  var popup = rec.find('.t-popup__container');
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}


/* deprecated */
function t868_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
    popupname = popupname.substring(7);
  }

  virtPage += popupname;
  virtTitle += popupname;

  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage, 'title':virtTitle});
    }
  }

  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
}
 
function t994_init(recid) {
	var el = $('#rec' + recid),
		container = el.find('.t994__slidecontainer'),
		item = el.find('.t994__item'),
		slide = el.find('.t994__item-wrapper'),
		totalSlides = item.length,
		slideWidth,
		isPreview = el.find('.t994').hasClass('t994_preview');

    if ($(window).width() > 960) {
        var aspectRatio = 9/16;
        slideWidth = slide.height() * aspectRatio;
        slide.css('width', slideWidth + 'px');
        el.find('.t994__width-wrapper').css('max-width', slideWidth + 40 + 'px');
    } else {
        container.css('transform', 'translate(0, 0)');
        container.attr('data-slide-offset', '0');
    }
    
	if (container.attr('data-slider-timeout') && parseFloat(container.attr('data-slider-timeout')) > 0) {
		t994_initAutoPlay(el);
	}
	
    $('.t994').bind('displayChanged', function() {
        var sliderWidth = item.outerWidth();
        if ($(window).width() > 960) {
            var aspectRatio = 9/16;
            slideWidth = slide.height() * aspectRatio;
            slide.css('width', slideWidth + 'px');
            el.find('.t994__width-wrapper').css('max-width', slideWidth + 40 + 'px');
        }
        
        container.css('transition-duration', '0s');
        item.css('transition-duration', '0s');
        container.css('transform', 'translate(0, 0)');
        t994_goToSlide(el, 0);
        container.attr('data-slide-pos', '0');
    });
    
	$(window).bind('resize orientationchange', function() {
    	var id = parseInt(container.attr('data-slide-pos')),
            slide = el.find('.t994__item'),
    		sliderWidth = slide.outerWidth(),
    	    offset = sliderWidth * id;
            
        container.css('transition-duration', '0s');
        slide.css('transition-duration', '0s');
    	container.css({ transform: 'translate(-' + offset + 'px, 0)' });
	});

    if (isPreview) {
        el.find('.t994__loader').slice(0, parseInt(container.attr('data-slide-pos'))+1).find('.t994__loader-inner').width('100%');
    }

    el.find('.t-slds__arrow_wrapper-right').click(function() {
		t994_slide(el, 'right');
	});

	el.find('.t-slds__arrow_wrapper-left').click(function() {
		t994_slide(el, 'left');
	});
	
	el.find('.t994__loader').click(function() {
	    t994_goToSlide(el, $(this).index());
	});
	el.find('.t994__item').click(function() {
	    t994_goToSlide(el, $(this).index());
	});
    if ($(window).width() < 960) {
        t994_initSliderSwipe(el);
    }
}

function t994_goToSlide(el, id) {
    var container = el.find('.t994__slidecontainer'),
        loaders = el.find('.t994__loader'),
        slide = el.find('.t994__item'),
        sliderLeft = container.attr('data-slide-offset'),
		sliderWidth = slide.outerWidth(),
		sliderTimeOut = container.attr('data-slider-timeout') ? parseFloat(container.attr('data-slider-timeout')) : 0,
		pos = parseInt(container.attr('data-slide-pos')),
		isPreview = el.find('.t994').hasClass('t994_preview');
    
    if (pos == id) {
        return;
    }

    $(loaders).find('.t994__loader-inner').stop();
    slide.removeClass('t-slds__item_active');
    $(slide[id]).addClass('t-slds__item_active');
    container.attr('data-slide-pos', id);
    var offset = sliderWidth * id;
    
    slide.css('transition-duration', '.3s');
	container.css({ transform: 'translate(-' + offset + 'px, 0)' }).css('transition-duration', '.3s');
	el.find('.t994__loader-inner').width('0');
	isPreview ? loaders.slice(0, id+1).find('.t994__loader-inner').width('100%') : loaders.slice(0, id).find('.t994__loader-inner').width('100%');
	
	if (!isPreview && container.attr('data-slider-paused') == 'no') {
    	t994_playSlider(sliderTimeOut, el);
	}
	
	id == 0 ? el.find('.t-slds__arrow_wrapper-left').hide() : el.find('.t-slds__arrow_wrapper-left').show();
	
	id == slide.length - 1 ? el.find('.t-slds__arrow_wrapper-right').hide() : el.find('.t-slds__arrow_wrapper-right').show();

}
function t994_playSlider(time, el) {
	var sliderWrapper = el.find('.t994__slidecontainer'),
	    loader = el.find('.t994__loader'),
		loaderInner = el.find('.t994__loader-inner'),
		id = parseInt(sliderWrapper.attr('data-slide-pos')),
		currLoaderInner = $(loader[id]).find('.t994__loader-inner');
	
		el.find('.t994__playbtn').hide();
	    el.find('.t994__stopbtn').show();
		loaderInner.stop();
		currLoaderInner.animate({
			width: '100%'
		}, time, 'linear', function() {
			t994_slide(el, 'right');
		});
}

function t994_initAutoPlay(el) {
	var container = el.find('.t994__slidecontainer'),
		sliderTimeOut = container.attr('data-slider-timeout') ? parseFloat(container.attr('data-slider-timeout')) : 0,
		playBtn = el.find('.t994__playbtn'),
		stopBtn = el.find('.t994__stopbtn'),
		loader = el.find('.t994__loader'),
		currId = parseInt(container.attr('data-slide-pos'));

	t994_playSlider(sliderTimeOut, el);

	stopBtn.click(function(e) {
		$(this).hide();
		playBtn.show();

		$(loader).find('.t994__loader-inner').stop();
		container.attr('data-slider-paused', 'yes');
	});
	playBtn.click(function(e) {
		$(this).hide();
		stopBtn.show();
        
        currId = parseInt(container.attr('data-slide-pos'));
        var loaderWidth = $(loader[currId]).width(), 
		    progress = $(loader[currId]).find('.t994__loader-inner').width();
		t994_playSlider(sliderTimeOut - (progress / loaderWidth  * sliderTimeOut), el);
		container.attr('data-slider-paused', 'no');
	});
	
	if ($(window).width() < 960) {
	    container.on('touchstart', function(e) {
	        
    		$(loader).find('.t994__loader-inner').stop();
    		if ($(e.target).hasClass('t994__title') || $(e.target).hasClass('t994__descr')) {
    		    $(e.target).addClass('t994__txt-selectable');
    		}
    	});
    	container.on('touchend', function(e) {
    	    $('.t994__title').removeClass('t994__txt-selectable');
    	    $('.t994__descr').removeClass('t994__txt-selectable');
            currId = parseInt(container.attr('data-slide-pos'));
            var loaderWidth = $(loader[currId]).width(), 
        		progress = $(loader[currId]).find('.t994__loader-inner').width();
    		t994_playSlider(sliderTimeOut - (progress / loaderWidth * sliderTimeOut), el);
    	});
	}
}
function t994_slide(el, direction) {
	var container = el.find('.t994__slidecontainer'),
		sliderTimeOut = container.attr('data-slider-timeout') ? parseFloat(container.attr('data-slider-timeout')) : 0,
		pos = parseInt(container.attr('data-slide-pos'), 10),
		sliderLeft = container.attr('data-slide-offset'),
		item = el.find('.t994__item'),
		totalSlides = item.length,
		sliderWidth = item.outerWidth(),
		loader = el.find('.t994__loader'),
		loaderInner = el.find('.t994__loader-inner'),
		isPreview = el.find('.t994').hasClass('t994_preview');
    
	if (direction === 'right') {
		if (pos >= totalSlides-1) {
		    return;
		}
        el.find('.t-slds__arrow_wrapper-left').show();
		$(loader[pos]).find(loaderInner).width('100%');
		container.attr('data-slide-pos', ++pos);
	} else {
        el.find('.t-slds__arrow_wrapper-right').show();
		$(loader[pos]).find(loaderInner).width('0');
		container.attr('data-slide-pos', --pos);
        $(loader[pos]).find(loaderInner).width('0');
		if (pos < 0) {
		    return;
		}
	}
	
	if (pos == 0) {
	    el.find('.t-slds__arrow_wrapper-left').hide();
	}
	if (pos == totalSlides - 1) {
	    el.find('.t-slds__arrow_wrapper-right').hide();
	}
    item.removeClass('t-slds__item_active');
    $(item[pos]).addClass('t-slds__item_active');
    
    var offset = sliderLeft - sliderWidth * pos;
    item.css('transition-duration', '.3s');
	container.css({ transform: 'translate(' + offset + 'px, 0)' }).css('transition-duration', '.3s');
	
	if (!isPreview && sliderTimeOut > 0 && container.attr('data-slider-paused') == 'no') {
	    t994_playSlider(sliderTimeOut, el);
	}
	
	if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
		t_onFuncLoad('t_lazyload_update', function() {
			t_lazyload_update();
		});
	}
}

function t994_initSliderSwipe(el) {
    var sliderWrapper = el.find('.t994__slidecontainer'),
    	totalSlides = el.find('.t994__item').length,
    	timeout,
    	isScrolling = false;

    delete Hammer.defaults.cssProps.userSelect;

	hammer = new Hammer(sliderWrapper[0], {
		domEvents: true,
		inputClass: Hammer.TouchInput,
		recognizers: [
			[Hammer.Pan, {
				direction: Hammer.DIRECTION_HORIZONTAL
			}]
		]
	});

	$(window).bind('scroll', function() {
		isScrolling = true;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			isScrolling = false;
		}, 250);
	});

	if (totalSlides == 1) {
		return false;
	}

	hammer.on('pan', function(event) {
		if (isScrolling) {
			return false;
		}
		var sliderWrapper = el.find('.t994__slidecontainer');

		sliderWrapper.attr('data-slider-touch', 'yes');
		if (event.isFinal) {
			if (event.velocityX > 0.4) {
				t994_slide(el, 'left'); 
			} else if (event.velocityX < -0.4) {
				t994_slide(el, 'right');
			}
			sliderWrapper.attr('data-slider-touch', '');
		}
	});
}