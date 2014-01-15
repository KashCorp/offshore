/**************************************************************************
	
	Master Functions
	

	> Sections

		master

			Build Nav Bar
			Overlay
			Audio
			Utilities

		Walkthrough

		Ghost

		Root Functions (used in XML)

		Sound Adjust

		Video Player

		jQuery Extension


**************************************************************************/


// ********************************************************
// Global Config Options

// look in panoLoader.js, loader.addCompletionListener()
// for the url arguments which can override these defaults

var config = {
  'useLocalResources' : true, // look for media locally instead of from the CDN
  'extControlMaster' : false, // set extcontrol.role to 'master'
  'extControlSlave' : false,  // set extcontrol.role to 'slave'
  'extControlUrl' : false,
  'autopilot' : false // use autopilot
}

var krpano;

// let's cache some domz
var $panocontainer = $('#panocontainer'),
	  $wrapper       = $('#wrapper'),
	  $compass       = $('.compass'),
	  $videooverlay  = $("#video-overlay"),
    $breadcrumb    = $(".breadcrumb")



var masterFunctions = function() {

	var fadeSpeed = 500,
  		pagepath = 'http://www.offshore-interactive.com/pages/',
  		that = this,
  		visitedPages = getCookie("visitedPages"),
  		audio = document.getElementsByTagName('audio'),
  		newPageTrigger,
  		isParent,
  		videoType = ".webm",
  		audioType = ".ogg",
  		css3transitionend = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';


  // this.isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
	this.isIOS = true;
	this.isAndroid = navigator.userAgent.match(/Android/g) ? true : false;
	this.isFireFox = navigator.userAgent.match(/Firefox/g) ? true : false;
	this.isMSIE = navigator.userAgent.match(/MSIE/g) ? true : false;

	this.multix = 1;

	if(this.isFireFox) this.multix = .4;

	this.ghostBuster = false
	this.ghostMinc
	this.viewedContentArray = []
	this.isPlayingVO = false

	// webm or h264
	var v = document.createElement('video');
	var au = document.createElement('audio');
	if(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, ''))  { videoType = '.mp4'; }
	if(v.canPlayType && v.canPlayType('video/webm').replace(/no/, '')) { videoType = '.webm'; }
	if(au.canPlayType && au.canPlayType('audio/x-m4a').replace(/no/, '')) { audioType = '.m4a'; }

	if(this.isMSIE) {
		$('.vignette').css('display','none')
	 	audioType = '.mp3';
	}

	this.videoType = videoType
	this.audioType = audioType

	if(this.isAndroid) { this.videoType = '_360.webm'; }

  try {
    isParent = parent.IS_PARENT;
  }catch(e){
    isParent = false;
  }

  this.mute = false
	that.overlayOpen = false // stops map icon, fastpan, etc from re-appearing when it shouldn't

  // CDN URLs
  this.cdn_imgseq = 'http://8ebf72528a85af39b7bf-e3520fb483eb859425be483d5cc39cf4.r48.cf2.rackcdn.com/'
  this.cdn_video  = 'http://fe08d365603a52be8002-b68b5b3ce203a95e77baefdb31efdc2e.r46.cf2.rackcdn.com/'
  // this.cdn_panos  = 'http://51feb41d8c5706a8e6e7-4b718bfe00f3e21e7ec454784bd539a2.r98.cf2.rackcdn.com/'

  if(config.useLocalResources === true) {
    console.log('----- Using local resources -----');
    this.cdn_imgseq = 'images/ghosts/';
    this.cdn_video  = 'videos/';
  }

  //if(this.isAndroid) this.cdn_video  = 'http://192.168.1.139/~mike/offshore_repo/video/'

  this.audio_path = 'audio/'

  this.movieMenu = false

  isRetinaFunction = function(){var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\ (min--moz-device-pixel-ratio: 1.5),\ (-o-min-device-pixel-ratio: 3/2),\ (min-resolution: 1.5dppx)"; if (window.devicePixelRatio > 1) return true; if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true; return false; };
  this.isRetina = isRetinaFunction()
   
  $compass.click(function() {
   	$compass.fadeOut(500)
  	that.loadOverlay('rigmap.html')
  });
    


    // ********************************************************
    // Nav

    var delayNavSlide = function(){
    	if(master.isIOS) {
    		$breadcrumb.animate({'bottom': '-1'}, 500)
    		$("#offshorelogo").animate({'bottom': '19'}, 500)
    	} else{
	    	$breadcrumb.animate({'bottom': '-40'}, 500)
	    	$("#offshorelogo").animate({'bottom': '-10'}, 500)    		
    	}

    }

    var navInterval = setTimeout(delayNavSlide, 5000); 
     
    $breadcrumb.mouseover(function() {
    	if(!master.overlayOpen) {
			clearInterval(navInterval);
			if(master.isIOS) $breadcrumb.animate({'bottom': '39'}, 500)
	    	else  			 $breadcrumb.animate({'bottom': '0'}, 500)
    	}
    });
 
    $breadcrumb.mouseleave(function() {
       	clearInterval(navInterval);
        navInterval = setTimeout(delayNavSlide, 1000);
    }); 

    $breadcrumb.on('touchstart', function() {
    	if(!master.overlayOpen) {

			clearInterval(navInterval);

			if(master.isIOS) {
	    		$breadcrumb.animate({'bottom': '39'}, 500)
	    	} else {
		    	$breadcrumb.animate({'bottom': '0'}, 500)    		
	    	}
		  // $("#offshorelogo").animate({'bottom': '25'}, 500)	
    	}
    }); 

    $wrapper.on ('touchstart', function() {

    	clearInterval(navInterval);
        delayNavSlide()

       $('.pan-directions').fadeOut(500)
       pano.panDirectionsShown = true;
       $wrapper.off('mousedown');
    }); 

    // end Nav
    // ********************************************************



    $wrapper.on('mousedown',function(){
       $('.pan-directions').fadeOut(500)
       pano.panDirectionsShown = true;
       $wrapper.off('mousedown');
    }); 





    /* iPad Functions */

    if(Modernizr.touch) {

    	console.log('[MODERNIZR] Touch detected, enabling touch events')

    	document.addEventListener('touchstart', function(e) {
        e.preventDefault();

    		for ( var i = 0, l = parent.audiomaster.mix.tracks.length; i < l; i++ ){                                              
                parent.audiomaster.mix.tracks[i].play()                                    
            }    
    	    $('.pan-directions').fadeOut(500)
    	}, false);	


    	$(document).bind('touchend', function(e) {
		    $(e.target).trigger('click');
  		});

      // Disable iOS overscroll
      // $(document).on('touchstart', function(e) {  });
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
      		$videooverlay.css({
      			'top' : master.globals.contain.t,
      			'left' : master.globals.contain.l,
      			'width' : master.globals.contain.w,
      			'height' : master.globals.contain.h
      		})

      		$('.video-content-wrap .controls').css('bottom',master.globals.contain.t)	
      	}

      	if(typeof pano != 'undefined') {
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

    $(window).on('resize.global',that.debouncedResize)
    window.addEventListener('onorientationchange', that.debouncedResize());







    /**************************************************************************
    ***************************************************************************
      
      
      > Build Nav Bar

      Build the breadcrumb

    
    ***************************************************************************
    **************************************************************************/
      
  	this.build_navbar = function(no_fade){

  		// this._frame = null

  		console.log("INIT TOOLBAR")

  		//$("#wrapper").append('<a class="navlink"  data-url="index.php"><h1 id="offshorelogo"><span class="hidden">OFFSHORE</span></h1></a>');
  		//$("#scroll-wrapper").append('<a class="navlink"  data-url="index.php"><h1 id="offshorelogo"><span class="hidden">OFFSHORE</span></h1></a>');
     	
     	$(".navlink").click(function(){
      		that.parentChange('index.php')
	  	}) 

      var insertNav = function(price, change, percent) {

      	$breadcrumb.html('');

        var breadbox_string = '<div id="breadbox-container">';
        
        if(that.isRetina)
        	breadbox_string += '<h1><img class="backtostart" src="images/splash_logo_small@2x.png" alt=""></h1>';
        else
        	breadbox_string += '<h1><img class="backtostart"  src="images/splash_logo_small.png" alt=""></h1>';

        breadbox_string += '<nav class="left">';
        breadbox_string += '<ul><li><a id="about-link">About</a></li>';
        breadbox_string += '<ul><li><a id="credits-link">Credits</a></li>';
        breadbox_string += '<li><a href="http://offshore-interactive.com/blog/" target="_top">Blog</a></li>';
        breadbox_string += '<li><a href="http://offshore-interactive.com/blog/index.php/subscribe-to/" target="_top">Join Up</a></li>';          
        // breadbox_string += '<li><a href="resources.html">Resources</a></li></ul>';
        breadbox_string += '</nav>';

        breadbox_string += '<div class="info">';
        breadbox_string += '<div class="title"><p>Brent Crude Oil</p><p>USD / Barrel</p></div>';
        breadbox_string += '<div class="price"><p>$' + price + '</p></div>';
        breadbox_string += '<div class="change"><p>' + change + '</p><p>' + percent + '</p></div>';
  			breadbox_string += '</div>'

  			breadbox_string += '<div class="share">'
  			breadbox_string += '<div class="facebook"><a href="#" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=\'+encodeURIComponent(parent.window.location.href), \'facebook-share-dialog\',\'width=626,height=436\');return false;"></a></div>';
  			breadbox_string += '<div class="twitter"><a href="#" onclick="window.open(\'http://twitter.com/intent/tweet?url=\'+encodeURIComponent(parent.window.location.href), \'twitter-share-dialog\',\'width=626,height=300\');return false;"></a></div>';
  			breadbox_string += '</div></div>'

        $breadcrumb.html(breadbox_string);

        $('.backtostart').click(function(){
        	parent.window.location.hash = '';
        })

        $('#about-link').click(function(){
        	master.loadOverlay('about.html')
        	
        })


        $('#credits-link').click(function(){
        	master.loadOverlay('credits.html')
        	
        })

         
      }

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

	} // end init







  /**************************************************************************
  ***************************************************************************
    

    > Overlay
          
      Loads an overlay file into the overlay iframe.

      there is only one overlay at a time (map, book, etc)

      loadOverlay('example.php');
      closeOverlay();

  
  ***************************************************************************
  **************************************************************************/

	this.loadOverlay = function(overlayURL){

		if(master.overlayOpen === true) return;

    if(extcontrol) if(extcontrol.role === 'master') {
      extcontrol.fn({ 'fn':'loadOverlay', 'overlayURL':overlayURL});
    }

		master.overlayOpen = true
		master.ghostBuster = true
		
		$('.scroll-directions').fadeOut(500)
		$compass.fadeOut(500,function(){
			$panocontainer.addClass('hide')
		})

		if(pano.video_underlay) $('.video-underlay').fadeOut(500)



		$('#overlay_frame').attr('src', 'overlay/' + overlayURL)
		$(".loading").show();
		$('#overlay_frame').one('load',function(){
			console.log('overlay frame loaded')
			$('#overlay_frame').fadeIn(function(){
				$(".loading").hide();
			})
		})

		// click background to cloase
		$('#overlay_frame').contents().find('body').off('click')
		$('#overlay_frame').contents().find('body').on('click',function(e){
			e.preventDefault();
			e.stopPropagation()
			master.closeOverlay()
		})
	}


  // ********************************************************

	this.closeOverlay = function(_URL){

		console.log('close overlay')

    if(extcontrol) if(extcontrol.role === 'master') {
      extcontrol.fn({ 'fn':'closeOverlay', '_URL':_URL });
    }

		//$('#overlay_frame').removeClass('show')

		$compass.fadeIn(500)

		$('#overlay_frame').fadeOut(500,function(){

			krpano = document.getElementById("krpanoObject");
			krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true)")

			$panocontainer.removeClass('hide') 

			if(pano.video_underlay) $('.video-underlay').fadeIn(500)

			// clear iframe
			$('#overlay_frame').attr('src','')
			// $('#overlay_frame').css('display','none')

			master.overlayOpen = false
			master.ghostBuster = false

			$('#to-control').off('click')

			$('.scroll-directions').fadeIn(500)
			$compass.fadeIn(500)

			if(_URL){
				newPano(_URL)
			}

		})
	}





	/**************************************************************************
  ***************************************************************************

		
		Audio


  ***************************************************************************
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

		parent.audiomaster.loadAudio(_file ,_trackName,.0001,_pan,_isLoop)

		var dummysounds = { s:  0};

		console.log('waa' + _targetVolume)

		var driftTweenSounds = new TWEEN.Tween( dummysounds ).to( { s: _targetVolume}, 2000 )
			.onUpdate( function() {
				master.isTweeningAudio = true

				

				if(parent.audiomaster.mix.getTrack(_trackName)){
					parent.audiomaster.mix.getTrack(_trackName).gain(this.s)
				}
			})
			.easing(TWEEN.Easing.Quadratic.Out )
			.onComplete(function() {
				master.isTweeningAudio = false
				//TWEEN.remove(driftTweenSounds); 
			})
			.start();               
	}

	this.AFXloadAudio = function(_file,_trackName,_pan,_targetVolume,_start){

    console.log('AFXloadAudio')

		var multix = 1

        if(!navigator.userAgent.match(/(Safari)/g) ? true : false){
            multix = .3
        }   

		if(!_start) _start = 0

		console.log('_trackName: '+'\t'+_trackName + " _ " + master.isPlayingVO)

		if(parent.audiomaster.mix.getTrack(_trackName)) parent.audiomaster.mix.removeTrack(_trackName)
		
		/// toggle on/off logic 

		if(master.isPlayingVO) {
			master.isPlayingVO = false;
			return;
		}

		if(_trackName == 'overlay_02'){

			master.isPlayingVO = true

		}



		if(!_targetVolume) {_targetVolume = 1.0 * multix}

		parent.audiomaster.loadAudio(_file,_trackName,.0001,_pan,"true", _start)

		var dummysounds = { s:  0};

		var driftTweenSounds = new TWEEN.Tween( dummysounds ).to( { s: _targetVolume}, 2000 )
			.onUpdate( function() {
				master.isTweeningAudio = true
        if(parent.audiomaster.mix.getTrack(_trackName))
  				parent.audiomaster.mix.getTrack(_trackName).gain(this.s)
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
  **************************************************************************

		
		Utilities


  **************************************************************************
	**************************************************************************/

	this.loadVideoUnderlay = function(_id,_popcorn,_load_menu){

		console.log("video")
	    
		parent.audiomaster.mix.setGain(0.01)
		
	    if( this.popcorn) Popcorn.destroy(  this.popcorn );
	    $('#footnote-container').html('')
	    if(_popcorn){
	       this.popcorn = Popcorn("#video-underlay");
	       this.popcorn.parseJSON( "json/"+_popcorn+".json?rnd="+Math.random()*10, function() {

	        console.log( _popcorn + " parsed successfully" );
	      });
	    }

	    $("#video-underlay").fadeOut(1000, function() {        
	        $('#video-underlay source').attr('src', _id + master.videoType);
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
	    	//$('body.platform').find('#overlay').delay(2000).fadeIn(500);
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








/**************************************************************************
***************************************************************************

	
	> Walkthrough


***************************************************************************
**************************************************************************/

var Walkthrough = function(canvasID, name, videoLength) {
	
	var that = this,
		  w = master.globals.cover.w,
		  h = master.globals.cover.h,
    	that = this

  var mouseWheelTimeout;

  var scrollerPos = parseInt($( ".scroll-directions" ).css('top')),
      scrollerPosStart = 0,
      playSpeed = 1/(videoLength*60) // in frames!

  this.percent = 0 // MASTER VARIABLE (everything runs off this)
  this.maxScrollerPos = $('.scroll-directions-container').height()


  // Load Video  ********************************************************

	var video = document.getElementById(canvasID)

	video.setAttribute('src', master.cdn_video + 'transition-' + name + master.videoType);

	if(master.isIOS || master.isAndroid) $('#' + canvasID)[0].controls = true

	console.log (master.cdn_video + 'transition-' + name + master.videoType)

	video.load();

	video.width  = w;
	video.height = h;
	document.getElementById(canvasID).style.width = w + 'px'
	document.getElementById(canvasID).style.height = h + 'px'

	video.addEventListener('canplay', function(e) {
		e.stopPropagation()
	})

	video.addEventListener('timeupdate', function(e) {
		
		e.stopPropagation()

		that.percent = video.currentTime / video.duration

		if(that.percent > 0.9 && !master.overlayOpen){
			that.autoplay = false;
			$('.scroll-directions').fadeOut()
			if(master.globalPano == 'chemicalroom') videoPlayer("engineroom");
			if(master.globalPano == 'subhangar')    videoPlayer("subhangar");
		}	

	})

  video.addEventListener('play', function(e){
    if(extcontrol) if(extcontrol.role === 'master') {
      extcontrol.fn({ 'fn':'walkthrough', 'action':'play' })
    }
  })

  video.addEventListener('pause', function(e){
    if(extcontrol) if(extcontrol.role === 'master') {
        extcontrol.fn({ 'fn':'walkthrough', 'action':'pause' })
      }
  })


	// Init/Close ********************************************************
	// (additional logic in scrollFunction and scrollStopFunction)
	
	var walkthroughvideo = false;
	if(master.globalPano =='chemicalroom' || master.globalPano =='subhangar') walkthroughvideo = true;
	console.log('walkthroughvideo: '+'\t'+ walkthroughvideo)

	if(walkthroughvideo) {

		$("#walking-exit").off('click')
		$("#walking-exit").on('click',function(){
			that.closeWalkthroughVid()
		});

		$('#video-overlay').off('ended')
		$('#video-overlay').on('ended',function(){
			that.closeWalkthroughVid();
		});
	};

  this.closeWalkthroughVid = function(){

  	console.log('[X] Close Walkthrough')

  	if(!master.overlayOpen) {
		$('#panocontainer, .fastpan, .compass').removeClass('hide')

		$('.scroll-directions, .panoversion, #walking-exit').fadeOut(function(){
	        that.percent = 0
  			that.scrollFunction()
  			scrollerPos = 0;
  		    $( ".scroll-directions" ).css('top',0)
	    })
  	} else {
        that.percent = 0
		that.scrollFunction()
		scrollerPos = 0;
	    $( ".scroll-directions" ).css('top',0)
  	}

  	krpano = document.getElementById("krpanoObject");
  	krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true),js(showMapIcon();))")

  }

	// Auto Resize ********************************************************

	this.resize = function(){
		that.maxScrollerPos = window.innerHeight - 300

		scrollValue = scrollerPosStart  * 5000 / (window.innerHeight - 220);

		$(video).css({
			'width' :  master.globals.cover.w,
			'height' : master.globals.cover.h,
			'top' :    master.globals.cover.t,
			'left' :   master.globals.cover.l
		})
	}

	master.debouncedResize();



  // Autoplay Trigger ********************************************************

  this.playing = false

	$('.hotspot').off('click')
  $('.hotspot').on('click',function(e){

  	e.stopPropagation()

    if(that.playing) that.pause();
    else             that.play();

  })

  this.play = function(){
  	if(!that.playing) {
      console.log('PLAY >')
      that.playing = true
      video.play();

      if(extcontrol) if(extcontrol.role === 'master') {
        extcontrol.fn({ 'fn':'walkthrough', 'action':'play' })
      }
    }
  }

  this.pause = function(){
    if(that.playing) {
      console.log('PAUSE ||')
      that.playing = false
      video.pause();

      if(extcontrol) if(extcontrol.role === 'master') {
        extcontrol.fn({ 'fn':'walkthrough', 'action':'pause' })
      }
    }
  }


  // Scroll Thumb/Mousewheel ********************************************************

	$.getScript("js/lib/jquery-ui.min.js", function(data, textStatus, jqxhr) {

		/* ***** Scroll Thumb ***** */
		$.getScript("js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
	   		$( ".scroll-directions" ).draggable({ 
	   			axis: "y",
	   			containment: 'parent',

				drag: function() {
					
					that.autoplay = false // stop autoplay
					that.percent = parseInt($(this).css('top')) / (window.innerHeight-300)
					that.scrollFunction()

				},

				stop: function() {}
			});
	   	});

		/* ***** Mouse Wheel ***** */

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
      that.percent -= (playSpeed*5) * delta

      advance()

			clearTimeout(mouseWheelTimeout)

			mouseWheelTimeout = null

      mouseWheelTimeout = setTimeout(function(){
      	// that.scrollStopFunction()
      },500)
		}

	});


  /* ***** Advance ***** */

  advance = function(){

  	// sanity check
  	if(that.percent > 1) {
  		that.percent = 1;
  		clearTimeout(mouseWheelTimeout)
  		return
  	}
  	else if(that.percent < 0) {
  		that.percent = 0.01
  		clearTimeout(mouseWheelTimeout)
  		return
  	}

      // update scroll thumb
  	$( ".scroll-directions" ).css('top', (that.percent * that.maxScrollerPos) )

  	that.scrollFunction()
  }

  /* ***** External Control ***** */
  this.setPercent = function(_percent){ 
    that.percent = _percent;
    that.scrollFunction();
  }

	/* ***** Scroll Function ***** */

  this.scrollFunction = function(){

  	// sanity check
		if(that.percent <= 0) that.percent = 0.01
		else if(that.percent > 1) that.percent = 1

    if(extcontrol) if(extcontrol.role === 'master') {
      extcontrol.fn({ 'fn':'walkthrough', 'action':'setPercent', 'percent': that.percent });
    }

		var currentTime = videoLength * that.percent
		
		video.currentTime = currentTime;

		// console.log(video.currentTime)

  }
              
}












