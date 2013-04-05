var masterFunctions = function() {
	var fadeSpeed = 500,
			pagepath = 'http://client.heliozilla.com/OFFSHORE/dev/pages/',
			mute = false,
			that = this;


      this.tag_array = []

      this.tag_array.push('We\'re entering a new kind of danger zone ...');
      
      this.tag_array.push('Extreme Oil?');

      this.tag_array.push('Cowboy Drilling?');

      this.tag_array.push('There are huge untapped reserves of oil and gas beneath the worlds oceans');

      this.tag_array.push('90 billion barrels in the Arctic alone');

      this.tag_array.push('Incredible risk - financial environmental and social'); 

      this.tag_array.push('Not a case of "if" another oil spill occurs but "when"'); 

      this.tag_array.push('Last chapter in the age of petroleum');

      this.tag_array.push('Are all risks acceptable?');

      this.tag_array.push('Trapped in a carbon labyrinth?');

      this.tag_array.push('The last hydrocarbon frontier of the 21st century.');		


      this.stat_array = []

      this.stat_array.push('Global amount spent on offshore drilling operations from 2005-2010: $260 billion');

      this.stat_array.push('Global amount spent on offshore drilling operations from 2010-2014: $387 billion'); 
 
      this.stat_array.push('Number of offshore wells expected to be drilled from 2010-2014: 20000');
      
      this.stat_array.push('Percentage of global oil supplies deriving from offshore in 1995: 28%');
      
      this.stat_array.push('Percentage of global oil supplies deriving from offshore in 2020: 35%');
      
      this.stat_array.push('Number of drilling rigs and platforms in the Gulf of Mexico: 3858');
      
      this.stat_array.push('Number of leases in the Gulf of Mexico sold since the Deepwater Horizon disaster: 454');
      
      this.stat_array.push('Estimated reserves offshore Arctic: 90 billion barrels or 22% of all the worlds remaining oil.');
      
      this.stat_array.push('Estimated reserves offshore Brazil: 12.9  billion barrels.');
      
      this.stat_array.push('Estimated reserves offshore Sakhalin Island Russia: 45 billion barrels');  
      
      this.extreme_array = [];
      this.extreme_array.push('Extreme Oil.');
      this.extreme_array.push('The hunt for oil and gas has always entailed a certain amount of risk but today we\'re entering a new kind of danger zone.');
      this.extreme_array.push('In the rush to exploit hard-to-reach reserves in every far flung corner of the planet,in the Arctic, Alaska and deep offshore');
      this.extreme_array.push('risks multiply, exponentially, and when disasters occur, as they inevitably will, they are sure to prove more devastating than anything we have seen');       
      
	this.init = function(no_fade){
		$('#wrapper').fadeIn(100);
		if(!no_fade){
    $('#inter-text').fadeOut(2550);
    }
		// Change the menu to allow for fade in and out
		$('.primary li a').each(function(index){
			var URL = $(this).attr('href');
			$(this).attr('href', '#').data('url', URL);
		}).click(function(){
			var URL = $(this).data('url');
			master.pageChange(URL);
		})

	}

	$('.navlink, .skiptrailer').click(function(){
		var URL = $(this).data('url');
		master.pageChange(URL);
	})

	this.pageChange = function(URL){
			$('#wrapper').fadeOut(350, function(){
			window.location = URL;
		})
	}

	// Information rotation

	/*this.infoInit = function() {
		var infoSize = $('.info-container > .info-item').size() - 1;
		var delay = 8000;
		var num = 0;
		$('.info-container').fadeIn(fadeSpeed);
		cycle(0);
		function cycle(num) {
			$('.info-item').eq(num).fadeIn(fadeSpeed, function() {
				$(this).delay(delay).fadeOut(fadeSpeed, function(){
					if (num != infoSize) cycle(num+1);
					else $('.info-container').hide();
				});			
			})
		}
	}*/

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
		var krpano = document.getElementById("krpanoObject");
  	if (!krpano || !krpano.get) {
    	return "";
  	}
  	krpano.call('action(initialize)')
	}

	this.showOverlay = function(selector) {
		$('#overlay, ' + selector).fadeIn(1500);
	}

	this.hideOverlay = function() {
		$('#overlay, .inner-overlay').fadeOut(1500);
	}

	//Audio Functionality

	$('.volume-toggle').click(function(){
		var audio = $('audio')[0];
		if (Modernizr.audio && audio) {			
			if (mute) {
				audio.play();
				$(this).html('<i class="icon-volume-up"></i>')
				mute = false;
			} else {
				audio.pause();
				$(this).html('<i class="icon-volume-off"></i>')
				mute = true;
			}

		}
	})
	
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

