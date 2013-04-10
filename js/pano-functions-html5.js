var pano_master = function(){
  var that = this  
  console.log("HTML5 pano is loaded")
  var pano = $('#panocontainer').attr('class');    
  var masterPath = ".",
      targetContainer = "panocontainer",
      xmlLoc = masterPath + "/xml/" + pano + ".xml?nocache="+Math.random()*5,
      swfLoc = masterPath + "/js/lib/krpano/krpano.swf"
  var viewer = createPanoViewer({swf:swfLoc, id:"krpanoObject", target:"panocontainer"});
  viewer.addVariable("xml", xmlLoc); 
  viewer.useHTML5("always")
  viewer.addParam("wmode","transparent");
  viewer.passQueryParameters();
  this.viewer = viewer
  viewer.embed();

  var overLayFile, underlayFile

  switch(pano){
    case "helicopter" : 
    overLayFile = 'audio/Helicopter_Interior.mp3'
    break;
    case "platform" : 
    overLayFile = 'audio/Helipad_Ambience_Music.mp3'
    break;

    case "boat" : 
    overLayFile = 'audio/ocean_sounds.mp3'
    underlayFile = 'audio/The_Zone.mp3'
    break;

    case "lowerplatform_closed" : 
    overLayFile = 'audio/About_Ambience.mp3' 
    underlayFile = 'audio/Drone_1.mp3'
    break;

    case "hallway" : 
    overLayFile = 'audio/Bong.mp3' 
    underlayFile = 'audio/Drone_2.mp3'
    break;

    case "subhanger" : 
    overLayFile = 'audio/Bong.mp3' 
    underlayFile = 'audio/Drone_3.mp3'
    break;

    case "theater" : 
    underlayFile = 'audio/Drone_3.mp3'
    break;       
    //
}
 

  $('.wrapper').append("<div class='pan-directions'/>")

 var overlayTrack = parent.audiomaster.mix.getTrack('overlay_01')
 var underlayTrack = parent.audiomaster.mix.getTrack('basetrack')

  $.getScript("js/lib/Tween.js", function(data, textStatus, jqxhr) {


     if( underlayFile){

      var dummysound = { fadeFrom:  1, fadeTo: 0.0001};

      parent.audiomaster.loadAudio(underlayFile,'basetrack2',0,0)

      var driftTweenSound = new TWEEN.Tween( dummysound ).to( { fadeFrom: 0, fadeTo:1}, 3000 )
                    .onUpdate( function() {
                      parent.audiomaster.mix.getTrack('basetrack').gain(this.fadeFrom)
                      parent.audiomaster.mix.getTrack('basetrack2').gain(this.fadeTo)
                    })
                    .easing(TWEEN.Easing.Quadratic.Out )
                    .onComplete(function() {
                      parent.audiomaster.mix.removeTrack('basetrack')
                      var renameThis = parent.audiomaster.mix.getTrack('basetrack2')

                      renameThis['name'] = 'basetrack';

                      parent.audiomaster.mix.lookup['basetrack'] = renameThis

                      console.log(renameThis)

                    })
                    .start(); 

    }


    if( overlayTrack){

      var dummysound = { decayFrom:  overlayTrack.options.gainNode.gain.value};

      var driftTweenSound = new TWEEN.Tween( dummysound ).to( { decayFrom: 0}, 3000 )
                    .onUpdate( function() {
                      master.isTweeningAudio = true
                      overlayTrack.gain(this.decayFrom)
                    })
                    .easing(TWEEN.Easing.Quadratic.Out )
                    .onComplete(function() {
                      parent.audiomaster.mix.removeTrack('overlay_01')
                      
                      if(overLayFile)
                        master.WAAloadAudio(overLayFile,'overlay_01',-1,0.1);
                    })
                    .start(); 

    }else{
        if(overLayFile)
            master.WAAloadAudio(overLayFile,'overlay_01',-1,0.1);
    }

          var mouse_start_x = 0,
          mouse_start_y = 0,
          mouse_start_x_end= 0,
          mouse_start_y_end = 0,
          mouse_x_diff = 0,
          mouse_y_diff = 0,
          driftTweenH, driftTweenV,
          cloudMove = 0,
          interactive = null,
          view_x=0,view_y=0





            

            

            document.addEventListener( 'mousedown', actionDown, false );
            document.addEventListener( 'touchstart', actionDownTouch, false );     
            
            document.addEventListener( 'mousemove', actionMove, false );
            document.addEventListener( 'touchmove', actionMoveTouch, false );

            document.addEventListener( 'mouseup', actionUp, false );
            document.addEventListener( 'touchend', actionUp, false );



            function actionDown( e ) {
                  

              e.touches = [{clientX: e.clientX, clientY: e.clientY}];
              actionDownTouch(e);

            } 

             function actionDownTouch( e ) {
                  

                mouseMove = 0
                mouse_y_diff = 0;
                mouse_x_diff = 0;


                if(driftTweenH) TWEEN.remove(driftTweenH)
                if(driftTweenV) TWEEN.remove(driftTweenV)

                interactive=true; 
                mouse_start_x = e.touches[0].clientX;
                mouse_start_y = e.touches[0].clientY;
                mouse_start_x_end=e.touches[0].clientX;
                mouse_start_y_end=e.touches[0].clientY;

            }            




             function actionUp( e ) {

                interactive = false;

                var krpano = document.getElementById('krpanoObject')

                var dummy = { decayX:  mouse_x_diff};
                var dummyv = { decayY:  mouse_y_diff};

                driftTweenH = new TWEEN.Tween( dummy ).to( { decayX: 0}, 3000 )
                    .onUpdate( function() {
                      var currentX = krpano.get('view.hlookat') - this.decayX
                      krpano.set('view.hlookat',currentX)
                      mouse_x_diff  = this.decayX*.01;
                    
                    })
                    .easing(TWEEN.Easing.Quadratic.Out )
                    .onComplete(function() {TWEEN.remove(driftTweenH); driftTweenH = null})
                    .start(); 

                driftTweenV = new TWEEN.Tween( dummyv ).to( {decayY: 0 }, 2000 )
                    .onUpdate( function() {
                      var currentY = krpano.get('view.vlookat') - this.decayY
                      krpano.set('view.vlookat',currentY)
                      mouse_y_diff  = this.decayY*.01;

                    })
                    .easing(TWEEN.Easing.Quadratic.Out )
                    .onComplete(function() {TWEEN.remove(driftTweenV); driftTweenV = null})
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
      
        var runFrameRunner = function(){

            requestAnimationFrame(runFrameRunner);
     
            if(TWEEN) TWEEN.update()

            if(interactive){

              mouse_x_diff = (mouse_start_x - mouse_start_x_end)*.002;
              mouse_y_diff = (mouse_start_y - mouse_start_y_end)*.001;

            }
                    
            view_y += (mouse_y_diff)
            view_x += (mouse_x_diff*0.01)
              
            if(!parent.audiomaster) return

            for ( var i = 0, l = parent.audiomaster.mix.tracks.length; i < l; i++ ){                        
               parent.audiomaster.mix.tracks[i].play()                  
            }  
             
        }
        runFrameRunner()  
        }); //end get script


}

var pano = new pano_master();