/**************************************************************************
***************************************************************************


	> Ghost

	set master.ghostBuster or master.overlayOpen to disable ghosts


***************************************************************************
**************************************************************************/



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
**************************************************************************
	


	> Root Functions (so we can call them from the krpano XML)



**************************************************************************
*************************************************************************/

var loadAFXPano = function (_file, _start){

    if(!_start) _start = 0

    if(extcontrol) if(extcontrol.role === 'master') {
        extcontrol.fn({ 'fn':'loadAFXPano', '_file':_file, '_start':_start });
    }

    master.AFXloadAudio( master.audio_path + _file + master.audioType,'overlay_02',0,1.0, _start)
    
}


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

  if(_pano === master.globalPano) return;

	console.log('newPano')

	master.isPlayingVO = false

	if(!fromPrologue) {

		$('#video-underlay').hide()

		parent.location.hash = _pano

		$panocontainer.addClass('hide')

	}

}

function removeBackgroundImage(divName){

	console.log("remove " + divName)

	$('.' + divName).remove()

}

function panoComplete(){

	console.log('PANO COMPLETE ')

	if(!isPreloaded) preloader();

	//$('.loading').fadeOut(500)
	$panocontainer.removeClass('hide')
	$panocontainer.css('opacity',1.0)

	// $panocontainer.fadeIn(1000,function(){
	$('#video-underlay').show()

}


