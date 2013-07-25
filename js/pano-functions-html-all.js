
var globalPano

var pano_master = function(){

    var that = this

    var krpano

    var pano = 'helicopter'; 
    var panoWalkthrough

    if(parent.location.hash.slice(1)) globalPano = parent.location.hash.slice(1)



    if(!parent.location.hash.slice(1)) globalPano = "prologue"


    $("#wrapper").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
      console.log($('#wrapper').css('opacity'))
    });

    




    var masterPath = ".",
        targetContainer = "panocontainer",
        xmlLoc = masterPath + "/xml/all_panos.xml?nocache="+Math.random()*5,
        swfLoc = masterPath + "/js/lib/krpano/krpano.swf"
    var viewer = createPanoViewer({swf:swfLoc, id:"krpanoObject", target:"panocontainer"});
    viewer.addVariable("xml", xmlLoc);
    viewer.addVariable("html5", "html5+css3d");  
    viewer.useHTML5("always")
    viewer.passQueryParameters();
    viewer.addParam("wmode","transparent");
    this.viewer = viewer
    viewer.embed();

    var loadSequenceScene = function(_sequence)    {

        var ImageSequenceFiles,ghost, ghostFrames, linkBack, linkForward

        console.log('image sequence ' + _sequence)

        switch(_sequence){

          case "sequence_passage_chemicalroom" : 
                ImageSequenceFiles = 'corridor';
                ImageSequenceFrames = 65;
                ghost = 'hologram_2guys_walk_away 3-frame-';
                ghostFrames = 12
                linkBack = 'hallway'
                linkForward = 'chemicalroom'                
          break;

          case "sequence_passage_theatre" : 
                ImageSequenceFiles = 'corridor';
                ImageSequenceFrames = 65;
                ghost = 'hologram_rossina01_';
                ghostFrames = 16
                linkBack = 'hallway'
                linkForward = 'theatre'                
          break;

          case "sequence_outside_stairs_down" : 
                ImageSequenceFiles = 'downstairs';
                ImageSequenceFrames = 241;
                ghost = 'ghost_walktowardscamera2_';
                ghostFrames = 16
                linkBack = 'lowerplatform'
                linkForward = 'boat'                

          break;         

          case "sequence_shaftway" : 
                ImageSequenceFiles = 'hatch';
                ImageSequenceFrames = 65;
                linkBack = 'lowerplatform'
                linkForward = 'hallway'
                var wordHTL ='<li class="drilling-depth">1000 ft</li>'
                  wordHTL += '<li class="drilling-depth" style="-webkit-transform: translateZ(-500px)">2000 ft</li>'
                  wordHTL += '<li class="drilling-depth" style="-webkit-transform: translateZ(-1000px)">3000 ft</li>'
                  wordHTL += '<li class="drilling-depth" style="-webkit-transform: translateZ(-1500px)">4000 ft</li>'
                  wordHTL += '<li class="drilling-depth" style="-webkit-transform: translateZ(-2500px)">8000 ft<br>DEEPEST WELL<br>EVER DRILLED</li>'

                $('#word-container ul').html(wordHTL)
          break;       

        }


        //$('#wrapper').fadeOut()
        $('#wrapper').addClass('hide')

        $('#scroll-wrapper').fadeIn()


        $("#scroll-start").click(function(){
          newPano(linkBack)
          console.log("MOVE")
        });

        $("#scroll-end").click(function(){
          newPano(linkForward)
        });       

        var dynamicWidth = window.innerWidth;

        var dynamicHeight = dynamicWidth * .5625;

        var dynamicTop = (window.innerHeight - dynamicHeight)/2;

            $("#walking-canvas").css("top",dynamicTop)

            var walkthrough = new walkthroughFunctions(dynamicWidth,dynamicHeight,"walking-canvas",ImageSequenceFiles,ImageSequenceFrames)

            walkthrough.scrollPos = 0

            if(ghost) {

                var ghost = new ghostFunctions(dynamicWidth,dynamicHeight,"ghost-canvas",ghost,ghostFrames)

                ghost.imageSequencer()

            }

            var scrollTrigger,scrollPercent = 0

            //parent.audiomaster.mix.getTrack('overlay_01').pan(1)

            function scrollerFunction(){

                var zPos = walkthrough.scrollValue*.4

                $('#word-container').css('-webkit-transform', 'translateZ(' + zPos * 1.6 + 'px)');

                $('#word_01').css('-webkit-transform', 'translateZ(' + zPos * 1.6 + 'px)');
                $('#word_01').css('opacity', walkthrough.scrollPos/100);
            
                if(walkthrough.scrollPos > 40 && walkthrough.scrollPos < 60){
                        $("#ghost-canvas").fadeIn(500)
                        $("#ghost-controls").fadeIn(500)
                }else{
                        $("#ghost-canvas").fadeOut(500)
                        $("#ghost-controls").fadeOut(2500)
                }

                scrollPercent = Math.ceil((walkthrough.scrollValue / (5000-$(window).height())) * 100);
                //if(!scrollTrigger) $('#whisper_02')[0].play()
                

                if(parent.audiomaster.mix.getTrack('overlay_01') && !master.isTweeningAudio){
                        parent.audiomaster.mix.getTrack('overlay_01').pan(1 - scrollPercent/50)        
                } 
                
                if(walkthrough.scrollPos < 5){
                        $("#scroll-start").fadeIn(1000)
                }else{
                        $("#scroll-start").fadeOut(700)
                }

                 if(walkthrough.scrollPos > 95 && !scrollTrigger){

                        console.log('end of passage')

                        scrollTrigger = true

                        cancelAnimationFrame(scrollerFunction)

                        walkthrough.scrollPos = 0

                        $('#scroll-wrapper').fadeOut()
                        
                        $('#wrapper').addClass('hide')

                        newPano(linkForward)

                }else{
                        $("#scroll-end").fadeOut(1000)
                }
                
                //console.log('scroll')

                requestAnimationFrame(scrollerFunction)
            }

            scrollerFunction()
    }




    this.loadPanoScene = function(_pano)    {

      master.ghostBuster = true

      master.globalPano = _pano

      var dynamicWidth = window.innerWidth;

      var dynamicHeight = dynamicWidth * .5625;

      var dynamicTop = (window.innerHeight - dynamicHeight)/2;


      if(parent.audiomaster.mix.getTrack('overlay_02')){

        var dummysound = { fadeFrom: 1};

        master.soundTrigger = null

        console.log("has overlay 2")

        parent.audiomaster.mix.getTrack('overlay_02').gain(0.0001)

        parent.audiomaster.mix.removeTrack('overlay_02')

      }


        if(_pano.indexOf('sequence')!=-1) {
            loadSequenceScene(_pano);
            return;
        }

        console.log('loadPanoScene() '+_pano)

        $('#scroll-wrapper').fadeOut()
        //$('#wrapper').fadeIn(1000)
        //$('#wrapper').removeClass('hide')

        krpano = document.getElementById("krpanoObject");
        krpano.call('action(' + _pano + ')')

        // should add a krpano lookto call here, sometimes loads looking at ceiling

        // remove leftover dynamic elements
        $('.dynamic').remove()

        switch(_pano){

            case "prologue" : 
                videoPlayer('prologue')
                //that.loadPanoScene('helicopter')
                //$('#pano-container').addClass('hide')
            break;

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

                master.blankTrans()

                overLayFile = 'audio/Main_Hallway.mp3' 
                
                underlayFile = 'audio/Drone_2_norm.mp3'

                loadAFXPano('audio/One_Big_Ball_of_Fire.mp3')

               // $('#panocontainer').before('<div class="dynamic" class="pano-underlay"><video width="100%" autoplay loop="true" style="position:absolute;" id="video-underlay" preload="auto"><source src="video/transitions/oil_shot.webm" type="video/webm" /></video> </div>')

                $('#panocontainer').after('<img id = "gradient" class="dynamic" src = "images/overlay_gradient_blue_upside_down.png" style="pointer-events:none;bottom:0px; display:block; position: absolute;width:100%;height:40%;opacity:0.7"/>')
            
            break;

            case "subhanger" : 
                overLayFile = 'audio/SubRoom.mp3' 
                underlayFile = 'audio/Drone_3.mp3'

                $("#walking-canvas-pano").removeClass('hide')
                $("#walking-canvas-pano").css("top",dynamicTop)

                var scrollTrigger,scrollPercent = 1

                panoWalkthrough = new walkthroughFunctions(dynamicWidth,dynamicHeight,"walking-canvas-pano","approaching",119,true)

                $("#walking-exit").click(function(){
                 panoWalkthrough.scrollPos = 0
                  scrollTrigger = 0
                  krpano = document.getElementById("krpanoObject");
                  krpano.call("lookto(0,0,90,smooth(),true,true))")
                 });

            break;

            case "submarine" :
                $('#panocontainer').before('<video autoplay class="dynamic hide fade" id="video-underwater" preload="auto"></video>')
                $('#video-underwater').css({
                    'position':'absolute',
                    'width':'100%'
                })
            break;

            case "theater" : 
                overLayFile = 'audio/Fluorescencent_Tone.mp3'
                underlayMute=true
            break; 

            case "chemicalroom" : 
                //$('#panocontainer').before(' <canvas class="dynamic" id="walking-canvas" style="position:absolute;opacity:1" width="1200" width="800"></canvas>')
                $("#walking-canvas-pano").removeClass('hide')
                $("#walking-canvas-pano").css("top",dynamicTop)
                overLayFile = 'audio/Chemical_Room.mp3' 
                underlayFile = 'audio/Drone_3_norm.mp3'
                var scrollTrigger,scrollPercent = 1
                
                panoWalkthrough = new walkthroughFunctions(dynamicWidth,dynamicHeight,"walking-canvas-pano","engineroom",601,true)

                $("#walking-exit").click(function(){
                 panoWalkthrough.scrollPos = 0
                  scrollTrigger = 0
                  krpano = document.getElementById("krpanoObject");
                  krpano.call("lookto(0,0,90,smooth(),true,true))")
                 });


            break;    

            case "controlroom" : 
                overLayFile = 'audio/russian_radio.mp3'
                $('#panocontainer').before('<div class="dynamic" class="pano-underlay"><video width="100%" autoplay loop="true" style="position:absolute;" id="video-underlay" preload="auto"><source src="video/transitions/oil_shot.webm" type="video/webm" /></video> </div>')
            break;                 
            //
        }

        that.loadSceneAudio()
} 

 

