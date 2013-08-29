/**************************************************************************
	
	Master Functions
	

	Sections

		masterFunctions
			Init
			Overlay
			Audio
			Utilities

		Walkthrough

		Ghost

		Root Functions (used in XML)

		Sound Adjust

		Video Player

		jQuery Extension


	Objects

		master = new masterFunctions()


**************************************************************************/




var masterFunctions = function() {
	var fadeSpeed = 500,
		pagepath = 'http://www.offshore-interactive.com/pages/',
		that = this,
		visitedPages = getCookie("visitedPages"),
		audio = document.getElementsByTagName('audio'),
		newPageTrigger,
		isParent,
		videoType = ".webm",
		css3transitionend = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

	this.isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

	this.ghostBuster = false
	this.ghostMinc

	// webm or h264
	var v = document.createElement('video');
	if(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '')) {
	 	videoType = '.mp4';
	}

	if(v.canPlayType && v.canPlayType('video/webm').replace(/no/, '')) {
	 	videoType = '.webm';
	}

	this.videoType = videoType

    try {
      isParent = parent.IS_PARENT;
    }catch(e){
      isParent = false;
    }

    this.mute = false
	that.overlayOpen = false // stops map icon, fastpan, etc from re-appearing when it shouldn't

    // CDN URLs
    this.cdn_imgseq = 'http://8ebf72528a85af39b7bf-e3520fb483eb859425be483d5cc39cf4.r48.cf2.rackcdn.com/'
    this.cdn_panos  = 'http://51feb41d8c5706a8e6e7-4b718bfe00f3e21e7ec454784bd539a2.r98.cf2.rackcdn.com/'
    this.cdn_video  = 'http://fe08d365603a52be8002-b68b5b3ce203a95e77baefdb31efdc2e.r46.cf2.rackcdn.com/'
    this.audio_path = 'audio/'

    this.movieMenu = false

    isRetinaFunction = function(){var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\ (min--moz-device-pixel-ratio: 1.5),\ (-o-min-device-pixel-ratio: 3/2),\ (min-resolution: 1.5dppx)"; if (window.devicePixelRatio > 1) return true; if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true; return false; };
    this.isRetina = isRetinaFunction()
     
     $('.compass').click(function() {
     	$(this).fadeOut(500)
		that.loadOverlay('rigmap.php')
     });

    var delayNavSlide = function(){
    	$(".breadcrumb").animate({'bottom': '-40'}, 500)
    	$("#offshorelogo").animate({'bottom': '-10'}, 500)
    }

    var navInterval = setTimeout(delayNavSlide, 5000); 
     
    $('.breadcrumb').mouseover(function() {
    	if(!master.overlayOpen) {
			clearInterval(navInterval);
		    $(".breadcrumb").animate({'bottom': '0'}, 500)
		  // $("#offshorelogo").animate({'bottom': '25'}, 500)	
    	}

    });
 
 
    $('.breadcrumb').mouseleave(function() {
       	clearInterval(navInterval);
        navInterval = setTimeout(delayNavSlide, 1000);
    }); 


    $('.wrapper').on('mousedown',function(){
       $('.pan-directions').fadeOut(500)
       pano.panDirectionsShown = true;
    }); 





    /* iPad Functions */

    if(Modernizr.touch) {

    	console.log('[MODERNIZR] Touch detected, enabling touch events')

    	document.addEventListener('touchstart', function(e) {
    		for ( var i = 0, l = parent.audiomaster.mix.tracks.length; i < l; i++ ){                                              
                parent.audiomaster.mix.tracks[i].play()                                    
            }    
    	    $('.pan-directions').fadeOut(500)
    	}, false);	


    	$(document).bind('touchend', function(e) {
		    $(e.target).trigger('click');
		});
    }

    
     

               
    var transition_audio = $('#transition', window.parent.document)
    
    var hashouter = parent.window.location.hash;
    
    if( hashouter  == "#hatch.php"){
    	transition_audio[0].src = master.audio_path + "Hatch_Open.mp3"
    }
    
    if(!visitedPages){
    	visitedPages = "empty"
    	setCookie("visitedPages",visitedPages,365)
    }
    
    this.url_array = [];
    
    this.divider = ((window.innerWidth-168) / this.url_array.length)

    
    this.video_array = []

    this.video_array.push({'video':'action_06'});

    this.video_array.push({'video':'action_02'});

    this.video_array.push({'video':'action_03'});

    this.video_array.push({'video':'action_04'});

    this.video_array.push({'video':'action_05'});

    this.ghost_array = []

    //hologram_drillhead-frame-
    //hologram_guy_walks_away-frame
    //hologram_helicopter-frame-

    this.ghost_array.push({'ghost':'hologram_walk_towards_camera2-frame-','frames':16});



    /**************************************************************************
    	
    	Dynamic Resizing

    	- all resizing functionality needs to be triggered inside resizeFunction(),
    	  in order to function properly on iOS devices

    **************************************************************************/

    that.globals = {
	    cover:   {}, // fill screen at all times
	    contain: {}  // maintain visibility of entire element
	};

	that.resize = {
		videoplayer : null,
		walkthrough : null
	}

    var resizetimeout;

    that.debouncedResize = function(){
    	if(resizetimeout) clearTimeout(resizetimeout);
    	resizetimeout = setTimeout(resizeFunction, 50)
    }

    function resizeFunction(){

      	console.log('<<< Global Resize >>>')

    	// Calculate ********************************************************

	    var ratio = 9/16,
	    	w, h, t, l;
		
	    /***** CONTAIN *****/
	    w = window.innerWidth;
    	h = w * ratio;
    
    	if(h > window.innerHeight) {
    		h = window.innerHeight;
    		w = h / ratio;
    	}
    
    	t = (window.innerHeight - h) / 2;
	    l = (window.innerWidth - w) / 2;
    
    	that.globals.contain.w = Math.round(w)
      	that.globals.contain.h = Math.round(h)
      	that.globals.contain.t = Math.round(t)
      	that.globals.contain.l = Math.round(l)
    	
    	/***** COVER *****/
    	w = window.innerWidth;
	    h = w * ratio;
	    
	    if(h < window.innerHeight) {
	        h = window.innerHeight;
	        w = h / ratio;
	    }

	    t = (window.innerHeight - h) / 2;
	    l = (window.innerWidth - w) / 2;
	    	
    	that.globals.cover.w = Math.round(w)
      	that.globals.cover.h = Math.round(h)
      	that.globals.cover.t = Math.round(t)
      	that.globals.cover.l = Math.round(l)


      	// Apply ********************************************************

      	if(master.resize.videoplayer) {
      		$("#video-overlay").css({
      			'top' : master.globals.contain.t,
      			'left' : master.globals.contain.l,
      			'width' : master.globals.contain.w,
      			'height' : master.globals.contain.h
      		})

      		$('.video-content-wrap .controls').css('bottom',master.globals.contain.t)	
      	}

      	if(pano) {
      		if(pano.panoWalkthrough) {
      			pano.panoWalkthrough.resize();
      		}
      		if(pano.walkthrough) {
      			pano.walkthrough.resize();
      		}

      		if(pano.ghostTransition) {
      			pano.ghostTransition.resize();
      		}
      	}
      	
    	
    }

    that.debouncedResize();

    $(window).on('resize.global',that.debouncedResize)
    window.addEventListener('onorientationchange', that.debouncedResize());








  	/**********************************************************************
  	***********************************************************************
		
		init

	***********************************************************************
  	**********************************************************************/
    	      
	this.init = function(no_fade){

  		// this._frame = null

  		console.log("INIT TOOLBAR")

  		//$("#wrapper").append('<a class="navlink"  data-url="index.php"><h1 id="offshorelogo"><span class="hidden">OFFSHORE</span></h1></a>');
  		//$("#scroll-wrapper").append('<a class="navlink"  data-url="index.php"><h1 id="offshorelogo"><span class="hidden">OFFSHORE</span></h1></a>');
     	
     	$(".navlink").click(function(){
      		that.parentChange('index.php')
	  	}) 
	    
  		

        var insertNav = function(price, change, percent) {

        	$(".breadcrumb").html('');

            var breadbox_string = '<div id="breadbox-container">';
            
            if(that.isRetina)
            	breadbox_string += '<h1><img class="backtostart" src="images/splash_logo_small@2x.png" alt=""></h1>';
            else
            	breadbox_string += '<h1><img class="backtostart"  src="images/splash_logo_small.png" alt=""></h1>';

           

            breadbox_string += '<nav class="left">';
            // breadbox_string += '<ul><li><a href="about.html">About</a></li>';
            // breadbox_string += '<li><a href="blog.html">Blog</a></li>';
            // breadbox_string += '<li><a href="resources.html">Resources</a></li></ul>';
            breadbox_string += '</nav>';

            breadbox_string += '<div class="info">';
            breadbox_string += '<div class="title"><p>Brent Crude Oil</p><p>USD / Barrel</p></div>';
            breadbox_string += '<div class="price"><p>$' + price + '</p></div>';
            breadbox_string += '<div class="change"><p>' + change + '</p><p>' + percent + '</p></div>';
			breadbox_string += '</div>'


			breadbox_string += '<div class="share">'
			breadbox_string += '<div class="facebook"><a target="_BLANK" href="http://www.facebook.com/share.php?u='+window.location.href+'"></a></div>'
			breadbox_string += '<div class="twitter"><a target="_BLANK" href="http://twitter.com/share?url='+'asdf.com'+'&text="></a></div>'
			breadbox_string += '</div></div>'


            $('.breadcrumb').html(breadbox_string);

            $('.backtostart').click(function(){
            	parent.window.location.hash = '';
            })

           
        }
  
  		var hash = parent.window.location.hash

  		var placer = that.divider, temp_icon;

        var futureMonthsCode = ['F','G','H','J','K','L','M','N','Q','U','V','X','Z']

        var d = new Date();
        var m = d.getMonth();
        var y = d.getYear();

        


        // Oil price ticker

        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20LastTradePriceOnly,ChangeinPercent,Change%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22BZ' + futureMonthsCode[4] + '14.NYM%22%29%0A%09%09&format=xml&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env'
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            success: function(xml){
                var price = $(xml).find("LastTradePriceOnly").text();
                var percent = $(xml).find("ChangeinPercent").text();
                var change = $(xml).find("Change").text();
                // console.log('[oil ticker]: $'+price+'\t'+percent)
                insertNav(price, change, percent);
            }
        });

        
			
  	// 	$(".breadbox").click(function(){
			// that.pageChange($(this).data('url'))
	  // 	}) 

  //     	$(".breadbox-rigmap").click(function(){
		// 	that.loadOverlay('rigmap.php')
		// })

 		// Disable iOS overscroll
 		$(document).on('touchstart', function(e) { e.preventDefault(); });

	} // end init









	/********************************************************************************
		
		> Overlay Functionality


		there is only one overlay at a time (map, book, etc)

		loadOverlay('example.php');
		closeOverlay();

	********************************************************************************/


	this.loadOverlay = function(overlayURL){

		if(master.overlayOpen === true) return;

		master.overlayOpen = true
		master.ghostBuster = true

		
		$("#panocontainer").addClass('hide')
		$('.scroll-directions').fadeOut(500)
		$('.compass').fadeOut(500,function(){
			$("#panocontainer").addClass('no-pointer-events')
			$("#panocontainer").hide();
		})

		if(pano.video_underlay) $('.video-underlay').fadeOut(500)


		// load overlay

		$('#overlay_frame').attr('src', 'overlay/' + overlayURL)
		$('#overlay_frame').one('load',function(){
			console.log('overlay frame loaded')
			$('#overlay_frame').fadeIn()
		})

		$('#overlay_frame').contents().find('body').off('click')
		$('#overlay_frame').contents().find('body').on('click',function(e){
			e.preventDefault();
			e.stopPropagation()
			master.closeOverlay()
		})
	}



	this.closeOverlay = function(_URL){

		console.log('close overlay')

		//$('#overlay_frame').removeClass('show')

		$('#overlay_frame').fadeOut(500,function(){

			krpano = document.getElementById("krpanoObject");
			krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true)")

			$("#panocontainer").show();
			$("#panocontainer").removeClass('hide') 

			if(pano.video_underlay) $('.video-underlay').fadeIn(500)

			// clear iframe
			$('#overlay_frame').attr('src','')
			//$('#overlay_frame').css('display','none')

			master.overlayOpen = false
			master.ghostBuster = false

			$('#to-control').off('click')

			$('.scroll-directions').fadeIn(500)
			$('.compass').fadeIn(500)
			$("#panocontainer").removeClass('no-pointer-events')

			if(_URL){
				newPano(_URL)
			}

		})
	}





	/**************************************************************************
		
		Audio
	
	**************************************************************************/

	// Audio Functionality
	$('.volume-toggle').click(function(){

		 master.soundTrigger = true

		var isMuted = getCookie('muted')
		console.log('click -> isMuted: '+isMuted)
		if (isMuted){
			$('.volume-toggle').html('<i class="icon-volume-up"></i>')
			delete_cookie('muted')	
			$('video').each(function(i,v){
			$(v).prop('muted', false)
			})
		}else{
			$('.volume-toggle').html('<i class="icon-volume-off"></i>')
			setCookie('muted',true)
			$('video').each(function(i,v){
			 $(v).prop('muted', true)	
			})
		}
					
	})

	

	this.loadOverlayAudio = function(_file){

		console.log(_file)

		parent.audiomaster.loadAudio( master.audio_path + _file,'overlay_01',1,-1)

		var dummysounds = { s:  0};

		var driftTweenSounds = new TWEEN.Tween( dummysounds ).to( { s: .5}, 4000 )
			.onUpdate( function() {
				master.isTweeningAudio = true
				parent.audiomaster.mix.getTrack('overlay_01').options.gainNode.gain.value = this.s
			})
			.easing(TWEEN.Easing.Quadratic.Out )
			.onComplete(function() {
				master.isTweeningAudio = false
				//TWEEN.remove(driftTweenSounds); 
				//driftTweenSounds = null
			})
			.start();               
	}

	this.WAAloadAudio = function(_file,_trackName,_pan,_targetVolume,_isLoop){

		parent.audiomaster.loadAudio(_file ,_trackName,0001,_pan,_isLoop)

		var dummysounds = { s:  0};

		var driftTweenSounds = new TWEEN.Tween( dummysounds ).to( { s: _targetVolume}, 2000 )
			.onUpdate( function() {
				master.isTweeningAudio = true
				parent.audiomaster.mix.getTrack(_trackName).options.gainNode.gain.value = this.s
			})
			.easing(TWEEN.Easing.Quadratic.Out )
			.onComplete(function() {
				master.isTweeningAudio = false
				//TWEEN.remove(driftTweenSounds); 
			})
			.start();               
	}

	this.AFXloadAudio = function(_file,_trackName,_pan,_targetVolume,_start){

		console.log(_file)

		if(!_start) _start = 0

		if(parent.audiomaster.mix.getTrack(_trackName)) parent.audiomaster.mix.removeTrack(_trackName)

		if(!_targetVolume) {_targetVolume = 1.0}

		parent.audiomaster.loadAudio(_file,_trackName,0001,_pan,"true", _start)

		var dummysounds = { s:  0};

		var driftTweenSounds = new TWEEN.Tween( dummysounds ).to( { s: _targetVolume}, 2000 )
			.onUpdate( function() {
				master.isTweeningAudio = true
				parent.audiomaster.mix.getTrack(_trackName).options.gainNode.gain.value = this.s
			})
			.easing(TWEEN.Easing.Quadratic.Out )
			.onComplete(function() {
				master.isTweeningAudio = false
				//TWEEN.remove(driftTweenSounds); 
			})
			.start();               
	}



	this.audioFadeAll = function(targetVolume){
	 
		if(isParent){
			
		var parent_audio = $('audio', window.parent.document)
	     
		parent_audio.each(function(i,s){
			
			var audio_obj = parent_audio[i]
	        audioFadeOutTo(audio_obj,targetVolume)

		})
	   }
	}

	this.audioFadeInAll = function(){

	}






	/**************************************************************************
		
		Utilities
	
	**************************************************************************/

	this.loadVideoUnderlay = function(_id,_popcorn,_load_menu){
	    
		parent.audiomaster.mix.setGain(0.1)
		
	    if( this.popcorn) Popcorn.destroy(  this.popcorn );
	    $('#footnote-container').html('')
	    if(_popcorn){
	       this.popcorn = Popcorn("#video-underlay");
	       this.popcorn.parseJSON( "json/"+_popcorn+".json?rnd="+Math.random()*10, function() {

	        console.log( _popcorn + " parsed successfully" );
	      });
	    }

	    $("#video-underlay").fadeOut(1000, function() {        
	        $('#video-underlay source').attr('src', _id + videoType);
	        $('#video-underlay video').load();
	        $("#video-underlay")[0].load()
	        $("#video-underlay")[0].play()
	        $("#video-underlay").fadeIn(500)
	        if(_load_menu) $('.movie-menu').css('display','block')
	       // }
	        
	    })

	}

	this.blankTrans = function(_isNotPano){

		if(_isNotPano) {

		}else{
		var getGhost = this.ghost_array[Math.floor(Math.random()*this.ghost_array.length)]
		this.ghostTrans(getGhost['ghost'],getGhost['frames'])		
		}	

	}

	this.ghostTrans = function(_id,numberOfFrames,_isNotPano){

	    //$('body').append('<canvas id="ghost-canvas-trans" />')

		var ghost = new ghostFunctions("ghost-canvas-trans",_id,numberOfFrames)
	 
		ghost.imageSequencer()

		$('#ghost-canvas-trans').fadeIn()

		console.log("make ghost")

		return ghost;

	}

	




		
	function hasUserAgent(condition) {
	    return navigator.userAgent.match(condition);
	}

	function setCookie(c_name,value,exdays)
	{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
	}

	this.setCookie = setCookie


	function getCookie(c_name)
	{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
	    {
	    return unescape(y);
	    }
	  }
	}

	this.getCookie = getCookie

	function delete_cookie(name){
		document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	}

	this.delete_cookie = delete_cookie

	this.get_tag = function() {
	    var tag=getCookie("offshore_tag");
	    if(that.tag_array)
	    var return_value = that.tag_array[0]
	    if (tag==null || tag==""){

	        that.tag_array.sort(function(){ return Math.random()-0.5; });
	        return_value =  that.tag_array.pop();
	        setCookie("offshore_tag",that.tag_array.join('~') ,365);

	    }else{

	        var a = tag.split("~")
	        return_value =  a.pop();
	        setCookie("offshore_tag",a.join('~') ,365);

	  }
	  //console.log(return_value)
	  return return_value
	}
	var stat_num= 0
	this.get_stat = function() {
	    var tag=getCookie("offshore_stat");
	    var return_value = that.stat_array[stat_num]
	     stat_num++
	if(stat_num == that.stat_array.length){
		stat_num =0
	}

	  return return_value
	}


	this.check_start = function(){

		var tag=getCookie("seen_frontpage");

	    if (tag==null || tag==""){
	    	$('body.platform').find('#overlay').delay(2000).fadeIn(500);
	    	setCookie("seen_frontpage",true);
	    }
	    // e// }
	}

	this.remove_start = function(){	  
	   delete_cookie("seen_frontpage");
	}

	this.set_mute = function() {
		console.log('set_mute()')
		// var tag = getCookie("muted");
		// if (tag==null || tag==""){
			setCookie('muted',true)
		// }
	}

	this.remove_mute = function() {
		delete_cookie('muted')
	}


	this.setDeepLinking = function(deepLink){
		var isParent 
		
		if(visitedPages.indexOf(deepLink)== -1){
		 	visitedPages += "~" + deepLink
		 	setCookie("visitedPages",visitedPages,365)
		}

	    try {
	        isParent = parent.IS_PARENT;
	    }catch(e){
	        isParent = false;
	    }
	  
		if(isParent){
				//var transition_audio = $('#transition', window.parent.document)
			if(getCookie('muted')!="true"){
				//transition_audio[0].volume = .2
				//transition_audio[0].play()
				}
			  	
			parent.setHash(deepLink)

		}else{
			
		}
	  
	}

} // end master

