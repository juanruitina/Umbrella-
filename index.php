<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>Umbrella?</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
   <link href="http://fonts.googleapis.com/css?family=Raleway:400,300,200,100,500" rel="stylesheet" />
	<link href="css/style.css" rel="stylesheet" />
</head>

<body>
   <!-- <div id="nudge">Welcome! Let us know your location and we will tell you whether you need to get your umbrella or not.</div> -->
   <!-- <div id="lat">lat</div>
   <div id="lon">lon</div> -->

	<div id="ahora" class="momento">
      <div class="out clear-night">
         <div class="in">
            <h1 id="temp"></h1>
            <p><span id="location"></span></p>
         </div>
      </div>
   </div>

	<footer><p><input type="button" id="locate" value="Update location" /></p></footer>

	<script src="js/jquery-3.2.1.min.js"></script>
   <script src="js/script.js"></script>
</body>
</html>
