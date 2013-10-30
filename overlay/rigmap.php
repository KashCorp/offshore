<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OFFSHORE | Wirefame Waves</title>
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="Coming soon: OFFSHORE, an interactive documentary about the next chapter of oil exploration and exploitation">
    <meta name="author" content="">

    <link rel="image_src" href="../images/bg_drillhead.jpg" />
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/font-awesome.css">

<style>

  #map-container {
    position: relative;
    
    margin-top: 25px;
    margin-left: 25px;

    width: 100%;
    height: 100%;

    text-align: center;
    color:#ffffff;
    display:block;

  }

    /* Image */

    .map_image {
      width: 100%;
      height: 100%;
      position: absolute;
      background-repeat: no-repeat;
      background-image: url(../images/rig_map/RIGMAP.jpg);
      background-size: cover;
      background-position: center center;

    }

    .overlay_image {
      width: 100%;
      height: 100%;
      position: absolute;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }

    @media (-webkit-min-device-pixel-ratio: 2),(min-resolution: 192dpi),(min-width: 1024px) {
      .map_image {
        background-image: url(../images/rig_map/RIGMAP@2x.jpg);
      }
    }

    /******* Labels *******/

    .map_labels {
    }

      .map_labels div,
      .map_legend div span {
        width: 25px;
        height: 25px;
        border-radius: 100%;
        cursor: pointer;
        
        font: 20px/29px 'DinRegular', Helvetica, Arial, sans-serif;
        font-weight: bold;
        text-align: center;
      }


      .map_labels div {
        position: absolute;
        color: #ecc60a;
        background: black;
      }

        .no-touch .map_labels div:hover, 
        .no-touch .map_labels div.hover {
          color: black;
          background: #ecc60a;
        }
      

      /******* Here Label Positions *******/
  
      .hereLabel {
        position: absolute;
        display: none;
        background: #ecc60a;
        padding: 0.25% 0.5%;

        -webkit-transition: opacity 1s ease-out;
        -moz-transition: opacity 1s ease-out;
        -ms-transition: opacity 1s ease-out;
        -o-transition: opacity 1s ease-out;
        transition: opacity 1s ease-out;
        
      }

      .hereLabel .text {
        
        display: inline-block;
        position: relative;

        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;

        text-align: left;
        font-weight: bold;
        letter-spacing: -1px;
        white-space: nowrap;
        text-align: center;
        color: black;
        font-size: 0.8em;
      }

      .hereLabel .disc {
        width: 0.8em;
        height: 0.8em;
        border-radius: 100%;
        background: black;
        display: inline-block;
        position: relative;
        margin: -0.05em 0;
      }

      .hereLabel .arrow {
        width: 0;
        height: 0;
        border-left: .3em solid transparent;
        border-right: .3em solid transparent;
        border-top: .6em solid #ecc60a;
        margin: .2em auto;
      }

      .hereLabel.platform {
        left: 42.5%;
        top: 15.5%;
        display: block;
      }

      .hereLabel.lowerplatform {
        left: 47%;
        top: 18.5%;
        display: block;
      }

      .hereLabel.hallway {
        left: 55%;
        top: 36%;
        display: block;
      }

      .hereLabel.boat {
        left: 76%;
        top: 54%;
        display: block;
      }

      .hereLabel.controlroom {
        left: 57%;
        top: 10%;
        display: block;
      }

      .hereLabel.theatre {
        left: 54%;
        top: 45%;
        display: block;
      }

      .hereLabel.chemicalroom {
        left: 53%;
        top: 54%;
        display: block;
      }

      .hereLabel.subhangar {
        left: 62%;
        top: 60%;
        display: block;
      }




    /******* Legend *******/
    
    .map_legend {
      position: absolute;
      top: 23.659306%;
      left: 5.8%;
      width: 27.5%;
    }

      .map_legend div {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        
      }

      .map_legend .outer {
        width: 100%;

        padding: 4% 0;
        cursor:pointer;
        
        text-align:left;
        font-weight: bold;
        letter-spacing: -1px;
        white-space: nowrap;

        
      }

      .map_legend .inner {
        padding: 2% 3%;
        background-color: #000000;
        color:#ecc60a;
      }

      /*.map_legend .inner span {
        display: inline-block;
        background: #ecc60a;
        color: black;
      }*/

      .no-touch .map_legend .outer:hover .inner, 
      .no-touch .map_legend .hover .inner {
        color: black;
        background: #ecc60a;
      }

      .map_legend .visited .inner { 
        color: #949494;
        background:#6B6661;
      } 

      .map_legend .inner.here { 
        background: #ecc60a !important;
        color: black;
      }



</style>

</head>

