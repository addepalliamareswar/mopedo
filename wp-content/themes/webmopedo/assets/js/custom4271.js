(function($) {
    "use strict";    
    //get content on viewport
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    // get browser width
    var $iW = jQuery(window).innerWidth();
    
    // search bar animation ===========================================
    $( ".btn-search" ).on('click', function () {
      $(".search-form").addClass('expand-form');
      $(".search-field").focus();
    });
    
    
    //open dropdown menu    
    if ($iW >= 991){
        $('ul.topmenu li.dropdown').hover(function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(100).slideDown(200);
        }, function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(100).slideUp(200);
        });
    }
    if ($iW <= 767){
        $('.footer-item').each(function () {
            $(this).find('.widget-title').on('click', function () {
                $(this).toggleClass("slidedown slideup");
                $(this).next('.widget-container').slideToggle( "slow", function() {                    
                });
            });
        });
       
    }

    //timeline slider 
    var timeline_slider = new Swiper('.timeline .swiper-container', {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 5000
        },        
        pagination: {
            el: '.swiper-pagination',            
            clickable: true,
            renderBullet: function (index, className) {
              var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
              return '<li class="' + className + '"><span class="bullet"></span><span class="year-name">' + year + '</span></li>';
            }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        } 
    });
    $(".timeline .swiper-container").mouseenter(function() {
        timeline_slider.autoplay.stop();
    });

    $(".timeline .swiper-container").mouseleave(function() {
        timeline_slider.autoplay.start();
    });
    
    $(window).on('resize scroll', function () {
        $('.timeline .swiper-container').each(function () {
            if ($(this).isInViewport()) {
                timeline_slider.autoplay.start();
            } else {
                timeline_slider.autoplay.stop();
            }
        });
    });
    
    var pageCount = $('.timeline .swiper-pagination').data('page-number');
    var ulWidth = $('.timeline .swiper-pagination').width();
    $('.timeline .swiper-pagination .swiper-pagination-bullet').css('width',Math.floor(ulWidth/pageCount)); 
    $('.timeline .swiper-pagination .swiper-pagination-bullet .year-name').css('width',Math.floor(ulWidth/pageCount)); 
    //$('.timeline .swiper-slide-content .text-content').css('padding-left',Math.floor((ulWidth/pageCount)-26)); 
    timeline_slider.on('slideChange', function () {
        $( "li.swiper-pagination-bullet-active" ).prevAll().addClass('timeline-progress');
        $( "li.swiper-pagination-bullet-active" ).nextAll().removeClass('timeline-progress');
    });
    
    
    //about pathao quote slider
    var quoteslider = new Swiper('.management-quote .swiper-container', {
        loop: true,
        centeredSlides: true,
        spaceBetween : 30,
        autoHeight: true,
        speed: 600,
        autoplay: false,
//        autoplay: {
//            delay: 5000
//        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
    });

    // safe border wrapper
    $(window).on('resize scroll', function () {
        $('.safe-border-wrapper').each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass('safe-border-wrapper-active');
            } else {
                $(this).removeClass('safe-border-wrapper-active');
            }
        });
    });
    

    // testimonial slider ===========================================
    var testimonial_swiper = new Swiper('.testimonial-slider', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: true
      },
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev'
      }
    });
    $(".testimonial-slider").mouseenter(function() {
        testimonial_swiper.autoplay.stop();
    });

    $(".testimonial-slider").mouseleave(function() {
        testimonial_swiper.autoplay.start();
    });
    
    $(window).on('resize scroll', function () {
        $('.testimonial-slider').each(function () {
            if ($(this).isInViewport()) {
                testimonial_swiper.autoplay.start();
            } else {
                testimonial_swiper.autoplay.stop();
            }
        });
    });

  // faq icon ===========================================
  $('.faq-content .card-header .btn-link').on('click', function () {
    $('.btn-link').children('.fa').removeClass('fa-minus');
    $('.btn-link').children('.fa').addClass('fa-plus');
    $(this).children('.fa').removeClass('fa-plus');
    $(this).children('.fa').addClass('fa-minus');
  });

  // work step section ===========================================
  $('.work-step-section .card-header .btn-link').on('click', function () {
    $('.btn-link').children('.fa').removeClass('fa-chevron-down');
    $('.btn-link').children('.fa').addClass('fa-chevron-right');
    $(this).children('.fa').removeClass('fa-chevron-right');
    $(this).children('.fa').addClass('fa-chevron-down');
  });
  
  // footer menu ===========================================
  if (window.matchMedia('(max-width: 767px)').matches) {
//        $('.bg-black .footer-item h4').click(function(e) {
//            $('.footer-menu').addClass('dn-x');
//            $(e.target).next('.footer-menu').removeClass('dn-x')
//        });
        $(".go-top a").on('click', function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return !1
        });
    }

    // sections animation =============================================
    var wow = new WOW(
    {
	    boxClass:     'wow',      // default
	    animateClass: 'animated', // default
	    offset:       100,          // default
	    mobile:       true,       // default
	    live:         true        // default
	  }
    );
    wow.init();

    //form validation function
    $.fn.regexMask = function(mask) {
        $(this).keypress(function (event) {
            if (!event.charCode) return true;
            var part1 = this.value.substring(0, this.selectionStart);
            var part2 = this.value.substring(this.selectionEnd, this.value.length);
            if (!mask.test(part1 + String.fromCharCode(event.charCode) + part2))
                return false;
        });
    };
    
    $(".allowchar").on("keypress keyup blur",function (event) {    
        $(this).val($(this).val().replace(/[\d!`~!@#$%^&*()_=+"{}/,]+/, ""));         
     });
    $(".allownumeric").on("keypress keyup blur",function (event) {    
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    $('.allowalphanumeric').on("keypress keyup blur",function (event) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        if (!event.charCode) return true;
        var part1 = this.value.substring(0, this.selectionStart);
        var part2 = this.value.substring(this.selectionEnd, this.value.length);
        if (!regex.test(part1 + String.fromCharCode(event.charCode) + part2))
            return false;
    });
    $('.disablelink').on("keypress keyup blur",function (event) {
        var urlexp = new RegExp( '(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?' );
        if (!event.charCode) return true;
        var part1 = this.value.substring(0, this.selectionStart);
        var part2 = this.value.substring(this.selectionEnd, this.value.length);
        if (!urlexp.test(part1 + String.fromCharCode(event.charCode) + part2))
            return false;
    });
    
    $('iframe#live-chat').load(function() {
        $('.loader').hide();
    });
})(jQuery);



     