// STARTS THE EXPERIENCE

var master = new masterFunctions();
master.init();
master.check_start();












/*************************************************************************

	

	> Walkthrough
	


*************************************************************************/


var walkthroughFunctions = function(canvasid,name,imageNumber) {
	
	var that = this,
		w = master.globals.contain.w,
		h = master.globals.contain.h,
    	that = this

	this.maxScrollerPos = $('.scroll-directions-container').height()

	var canvas = document.getElementById(canvasid);
	canvas.width  = w;
	canvas.height = h;
	var context = canvas.getContext('2d');
    var mouseWheelTimeout;

    var oddOnly = false;
    if(imageNumber > 200) oddOnly = true;

    var scrollerPos = parseInt($( ".scroll-directions" ).css('top'))
    var scrollerPosStart = 0

    this.percent = 0 // MASTER VARIABLE (everything runs off this)

    var playSpeed = (100/imageNumber)/100;
    if(!oddOnly) playSpeed = playSpeed / 2;

	var imageSrc
    imageSrc = master.cdn_imgseq + name + "-med-frame-0001.jpg";
    var img = new Image();
	img.src = imageSrc
	img.onload = function(){ context.drawImage(img, 0, 0,w,h); }

	// Preload ********************************************************
	// (odd numbered images only)
	this.preload = function(){
		console.log('preloading '+imageNumber+' images')

		var i = 1;

		var img = new Image()

		img.src = master.cdn_imgseq + name + "-sm-frame-"+zeroes(i,4)+".jpg";

		img.onload = function(){
			i += (oddOnly) ? 2 : 1;

			if(i<imageNumber)
				img.src = master.cdn_imgseq + name + "-sm-frame-"+zeroes(i,4)+".jpg";

		}

	}

	// keep
    var scrollerPos = parseInt($( ".scroll-directions" ).css('top'))
    var scrollerPosStart = 0

    // MASTER CONTROL VARIABLE
    this.percent = 0

	var imageSrc
    imageSrc = master.cdn_imgseq + name + "-med-frame-0001.jpg";

    var img = new Image();
	img.src = imageSrc
	img.onload = function(){ context.drawImage(img, 0, 0,w,h); }


	/**************************************************************************
		Walkthrough Video
		(additional logic in scrollFunction and scrollStopFunction)
	**************************************************************************/
	
	var walkthroughvideo = false;
	if(master.globalPano =='chemicalroom' || master.globalPano =='subhanger') walkthroughvideo = true;
	console.log('walkthroughvideo: '+'\t'+walkthroughvideo)

	if(walkthroughvideo) {
		$("#walking-exit").off('click')
		$("#walking-exit").on('click',function(){
			that.closeWalkthroughVid()
		});

		$('#video-overlay').on('ended',function(){
			// reset walkthrough
		    scrollerPos = 0
		    $( ".scroll-directions" ).css('top',scrollerPos)
		    scrollValue =  parseInt($( ".scroll-directions" ).css('top')) * 5000 / (window.innerHeight - 220)
		    scrollPercent = Math.ceil((scrollValue / (5000-$(window).height())) * imageNumber);
			that.percent = 
			that.scrollValue = scrollValue
			that.scrollFunction()

		})
	}

    this.closeWalkthroughVid = function(){

    	console.log('CLOSE WALKTHROUGH')

    	if(!master.overlayOpen) {
			$('#panocontainer, .fastpan, .compass').fadeIn(500)

			$('.scroll-directions, .panoversion, #walking-exit').fadeOut(function(){
		        that.percent = 0.01
			    $( ".scroll-directions" ).css('top',0)
			    that.scrollStopFunction()
		    })
    	} else {
	        that.percent = 0.01
		    $( ".scroll-directions" ).css('top',0)
		    that.scrollStopFunction()
		    // closeVideoPlayer() // INFINITE LOOOOOOP
    	}

    	krpano = document.getElementById("krpanoObject");
		krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true),js(showMapIcon();))")

    }

	// auto resize ---------------------------------------------------------

	this.resize = function(){
		that.maxScrollerPos = window.innerHeight - 300

		scrollValue = scrollerPosStart  * 5000 / (window.innerHeight - 220);

		$(canvas).css({
			'width' :  master.globals.contain.w,
			'height' : master.globals.contain.h,
			'top' :    master.globals.contain.t
		})
	}

	master.debouncedResize();

    // Autoplay -----------------------------------------------------------

    this.autoplay = false

	$('.hotspot').off('click')
    $('.hotspot').on('click',function(e){
    	e.stopPropagation()

    	if(that.autoplay) {
    		console.log('AUTOPAUSE ||')
    		that.autoplay=false
    	} else {
    		console.log('AUTOPAUSE >')
    		that.autoplay = true
    		that.play()
    	}
    	
    })

    this.play = function(){

    	if(that.autoplay) {

    		that.percent += playSpeed

    		advance()

    	} else {
    		console.log('autoplay: false')
    		return false;
    	}

    }

    // advance = function(scrollerPos){
    advance = function(){

    	// sanity check
    	if(that.percent > 1) {
    		that.percent = 1;
    		that.scrollStopFunction()
    		clearTimeout(mouseWheelTimeout)
    		return
    	}
    	else if(that.percent < 0) {
    		that.percent = 0.01
    		that.scrollStopFunction()
    		clearTimeout(mouseWheelTimeout)
    		return
    	}

	    // update scroll thumb
		$( ".scroll-directions" ).css('top', (that.percent * that.maxScrollerPos) )

		that.scrollFunction()
    }

    // end Autoplay functionality


    // Dragging/Mousewheel Functionality ********************************************************

	$.getScript("js/lib/jquery-ui.min.js", function(data, textStatus, jqxhr) {
		$.getScript("js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
	   		$( ".scroll-directions" ).draggable({ 
	   			axis: "y",
	   			containment: 'parent',
				drag: function() {
					
					that.autoplay = false // stop autoplay
					
					that.percent = parseInt($(this).css('top')) / (window.innerHeight-300)

					that.scrollFunction()
				},
				stop: function() {
					that.scrollStopFunction()
				}
			});
	   	});

		if(document.getElementById('scroll-wrapper')){
		   	if ($("#scroll-wrapper")[0].addEventListener) {
	        	$("#scroll-wrapper")[0].addEventListener("mousewheel", MouseWheelHandler, false); // IE9, Chrome, Safari, Opera
	        	$("#scroll-wrapper")[0].addEventListener("DOMMouseScroll", MouseWheelHandler, false); // Firefox
			} else  $("#scroll-wrapper")[0].attachEvent("onmousewheel", MouseWheelHandler); // IE 6/7/8
		}
		
		function MouseWheelHandler(e){
			console.log('mouse wheel')
	        var e = window.event || e; // old IE support
	        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))); // -1 for down, 1 for up

	        that.percent -= playSpeed * delta

	        advance()

			clearTimeout(mouseWheelTimeout)
			mouseWheelTimeout = null

	        mouseWheelTimeout = setTimeout(function(){
	        	that.scrollStopFunction()
	        },500)
		}

	});

	
    function zeroes(num, length) {
      var str = '' + num;
      while (str.length < length) {
        str = '0' + str;
      } 
      return str;
    }
 
    



	/* ***** Scroll Function ***** */

    this.scrollFunction = function(){

      	// sanity check
		if(that.percent <= 0) that.percent = 0.01
		else if(that.percent > 1) that.percent = 1

		var currentImage = Math.ceil(imageNumber * that.percent)

		if(oddOnly) {
			// make sure we actually display a frame (otherwise mousewheel sometimes sticks on odd numbers)
			if (currentImage % 2 == 0 && currentImage < imageNumber) currentImage++

			if (currentImage % 2 !== 0) imageSrc = master.cdn_imgseq + name + "-sm-frame-"+zeroes(currentImage,4)+".jpg";
		}
		else {
			imageSrc = master.cdn_imgseq + name + "-sm-frame-"+zeroes(currentImage,4)+".jpg";
		}
		
		
		console.log('currentImage: '+'\t'+currentImage)

		var img = new Image();

		img.src = imageSrc

		img.onload = function(){ context.drawImage(img, 0, 0,w,h); }

		if(walkthroughvideo) {
			if(that.percent > 0.9 && !master.overlayOpen){
				that.autoplay = false;
				$('.scroll-directions').fadeOut()
				if(master.globalPano =='chemicalroom') videoPlayer("engineroom")
				if(master.globalPano =='subhanger')    videoPlayer("subhangar")
			}	
		} 

    }



    /* ***** Stop Function ***** */

    this.scrollStopFunction = function(){


    	console.log('STOP' + '\t' + that.percent + '% \t overlayOpen: ' + master.overlayOpen)

    	if(that.percent <= 0) that.percent = 0.01
		else if(that.percent > 1) that.percent = 1

		imageSrc = master.cdn_imgseq + name + "-med-frame-"+zeroes(Math.ceil(imageNumber * that.percent),4)+".jpg";

        var img = new Image();
        img.src = imageSrc
        img.onload = function(){ context.drawImage(img, 0, 0,w,h); }

        if(walkthroughvideo) {
			if(that.percent > 0.9 && !master.overlayOpen){
				that.autoplay = false;
				$('.scroll-directions').fadeOut()
				if(master.globalPano =='chemicalroom') videoPlayer("engineroom")
				if(master.globalPano =='subhanger')    videoPlayer("subhangar")
			}	
		}

    }
              
} /// end walkthrough













