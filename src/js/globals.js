var globals = (function(){

  var exports = {};

  exports.pano = '';

  exports.cachedAth = 0;
  exports.cachedFov = 90;

  exports.vr = false; // VR MODE

  exports.isPreloaded = false;

  exports.videoGroups = videoMatrix;


  // URL Arguments
  // ********************************************************

  // look in pano-loader.js, loader.addCompletionListener()
  // for the url arguments which can override these defaults

  exports.config = {
    useLocalResources: true, // look for media locally instead of from the CDN (?local)

    extControlMaster:  false,  // set extcontrol.role to 'master' (?master)
    extControlSlave:   false,  // set extcontrol.role to 'slave'  (?slave)
    extControlUrl:     false,  // set extcontrol node server url  (?url=192.168...)

    autopilot:         false   // use autopilot (?autopilot)
  }

  var search = window.location.search;

  if(search) {
    if(search.substr(0,1) == '?') {
      var searcharray = search.split('?');

      exports.config.useLocalResources = true

      for (var i = searcharray.length - 1; i >= 0; i--) {
        if(searcharray[i] === "local")  exports.config.useLocalResources = true;
        if(searcharray[i] === "master") exports.config.extControlMaster = true;
        if(searcharray[i] === "slave")  exports.config.extControlSlave = true;
        if(searcharray[i] === "autopilot") exports.config.autopilot = true;

        if(searcharray[i].substr(0,3) === "url" ) {
          console.log('setting URL: '+searcharray[i].substr(4));
          exports.config.extControlUrl = searcharray[i].substr(4);
        }
      };
    }
  }



  // CDN URLs
  // ********************************************************

  exports.cdn_imgseq = 'http://8ebf72528a85af39b7bf-e3520fb483eb859425be483d5cc39cf4.r48.cf2.rackcdn.com/'
  exports.cdn_video  = 'http://fe08d365603a52be8002-b68b5b3ce203a95e77baefdb31efdc2e.r46.cf2.rackcdn.com/'
  exports.cdn_audio  = '../audio/'

  if(exports.config.useLocalResources === true) {
    console.log('----- Using local resources -----');
    exports.cdn_imgseq = 'images/ghosts/';
    exports.cdn_video  = '../videos/';
    exports.cdn_audio  = '../audio/'
  }



  // browser detection
  // ********************************************************

  exports.isIOS     = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
  exports.isAndroid = navigator.userAgent.match(/Android/g) ? true : false;
  exports.isFireFox = navigator.userAgent.match(/Firefox/g) ? true : false;
  exports.isMSIE    = navigator.userAgent.match(/MSIE/g) ? true : false;



  // audio/video type
  // ********************************************************

  var videoType = ".webm";
  var audioType = ".ogg";

  var v = document.createElement('video');
  var au = document.createElement('audio');

  if(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '')){
    videoType = '.mp4';
  } else if(v.canPlayType && v.canPlayType('video/webm').replace(/no/, '')){
    videoType = '.webm';
  }
  if(au.canPlayType && au.canPlayType('audio/x-m4a').replace(/no/, '')) { audioType = '.m4a'; }

  if(exports.isMSIE) audioType = '.mp3';
  if(exports.isAndroid) videoType = '_360.webm';

  exports.videoType = videoType;
  exports.audioType = audioType;

  v = null;
  au = null;




  // let's cache some domz
  // ********************************************************

  exports.$panocontainer = $('#panocontainer');
  exports.$wrapper       = $('#wrapper');
  exports.$compass       = $('.compass');
  exports.$videooverlay  = $("#video-overlay");
  exports.$breadcrumb    = $(".breadcrumb");




  /**************************************************************************

    Dynamic Resizing

    - all resizing functionality needs to be triggered inside resizeFunction(),
      in order to function properly on iOS devices

  **************************************************************************/

  exports.resize = {
    videoplayer: null,
    walkthrough: null,
    cover:   {}, // fill screen at all times
    contain: {}, // maintain visibility of entire element
  }

  var resizetimeout;

  exports.debouncedResize = function(){
    if(resizetimeout) clearTimeout(resizetimeout);
    resizetimeout = setTimeout(resizeFunction, 50);
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

    exports.resize.contain.w = Math.round(w)
    exports.resize.contain.h = Math.round(h)
    exports.resize.contain.t = Math.round(t)
    exports.resize.contain.l = Math.round(l)

    /***** COVER *****/
    w = window.innerWidth;
    h = w * ratio;

    if(h < window.innerHeight) {
        h = window.innerHeight;
        w = h / ratio;
    }

    t = (window.innerHeight - h) / 2;
    l = (window.innerWidth - w) / 2;

    exports.resize.cover.w = Math.round(w)
    exports.resize.cover.h = Math.round(h)
    exports.resize.cover.t = Math.round(t)
    exports.resize.cover.l = Math.round(l)


    // Apply ********************************************************

    if(exports.resize.videoplayer) {
      globals.$videooverlay.css({
        'top' : exports.resize.contain.t,
        'left' : exports.resize.contain.l,
        'width' : exports.resize.contain.w,
        'height' : exports.resize.contain.h
      })

      $('.video-content-wrap .controls').css('bottom', exports.resize.contain.t);
    }

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

  $(window).on('resize.global', exports.debouncedResize);
  window.addEventListener('onorientationchange', exports.debouncedResize, false);



  // Cookies ********************************************************

  exports.setCookie = function(c_name,value,exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
  };

  exports.getCookie = function(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++){
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name) {
        return unescape(y);
      }
    }
  };

  exports.deleteCookie = function(name){
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  };

  return exports;
}());
