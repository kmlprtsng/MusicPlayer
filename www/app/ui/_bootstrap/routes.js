angular.module('sikhSangeet.ui')

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  $stateProvider
  .state('menu.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'app/ui/genres/genres.html',
        controller: 'GenresController',
        controllerAs: 'vm'
      }
    }
  })

  .state('menu.artists', {
    url: '/artists/:genreId',
    views: {
      'home': {
        templateUrl: 'app/ui/artists/artists.html',
        controller: 'ArtistsController',
        controllerAs: 'vm'
      }
    }
  })

  .state('menu.albums', {
    url: '/albums/:artistId/:genreId',
    views: {
      'home': {
        templateUrl: 'app/ui/albums/albums.html',
        controller: 'AlbumsController',
        controllerAs: 'vm'
      }
    }
  })

  .state('menu', {
    url: '/home',
    templateUrl: 'app/ui/menu/menu.html',
    controller: 'MenuController',
    controllerAs: 'vm'
  })

  .state('menu.tracks', {
    url: '/tracks/:albumId/:albumName',
    views: {
      'home': {
        templateUrl: 'app/ui/tracks/tracks.html',
        controller: 'TracksController',
        controllerAs: 'vm'
      }
    }
  })

  .state('menu.aboutUs', {
    url: '/about-us',
     views: {
      'home': {
        templateUrl: 'app/ui/about-us/about-us.html',
        controller: 'AboutUsController',
        controllerAs: 'vm'
      }
    }
  })

  .state('menu.knownIssues', {
    url: '/known-issues',
     views: {
      'home': {
        templateUrl: 'app/ui/known-issues/known-issues.html'
      }
    }
  });

$urlRouterProvider.otherwise('/home/home')
});