/*************************************************************************

	

	> Walkthrough

	NEW VERSION USING VIDEO
	


*************************************************************************/


var Walkthrough = function(canvasID,name,videoLength) {
	
	var that = this,
		w = master.globals.contain.w,
		h = master.globals.contain.h,
    	that = this

	this.maxScrollerPos = $('.scroll-directions-container').height()

	var canvas = document.getElementById(canvasID);
	canvas.width  = w;
	canvas.height = h;
	var context = canvas.getContext('2d');

    var mouseWheelTimeout;

    // var oddOnly = false;
    // if(imageNumber > 200) oddOnly = true;

    var scrollerPos = parseInt($( ".scroll-directions" ).css('top'))
    var scrollerPosStart = 0

    this.percent = 0 // MASTER VARIABLE (everything runs off this)

    var playSpeed = (100/videoLength)/100;
    // if(!oddOnly) playSpeed = playSpeed / 2;

	var video = document.getElementById('walkthrough-vid');
	video.src=master.cdn_video + name + '.mp4'; // videoType
	video.load();

	video.oncanplaythrough = function(){
		console.log('walkthrough vid LOADED')
		context.drawImage(video,0,0,w,h);
	}

	// keep
    var scrollerPos = parseInt($( ".scroll-directions" ).css('top'));
    var scrollerPosStart = 0;

    // MASTER CONTROL VARIABLE
    this.percent = 0;


	// Walkthrough Video ---------------------------------------------------------
	// (additional logic in scrollFunction and scrollStopFunction)
	
	var walkthroughvideo = false;
	if(master.globalPano =='chemicalroom' || master.globalPano =='subhanger') walkthroughvideo = true;
	console.log('walkthroughvideo: '+'\t'+walkthroughvideo)

	if(walkthroughvideo) {
		$("#walking-exit").off('click')
		$("#walking-exit").on('click',function(){
			that.closeWalkthroughVid()
		});

		$('#video-overlay').on('ended',function(){
			// reset walkthrough
			that.percent = 0.01
		    $( ".scroll-directions" ).css('top',0)
			that.scrollFunction()
		})
	}

    this.closeWalkthroughVid = function(){

    	console.log('CLOSE WALKTHROUGH')

    	if(!master.overlayOpen) {
			$('#panocontainer, .fastpan, .compass').fadeIn(500)

			$('.scroll-directions, .panoversion, #walking-exit').fadeOut(function(){
		        that.percent = 0.01
			    $( ".scroll-directions" ).css('top',0)
			    // that.scrollStopFunction()
		    })
    	} else {
	        that.percent = 0.01
		    $( ".scroll-directions" ).css('top',0)
		    // that.scrollStopFunction()
		    // closeVideoPlayer() // INFINITE LOOOOOOP
    	}

    	krpano = document.getElementById("krpanoObject");
		krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true),js(showMapIcon();))")

    }

	// auto resize ---------------------------------------------------------

	this.resize = function(){
		that.maxScrollerPos = window.innerHeight - 300

		scrollValue = scrollerPosStart  * 5000 / (window.innerHeight - 220);

		$(canvas).css({
			'width' :  master.globals.contain.w,
			'height' : master.globals.contain.h,
			'top' :    master.globals.contain.t
		})
	}

	master.debouncedResize();

    // Autoplay -----------------------------------------------------------

    this.autoplay = false

	$('.hotspot').off('click')
    $('.hotspot').on('click',function(e){
    	e.stopPropagation()

    	if(that.autoplay) {
    		console.log('AUTOPAUSE ||')
    		that.autoplay=false
    	} else {
    		console.log('AUTOPAUSE >')
    		that.autoplay = true
    		that.play()
    	}
    	
    })

    this.play = function(){

    	if(that.autoplay) {
    		that.percent += playSpeed
    		advance()
    	} else {
    		return false;
    	}

    }

    // advance = function(scrollerPos){
    advance = function(){

    	// sanity check
    	if(that.percent > 1) {
    		that.percent = 1;
    		// that.scrollStopFunction()
    		clearTimeout(mouseWheelTimeout)
    		return
    	}
    	else if(that.percent < 0) {
    		that.percent = 0.01
    		// that.scrollStopFunction()
    		clearTimeout(mouseWheelTimeout)
    		return
    	}

	    // update scroll thumb
		$( ".scroll-directions" ).css('top', (that.percent * that.maxScrollerPos) )

		that.scrollFunction()
    }

    // end Autoplay functionality


    // Dragging/Mousewheel Functionality ********************************************************

	$.getScript("js/lib/jquery-ui.min.js", function(data, textStatus, jqxhr) {
		$.getScript("js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
	   		$( ".scroll-directions" ).draggable({ 
	   			axis: "y",
	   			containment: 'parent',
				drag: function() {
					
					that.autoplay = false // stop autoplay
					
					that.percent = parseInt($(this).css('top')) / (window.innerHeight-300)

					that.scrollFunction()
				},
				stop: function() {
					// that.scrollStopFunction()
				}
			});
	   	});

		if(document.getElementById('scroll-wrapper')){
		   	if ($("#scroll-wrapper")[0].addEventListener) {
	        	$("#scroll-wrapper")[0].addEventListener("mousewheel", MouseWheelHandler, false); // IE9, Chrome, Safari, Opera
	        	$("#scroll-wrapper")[0].addEventListener("DOMMouseScroll", MouseWheelHandler, false); // Firefox
			} else  $("#scroll-wrapper")[0].attachEvent("onmousewheel", MouseWheelHandler); // IE 6/7/8
		}
		
		function MouseWheelHandler(e){
			console.log('mouse wheel')
	        var e = window.event || e; // old IE support
	        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))); // -1 for down, 1 for up

	        that.percent -= playSpeed * delta

	        advance()

			clearTimeout(mouseWheelTimeout)
			mouseWheelTimeout = null

	        mouseWheelTimeout = setTimeout(function(){
	        	// that.scrollStopFunction()
	        },500)
		}

	});

	
    function zeroes(num, length) {
        var str = '' + num;
        while (str.length < length) str = '0' + str;
        return str;
    }
    

	/* ***** Scroll Function ***** */

    this.scrollFunction = function(){

      	// sanity check
		if(that.percent <= 0) that.percent = 0.01
		else if(that.percent > 1) that.percent = 1

		var currentTime = Math.ceil(videoLength * that.percent)

		// if(oddOnly) {
		// 	// make sure we actually display a frame (otherwise mousewheel sometimes sticks on odd numbers)
		// 	if (currentTime % 2 == 0 && currentTime < videoLength) currentTime++

		// 	if (currentTime % 2 !== 0) imageSrc = master.cdn_imgseq + name + "-sm-frame-"+zeroes(currentTime,4)+".jpg";
		// }
		// else {
		// 	imageSrc = master.cdn_imgseq + name + "-sm-frame-"+zeroes(currentTime,4)+".jpg";
		// }

		video.currentTime = currentTime;
		context.drawImage(video, 0, 0,w,h);

		console.log('currentTime: '+'\t'+currentTime)


		if(walkthroughvideo) {
			if(that.percent > 0.9 && !master.overlayOpen){
				that.autoplay = false;
				$('.scroll-directions').fadeOut()
				if(master.globalPano =='chemicalroom') videoPlayer("engineroom")
				if(master.globalPano =='subhanger')    videoPlayer("subhangar")
			}	
		} 

    }



    /* ***** Stop Function ***** */

  //   this.scrollStopFunction = function(){


  //   	console.log('STOP' + '\t' + that.percent + '% \t overlayOpen: ' + master.overlayOpen)

  //   	if(that.percent <= 0) that.percent = 0.01
		// else if(that.percent > 1) that.percent = 1

		// imageSrc = master.cdn_imgseq + name + "-med-frame-"+zeroes(Math.ceil(videoLength * that.percent),4)+".jpg";

  //      video.currentTime = currentTime;
  //      context.drawImage(video, 0, 0,w,h);


  //       if(walkthroughvideo) {
		// 	if(that.percent > 0.9 && !master.overlayOpen){
		// 		that.autoplay = false;
		// 		$('.scroll-directions').fadeOut()
		// 		if(master.globalPano =='chemicalroom') videoPlayer("engineroom")
		// 		if(master.globalPano =='subhanger')    videoPlayer("subhangar")
		// 	}	
		// }

  //   }
              
}