/**************************************************************************
    
  Zoom and change pano

    all pano change lookto zooms are here
    so they can be used by the autopilot

    in XML:
    onclick="js(zoom_to_and_change_pano('from','to'))"

**************************************************************************/

var zoom_and_change_pano = function( from, to) {

  // console.log('Zoom and change pano from: '+from+' to: '+to);

  if(!krpano) krpano = document.getElementById("krpanoObject");

  // Helicopter
  if(from === 'helicopter' && to === 'platform')
    krpano.call("lookto(-99,2,15,smooth(),true,true,js(newPano(platform)))");


  // Platform
  if(from === 'platform' && to === 'lowerplatform')
    krpano.call("lookto(96,13,15,smooth(),true,true,js(newPano(lowerplatform)))");

  else if(from === 'platform' && to === 'helicopter')
    krpano.call("lookto(-130,10,25,smooth(),true,true,js(newPano(helicopter)))");


  // Lower Platform
  else if(from === 'lowerplatform' && to === 'sequence_shaftway')
    krpano.call("lookto(79,8,15,smooth(),true,true,js(newPano(sequence_shaftway)))");

  else if(from === 'lowerplatform' && to === 'hallway')
    krpano.call("lookto(79,8,15,smooth(),true,true,js(newPano(hallway)))");

  else if(from === 'lowerplatform' && to === 'platform')
    krpano.call("lookto(-100,3,15,smooth(),true,true,js(newPano(platform)))");

  else if(from === 'lowerplatform' && to === 'sequence_outside_stairs_down')
    krpano.call("lookto(-143,8,15,smooth(),true,true,js(newPano(sequence_outside_stairs_down)))");


  // Boat
  else if(from === 'boat' && to === 'lowerplatform')
    krpano.call("lookto(75,-12,10,smooth(),true,true,js(newPano(lowerplatform)))");

  else if(from === 'boat' && to === 'lowerplatform')
    krpano.call("lookto(75,-12,10,smooth(),true,true,js(newPano(lowerplatform)))");


  // Chemical Room
  else if(from === 'chemicalroom' && to === 'hallway')
    krpano.call("lookto(30,4,20,smooth(),true,true,js(newPano(hallway)))");


  // Sub Hangar
  else if(from === 'subhangar' && to === 'theatre')
    krpano.call("lookto(-30,-19,10,smooth(),true,true,js(newPano(theatre)))");

  else if(from === 'subhangar' && to === 'submarine')
    krpano.call("lookto(-55,-16,10,smooth(),true,true,js(newPano(submarine)))");



  // Control Room
  else if(from === 'controlroom' && to === 'hallway')
    krpano.call("lookto(260,0,20,smooth(),true,true,js(newPano(hallway)))");


  // Hallway
  else if(from === 'hallway' && to === 'sequence_passage_chemicalroom')
    krpano.call("lookto(0,0,10,smooth(),true,true,js(newPano(sequence_passage_chemicalroom)));)");

  else if(from === 'hallway' && to === 'chemicalroom')
    krpano.call("lookto(0,0,10,smooth(),true,true,js(newPano(chemicalroom)));)");

  else if(from === 'hallway' && to === 'sequence_passage_theatre')
    krpano.call("lookto(270,0,5,smooth(),true,true,js(newPano(sequence_passage_theatre)));)");

  else if(from === 'hallway' && to === 'theatre')
    krpano.call("lookto(270,0,5,smooth(),true,true,js(newPano(theatre)));)");

  else if(from === 'hallway' && to === 'sequence_passage_controlroom')
    krpano.call("lookto(178,0,5,smooth(),true,true,js(newPano(sequence_passage_controlroom)));)");

  else if(from === 'hallway' && to === 'controlroom')
    krpano.call("lookto(178,0,5,smooth(),true,true,js(newPano(controlroom)));)");

  else if(from === 'hallway' && to === 'lowerplatform')
    krpano.call("lookto(105,-40,10,smooth(),true,true,js(newPano(lowerplatform)));js(setCache(get(view.hlookat),90))");


  // Submarine
  else if(from === 'submarine' && to === 'subhangar')
    krpano.call("lookto(270,0,10,smooth(),true,true,js(newPano(subhangar)));js(removeBackgroundImage(underwater-hanger));");


  // Theatre
  else if(from === 'theatre' && to === 'hallway')
    krpano.call("lookto(35,0,5,smooth(),true,true,js(newPano(hallway)))");

  else if(from === 'theatre' && to === 'subhangar')
    krpano.call("lookto(-158,0,5,smooth(),true,true,js(newPano(subhangar)))");

}




