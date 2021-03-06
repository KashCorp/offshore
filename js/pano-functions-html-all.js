/**************************************************************************

  Pano Functions


  Sections

    Pano Load Sequence:
      Hash Change
      Load Pano Scene
      (Load Sequence Scene)

    Load Video Matrix

    Load Audio

    Krpano Mouse Nav

    Image Sequence Controller

    FrameRunner



  Objects

    pano = new pano_master()



**************************************************************************/



var globalPano;

var krpanoIsReady = false

function krpanoReady() {
  if(krpanoIsReady) return
  krpanoIsReady = true;
  if (parent.location.hash.slice(1) == "")
    pano.loadPanoScene('prologue')
  else
    pano.loadPanoScene(parent.location.hash.slice(1))
}



function loadAFXPano(_file, _start){
  if(!_start) _start = 0
  master.AFXloadAudio( master.audio_path + _file + master.audioType,'overlay_02',0,1.0, _start)
}


var pano_master = function(){

  var that = this;

  this.panoWalkthrough;
  this.walkthroughPlaying = false;

  this.ghostTransition;
  this.walkthrough;

  this.voiceCurrentTime = 0
  this.voiceStartTimer = 0

  this.panDirectionsShown = false;

  this.video_underlay = false;

  that.noWebAudio = !Modernizr.webaudio

  this.visited = JSON.parse(localStorage.getItem('offshoreVisitedPanos'));

  if(!this.visited){
    this.visited = { // this gets cached in localStorage
      platform:      false,
      lowerplatform: false,
      hallway:       false,
      boat:          false,
      controlroom:   false,
      theatre:       false,
      chemicalroom:  false,
      subhangar:     false
    }
    localStorage.setItem('offshoreVisitedPanos', JSON.stringify(this.visited))
  }

  var scrollTrigger,
      scrollPercent=0,
      sequenceHasWords,
      linkForward,
      linkBack;

  var overLayFile, underlayFile, underlayMute, underlayMuted

  if(parent.location.hash.slice(1)) globalPano = parent.location.hash.slice(1)

   panoXMLFile = './xml/all_panos.xml?nocache='+Math.random()*5

  //Defualt to start if no has'h
  if(!parent.location.hash.slice(1)) globalPano = "prologue";

  // Build pano

  var masterPath = ".",
    targetContainer = "panocontainer",
    xmlLoc = masterPath + "/xml/all_panos.xml?nocache="+Math.random()*5,
    swfLoc = masterPath + "/js/lib/krpano/krpano.swf"

    embedpano({swf:swfLoc,  id:"krpanoObject", xml:xmlLoc, wmode: "transparent", target:"panocontainer", html5:"auto", passQueryParameters:true});

  krpano = document.getElementById("krpanoObject");

  master.debouncedResize();






  /**************************************************************************

    New pano load logic sequence:

    1. hash change event listener
    2. loadPanoScene
    3. if image sequence - diverts to LoadSequenceScene


  **************************************************************************/



  /**************************************************************************

    > Hash Change

  **************************************************************************/


  $(parent).bind('hashchange', function(){
    if(master.globalPano === parent.location.hash.slice(1)) return false;

    if (parent.location.hash.slice(1) =="") {
      that.loadPanoScene('prologue')
      return false;
    }

    $("#walking-canvas-pano").addClass('hide')
    that.loadPanoScene(parent.location.hash.slice(1))
  })

  // coming in from a deeplink
  var deeplinkfunction = function(){
    window.clearTimeout(deeplinktimeout)
    krpano = document.getElementById("krpanoObject");

    deeplinktimeout = window.setTimeout(function(){

      // make sure krpano has had a chance to load
      if(krpano) {
        if (parent.location.hash.slice(1) =="")
          that.loadPanoScene('prologue')
        else
          that.loadPanoScene(parent.location.hash.slice(1))

        window.clearTimeout(deeplinktimeout)
        return false;

      } else {
        deeplinkfunction()
      }

     },1000)
  }


  /**************************************************************************

    > Load Pano Scene

  **************************************************************************/


  this.loadPanoScene = function(_pano) {
    console.log('loadPanoScene');
    _gaq.push(['_trackPageview', '/'+ _pano])

    $("#loading").hide();
    $('.oil-shot-bg').hide();

    $wrapper.removeClass('hide');
    $panocontainer.removeClass('hide');

    that.panoWalkthrough = null;
    that.video_underlay = false;

    $('.pan-directions').hide();
    if(that.panDirectionsShown === false) $('.pan-directions').show();

    if(!master.overlayOpen) $compass.show()

    // Clear out old ghosts
    if(that.ghostTransition) that.ghostTransition.killGhost();
    if(that.walkthrough) that.walkthrough = false;
    $('#ghost-canvas-trans').fadeOut();
    setTimeout(function(){
      var canvas = document.getElementById('ghost-canvas-trans');
      var context = canvas.getContext('2d');
      context.clearRect(0, 0,320,180);
      canvas.width = 0
      canvas.width = 320
    },1000)

    // calculate a random range for new ghosts to appear
    master.ghostMinCoord = Math.floor( Math.random() * 180 )
    master.ghostMaxCoord = master.ghostMinCoord + 100

    master.globalPano = _pano

    $('.scroll-directions').css('top',0)

    $('.panoversion').css('display','none')

    if(Modernizr.webaudio) {
      if(parent.audiomaster.mix.getTrack('overlay_02')){
        master.soundTrigger = null
        parent.audiomaster.mix.getTrack('overlay_02').gain(0.0001)
        parent.audiomaster.mix.removeTrack('overlay_02')
      }
      parent.audiomaster.mix.playing = true;
    }


    ////////// Decision to divert to image sequence //////////

    if(_pano.indexOf('sequence')!=-1) {
      loadSequenceScene(_pano);
      return false;
    }

    $('#scroll-wrapper').fadeOut();


    krpano = document.getElementById("krpanoObject");

    // XXXXX
    // the null loading bug is triggered by this krpano action:
    krpano.call('action(' + _pano + ')')
    // XXXXX

    krpano.set('view.fov','90');
    krpano.set('view.vlookat','0');

    // remove leftover dynamic elements
    $('.dynamic').remove()
    $('.hotspot').attr('class','hotspot')

    // > Switch Pano
    switch(_pano){

      case "prologue" :
        overLayFile = 'HeliPad_minus_minus' + master.audioType
        $compass.hide()
      break;

      case "helicopter" :
        overLayFile = 'Helicopter_Interior' + master.audioType
      break;

      case "platform" :
        that.visited.platform = true;
        overLayFile = 'ocean_sounds' + master.audioType
      break;

      case "boat" :
        that.visited.boat = true;
        overLayFile = 'HeliPad_minus_minus' + master.audioType
        underlayFile = 'The_Zone' + master.audioType
      break;

      case "interiorsub-wire" :
        overLayFile = 'Submersible' + master.audioType
        underlayMute=true
      break;

      case "lowerplatform_closed" :
        overLayFile = 'LowerPlatform_minus' + master.audioType
        underlayFile = 'Drone_1_norm' + master.audioType
      break;


      case "lowerplatform" :
        that.visited.lowerplatform = true;
        overLayFile = 'LowerPlatform_minus' + master.audioType
        underlayFile = 'Drone_1_norm' + master.audioType
      break;

      case "hallway" :
        that.visited.hallway = true;

        $('.oil-shot-bg').css('display','block')


        // Big ball of fire voices
        that.voiceStartTimer = JSON.parse(localStorage.getItem('voiceStartTimer'));
        that.voiceCurrentTime = JSON.parse(localStorage.getItem('voiceCurrentTime'));
        that.cachedVoiceTime = that.voiceCurrentTime;

        if(!that.voiceStartTime) {

          that.voiceStartTime = 0
          that.voiceStartTimer = new Date()
          localStorage.setItem('voiceStartTimer',JSON.stringify(that.voiceStartTimer))

        } else {
          if(that.voiceStartTime > 185) that.voiceStartTime = 0; // restart

          that.cachedVoiceTime = JSON.parse(localStorage.getItem('voiceCurrentTime'))
          that.voiceStartTimer = new Date()
        }

        // console.log('that.voiceStartTimer: '+'\t'+that.voiceStartTimer)
        // console.log('that.voiceStartTimer: '+'\t'+ that.voiceCurrentTime)

        loadAFXPano('One_Big_Ball_of_Fire', that.voiceCurrentTime)
        overLayFile = 'Main_Hallway' + master.audioType
        underlayFile = 'Drone_2_norm' + master.audioType

        $panocontainer.after('<img id = "gradient" class="dynamic" src="images/overlay_gradient_blue_upside_down.png" style="pointer-events:none;bottom:0px; display:block; position: absolute;width:100%;height:40%;opacity:0.7"></div>')

        //$panocontainer.before('<div class="dynamic pano-underlay"><video width="100%" height="100%" autoplay loop="true" style="position:absolute; display:none" class="video-underlay" id="video-underlay" preload="auto"><source src="video/transitions/oil_shot.webm" type="video/webm" /><source src="video/transitions/oil_shot.mov" type="video/mov" /></video> </div>')
        that.video_underlay = true;
      break;

      case "subhangar" :
        that.visited.subhangar = true;

        overLayFile = 'SubRoom' + master.audioType
        underlayFile = 'Drone_3' + master.audioType

        // walkthrough
        $("#walking-canvas-pano").removeClass('hide')
        var scrollTrigger=false;
        if(master.isIOS || master.isAndroid){
           $('#walking-canvas-pano').css('display','none')

        }
        that.panoWalkthrough = new Walkthrough("walking-canvas-pano","approaching",3);
        $('.hotspot').addClass('requiem')

      break;

      case "submarine" :
        setTimeout(function(){
          $panocontainer.before('<div class="dynamic underwater-hanger"></div><video width="100%" autoplay class="dynamic hide fade video-underlay" id="video-underwater" preload="auto"></video>')
        },1000)
        overLayFile = 'Submersible' + master.audioType
        underlayMute=true
        that.video_underlay = true;
      break;

      case "theater" :
        that.visited.theatre = true;

        overLayFile = 'Fluorescencent_Tone' + master.audioType
        underlayFile = 'Drone_1_norm' + master.audioType
      break;

      case "theatre" :
        that.visited.theatre = true;

        overLayFile = 'Fluorescencent_Tone' + master.audioType
        underlayFile = 'Drone_1_norm' + master.audioType
      break;

      case "chemicalroom" :
        that.visited.chemicalroom = true;

        overLayFile = 'Chemical_Room' + master.audioType
        underlayFile = 'Drone_3_norm' + master.audioType

        // walkthrough
        var scrollTrigger=false;
        $("#walking-canvas-pano").removeClass('hide')
        that.panoWalkthrough = new Walkthrough("walking-canvas-pano","engineroom",15);
        $('.hotspot').addClass('engineroom')

        // that.panoWalkthrough = new Walkthrough("walking-canvas-pano","engineroom",24.0) // canvasID, name, duration
      break;

      case "controlroom" :
        that.visited.controlroom = true;

        $('.oil-shot-bg').css('display','block')

        overLayFile = 'russian_radio' + master.audioType

        //$panocontainer.before('<div class="dynamic" class="pano-underlay"><video width="100%" height="100%" autoplay loop="true" style="position:absolute;" class="video-underlay" id="video-underlay" preload="auto"><source src="video/transitions/oil_shot.webm" type="video/webm" /><source src="video/transitions/oil_shot.mov" type="video/mov" /></video> </div>')
        that.video_underlay = true;
      break;
      //
    }

    // cache visited data to localStorage
    localStorage.setItem('offshoreVisitedPanos',JSON.stringify(that.visited))

    $(window).off('resize.underlay')

    if(that.video_underlay) {

      $('.video-underlay').css({
        'position':'absolute',
        'width':  master.globals.cover.w,
        'height': master.globals.cover.h,
        'left':   master.globals.cover.l,
        'top':    master.globals.cover.t
      })

      $(window).on('resize.underlay',function(){
        $('.video-underlay').css({
          'width':  master.globals.cover.w,
          'height': master.globals.cover.h,
          'left' :  master.globals.cover.l,
          'top' :   master.globals.cover.t
        })
      })
    }

    that.loadSceneAudio()
  }




  /**************************************************************************

    > Load Sequence Scene

  **************************************************************************/


  function loadSequenceScene(_sequence) {

    sequenceHasWords = false;

    //cancelAnimationFrame(runFrameRunner)

    var ImageSequenceFiles,
      ImageSequenceFrames,
      ghost,
      ghostFrames,
      movieLength;

    // clear word container
    $('#word-container ul').html('')

    $wrapper.addClass('hide')
    $panocontainer.removeClass('show').addClass('hide')

    // > Switch Sequence
    switch(_sequence){

      case "sequence_passage_chemicalroom" :
        ImageSequenceFiles = 'corridor';
        movieLength = 5;
        ImageSequenceFrames = 65;
        ghost = 'hologram_2guys_walk_away 3-frame-';
        ghostFrames = 12
        linkBack = 'hallway'
        linkForward = 'chemicalroom'
        overLayFile = 'Hatch_Alt2' + master.audioType
        //underlayMute=true
      break;

      case "sequence_passage_theatre" :
        ImageSequenceFiles = 'corridor';
        movieLength = 5;
        ImageSequenceFrames = 65;
        ghost = 'hologram_2guys_walk_away 2-frame-';
        ghostFrames = 12
        linkBack = 'hallway'
        linkForward = 'theatre'
        overLayFile = 'Hatch_Alt2' + master.audioType
        //underlayMute=true
      break;


       case "sequence_passage_controlroom" :
        ImageSequenceFiles = 'corridor';
        movieMode = true;
        movieLength = 5;
        ImageSequenceFrames = 65;
        ghost = 'hologram_helicopter-frame-';
        ghostFrames = 12
        linkBack = 'hallway'
        linkForward = 'controlroom'
        overLayFile = 'Hatch_Alt2' + master.audioType
        //underlayMute=true

      break;

      case "sequence_outside_stairs_down" :
        ImageSequenceFiles = 'downstairs';
        movieLength = 7;
        ImageSequenceFrames = 241;
        ghost = 'hologram_walk_up_stairs_2-frame-';
        ghostFrames = 13
        linkBack = 'lowerplatform'
        linkForward = 'boat'

      break;

      case "sequence_shaftway" :

        ImageSequenceFiles = 'hatch';
        ImageSequenceFrames = 65;
        linkBack = 'lowerplatform'
        linkForward = 'hallway'
        movieLength = 5;



        sequenceHasWords = true
        if(!master.isMSIE) {
        var wordHTL ='<li class="drilling-depth">1000 ft</li>'
          wordHTL += '<li class="drilling-depth" style="transform: translateZ(-500px); -webkit-transform: translateZ(-500px)">2000 ft</li>'
          wordHTL += '<li class="drilling-depth" style="transform: translateZ(-1000px);-webkit-transform: translateZ(-1000px)">3000 ft</li>'
          wordHTL += '<li class="drilling-depth" style="transform: translateZ(-1500px);-webkit-transform: translateZ(-1500px)">4000 ft</li>'
          wordHTL += '<li class="drilling-depth" style="transform: translateZ(-2500px);-webkit-transform: translateZ(-2500px)">8000 ft<br>DEEPEST WELL<br>EVER DRILLED</li>'

          $('#word-container ul').html(wordHTL)
        }



        overLayFile = 'Hatch_Alt2' + master.audioType
        //underlayMute=true
      break;

    }

    if(!master.isMSIE) that.loadSceneAudio()

    if(ghost) {
      that.ghostTransition = new ghostFunctions("ghost-canvas-trans",ghost,ghostFrames)
      that.ghostTransition.imageSequencer()
    }

    //$wrapper.addClass('hide')
    //$wrapper.hide()

    $('#loading').fadeOut()

    $('#scroll-wrapper').fadeIn()

    $("#scroll-start").click(function(){ newPano(linkBack) });
    $("#scroll-end")  .click(function(){ newPano(linkForward) });

    $("#walking-canvas").css("top", master.globals.contain.t )


    // that.walkthrough = new walkthroughFunctions("walking-canvas",ImageSequenceFiles,ImageSequenceFrames)
    // that.walkthrough.preload()

    that.walkthrough = new Walkthrough("walking-canvas",ImageSequenceFiles,movieLength)

    that.walkthrough.scrollPos = 0;
    that.walkthrough.scrollValue = 1;

    scrollTrigger = false;
    scrollPercent=0;



    //parent.audiomaster.mix.getTrack('overlay_01').pan(1)


    //scrollerFunction()

  }






  /**************************************************************************

    > Load Video Matrix

  **************************************************************************/



  $.ajax({
    url: 'js/videoMatrix.json',
    success: function(data){
      // master.movieMenu = data.children

      // build all possible menus - videoPlayer() function picks the one it needs
      $.each(data.children, function(group_i,group){
        $('#video-overlay').after('<div class="movie-menu hide '+group.group+'" />')

        $.each(group.movies,function(movie_i,movie){
          $('.movie-menu.'+group.group).append('<div data-file="' + movie.file + '" class="movie-menu-item">' + movie.title + '</div>')
        })
      })

      $('.movie-menu-item').click(function(){
        switchVideo($(this).data('file'),$(this).text())
      })
      $('.movie-menu').append('<div class="viewedContentDiv movie-menu-item">Viewed Content</div>')
      $('#video-overlay').after('<div class="loading" id="movieloading"></div>');
    },
    error : function(request,error) {
      console.log(error)
    }
  });






  //$('.wrapper').append("<div class='pan-directions'/>")


  /**************************************************************************

    > Load Audio

  **************************************************************************/


  this.loadSceneAudio = function(_pano)    {

    var multix = 1

    if(Modernizr.webaudio) {
      if(!navigator.userAgent.match(/(Safari)/g) ? true : false){
        multix = .3
      }
    }

    var overlayTrack = parent.audiomaster.mix.getTrack('overlay_01')
    var underlayTrack = parent.audiomaster.mix.getTrack('basetrack')

    if( underlayFile){

      var underlaysound

      underlaysound = { fadeFrom: 1, fadeTo: 0.0001};

      parent.audiomaster.loadAudio(master.audio_path+underlayFile,'basetrack2',0,0)

      var driftTweenSound = new TWEEN.Tween( underlaysound )
        .to( { fadeFrom: 0, fadeTo:1 * multix}, 3000 )
        .onUpdate( function() {
          if(!underlayMuted) parent.audiomaster.mix.getTrack('basetrack').gain(this.fadeFrom)
          parent.audiomaster.mix.getTrack('basetrack2').gain(this.fadeTo)
        })
        .easing(TWEEN.Easing.Quadratic.Out )
        .onComplete(function() {
          parent.audiomaster.mix.removeTrack('basetrack')
          var renameThis = parent.audiomaster.mix.getTrack('basetrack2')
          renameThis['name'] = 'basetrack';
          parent.audiomaster.mix.lookup['basetrack'] = renameThis
        })
        .start();

      } else {

        if(underlayMuted){
         var driftTweenSound = new TWEEN.Tween( underlaysound )
           .to( { fadeFrom: 0, fadeTo:1}, 3000 )
           .onUpdate( function() {
              parent.audiomaster.mix.getTrack('basetrack').gain(this.fadeFrom)
            })
           .easing(TWEEN.Easing.Quadratic.Out )
           .start()
        }
      }

      if(underlayMute) {
        var underlaysound

        if(that.noWebAudio) {
          underlaysound = { decayFrom: overlayTrack.options.element.volume};
        } else {
          underlaysound = { decayFrom: overlayTrack.options.gainNode.gain.value};
        }

        var driftTweenSound = new TWEEN.Tween( underlaysound ).to( { decayFrom: 0}, 3000 )
          .onUpdate( function() {
            master.isTweeningAudio = true
            underlayTrack.gain(this.decayFrom)
          })
          .easing(TWEEN.Easing.Quadratic.Out )
          .start();

        underlayMuted = true

      }


      if( overlayTrack){

        var overlaysound
        if(that.noWebAudio) {
          overlaysound = { decayFrom: overlayTrack.options.element.volume };
        } else {
          overlaysound = { decayFrom: overlayTrack.options.gainNode.gain.value};
        }

        var driftTweenSound = new TWEEN.Tween( overlaysound ).to( { decayFrom: 0}, 3000 )
          .onUpdate( function() {
            master.isTweeningAudio = true
            overlayTrack.gain(this.decayFrom)
          })
          .easing(TWEEN.Easing.Quadratic.Out )
          .onComplete(function() {
            parent.audiomaster.mix.removeTrack('overlay_01')

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

    > krpano mouse nav

  **************************************************************************/


  $panocontainer.after('<div class="fastpan" id="fastpanleft"/><div class="fastpan" id="fastpanright"/>')

  var mouse_start_x = 0,
      mouse_start_y = 0,
      mouse_start_x_end= 0,
      mouse_start_y_end = 0,
      mouse_x_diff = 0,
      mouse_y_diff = 0,
      driftTweenH, driftTweenV,
      panAmount = 0, yawAmount = 0,
      interactive = null,
      view_x=0,view_y=0,
      krpano,panX,panY

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
    function(){
      //mouse in
      if(driftTweenH) TWEEN.remove(driftTweenH)
      panAmount = -0.5
    },
     function(){
      //mouse out
     finishPanX()

    }
  )

  $('#fastpanright').hover(
    function(){
      //mouse in
      if(driftTweenH) TWEEN.remove(driftTweenH)
      panAmount = 0.5
    },
     function(){
      //mouse out
      finishPanX()

    }
  )

  $('#fastpanbottom').hover(
    function(){
      //mouse in
      if(driftTweenH) TWEEN.remove(driftTweenH)
      yawAmount = 0.5
    },
     function(){
      //mouse out
      yawAmount = 0

    }
  )

  $('#fastpantop').hover(
    function(){
      //mouse in
      if(driftTweenH) TWEEN.remove(driftTweenH)
      yawAmount = -0.5
    },
     function(){
      //mouse out
      yawAmount = 0

    }
  )

  function actionDown( e ) {

    e.touches = [{clientX: e.clientX, clientY: e.clientY}];
    actionDownTouch(e);

  }

   function actionDownTouch( e ) {

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

    if (!krpano) return

    interactive = false;

    master.ghostBuster = false

    var dummy = { decayX:    mouse_x_diff};
    var dummyv = { decayY:    mouse_y_diff};



    driftTweenH = new TWEEN.Tween( dummy ).to( { decayX: 0}, 1000 )
      .onUpdate( function() {
        var currentX = krpano.get('view.hlookat') - this.decayX
        krpano.set('view.hlookat',currentX)
        mouse_x_diff    = this.decayX*.01;

      })
      .easing(TWEEN.Easing.Quadratic.Out )
      //.onComplete(function() {TWEEN.remove(driftTweenH); driftTweenH = null})
      .start();

    driftTweenV = new TWEEN.Tween( dummyv ).to( {decayY: 0 }, 1000 )
      .onUpdate( function() {
        var currentY = krpano.get('view.vlookat') - this.decayY
        krpano.set('view.vlookat',currentY)
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

  **************************************************************************/

  var $wordContainer = $('#word-container');

  function scrollerFunction(){

    if(!that.walkthrough && !that.walkthroughPlaying) return false

    if(that.panoWalkthrough) {
      walkthrough = that.panoWalkthrough;
      if(walkthrough.autoplay) {
        walkthrough.play();
      }
    }
    else {
      walkthrough = that.walkthrough;

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


      // if(scrollPercent > 40 && that.ghostTransition)
      if(walkthrough.percent > 0.4 && that.ghostTransition)
        master.ghostBuster = false
      else
        master.ghostBuster = true

      if(parent.audiomaster.mix.getTrack('overlay_01') && !master.isTweeningAudio){
          parent.audiomaster.mix.getTrack('overlay_01').pan(1 - walkthrough.percent * 2 )
      }

      if(walkthrough.percent < 0.05) $("#scroll-start").fadeIn(1000)
      else                           $("#scroll-start").fadeOut(700)


      if(walkthrough.percent > 0.95 && !scrollTrigger){

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



      //var sequenceAnimFrame = requestAnimationFrame(scrollerFunction)

    } // scrollerFunction


  /**************************************************************************

    > FrameRunner

  **************************************************************************/

  var counter = 0; // counter to save only once per second for hallway voiceover

  var runFrameRunner = function(){

    //// console the pano mouse interaction, loadPanoScene turns this on, loadSequence Scene turns this off
    requestAnimationFrame(runFrameRunner);
    if(TWEEN) TWEEN.update()


    // update current time for hallway voiceover

    if(master.globalPano == 'hallway' && pano) {
      pano.voiceCurrentTime = pano.cachedVoiceTime + ( (new Date()-pano.voiceStartTimer) / 1000 )
      //console.log(pano.voiceCurrentTime/1000)

      counter++;
      if(counter == 60) {
        counter = 0;
        // console.log(pano.voiceCurrentTime)
        localStorage.setItem('voiceCurrentTime',JSON.stringify(pano.voiceCurrentTime))
      }

    }


    if(parent.audiomaster) {

      if(!navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false){
        for ( var i = 0, l = parent.audiomaster.mix.tracks.length; i < l; i++ ){
          parent.audiomaster.mix.tracks[i].play()
        }
      }

      if(!master.getCookie('muted')){
        if (master.overlayOpen) {
          if(parent.audiomaster.mix.getGain() > 0.2){
            parent.audiomaster.mix.setGain(parent.audiomaster.mix.getGain() - 0.02)
          }
        }

        if (!master.overlayOpen) {
           if(parent.audiomaster.mix.getGain() < 1 * master.multix){
            parent.audiomaster.mix.setGain(parent.audiomaster.mix.getGain() + 0.01)
          }
        }
        //master.soundTrigger = false
      } else {
        parent.audiomaster.mix.setGain(0)
      }
    }

    if(parent.location.hash.slice(1).indexOf('sequence') != -1){
      scrollerFunction()
      return false
    }

    if(that.walkthroughPlaying) {
      scrollerFunction()
    }

    if(krpano != null && panAmount !=0){
      panX = krpano.get('view.hlookat') + panAmount
      krpano.set('view.hlookat',panX)
    }

    if(krpano != null && yawAmount !=0){
      panY = krpano.get('view.vlookat') + yawAmount //*.3
      krpano.set('view.vlookat',panY)
    }

    if(interactive){
      mouse_x_diff = (mouse_start_x - mouse_start_x_end)*.002;
      mouse_y_diff = (mouse_start_y - mouse_start_y_end)*.001;
    }

    view_y += (mouse_y_diff)
    view_x += (mouse_x_diff*0.01)

  }

  runFrameRunner();

}
