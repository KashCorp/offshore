/**************************************************************************
    
    Pano Functions
    

    > Sections

        Pano Load Sequence:
            Hash Change
            Load Pano Scene
            (Load Sequence Scene)

        Load Video Matrix

        Load Scene Audio

        Krpano Mouse Nav

        Image Sequence Controller

        FrameRunner


**************************************************************************/



var globalPano;

function krpanoReady() {

    if (parent.location.hash.slice(1) == "")
        pano.loadPanoScene('prologue')
    else 
        pano.loadPanoScene(parent.location.hash.slice(1))
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

    if(Modernizr.webaudio === true) {
        console.log('[MODERNIZR] Web Audio Supported')
        that.noWebAudio = false
    } else {
        console.log('[MODERNIZR] Web Audio NOT Supported')
        that.noWebAudio = true;
    }


    this.visited = JSON.parse(localStorage.getItem('offshoreVisitedPanos'));

    if(!this.visited){

        console.log("setting localStorage visited pano data for the first time")
        this.visited = { // this gets cached in localStorage
            platform : false,
            lowerplatform : false,
            hallway : false,
            boat: false,
            controlroom : false,
            theatre : false,
            chemicalroom : false,
            subhangar : false
        }
        localStorage.setItem('offshoreVisitedPanos',JSON.stringify(this.visited))

    } else {
        console.log("visited pano data:")
        console.log(this.visited)
    }


    var scrollTrigger,
        scrollPercent=0,
        sequenceHasWords,
        linkForward, 
        linkBack;

    var overLayFile, underlayFile, underlayMute, underlayMuted
            

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

        embedpano({swf:swfLoc,  id:"krpanoObject", xml:xmlLoc, wmode: "transparent", target:"panocontainer", html5:"auto", passQueryParameters:true}); 

    krpano = document.getElementById("krpanoObject");

    if(extcontrol) extcontrol.krpanoloaded();
    if(autopilot)  autopilot.krpanoloaded();

    master.debouncedResize();






    /**************************************************************************
        
        New pano load logic sequence:

        1. hash change event listener
        2. loadPanoScene
       (3. if image sequence - diverts to LoadSequenceScene)


    **************************************************************************/
    


    /**************************************************************************
        
        > Hash Change

    **************************************************************************/
   

    $(parent).bind('hashchange', function(){

        console.log('\\\ hash change ///')
        var hash = parent.location.hash.slice(1);

        if(extcontrol) if(extcontrol.role === 'master') {
          extcontrol.hashChange({ "hash": hash });
        }

        if(master.globalPano === hash) {
            console.log('#nowhere')
            return false;
        }

        if (hash == "") {
            that.loadPanoScene('prologue')
            return false
        }
            
        $("#walking-canvas-pano").addClass('hide')

        that.loadPanoScene(hash)

    })

    // coming in from a deeplink

    var deeplinkfunction = function(){

        console.log('deeplinkfunction')

        window.clearTimeout(deeplinktimeout)

        krpano = document.getElementById("krpanoObject");

        deeplinktimeout = window.setTimeout(function(){

            // make sure krpano has had a chance to load
            //

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

   // deeplinkfunction();

    



    /**************************************************************************
        
        > Load Pano Scene
    
    **************************************************************************/
    

    this.loadPanoScene = function(_pano) {

        if(extcontrol) if(extcontrol.role === 'master') {
          extcontrol.hashChange({ "hash": _pano });
        }

        master.globalPano = _pano

        var d = document.location;
        _gaq.push(['_trackPageview', '/'+ _pano])

        $("#loading").hide();

        $wrapper.removeClass('hide')
        $panocontainer.removeClass('hide')

        that.panoWalkthrough = null;
        that.walkthroughPlaying = false;
        that.video_underlay = false;

        $('.pan-directions').hide();
        if(that.panDirectionsShown === false) $('.pan-directions').show();


        // Ghost Functions
        if(that.ghostTransition) that.ghostTransition.killGhost();
        if(that.walkthrough) that.walkthrough = false;

        $('#ghost-canvas-trans').fadeOut()

        if(!master.overlayOpen) $compass.show()

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



        $('.scroll-directions').css('top',0)

        $('.panoversion').hide();

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

        
        krpano = document.getElementById("krpanoObject");
        krpano.call('action(' + _pano + ')')

        // should add a krpano lookto call here, sometimes loads looking at ceiling
        // krpano.call('lookto(0,0,90)'); // lookto(horizontal, vertical, fov)

        krpano.set('view.fov','90');
        krpano.set('view.vlookat','0');

       //},1000)

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
                
                console.log('that.voiceStartTimer: '+'\t'+that.voiceStartTimer)
                console.log('that.voiceCurrentTime: '+'\t'+that.voiceCurrentTime)

                loadAFXPano('One_Big_Ball_of_Fire', that.voiceCurrentTime)
                overLayFile  = 'Main_Hallway' + master.audioType
                underlayFile = 'Drone_2_norm' + master.audioType

                $panocontainer.after('<img id = "gradient" class="dynamic" src="images/overlay_gradient_blue_upside_down.png" style="pointer-events:none;bottom:0px; display:block; position: absolute;width:100%;height:40%;opacity:0.7"></div>')

                that.video_underlay = true;
            break;

            case "subhangar" : 
                that.visited.subhangar = true;

                overLayFile = 'SubRoom' + master.audioType
                underlayFile = 'Drone_3' + master.audioType

                // walkthrough
                $("#walking-canvas-pano").removeClass('hide')
                scrollTrigger=false;
                if(master.isIOS || master.isAndroid){
                   $('#walking-canvas-pano').css('display','none')
                    
                }
                that.panoWalkthrough = new Walkthrough("walking-canvas-pano","approaching",3); 
                $('.hotspot').addClass('requiem')

                break;

            case "submarine" :
                setTimeout(function(){
                    $panocontainer.before('<div class="dynamic underwater-hanger"></div><video autoplay class="dynamic hide fade video-underlay" id="video-underwater" preload="auto"></video>')
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
                scrollTrigger=false;
                $("#walking-canvas-pano").removeClass('hide')
                that.panoWalkthrough = new Walkthrough("walking-canvas-pano","engineroom",15);
                $('.hotspot').addClass('engineroom')

                // that.panoWalkthrough = new Walkthrough("walking-canvas-pano","engineroom",24.0) // canvasID, name, duration
                break;    

            case "controlroom" : 
                that.visited.controlroom = true;

                overLayFile = 'russian_radio' + master.audioType
                
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
    

    var loadSequenceScene = function(_sequence) {

        console.log('loadSequenceScene -- ' + _sequence)

        var name,
            ghost,
            ghostFrames,
            movieLength;

        sequenceHasWords = false;

        // clear word container
        $('#word-container ul').html('')

        $wrapper.addClass('hide')
        $panocontainer.removeClass('show').addClass('hide')

        switch(_sequence){

          case "sequence_passage_chemicalroom" : 

                name = 'corridor';
                movieLength = 5;

                ghost = 'hologram_2guys_walk_away 3-frame-';
                ghostFrames = 12

                linkBack = 'hallway'
                linkForward = 'chemicalroom' 

                overLayFile = 'Hatch_Alt2' + master.audioType
                break;

          case "sequence_passage_theatre" : 

                name = 'corridor';
                movieLength = 5;

                ghost = 'hologram_2guys_walk_away 2-frame-';
                ghostFrames = 12

                linkBack = 'hallway'
                linkForward = 'theatre'

                overLayFile = 'Hatch_Alt2' + master.audioType
                break;


           case "sequence_passage_controlroom" : 

                name = 'corridor';
                movieLength = 5;

                ghost = 'hologram_helicopter-frame-';
                ghostFrames = 12

                linkBack = 'hallway'
                linkForward = 'controlroom' 

                overLayFile = 'Hatch_Alt2' + master.audioType
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
 
                overLayFile = 'Hatch_Alt2' + master.audioType
                break;       
        }

        if(!master.isMSIE) that.loadSceneAudio()
        
        if(ghost) {
            console.log('GHOST')
            that.ghostTransition = new ghostFunctions("ghost-canvas-trans",ghost,ghostFrames)
            that.ghostTransition.imageSequencer()
        }

        $('#loading').fadeOut()
        $('#scroll-wrapper').fadeIn()

        $("#scroll-start").click(function(){ newPano(linkBack) });
        $("#scroll-end")  .click(function(){ newPano(linkForward) });

        $("#walking-canvas").css("top", master.globals.contain.t )

        console.log("Start Walkthrough")

        that.walkthrough = new Walkthrough("walking-canvas", name, movieLength)

        that.walkthrough.scrollPos   = 0;
        that.walkthrough.scrollValue = 1;

        scrollTrigger = false;
        scrollPercent = 0;
        
    }






    /**************************************************************************
        
        > Load Video Matrix

    **************************************************************************/
 


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
            $('.movie-menu').append('<div class="viewedContentDiv movie-menu-item">Viewed Content</div>')
            $('#video-overlay').after('<div class="loading" id="movieloading"></div>');
        },
        error : function(request,error) {
            console.log(error)
        }
    });




 

    //$('.wrapper').append("<div class='pan-directions'/>")


    /**************************************************************************
    ***************************************************************************
        
        > Load Scene Audio
    
    ***************************************************************************
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

                var dummysound = { fadeFrom:    1, fadeTo: 0.0001};

                parent.audiomaster.loadAudio(master.audio_path+underlayFile,'basetrack2',0,0)

                var driftTweenSound = new TWEEN.Tween( dummysound ).to( { fadeFrom: 0, fadeTo:1 * multix}, 3000 )
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
                var dummysound;
                
                if(overlayTrack) {
                    if(that.noWebAudio) dummysound = { decayFrom: overlayTrack.options.element.volume};
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

                if(that.noWebAudio) {

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
    ***************************************************************************
        

        > krpano mouse nav
    

    ***************************************************************************
    **************************************************************************/
    
    // $panocontainer.after('<div class="fastpan" id="fastpanleft"/><div class="fastpan" id="fastpanright"/><div class="fastpan" id="fastpantop"/><div class="fastpan" id="fastpanbottom"/>')
    $panocontainer.after('<div class="fastpan" id="fastpanleft"/><div class="fastpan" id="fastpanright"/>')


    var krpano,

        mouse_start_x = 0,
        mouse_start_y = 0,
        mouse_start_x_end = 0,
        mouse_start_y_end = 0,
        mouse_x_diff = 0,
        mouse_y_diff = 0,

        driftTweenH, 
        driftTweenV,

        panAmount = 0, 
        yawAmount = 0,

        interactive = null,

        panX,
        panY,
        fov;

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

        if (!krpano) return
        
        e.touches = [{clientX: e.clientX, clientY: e.clientY}];
        actionDownTouch(e);

    } 

     function actionDownTouch( e ) {

        if (!krpano) return
        
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

        var dummy =  { decayX: mouse_x_diff};
        var dummyv = { decayY: mouse_y_diff};

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

        - what do we still use this for?
    
    **************************************************************************/

    var $wordContainer = $('#word-container');

    function scrollerFunction(){

        if(!that.walkthrough && !that.walkthroughPlaying) return;

        if(that.panoWalkthrough) {
            walkthrough = that.panoWalkthrough;
            
            // if(walkthrough.autoplay) {
            //     walkthrough.play();
            // }
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

        if(master.globalPano === 'hallway' && pano) {

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
        if(parent.audiomaster) { 
            
            // if(!navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false){
            if(!master.isIOS){
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



        // ********************************************************
        // krpano view

        if(krpano != null) {

            if(panAmount != 0) {
                panX = krpano.get('view.hlookat') + panAmount
                krpano.set('view.hlookat',panX)
            }

            if(yawAmount != 0){
                panY = krpano.get('view.vlookat') + yawAmount //*.3
                krpano.set('view.vlookat',panY)
            }



            // ********************************************************
            // External Control Module

            if(extcontrol) {
                if(extcontrol.role === 'master'){

                    extcontrol.sync_data.panX = krpano.get('view.hlookat');
                    extcontrol.sync_data.panY = krpano.get('view.vlookat');
                    extcontrol.sync_data.fov  = krpano.get('view.fov');

                    extcontrol.sync_view();

                } else if(extcontrol.role === 'slave') {

                    if(extcontrol.sync_data) {
                        krpano.set('view.hlookat', extcontrol.sync_data.panX)
                        krpano.set('view.vlookat', extcontrol.sync_data.panY)
                        krpano.set('view.fov',extcontrol.sync_data.fov)
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

                  
    runFrameRunner();

}









