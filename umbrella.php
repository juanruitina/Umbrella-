<?php
include 'apikey.php';
// /weather.php?lat=43.3563567&lon=-5.8364711

if ( isset($_GET["lat"]) && isset($_GET["lon"]) ) {
   function get_api($api) {
      global $api_key;
      $API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/'. $api . '?appid=';
      $url = $API_ENDPOINT . $api_key . '&lat=' . $_GET['lat'] . '&lon=' . $_GET['lon'] . '&units=metric';
      if ( isset($_GET["lang"]) ) {
         $url = $url . '&lang=' . $_GET["lang"];
      }
      $obj = json_decode( file_get_contents($url) );
      return $obj;
   }

   $weather = get_api("weather");

   $umbrella = NULL;
   $umbrella["name"]          = $weather->name;
   $umbrella["datetime"]      = time();
   $umbrella["info_datetime"] = $weather->dt;
   $umbrella["temp"]          = round( $weather->main->temp );
   $umbrella["description"]   = $weather->weather[0]->description;
   $umbrella["clouds"]        = $weather->clouds->all / 100;
   if ( $weather->dt > $weather->sys->sunrise && $weather->dt < $weather->sys->sunset ) {
      $umbrella["day"] = 1;
   } else {
      $umbrella["day"] = 0;
   }

   $umbrella["rain"] = 0;
   if ( $weather->weather[0]->main == "Rain" ) {
      $umbrella["rain"] = 1;
      $umbrella["rain_eta"] = 0;
   } else {
      $forecast = get_api("forecast");
      for ($x = 0; $x <= 3; $x++) {
         if ( $forecast->list[$x]->weather[0]->main == "Rain" ) {
            $umbrella["rain"] = 1;
            $umbrella["rain_eta"] = round ( ( $forecast->list[$x]->dt - $umbrella["datetime"] ) / 3600 );
            break;
         }
      }
   }

   print_r( json_encode($umbrella) );
}
?>
