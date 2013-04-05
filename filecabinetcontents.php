<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Credits | OFFSHORE</title>
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.css">
	  <link rel="stylesheet" type="text/css" href="css/jquery.booklet.1.4.0.css">

    <style>

      #web-container-wrap {
      overflow: hidden;
      position: absolute;
      left:30%;
      width:60%;
      height:100%;
      border:1px solid;
      display:none;
      }
      #web-container {


      overflow: hidden;

     
      width:100%; 
      /* 
      -ms-zoom: 1.55;
      -moz-transform: scale(1.65);
      -moz-transform-origin: 0px 0;
      -o-transform: scale(1.65);
      -o-transform-origin: 0 0;
      -webkit-transform: scale(1.65);
      -webkit-transform-origin: 0 0; 
      overflow-x: hidden;
      */
      }

        .roundabout-holder {
            list-style: none;
            padding: 0;
            margin: 0 auto;
            height: 600px;
            width: 1000px;
        }
        .roundabout-moveable-item {
            height: 550px;
            width: 900px;
            cursor: pointer;
            background-color: #ccc;
            border: 1px solid #999;
            overflow: hidden;
            position: relative;
        }
        .roundabout-in-focus {
            cursor: auto;
        }

        .rnd iframe {
            display: block;
            margin-left: -150px;
            margin-top: -92px;
            position: absolute;
            left: 0;
            top: 0;
            height: 735px;
            width: 1200px;

            -webkit-transform:scale(0.75);
            -moz-transform-scale(0.75);
        }

        .directions {
            text-align: center;;
            width: 100%;
        }
    </style>    

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

  </head>

  <body class="p-credits">
    <header>



      <a class="volume-toggle"><i class="icon-volume-up"></i></a>
    </header>

    <div id="wrapper" class="wrapper" style="margin-top:40px">

        <ul class="rnd">
           <li>
               <iframe src="http://www.offshore-mag.com/index.html" frameborder="0"></iframe>
           </li>
           <li>
               <iframe src="http://oilspill.skytruth.org/" frameborder="0"></iframe>
           </li>
           <li>
               <iframe src="http://home.versatel.nl/the_sims/rig/i-expense.htm" frameborder="0"></iframe>
           </li>
           <li>
               <iframe src="http://dog.dnr.alaska.gov/" frameborder="0"></iframe>
           </li>
           <li>
                <iframe src="http://www.bloomberg.com/apps/news?pid=newsarchive&sid=arzgBx7ydghQ&refer=home" frameborder="0"></iframe>
           </li>
        </ul>

        <div class="directions">
            <a href="#" class="previous">&lt; Previous</a> | <a href="#" class="next">Next &gt;</a>
        </div>
        

        <!-- <div id="web-container-wrap">
          <iframe id="web-container" name="web-container" src="http://home.versatel.nl/the_sims/rig/i-expense.htm" frameborder="0"></iframe>
        </div> -->
        <!-- <div id="middle_button_holder"   style="position:absolute;left:20%">  
            <img id="btn-next" src="images/arrow-next.png" style="cursor:pointer">
        </div> -->


    <div class="breadcrumb"></div>

  </div>
  <a id="to-control" class="platform-nav">Close</a>
   <div id="inter-text"></div>

    <!-- JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
	<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
	<script type="text/javascript" src="js/master-functions.js"></script>
	<script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery.countdown.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery-easing.js"></script>
	<script type="text/javascript" src="js/lib/booklet/jquery.booklet.1.4.0.js"></script>
    <script type="text/javascript" src="js/lib/jquery.roundabout.js"></script>

    <script>

      $(document).ready(function(){

        $('ul.rnd').roundabout();

        $(".next").click(function() {
            $("ul.rnd").roundabout("animateToNextChild");
            return false;
        });

        $(".directions .previous").click(function(){
            $("ul.rnd").roundabout("animateToPreviousChild");
            return false;
        });

      $("#to-control").click(function(){
        newPage('controlroom.php')
      })

        var webPos = 0
        var webArray = ['http://www.offshore-mag.com/index.html', 'http://oilspill.skytruth.org/', 'http://home.versatel.nl/the_sims/rig/i-expense.htm','http://dog.dnr.alaska.gov/', 'http://www.bloomberg.com/apps/news?pid=newsarchive&sid=arzgBx7ydghQ&refer=home']

        $("#btn-next").click(function(){
            $("#web-container-wrap").fadeOut(700, function() {

            //window.frames["web-container"].location = webArray[webPos]
            $("#web-container")[0].src = webArray[webPos]
                $('#web-container').load(function () {

             if(webPos < webArray.length-1){
              webPos++
             }else{
              webPos = 0
             }
             $("#web-container-wrap").delay(200).fadeIn(700)
             
            });

             

            })
        })


		master.blankTrans()
		master.videoTrans("video/transitions/LA201_1_colorcorrect.webm","true")

		master.setDeepLinking("filecabinetcontents.php")

       	var setStage = function(){

         var dynamicWidth = window.innerWidth;

         var dynamicHeight = dynamicWidth * .5625;

         var dynamicTop = (window.innerHeight - dynamicHeight)/2;
         $("#middle_button_holder").css("top", window.innerHeight/2-100)


          $("#web-container-wrap").css("top",dynamicTop)
          $("#web-container-wrap").css("height",window.innerHeight-40)
          

     	}

      setStage()
      window.onresize = function(event) {
      setStage()
      }
});

    </script>

  </body>
</html>