/**************************************************************************
  
  Misc Functions from individual scenes

**************************************************************************/

// Control Room
var startDrilling = function(stopping){

  console.log('startDrilling ' + stopping)

  if(extcontrol) if(extcontrol.role === 'master') {
    extcontrol.fn({ 'fn': 'startDrilling', 'stopping':stopping })
  }

  if(!krpano) krpano = document.getElementById("krpanoObject");

  if(stopping) {

    krpano.call("set(hotspot[closehatch].alpha,0);");
    krpano.call("set(hotspot[closehatch].enabled,false);");
    krpano.call("set(hotspot[openhatch].enabled,true);");

  } else {

    loadAFXPano('klaxxon');

    krpano.call("set(hotspot[closehatch].alpha,1);");
    krpano.call("set(hotspot[closehatch].enabled,true);");
    krpano.call("set(hotspot[openhatch].enabled,false);");
    krpano.call("lookto(190,0,60,smooth(),true,true);");

  }

  var transition_audio = $('#transition', window.parent.document)
  transition_audio[0].src = "audio/Hatch_Open.mp3"
  transition_audio[0].play()
  $("#wrapper").delay(200).animate({'bottom': '-10','top': '10'}, 100, function(){
    $("#wrapper").animate({'bottom': '0','top': '0'}, 100)
  })
}



