var audiomaster = (function(){
  var exports = {};

  var mix = new Mix();
  exports.mix = mix;

  exports.source = [];

  exports.loadAudio = function(_src, _name, _gain, _pan, _nolooping, _start){
    if(!_start) _start = 0;

    console.log('loadAudio:', _src, _name, _gain, _pan);

    var track = mix.createTrack(_name, {
      source:   globals.cdn_audio + _src + globals.audioType,
      gain:      _gain || 1,
      pan:       _pan,
      nolooping: _nolooping,
      start:    _start
    });
  }

  // Mute ********************************************************

  $('.volume-toggle').click(function(){

    master.soundTrigger = true;
    var isMuted = storage.get('muted');

    if (isMuted){
      $('.volume-toggle').html('<i class="icon-volume-up"></i>');
      storage.remove('muted');
      $('video').each(function(i,v){
        $(v).prop('muted', false)
      })
    } else {
      $('.volume-toggle').html('<i class="icon-volume-off"></i>');
      storage.set('muted', true);
      $('video').each(function(i,v){
        $(v).prop('muted', true)
      })
    }

    console.log('muted: '+storage.get('muted'));
  })

  if(storage.get('muted')){
    $('.volume-toggle').html('<i class="icon-volume-off"></i>');
    $('video').each(function(i,v){
      $(v).prop('muted', true)
    })
  }

  // Sound Adjust ********************************************************

  var soundVector1 = 0;
  var soundVector2 = 0;
  var soundVector3 = 0;

  exports.soundadjust = function(coord,fov) {

    var convCoord  =  Math.abs( (coord+ 60) % 360);
    var convCoord1 =  Math.abs( (coord-120) % 360);

    if(convCoord < 180 ) soundVector1 = convCoord;
    else                 soundVector1 = (360-convCoord);

    if(convCoord1 < 180 ) soundVector2 = (convCoord1);
    else                  soundVector2 = (360-(convCoord1));

    //x = r cos(t)    y = r sin(t)

    var soundPosX1 = 2 * Math.cos(soundVector1 * Math.PI / 180)
    var soundPosZ1 = 2 * Math.sin(soundVector1 * Math.PI / 180)

    var soundPosX2 = 2 * Math.cos(soundVector2 * Math.PI / 180)
    var soundPosZ2 = 2 * Math.sin(soundVector2 * Math.PI / 180)


    if(Modernizr.webaudio === true) {
      if(exports.mix.getTrack('overlay_01') && !master.isTweeningAudio){
        exports.mix.getTrack('basetrack').pan3d(soundPosX1,soundPosZ1)
        exports.mix.getTrack('overlay_01').pan3d(soundPosX2,soundPosZ2)
      }

      if(exports.mix.getTrack('overlay_02') && !master.isTweeningAudio){
       exports.mix.getTrack('overlay_01').pan(soundPosX1)
      }
    }

    // show ghosts only in specific spot (recalculated every pano)
    if(convCoord > master.ghostMinCoord && convCoord < master.ghostMaxCoord) {
      master.ghostBuster = false
    } else {
      master.ghostBuster = true
    }

    /* sequences */
    if(globals.pano === 'chemicalroom' || globals.pano === 'subhangar' ) {

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
      } else {

        if(!master.overlayOpen)
          $('#panocontainer, .fastpan, .compass').removeClass('hide')

        $('.scroll-directions, .panoversion, #walking-exit').fadeOut(function(){
            $('.scroll-directions').css('top','0px') // reset scrubber position
        })

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

  return exports;
}());
