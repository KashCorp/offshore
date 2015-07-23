/**************************************************************************

  Pano Functions


  > Sections

    Pano Load Sequence:
      Hash Change
      Load Pano Scene
      (Load Sequence Scene)

    Load Scene Audio

    Krpano Mouse Nav

    Image Sequence Controller

    FrameRunner


**************************************************************************/

var pano = (function(){

  var exports = {};

  exports.krpano = {}; // the krpano instance

  exports.panoWalkthrough;
  exports.walkthroughPlaying = false;

  exports.ghostTransition;
  exports.walkthrough;

  exports.voiceCurrentTime = 0;
  exports.voiceStartTimer  = 0;

  exports.panDirectionsShown = false;

  exports.video_underlay = false;

  exports.noWebAudio = !Modernizr.webaudio;

  exports.visited = (localStorage.getItem('offshoreVisitedPanos')) ? JSON.parse(localStorage.getItem('offshoreVisitedPanos')) : false;


  var scrollPercent = 0;
  var scrollTrigger, sequenceHasWords, linkForward, linkBack;
  var overLayFile, underlayFile, underlayMute, underlayMuted;


  // Init ********************************************************

  exports.init = function init(){
    return new Promise(function(resolve, reject){
      if(!exports.visited){

        console.log("setting localStorage visited pano data for the first time")

        exports.visited = { // this gets cached in localStorage
          platform:      false,
          lowerplatform: false,
          hallway:       false,
          boat:          false,
          controlroom:   false,
          theatre:       false,
          chemicalroom:  false,
          subhangar:     false
        }
        localStorage.setItem('offshoreVisitedPanos',JSON.stringify(exports.visited))

      } else {
        console.log("visited pano data: %o", exports.visited);
      }

      // Build pano
      // ********************************************************

      var targetContainer = "panocontainer";
      var xmlLoc = "./xml/all_panos.xml?nocache="+Math.random()*5;
      var swfLoc = "./js/lib/krpano/krpano.swf";

      embedpano({
        swf:     swfLoc,
        id:     "krpanoObject",
        xml:     xmlLoc,
        wmode:  "transparent",
        target: "panocontainer",
        html5:  "only",
        passQueryParameters:true,

        onready: function(_pano){
          exports.krpano = _pano;
          console.log('[pano] onready');

          router.hashChange();

          // "onloadcomplete" fires when all the pano images have loaded in.
          _pano.set('events.onloadcomplete', function(){
            console.log('[pano] onloadcomplete');
            if(!globals.isPreloaded) preloader();

            globals.$panocontainer.removeClass('hide')
            globals.$panocontainer.css('opacity',1.0)

            resolve();

            $('#video-underlay').show();

          })

          _pano.set('events.onviewchange', function(){
            audiomaster.soundadjust( _pano.get('view.hlookat'), _pano.get('view.fov') );
            _pano.call('action(viewchange)');
          })

          // HACK! overwriting an event from the webvr library
          _pano.set('webvr_onentervr', function(){
            console.log('VR ENTERED');
            globals.vr = true;
            _pano.call('action(webvr_enter)');

            // debug
            $(window).on('keydown', function(e){
              if(e.keyCode === 82){ // r
                _pano.call('plugin[webvr].resetSensor(0)')
              } else if(e.keyCode === 72){ // h
                console.log(_pano.get('view'));
              }
            })
          })
        }
      });

      if(extcontrol) extcontrol.krpanoloaded();
      if(autopilot)  autopilot.krpanoloaded();

      globals.debouncedResize();

      runFrameRunner();
    });
  }






  /**************************************************************************

    ##    ######   #####  ######      ####   ##### ###### ###  ## ######
    ##   ##    ## ##   ## ##   ##    ##     ##     ##     #### ## ##
    ##   ##    ## ####### ##   ##     ####  ##     #####  ## #### #####
    ##   ##    ## ##   ## ##   ##        ## ##     ##     ##  ### ##
    ##### ######  ##   ## ######     #####   ##### ###### ##   ## ######

    > Load Pano Scene

  **************************************************************************/


  exports.loadPanoScene = function(_pano) {
    console.log('load pano "%s"', _pano);

    if(extcontrol) if(extcontrol.role === 'master') {
      extcontrol.hashChange({ "hash": _pano });
    }

    globals.pano = _pano;

    _gaq.push(['_trackPageview', '/'+ _pano]);

    $("#loading").hide();

    globals.$panocontainer.removeClass('hide')

    exports.panoWalkthrough    = null;
    exports.walkthroughPlaying = false;
    exports.video_underlay     = false;

    $('.pan-directions').hide();
    if(exports.panDirectionsShown === false) $('.pan-directions').show();

    // Ghost Functions
    // ********************************************************

    if(exports.ghostTransition) exports.ghostTransition.killGhost();
    if(exports.walkthrough) exports.walkthrough = false;

    $('#ghost-canvas-trans').fadeOut()

    if(!master.overlayOpen) globals.$compass.show()

    setTimeout(function(){

      var canvas = document.getElementById('ghost-canvas-trans');
      var context = canvas.getContext('2d');

      context.clearRect(0, 0,320,180);

      canvas.width = 0;
      canvas.width = 320;

    },1000)

    // calculate a random range for ghosts to appear
    master.ghostMinCoord = Math.floor( Math.random() * 180 )
    master.ghostMaxCoord = master.ghostMinCoord + 100

    $('.scroll-directions').css('top',0);
    $('.panoversion').hide();


    if(Modernizr.webaudio) {
      if(audiomaster && audiomaster.mix.getTrack('overlay_02')){

        master.soundTrigger = null

        audiomaster.mix.getTrack('overlay_02').gain(0.0001)
        audiomaster.mix.removeTrack('overlay_02')
      }
    }

    ///// Decision to divert to image sequence
    if(_pano.indexOf('sequence') !== -1) {

      if(globals.vr){
        exports.krpano.call('loadscene('+_pano+', null, MERGE, BLEND(1));');
        videoSphere.load(_pano);
      } else {
        loadSequenceScene(_pano);
      }

      return false;
    }

    $('#scroll-wrapper').fadeOut();

    // load the scene!
    // ********************************************************
    // exports.krpano.call('action(' + _pano + ');');
    exports.krpano.call('loadscene('+_pano+', null, MERGE, BLEND(1));');
    exports.krpano.set('view.fov','90');
    exports.krpano.set('view.vlookat','0');

    // remove leftover dynamic elements
    $('.dynamic').remove()
    $('.hotspot').attr('class','hotspot')

    // > Switch Pano
    switch(_pano){

      case "prologue" :
        overLayFile = 'HeliPad_minus_minus'
        globals.$compass.hide()
        break;

      case "helicopter" :
        overLayFile = 'Helicopter_Interior'
        break;

      case "platform" :
        exports.visited.platform = true;
        overLayFile = 'ocean_sounds'
        break;

      case "boat" :
        exports.visited.boat = true;
        overLayFile = 'HeliPad_minus_minus'
        underlayFile = 'The_Zone'
        break;

      case "interiorsub-wire" :
        overLayFile = 'Submersible'
        underlayMute=true
        break;

      case "lowerplatform_closed" :
        overLayFile = 'LowerPlatform_minus'
        underlayFile = 'Drone_1_norm'
        break;


      case "lowerplatform" :
        exports.visited.lowerplatform = true;
        overLayFile = 'LowerPlatform_minus'
        underlayFile = 'Drone_1_norm'
        break;

      case "hallway" :
        exports.visited.hallway = true;

        // Big ball of fire voices
        exports.voiceStartTimer = JSON.parse(localStorage.getItem('voiceStartTimer'));
        exports.voiceCurrentTime = JSON.parse(localStorage.getItem('voiceCurrentTime'));
        exports.cachedVoiceTime = exports.voiceCurrentTime;

        if(!exports.voiceStartTime) {

          exports.voiceStartTime = 0
          exports.voiceStartTimer = new Date()
          localStorage.setItem('voiceStartTimer',JSON.stringify(exports.voiceStartTimer))

        } else {

          if(exports.voiceStartTime > 185) exports.voiceStartTime = 0; // restart

          exports.cachedVoiceTime = JSON.parse(localStorage.getItem('voiceCurrentTime'))
          exports.voiceStartTimer = new Date()
        }

        console.log('exports.voiceStartTimer: '+'\t'+exports.voiceStartTimer)
        console.log('exports.voiceCurrentTime: '+'\t'+exports.voiceCurrentTime)

        loadAFXPano('One_Big_Ball_of_Fire', exports.voiceCurrentTime)
        overLayFile  = 'Main_Hallway'
        underlayFile = 'Drone_2_norm'

        globals.$panocontainer.after('<img id = "gradient" class="dynamic" src="images/overlay_gradient_blue_upside_down.png" style="pointer-events:none;bottom:0px; display:block; position: absolute;width:100%;height:40%;opacity:0.7"></div>')

        exports.video_underlay = true;
      break;

      case "subhangar" :
        exports.visited.subhangar = true;

        overLayFile = 'SubRoom'
        underlayFile = 'Drone_3'

        // walkthrough
        $("#walking-canvas-pano").removeClass('hide')
        scrollTrigger = false;
        if(globals.isIOS || globals.isAndroid){
           $('#walking-canvas-pano').css('display','none')

        }
        exports.panoWalkthrough = new Walkthrough("walking-canvas-pano","approaching",3);
        $('.hotspot').addClass('requiem')

        break;

      case "submarine" :
        setTimeout(function(){
          globals.$panocontainer.before('<div class="dynamic underwater-hanger"></div><video autoplay class="dynamic hide fade video-underlay" id="video-underwater" preload="auto"></video>')
        },1000)
        overLayFile = 'Submersible'
        underlayMute=true
        exports.video_underlay = true;
        break;

      case "theater" :
        exports.visited.theatre = true;

        overLayFile = 'Fluorescencent_Tone'
        underlayFile = 'Drone_1_norm'
        break;

      case "theatre" :
        exports.visited.theatre = true;

        overLayFile = 'Fluorescencent_Tone'
        underlayFile = 'Drone_1_norm'
        break;

      case "chemicalroom" :
        exports.visited.chemicalroom = true;

        overLayFile = 'Chemical_Room'
        underlayFile = 'Drone_3_norm'

        // walkthrough
        scrollTrigger = false;
        $("#walking-canvas-pano").removeClass('hide')
        exports.panoWalkthrough = new Walkthrough("walking-canvas-pano","engineroom",15);
        $('.hotspot').addClass('engineroom')

        // exports.panoWalkthrough = new Walkthrough("walking-canvas-pano","engineroom",24.0) // canvasID, name, duration
        break;

      case "controlroom" :
        exports.visited.controlroom = true;

        overLayFile = 'russian_radio'

        exports.video_underlay = true;
        break;
      //
    }


    // cache visited data to localStorage
    localStorage.setItem('offshoreVisitedPanos', JSON.stringify(exports.visited));


    $(window).off('resize.underlay');

    if(exports.video_underlay) {

      $('.video-underlay').css({
        'position':'absolute',
        'width':  globals.resize.cover.w,
        'height': globals.resize.cover.h,
        'left':   globals.resize.cover.l,
        'top':    globals.resize.cover.t
      })

      $(window).on('resize.underlay',function(){
        $('.video-underlay').css({
          'width':  globals.resize.cover.w,
          'height': globals.resize.cover.h,
          'left' :  globals.resize.cover.l,
          'top' :   globals.resize.cover.t
        })
      })
    }

    loadSceneAudio();
  }




  /**************************************************************************

    > Load Sequence Scene

  **************************************************************************/


  var loadSequenceScene = function(_sequence) {

    console.log('loadSequenceScene -- ' + _sequence)

    var name, ghost, ghostFrames, movieLength;

    sequenceHasWords = false;

    // clear word container
    $('#word-container ul').html('')

    globals.$panocontainer.removeClass('show').addClass('hide')

    switch(_sequence){

      case "sequence_passage_chemicalroom" :

        name = 'corridor';
        movieLength = 5;

        ghost = 'hologram_2guys_walk_away 3-frame-';
        ghostFrames = 12

        linkBack = 'hallway'
        linkForward = 'chemicalroom'

        overLayFile = 'Hatch_Alt2'
        break;

      case "sequence_passage_theatre" :

        name = 'corridor';
        movieLength = 5;

        ghost = 'hologram_2guys_walk_away 2-frame-';
        ghostFrames = 12

        linkBack = 'hallway'
        linkForward = 'theatre'

        overLayFile = 'Hatch_Alt2'
        break;


       case "sequence_passage_controlroom" :

        name = 'corridor';
        movieLength = 5;

        ghost = 'hologram_helicopter-frame-';
        ghostFrames = 12

        linkBack = 'hallway'
        linkForward = 'controlroom'

        overLayFile = 'Hatch_Alt2'
        break;

      case "sequence_outside_stairs_down" :

        name = 'downstairs';
        movieLength = 7;

        ghost = 'hologram_walk_up_stairs_2-frame-';
        ghostFrames = 13

        linkBack = 'lowerplatform'
        linkForward = 'boat'
        break;

      case "sequence_shaftway" :

        name = 'hatch';
        movieLength = 5;

        linkBack = 'lowerplatform'
        linkForward = 'hallway'

        sequenceHasWords = true
        if(!master.isMSIE) {
        var wordHTL ='<li class="drilling-depth">1000 ft</li>'
          wordHTL += '<li class="drilling-depth" style="transform: translateZ(-500px); -webkit-transform: translateZ(-500px)">2000 ft</li>'
          wordHTL += '<li class="drilling-depth" style="transform: translateZ(-1000px);-webkit-transform: translateZ(-1000px)">3000 ft</li>'
          wordHTL += '<li class="drilling-depth" style="transform: translateZ(-1500px);-webkit-transform: translateZ(-1500px)">4000 ft</li>'
          wordHTL += '<li class="drilling-depth" style="transform: translateZ(-2500px);-webkit-transform: translateZ(-2500px)">8000 ft<br>DEEPEST WELL<br>EVER DRILLED</li>'

          $('#word-container ul').html(wordHTL)
        }

        overLayFile = 'Hatch_Alt2'
        break;
    }

    if(!master.isMSIE) loadSceneAudio()

    if(ghost) {
      console.log('GHOST')
      exports.ghostTransition = new ghostFunctions("ghost-canvas-trans",ghost,ghostFrames)
      exports.ghostTransition.imageSequencer()
    }

    $('#loading').fadeOut()
    $('#scroll-wrapper').fadeIn()

    $("#scroll-start").click(function(){ newPano(linkBack) });
    $("#scroll-end")  .click(function(){ newPano(linkForward) });

    $("#walking-canvas").css("top", master.globals.contain.t )

    console.log("Start Walkthrough")

    exports.walkthrough = new Walkthrough("walking-canvas", name, movieLength)

    exports.walkthrough.scrollPos   = 0;
    exports.walkthrough.scrollValue = 1;

    scrollTrigger = false;
    scrollPercent = 0;

  }






  /**************************************************************************
  ***************************************************************************

    > Load Scene Audio

  ***************************************************************************
  **************************************************************************/

  var loadSceneAudio = function(_pano)    {

    var multix = 1

    if(Modernizr.webaudio) {
      if(!navigator.userAgent.match(/(Safari)/g) ? true : false){
        multix = .3
      }
    }

    var overlayTrack = audiomaster.mix.getTrack('overlay_01')
    var underlayTrack = audiomaster.mix.getTrack('basetrack')


    if( underlayFile ){

      audiomaster.loadAudio(master.audio_path+underlayFile, 'basetrack2', 0, 0);

      var driftTweenSound = new TWEEN.Tween({ fadeFrom: 1, fadeTo: 0.0001}).to( { fadeFrom: 0, fadeTo:1 * multix}, 3000 )
        .onUpdate( function() {
          if(!underlayMuted) audiomaster.mix.getTrack('basetrack').gain(this.fadeFrom)
          audiomaster.mix.getTrack('basetrack2').gain(this.fadeTo)
        })
        .easing(TWEEN.Easing.Quadratic.Out )
        .onComplete(function() {

          audiomaster.mix.removeTrack('basetrack')

          var renameThis = audiomaster.mix.getTrack('basetrack2')

          renameThis['name'] = 'basetrack';

          audiomaster.mix.lookup['basetrack'] = renameThis


        })

      driftTweenSound.start();

      } else{
        if(underlayMuted){
         var driftTweenSound = new TWEEN.Tween( dummysound ).to( { fadeFrom: 0, fadeTo:1}, 3000 )
          .onUpdate( function() {
           audiomaster.mix.getTrack('basetrack').gain(this.fadeFrom)
           })
           .easing(TWEEN.Easing.Quadratic.Out )
           .start()
        }
      }

      if(underlayMute) {
        var dummysound;

        if(overlayTrack) {
          if(exports.noWebAudio) dummysound = { decayFrom: overlayTrack.options.element.volume};
          else                dummysound = { decayFrom: overlayTrack.options.gainNode.gain.value};
        }


        var driftTweenSound = new TWEEN.Tween( dummysound ).to( { decayFrom: 0}, 3000 )
          .onUpdate( function() {
            master.isTweeningAudio = true
            underlayTrack.gain(this.decayFrom)
          })
          .easing(TWEEN.Easing.Quadratic.Out )
          .start();

        underlayMuted = true


      }


      if( overlayTrack){

        if(exports.noWebAudio) {

          var dummysound = { decayFrom: overlayTrack.options.element.volume};

        } else{

          var dummysound = { decayFrom: overlayTrack.options.gainNode.gain.value};

        }

        var driftTweenSound = new TWEEN.Tween( dummysound ).to( { decayFrom: 0}, 3000 )
          .onUpdate( function() {
            master.isTweeningAudio = true
            overlayTrack.gain(this.decayFrom)
          })
          .easing(TWEEN.Easing.Quadratic.Out )
          .onComplete(function() {
            audiomaster.mix.removeTrack('overlay_01')

            if(overLayFile){
               setTimeout(function(){master.WAAloadAudio(master.audio_path+overLayFile,'overlay_01',-1,1*multix)},1000)
            }
          })
          .start();

      }else{
          if(overLayFile)
              master.WAAloadAudio(master.audio_path+overLayFile,'overlay_01',-1,1*multix);
      }




  }






  /**************************************************************************
  ***************************************************************************


    > krpano mouse nav


  ***************************************************************************
  **************************************************************************/


  var mouse_start_x = 0;
  var mouse_start_y = 0;
  var mouse_start_x_end = 0;
  var mouse_start_y_end = 0;
  var mouse_x_diff = 0;
  var mouse_y_diff = 0;

  var driftTweenH, driftTweenV;

  var panAmount = 0;
  var yawAmount = 0;

  var interactive = null;

  var panX, panY, fov;

  document.addEventListener( 'mousedown', actionDown, false );
  document.addEventListener( 'touchstart', actionDownTouch, false );

  document.addEventListener( 'mousemove', actionMove, false );
  document.addEventListener( 'touchmove', actionMoveTouch, false );

  document.addEventListener( 'mouseup', actionUp, false );
  document.addEventListener( 'touchend', actionUp, false );


  function finishPanX() {
    var dummy = { decayX:    panAmount};
    if(driftTweenH) TWEEN.remove(driftTweenH)
    driftTweenH = new TWEEN.Tween( dummy ).to( { decayX: 0}, 1000 )
      .onUpdate( function() {
        panAmount = this.decayX
      })
      .easing(TWEEN.Easing.Quadratic.Out )
      .start();
  }

  $('#fastpanleft').hover(
    function(){ // mouse in

      if(interactive) return; // don't hover pan if we're already dragging

      if(driftTweenH) TWEEN.remove(driftTweenH)
      panAmount = -0.5

    }, function(){ // mouse out

      finishPanX()
    }
  )

  $('#fastpanright').hover(
    function(){ // mouse in

      if(interactive) return; // don't hover pan if we're already dragging

      if(driftTweenH) TWEEN.remove(driftTweenH)
      panAmount = 0.5

    }, function(){ // mouse out

      finishPanX()

    }
  )

  // $('#fastpanbottom').hover(
  //     function(){
  //         //mouse in
  //         console.log("hover")
  //         if(driftTweenH) TWEEN.remove(driftTweenH)
  //         yawAmount = 0.5
  //     },
  //      function(){
  //         //mouse out
  //         yawAmount = 0

  //     }
  // )

  // $('#fastpantop').hover(
  //     function(){
  //         //mouse in
  //         if(driftTweenH) TWEEN.remove(driftTweenH)
  //         yawAmount = -0.5
  //     },
  //      function(){
  //         //mouse out
  //         yawAmount = 0

  //     }
  // )

  function actionDown( e ) {

    if (!exports.krpano) return

    e.touches = [{clientX: e.clientX, clientY: e.clientY}];
    actionDownTouch(e);

  }

   function actionDownTouch( e ) {

    if (!exports.krpano) return

    master.ghostBuster = true

    mouseMove = 0
    mouse_y_diff = 0;
    mouse_x_diff = 0;
    panAmount = 0;
    yawAmount = 0;

    if(driftTweenH) TWEEN.remove(driftTweenH)
    if(driftTweenV) TWEEN.remove(driftTweenV)

    interactive=true;

    mouse_start_x = e.touches[0].clientX;
    mouse_start_y = e.touches[0].clientY;
    mouse_start_x_end=e.touches[0].clientX;
    mouse_start_y_end=e.touches[0].clientY;

  }




   function actionUp( e ) {

    if (!exports.krpano) return

    interactive = false;

    master.ghostBuster = false

    var dummy =  { decayX: mouse_x_diff};
    var dummyv = { decayY: mouse_y_diff};

    driftTweenH = new TWEEN.Tween( dummy ).to( { decayX: 0}, 1000 )
      .onUpdate( function() {
        var currentX = exports.krpano.get('view.hlookat') - this.decayX
        exports.krpano.set('view.hlookat',currentX)
        mouse_x_diff    = this.decayX*.01;

      })
      .easing(TWEEN.Easing.Quadratic.Out )
      //.onComplete(function() {TWEEN.remove(driftTweenH); driftTweenH = null})
      .start();

    driftTweenV = new TWEEN.Tween( dummyv ).to( {decayY: 0 }, 1000 )
      .onUpdate( function() {
        var currentY = exports.krpano.get('view.vlookat') - this.decayY
        exports.krpano.set('view.vlookat',currentY)
        mouse_y_diff    = this.decayY*.01;

      })
      .easing(TWEEN.Easing.Quadratic.Out )
      //.onComplete(function() {TWEEN.remove(driftTweenV); driftTweenV = null})
      .start();

  }

  function actionMove( e ) {
    e.touches = [{clientX: e.clientX, clientY: e.clientY}];
    actionMoveTouch(e);
  }

  function actionMoveTouch( e ) {

    mouseMove = 0

    if(interactive){
      if(driftTweenH) TWEEN.remove(driftTweenH)
      if(driftTweenV) TWEEN.remove(driftTweenV)
      mouse_start_x = e.touches[0].clientX;
      mouse_start_y = e.touches[0].clientY;
    }
  }













  /**************************************************************************

    > Image Sequence Controller

    - what do we still use this for?

  **************************************************************************/

  var $wordContainer = $('#word-container');

  function scrollerFunction(){

    if(!exports.walkthrough && !exports.walkthroughPlaying) return;

    if(exports.panoWalkthrough) {
      walkthrough = exports.panoWalkthrough;

      // if(walkthrough.autoplay) {
      //     walkthrough.play();
      // }
    }
    else {
      walkthrough = exports.walkthrough;

      // JUST USE SCROLL PERCENT HERE

      if(sequenceHasWords) { // SHAFTWAY

        // approx range: 0-2800px
        var zPos = walkthrough.percent * 3000;
        if(zPos>2800) zPos = 2800;

        $wordContainer.css('-webkit-transform', 'translateZ(' + zPos + 'px)');
        $wordContainer.css('transform', 'translateZ(' + zPos + 'px)');

        // var index = Math.floor(walkthrough.percent * 5);
        // console.log(index)
        // console.log($wordContainer[0].children)
        // $wordContainer[0].children.children[index].style.opacity = 0;
      }


      // if(scrollPercent > 40 && exports.ghostTransition)
      if(walkthrough.percent > 0.4 && exports.ghostTransition)
        master.ghostBuster = false
      else
        master.ghostBuster = true

      if(audiomaster.mix.getTrack('overlay_01') && !master.isTweeningAudio){
          audiomaster.mix.getTrack('overlay_01').pan(1 - walkthrough.percent * 2 )
      }

      if(walkthrough.percent < 0.05) $("#scroll-start").fadeIn(1000)
      else                           $("#scroll-start").fadeOut(700)


      if(walkthrough.percent > 0.95 && !scrollTrigger){

          console.log('end of passage')

          scrollTrigger = true

          // window.cancelAnimationFrame(sequenceAnimFrame)

          walkthrough.scrollPos = 0

          $('#scroll-wrapper').fadeOut(1000, function(){
            newPano(linkForward)
            walkthrough = null
          })

          //$('#panocontainer').addClass('hide')
          return false;

      } else {
        $("#scroll-end").fadeOut(1000)
      }

      if(walkthrough.autoplay) {
        walkthrough.play();
      }
    }


  } // scrollerFunction



  /**************************************************************************

    > FrameRunner

  **************************************************************************/

  var counter = 0; // counter to save hallway voiceover time only once per second

  var runFrameRunner = function(){

    //// console the pano mouse interaction, loadPanoScene turns this on, loadSequence Scene turns this off

    requestAnimationFrame(runFrameRunner);

    if(TWEEN) TWEEN.update()


    // ********************************************************
    // update current time for hallway voiceover

    if(globals.pano === 'hallway' && pano) {

      counter++;

      if(counter == 60) {

        counter = 0;
        pano.voiceCurrentTime = pano.cachedVoiceTime + ( (new Date()-pano.voiceStartTimer) / 1000 )

        // if(extcontrol) {
        //     if(extcontrol.role === 'master') {
        //         if(pano.voiceStartTime<185) extcontrol.fn({ 'fn':'voiceCurrentTime', 'time': pano.voiceCurrentTime })
        //     } else if(extcontrol.role === 'slave') {
        //         pano.voiceCurrentTime = extcontrol.voiceCurrentTime;
        //     }
        // }

        localStorage.setItem('voiceCurrentTime',JSON.stringify(pano.voiceCurrentTime))

      }





    }

    // ********************************************************
    // Audio
    if(audiomaster) {

      if(!globals.isIOS){
        for ( var i = 0, l = audiomaster.mix.tracks.length; i < l; i++ ){
          audiomaster.mix.tracks[i].play()
        }
      }

      if(!globals.getCookie('muted')){
        if (master.overlayOpen) {
          if(audiomaster.mix.getGain() > 0.2){
            audiomaster.mix.setGain(audiomaster.mix.getGain() - 0.02)
          }
        }

        if (!master.overlayOpen) {
          if(audiomaster.mix.getGain() < 1 * master.multix){
            audiomaster.mix.setGain(audiomaster.mix.getGain() + 0.01)
          }
        }
        //master.soundTrigger = false
      } else {
        audiomaster.mix.setGain(0)
      }
    }

    if(window.location.hash.slice(1).indexOf('sequence') != -1){
      scrollerFunction()
      return false
    }

    if(exports.walkthroughPlaying) {
      scrollerFunction()
    }



    // ********************************************************
    // krpano view

    if(exports.krpano) {

      if(panAmount != 0) {
        panX = exports.krpano.get('view.hlookat') + panAmount
        exports.krpano.set('view.hlookat',panX)
      }

      if(yawAmount != 0){
        panY = exports.krpano.get('view.vlookat') + yawAmount //*.3
        exports.krpano.set('view.vlookat',panY)
      }

      // ********************************************************
      // External Control Module

      if(extcontrol) {
        if(extcontrol.role === 'master'){

          extcontrol.sync_data.panX = exports.krpano.get('view.hlookat');
          extcontrol.sync_data.panY = exports.krpano.get('view.vlookat');
          extcontrol.sync_data.fov  = exports.krpano.get('view.fov');

          extcontrol.sync_view();

        } else if(extcontrol.role === 'slave') {

          if(extcontrol.sync_data) {
            exports.krpano.set('view.hlookat', extcontrol.sync_data.panX)
            exports.krpano.set('view.vlookat', extcontrol.sync_data.panY)
            exports.krpano.set('view.fov',extcontrol.sync_data.fov)
          }
        }
      }


    } // /krpano view

    if(interactive){
      mouse_x_diff = (mouse_start_x - mouse_start_x_end)*.002;
      mouse_y_diff = (mouse_start_y - mouse_start_y_end)*.001;
    }

    // view_y += (mouse_y_diff)
    // view_x += (mouse_x_diff*0.01)

  }

  return exports;
}());
