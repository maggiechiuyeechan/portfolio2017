const portfolioSite = {};

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
		var filterValue = this.value;
		$grid.isotope({ filter: filterValue });
	});
}

//////////////////////
//////////////////////
//INIT AND DOC READY//
//////////////////////
//////////////////////

portfolioSite.init = function(){
};

$(function() {
	//This is our starting point. When the DOM is ready we call the init
	//method to start things off.
	portfolioSite.init(); 
	portfolioSite.isotopeFeatures();

});