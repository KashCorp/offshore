var pano_master = function(){
  var that = this  
  console.log("pano is loading")
  var pano = $('#panocontainer').attr('class');    
  var masterPath = ".",
      targetContainer = "panocontainer",
      xmlLoc = masterPath + "/xml/" + pano + ".xml?nocache="+Math.random()*5,
      swfLoc = masterPath + "/js/lib/krpano/krpano.swf"
  var viewer = createPanoViewer({swf:swfLoc, id:"krpanoObject", target:"panocontainer"});
  viewer.addVariable("xml", xmlLoc); 
  viewer.useHTML5("always")
  //viewer.addParam("wmode","transparent");
  viewer.passQueryParameters();
  this.viewer = viewer
  viewer.embed();

  var overLayFile, underlayFile, underlayMute, underlayMuted

    $.ajax({
      url: 'js/videoMatrix.json',
      success: function(data){

        console.log("MOVIE LIST LOADED")
        master.movieMenu = data.children

        // load video groups on this page from <body data-videos> attribute
        var groups = $('body').data('videos').split(' ')
        var menuContent = {}

        $.each(groups, function(i,v){
          array = $.grep(data.children, function (element, index) { return element.group == v})
          menuContent[v] = array[0]
        })

        // build menus
        if(menuContent){

          $.each(menuContent, function(i,v){
            console.log('group: '+i)
            $('#video-overlay').after('<div class="movie-menu '+i+'" id="movie-menu"/>')

            $(v.movies).each(function(index,movie){
              console.log('-- '+movie.title)
              $('#movie-menu').append('<div data-file="' + movie.file + '" class="movie-menu-item">' + movie.title + '</div>')
            })

          })
          
          $('.movie-menu-item').click(function(){
            switchVideo($(this).data('file'))
          })

        }
        

      },
      error : function(request,error) {
        console.log(error)
      }
    });


  

  switch(pano){
    case "helicopter" : 
    overLayFile = 'audio/Helicopter_Interior.mp3'
    break;
    case "platform" : 
    overLayFile = 'audio/ocean_sounds.mp3'
    break;

    case "boat" : 
    overLayFile = 'audio/HeliPad_minus_minus.mp3'
    underlayFile = 'audio/The_Zone.mp3'
    break;

    case "interiorsub-wire" : 
    overLayFile = 'audio/Submersible.mp3'
    underlayMute=true
    break;

    case "lowerplatform_closed" : 
    overLayFile = 'audio/LowerPlatform_minus.mp3' 
    underlayFile = 'audio/Drone_1_norm.mp3'
    break;

    case "hallway" : 
    overLayFile = 'audio/Main_Hallway.mp3' 
    underlayFile = 'audio/Drone_2_norm.mp3'
    break;

    case "subhanger" : 
    overLayFile = 'audio/SubRoom.mp3' 
    underlayFile = 'audio/Drone_3.mp3'
    break;

    case "theater" : 
    overLayFile = 'audio/Fluorescencent_Tone.mp3'
    underlayMute=true
   
    break; 

    case "chemicalroom" : 
    overLayFile = 'audio/Chemical_Room.mp3' 
    underlayFile = 'audio/Drone_3_norm.mp3'
    break;  

    case "controlroom" : 
    overLayFile = 'audio/russian_radio.mp3'
    break;         
    //
}
 

  //$('.wrapper').append("<div class='pan-directions'/>")

  $('#panocontainer').after('<div class="fastpan" id="fastpanleft"/><div class="fastpan" id="fastpanright"/><div class="fastpan" id="fastpantop"/><div class="fastpan" id="fastpanbottom"/>')

 var overlayTrack = parent.audiomaster.mix.getTrack('overlay_01')
 var underlayTrack = parent.audiomaster.mix.getTrack('basetrack')

  $.getScript("js/lib/Tween.js", function(data, textStatus, jqxhr) {


     if( underlayFile){

      var dummysound = { fadeFrom:  1, fadeTo: 0.0001};

      parent.audiomaster.loadAudio(underlayFile,'basetrack2',0,0)

      var driftTweenSound = new TWEEN.Tween( dummysound ).to( { fadeFrom: 0, fadeTo:1}, 3000 )
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

    } else{
      if(underlayMuted){
       var driftTweenSound = new TWEEN.Tween( dummysound ).to( { fadeFrom: 0, fadeTo:1}, 3000 )
                    .onUpdate( function() {
                     parent.audiomaster.mix.getTrack('basetrack').gain(this.fadeFrom)
                     })
                     .easing(TWEEN.Easing.Quadratic.Out )
                     .start()       
      }
    }

    if(underlayMute) {

      var dummysound = { decayFrom:  underlayTrack.options.gainNode.gain.value};

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
                        master.WAAloadAudio(overLayFile,'overlay_01',-1,1);
                    })
                    .start(); 

    }else{
        if(overLayFile)
            master.WAAloadAudio(overLayFile,'overlay_01',-1,1);
    }

          var mouse_start_x = 0,
          mouse_start_y = 0,
          mouse_start_x_end= 0,
          mouse_start_y_end = 0,
          mouse_x_diff = 0,
          mouse_y_diff = 0,
          driftTweenH, driftTweenV,
          panAmount = 0, yawAmount = 0,
          interactive = null,
          view_x=0,view_y=0,krpano,panX,panY

            document.addEventListener( 'mousedown', actionDown, false );
            document.addEventListener( 'touchstart', actionDownTouch, false );     
            
            document.addEventListener( 'mousemove', actionMove, false );
            document.addEventListener( 'touchmove', actionMoveTouch, false );

            document.addEventListener( 'mouseup', actionUp, false );
            document.addEventListener( 'touchend', actionUp, false );




            function finishPanX() {
              var dummy = { decayX:  panAmount};
              if(driftTweenH) TWEEN.remove(driftTweenH)
              driftTweenH = new TWEEN.Tween( dummy ).to( { decayX: 0}, 1000 )
                .onUpdate( function() {
                  panAmount  = this.decayX
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
                console.log("hover")
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

                interactive = false;

                var dummy = { decayX:  mouse_x_diff};
                var dummyv = { decayY:  mouse_y_diff};

                driftTweenH = new TWEEN.Tween( dummy ).to( { decayX: 0}, 1000 )
                    .onUpdate( function() {
                      var currentX = krpano.get('view.hlookat') - this.decayX
                      krpano.set('view.hlookat',currentX)
                      mouse_x_diff  = this.decayX*.01;
                    
                    })
                    .easing(TWEEN.Easing.Quadratic.Out )
                    //.onComplete(function() {TWEEN.remove(driftTweenH); driftTweenH = null})
                    .start(); 

                driftTweenV = new TWEEN.Tween( dummyv ).to( {decayY: 0 }, 1000 )
                    .onUpdate( function() {
                      var currentY = krpano.get('view.vlookat') - this.decayY
                      krpano.set('view.vlookat',currentY)
                      mouse_y_diff  = this.decayY*.01;

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
      
        var runFrameRunner = function(){

            requestAnimationFrame(runFrameRunner);

            krpano = document.getElementById('krpanoObject')

            if(krpano != null && panAmount !=0){

              panX = krpano.get('view.hlookat') + panAmount
              krpano.set('view.hlookat',panX)

            }

            if(krpano != null && yawAmount !=0){

              panY = krpano.get('view.vlookat') + yawAmount //*.3
              krpano.set('view.vlookat',panY)

            }

     
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

var loadAFXPano = function (_file){
  console.log(_file)
  master.AFXloadAudio(_file,'overlay_02',0,1.0)
}

var pano = new pano_master();




