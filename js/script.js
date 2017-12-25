var coordinates;
var location;

function umbrella(lat, lon) {
   $.getJSON("weather.php?lat=" + lat + "&lon=" + lon, function(data){
      // document.getElementById('temp').innerHTML = data.lat;
      console.log('data: ', data);
      document.getElementById('location').innerHTML = data.name;
      localStorage.setItem('location', data.name);
      document.getElementById('temp').innerHTML = data.main.temp + "°";
   });
}



if ( localStorage.getItem("coordinates") ) {
   coordinates = JSON.parse( localStorage.getItem('coordinates') );
   // document.getElementById('lat').innerHTML = coordinates.lat;
   // document.getElementById('lon').innerHTML = coordinates.lon;
   umbrella(coordinates.lat, coordinates.lon);
};

if ( localStorage.getItem("location") ) {
   document.getElementById('location').innerHTML = localStorage.getItem('location');
};

// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
  $("#locate").click(function(){
     // var nudge = document.getElementById("nudge");
     //
     // var showNudgeBanner = function() {
     //   nudge.style.display = "block";
     // };
     //
     // var hideNudgeBanner = function() {
     //   nudge.style.display = "none";
     // };
     //
     // var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

     var geoSuccess = function(position) {
       // hideNudgeBanner();
       // We have the location, don't display banner
       // clearTimeout(nudgeTimeoutId);

       // Do magic with location
       startPos = position;
       // document.getElementById('lat').innerHTML = position.coords.latitude;
       // document.getElementById('lon').innerHTML = position.coords.longitude;

       // Store coordinates in local storage
       // https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
       coordinates = { 'lat': startPos.coords.latitude, 'lon': startPos.coords.longitude };
       localStorage.setItem('coordinates', JSON.stringify(coordinates));

       // Retrieve the object from storage
       var retrievedObject = localStorage.getItem('coordinates');
       console.log('retrievedObject: ', JSON.parse(retrievedObject));
       umbrella(position.coords.latitude, position.coords.longitude);
     };
     var geoError = function(error) {
       switch(error.code) {
         case error.TIMEOUT:
           // The user didn't accept the callout
           // showNudgeBanner();
           break;
       }
     };

     navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  });

}
else {
  console.log('Geolocation is not supported for this Browser/OS.');
}