$(parent).bind('hashchange', function(){
    if (parent.location.hash.slice(1) =="") return
    $("#walking-canvas-pano").addClass('hide')

    console.log(parent.location.hash.slice(1))

    that.loadPanoScene(parent.location.hash.slice(1))
})
    




    console.log("pano all is loading")




    
 

    var overLayFile, underlayFile, underlayMute, underlayMuted

        $.ajax({
            url: 'js/videoMatrix.json',
            success: function(data){

                console.log("MOVIE LIST LOADED")
                // master.movieMenu = data.children

                // build all possible menus - videoPlayer() function picks the one it needs
                $.each(data.children, function(group_i,group){
                    $('#video-overlay').after('<div class="movie-menu hide '+group.group+'" />')

                    $.each(group.movies,function(movie_i,movie){
                        $('.movie-menu.'+group.group).append('<div data-file="' + movie.file + '" class="movie-menu-item">' + movie.title + '</div>')
                    })
                })

                $('.movie-menu-item').click(function(){
                    switchVideo($(this).data('file'))
                })

            },
            error : function(request,error) {
                console.log(error)
            }
        });




 

    //$('.wrapper').append("<div class='pan-directions'/>")

    $('#panocontainer').after('<div class="fastpan" id="fastpanleft"/><div class="fastpan" id="fastpanright"/><div class="fastpan" id="fastpantop"/><div class="fastpan" id="fastpanbottom"/>')

    this.loadSceneAudio = function(_pano)    {

      var overlayTrack = parent.audiomaster.mix.getTrack('overlay_01')
      var underlayTrack = parent.audiomaster.mix.getTrack('basetrack')


         if( underlayFile){

            var dummysound = { fadeFrom:    1, fadeTo: 0.0001};

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

            var dummysound = { decayFrom:    underlayTrack.options.gainNode.gain.value};

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

            var dummysound = { decayFrom:    overlayTrack.options.gainNode.gain.value};

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
                            var dummy = { decayX:    panAmount};
                            if(driftTweenH) TWEEN.remove(driftTweenH)
                            driftTweenH = new TWEEN.Tween( dummy ).to( { decayX: 0}, 1000 )
                                .onUpdate( function() {
                                    panAmount    = this.decayX
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

                          $("#ghost-canvas-trans").css("display","none")
                                    

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

                                $("#ghost-canvas-trans").css("display","block")

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

                        //console.log(master.soundTrigger)
                          
                        
                        if(!master.getCookie('muted')){
                          if (master.overlayOpen) parent.audiomaster.mix.setGain(0.5)
                          if (!master.overlayOpen) parent.audiomaster.mix.setGain(1.0)
                          //master.soundTrigger = false
                        }else{
                          

                          parent.audiomaster.mix.setGain(0)
                    
                        }   
                         
                }
                runFrameRunner()    



}

var loadAFXPano = function (_file){
    console.log("afx " + _file)
    master.AFXloadAudio(_file,'overlay_02',0,1.0)
}




var pano = new pano_master();