<body class="platform" style="background:none">

  <!-- Rig Map -->


  <div id="map-container"> 
    
    <div class="map_image"></div>
    

    <div class="overlay_image"></div>

    <div class="hereLabel">
      <div class="text">You are here</div>
      <div class="disc"><div class="arrow"></div></div>
    </div>

    
    <!-- <div class="map_labels">
      <div class="platform"     data-url="platform"     data-url="platform">1</div>
      <div class="hallway"      data-url="hallway"      data-url="hallway">2</div>
      <div class="boat"         data-url="boat"         data-url="boat">3</div>
      <div class="controlroom"  data-url="controlroom"  data-url="controlroom">4</div>
      <div class="theater"      data-url="theatre"      data-url="theater">5</div>
      <div class="chemicalroom" data-url="chemicalroom" data-url="chemicalroom">6</div>
      <div class="subhangar"    data-url="subhangar"    data-url="subhangar">7</div>
    </div> -->


    <div class="map_legend">
      <div class="outer platform"        data-url="platform"      id="t3" ><div class="inner">Flight Deck</div></div>
      <div class="outer lowerplatform"   data-url="lowerplatform" id="t1" ><div class="inner">Lower Platform</div></div>
      <div class="outer hallway"         data-url="hallway"       id="t5a"><div class="inner">Terminus</div></div>
      <div class="outer boat"            data-url="boat"          id="t8" ><div class="inner">Boat Deck</div></div>
      <div class="outer controlroom"     data-url="controlroom"   id="t4" ><div class="inner">Control Room</div></div>
      <div class="outer theater theatre" data-url="theatre"       id="t5b"><div class="inner">Theatre</div></div>
      <div class="outer chemicalroom"    data-url="chemicalroom"  id="t6" ><div class="inner">Chem-Storage</div></div>
      <div class="outer subhangar"       data-url="subhangar"     id="t7" ><div class="inner">Submersible Hangar</div></div>
    </div>

  </div>


  <a id="to-control" class="platform-nav">Close</a>

  <!-- JavaScripts -->

  <script type="text/javascript" src="../js/lib/jquery.min.js"></script>
  <script type="text/javascript" src="../js/lib/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../js/lib/modernizr.min.js"></script>


  <script>

    $(document).ready(function(){

      var defaultOverlay = '';

      // Preload ********************************************************

      var img = new Image;
      $('.map_legend').children().each(function(){
        img.src = '../images/rig_map/overlay-' + $(this).data('url') + '.png'
      })


      // Visited ********************************************************

      //console.log(parent.pano.visited)
      
      var visited = JSON.parse(localStorage.getItem('offshoreVisitedPanos'));
      if(visited){
        if(visited.platform     === true) $('.map_legend > .platform').addClass('visited')
        if(visited.lowerplatform=== true) $('.map_legend > .lowerplatform').addClass('visited')
        if(visited.hallway      === true) $('.map_legend > .hallway').addClass('visited')
        if(visited.boat         === true) $('.map_legend > .boat').addClass('visited')
        if(visited.controlroom  === true) $('.map_legend > .controlroom').addClass('visited')
        if(visited.theatre      === true) $('.map_legend > .theatre').addClass('visited')
        if(visited.chemicalroom === true) $('.map_legend > .chemicalroom').addClass('visited')
        if(visited.subhangar    === true) $('.map_legend > .subhangar').addClass('visited') 
      }


      // You Are Here ********************************************************

      $('.map_legend').children().each(function(){
        var url = $(this).data('url')
        if(url === parent.master.globalPano) {

          $(this).addClass('here')
          defaultOverlay = 'url(../images/rig_map/overlay-' + url + '.png)'
          $('.overlay_image').css('background-image',defaultOverlay)

          $('.hereLabel').addClass(url)
        }
      })
      


      // UI ********************************************************

      $("#to-control").click(function(e){
        e.stopPropagation();
        parent.master.closeOverlay()
      })

      $('body').click(function(e){
        e.stopPropagation();
        if( $(e.target).is('body') ) 
          parent.master.closeOverlay()
      })

      $("#map-container ul li, .map_legend .outer, .map_labels .outer").click(function(e){
        e.stopPropagation();
        if($(this).data("url")) {
          if( $(this).data("url") == parent.master.globalPano ) {
            parent.master.closeOverlay()  
          } else {
            parent.master.closeOverlay($(this).data("url"))
          }
        }
      })


      // Map Overlay Hovers ********************************************************

      $('.map_legend div').on('mouseover',function(){
        $('.overlay_image').css('background-image','url(../images/rig_map/overlay-' + $(this).data('url') + '.png)')
      })

      $('.map_legend div').on('mouseout',function(){
        $('.overlay_image').css('background-image',defaultOverlay)
      })

      // $('.map_labels div').on('mouseover',function(){
      //   // console.log($(this).attr('class'))
      //   $('.map_legend').find('div.' + $(this).attr('class')).addClass('hover')
      // })

      // $('.map_labels div').on('mouseout',function(){
      //   $('.map_legend').find('div.' + $(this).attr('class')).removeClass('hover')
      // })


      // jQuery UI Draggability ********************************************************

      if(parent.master.isIOS) {
        $(document).on('touchmove', function(e) { e.preventDefault(); });  
      }
      else {
        $.getScript("../js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
          $( "#map-container" ).draggable({
            contain: "parent"
          });
        });
        $('body').addClass('no-touch')
      }



      // Responsivity ********************************************************

      var resizetimeout;

      function debounceResize(){
        if(resizetimeout) clearTimeout(resizetimeout);
        resizetimeout = setTimeout(resize, 50)
      }

      resize = function(){

        var ratio = 615/850,
            w, h, t, l;
      
        // CONTAIN
        w = (window.innerWidth-50);
        h = w * ratio;
      
        if(h > (window.innerHeight-50) ) {
          h = (window.innerHeight-50);
          w = h / ratio;
        }
      
        t = ((window.innerHeight-50) - h) / 2;
        l = ((window.innerWidth-50) - w) / 2;

        // Apply dynamic sizing ********************************************************

        $('#map-container').css({
          width:  Math.round(w),
          height: Math.round(h),
          top:    Math.round(t),
          left:   Math.round(l)
        })

        $('body').css({ // 20 px / 850
          'font-size': w * .023529412
        })

        $('.map_labels > div, .map_legend > div > span').css({
          width: w * .029411765,
          height: w * .029411765,
          'font-size' : w * .023529412,
          'line-height' : '145%'
        })

      }

      $(window).on('resize.global',debounceResize)
      window.addEventListener('onorientationchange', debounceResize);

      resize();
      

    })

  </script>



</body>
</html>