/*************************************************************************

	

	> Ghost

	set master.ghostBuster or master.overlayOpen to disable ghosts



*************************************************************************/



var ghostFunctions = function(canvasid,name,imageNumber) {

	filePathPre = master.cdn_imgseq // 'video/video_clips/'
	//filePathPre = 'video/newtransitions/'

	function zeroes(num, length) {
	  var str = '' + num;
	  while (str.length < length) {
	    str = '0' + str;
	  } 
	  return str;
	}

	function map(value, min1, max2, min2, max2) {
	    return min2 + (max2 - min2) * ((value - min1) / (max2 - min1));
	}

	var that = this,
		w,h;

	var canvas = document.getElementById(canvasid);
	canvas.width  = 320
	canvas.height = 180;


	this.resize = function(){
		w = master.globals.contain.w;
		h = master.globals.contain.h;
		canvas.style.width = w + 'px'
		canvas.style.height = h + 'px'
	}
	master.debouncedResize();

	
	var context = canvas.getContext('2d');
	//context.globalCompositeOperation = "source-atop"

	var imageSrc,
		playHead=1,
		ghostTimeout;

	

	this.killGhost = function(){

		console.log('killing ghost')

		clearTimeout(ghostTimeout)

		context.clearRect(0, 0,320,180);

	}

	this.imageSequencer = function(){
		// console.log('ghost imageSequencer')

		if(master.ghostBuster || master.overlayOpen) {

			// console.log("ghosts BUSTED")
			$('#'+ canvasid).css('display','none')
			canvas.style.opacity = 0
			context.clearRect(0, 0,320,180);

		} else {

			 // console.log('wooooooooooooo')

			$('#'+ canvasid).css('display','block')
	        imageSrc = filePathPre + name + zeroes(playHead,4)+".png";
	        
	        var img = new Image();
	        img.src = imageSrc

            context.clearRect ( 0 , 0 , w , h );
			canvas.style.opacity = (Math.random()*.2) + 0.1

			that.playHead = playHead;
			img.onload = function(){

		        context.drawImage(img, 0, 0,320,180);
		         
		        if(playHead < imageNumber){
	        		playHead++
	          	} else{
	        		playHead =  1
	          	}

		
	          	//requestAnimationFrame(that.imageSequencer);
		    }  
		}

			  	ghostTimeout = setTimeout(function() {
					that.imageSequencer()				
			  	}, 1000 / 8);	


   } //imageSequencer 

   // preload
   this.preload = function(){
   	console.log('preloading '+imageNumber+' ghost images')

   	var i = 1;

   	var img = new Image()

   	img.src = filePathPre + name + zeroes(imageNumber,5)+".png";

   	img.onload = function(){
   		i+=2;
   		img.src = filePathPre + name + zeroes(imageNumber,5)+".png";
   	}
   }
   
              
} /// end ghost






