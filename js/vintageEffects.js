var imageTransforms = { 
	vignette : {
		vignette: {black:0,white:0},
		noise: false,
		screen: false,
		desaturate: false,
		allowMultiEffect: true,
		viewFinder: 'images/viewfinder_bw.jpg',
		curves: false,
		blur: false
	},
	sepia : {
        vignette: {
            black: 0.6,
            white: 0.1
        },
        noise: 25,
        screen: {
            red: 141,
            green: 107,
            blue: 3,
            strength: 0.47
        },
        desaturate: 0.7,
        allowMultiEffect: true,
		viewFinder: 'images/viewfinder_bw.jpg',
        mime: 'image/jpeg',
        viewFinder: false
    },
    grayscale : {
        vignette: {
            black: 0.7,
            white: 0.2
        },
        noise: 25,
        screen: false,
        desaturate: 1,
        allowMultiEffect: true,
        mime: 'image/jpeg',
		viewFinder: 'images/viewfinder_bw.jpg',
        viewFinder: false
    }	
			
};

$(document).ready(function() {		
		$('.chopped.box').click(function () {
			var imageSrc = $('img.vintage').attr('src');
			if (imageSrc) {
				console.log('image loaded!');
				var transform = $(this).data('transform');
				console.log('selected transform ->'+transform);
				console.log('transform config ->'+JSON.stringify(imageTransforms[transform]));
	        	$('img.vintage').vintage(imageTransforms[transform]);
			}	
		});
		
	
})