// Zoom in/out

function zoomOut() {
    master.overlayOpen = false

    if(extcontrol) if(extcontrol.role === 'master') {
      extcontrol.fn({ 'fn': 'zoomOut' })
    }


    $('.fastpan, .compass').fadeIn()
    $("#zoom-out").fadeOut()

    if(!krpano) krpano = document.getElementById("krpanoObject");
    krpano.call('tween(90,90,2,easeOutCubic,js(showMapIcon()))')
    krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true)")
    krpano.call('set(autorotate.enabled,true)')
    $("#zoom-out").off('click')
    $('#zoom-out').remove()
}

function zoomIn() {
  console.log('ZOOM IN')
  master.overlayOpen = true
  $('.fastpan, .compass').fadeOut()

  // create
  $('#zoom-out').remove()
  $panocontainer.after('<div id="zoom-out" class="platform-nav dynamic hide"></div>')
  $("#zoom-out").removeClass('hide')

  $("#zoom-out").on('click',zoomOut);
}


// Submarine
var loadUnderWater = function(_id){
  console.log('loadUnderWater() '+_id)

  if(extcontrol) if(extcontrol.role === 'master') {
    extcontrol.fn({ 'fn': 'loadUnderWater', '_id': _id })
  }

  if(!krpano) krpano = document.getElementById("krpanoObject");
  krpano.call("lookTo(90,0,50,smooth(),true,true)");
  zoomIn();
  setCache(270,90);

  $("#video-underwater").addClass('hide')

  $('#video-underwater')[0].src = master.cdn_video + _id + master.videoType
  $('#video-underwater')[0].load()

  $('#video-underwater')[0].addEventListener('canplay', function(e) {
    e.stopPropagation()
    $('#video-underwater').removeClass('hide')
    $('#video-underwater')[0].play();
  }, false);

}