/*************************************************************************

	

	> Root Functions Passed from XML



*************************************************************************/

function newPage(URL) {
 
 	newPageTrigger = false
 	master.audioFadeAll(0.0)
	var transition_audio = $('#transition', window.parent.document)	

	
  if(transition_audio.length>0){

	if(URL == "hatch.php"){

		if (transition_audio[0].canPlayType('audio/ogg')){
			transition_audio[0].src = master.audio_path + "Hatch_Open.ogg"
		} else {
			transition_audio[0].src = master.audio_path + "Hatch_Open.mp3"
		}
		
	}else{

		if (transition_audio[0].canPlayType('audio/ogg')){
			//transition_audio[0].src = "audio/Transition_Sound.ogg"
		} else {
			//transition_audio[0].src = "audio/Transition_Sound.mp3"
		}

	}
	master.audiocontrol('transition');
  }

	if(URL == 'blog/index.php?from_rig=true~BLOG') {
		master.parentChange(URL);
	} else {

		$(".wrapper").fadeOut(500, function(){
			console.log("fade to new page")
			master.pageChange(URL);
		})

	}	

}




function newPano(_pano, fromPrologue) {

	console.log('newPano')

	if(!fromPrologue) {

		$('#video-underlay').hide()
		
		$('#panocontainer').fadeOut(1000,function(){
			parent.location.hash = _pano
		})

	}

}



