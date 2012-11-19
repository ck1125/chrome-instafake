var applied = false;
var VIGNETTE_BORDER = {
	vignette: {black:0,white:0},
	noise: false,
	screen: false,
	desaturate: false,
	allowMultiEffect: true,
	viewFinder: 'images/viewfinder_bw.jpg',
	curves: false,
	blur: false
};

$(document).ready(function() {		
		$('.vintage').click(function () {
			var imageSrc = $('.vintage').attr('src');
			if (!applied && imageSrc) {
				console.log('coded!');
	        	$(this).vintage(VIGNETTE_BORDER);
				applied = true;
			}	
		});
		
	
})
