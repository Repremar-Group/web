(function ($) {
    "use strict";
    /*	Table OF Contents
	==========================

	0-parallax/Gradient
	1-Navigation
	2-Vegas Slider
	3-Flex Slider
	4-Tweets
	5-Flickr
	6-MediaElementPlayer
	7-Portfolio Filtring/Popup/Ajaxload
	8-Statistics Handling
	9-Animation
	*/
	
	
    /*===================
    0-parallax/Gradient
    ===================*/
$('body').waitForImages(function () {
	$('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(250).fadeOut('slow');
	
    jQuery('.parallax-profile').parallax("50%", 0.2);
    jQuery('.parallax-contact').parallax("50%", 0.2);
	jQuery('.parallax-promo').parallax("50%", 0.2);
	
	
	var type,w3c,start,webkit,banner_overlay= '.overlay',
	color_start = $(banner_overlay).data('start'),
	color_end = $(banner_overlay).data('end'),
	orientation=$(banner_overlay).data('orientation');
	apply_gradient(banner_overlay, color_start, color_end, orientation);
function apply_gradient(ele, color_start, color_end, orientation)
{
	switch (orientation) {
		case 'tobottomright': type="linear"; w3c="to bottom right"; start="top left"; webkit="left top, right bottom"; break;
		case 'tobottom'		: type="linear"; w3c="to bottom"; start="top"; webkit="left top, left bottom"; break;
		case 'tobottomleft'	: type="linear"; w3c="to bottom left"; start="top right"; webkit="right top, left bottom"; break;
		case 'toright'		: type="linear"; w3c="to right"; start="left"; webkit="left top, right top"; break;
		case 'toleft'		: type="linear"; w3c="to left"; start="right"; webkit="right top, left top"; break;
		case 'totopright'	: type="linear"; w3c="to top right"; start="bottom left"; webkit="left bottom, right top"; break;
		case 'totop'		: type="linear"; w3c="to top"; start="bottom"; webkit="left bottom, left top"; break;
		case 'totopleft'	: type="linear"; w3c="to top left"; start="bottom right"; webkit="right bottom, left top"; break;
		case 'circulartopleft'		: type="radial"; w3c="circle farthest-side at left top"; start="left top, circle farthest-side"; webkit="left top, 0, left top, 973"; break;
		case 'circulartopcenter'	: type="radial"; w3c="circle farthest-side at center top"; start="center top, circle farthest-side"; webkit="center top, 0, center top, 487"; break;
		case 'circulartopright'		: type="radial"; w3c="circle farthest-side at right top"; start="right top, circle farthest-side"; webkit="right top, 0, right top, 973"; break;
		case 'circularmiddleleft'	: type="radial"; w3c="circle farthest-side at left center"; start="left center, circle farthest-side"; webkit="left center, 0, left center, 973"; break;
		case 'circularmiddlecenter'	: type="radial"; w3c="circle farthest-side at center"; start="center, circle farthest-side"; webkit="center center, 0, center center, 487"; break;
		case 'circularmiddleright'	: type="radial"; w3c="circle farthest-side at right center"; start="right center, circle farthest-side"; webkit="right center, 0, right center"; break;
		case 'circularbottomleft'	: type="radial"; w3c="circle farthest-side at left bottom"; start="left bottom, circle farthest-side"; webkit="left bottom, 0, left bottom, 973"; break;
		case 'circularbottomcenter'	: type="radial"; w3c="circle farthest-side at center bottom"; start="center bottom, circle farthest-side"; webkit="center bottom, 0, center bottom, 487"; break;
		case 'circularbottomright'	: type="radial"; w3c="circle farthest-side at right bottom"; start="right bottom, circle farthest-side"; webkit="right bottom, 0, right bottom, 973"; break;
		case 'ellipsetopleft'		: type="radial"; w3c="ellipse farthest-side at left top"; start="left top, ellipse farthest-side"; webkit="left top, 0, left top, 973"; break;
		case 'ellipsetopcenter'		: type="radial"; w3c="ellipse farthest-side at center top"; start="center top, ellipse farthest-side"; webkit="center top, 0, center top, 487"; break;
		case 'ellipsetopright'		: type="radial"; w3c="ellipse farthest-side at right top"; start="right top, ellipse farthest-side"; webkit="right top, 0, right top, 973"; break;
		case 'ellipsemiddleleft'	: type="radial"; w3c="ellipse farthest-side at left center"; start="left center, ellipse farthest-side"; webkit="left center, 0, left center, 973"; break;
		case 'ellipsemiddlecenter'	: type="radial"; w3c="ellipse farthest-side at center"; start="center, ellipse farthest-side"; webkit="center center, 0, center center, 487"; break;
		case 'ellipsemiddleright'	: type="radial"; w3c="ellipse farthest-side at right center"; start="right center, ellipse farthest-side"; webkit="right center, 0, right center"; break;
		case 'ellipsebottomleft'	: type="radial"; w3c="ellipse farthest-side at left bottom"; start="left bottom, ellipse farthest-side"; webkit="left bottom, 0, left bottom, 973"; break;
		case 'ellipsebottomcenter'	: type="radial"; w3c="ellipse farthest-side at center bottom"; start="center bottom, ellipse farthest-side"; webkit="center bottom, 0, center bottom, 487"; break;
		case 'ellipsebottomright'	: type="radial"; w3c="ellipse farthest-side at right bottom"; start="right bottom, ellipse farthest-side"; webkit="right bottom, 0, right bottom, 973"; break;

		default: type="linear"; w3c="to right"; start="left"; webkit="left top, right top"; break;
	}

	if (color_end)
	{
		jQuery(ele).css({'background' : color_start});
		jQuery(ele).css({'background' : '-moz-' + type + '-gradient(' + start + ', ' + color_start + ' 0%, ' + color_end + ' 100%)' });
		jQuery(ele).css({'background' : '-webkit-gradient(' + type + ', ' + webkit + ', color-stop(0, ' + color_start + '), color-stop(1, ' + color_end + '))'});
		jQuery(ele).css({'background' : '-webkit-' + type + '-gradient(' + start + ', ' + color_start + ' 0%, ' + color_end + ' 100%)'});
		jQuery(ele).css({'background' : '-o-' + type + '-gradient(' + start + ', ' + color_start + ' 0%, ' + color_end + ' 100%)'});
		jQuery(ele).css({'background' : '-ms-' + type + '-gradient(' + start + ', ' + color_start + ' 0%, ' + color_end + ' 100%)'});
		jQuery(ele).css({'background' : '' + type + '-gradient(' + w3c + ', ' + color_start + ' 0%, ' + color_end + ' 100%)'});
		jQuery(ele).css({'background' : 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'' + color_start + '\', endColorstr=\'' + color_end + '\',GradientType=1 )'});
	}

	else
	{
		jQuery(ele).css({'background' : color_start});
	}
}
	
	/*===================
    1-navigation
    ===================*/
	
	
	
    $(".navbar-nav a[href^='#'],.ScrollTo").click(function () {
        $('.navbar-nav li').removeClass('active');
        $(this).parent().addClass('active');
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 30
        }, 1500);
        return false;
    });

    $('ul.nav li.dropdown').click(
        function () {
            var state = $(this).data('toggleState');
            if (state) {
                $(this).children('ul.dropdown-menu').slideUp();
            } else {
                $(this).children('ul.dropdown-menu').slideDown();
            }
            $(this).data('toggleState', !state);
     });

	
	$("#sticktop").sticky({
        topSpacing: 0
    });
	
	/*===================
    2-Vegas Slider
    ===================*/
    if ($('#home').length || $('#page-banner').length) {
		
		var vegas_BG_imgs = [],
		$vegas_img = $('.vegas-slides li img'),
		vegas_slide_length= $('.vegas-slides li').length;
		
		for (var i=0; i < vegas_slide_length; i++) {
			var new_vegas_img = {};
			new_vegas_img['src'] = $vegas_img.eq(i).attr('src');
			new_vegas_img['fade'] =$vegas_img.eq(i).attr('data-fade');
			vegas_BG_imgs.push(new_vegas_img);
		}
		
		
        $.vegas('slideshow', {
			backgrounds:vegas_BG_imgs, 
           
        });
    }
	
	
	
	
	
	
	function heroInit(){
	   var hero = jQuery('.hero'),
			content=$('.hero-content'),
			content_height='-'+content.height()/2,
			ww = jQuery(window).width(),
			wh = jQuery(window).height(),
			
			heroHeight = wh;

		hero.css({
			height: heroHeight+"px",
		});

		var heroContent = jQuery('.hero .content'),
			contentHeight = heroContent.height(),
			parentHeight = hero.height(),
			topMargin = (parentHeight - contentHeight) / 2;

		heroContent.css({
			"margin-top" : topMargin+"px"
		});
		if(content.length)
		{
			content.css('margin-top',content_height+'px');
			
		}
	}
	
	if($('.hero').length){heroInit();}
	
	
	/*===================
    3-Flex Slider
    ===================*/
	
    $('.blog-flex').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: false,
        slideshow: false,
    });

    var $blogSlides = $('.blog-flex');
    $('.blog-next').click(function () { $blogSlides.flexslider("next");});
    $('.blog-prev').click(function () {$blogSlides.flexslider("prev");});
	
	/*===================
    4-Tweets
    ===================*/
    $('.latest-tweet').tweetable({
        username: 'envato',
        time: true,
        rotate: false,
        limit: 2,
        replies: false,
        position: 'append',
        loading: 'Loading Tweets...',
        failed: "Sorry, twitter is currently unavailable for this user.",
        html5: true,
        onComplete: function () {
            $("<span class='icon-twitter tweet-ico'></span>").insertBefore(".tweetList li p");
        }
    });
	
	$('.client-tweets').tweetable({
        username: 'envato',
        time: false,
        rotate: false,
        speed: 4000,
        limit: 4,
        replies: false,
        position: 'append',
        failed: "Sorry, twitter is currently unavailable for this user.",
        html5: true,
        onComplete: function () {
            $('.client-tweets').addClass('flexslider tweet-flex');
            $('.tweetList').addClass('slides');
            $('.tweet-flex').flexslider({
                animation: "slide",
                directionNav: false,
                controlNav: false,
                pauseOnHover: true,
                slideshowSpeed: 6000,
                direction: "horizontal", //Direction of slides
            });
            $('.tweet-control').show();
            var $tweetlSlides = $('.tweet-flex');
            $('#tweet-next').click(function () {
                $tweetlSlides.flexslider("next");
            });
            $('#tweet-prev').click(function () {
                $tweetlSlides.flexslider("prev");
            });
        }
    });

    /*===================
    5-Flickr
    ===================*/
    $('#flicker-feed').jflickrfeed({
        limit: 10,
        qstrings: {id: '52617155@N08'},
        itemTemplate: '<li><a href="{{image_b}}" data-rel="prettyPhoto"><img alt="{{title}}" src="{{image_s}}" /></a></li>'
    }, function () {
        $("a[data-rel^='prettyPhoto']").prettyPhoto(); //prettyPhoto initilization
    });
	
   
    /*==================================
    7-Portfolio Filtring/Popup/Ajaxload
    ===================================*/
	
	$('.projects').waitForImages(function () {
		var $containerfolio = $('.projects');
		$('.load-img').hide();
		$containerfolio.show();
		if ($containerfolio.length) {
			$containerfolio.isotope({
				layoutMode: 'fitRows',
				filter: '*',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
		}
		$('.portfolio-filter li').click(function () {
			$('.portfolio-filter li').removeClass("active");
			$(this).addClass("active");
			var selector = $(this).attr('data-filter');
			$containerfolio.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
			return false;
		});
	
	});

    
    
    

    var active, next_project, prev_project,
        target, hash, url, page, projectIndex,
        xv_scrollTo,
        projectLength,
        ajaxLoading = false,
        xv_projectHeight,
        content = false,
        xv_projects = $('.projects'),
        easing = 'easeOutExpo',
        nav_height = $('#sticktop').height(),
        loader = $('.ajax-loader'),
        projectContainer = $('.ajax-content'),
        projectNav = $('.folio-nav ul'),
        exitProject = $('#folio-close');

    $('.folio-nav ul').fadeOut();

    $(window).bind('hashchange', function () {
        hash = $(window.location).attr('hash');
        var root = '#';
        var rootLength = root.length;
        if (hash.substr(0, rootLength) != root) {
            return;
        } else {
            hash = $(window.location).attr('hash');
            url = hash.replace(/[#]/g, '');

            $('.project a').click(function () {
                $('.project').removeClass('active');
                $(this).parent('.project').addClass('active');
            });

            $('.portfolio').find('.projects.active-folio').removeClass('active-folio');
            $('.portfolio').find('.ajax-holder.ajax-action').removeClass('ajax-action');
            xv_projects.find('.project a[href="#' + url + '"]').parent().addClass('active');
            xv_projects.find('.project.active').find('a[href="#' + url + '"]').addClass('active');
            xv_projects.find('.project a[href="#' + url + '"]').parents('.projects').addClass('active-folio');

            $('.ajax-holder').addClass('ajax-action');
            if (hash.substr(0, rootLength) == root) {
                jQuery('html,body').stop().animate({
                    scrollTop: (projectContainer.offset().top - 20) + 'px'
                }, 800, 'easeOutExpo', function () {
                    loadProject();
                });
            } else if (hash.substr(0, rootLength) == root) {

                jQuery('html,body').stop().animate({
                    scrollTop: (projectContainer.offset().top - nav_height + 100) + 'px'
                }, 800, 'easeOutExpo', function () {

                    if (content == false) {
                        loadProject();
                    } else {
                        projectContainer.animate({
                            opacity: 0,
                            height: xv_projectHeight
                        }, function () {
                            loadProject();
                        });
                    }
                    projectNav.fadeOut('100');
                });
            } else if (hash == '' || hash.substr(0, rootLength) != root || hash.substr(0, rootLength) != root) {
                xv_scrollTo = hash;
                $('html,body').stop().animate({
                    scrollTop: xv_scrollTo + 'px'
                }, 1000, function () {
                    XV_ajaxClose();
                });
            }
        }
    });

    function loadProject() {
        loader.fadeIn().removeClass('projectError').html('');
        if (!ajaxLoading) {
            ajaxLoading = true;
            projectContainer.load(url + ' div#ajaxpage', function (xhr, statusText, request) {
                if (statusText == "success") {
                    ajaxLoading = false;
                    page = $('#ajaxpage');
                    $('#ajaxpage').waitForImages(function () {
                        loader.delay(400).fadeOut(function () {
                            showProject();
                        });
                    });
                }
                if (statusText == "error") {
                    loader.addClass('projectError').append("<p>Loading Error!</p>").slideDown();
                }
            });
        }
    }

    function showProject() {
        xv_projectHeight = projectContainer.children('#ajaxpage').outerHeight() + 'px';
        if (content == false) {
            xv_projectHeight = projectContainer.children('#ajaxpage').outerHeight() + 'px';
            projectContainer.animate({
                opacity: 1,
                height: xv_projectHeight
            }, function () {
                xv_scrollTo = $('html,body').scrollTop();
                projectNav.fadeIn();
                content = true;
            });
        } else {
            xv_projectHeight = projectContainer.children('#ajaxpage').outerHeight() + 'px';
            projectContainer.animate({
                opacity: 1,
                height: xv_projectHeight
            }, function () {
                xv_scrollTo = $('html,body').scrollTop();
                projectNav.fadeIn();
            });
        }
        projectIndex = xv_projects.find('.project.active').index();
        projectLength = $('.project a').length - 1;
        if (projectIndex == projectLength) {
            $('#folio-next').addClass('disabled');
            $('#folio-prev').removeClass('disabled');
        } else if (projectIndex == 0) {
            $('#folio-prev').addClass('disabled');
            $('#folio-next').removeClass('disabled');
        } else {
            $('#folio-next, #folio-prev').removeClass('disabled');
        }
    }

    function XV_ajaxClose(closeURL) {
        projectNav.fadeOut();
        projectContainer.animate({
            opacity: 0,
            height: '0px'
        }, 800, 'easeOutExpo');
        projectContainer.empty();
        $('html,body').stop().animate({
            scrollTop: projectContainer.offset().top - nav_height - 100
        });
        $('.portfolio').find('.projects.active-folio').removeClass('active-folio');
        $('.portfolio').find('.ajax-holder.ajax-action').removeClass('ajax-action');
    }
    $('#folio-next').on('click', function () {
        active = xv_projects.find('.project.active');
        next_project = active.next('.project');
        target = $(next_project).children('a').attr('href');
        $(this).attr('href', target);
        if (next_project.length === 0) {
            return false;
        }
        active.removeClass('active');
        next_project.addClass('active');
    });
    $('#folio-prev').on('click', function () {
        active = xv_projects.find('.project.active');
        prev_project = active.prev('.project');
        target = $(prev_project).children('a').attr('href');
        $(this).attr('href', target);
        if (prev_project.length === 0) {
            return false;
        }
        active.removeClass('active');
        prev_project.addClass('active');
    });
    $('#folio-close').on('click', function () {
        var xv_loader = $('.ajax-action').children('.ajax-loader');
        XV_ajaxClose($(this).attr('href'));
        xv_loader.fadeOut();
        return false;
    });
	
	
	/*================================
	8 - Statistics Handling
	================================*/
    function growRecords() {
        $('.records .stat').each(function () {
            var container = $(this);
            var total = container.attr('data-total');
            looper(total, container, 1200);
        });
    }
    function looper(total, target, duration) {
        if (duration) {
            var counter = 1;
            var speed = parseInt(duration / total);
            var interval = setInterval(function () {
                if (counter <= total) {
                    target.html(counter);
                } else {
                    target.html(total);
                    clearInterval(interval);
                }
                counter++;
            }, speed);
        } else {
            target.html(total);
        }
    }
    $('.record').bind('inview', function (event, visible) {
        if (visible === true) {
            if (!$('.record').hasClass('animated')) {
                growRecords();
            }
            $('.record').addClass('fadeInRight animated');
        }
    });
	
	
	/*===================
    9-Animation
    ===================*/
	
	  var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var testMobile = isMobile.any();
    if (testMobile === null) {
        $('.service').bind('inview', function (event, visible) {
			if (visible === true) {
				$(this).addClass('fadeInLeft animated');   
			 }
		});
		
		$('.member').bind('inview', function (event, visible) {
			if (visible === true) {
				$(this).addClass('flipInY animated');   
			 }
		});
		
		$('.pricing-column').bind('inview', function (event, visible) {
			if (visible === true) {
				$(this).addClass('flipInY animated');   
			 }
		});
    }
	
	/*===================
    5 - Contact
    ===================*/

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }


    $("#contactform").submit(function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var dataString = 'name=' + name + '&email=' + email + '&message=' + message;

        if (name === '' || !IsEmail(email) || message === '') {
            $('#valid-issue').html('Please Provide Valid Information').show();
        } else {
            $.ajax({
                type: "POST",
                url: "assets/php/submit.php",
                data: dataString,
                success: function () {
                    $('#contactform').hide();
                    $('#valid-issue').html('Your message has been sent,<BR> We will contact you back with in next 24 hours.').show();
                }
            });
        }
        return false;
    });
	
	
});
 
})(jQuery);