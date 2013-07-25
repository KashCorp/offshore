var masterFunctions = function() {
	var fadeSpeed = 500,
	pagepath = 'http://www.offshore-interactive.com/pages/',
	that = this,
	visitedPages = getCookie("visitedPages"),
	audio = document.getElementsByTagName('audio'),
	newPageTrigger,
	isParent ;
	var videoType = ".webm";

	this.ghostBuster = false

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

    this.movieMenu = false

    isRetinaFunction = function(){var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\ (min--moz-device-pixel-ratio: 1.5),\ (-o-min-device-pixel-ratio: 3/2),\ (min-resolution: 1.5dppx)"; if (window.devicePixelRatio > 1) return true; if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true; return false; };
    this.isRetina = isRetinaFunction()
    //console.log('[retina]: '+this.isRetina)
     
     //$('.wrapper').before('<div class="loading"><img src="images/loading-gif-animation.gif"></div>')
     $('.wrapper').append('<div class="compass"><img src="images/icons/map_icon.png"></div>')

     $('.compass').click(function() {
     	$(this).fadeOut(500)
		that.loadMap()
     });

	 $('#panocontainer').after('<div class="vignette"/>')
    

    var delayNavSlide = function(){
    	$(".breadcrumb").animate({'bottom': '-40'}, 500)
    	$("#offshorelogo").animate({'bottom': '-10'}, 500)
    }

    var navInterval = setTimeout(delayNavSlide, 5000); 
     
    $('.breadcrumb').mouseover(function() {
     	clearInterval(navInterval);
        $(".breadcrumb").animate({'bottom': '0'}, 500)
       // $("#offshorelogo").animate({'bottom': '25'}, 500)
    });
 
 
    $('.breadcrumb').mouseleave(function() {
       	clearInterval(navInterval);
        navInterval = setTimeout(delayNavSlide, 1000);
    }); 


    $('.wrapper').click(function() {
       $('.pan-directions').fadeOut(500)
    }); 


    document.addEventListener('touchstart', function(e) {
        $('.pan-directions').fadeOut(500)
    }, false);

 

     

               
      var transition_audio = $('#transition', window.parent.document)
      
      var hashouter = parent.window.location.hash;
      
      if( hashouter  == "#hatch.php"){
      	transition_audio[0].src = "audio/Hatch_Open.ogg"
      }
      
      if(!visitedPages){
      	visitedPages = "empty"
      	setCookie("visitedPages",visitedPages,365)
      }
      
      //this.url_array = ["rigmap.php~Map","greenbook.php~Briefing Dossier","filecabinetcontents.php~Filing Cabinet"];
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




  	/**********************************************************************
		
		init

  	**********************************************************************/
    	      
	this.init = function(no_fade){



  		this._frame = null

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
            	breadbox_string += '<h1><img src="images/splash_logo_small@2x.png" alt=""></h1>';
            else
            	breadbox_string += '<h1><img src="images/splash_logo_small.png" alt=""></h1>';

           

            breadbox_string += '<nav class="left">';
            breadbox_string += '<ul><li><a href="about.html">About</a></li>';
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

 /**/           

            $('.breadcrumb').html(breadbox_string);

           
        }
  
  		var hash = parent.window.location.hash

  		var placer = that.divider, temp_icon;

        var futureMonthsCode = ['F','G','H','J','K','L','M','N','Q','U','V','X','Z']

        var d = new Date();
        var m = d.getMonth();
        var y = d.getYear();

        


        // Oil price ticker

        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20LastTradePriceOnly,ChangeinPercent,Change%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22BZ' + futureMonthsCode[4] + '14.NYM%22%29%0A%09%09&format=xml&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env'
 //console.log(url)
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            success: function(xml){
                var price = $(xml).find("LastTradePriceOnly").text();
                var percent = $(xml).find("ChangeinPercent").text();
                var change = $(xml).find("Change").text();
                console.log('[oil ticker]: $'+price+'\t'+percent)
                insertNav(price, change, percent);
            }
        });

        
			
  		$(".breadbox").click(function(){
			that.pageChange($(this).data('url'))
	  	}) 

      	$(".breadbox-rigmap").click(function(){
			that.loadMap()
		})

 		// Disable iOS overscroll
 		$(document).on('touchstart', function(e) { e.preventDefault(); });

	} // end init









	/********************************************************************************
		
		Overlays

	********************************************************************************/


	this.loadMap = function(){
		if(!this._frame){
			krpano = document.getElementById("krpanoObject");
			krpano.call("set(autorotate.enabled,false)")

			master.overlayOpen = true
			$('.scroll-directions').fadeOut(500)
			$('.compass').fadeOut(500)
			$("#panocontainer").fadeOut(500)
			that._frame = '<iframe allowtransparency="true" id="map-container-frame" src="rigmap.php"></iframe>'
			// $('body').append(this._frame)
			$('.vignette').after(this._frame)
			$('#map-container-frame').fadeIn(1000)
		}
	}

	this.closeMap = function(){
		$('#map-container-frame').fadeOut(500, function(){
			master.overlayOpen = false
			that._frame = null;
			$('.scroll-directions').fadeIn(500)
			$('.compass').fadeIn(500)
			$("#panocontainer").fadeIn(500)
			that._bookFrame = null;

			krpano = document.getElementById("krpanoObject");
			krpano.call("set(autorotate.enabled,true)")

			$('#to-control').off('click')
	 	})
	}

	this.loadBook = function(_bookUrl){
		$('.compass').fadeOut(500)
		master.overlayOpen = true

		// if first run, load the book data
		if( !that._bookFrame ) {
			console.log('load book')
			this._bookFrame = '<iframe style="display:none" allowtransparency="true" id="book-container-frame" src="'+ _bookUrl+'"></iframe>'
			$('body').append(this._bookFrame)

			setTimeout(function() {
				$('#book-container-frame').fadeIn(500,function(){
					krpano = document.getElementById("krpanoObject");
					// krpano.call("tween(view.fov, 15.0, 1.0)")
					krpano.call("set(autorotate.enabled,false)")
					parent.audiomaster.mix.setGain(0.1)
			 	})
			}, 500)

		} 

		// otherwise just fade it back in
		else {
			console.log('fade in book')
			$('#book-container-frame').fadeIn(500,function(){
				krpano = document.getElementById("krpanoObject");
				// krpano.call("tween(view.fov, 15.0, 1.0)")
				krpano.call("set(autorotate.enabled,false)")
				parent.audiomaster.mix.setGain(0.1)
		 	})
		}
		
	}

	this.closeBook = function(){
		master.overlayOpen = false

		$('#book-container-frame').fadeOut(1000, function(){
			$('.compass').fadeIn(500)
			that._frame = null;
			// that._bookFrame = null;
			krpano = document.getElementById("krpanoObject");
			krpano.call("tween(view.fov, 90.0, 1.0)")
			parent.audiomaster.mix.setGain(1.0)
	 	})
	}

	// Overlay Functionality

	$('.close-overlay').click(function(){
		master.hideOverlay();
		var parent = $(this).parent().attr('id');
		if (parent == 'overlay_intro') {
			initAction();
		}	
	})

	if (parent == 'overlay_intro') {
		initAction();
	}

	var initAction = function() {
		
		master.krpano = document.getElementById("krpanoObject");
  		if (!master.krpano || !master.krpano.get) {
 
    		return "";
  		}


  		
  		master.krpano.call('action(initialize)')
	}

	this.showOverlay = function(selector) {
		$('#overlay, ' + selector).fadeIn(1500);
	}

	this.hideOverlay = function() {
		$('#overlay, .inner-overlay').fadeOut(1500);
	}

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
	


