var mygallery=new fadeSlideShow({
	wrapperid: "fadeshow1", //ID of blank DIV on page to house Slideshow
	dimensions: [970, 448], //width/height of gallery in pixels. Should reflect dimensions of largest image
	imagearray: [
		["images/header-pic01.jpg", "", "", ""],
		["images/header-pic02.jpg", "", "", ""],
		["images/header-pic03.jpg", "", "", ""],
		["images/header-pic04.jpg", "", "", ""],
		["images/header-pic05.jpg", "", "", ""],
		["images/header-pic06.jpg", "", "", ""] //<--no trailing comma after very last image element!
	],
	displaymode: {type:'auto', pause:2500, cycles:0, wraparound:false},
	persist: false, //remember last viewed slide and recall within same session?
	fadeduration: 500, //transition duration (milliseconds)
	descreveal: "ondemand",
	togglerid: ""
})