function delete_cookie(name){
	document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
}

this.get_tag = function() {
    var tag=getCookie("offshore_tag");
    var return_value = that.tag_array[0]
    if (tag==null || tag==""){

        that.tag_array.sort(function(){ return Math.random()-0.5; });
        return_value =  that.tag_array.pop();
        setCookie("offshore_tag",that.tag_array.join(',') ,365);

    }else{

        var a = tag.split(",")
        return_value =  a.pop();
        setCookie("offshore_tag",a.join(',') ,365);

  }
  //console.log(return_value)
  return return_value
}

this.get_stat = function() {
    var tag=getCookie("offshore_stat");
    var return_value = that.stat_array[0]
    if (tag==null || tag==""){

        that.stat_array.sort(function(){ return Math.random()-0.5; });
        return_value =  that.stat_array.pop();
        setCookie("offshore_stat",that.stat_array.join(',') ,365);

    }else{

        var a = tag.split(",")
        return_value =  a.pop();
        setCookie("offshore_stat",a.join(',') ,365);

  }
  //console.log(return_value)
  return return_value
}


this.check_start = function(){
	  var tag=getCookie("seen_frontpage");
    if (tag==null || tag==""){
    	$('body.platform').find('#overlay').delay(2000).fadeIn(500);
    	setCookie("seen_frontpage",true);
    } else {
    	var t = setTimeout(initAction, 2000);
    }
}

this.remove_start = function(){
	  
    	delete_cookie("seen_frontpage");

}

}



var master = new masterFunctions();

// Passed from XML

function newPage(URL) {
	master.pageChange(URL);
}

function showCS(selector) {
	pano.set("autorotate.enabled", true);
	master.showOverlay(selector)
}


(function($){
		
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
			
			
			if(options.text) {
				str = options.text.split('');
			}
			else {
				if(options.stats) {
				str = master.get_stat().split('');
			  }else{
			  str = master.get_tag().split('');	
			  }
			}
			
			// The types array holds the type for each character;
			// Letters holds the positions of non-space characters;
			
			var types = [],
				letters = [];

			// Looping through all the chars of the string
			
			for(var i=0;i<str.length;i++){
				
				var ch = str[i];
				
				if(ch == " "){
					types[i] = "space";
					continue;
				}
				else if(/[a-z]/.test(ch)){
					types[i] = "lowerLetter";
				}
				else if(/[A-Z]/.test(ch)){
					types[i] = "upperLetter";
				}
				else {
					types[i] = "symbol";
				}
				
				letters.push(i);
			}
			
			el.html("");			

			// Self executing named function expression:
			
			(function shuffle(start){
			
				// This code is run options.fps times per second
				// and updates the contents of the page element
					
				var i,
					len = letters.length, 
					strCopy = str.slice(0);	// Fresh copy of the string
					
				if(start>len){
					
					// The animation is complete. Updating the
					// flag and triggering the callback;
					
					el.data('animated',false);
					if(options.loop){
						setTimeout(function() {  
           $('#inter-text' ).shuffleLetters({
      	    "loop": true,
      	    "stats": true
          });	
          }, 2000);
						
					}else{
						master.init()
						master.check_start()
						
				  }
					options.callback(el);
					return;
				}
				
				// All the work gets done here
				for(i=Math.max(start,0); i < len; i++){

					// The start argument and options.step limit
					// the characters we will be working on at once
					
					if( i < start+options.step){
						// Generate a random character at thsi position
						strCopy[letters[i]] = randomChar(types[letters[i]]);
					}
					else {
						strCopy[letters[i]] = "";
					}
				}
				
				el.text(strCopy.join(""));
				
				setTimeout(function(){
					
					shuffle(start+1);
					
				},1000/options.fps);
				
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