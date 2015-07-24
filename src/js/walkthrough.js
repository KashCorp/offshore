// ##    ##  #####  ##    ##  ## ###### ##   ## #####   ######  ##   ##  #####   ##   ##
// ##    ## ##   ## ##    ## ##    ##   ##   ## ##  ## ##    ## ##   ## ##       ##   ##
// ## ## ## ####### ##    ####     ##   ####### #####  ##    ## ##   ## ##  ###  #######
// ## ## ## ##   ## ##    ## ##    ##   ##   ## ##  ## ##    ## ##   ## ##   ##  ##   ##
//  ##  ##  ##   ## ##### ##  ##   ##   ##   ## ##  ##  ######   #####   #####   ##   ##

var Walkthrough = function(canvasID, name, videoLength) {

  var that = this;
  var w = globals.resize.cover.w;
  var h = globals.resize.cover.h;
  var that = this;

  var mouseWheelTimeout;

  var scrollerPos = parseInt($( ".scroll-directions" ).css('top'));
  var scrollerPosStart = 0;
  var playSpeed = 1/(videoLength*60); // in frames!

  this.percent = 0 // MASTER VARIABLE (everything runs off this)
  this.maxScrollerPos = $('.scroll-directions-container').height()

  // Load Video  ********************************************************

  var video = document.getElementById(canvasID)
  if(globals.isIOS || globals.isAndroid) video.controls = true

  video.autoplay = false;
  video.src = globals.cdn_video + 'transition-' + name + globals.videoType;
  video.load();

  video.width  = w;
  video.height = h;
  document.getElementById(canvasID).style.width = w + 'px'
  document.getElementById(canvasID).style.height = h + 'px'

  // video.addEventListener('canplay', function(e) {
  //   e.stopPropagation()
  // })

  video.addEventListener('timeupdate', function(e) {

    e.stopPropagation()

    that.percent = video.currentTime / video.duration

    if(that.percent > 0.9 && !master.overlayOpen){
      that.autoplay = false;
      $('.scroll-directions').fadeOut()
      if(globals.pano === 'chemicalroom') videoPlayer("engineroom");
      if(globals.pano === 'subhangar')    videoPlayer("subhangar");
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
  if(globals.pano === 'chemicalroom' || globals.pano === 'subhangar') walkthroughvideo = true;
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

    pano.krpano.call("lookto("+globals.cachedAth+",0,"+globals.cachedFov+",smooth(),true,true),js(xml.showMapIcon();))")

  }

  // Auto Resize ********************************************************

  this.resize = function(){
    that.maxScrollerPos = window.innerHeight - 300

    scrollValue = scrollerPosStart  * 5000 / (window.innerHeight - 220);

    $(video).css({
      'width':  globals.resize.cover.w,
      'height': globals.resize.cover.h,
      'top':    globals.resize.cover.t,
      'left':   globals.resize.cover.l
    })
  }

  globals.debouncedResize();



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

    if(video.readyState < 3) return;

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
