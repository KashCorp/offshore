var globals = (function(){

  var exports = {};

  exports.pano = '';

  exports.cachedAth = 0;
  exports.cachedFov = 90;

  exports.vr = false; // VR MODE

  exports.isPreloaded = false;

  // Global Config Options

  // look in pano-loader.js, loader.addCompletionListener()
  // for the url arguments which can override these defaults

  exports.config = {
    useLocalResources: false, // look for media locally instead of from the CDN (?local)

    extControlMaster:  false,  // set extcontrol.role to 'master' (?master)
    extControlSlave:   false,  // set extcontrol.role to 'slave'  (?slave)
    extControlUrl:     false,  // set extcontrol node server url  (?url=192.168...)

    autopilot:         false   // use autopilot (?autopilot)
  }

  var search = window.location.search;

  if(search) {
    if(search.substr(0,1) == '?') {
      var searcharray = search.split('?');

      for (var i = searcharray.length - 1; i >= 0; i--) {
        if(searcharray[i] === "local")  globals.config.useLocalResources = true;
        if(searcharray[i] === "master") globals.config.extControlMaster = true;
        if(searcharray[i] === "slave")  globals.config.extControlSlave = true;
        if(searcharray[i] === "autopilot") globals.config.autopilot = true;

        if(searcharray[i].substr(0,3) === "url" ) {
          console.log('setting URL: '+searcharray[i].substr(4));
          globals.config.extControlUrl = searcharray[i].substr(4);
        }
      };
    }
  }

  // CDN URLs
  exports.cdn_imgseq = 'http://8ebf72528a85af39b7bf-e3520fb483eb859425be483d5cc39cf4.r48.cf2.rackcdn.com/'
  exports.cdn_video  = 'http://fe08d365603a52be8002-b68b5b3ce203a95e77baefdb31efdc2e.r46.cf2.rackcdn.com/'
  // this.cdn_panos  = 'http://51feb41d8c5706a8e6e7-4b718bfe00f3e21e7ec454784bd539a2.r98.cf2.rackcdn.com/'

  if(exports.config.useLocalResources === true) {
    console.log('----- Using local resources -----');
    exports.cdn_imgseq = 'images/ghosts/';
    exports.cdn_video  = 'videos/';
  }

  // browser detection
  exports.isIOS     = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
  exports.isAndroid = navigator.userAgent.match(/Android/g) ? true : false;
  exports.isFireFox = navigator.userAgent.match(/Firefox/g) ? true : false;
  exports.isMSIE    = navigator.userAgent.match(/MSIE/g) ? true : false;

  // audio/video type
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
  exports.$panocontainer = $('#panocontainer');
  exports.$wrapper       = $('#wrapper');
  exports.$compass       = $('.compass');
  exports.$videooverlay  = $("#video-overlay");
  exports.$breadcrumb    = $(".breadcrumb");

  return exports;
}());
