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

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.booklet.1.4.0.css">

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

  <body class="p-credits"  style="background:none">
    <header>



      <a class="volume-toggle"><i class="icon-volume-up"></i></a>
    </header>

    <div id="wrapper" class="wrapper" style="display:block">

      <div id="scan_image_holder">
        

      <div id="scan_image_lines"></div>

      </div>

	<div class="book">
			<div>
				<h3></h3>
			</div>

			<div>
				<div class="bookpage">
					<p class="bookline"><span>OFFSHORE TRANSIT LOG: Flight AC201209/08</span></p>
					<p><span>Departed: Onshore Lot 42:</span> 07/09/12 13.01hrs</p>
					<p><span>Arrived: Offshore Rig 208::</span>07/09/12 18.33hrs</p>
          <p><span>Flight Crew:</span>N/A</p>
					<p><span>Flight conditions:</span> Overcast, Wind 15kts,NNE</p>
					<p><span>Comments:</span> none</p>
				</div>
			</div>

			<div>
				<div class="bookpage">
					<p class="bookline"><span>PASSENGER MANIFEST: currently on board Rig 208</span> </p>
					<p><span>OFFSHORE is created by<span></p>
					<p> Brenda Longfellow, Glen Richards, Helios Design Labs</p>
					<br>
					<p><span><a style="color:#000" href="http://www.heliozilla.com" target="_new">Helios Production Team</a><span></p>
					<p><span>Producer:</span> Sarah Arruda</p>
					<p><span>Interactive/Technical Director:</span> Mike Robbins</p>
					<p><span>Creative Director:</span> Alex Wittholz</p>
					<p><span>Graphic Design:</span> Felix Wittholz, Joanna Durkalec</p>
					<p><span>3D Programming:</span> Matt Brushett, Marc Pannozzo</p>
					<p><span>Web Programming:</span> Mike Robbins, Daniel Sundy</p>
				</div>
			</div>

			<div>
				<div class="bookpage">
				 <p class="bookline"><span>PASSENGER MANIFEST: currently on board Rig 208</span></p>
         <p class="bookline"><span>Documentary Team</span></p>
					<p><span>Documentary Editor:</span> Glen Richards</p>
					<p><span>Cinematographer, Louisiana:</span> Ed Holub</p>
					<p><span>Music:</span> Antoni Komasa-Łazarkiewicz </p>
					<p><span>Sound Design:</span> Cypher Audio </p>
					<p><span>Consultant / Story Editor:</span> John Jordan</p>
					<p><span>Consultant</span> Anna Zalik</p>
				</div>
			</div>

			<div>
				<div class="bookpage">
				 <p class="bookline"><span>PASSENGER MANIFEST: currently on board Rig 208</span></p>
         <p><span>Thanks to</span></p>
				 <p>Gulf Restoration Network, Greenpeace International</p>
				</div>

			</div>

				<h3></h3>
			</div>
    <!--<div id="wrapper" class="wrapper">
    	 <div class="countdownhatch"></div>

      <ul class="nav">
        <li><a href="blog"><img src="images/nav/blog.png" alt="Helipad"></a></li>
      </ul>

    </div>--><!-- /.wrapper -->
   <a id="to-control" class="platform-nav">Close</a>

    <div class="breadcrumb"></div>

  </div>


    <!-- JavaScripts -->
	<script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
	<script type="text/javascript" src="js/lib/booklet/jquery.booklet.1.4.0.js"></script>

    <script>
      $(document).ready(function(){
      	
     $("#to-control").click(function(){
        parent.master.closeBook()
      })


		$(function(){
			$('.book').booklet({
				closed: true,
				autoCenter: true,
				covers: true,
				width:900,
				height:550,
				arrows: true
			});
		});

	});



    </script>

  </body>
</html>