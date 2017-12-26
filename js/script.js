var coordinates;
var location;
var suggestion;

function locate() {
   $('.modal').slideUp( 400 );
   if ( navigator.onLine == false ) {
      errorModal('<strong>Oops, are you offline?</strong> Please, check you’re connected to the Internet','Retry');
   } else {
      if (navigator.geolocation) {
         var startPos;

         var geoSuccess = function(position) {
            startPos = position;

            // Store coordinates in local storage
            // https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
            coordinates = { 'lat': startPos.coords.latitude, 'lon': startPos.coords.longitude };
            localStorage.setItem('coordinates', JSON.stringify(coordinates));
            umbrella(position.coords.latitude, position.coords.longitude);
         };
         var geoError = function(error) {
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out

            if ( error.code == 1 ) {
               errorModal('<strong>Please allow the app to access your location.</strong> We won’t store any information.');
            } else if ( error.code == 2 ) {
               errorModal('<strong>Oops, we couldn’t locate you.</strong> Please, check that your GPS is enabled and that you have good connectivity.');
            } else if ( error.code == 3 ) {
               errorModal('<strong>Oops, getting your location took too long.</strong> Please, try again later.');
            } else {
               errorModal('<strong>Something went wrong.</strong> Please, retry.');
            }
         };

         navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
      } else {
         errorModal('Oops, your browser doesn’t support geolocation ' + icon('fa-frown'));
      }
   }
}

function umbrella(lat, lon) {
   $('.location, .suggestion').empty();
   bigIcon('fa-circle-notch fa-spin');
   killTheRain();

   $.getJSON("umbrella.php?lat=" + lat + "&lon=" + lon, function(data){
      $('.location').html(data.name);
      localStorage.setItem('location', data.name);

      $('body').removeClass();

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
         bigIcon('fa-umbrella');
      } else {
         if ( data.clouds >= 0.5 ) {
            bigIcon('fa-cloud')
         } else if ( data.day != 1 ) {
            bigIcon('fa-moon')
         } else {
            bigIcon('fa-sun')
         }
      }
      if ( data.rain == 1 ) {
         if ( data.rain_eta == 0 ) {
            suggestion = '<p>It’s raining.</p><p>Please, take your umbrella.</p>'
         } else if ( data.rain_eta < 3 ) {
            suggestion = '<p>It’ll start raining soon.</p><p>Please, take your umbrella.</p>'
         } else {
            suggestion = '<p>It’ll rain in some hours.</p><p>Please, consider taking your umbrella.</p>'
         }
      } else {
         suggestion = '<p>It seems it won’t rain any time soon.</p>'
      }
      suggestion = suggestion + '</p>It’s ' + data.temp + '°C outside.</p>';
      $('.suggestion').html(suggestion);

   });
}

function icon(classes) {
   return '<i class="far ' + classes + '"></i>';
}

function bigIcon(classes) {
   $('.big-icon').empty().html( icon(classes) );
}

function errorModal(message, button) {
   $('.modal-text').html('<p>' + icon('fa-exclamation-circle icon-mr') + message + '</p>');
   $('.modal').slideDown( 400 );
   if ( button ) {
      $('.modal-button').val(button);
   }
}

window.onload = function(){
   bigIcon('fa-umbrella');

   if ( localStorage.getItem("coordinates") ) {
      coordinates = JSON.parse( localStorage.getItem('coordinates') );
      umbrella(coordinates.lat, coordinates.lon);
   } else {
      $('.modal').show();
   };

   if ( localStorage.getItem("location") ) {
      $('.location').html( localStorage.getItem('location') );
   };

   $(".locate").click(function(){
      locate();
   });
}