var corexit = function(){

  if(!extcontrol) return;

  if(extcontrol.role === 'master') {
    extcontrol.fn({ 'fn':'corexit' })
  } else if(extcontrol.role === 'slave') {
    krpano.call("tween(alpha,1);set(hotspot[Corexit_video].enabled,true);set(hotspot[open_cabinet].enabled,false);set(hotspot[Corexit_text].enabled,true);set(hotspot[Corexit_text].alpha,1)");
  }

}





/**************************************************************************
**************************************************************************


	> Sound Adjust


**************************************************************************
**************************************************************************/


var soundVector1 = soundVector2 = soundVector3 = 0;

var soundadjust = function(coord,fov) {

	var convCoord  =  Math.abs( (coord+ 60) % 360);
	var convCoord1 =  Math.abs( (coord-120) % 360);

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
	if(master.globalPano === 'chemicalroom' || master.globalPano === 'subhangar' ) {
		// fade in walkthrough	  
		if(fov < 25 && !master.overlayOpen) {
  
	        $('.scroll-directions, .panoversion, #walking-exit').fadeIn()
	        $('#panocontainer, .fastpan, .compass').addClass('hide')
	        //pano.walkthrough.autoplay = true
	        $('#walking-canvas-pano').css('display','block')
	        if(master.isIOS || master.isAndroid){
		        $('#walking-canvas-pano').css('top','80px')
		        $('.platform-nav').css('right','55px')
	        }
	        pano.panoWalkthrough.autoplay = true
	        pano.walkthroughPlaying = true;

  		// fade out walkthrough
	    }else{
  
	        if(!master.overlayOpen)
	        	$('#panocontainer, .fastpan, .compass').removeClass('hide')

	        $('.scroll-directions, .panoversion, #walking-exit').fadeOut(function(){
	            $('.scroll-directions').css('top','0px') // reset scrubber position
	        })

	        //$('#walking-canvas-pano').css('opacity',1.0)

	        if(master.isIOS || master.isAndroid){
	        	$('#walking-canvas-pano').css('display','none')
	        }
    
	        $('#walking-canvas-pano').css('opacity', Math.abs(1-fov/90)+.4)
	        pano.walkthroughPlaying = false;
	    }
	} else {
    $('.scroll-directions, .panoversion, #walking-exit').hide()
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


function showMapIcon(){
	$compass.fadeIn()
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
**************************************************************************


	> Video Player

    videoPlayerUI
      playpause()
      seekstart()
      seekstop()
      sliderseek()

    videoPlayer()

    switchVideo()

    closeVideoPlayer()

**************************************************************************
*************************************************************************/


// UI functionality pulled out from videoPlayer() so it can be accessed
// by the External Control and Autopilot modules.
var videoPlayerUI = {

  video : document.getElementById("video-overlay"),
  $play : $(".video-content-wrap .play"),
  $seek : $(".video-content-wrap .seek"),
  wasplaying : null, 
  time : null,

  // these two allow iOS masters to control video properly
  play : function(data){
    videoPlayerUI.video.currentTime = data.time;
    videoPlayerUI.video.play();
  },

  pause : function(){
    videoPlayerUI.video.pause()
  },

  // the rest are normal UI functionality
  playpause : function() {

    if(extcontrol) if(extcontrol.role === 'master') {
      extcontrol.fn({ 'fn':'videoPlayerUI', 'action':'playpause'})
    }

    if (videoPlayerUI.video.paused) {

      videoPlayerUI.video.play();
      videoPlayerUI.$play.removeClass('paused')

    } else {

      videoPlayerUI.video.pause()
      videoPlayerUI.$play.addClass('paused')

    }
  },

  seekstart : function(){
    if(extcontrol) if(extcontrol.role === 'master') {
      extcontrol.fn({ 'fn':'videoPlayerUI', 'action':'seekstart'})
    }

    if(!videoPlayerUI.video.paused) wasplaying = true;
    else wasplaying = false;
    videoPlayerUI.video.pause()
    videoPlayerUI.$play.addClass('paused')
  },

  seekstop : function(data){
    if(extcontrol) {
      if(extcontrol.role === 'master') {
        extcontrol.fn({ 'fn':'videoPlayerUI', 'action':'seekstop', 'time':videoPlayerUI.time})
      } else if(extcontrol.role === 'slave') {
        videoPlayerUI.time = data.time;
      }
    } 

    videoPlayerUI.video.currentTime = videoPlayerUI.time;
    if(wasplaying) {
        videoPlayerUI.video.play()
        videoPlayerUI.$play.removeClass('paused')
    }
  },

  sliderseek : function(){
    videoPlayerUI.time = videoPlayerUI.video.duration * (videoPlayerUI.$seek.slider("value") / 100);
  }

}



/**************************************************************************
  
  videoPlayer

**************************************************************************/

function videoPlayer(group, playerFadeTransition){

	if(master.overlayOpen === true) return;

  if(extcontrol) if(extcontrol.role === 'master') {
    extcontrol.fn({
      "fn": "openVideoPlayer",
      "group": group,
      "playerFadeTransition": playerFadeTransition 
    });
  }

	// hook into global resize function
	master.resize.videoplayer = true;
	master.debouncedResize();

	master.ghostBuster = true
	master.overlayOpen = true
	master.soundTrigger = true

	console.log('launchVideoPlayer: '+group)

	$('.volume-toggle').css('line-height','80px')

	// disable mouse events on pano container
	$panocontainer.addClass('hide')
	$compass.fadeOut()

	// close breadcrumb
	if(master.isIOS){
 		$breadcrumb.animate({'bottom': '-40px'}, 500)
	}else{
		 $breadcrumb.animate({'bottom': '-40px'}, 500)
	}
   



	master.bgGain = 0.1

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



	// On video end: ---------------------------------------------------------
  // next video or close player

	$('#video-overlay').off('ended')
	$('#video-overlay').on('ended',function(){

		$(items).each(function(i,v){

			if($(v).hasClass('active')) {

				if( $(v).next().length > 0 && $(v).next().data('file') )
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
		var $play = $(".video-content-wrap .play")
		var $seek = $(".video-content-wrap .seek")
		var wasplaying, time;

		$play.on("click", videoPlayerUI.playpause);

    if(master.isIOS || master.isAndroid) {

      // ********************************************************
      // html5 video event hooks

      video.addEventListener('play',function(){
        console.log('play')
        if(extcontrol) if(extcontrol.role === 'master') {
          extcontrol.fn({ 'fn':'videoPlayerUI', 'action':'play', 'time':video.currentTime })
        }
      })

      video.addEventListener('pause',function(){
        console.log('pause')
        if(extcontrol) if(extcontrol.role === 'master') {
          extcontrol.fn({ 'fn':'videoPlayerUI', 'action':'pause' })
        }
      })

      video.addEventListener('seeked',function(){
        console.log('seeked')
        if(extcontrol) if(extcontrol.role === 'master') {
          extcontrol.fn({ 'fn':'videoPlayerUI', 'action':'seekstop', 'time':video.currentTime })
        }
      })

    } else {

      // ********************************************************
      // Slider

      $.getScript("js/lib/jquery-ui.min.js")
      .done(function(script, textStatus){

        $seek.slider()
          .slider({ start: videoPlayerUI.seekstart })
          .slider({ stop:  videoPlayerUI.seekstop  });

        // slider -> video
        $seek.slider({ slide: videoPlayerUI.sliderseek });
        
        // video -> slider
        video.addEventListener("timeupdate", function() {
            var value = (100 / video.duration) * video.currentTime;
            $seek.slider("value", value);
            $(".video-content-wrap .text").html(timeFormat(video.currentTime) + "/" + timeFormat(video.duration))
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

    }
    

	})

	videoControls();

	
	// Movie Menu autohide ---------------------------------------------

	var autohide = (function(){

		if(master.isIOS || master.isAndroid) return

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




/**************************************************************************
  
  switchVideo

**************************************************************************/

function switchVideo(_id,_text){

	console.log('switchvideo: '+'\t'+_id)

  if(extcontrol) if(extcontrol.role === 'master') {
    extcontrol.fn({
      'fn'    : 'switchVideo',
      '_id'   : _id,
      '_text' : _text
    });
  }

	$('#movieloading').fadeIn();

  // ********************************************************
  // track number of seconds of video viewed (in localStorage)

	var viewedContent = $.grep(master.viewedContentArray, function (element, index) { 
        return element.srcString == $videooverlay[0].src
    });

	if(viewedContent.length > 0 ){

		if($videooverlay[0].currentTime > parseFloat(viewedContent[0]['time'])){
			viewedContent[0]['time'] = $videooverlay[0].currentTime
		}

	} else {
		 master.viewedContentArray.push({'srcString' : $videooverlay[0].src, 'time' : $videooverlay[0].currentTime})
	}

	var contentViewed = $('.movie-menu .viewedContentDiv')
	var contentViewedSeconds = JSON.parse(localStorage.getItem('contentViewedSeconds'));

	if(!contentViewedSeconds) contentViewedSeconds = 1;

	$(master.viewedContentArray).each(function(i,v){
		if (v['time']) contentViewedSeconds += parseInt(v['time'])
	})

	contentViewed.text('You have seen ' +  Math.round( contentViewedSeconds / 60 * 10 ) / 10   + " / 71 minutes of OFFSHORE video content." )
	localStorage.setItem('contentViewedSeconds',JSON.stringify(contentViewedSeconds))

	
	// nuke base track
	if(parent.audiomaster.mix.getTrack('overlay_02')) parent.audiomaster.mix.getTrack('overlay_02').gain(0.0001)

  // ********************************************************
	// Switch active movie
	active = $('.movie-menu').hasClass('active')

	$(active).find($('.movie-menu-item')).each(function(i,v){
		$(v).removeClass('active')
		if($(v).data('file') == _id)
			$(this).addClass('active')
	})


  // ********************************************************
  // reset DOM

  if(master.isIOS || master.isAndroid) {
    var iosControls = $(".video-content-wrap .movie-menu, .video-content-wrap")
    iosControls.removeClass('hide')
  }

  $('#ghost-canvas-trans').fadeOut()
  $('.controls').css('display','none')
	
	$('#video-overlay-title').html(_text)
	$('#video-overlay-title').fadeIn()


  // ********************************************************
  // Load the video

  $videooverlay.addClass('hide')

  $videooverlay[0].pause()
  $videooverlay[0].src = '';

	setTimeout(function() {

		$videooverlay[0].src = master.cdn_video + _id + master.videoType
		$videooverlay[0].load()

    console.log($videooverlay[0].src)

		if(master.isIOS || master.isAndroid){

			$videooverlay[0].controls = true
			$videooverlay.removeClass('hide')

		}
	}, 500)

	$videooverlay[0].addEventListener('loadedmetadata', function(e) {
		$('#walking-canvas-pano').css('display','none')
	}, false);

	if(master.isAndroid){
		$videooverlay[0].addEventListener('click',function(){
	  		$videooverlay[0].play();
		},false);
	}

	$videooverlay[0].addEventListener('canplaythrough', function(e) {

		if(parent.location.hash.slice(1) == "") {
			parent.location.hash = "helicopter"
		}

		$videooverlay.removeClass('hide')

		$('#video-overlay-title').fadeOut(2000)
		$('#movieloading').fadeOut(2000);

		$('.controls').css('display','block')

    e.stopPropagation();

    var autoplay = true;
    if(extcontrol) if(extcontrol.role === 'slave') autoplay = false;
		if(master.isAndroid) autoplay = false;

    if(autoplay) this.play();

	}, false);

}


/**************************************************************************
  
  closeVideoPlayer

**************************************************************************/

function closeVideoPlayer(){

  if(extcontrol) if(extcontrol.role === 'master') {
    extcontrol.fn({ 'fn':'closeVideoPlayer' });
  }

	var $videocontentwrap = $(".video-content-wrap")

	var viewedContent = $.grep(master.viewedContentArray, function (element, index) { 
    return element.srcString == $('#video-overlay')[0].src
  });	

	if(viewedContent.length > 0 ){

		if($('#video-overlay')[0].currentTime > parseFloat(viewedContent[0]['time'])){
			viewedContent[0]['time'] = $('#video-overlay')[0].currentTime
		}

	} else {
		 master.viewedContentArray.push({'srcString' : $('#video-overlay')[0].src, 'time' : $('#video-overlay')[0].currentTime})
	}
		

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
	$videocontentwrap.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd")

	master.bgGain = 1.0
	master.ghostBuster = false

	$videooverlay.addClass('hide')
	$panocontainer.removeClass('hide')
	$videocontentwrap.fadeOut(1000)
	$('#walking-canvas-pano').css('display','block')
	// $panocontainer.removeClass('no-pointer-events')
	$compass.fadeIn()

	// master.overlayOpen = false
	$videooverlay[0].pause(); // can't hurt
	//parent.audiomaster.mix.setGain(1.0)
	
	$videocontentwrap.removeClass("open");
	$videocontentwrap.removeClass("transtion-width");
	$videocontentwrap.removeClass("transition-opacity");
	//$(".video-content-wrap").addClass("no-pointer-events");

	krpano = document.getElementById("krpanoObject");
	krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true),js(showMapIcon();))")

	setTimeout(function() {
		master.overlayOpen = false;
		master.resize.videoplayer = false;
	}, 500)
}




















/*************************************************************************
**************************************************************************


	> jQuery Extension


**************************************************************************
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
						master.build_navbar()
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









/**************************************************************************
  
  Orientation Change Handler

**************************************************************************/

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
