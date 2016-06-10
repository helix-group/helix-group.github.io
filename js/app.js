(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		$(".hero").flexslider({
			directionNav: false,
			controlNav: true,
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}

		// For clickable bio
		$(".bio > a").click(function(e){
		    e.preventDefault();
		    // $(this).next(".short-bio").slideToggle().end().parent().siblings().find(".short-bio").slideUp();
		    var current_bio = $(this).next(".short-bio").slideToggle();
		    $(".short-bio").not(current_bio).slideUp();
		});

		// For affix publication list sidebar
		$(document.body).scrollspy({
			target: ".bs-docs-sidebar",
        	offset: 40
		});

		setTimeout(function() {
			var body = $(document.body);
	        var sidebar = $(".bs-docs-sidebar");
	        sidebar.affix({
	          	offset: {
	            	top: function() {
	              	var t = sidebar.offset().top;
	              	return this.top = t
		            },
		            bottom: function() {
		            	var h = body.height();
		            	var p = $("#publication-list");
		              	return this.bottom = h - (p.offset().top + p.height())
		            }
	        	}
	        })
      	}, 100);

		// For sliding effect when click on an item in the sidebar
      	function scrollToAnchor(aid){
		    var aTag = $(aid);
		    $('html,body').animate({scrollTop: aTag.offset().top-20}, 400);
		}

		$(".slide-anchor").click(function(e) {
			e.preventDefault();
			var aid = $(this).attr("href");
			scrollToAnchor(aid);
		});

	});

	$(window).load(function(){

		// For affix publication list sidebar
		$(document.body).scrollspy("refresh");

		$('.flexslider').flexslider({
		    animation: "slide",
			controlNav: false,
			// directionNav: false
		});
	});

})(jQuery, document, window);
