<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>Umbrella?</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
   <link rel="manifest" href="manifest.json">

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
         <h1 class="big-icon"></h1>
         <div class="suggestion"></div>
      </div>
   </div>

   <div class="drops front-row"></div>
   <div class="drops back-row"></div>

	<footer><i class="far fa-location-arrow"></i> <span class="location"></span> <input type="button" class="btn locate" value="Update" /></footer>

   <!-- <div class="modal-background"></div> -->

   <div class="modal">
      <div class="modal-container">
         <div class="modal-text"><p><strong>Hi! Want to know if you'll need an umbrella?</strong></p><p>Please, allow the app to access your location. We won't store any information.</p></div>
         <input type="button" class="btn locate modal-button" value="Check location" />
      </div>
   </div>


</body>
</html>