this.loadVideoUnderlay =  function(_id,_popcorn,_load_menu){
    
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
	//$('.wrapper').fadeIn(500)

	}else{
	var getGhost = this.ghost_array[Math.floor(Math.random()*this.ghost_array.length)]
	this.ghostTrans(getGhost['ghost'],getGhost['frames'])		
	}	


}

this.ghostTrans = function(_id,numberOfFrames,_isNotPano){

	$(".loading").hide()


	//initAction()

    var dynamicWidth = window.innerWidth;

    var dynamicHeight = dynamicWidth * .5625;

    var dynamicTop = (window.innerHeight - dynamicHeight)/2;

    //$('body').append('<canvas id="ghost-canvas-trans" />')

	var ghost = new ghostFunctions(dynamicWidth,dynamicHeight,"ghost-canvas-trans",_id,numberOfFrames)
 
	ghost.imageSequencer()

	$('#ghost-canvas-trans').fadeIn()


}

this.loadOverlayAudio = function(_file){

	console.log(_file)

	parent.audiomaster.loadAudio(_file,'overlay_01',1,-1)

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


	parent.audiomaster.loadAudio(_file,_trackName,0001,_pan,_isLoop)

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

this.AFXloadAudio = function(_file,_trackName,_pan,_targetVolume){

	console.log(_file)

	if(parent.audiomaster.mix.getTrack(_trackName)) parent.audiomaster.mix.removeTrack(_trackName)

	if(!_targetVolume) {_targetVolume = 1.0}

	parent.audiomaster.loadAudio(_file,_trackName,0001,_pan,"true")

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
    } else {
    	initAction()
    	//var t = setTimeout(initAction, 2000);
    }
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







}

