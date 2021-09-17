var mygallery=new fadeSlideShow({
	wrapperid: "fadeshow-small", //ID of blank DIV on page to house Slideshow
	dimensions: [332, 226], //width/height of gallery in pixels. Should reflect dimensions of largest image
	imagearray: [
		["images/photos-1.png", "", "", ""],
		["images/photos-2.png", "", "", ""],
		["images/photos-3.png", "", "", ""],
		["images/photos-4.png", "", "", ""],
		["images/photos-5.png", "", "", ""],
		["images/photos-6.png", "", "", ""] //<--no trailing comma after very last image element!
	],
	displaymode: {type:'auto', pause:2500, cycles:0, wraparound:false},
	persist: false, //remember last viewed slide and recall within same session?
	fadeduration: 500, //transition duration (milliseconds)
	descreveal: "ondemand",
	togglerid: ""
})