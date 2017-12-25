<?php
include 'apikey.php';

if ( isset($_GET["lat"]) && isset($_GET["lon"]) ) {
   $API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?appid=';
   $url = $API_ENDPOINT . $api_key . '&lat=' . $_GET['lat'] . '&lon=' . $_GET['lon'] . '&units=metric';
   print_r( file_get_contents($url) );
}
?>