function panoComplete(){

	console.log('PANO COMPLETE')

	if(!isPreloaded)
		preloader();

	if(pano.panoWalkthrough)
		pano.panoWalkthrough.preload()

	//$('.loading').fadeOut(500)
	$('#panocontainer').fadeIn(1000,function(){
		$('#video-underlay').show()
	})


}


/**************************************************************************
  
  Misc Functions from individual scenes

**************************************************************************/
  
// Control Room
var startDrilling = function(stopping){

  // if(stopping){
  //   master.loadVideoUnderlay("video/transitions/oil_shot",null,true)
  // }else{
  //   master.loadVideoUnderlay("video/transitions/action_04",null,true) 
  // }

  var transition_audio = $('#transition', window.parent.document)
  transition_audio[0].src = "audio/Hatch_Open.mp3"
  transition_audio[0].play()
  $("#wrapper").delay(200).animate({'bottom': '-10','top': '10'}, 100, function(){
    $("#wrapper").animate({'bottom': '0','top': '0'}, 100)
  })
}



// Control Room
function zoomIn() {
  console.log('ZOOM IN')
  master.overlayOpen = true
  $('.fastpan, .compass').fadeOut()

  // create
  $('#zoom-out').remove()
  $('#panocontainer').after('<div id="zoom-out" class="platform-nav dynamic hide"></div>')
  $("#zoom-out").removeClass('hide')

  $("#zoom-out").on('click',function(){
    master.overlayOpen = false
    $('.fastpan, .compass').fadeIn()
    $("#zoom-out").fadeOut()

    krpano = document.getElementById("krpanoObject");
    krpano.call('tween(90,90,2,easeOutCubic,js(showMapIcon()))')
	krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true)")
    krpano.call('set(autorotate.enabled,true)')
    $("#zoom-out").off('click')
    $('#zoom-out').remove()
  })    
}


// Submarine
var loadUnderWater = function(_id){
  console.log('loadUnderWater() '+_id)

  $("#video-underwater").addClass('hide')

  $('#video-underwater')[0].src = master.cdn_video + _id + master.videoType
  $('#video-underwater')[0].load()

  $('#video-underwater')[0].addEventListener('canplaythrough', function(e) {
    e.stopPropagation()
    $('#video-underwater').removeClass('hide')
    $('#video-underwater')[0].play();
  }, false);

}





/**************************************************************************


	> Sound Adjust


**************************************************************************/


var soundVector1 = soundVector2 = soundVector3 = 0;

var soundadjust = function(coord,fov) {

	// console.log('horizontal: '+Math.round(coord)+' zoom: '+Math.round(fov))

	var convCoord =  Math.abs( (coord+60) % 360);
	var convCoord1 =  Math.abs((coord-120)%360);

	// console.log('convCoord: '+'\t'+convCoord)

	if(convCoord < 180 )  soundVector1 = convCoord/180;
	else  				  soundVector1 = (360-convCoord)/180;
	 
	if(convCoord1 < 180 ) soundVector2 = (convCoord1)/180;
	else  				  soundVector2 = (360-(convCoord1))/180;

	if(Modernizr.webaudio === true) {
		if(parent.audiomaster.mix.getTrack('overlay_01') && !master.isTweeningAudio){
		  parent.audiomaster.mix.getTrack('basetrack').pan(soundVector2*2-1)
		  parent.audiomaster.mix.getTrack('overlay_01').pan(soundVector1*2-1)       
		}

		if(parent.audiomaster.mix.getTrack('overlay_02') && !master.isTweeningAudio){
		  parent.audiomaster.mix.getTrack('overlay_02').pan(soundVector2*2-1)       
		}
	}
	

	// show ghosts only in specific spot (recalculated every pano)
	if(convCoord > master.ghostMinCoord && convCoord < master.ghostMaxCoord) {
	  master.ghostBuster = false
	} else {
	  master.ghostBuster = true
	}


	/* sequences */
	if(master.globalPano === 'chemicalroom' || master.globalPano === 'subhanger' ) {
	
		// fade in walkthrough	  
		if(fov < 25 && !master.overlayOpen) {
  
	        $('.scroll-directions, .panoversion, #walking-exit').fadeIn()
	        $('#panocontainer, .fastpan, .compass').fadeOut(500)
	        pano.walkthroughPlaying = true;

  		// fade out walkthrough
	    }else{
  
	        if(!master.overlayOpen)
	        	$('#panocontainer, .fastpan, .compass').fadeIn(500)

	        $('.scroll-directions, .panoversion, #walking-exit').fadeOut(function(){
	            $('.scroll-directions').css('top','0px') // reset scrubber position
	        })
    
	        $('#walking-canvas-pano').css('opacity', Math.abs(1-fov/90)+.1)
	        pano.walkthroughPlaying = false;
	    }
	}

}