// STARTS THE EXPERIENCE

var master = new masterFunctions();
	master.init()
	master.check_start()










/*************************************************************************

	

	Walkthrough



*************************************************************************/



var walkthroughFunctions = function(w,h,canvasid,name,imageNumber) {

	filePathPre = master.cdn_imgseq

	maxScrollerPos = $('.scroll-directions-container').height()

	// preload
	this.preload = function(){
		console.log('preloading '+imageNumber+' images')
		var img = new Image()
		for (var i = 1; i < imageNumber; i++) {
			imageSrc = filePathPre + name + "-sm-frame-"+zeroes(i,4)+".jpg";
			img.src = imageSrc
		}
	}
	
    var scrollerPos = parseInt($( ".scroll-directions" ).css('top'))
    var scrollerPosStart = 100
    var scrollValue = ( scrollerPosStart - 80) * 5000 / (window.innerHeight - 220)
   
    var mouseWheelTimeout
    var that = this
    that.scrollValue = scrollValue
	that.scrollPos = 0

    // begin Autoplay functionality 

    $('#walking-canvas-click').on('click',function(e){
    	e.stopPropagation()
    	playing = true
    	play()
    })

    this.playing = false

    this.play = function(){
    	if(that.playing) {

    		$(".scroll-directions").animate(
    			{'top': top+10},
    			50,
    			function(){
    				scrollerPos = parseInt($( ".scroll-directions" ).css('top'))
    				scrollerPos += 10

    				advance(scrollerPos)

    				that.play()
    			}
    		)
    		
    	} else {
    		return
    	}
    }

    // end Autoplay functionality

    advance = function(scrollerPos){
	    if(scrollerPos > maxScrollerPos) {
	    	scrollerPos = maxScrollerPos
	    	that.scrollStopFunction()
	    	clearTimeout(mouseWheelTimeout)
	    	return
	    } else if(scrollerPos < 100) {
	    	scrollerPos = 100
	    	that.scrollStopFunction()
	    	clearTimeout(mouseWheelTimeout)
	    	return
	    }


		$( ".scroll-directions" ).css('top',scrollerPos)
		scrollValue =  (parseInt($( ".scroll-directions" ).css('top'))- 80) * 5000 / (window.innerHeight - 220)
		that.scrollValue = scrollValue
		that.scrollFunction()
    }

	$.getScript("js/lib/jquery-ui.min.js", function(data, textStatus, jqxhr) {
		$.getScript("js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
	   		$( ".scroll-directions" ).draggable({ 
	   			axis: "y",
	   			containment: 'parent',
				drag: function() {
					
					that.playing = false // stop autoplay
					scrollValue =  (parseInt($( this ).css('top'))- 80) * 5000 / (window.innerHeight - 220)
					that.scrollValue = scrollValue

					console.log(scrollValue)


					that.scrollFunction()
				},
				stop: function() {
					that.scrollStopFunction()
				}
			});
	   	});

		if(document.getElementById('scroll-wrapper')){
		   	if ($("#scroll-wrapper")[0].addEventListener) {
	                // IE9, Chrome, Safari, Opera
	        $("#scroll-wrapper")[0].addEventListener("mousewheel", MouseWheelHandler, false);
	                // Firefox
	        $("#scroll-wrapper")[0].addEventListener("DOMMouseScroll", MouseWheelHandler, false);
			}
			            // IE 6/7/8
			else  $("#scroll-wrapper")[0].attachEvent("onmousewheel", MouseWheelHandler); 
		}
		
		function MouseWheelHandler(e){
	        var e = window.event || e; // old IE support
	        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	        scrollerPos = parseInt($( ".scroll-directions" ).css('top'))
	        scrollerPos -= delta*10

	        advance(scrollerPos)

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
 
    var canvas = document.getElementById(canvasid);
    
    canvas.width  = w;
    canvas.height = h;
    
    var context = canvas.getContext('2d');
	var imageSrc, scrollPercent, that = this
    
    scrollPercent = Math.ceil((scrollValue / (5000-$(window).height())) * imageNumber);
    this.scrollPercent = scrollPercent
    
    // imageSrc = filePathPre + name + "medsequence/frame-0001.jpg";
    imageSrc = filePathPre + name + "-med-frame-0001.jpg";

    var img = new Image();
	img.src = imageSrc
	   
	img.onload = function(){ context.drawImage(img, 0, 0,w,h); }

    this.scrollFunction = function(){
      
		scrollPercent = Math.ceil((scrollValue / (5000-$(window).height())) * imageNumber);
		
		if(scrollPercent <= 0) scrollPercent = 1
		else if(scrollPercent > imageNumber) scrollPercent = imageNumber
		
		// imageSrc = filePathPre + "smsequence/frame-"+zeroes(scrollPercent,4)+".jpg";
		imageSrc = filePathPre + name + "-sm-frame-"+zeroes(scrollPercent,4)+".jpg";
		
		// console.log(scrollValue + '\t' + (5000-$(window).height()) + '\t' + scrollPercent)
		
		var img = new Image();
		img.src = imageSrc
		img.onload = function(){ context.drawImage(img, 0, 0,w,h); }
    }

    this.scrollStopFunction = function(){

        if(scrollPercent <= 0) scrollPercent = 1
		else if(scrollPercent > imageNumber) scrollPercent = imageNumber
        
        // imageSrc = filePathPre + "medsequence/frame-"+zeroes(Math.ceil(scrollPercent),4)+".jpg";
        imageSrc = filePathPre + name + "-med-frame-"+zeroes(Math.ceil(scrollPercent),4)+".jpg";
          	
        var img = new Image();
        img.src = imageSrc
        img.onload = function(){ context.drawImage(img, 0, 0,w,h); }

      	that.scrollPos = Math.round(scrollPercent / imageNumber * 100)
    	console.log('scrollStopFunction()' + '\t' + that.scrollPos)
    }	
              
} /// end walkthrough






/*************************************************************************

	

	Ghost



*************************************************************************/



var ghostFunctions = function(w,h,canvasid,name,imageNumber) {

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

	var that = this;
	
	var canvas = document.getElementById(canvasid);
	canvas.width  = 320
	canvas.height = 180;

	canvas.style.width = w + 'px'
	canvas.style.height = h + 'px'
	var context = canvas.getContext('2d');
	//context.globalCompositeOperation = "source-atop"
	var imageSrc;
	var playHead=1;

	master.ghostBuster = false

	this.imageSequencer = function(){
        
        
        
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

				
			if(!master.ghostBuster){
				console.log('ghost maker')
	          	that.vidplayback = setTimeout(function() {
					that.imageSequencer()				
	          	}, 1000 / 8);
	        }else{
	        	canvas.style.opacity = 0
	        }
	          	//requestAnimationFrame(that.imageSequencer);
		    }         

        

   }//imageSequencer 

   // preload
   this.preload = function(){
   	console.log('preloading '+imageNumber+' ghost images')
   	var img = new Image()
   	for (var i = 1; i < imageNumber; i++) {
   		imageSrc = filePathPre + name + zeroes(imageNumber,5)+".png";
   		img.src = imageSrc
   	}
   }
   
              
} /// end ghost






/*************************************************************************

	

	Root Functions Passed from XML



*************************************************************************/

function newPage(URL) {
 
 	newPageTrigger = false
 	master.audioFadeAll(0.0)
	var transition_audio = $('#transition', window.parent.document)	

	
  if(transition_audio.length>0){

	if(URL == "hatch.php"){

		if (transition_audio[0].canPlayType('audio/ogg')){
			transition_audio[0].src = "audio/Hatch_Open.ogg"
		} else {
			transition_audio[0].src = "audio/Hatch_Open.mp3"
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



function newPano(_pano) {

	$('#wrapper').addClass('hide')
	$('.pano-underlay').addClass('hide')
	
	setTimeout(function() {
		parent.location.hash = _pano
	}, 500)

}

function panoComplete(){

	$('#wrapper').removeClass('hide')

	setTimeout(function() {
		$('.pano-underlay').removeClass('hide')
	}, 700)
	

	}

function panoLoaded(){
	//$('.loading').fadeOut(500)
	//$('#ghost-canvas-trans').fadeOut(500)

	// console.log("GLOBAL PANO " + globalPano)

	if(globalPano) {

		pano.loadPanoScene(globalPano)

  		// var krpano = document.getElementById("krpanoObject"); 
    	//  krpano.call('action(' + globalPano + ')')
	
		// $(".wrapper").fadeIn(1000,function(){
		// 	$(".pano-underlay").fadeIn(1000)
		// 	$("#ghost-canvas-trans").fadeOut(500)
		// 	//transitionDiv
		// 	$("#transitionDiv").fadeOut(500)		
		// })

		globalPano = false
	}else{
		console.log("no direction home")
	}

	
}

function xmlLoaded(){
	
	console.log("xml loaded")

}

var cachedAuth = 0, cachedFov = 90

function openVideo(_ath, fov, id){

	var krpano = document.getElementById("krpanoObject");
	var ath =  parseInt(_ath) + 180
    //krpano.call("lookto(" + ath   + ",0," + fov + ",smooth(),true,true,js(launchVideo(" + id + ")))")    
    cachedAuth = _ath
    cachedFov = fov
}

function setCache(_ath,_fov) {
	console.log('[caching] ath: '+_ath+' fov: '+_fov)
	cachedAuth = _ath
	cachedFov = _fov
}

function openBook(_url){
	master.loadBook(_url)
}


// OLD FUNCTION
function launchVideo(_id){
	console.log('launchvideo: '+'\t'+_id)

	$("#to-control").on('click',function(){
		closeVideo()
	})

	$(".video-content-wrap").addClass("video-content-wrap-open");

	$(".video-content-wrap").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		master.overlayOpen = true
	    $(".compass").fadeOut()
	    var dynamicWidth = window.innerWidth;
	    var dynamicHeight = dynamicWidth * .5625;
	    var dynamicTop = (window.innerHeight - dynamicHeight)/2;

        $("#video-overlay").css("top",dynamicTop)
        $("#video-overlay").css("width",window.innerWidth)
        $("#video-overlay").css("height",dynamicHeight)
    	$("#video-overlay").fadeIn(1000)
    	$('#panocontainer').fadeOut(1000)
    	$('#video-overlay source').attr('src', _id + master.videoType);
    	$('#video-overlay video').load();
    //$("video-overlay").html('<source src="'+_id+'" type="video/webm"></source>' );

    	//master.audioFadeAll(0.5)
    	parent.audiomaster.mix.setGain(0.1)
    
    	$("#video-overlay")[0].load()
    	$("#video-overlay")[0].play()

    	$("#video-overlay")[0].onended = function(e) {
      		closeVideo()
    	}

	 });

} // launchVideo()

function closeVideo(_id){
	// $(window).off('resize',dynamicVideoOverlay())

	$('#to-control').off('click')
	$("#panocontainer").fadeIn(700)
	$(".video-content-wrap").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd")
	master.audioFadeInAll()
	$("#video-overlay").fadeOut(700, function(){
		master.overlayOpen = false
		$(".compass").fadeIn()
		$("#video-overlay")[0].pause(); // can't hurt
    	krpano = document.getElementById("krpanoObject");
		krpano.call("lookto(0,0,90,smooth(),true,true),js(showMapIcon()))")
		parent.audiomaster.mix.setGain(1.0)
		$(".video-content-wrap").removeClass("video-content-wrap-open");
	})
}


/*************************************************************************

	Video Player

*************************************************************************/

function videoPlayer(group){

	console.log('launchVideoPlayer: '+group)

	master.ghostBuster = true

	master.soundTrigger = true

	master.bgGain = 0.5

	master.overlayOpen = true

	group = "."+group
	items = $('.movie-menu'+group+' .movie-menu-item')

	$(group+'.movie-menu').addClass('active')

	$("#to-control").on('click',function(){ closeVideoPlayer() })

	$(items).first().addClass('active')

	$(".video-content-wrap").addClass("video-content-wrap-open");
	$(".compass").fadeOut()
	$('#video-overlay').removeClass('hide')
	$('#panocontainer').addClass('hide')

	switchVideo($(items).first().data('file'))

	$('#video-overlay').on('canplaythrough',function(){


		if(group == '.prologue') newPano('helicopter')

		

	})


	// On video end ---------------------------------------------------------

	$('#video-overlay').on('ended',function(){

		$(items).each(function(i,v){

			if($(v).hasClass('active')) {

				if( $(v).next().length > 0 )
					switchVideo( $(v).next().data('file') )
				else
					closeVideoPlayer()

				return false;
			}

		})

	})


	// Video resize ---------------------------------------------------------

	var vidtimeout

	function resize(){
		if (vidtimeout) clearTimeout(vidtimeout)

		vidtimeout = setTimeout(function(){
			var dynamicWidth = window.innerWidth;
		    var dynamicHeight = dynamicWidth * .5625;
		    var dynamicTop = (window.innerHeight - dynamicHeight)/2;

	        $("#video-overlay").css("top",dynamicTop)
	        $("#video-overlay").css("width",window.innerWidth)
	        $("#video-overlay").css("height",dynamicHeight)
		}, 100);
	}

	window.addEventListener('resize', resize);

	resize()


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


function switchVideo(_id){
	console.log('switchvideo: '+'\t'+_id)

	// find active group
	active = $('.movie-menu').hasClass('active')

	// set active item
	$(active).find($('.movie-menu-item')).each(function(i,v){
		$(v).removeClass('active')
		if($(v).data('file') == _id)
			$(this).addClass('active')
	})
	
	// partial fade to pano
	$('#panocontainer').removeClass('hide')
	$('#video-overlay').addClass('hide')
	$('#video-overlay')[0].pause()

	setTimeout(function() {
		$('#video-overlay')[0].src = master.cdn_video + _id + master.videoType
		$('#video-overlay')[0].load()
	}, 500)

	$('#video-overlay')[0].addEventListener('canplaythrough', function(e) {
		e.stopPropagation()
		$('#video-overlay').removeClass('hide')
		$('#panocontainer').addClass('hide')
		this.play();
	}, false);

}


function closeVideoPlayer(){

	$('.movie-menu').removeClass('active')
	$('.movie-menu-item').removeClass('active')

	// unbind
	$('#to-control').off('click')
	$(".video-content-wrap .play").off('click')
	$(".video-content-wrap").off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd")

	master.bgGain = 1.0
	
	$('#video-overlay').addClass('hide')
	$('#panocontainer').removeClass('hide')
	$(".compass").fadeIn()

	master.overlayOpen = false
	$("#video-overlay")[0].pause(); // can't hurt
	parent.audiomaster.mix.setGain(1.0)
	$(".video-content-wrap").removeClass("video-content-wrap-open");

	krpano = document.getElementById("krpanoObject");
	krpano.call("lookto("+cachedAuth+",0,"+cachedFov+",smooth(),true,true),js(showMapIcon()))")
}


function showMapIcon(){
	$(".compass").fadeIn()
}

var soundTrigger 

function hoverSound(){
	if(!soundTrigger){
	master.overlayPlay('#audio-2','audio/Rollover.ogg', 'audio/Rollover.mp3')
	soundTrigger = true
  }
}

function resetHoverSound(){
	soundTrigger = false
}

function showCS(selector) {
	pano.set("autorotate.enabled", true);
	master.showOverlay(selector)
}

// function preload_walkthrough() {
// 	console.log($('#container-frame')[0].window)
// 	console.log('preload_walkthrough()')
// 	window.preloadGO = true
// }







/*************************************************************************

	

	jQuery Extension



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









// shim layer with setTimeout fallback
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