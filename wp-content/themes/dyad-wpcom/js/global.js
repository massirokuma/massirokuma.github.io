/**
 * Theme frontend scripts
 *
 * @package    dyad
 *
 */

( function( $ ) {

	var $window = $( window );

	$( '.no-js' ).removeClass( 'no-js' );

	/**
	 * Banner slider
	 */

	if ( $().slick ) {

		$( '#site-banner.enable-slider .site-banner-inner' ).slick( {
			'adaptiveHeight' : false,
			'autoplay'       : true,
			'autoplaySpeed'  : ( ! jQuery( '#site-banner' ).data( 'speed' ) ) ? ( 5400 ) : ( jQuery( '#site-banner' ).data( 'speed' ) ),
			'cssEase'        : 'ease-in-out',
			'dots'           : false,
			'draggable'      : false,
			'easing'         : 'easeInOutBack',
			'fade'           : true,
			'pauseOnHover'   : true,
			'slide'          : 'article',
			'speed'          : 600,
			'swipeToSlide'   : true,
			'prevArrow'      : '<div class="slider-nav slider-nav-prev"><button type="button" class="slick-prev"><span class="genericon genericon-expand"></span></button></div>',
			'nextArrow'      : '<div class="slider-nav slider-nav-next"><button type="button" class="slick-next"><span class="genericon genericon-expand"></span></button></div>'
		} );

	}


	/**
	 * Page scrolled?
	 */

	if ( 0 == $window.scrollTop() ) {
		$( 'body' ).addClass( 'not-scrolled' )
	}

	$window.on( 'scroll', function( e ) {
		if ( 0 == $window.scrollTop() ) {
			$( 'body' ).addClass( 'not-scrolled' ).removeClass( 'is-scrolled' );
		} else {
			$( 'body' ).addClass( 'is-scrolled' ).removeClass( 'not-scrolled' );
		}
	} );


	/*
	 * Add 'focus' style to contact form
	 */

	$('.comment-form-author input, .comment-form-email input, .comment-form-url input, .comment-form-comment textarea').focus( function() {
		$( this ).parent().addClass( 'focus' );
	} ).blur( function() {
		if( "" == $( this). val() ) {
			$( this ).parent().removeClass( 'focus' );
		}
	} );

	/*
	 * Make sure 'Add Yours' comment link doesn't overshoot the form when header is fixed
	 */

	$( '.add-comment-link' ).click( function( e ) {
		if( $( window ).width() > 1400 ) {
			e.preventDefault();
			var offset = $( '#respond' ).offset();
			var scrollto = offset.top - ( $('#masthead').innerHeight() + 50 );
			$('html, body').animate({scrollTop:scrollto}, 0);
		}
	} );


	/**
	 * Make sure content isn't too high in grid view
	 */

	function adjustPosts() {
		$('.posts .entry-inner').each( function() {
			var $contain = $(this),
				$innerContainHeight = $('.entry-inner-content', this ).height()
				$header = $('.entry-header', this),
				$headerHeight = $header.innerHeight(),
				$content = $('.entry-content', this),
				$contentHeight = $content.innerHeight(),
				$wholeContentHeight = $headerHeight + $contentHeight;

			if ( $innerContainHeight < $wholeContentHeight ) {
				$contain.parent().addClass('too-short');
			} else {
				$contain.parent().removeClass('too-short');
			}
		} );
	}


	/**
	 * Adjust header height
	 */

	function adjustHeaderHeight() {
	 	var $header = $('#masthead'),
	 		$headerHeight = $header.outerHeight() + 50;

	 	if( $('body').hasClass('blog') || $('body').hasClass('home')  ) {
			if( $('.site-banner-header').length !== 0 && $('.site-banner-header').offset().top <= $headerHeight ) {
		 		$('.site-banner').addClass('too-tall');
			}

		} else {
			$('body:not(.blog, .home, .single-format-image.has-post-thumbnail) .site-content').css('padding-top', $headerHeight );
		}
	}


	/**
	 * Masonry for footer widgets
	 */

	 function widgetMasonry() {
		// Determine text direction
		var ltr = true;
		if ( $('html' ).attr( 'dir' ) == 'rtl') {
			ltr = false;
		}

		$( '.grid-container' ).masonry( {
			itemSelector: '.widget',
			columnWidth: '.widget-area aside',
			isOriginLeft: ltr,
		} );
	}


	/**
	 * Firing events
	 */

	// fire on load
	$( document ).ready(function(){
		adjustPosts();
		adjustHeaderHeight();
		widgetMasonry();

		// Fire Masonry again after a delay, for widgets that load iframes
		setTimeout( widgetMasonry, 2500 );
	} );

	// fire again when window is resized
	$( window ).resize( function() {
		adjustPosts();
		adjustHeaderHeight();
	} );

	// if Infinite Scroll, fire again when new posts are loaded
	$( document.body ).on( 'post-load', function() {
		adjustPosts();
	} );

} )( jQuery );