/**************************************************************************
	View Cache
**************************************************************************/


var cachedAuth = 0, cachedFov = 90

function setCache(_ath,_fov) {
	console.log('[caching] ath: '+_ath+' fov: '+_fov)
	cachedAuth = _ath
	cachedFov = _fov
}





/**************************************************************************
	Other
**************************************************************************/

// function openBook(_url){
// 	console.log('OPENBOOK')
// 	master.loadOverlay(_url,true)
// 	//master.loadBook(_url)
// }

function showMapIcon(){
	$(".compass").fadeIn()
}

var soundTrigger;

function hoverSound(){
	if(!soundTrigger){
	master.overlayPlay('#audio-2',master.audio_path + 'Rollover.ogg', master.audio_path + 'Rollover.mp3')
	soundTrigger = true
  }
}

function resetHoverSound(){
	soundTrigger = false
}





/*************************************************************************


	> Video Player


*************************************************************************/

function videoPlayer(group, playerFadeTransition){

	if(master.overlayOpen === true) return;

	// hook into global resize function
	master.resize.videoplayer = true;
	master.debouncedResize();

	master.ghostBuster = true
	master.overlayOpen = true
	master.soundTrigger = true

	console.log('launchVideoPlayer: '+group)

	$('.volume-toggle').css('line-height','80px')

	// disable mouse events on pano container
	$("#panocontainer").addClass('no-pointer-events')
	$(".compass").fadeOut()

	// close breadcrumb
	// clearInterval(navInterval);
    $(".breadcrumb").animate({'bottom': '0'}, 500)

	master.bgGain = 0.5

	group = "."+group
	items = $('.movie-menu'+group+' .movie-menu-item')

	$(group+'.movie-menu').addClass('active')

	$("#to-control").on('click',function(){ closeVideoPlayer() })

	$(items).first().addClass('active')

	// Video Player Transition
	if(playerFadeTransition)
		$(".video-content-wrap").addClass("transition-fade");
	else
		$(".video-content-wrap").addClass("transition-width");

	$(".video-content-wrap").show()
	$(".video-content-wrap").addClass("open");

	switchVideo($(items).first().data('file'),$(items).first().text())

	$('#video-overlay').on('canplaythrough',function(){
		
		if(parent.location.hash.slice(1) =="") {
			console.log('switch to helicopter')
			parent.location.hash = "helicopter"
		}
	})


	// On video end ---------------------------------------------------------

	$('#video-overlay').off('ended')
	$('#video-overlay').on('ended',function(){

		$(items).each(function(i,v){

			if($(v).hasClass('active')) {

				if( $(v).next().length > 0 )
					switchVideo( $(v).next().data('file'),$(v).next().text() )
				else
					closeVideoPlayer()
					
				return false;
			}

		})

	})

	// Video Controls ---------------------------------------------------------

	var videoControls = (function(){

		var video = document.getElementById("video-overlay");
		var play = $(".video-content-wrap .play")
		var seek = $(".video-content-wrap .seek")
		var text = $(".video-content-wrap .text")
		var wasplaying, time;

		// Play/Pause
		$(play).on("click", function() {
			console.log('play/pause')

		    if (video.paused) {

		      video.play();
		      $(play).removeClass('paused')

		    } else {

		        video.pause()
		        $(play).addClass('paused')

		    }
		});

		// Slider
		$.getScript("js/lib/jquery-ui.min.js")
		.done(function(script, textStatus){

			$(seek).slider();

			$(seek).slider({ start: function( event, ui ) {
			    if(!video.paused) wasplaying = true;
			    else wasplaying = false;
			    video.pause()
			    $(play).addClass('paused')
			}});

			$(seek).slider({ stop: function( event, ui ) {
			    video.currentTime = time;
			    if(wasplaying) {
			        video.play()
			        $(play).removeClass('paused')
			    }
			}});

			// slider -> video
			$(seek).slider({ slide: function( event, ui ) {
			    time = video.duration * ($(seek).slider("value") / 100);
			}});
			
			// video -> slider
			video.addEventListener("timeupdate", function() {
			    var value = (100 / video.duration) * video.currentTime;
			    $(seek).slider("value", value);
			    $(text).html(timeFormat(video.currentTime) + "/" + timeFormat(video.duration))
			});
		})
		.fail(function(jqxhr, settings, exception) {
		  console.log('getScript FAIL')
		});

		// Time
		var timeFormat = function(seconds){
			var m=Math.floor(seconds/60)<10?"0"+Math.floor(seconds/60):Math.floor(seconds/60);
			var s=Math.floor(seconds-(m*60))<10?"0"+Math.floor(seconds-(m*60)):Math.floor(seconds-(m*60));
			return m+":"+s;
		}

	})

	videoControls()

	
	// Movie Menu autohide ---------------------------------------------

	var autohide = (function(){

		if(master.isIOS) return

		var timeout
		var over=false

		controls = $(".video-content-wrap .movie-menu, .video-content-wrap .controls")

		$(controls).addClass('hide')

		$(".video-content-wrap").on('mousemove',function(){
			$(controls).removeClass('hide')

			if(!over) {
				window.clearTimeout(timeout)
				timeout = window.setTimeout(function() {
					$(controls).addClass('hide')
				}, 2000)
			}
		})

		$(controls).on('mouseover',function(){
			over=true

			$(controls).removeClass('hide')
			window.clearTimeout(timeout)
		})

		$(controls).on('mouseout',function(){
			over=false

			window.clearTimeout(timeout)
			timeout = window.setTimeout(function() {
				$(controls).addClass('hide')
			}, 2000)
		})

		$(document).on('mouseout',function(e){ 
		    over=false

		    window.clearTimeout(timeout)
		    timeout = window.setTimeout(function() {
		    	$(controls).addClass('hide')
		    }, 2000)
		})
	})

	autohide()

} // videoPlayer()



// switchVideo ********************************************************

function switchVideo(_id,_text){

	console.log('switchvideo: '+'\t'+_id)

	//

	if(master.isIOS) {
		var iosControls = $(".video-content-wrap .movie-menu, .video-content-wrap")
		iosControls.removeClass('hide')
		//iosControls.css('display','block')
	}

	if(parent.audiomaster.mix.getTrack('overlay_02')){


        parent.audiomaster.mix.getTrack('overlay_02').gain(0.0001)


    }

	$('#ghost-canvas-trans').fadeOut()

	$('.controls').css('display','none')

	// find active group
	active = $('.movie-menu').hasClass('active')

	// set active item
	$(active).find($('.movie-menu-item')).each(function(i,v){
		$(v).removeClass('active')
		if($(v).data('file') == _id)
			$(this).addClass('active')
	})
	
	// partial fade to pano
	//$('#panocontainer').removeClass('hide')
	$('#video-overlay').addClass('hide')

	$('#video-overlay')[0].pause()

	$('#video-overlay')[0].src = '';

	$('#video-overlay-title').html(_text)

	$('#video-overlay-title').fadeIn()


	setTimeout(function() {
		$('#video-overlay')[0].src = master.cdn_video + _id + master.videoType
		$('#video-overlay')[0].load()

		if(master.isIOS){

			$('#video-overlay')[0].controls = true
			$('#video-overlay').removeClass('hide')

		}
	}, 500)

	$('#video-overlay')[0].addEventListener('loadedmetadata', function(e) {
		$('#panocontainer').fadeOut(1000)
		$('#walking-canvas-pano').css('display','none')
		
		//.controls
	}, false);

	

	$('#video-overlay')[0].addEventListener('canplaythrough', function(e) {

		$('#video-overlay').removeClass('hide')

		$('#video-overlay-title').fadeOut(2000)

		$('.controls').css('display','block')

		e.stopPropagation()
		this.play();
	}, false);

}

