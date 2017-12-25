<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>Umbrella?</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />

   <link href="css/fonts/stylesheet.css" rel="stylesheet" />
	<link href="css/style.css" rel="stylesheet" />
   <link href="css/rain.css" rel="stylesheet" />

   <script src="js/jquery.min.js"></script>
   <script defer src="js/fontawesome.min.js"></script>
   <script defer src="js/fa-regular.min.js"></script>
   <script src="js/script.js"></script>
   <script src="js/rain.js"></script>
</head>

<body>

   <div class="out">
      <div class="in">
         <h1><i class="big-icon far fa-circle-notch fa-spin"></i></h1>
         <div class="suggestion"></div>
      </div>
   </div>

   <div class="drops front-row"></div>
   <div class="drops back-row"></div>

	<footer><i class="far fa-location-arrow"></i> <span id="location"></span> <input type="button" class="locate" id="locate" value="Update location" /></footer>

</body>
</html>
