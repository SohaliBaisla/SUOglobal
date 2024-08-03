AOS.init({
    duration: 800,
    easing: 'slide'
});

(function($) {

    "use strict";

    var isMobile = {
        Android: function() { return navigator.userAgent.match(/Android/i); },
        BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
        iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
        Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
        any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
    };

    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll',
        horizontalOffset: 0,
        verticalOffset: 0
    });

    var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();

    var loader = function() {
        setTimeout(function() { 
            if($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    var carousel = function() {
        $('.home-slider').owlCarousel({
            loop:true,
            autoplay: true,
            margin:0,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav:false,
            autoplayHoverPause: false,
            items: 1,
            navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
            responsive:{
                0:{ items:1 },
                600:{ items:1 },
                1000:{ items:1 }
            }
        });
        $('.carousel-testimony').owlCarousel({
            autoplay: true,
            autoHeight: true,
            center: true,
            loop: true,
            items:1,
            margin: 30,
            stagePadding: 0,
            nav: false,
            dots: true,
            navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
            responsive:{
                0:{ items: 1 },
                600:{ items: 1 },
                1000:{ items: 1 }
            }
        });
    };
    carousel();

    $('nav .dropdown').hover(function(){
        var $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function(){
        var $this = $(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });

    var scrollWindow = function() {
        $(window).scroll(function(){
            var $w = $(this),
                st = $w.scrollTop(),
                navbar = $('.ftco_navbar'),
                sd = $('.js-scroll-wrap');

            if (st > 150) {
                if (!navbar.hasClass('scrolled')) {
                    navbar.addClass('scrolled');    
                }
            } 
            if (st < 150) {
                if (navbar.hasClass('scrolled')) {
                    navbar.removeClass('scrolled sleep');
                }
            } 
            if (st > 350) {
                if (!navbar.hasClass('awake')) {
                    navbar.addClass('awake');    
                }
                
                if(sd.length > 0) {
                    sd.addClass('sleep');
                }
            }
            if (st < 350) {
                if (navbar.hasClass('awake')) {
                    navbar.removeClass('awake');
                    navbar.addClass('sleep');
                }
                if(sd.length > 0) {
                    sd.removeClass('sleep');
                }
            }
        });
    };
    scrollWindow();

    var counter = function() {
        $('#section-counter, .hero-wrap, .ftco-counter, .ftco-volunteer').waypoint(function(direction) {
            if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
                $('.number').each(function(){
                    var $this = $(this),
                        num = $this.data('number');
                    $this.animateNumber(
                        {
                            number: num,
                            numberStep: comma_separator_number_step
                        }, 7000
                    );
                });
            }
        }, { offset: '95%' });
    }
    counter();

    var contentWayPoint = function() {
        var i = 0;
        $('.ftco-animate').waypoint(function(direction) {
            if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function(){
                    $('body .ftco-animate.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn ftco-animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft ftco-animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight ftco-animated');
                            } else {
                                el.addClass('fadeInUp ftco-animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 50, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, { offset: '95%' });
    };
    contentWayPoint();

    var OnePageNav = function() {
        $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
            e.preventDefault();
            var hash = this.hash,
                navToggler = $('.navbar-toggler');
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, 'easeInOutExpo', function(){
                window.location.hash = hash;
            });
            if (navToggler.is(':visible')) {
                navToggler.click();
            }
        });
        $('body').on('activate.bs.scrollspy', function () {
            console.log('nice');
        })
    };
    OnePageNav();

    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        },
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // // Sample code addition
    // $('.my-class').hover(
    //     function() {
    //         $(this).find('a').addClass('active');
    //     },
    //     function() {
    //         $(this).find('a').removeClass('active');
    //     }
    // );

    // $('.btn-number').click(function(e) {
    //     e.preventDefault();
        
    //     var fieldName = $(this).attr('data-field');
    //     var type = $(this).attr('data-type');
    //     var input = $("input[name='"+fieldName+"']");
    //     var currentVal = parseInt(input.val());
        
    //     if (!isNaN(currentVal)) {
    //         if(type === 'minus') {
    //             if(currentVal > input.attr('min')) {
    //                 input.val(currentVal - 1).change();
    //             } 
    //             if(parseInt(input.val()) === input.attr('min')) {
    //                 $(this).attr('disabled', true);
    //             }
    //         } else if(type === 'plus') {
    //             if(currentVal < input.attr('max')) {
    //                 input.val(currentVal + 1).change();
    //             }
    //             if(parseInt(input.val()) === input.attr('max')) {
    //                 $(this).attr('disabled', true);
    //             }
    //         }
    //     } else {
    //         input.val(0);
    //     }
    // });

    // $('.input-number').focusin(function(){
    //    $(this).data('oldValue', $(this).val());
    // });

    // $('.input-number').change(function() {
        
    //     var minValue =  parseInt($(this).attr('min'));
    //     var maxValue =  parseInt($(this).attr('max'));
    //     var valueCurrent = parseInt($(this).val());
        
    //     var name = $(this).attr('name');
    //     if(valueCurrent >= minValue) {
    //         $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    //     } else {
    //         alert('Sorry, the minimum value was reached');
    //         $(this).val($(this).data('oldValue'));
    //     }
    //     if(valueCurrent <= maxValue) {
    //         $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    //     } else {
    //         alert('Sorry, the maximum value was reached');
    //         $(this).val($(this).data('oldValue'));
    //     }
    // });

    // $(".input-number").keydown(function (e) {
    //     // Allow: backspace, delete, tab, escape, enter and .
    //     if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
    //          // Allow: Ctrl+A
    //         (e.keyCode === 65 && e.ctrlKey === true) || 
    //          // Allow: home, end, left, right
    //         (e.keyCode >= 35 && e.keyCode <= 39)) {
    //              // let it happen, don't do anything
    //              return;
    //     }
    //     // Ensure that it is a number and stop the keypress
    //     if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    //         e.preventDefault();
    //     }
    // });

})(jQuery);