// closevideoplayer ********************************************************

function closeVideoPlayer(){

	console.log("closing Video Player")

	if(parent.audiomaster.mix.getTrack('overlay_02')){
        parent.audiomaster.mix.getTrack('overlay_02').gain(1.0)
    }


    if(pano.panoWalkthrough) {
    	pano.panoWalkthrough.closeWalkthroughVid()
    }

	$('.volume-toggle').css('line-height','40px')

	$('.movie-menu').removeClass('active')
	$('.movie-menu-item').removeClass('active')


	$('#video-overlay')[0].src = null;

	// unbind
	$('#to-control').off('click')
	$(".video-content-wrap .play").off('click')
	$(".video-content-wrap").off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd")

	master.bgGain = 1.0
	master.ghostBuster = false

	$('#video-overlay').addClass('hide')
	$('#panocontainer').fadeIn(1000)
	$(".video-content-wrap").fadeOut(1000)
	$('#walking-canvas-pano').css('display','block')
	$("#panocontainer").removeClass('no-pointer-events')
	$(".compass").fadeIn()

	// master.overlayOpen = false
	$("#video-overlay")[0].pause(); // can't hurt
	parent.audiomaster.mix.setGain(1.0)
	
	$(".video-content-wrap").removeClass("open");
	$(".video-content-wrap").removeClass("transtion-width");
	$(".video-content-wrap").removeClass("transition-opacity");
	//$(".video-content-wrap").addClass("no-pointer-events");

	krpano = document.getElementById("krpanoObject");
	krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true),js(showMapIcon();))")

	setTimeout(function() {
		master.overlayOpen = false;
		master.resize.videoplayer = false;
	}, 500)
}

















/*************************************************************************

	

	> jQuery Extension



*************************************************************************/


(function($){
	
/// Scrollin stuff
    
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);
        
    special.scrollstart = {
        setup: function() {
            
            var timer,
                handler =  function(evt) {
                    
                    var _self = this,
                        _args = arguments;
                    
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }
                    
                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);
                    
                };
            
            jQuery(this).bind('scroll', handler).data(uid1, handler);
            
        },
        teardown: function(){
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
        }
    };
    
    special.scrollstop = {
        latency: 300,
        setup: function() {
            
            var timer,
                    handler = function(evt) {
                    
                    var _self = this,
                        _args = arguments;
                    
                    if (timer) {
                        clearTimeout(timer);
                    }
                    
                    timer = setTimeout( function(){
                        
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.handle.apply(_self, _args);
                        
                    }, special.scrollstop.latency);
                    
                };
            
            jQuery(this).bind('scroll', handler).data(uid2, handler);
            
        },
        teardown: function() {
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
        }
    };
    

		
	$.fn.shuffleLetters = function(prop){
	
		var options = $.extend({
			"step"		: 1,			// How many times should the letters be changed
			"loop"		: false,			// loop?
			"stats"		: false,	
			"fps"		: 25,			// Frames Per Second
			"text"		: "", 			// Use this text instead of the contents
			"callback"	: function(){}	// Run once the animation is complete
		},prop)

		return this.each(function(){
			
			var el = $(this),
				str = "";


			// Preventing parallel animations using a flag;

			if(el.data('animated')){
				return true;
			}
			
			el.data('animated',true);
			
			

				if(options.stats) {
				str = master.get_stat();
				
			  }else{
			  str = master.get_tag();	
			  }
			  
			  if(options.comingsoon) {
			  str = "OFFSHORE ... coming soon";
			  }
		
			// $('meta[name=description]').attr('content', str);
			 el.html("");			

			// Self executing named function expression:
			
			(function shuffle(start){
				
				// This code is run options.fps times per second
				// and updates the contents of the page element
				$('#inter-text').html(str).hide().fadeIn(1000, function(){

					el.data('animated',false);
					if(options.loop){
						setTimeout(function() {
		          $('#inter-text').shuffleLetters({
		      	    "loop": true,
		      	    "stats": true
		          });
	          }, 6000);
						
					}else{
						master.init()
						master.check_start()
				  }

					options.callback(el);

					return;

				})
					
			})(-options.step);
			

		});
	};
	
	function randomChar(type){
		var pool = "";
		
		if (type == "lowerLetter"){
			pool = "abcdefghijklmnopqrstuvwxyz0123456789";
		}
		else if (type == "upperLetter"){
			pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		}
		else if (type == "symbol"){
			pool = ",.?/\\(^)![]{}*&^%$#'\"";
		}
		
		var arr = pool.split('');
		return arr[Math.floor(Math.random()*arr.length)];
	}
	
})(jQuery);






/**************************************************************************
	
	> RAF

**************************************************************************/


// shim layer with setTimeout fallback

var cancelAnimationFrame = window.webkitRequestAnimationFrame || window.cancelAnimationFrame || window.mozCancelAnimationFrame;

window.requestAnimationFrame = (function() {

	return  window.requestAnimationFrame       || 
	        window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame    || 
	        window.oRequestAnimationFrame      || 
	        window.msRequestAnimationFrame     || 
	        function(/* function */ callback, /* DOMElement */ element){
		        window.setTimeout(callback, 1000 / 60);
		    };
})();










(function( $, window ) {
	var win = $( window ),
		event_name = "orientationchange",
		get_orientation,
		last_orientation,
		initial_orientation_is_landscape,
		initial_orientation_is_default,
		portrait_map = { "0": true, "180": true },
		ww, wh, landscape_threshold;

	if ( $.support.orientation ) {

		ww = window.innerWidth || win.width();
		wh = window.innerHeight || win.height();
		landscape_threshold = 50;

		initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;

		initial_orientation_is_default = portrait_map[ window.orientation ];

		if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
			portrait_map = { "-90": true, "90": true };
		}
	}

	$.event.special.orientationchange = $.extend( {}, $.event.special.orientationchange, {
		setup: function() {
			if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
				return false;
			}
			last_orientation = get_orientation();
			win.bind( "throttledresize", handler );
		},
		teardown: function() {
			if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
				return false;
			}
			win.unbind( "throttledresize", handler );
		},
		add: function( handleObj ) {
			var old_handler = handleObj.handler;

			handleObj.handler = function( event ) {
				event.orientation = get_orientation();
				return old_handler.apply( this, arguments );
			};
		}
	});

	function handler() {
		var orientation = get_orientation();

		if ( orientation !== last_orientation ) {
			last_orientation = orientation;
			win.trigger( event_name );
		}
	}

	$.event.special.orientationchange.orientation = get_orientation = function() {
		var isPortrait = true, elem = document.documentElement;

		if ( $.support.orientation ) {
			isPortrait = portrait_map[ window.orientation ];
		} else {
			isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
		}

		return isPortrait ? "portrait" : "landscape";
	};

	$.fn[ event_name ] = function( fn ) {
		return fn ? this.bind( event_name, fn ) : this.trigger( event_name );
	};

	if ( $.attrFn ) {
		$.attrFn[ event_name ] = true;
	}

}( jQuery, this ));
