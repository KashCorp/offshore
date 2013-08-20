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

var pano_master = function(){

    var that = this

    var krpano

    this.panoWalkthrough;
    this.walkthroughPlaying = false;

    this.ghostTransition;
    this.walkthrough;

    this.dynamicWidth = window.innerWidth;
    this.dynamicHeight = this.dynamicWidth * .5625;
    this.dynamicTop = (window.innerHeight - this.dynamicHeight)/2;

    this.voiceCurrentTime = 0
    this.voiceStartTimer = 0

    var scrollTrigger,scrollPercent=0,sequenceHasWords,linkForward, linkBack;
            

    if(parent.location.hash.slice(1)) globalPano = parent.location.hash.slice(1)

    //Defualt to start if no has'h

   panoXMLFile = './xml/all_panos.xml?nocache='+Math.random()*5

    if(!parent.location.hash.slice(1)) {
        console.log('NO HASH > PROLOGUE')
        globalPano = "prologue"; 
        // var panoXMLFile = './xml/prologue.xml?nocache='+Math.random()*5
        
    }


    // Build pano

    var masterPath = ".",
        targetContainer = "panocontainer",
        xmlLoc = masterPath + "/xml/all_panos.xml?nocache="+Math.random()*5,
        swfLoc = masterPath + "/js/lib/krpano/krpano.swf"
    
    var viewer = createPanoViewer({swf:swfLoc, id:"krpanoObject", target:"panocontainer"});
    viewer.addVariable("xml", panoXMLFile);  
    viewer.useHTML5("always")
    viewer.passQueryParameters();
    viewer.addParam("wmode","transparent");
    this.viewer = viewer
    viewer.embed();






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
        console.log('LOAD: hash change')

        if(master.globalPano === parent.location.hash.slice(1)) {
            console.log('#nowhere')
            return false;
        }

        if (parent.location.hash.slice(1) =="") {
            that.loadPanoScene('prologue')
            return false
        }
            
        $("#walking-canvas-pano").addClass('hide')
        that.loadPanoScene(parent.location.hash.slice(1))
    })

    // coming in from a deeplink
    var deeplinktimeout;

    var deeplinkfunction = function(){

        console.log('deeplinkfunction')

        window.clearTimeout(deeplinktimeout)

        deeplinktimeout = window.setTimeout(function(){

            // make sure krpano has had a chance to load
            krpano = document.getElementById("krpanoObject");

            if(krpano) {
                console.log('krpano loaded')

                if (parent.location.hash.slice(1) =="")
                    that.loadPanoScene('prologue')
                else
                    that.loadPanoScene(parent.location.hash.slice(1))

                window.clearTimeout(deeplinktimeout)
                return false;

            } else {
                console.log('waiting for krpano to load...')
                deeplinkfunction()
            }

        },1000)
    }

    deeplinkfunction();

    



    /**************************************************************************
        
        > Load Pano Scene
    
    **************************************************************************/
    

    this.loadPanoScene = function(_pano) {

    $('#wrapper').css('display','block')

    that.panoWalkthrough = null;


    // Ghost Functions
    if(that.ghostTransition) that.ghostTransition.killGhost();
    if(that.walkthrough) that.walkthrough = false;

    $('#ghost-canvas-trans').fadeOut()

    if(!master.overlayOpen) $('.compass').show()

    setTimeout(function(){

        var canvas = document.getElementById('ghost-canvas-trans');

        var context = canvas.getContext('2d');

        context.clearRect(0, 0,320,180);

        canvas.width = 0

        canvas.width = 320

    },1000)


    // calculate a random range for ghosts to appear
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
    

///// Decision to divert to image sequence
        if(_pano.indexOf('sequence')!=-1) {
            loadSequenceScene(_pano);
            return false;
        }


        console.log('loadPanoScene() '+_pano)

        $('#scroll-wrapper').fadeOut()



        // load pano
        krpano = document.getElementById("krpanoObject");
        krpano.call('action(' + _pano + ')')

        // should add a krpano lookto call here, sometimes loads looking at ceiling
        // krpano.call('lookto(0,0,90)'); // lookto(horizontal, vertical, fov)
        krpano.set('view.fov','90');
        krpano.set('view.vlookat','0');

        // remove leftover dynamic elements
        $('.dynamic').remove()
        $('.hotspot').attr('class','hotspot')

        // MASTER SWITCH
        switch(_pano){

            case "prologue" : 
                overLayFile = 'HeliPad_minus_minus.mp3'

                $('.compass').hide()

            break;

            case "helicopter" :
                krpano.call("lookto(180,0,90,smooth(),true,true))")
                overLayFile = 'Helicopter_Interior.mp3'
            break;

            case "platform" : 
                overLayFile = 'ocean_sounds.mp3'
            break;

            case "boat" : 
                overLayFile = 'HeliPad_minus_minus.mp3'
                underlayFile = 'The_Zone.mp3'
            break;

            case "interiorsub-wire" : 
                overLayFile = 'Submersible.mp3'
                underlayMute=true
            break;

            case "lowerplatform_closed" : 
                overLayFile = 'LowerPlatform_minus.mp3' 
                underlayFile = 'Drone_1_norm.mp3'
            break;

            case "hallway" : 

                // Big ball of fire voices
                if(that.voiceCurrentTime == 0) that.voiceStartTimer = new Date()
                
                console.log('that.voiceStartTimer: '+'\t'+ that.voiceCurrentTime)

                loadAFXPano('One_Big_Ball_of_Fire.mp3', that.voiceCurrentTime)
                
                var getGhost = master.ghost_array[Math.floor(Math.random()*master.ghost_array.length)]
                
                that.ghostTransition = master.ghostTrans(getGhost['ghost'],getGhost['frames'])   

                overLayFile = 'Main_Hallway.mp3'

                underlayFile = 'Drone_2_norm.mp3'

                $('#panocontainer').after('<img id = "gradient" class="dynamic" src = "images/overlay_gradient_blue_upside_down.png" style="pointer-events:none;bottom:0px; display:block; position: absolute;width:100%;height:40%;opacity:0.7"/>')
                


                //$('#panocontainer').before('<div class="dynamic" class="pano-underlay"><video width="100%" height="100%" autoplay loop="true" style="position:absolute; display:none" id="video-underlay" preload="auto"><source src="video/transitions/oil_shot.webm" type="video/webm" /><source src="video/transitions/oil_shot.mov" type="video/mov" /></video> </div>')
                $(window).off('resize.oilshot')
                $(window).on('resize.oilshot',function(){
                    $('#video-underlay').css({
                       'width': master.dynamicFillWidth,
                        'height': master.dynamicFillHeight,
                        'margin-left' : -master.dynamicFillWidth/2,
                        'margin-top' : -master.dynamicFillHeight/2
                    })
                })
                $('#video-underlay').css({
                    'position':'absolute',
                    'width': master.dynamicFillWidth,
                    'height': master.dynamicFillHeight,
                    'left' : '50%',
                    'top' : '50%',
                    'margin-left' : -master.dynamicFillWidth/2,
                    'margin-top' : -master.dynamicFillHeight/2
                })

            break;

            case "subhanger" : 
                overLayFile = 'SubRoom.mp3' 
                underlayFile = 'Drone_3.mp3'

                // walkthrough
                $("#walking-canvas-pano").removeClass('hide')
                var scrollTrigger=false;
                that.panoWalkthrough = new walkthroughFunctions("walking-canvas-pano","approaching",119,true)
                // that.panoWalkthrough.preload()
                $('.hotspot').addClass('requiem')

            break;

            case "submarine" :
                $('#panocontainer').before('<video autoplay class="dynamic hide fade" id="video-underwater" preload="auto"></video>')
                $('#video-underwater').css({
                    'position':'absolute',
                    'width': master.dynamicFillWidth,
                    'height': master.dynamicFillHeight,
                    'left' : '50%',
                    'top' : '50%',
                    'margin-left' : -master.dynamicFillWidth/2,
                    'margin-top' : -master.dynamicFillHeight/2
                })
                $(window).off('resize.underwater')
                $(window).on('resize.underwater',function(){
                    $('#video-underwater').css({
                        'width': master.dynamicFillWidth,
                        'height': master.dynamicFillHeight,
                        'margin-left' : -master.dynamicFillWidth/2,
                        'margin-top' : -master.dynamicFillHeight/2
                    })
                })
            break;

            case "theater" : 
                overLayFile = 'Fluorescencent_Tone.mp3'
                underlayMute=true
            break; 

            case "chemicalroom" :
                overLayFile = 'Chemical_Room.mp3' 
                underlayFile = 'Drone_3_norm.mp3'
                
                // walkthrough
                var scrollTrigger=false;
                $("#walking-canvas-pano").removeClass('hide')
                that.panoWalkthrough = new walkthroughFunctions("walking-canvas-pano","engineroom",601,true)
                // that.panoWalkthrough.preload()
                $('.hotspot').addClass('engineroom')

            break;    

            case "controlroom" : 
                overLayFile = 'russian_radio.mp3'
                $('#panocontainer').before('<div class="dynamic" class="pano-underlay"><video width="100%" height="100%" autoplay loop="true" style="position:absolute;" id="video-underlay" preload="auto"><source src="video/transitions/oil_shot.webm" type="video/webm" /><source src="video/transitions/oil_shot.mov" type="video/mov" /></video> </div>')
            break;                 
            //
        }

        that.loadSceneAudio()
    } 




    /**************************************************************************
        
        > Load Sequence Scene
    
    **************************************************************************/
    

    var loadSequenceScene = function(_sequence) {

        console.log('loadSequenceScene')
        sequenceHasWords = false;

        //cancelAnimationFrame(runFrameRunner)

        var ImageSequenceFiles,
            ghost,
            ghostFrames;

        // clear word container
        $('#word-container ul').html('')

        $('#wrapper').css('display','none')

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
                ghost = 'hologram_2guys_walk_away 2-frame-';
                ghostFrames = 12
                linkBack = 'hallway'
                linkForward = 'theatre'                
          break;


           case "sequence_passage_controlroom" : 
                ImageSequenceFiles = 'corridor';
                ImageSequenceFrames = 65;
                ghost = 'hologram_helicopter-frame-';
                ghostFrames = 12
                linkBack = 'hallway'
                linkForward = 'controlroom'                
          break;         

          case "sequence_outside_stairs_down" : 
                ImageSequenceFiles = 'downstairs';
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
                
                sequenceHasWords = true
                var wordHTL ='<li class="drilling-depth">1000 ft</li>'
                  wordHTL += '<li class="drilling-depth" style="-webkit-transform: translateZ(-500px)">2000 ft</li>'
                  wordHTL += '<li class="drilling-depth" style="-webkit-transform: translateZ(-1000px)">3000 ft</li>'
                  wordHTL += '<li class="drilling-depth" style="-webkit-transform: translateZ(-1500px)">4000 ft</li>'
                  wordHTL += '<li class="drilling-depth" style="-webkit-transform: translateZ(-2500px)">8000 ft<br>DEEPEST WELL<br>EVER DRILLED</li>'

                $('#word-container ul').html(wordHTL)
 
                overLayFile = 'Hatch_Alt2.mp3'
          break;       

        }
        
        that.loadSceneAudio()

        if(ghost) {
            console.log('GHOST')
            that.ghostTransition = new ghostFunctions("ghost-canvas-trans",ghost,ghostFrames)
            that.ghostTransition.imageSequencer()
        }

        //$('#wrapper').addClass('hide')
        //$('#wrapper').hide()

        $('.loading').fadeOut()
        // $('.loading').addClass('hide')
        // $('.loading').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
        //     $('.loading').hide()
        // })

        $('#scroll-wrapper').fadeIn()

        $("#scroll-start").click(function(){ newPano(linkBack) });
        $("#scroll-end")  .click(function(){ newPano(linkForward) });

        $("#walking-canvas").css("top",that.dynamicTop)

        that.walkthrough = new walkthroughFunctions("walking-canvas",ImageSequenceFiles,ImageSequenceFrames)
        that.walkthrough.preload()

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
                switchVideo($(this).data('file'),$(this).text())
            })

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

    if(Modernizr.webaudio) {
        var overlayTrack = parent.audiomaster.mix.getTrack('overlay_01')
        var underlayTrack = parent.audiomaster.mix.getTrack('basetrack')


             if( underlayFile){

                var dummysound = { fadeFrom:    1, fadeTo: 0.0001};

                parent.audiomaster.loadAudio(master.audio_path+underlayFile,'basetrack2',0,0)

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
                            master.WAAloadAudio(master.audio_path+overLayFile,'overlay_01',-1,1);
                    })
                    .start(); 

            }else{
                    if(overLayFile)
                            master.WAAloadAudio(master.audio_path+overLayFile,'overlay_01',-1,1);
            }
        } else {
            console.log('[MODERNIZR] No web audio, NOT loading scene audio')
        }

    

    }






    /**************************************************************************
        
        > krpano mouse nav
    
    **************************************************************************/
    

    // $('#panocontainer').after('<div class="fastpan" id="fastpanleft"/><div class="fastpan" id="fastpanright"/><div class="fastpan" id="fastpantop"/><div class="fastpan" id="fastpanbottom"/>')
    $('#panocontainer').after('<div class="fastpan" id="fastpanleft"/><div class="fastpan" id="fastpanright"/>')


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

            scrollPercent = Math.ceil((walkthrough.scrollValue / (5000-$(window).height())) * 100);

            if(sequenceHasWords) {
                var zPos = walkthrough.scrollValue*.4
                $('#word-container').css('-webkit-transform', 'translateZ(' + zPos * 1.6 + 'px)');

                $('#word_01').css('-webkit-transform', 'translateZ(' + zPos * 1.6 + 'px)');
                $('#word_01').css('opacity', walkthrough.percent);
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

        

            //var sequenceAnimFrame = requestAnimationFrame(scrollerFunction)

        } // scrollerFunction


    /**************************************************************************
        
        > FrameRunner
    
    **************************************************************************/
    
        
    var runFrameRunner = function(){

        //// console the pano mouse interaction, loadPanoScene turns this on, loadSequence Scene turns this off

            requestAnimationFrame(runFrameRunner);

            // update current time for hallway voiceover
            if(master.globalPano == 'hallway' && pano) {
                pano.voiceCurrentTime = (new Date() - pano.voiceStartTimer)/1000
               //console.log(pano.voiceCurrentTime/1000)
            }


            if(parent.location.hash.slice(1).indexOf('sequence') != -1){
                scrollerFunction()
                return false
            }

            if(that.walkthroughPlaying) {
                scrollerFunction()
            }

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
            
            if(!navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false){
                for ( var i = 0, l = parent.audiomaster.mix.tracks.length; i < l; i++ ){                                                
                    parent.audiomaster.mix.tracks[i].play()                                    
                }  
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



var loadAFXPano = function (_file, _start){

    if(!_start) _start = 0

    if(Modernizr.webaudio) {
        master.AFXloadAudio( master.audio_path + _file,'overlay_02',0,1.0, _start)
    } else {
        console.log('[MODERNIZR] No web audio, NOT loading AFX')
    }
    
}




var pano = new pano_master();




