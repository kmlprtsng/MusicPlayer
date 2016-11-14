(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', 'apiEndpoint', 'apiPaths', '$resource'];
    function apiService($http, apiEndpoint, apiPaths, $resource) {
        var service = {
            getGenres: getGenres,
            getArtists: getArtists,
            getAlbums: getAlbums,
            getTracks: getTracks
        };
        
        return service;

        ////////////////
        function getGenres(){
            return $http.get(apiEndpoint.url + apiPaths.genres);
        }

        function getArtists(genreId){
            return $resource(apiEndpoint.url + apiPaths.artists).query({genreId: genreId}).$promise;
        }

        function getAlbums(artistId, genreId){
            return $resource(apiEndpoint.url + apiPaths.albums).query({artistId: artistId, genreId: genreId}).$promise;
        }

        function getTracks(albumId){
            return $resource(apiEndpoint.url + apiPaths.tracks).query({albumId: albumId}).$promise;
        }
    }
})();