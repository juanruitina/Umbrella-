var coordinates;
var location;
var suggestion;

function umbrella(lat, lon) {
   $.getJSON("umbrella.php?lat=" + lat + "&lon=" + lon, function(data){
      // console.log('data: ', data);
      document.getElementById('location').innerHTML = data.name;
      localStorage.setItem('location', data.name);

      $('body').removeClass();
      $('.big-icon').removeClass('fa-circle-notch fa-spin');
      killTheRain();

      if ( data.day != 1 ) {
         $('body').addClass('night')
      } else {
         $('body').addClass('day')
      }

      if ( data.rain == 1 && data.rain_eta == 0 ) {
         $('body').addClass('rain');
         makeItRain();
      } else {
         if ( data.clouds >= 0.5 ) {
            $('body').addClass('cloudy')
         } else if ( data.clouds >= 0.2 ) {
            $('body').addClass('partly-cloudy')
         } else {
            $('body').addClass('clear')
         }
      }

      if ( data.rain == 1 ) {
         $('.big-icon').addClass('fa-umbrella')
      } else {
         if ( data.clouds >= 0.5 ) {
            $('.big-icon').addClass('fa-cloud')
         } else if ( data.day != 1 ) {
            $('.big-icon').addClass('fa-moon')
         } else {
            $('.big-icon').addClass('fa-sun')
         }
      }
      if ( data.rain == 1 ) {
         if ( data.rain_eta == 0 ) {
            suggestion = '<p>It\'s raining.</p><p>Please, take your umbrella.</p>'
         } else if ( data.rain_eta < 3 ) {
            suggestion = '<p>It\'ll start raining soon.</p><p>Please, take your umbrella.</p>'
         } else {
            suggestion = '<p>It\'ll rain in some hours.</p><p>Please, consider taking your umbrella.</p>'
         }
      } else {
         suggestion = '<p>It seems it won\'t rain any time soon.</p>'
      }
      suggestion = suggestion + '</p>It\'s ' + data.temp + '°C outside.</p>';
      $('.suggestion').html(suggestion);

   });
}

window.onload = function(){
   if ( localStorage.getItem("coordinates") ) {
      coordinates = JSON.parse( localStorage.getItem('coordinates') );
      umbrella(coordinates.lat, coordinates.lon);
   };

   if ( localStorage.getItem("location") ) {
      document.getElementById('location').innerHTML = localStorage.getItem('location');
   };

   // check for Geolocation support
   if (navigator.geolocation) {
     // console.log('Geolocation is supported!');
     $("#locate").click(function(){
        var geoSuccess = function(position) {

          startPos = position;

          // Store coordinates in local storage
          // https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
          coordinates = { 'lat': startPos.coords.latitude, 'lon': startPos.coords.longitude };
          localStorage.setItem('coordinates', JSON.stringify(coordinates));
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
}
