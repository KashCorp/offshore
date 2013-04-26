var masterFunctions = function() {
	var fadeSpeed = 500,
			pagepath = 'http://www.offshore-interactive.com/pages/',
			mute = false,
			that = this,
			visitedPages = getCookie("visitedPages"),
			audio = document.getElementsByTagName('audio'),
			newPageTrigger,
			isParent ;
			var videoType = ".webm";
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
       
      var delayNavSlide = function(){
      	$(".breadcrumb").animate({'bottom': '-40'}, 500)
      	$("#offshorelogo").animate({'bottom': '-10'}, 500)
      }
 
     
     $('.wrapper').before('<div class="loading"><img src="images/loading-gif-animation.gif"></div>')

     $('.wrapper').append('<div class="compass"><img src="images/icons/map_icon.png"></div>')

     $('.compass').click(function() {
     	$(this).fadeOut(500)
		that.loadMap()
     });

	 $('#panocontainer').after('<div class="vignette"/>')
      

      var navInterval = setTimeout(delayNavSlide, 5000); 
      
      $('.breadcrumb').mouseover(function() {
      	clearInterval(navInterval);
        $(".breadcrumb").animate({'bottom': '0'}, 500)
        $("#offshorelogo").animate({'bottom': '25'}, 500)
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

      //$(".breadcrumb").html("")
 
      
      this.video_array = []


      this.video_array.push({'video':'action_06'});

      this.video_array.push({'video':'action_02'});

      this.video_array.push({'video':'action_03'});

      this.video_array.push({'video':'action_04'});

      this.video_array.push({'video':'action_05'});





	    	      
		this.init = function(no_fade){



      		this._frame = null

      		//$("#wrapper").append('<a class="navlink"  data-url="index.php"><h1 id="offshorelogo"><span class="hidden">OFFSHORE</span></h1></a>');
      		//$("#scroll-wrapper").append('<a class="navlink"  data-url="index.php"><h1 id="offshorelogo"><span class="hidden">OFFSHORE</span></h1></a>');
	     	
	     	 $(".navlink").click(function(){
	      	that.parentChange('index.php')
		  	}) 
		    
      		$(".breadcrumb").append('<div id="breadbox-container"></div>');

            var insertNav = function(price, change, percent) {
                var breadbox_string = '';
                breadbox_string += '<h1><img src="images/splash_logo_backup.png" alt=""></h1>';
                breadbox_string += '<nav class="left">';
                // breadbox_string += '<ul><li><a href="about.html">About</a></li>';
                // breadbox_string += '<li><a href="blog.html">Blog</a></li>';
                // breadbox_string += '<li><a href="resources.html">Resources</a></li></ul>';
                breadbox_string += '</nav>';

                breadbox_string += '<div class="info"><div class="title"><p>Brent Crude Oil</p><p>USD / Barrel</p></div>';
                breadbox_string += '<div class="price"><p>$' + price + '</p></div>';

                breadbox_string += '<div class="change"><p>' + change + '</p><p>' + percent + '</p></div>';
                

                $('#breadbox-container').html(breadbox_string);
            }
      
      		var hash = parent.window.location.hash

      		var placer = that.divider, temp_icon;

            var futureMonthsCode = ['F','G','H','J','K','L','M','N','Q','U','V','X','Z']

            var d = new Date();
            var m = d.getMonth();
            var y = d.getYear();

            var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20LastTradePriceOnly,ChangeinPercent,Change%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22BZ' + futureMonthsCode[m-1] + '13.NYM%22%29%0A%09%09&format=xml&diagnostics=false&env=http%3A%2F%2Fdatatables.org%2Falltables.env'

            $.ajax({
                type: "GET",
                url: url,
                dataType: "xml",
                success: function(xml){
                    var price = $(xml).find("LastTradePriceOnly").text();
                    var percent = $(xml).find("ChangeinPercent").text();
                    var change = $(xml).find("Change").text();
                    console.log(price);
                    console.log(percent);
                    insertNav(price, change, percent);
                }
            });

            

            
      		/*$(that.url_array).each(function(i,v){
     	 
      			var v_array = v.split("~") 
      	
		      	if(visitedPages.indexOf(v_array[0])!= -1){
		      		temp_icon = '<span>&#9679</span>'; //"images/bc_visit.png";
		      	}else{
		           	temp_icon = '<span>&#9675</span>'; // "images/bc_no_visit.png"; 		
		      	}
		      	if(v_array[0] == hash.substring(1)){
		      		 temp_icon = '<span class="active">&#9679</span>'; //"images/bc_active.png";
		      	}

		      	if(v_array[0]!= "rigmap.php"){
		      	 $("#breadbox-container").append('<div data-url="'+v_array[0]+'" class="breadbox" id="breadbox'+i+'">'+temp_icon+'<br>'+v_array[1]+'</div>');     
		        }else{
		         $("#breadbox-container").append('<div data-url="'+v_array[0]+'" class="breadbox-rigmap" id="breadbox'+i+'">'+temp_icon+'<br>'+v_array[1]+'</div>');     	
		        }

      		

      		});*/
 			


      
      		$(".breadbox").click(function(){
				that.pageChange($(this).data('url'))
		  	}) 
	
	      	$(".breadbox-rigmap").click(function(){
				that.loadMap()
			})

 //document.addEventListener( 'mouseup', actionUp, false );


	}

	// end init

	$('.navlink, .skiptrailer').click(function(){
		var URL = $(this).data('url');
		master.pageChange(URL);
	})

	this.pageChange = function(URL){
    newPageTrigger = false
  	$('#scroll-wrapper').fadeOut(350, function(){
			window.location = URL;
		})
		
	  $('#wrapper').fadeOut(350, function(){
			location = URL;
		})
	}

  
	this.parentChange = function(URL){
			console.log('parentChange')
            newPageTrigger = false
			$('#wrapper').fadeOut(350, function(){
			parent.window.location = URL;
		})
	}

	this.loadMap = function(){
		if(!this._frame){
		  $('#scroll-directions').fadeOut(500)
		 that._frame = '<iframe allowtransparency="true" id="map-container-frame" src="rigmap.php"></iframe>'
		  $('body').append(this._frame)
		 $('.vignette').after(this._frame)
		 $('#map-container-frame').fadeIn(1000)
		}
	}

	this.loadBook = function(_bookUrl){
		if(!this._bookFrame){
		 $('.compass').fadeOut(500)
		 this._bookFrame = '<iframe allowtransparency="true" id="book-container-frame" src="'+ _bookUrl+'"></iframe>'
		 $('body').append(this._bookFrame)
		 $('.breadcrumb').after(this._bookFrame)
		 $('#book-container-frame').fadeIn(500,function(){
			 krpano = document.getElementById("krpanoObject");
			 krpano.call("tween(view.fov, 15.0, 1.0)")
			 parent.audiomaster.mix.setGain(0.1)

		 })


		}
	}


	this.closeMap = function(){
		$('#map-container-frame').fadeOut(1000, function(){
			that._frame = null;
			$('#scroll-directions').fadeIn(500)
			$('.compass').fadeIn(500)
			that._bookFrame = null;
	 	})
	}

	this.closeBook = function(){

		$('#book-container-frame').fadeOut(1000, function(){
			$('.compass').fadeIn(500)
			that._frame = null;
			that._bookFrame = null;
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

	//Audio Functionality

	$('.volume-toggle').click(function(){
		if (mute == true) {
			master.audiocontrol('play');
		} else {
			master.audiocontrol('pause');
		}
		
	})
	
this.overlayPlay = function (el,ogg,mp3){

 	var audioTarget;
	if(isParent){
	  audioTarget = $(el, window.parent.document)
  }else{
    audioTarget = $(el)  	
  }

  if (audioTarget[0].canPlayType('audio/ogg')){
  	audioTarget[0].src = ogg
  } else {
  	audioTarget[0].src = mp3
  }
  
  if(getCookie('muted')!="true"){
  	//console.log("OVERLAY VOLUME: " + audioTarget[0].volume)
  	audioTarget[0].volume = 1.0
	  audioTarget[0].play()
  }
}

 this.videoTrans = function(clip,bgOnly){

 	var transitionDiv = document.createElement("div");
 	
 	transitionDiv.style.width = window.innerWidth  +"px";
	
	transitionDiv.style.height = window.innerHeight +"px";
	
	transitionDiv.style.overflow = "hidden";
	
	transitionDiv.style.position ="fixed"

	//transitionDiv.style.opacity ="0.7"

	transitionDiv.style.zIndex = 5000
	
    transitionDiv.style.top = "0px"

     transitionDiv.style.background = "#000"

    $(transitionDiv).click(function(){master.fadeTransition(transitionDiv)})
  
  	transitionDiv.style.left = "5px"
  	
  	if(!bgOnly){
  		transitionDiv.style.display = "none"
  	}else{
		transitionDiv.style.zIndex = -1
	}
  

   
	
	$('body').append(transitionDiv);
	
	var transitionDivGrid = document.createElement("div");
	
	transitionDivGrid.style.position ="absolute"
 	
 	transitionDivGrid.style.width = "100%";
	
	transitionDivGrid.style.height = "100%";
	
	transitionDivGrid.style.background='url(images/bg_linematrix4x4.gif) repeat'


	var transitionDivVignette = document.createElement("div");
	
 	transitionDivVignette.className = 'vignette'

 	var dynamicWidth = window.innerWidth;
       
    var dynamicHeight = dynamicWidth * .5625;
       
    var dynamicTop = (window.innerHeight - dynamicHeight)/2;
         
	var vid = document.createElement("video");
	
	
	vid.style.position ="absolute"
	
    vid.style.top = dynamicTop + "px"
  
    vid.style.left = "0px"
	
	vid.width = dynamicWidth
	
	vid.height = dynamicHeight
	
	vid.style.display= "block"
	
	
	vid.autoplay = true

	transitionDiv.appendChild(vid);

	vid.volume = 1.0

	transitionDiv.appendChild(transitionDivGrid);
	transitionDiv.appendChild(transitionDivVignette);

	if(bgOnly){
		vid.volume = 0.0
		vid.src= clip
		vid.playbackrate = 0.2;
		vid.loop = "true"
    
	}else{

		if(!getCookie('transition')) setCookie('transition',0)

	    var videoSelector = parseInt(getCookie('transition'))
        if(clip) {
			vid.src= clip + videoType
        }else{
        	vid.src= "video/transitions/" + master.video_array[videoSelector].video + videoType
        }
        

        if(master.video_array[videoSelector].audio){ /// transition audio

        	var _audio = document.createElement("audio");
        	_audio.src = "audio/transitions/" + master.video_array[videoSelector].audio + ".ogg"
        	_audio.volume = 1.0 
        	_audio.play()
        	vid.volume = 0
        	master.audioFadeAll(0.5)
        	_audio.addEventListener("ended", function () {

 				     if (Modernizr.audio) {
			           var ismuted = getCookie('muted');
			         	if (ismuted == 'true') {
			      	    	master.audiocontrol('pause');  
			         	} else {
			      	    	master.audiocontrol('play');
			         	}
			        } 	   



        	})
        	  

        }else{ ///no transition audio
        	vid.volume = 0
        	vid.playbackrate = 0.6;
 				     if (Modernizr.audio) {
			           var ismuted = getCookie('muted');
			         	if (ismuted == 'true') {
			      	    	master.audiocontrol('pause');  
			         	} else {
			      	    	master.audiocontrol('play');
			         	}
			        } 	       	
        }


        
        if(videoSelector < this.video_array.length-1){
        	videoSelector++
        } else{
        	videoSelector = 0
        }

        setCookie('transition',videoSelector)
		 



			


	}
	vid.play();
if(!bgOnly){

///////////FADE LOADED SCENE IN


	vid.addEventListener("timeupdate", function () {
   		
   		var _duration = vid.duration
   		//if(master.video_array[videoSelector-1].edittime) _duration = master.video_array[videoSelector-1].edittime
   		if(vid.currentTime > _duration-2){
   			//console.log(vid.currentTime)

   			master.fadeTransition(transitionDiv)
   		}
  	}, false);
	

	$(transitionDiv).fadeIn(1500)
	}
	return transitionDiv
 }

 this.fadeTransition = function(div){

			$(div).fadeOut(500, function(){
				$('.breadcrumb').fadeIn()
					$('.wrapper').fadeIn(500,function(){


					}

				)


			      	


			})

 }

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

	initAction()

	if (Modernizr.audio) {
		var ismuted = getCookie('muted');
		if (ismuted == 'true') {
			master.audiocontrol('pause');  
		} else {
			master.audiocontrol('play');
		}
	} 	

	if(_isNotPano) $('.wrapper').fadeIn(500)
	$('.breadcrumb').fadeIn()


}

this.ghostTrans = function(_id,numberOfFrames,_isNotPano){

	$(".loadin").hide()

	initAction()

    var dynamicWidth = window.innerWidth;

    var dynamicHeight = dynamicWidth * .5625;

    var dynamicTop = (window.innerHeight - dynamicHeight)/2;

    $('body').append('<canvas id="ghost-canvas-trans" />')

	var ghost = new ghostFunctions(dynamicWidth,dynamicHeight,"ghost-canvas-trans","video/video_clips/" +_id + "/frame-",numberOfFrames)
 
	ghost.imageSequencer()

	if (Modernizr.audio) {
		var ismuted = getCookie('muted');
		if (ismuted == 'true') {
			master.audiocontrol('pause');  
		} else {
			master.audiocontrol('play');
		}
	} 	

	if(_isNotPano) $('.wrapper').fadeIn()
	$('.breadcrumb').fadeIn()


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
			TWEEN.remove(driftTweenSounds); 
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
			TWEEN.remove(driftTweenSounds); 
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
			TWEEN.remove(driftTweenSounds); 
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
	if(isParent){
		
	var parent_audio = $('audio', window.parent.document)
  
	parent_audio.each(function(i,s){
		var audio_obj = parent_audio[i]
        audioFadeIn(audio_obj,0.7)
	})
   }
}

this.audiocontrol = function(act) {
    
	var audio = $('audio');
	
	if(isParent){
		
	var parent_audio = $('audio', window.parent.document)
  
	audio.each(function(i,s){

		var audio_obj = parent_audio[i]
			
		if (Modernizr.audio && audio) {	
 
			if (act == 'play') {
			  
				if (audio_obj && audio_obj.canPlayType('audio/ogg') && $(s).attr('class') !== 'whisper'){
					audio_obj.src= s.children[0].src
				} else {
					//audio_obj.src= s.children[1].src
				}

				if(audio_obj.id !="audio-2"){

				  audio_obj.volume = 0.0;
				  audio_obj.play();
				  audioFadeIn(audio_obj, 1.0)
			  }else{
				  audio_obj.volume = 1.0;
			  }

			  	
				$('.volume-toggle').html('<i class="icon-volume-up"></i>')
				master.remove_mute();
				mute = false;
			} else if (act == 'transition'){
				 
				 if(getCookie('muted')!="true"){
				 	transition_audio[0].volume = .2
          transition_audio[0].play()
         }
          				
				  audioFadeOut(audio_obj,true)
			  //
			} else{
				$('.volume-toggle').html('<i class="icon-volume-off"></i>')
				audioFadeOut(audio_obj)
		  }

		}
	})
	
	}else{
	audio.each(function(i,s){
		 
		if (Modernizr.audio && audio) {			
			if (act == 'play') {
				s.volume = 0.7;
				s.play();
				$('.volume-toggle').html('<i class="icon-volume-off"></i>')
				master.remove_mute();
				mute = false;
			} else {
        audioFadeOut(s)
			}

		}
	})
  }

}

function audioFadeIn(audioElement,targetVolume){

    var vol = 0,
    interval = 100; // 200ms interval
    var intervalID = setInterval(function() {
        if (vol <= targetVolume) {
            vol += 0.05;
            audioElement.volume = vol;
        } else {
            clearInterval(intervalID);
        }
    }, interval);

}




this.audioFadeIn = audioFadeIn

function audioFadeOut(audioElement, istran){

    var vol = audioElement.volume,
    interval =200; // 200ms interval
    var intervalIDs = setInterval(function() {

        if (vol > 0.1) {
            vol -= 0.1;
            audioElement.volume = vol;
        } else {
            clearInterval(intervalIDs);

 				    audioElement.volume = 0.0;
 				    if(!istran){
				    audioElement.pause();
				    master.set_mute();
				    mute = true; 
				  }
        }
    }, interval);

}

this.audioFadeOut = audioFadeOut

function audioFadeOutTo(audioElement, targetVolume){

    var vol = audioElement.volume,
    interval =200; // 200ms interval
    var intervalIDs = setInterval(function() {

        if (vol > targetVolume) {
            vol -= 0.1;
            if(vol > 0)audioElement.volume = vol;
        } else {
            clearInterval(intervalIDs);
        }
    }, interval);

}
this.audioFadeOutTo = audioFadeOutTo
	
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
	var tag = getCookie("muted");
	if (tag==null || tag==""){
		setCookie('muted',true)
	}
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



$(parent).bind('hashchange', function(){ 
	      if (!newPageTrigger) return
          if (parent.location.hash.slice(1) =="") return
            //newPage(parent.location.hash.slice(1))
          newPageTrigger = true
})  



}

// STARTS THE EXPERIENCE

var master = new masterFunctions();

master.init()
master.check_start()




var walkthroughFunctions = function(w,h,canvasid,filePathPre,imageNumber) {

    var scrollerPos = parseInt($( "#scroll-directions" ).css('top'))

    var scrollerPosStart = scrollerPos

    var scrollValue = ( scrollerPosStart - 80) * 5000 / (window.innerHeight - 220)
   
    var mouseWheelTimeout
    var that = this
    that.scrollValue = scrollValue


	$.getScript("js/lib/jquery-ui.min.js", function(data, textStatus, jqxhr) {
		$.getScript("js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
	   		$( "#scroll-directions" ).draggable({ 
	   			axis: "y",
				drag: function() {
					scrollValue =  (parseInt($( "#scroll-directions" ).css('top'))- 80) * 5000 / (window.innerHeight - 220)
					that.scrollValue = scrollValue
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
		                scrollerPos += delta*10
		      			$( "#scroll-directions" ).css('top',scrollerPos)
		      			scrollValue =  (parseInt($( "#scroll-directions" ).css('top'))- 80) * 5000 / (window.innerHeight - 220)
						that.scrollValue = scrollValue
						that.scrollFunction()

						clearTimeout(mouseWheelTimeout)
                		mouseWheelTimeout = null

		                mouseWheelTimeout = setTimeout(function(){
		                that.scrollStopFunction()
		                },500)
		/**/                
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
    var imageSrc, scrollPercent, that = this, scrollPos
    
    scrollPercent = Math.ceil((scrollValue / (5000-$(window).height())) * imageNumber);
    this.scrollPercent = scrollPercent
    
    this.scrollFunction = function(){
      
      scrollPercent = Math.ceil((scrollValue / (5000-$(window).height())) * imageNumber);
    
      if (scrollPercent ==0){scrollPercent = 1}
      
      that.scrollPos = scrollPercent/imageNumber*100
      
      imageSrc = filePathPre + "smsequence/frame-"+zeroes(scrollPercent,4)+".jpg";

      var img = new Image();
			    
			img.src = imageSrc
			   
			img.onload = function(){
	      context.drawImage(img, 0, 0,w,h); 
		  }  	
    }

      imageSrc = filePathPre + "medsequence/frame-0001.jpg";

      var img = new Image();
			    
			img.src = imageSrc
			   
			img.onload = function(){
	      context.drawImage(img, 0, 0,w,h); 
		  }  

    this.scrollStopFunction = function(){
    	
       
      
      if (scrollPercent == 0){scrollPercent = 1}
      
      that.scrollPos = scrollPercent/imageNumber*100
      
     
      
 
      
      imageSrc = filePathPre + "medsequence/frame-"+zeroes(Math.ceil(scrollPercent),4)+".jpg";
        	
      var img = new Image();
			    
      img.src = imageSrc
			   
      img.onload = function(){
      	
        context.drawImage(img, 0, 0,w,h); 
        
      } 
      return(scrollPercent)	
    }	
    		   

              
} /// end walkthrough


var ghostFunctions = function(w,h,canvasid,filePathPre,imageNumber) {
	
  function zeroes(num, length) {
    var str = '' + num;
    while (str.length < length) {
      str = '0' + str;
    } 
    return str;
  }
  var that = this;
  
  var canvas = document.getElementById(canvasid);
  canvas.width  = w
  canvas.height = h;
  var context = canvas.getContext('2d');
  //context.globalCompositeOperation = "source-atop"
  var imageSrc;
  var playHead=1;

  this.imageSequencer = function(){
        
        that.vidplayback = setTimeout(function() {
        
        imageSrc = filePathPre + zeroes(playHead,5)+".png";
        
        var img = new Image();
        
        img.src = imageSrc
              context.clearRect ( 0 , 0 , w , h );
			  //context.scale(1, Math.random()*2);
			  canvas.style.opacity = Math.random()*.4
			  that.playHead = playHead;
			  img.onload = function(){
	        context.drawImage(img, 0, 0,w,h);
	         
	        if(playHead < imageNumber){
        	  playHead++
          } else{
        	  playHead =  1
          }
          requestAnimationFrame(that.imageSequencer);
		    }         
      }, 1000 / 8);
   }//imageSequencer 
   


     
              
} /// end ghost

// Root Functions Passed from XML


	
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

		$(".wrapper").fadeOut(1000, function(){
			console.log("fade to new page")
			master.pageChange(URL);
		})

	}	

}

function panoLoaded(){
	$('.loading').fadeOut(500)
	$(".wrapper").fadeIn(1000,function(){
	$(".pano-underlay").fadeIn(1000)
	$("#ghost-canvas-trans").fadeOut(1000)		
	})	

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
		console.log(_ath)
 		cachedAuth = _ath
		cachedFov = _fov
}

function openBook(_url){
	master.loadBook(_url)
}

function launchVideo(_id){

	$(".video-content-wrap").addClass("video-content-wrap-open");

	$(".video-content-wrap").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
    $(".compass").fadeOut()
    var dynamicWidth = window.innerWidth;
    var dynamicHeight = dynamicWidth * .5625;
    var dynamicTop = (window.innerHeight - dynamicHeight)/2;

        $("#video-overlay").css("top",dynamicTop)
        $("#video-overlay").css("width",window.innerWidth)
        $("#video-overlay").css("height",dynamicHeight)
    	$("#video-overlay").fadeIn(1000)
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

}

function loadUnderWater(_id){
	$("#video-underlay").css("display","none")
	$(".underwater-hanger").fadeOut(1000, function() {
		$("#video-underlay").fadeIn(1000)
	    $('#video-underlay source').attr('src', "video/"+_id + master.videoType);
	    $('#video-underlay video').load();
	    $("#video-underlay")[0].load()
	    $("#video-underlay")[0].play()
	    parent.audiomaster.mix.setGain(0.1)
	})

}

function closeVideo(_id){
	$(".video-content-wrap").unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd")
	master.audioFadeInAll()
	$("#video-overlay").fadeOut(700, function(){
		 $(".compass").fadeIn()
		$("#video-overlay")[0].pause(); // can't hurt
    	krpano = document.getElementById("krpanoObject");
		krpano.call("lookto(0,0,90,smooth(),true,true),js(showMapIcon()))")
		parent.audiomaster.mix.setGain(1.0)
		$(".video-content-wrap").removeClass("video-content-wrap-open");
		}

		)
	
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

///////////////// JQUERY EXTENSION  .




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