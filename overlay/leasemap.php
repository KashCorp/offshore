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

    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-35229652-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>

  <style>

        body {
            background: rgba(0,0,0,0.5);
        }

        #map-container, #image-container {
            position: absolute;
            width: 1720px; 
            text-align: center;
            color:#ffffff;
            display:block;
            -webkit-transform-style: preserve-3d;
            -moz-transform-style: preserve-3d;
            -o-transform-style: preserve-3d;
         
        }

        #map-container {
                -webkit-transform: translateZ(-500px)
        }

        #image-container {
                -webkit-transform: translateZ(-1000px)
        }

        #map-container, #image-container ul {
            position: absolute;
            font-size: 0;
        }

        #map-container ul li {
            float: left;
            list-style-type: none;
            box-shadow: 0px 0px 0px rgba(0,0,0,.5);*/
            position:relative;
            padding:0;
            margin:-1px;
         -webkit-transform-style: preserve-3d;
            -moz-transform-style: preserve-3d;
            -o-transform-style: preserve-3d;
            
            cursor: pointer;
        }

        #image-container ul li {
            display: table;
            width:100%;
            text-align: center;
            -webkit-transform-style: preserve-3d;
            -moz-transform-style: preserve-3d;
            -o-transform-style: preserve-3d;
            list-style-type: none;
            padding:0;
            position: absolute; 
            top:0; 
            bottom:0; 
            left:0; 
            right:0;
        }

        #image-container ul li div {
            display: block;
            width:100%;
            padding:5px;
            position: absolute; 
            top:0; 
            left:0; 
            font-size: 20px;
            text-align:left;
            background: url(../images/bg_black_50.png);
        }

        #photo-container ul li img { 
            vertical-align: middle; 

        }



        .textholder {
            /*position: absolute;
            top:40%;
            left:20%;
            */
            text-align:left;
            color: #ffffff;
            font-size: 30px;
            -webkit-transform: translateZ(0px);
            background:#000000;
            border:1px solid;
            margin-bottom: 20px;
            padding:5px;
            cursor:pointer;

        }



        #scan_image_holder {
            position: absolute;
            width: 100%;
            left:0px;
            overflow:hidden;


        }

        #scan_image_lines {
            position: absolute;
            width: 100%;
            height: 100%;
            left:0px;
            opacity:.5;
            background: url(../images/bg_linematrix2x2_blue.gif);
            overflow:hidden;

        }

        .lease_maps {
            position: absolute;
            opacity: .2;
            left:0px;
            width: 100%;
        }

        .word {
            position: absolute;
            width: 100%; 
            text-align: center;
            bottom: 40%;
            color: #fff;
            font-family: 'DinRegular', Helvetica, Arial, sans-serif;
            font-size: 50px;
            text-shadow: 1px 1px 3px #000;

        }

        .cloud {
            position: absolute;
            width: 100%; 
        }

        .scroll-directions-container {
            height:        -moz-calc(100% - 100px);
            height: -webkit-calc(100% - 100px);
            height:                 calc(100% - 100px);
            margin-top: 100px;
        }

  </style>

</head>






<body>

<div class="close-overlay"></div>

<header>
  <a class="volume-toggle"><i class="icon-volume-up"></i></a>
</header>

  <div id="scroll-wrapper" class="wrapper" style="display:block">
    
    <div id="viewport">
        <div id="image-container">
            <ul>
                <li id="leasemap_05"><img src="../images/lease_map/lease_05.jpg"><div>Caribbean</div></li>
                <li id="leasemap_04"><img src="../images/lease_map/lease_04.jpg"><div>Brazil</div></li>
                <li id="leasemap_03"><img src="../images/lease_map/lease_03.jpg"><div>West Africa</div></li>
                <li id="leasemap_02"><img src="../images/lease_map/lease_02.jpg"><div>Alaska</div></li>
                <li id="leasemap_01"><img src="../images/lease_map/lease_01.jpg"><div>Gulf of Mexico</div></li>
            </ul>
        </div>
    </div>
    
    

    <a id="to-control" class="platform-nav">Close</a>

    <div class="scroll-directions-container">
        <div class="scroll-directions"></div>
    </div>
     
	</div>
   
  <div id="scroll-proxy"></div>






  <!-- JavaScripts -->

    <script type="text/javascript" src="../js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="../js/lib/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../js/lib/modernizr.min.js"></script>


    <script>

        $(document).ready(function(){

            $(".platform-nav").click(function(){
                parent.master.closeOverlay()
            })

            var isFF = !!window.sidebar;
            if(!isFF) {
                $('.close-overlay').click(function(e){
                     parent.master.closeOverlay()
             })
            }

         

            // $(function() {
            //             $( "#viewport" ).draggable();
            // });

            var setStage = function(){

                var dynamicWidth = window.innerWidth;
                var dynamicHeight = dynamicWidth * .5625;
                var dynamicTop = (window.innerHeight - dynamicHeight)/2;
                var dynamicRatio = window.innerHeight/window.innerWidth


                var percent = 0

                $.getScript("../js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
                    $( ".scroll-directions" ).draggable({ 
                        axis: "y",
                        containment: 'parent',
                        drag: function() {

                            percent = parseInt($(this).css('top')) / (window.innerHeight-300)

                            scrollFunction()
                        }
                    });
                }); 


                var transZPos = -4000

                function scrollFunction() {

                    if(percent <= 0) percent = 0.01
                    else if(percent > 1) percent = 1


                    var zPos = percent * 1000

                    //box-shadow: ;
                    //$("#map-container ul li").css("box-shadow","20px 30px "+scrollPercent*4+"px rgba(0,0,0,.5)")
                    $('#leasemap_05').css('-webkit-transform', 'translateZ(' + zPos * 1 + 'px)');
                    $('#leasemap_04').css('-webkit-transform', 'translateZ(' + zPos * 2 + 'px)');
                    $('#leasemap_03').css('-webkit-transform', 'translateZ(' + zPos * 3 + 'px)');
                    $('#leasemap_02').css('-webkit-transform', 'translateZ(' + zPos * 4 + 'px)');
                    $('#leasemap_01').css('-webkit-transform', 'translateZ(' + zPos * 5 + 'px)');


                    var current = 5 - Math.floor(percent*5)
                    var opacity = 3 - (percent*5 % 1)*3

                    // console.log('current: '+'\t'+current)

                    console.log('percent: '+'\t'+percent)

                    $('ul').children().eq(current).css('opacity',opacity)
                }


            }

            setStage()

            window.onresize = function(event) {
            setStage()
            }

        })

    </script>



</body>
</html>