const portfolioSite = {};
portfolioSite.smoothScroll = function(){
	  $('a[href*="#"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	    && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
}
portfolioSite.hideDotNav = function() {
	$('.filters').on('click', 'input', function () {
		let filterValue = this.value;
		if (filterValue == "*"){
			$(".dot-nav__Container").removeClass("hidden");
		}else{
			$(".dot-nav__Container").addClass("hidden");
		}
	});
}

portfolioSite.dotNav = ()=>{
		
	    $(window).bind('scroll',function(e){
	      dotnavigation();

	      let scrollTop = $(window).scrollTop();
	      var nav = $('.hiddenNav');
	      let prev = $('#colouredBackground').offset().top;
	      let before = $("#homeAboutBG").offset().top;

	      nav.toggleClass('shown', scrollTop > prev  && scrollTop < before);
	      prev = scrollTop;
	    });
	    
	    function dotnavigation(){
	             
	        var numSections = $('.homeGallery__item').length;
	        
	        $('#dot-nav li a').removeClass('active').parent('li').removeClass('active');   

	        $('.homeGallery__item').each(function(i,item){
	          var ele = $(item), nextTop;
	          
	          console.log(ele.next().html());
	          
	          if (typeof ele.next().offset() != "undefined") {
	            nextTop = ele.next().offset().top;
	          }
	          else {
	            nextTop = $(document).height();
	          }
	          
	          if (ele.offset() !== null) {
	            var thisTop = ele.offset().top - ((nextTop - ele.offset().top) / numSections);
	          }
	          else {
	            thisTop = 0;
	          }
	          
	          var docTop = $(document).scrollTop();
	          
	          if(docTop >= thisTop && (docTop < nextTop)){
	            $('#dot-nav li').eq(i).addClass('active');
	          }
	        });   
	    }

	    /* get clicks working */
	    $('#dot-nav li').click(function(){
	      
	        var id = $(this).find('a').attr("href"),
	          posi,
	          ele,
	          padding = 0;
	      
	        ele = $(id);
	        posi = ($(ele).offset()||0).top - padding;
	      
	        $('html, body').animate({scrollTop:posi}, 'slow');
	      
	        return false;
	    });
	
}


portfolioSite.isotopeFeatures =  function(){ 

	$('.carousel').flickity({
	  // options
	  cellAlign: 'left',
	  contain: true,
	  imagesLoaded:true,
	  perscentPosition: false,
	  autoPlay: 2500,
	  wrapAround: true,
	  prevNextButtons: false
	});

	var $grid = $('.grid').imagesLoaded(
		function(){
				$grid.isotope({
					percentPosition: true, 
					layoutMode: 'masonry',
					stagger: 30,
					transitionDuration: '0.2s'
				});
			});
	
	$('.filters').on('click', 'input', function () {
		let filterValue = this.value;
		$grid.isotope({ filter: filterValue });
	});
}

//////////////////////
//////////////////////
//INIT AND DOC READY//
//////////////////////
//////////////////////

portfolioSite.init = function(){
	portfolioSite.hideDotNav();
	portfolioSite.dotNav();
	portfolioSite.smoothScroll();
};

$(window).on("load", function(){ portfolioSite.isotopeFeatures(); });

$(function() {
	//This is our starting point. When the DOM is ready we call the init
	//method to start things off.
	portfolioSite.init(); 
});