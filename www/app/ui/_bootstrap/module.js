var db = null;

angular.module('sikhSangeet.ui', ['ionic', 'ngSanitize', 'ngResource', 'ngCordova', 'sikhSangeet.media', 'angularRipple'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

      db = $cordovaSQLite.openDB({name: "sikhSangeet", location: 1});
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.constant('apiEndpoint', {
  url: 'http://www.ReplaceWithRealUrl.com/api/api.php'
})
.constant("apiPaths", {
  genres: "/genre/list?key=android",
  artists: "/artist/list?genre_id=:genreId&key=android",
  albums: "/album/list?artist_id=:artistId&genre_id=:genreId&key=android",
  tracks: "/song/list?album_id=:albumId&key=android",
  random: "/song/list?genre_id=:genreId&limit=10&key=android'"
})
.constant("appVersion", {
  number: 30104,
  stringVal: "3.1.4",
  notes: "\
- Control music from lock screen<br />\
- Unplugging aux cable now automatically pauses music<br />\
- Minor bug fixes<br />\
- Remove the need for the microphone permission<br />\
- New Splash Screen<br />\
- Play all tracks in an album<br />\
- Automatically play the next track in the album when one finishes<br />\
- Ability to navigate to previous and next track from footer<br />\
- Stay tuned for more!"
});
