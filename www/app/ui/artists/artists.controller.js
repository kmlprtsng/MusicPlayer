(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .controller('ArtistsController', ArtistController);

    ArtistController.$inject = ['$stateParams', 'apiService'];
    function ArtistController($stateParams, apiService) {
        var vm = this;
        vm.artists = [];
        vm.loading = true;
        vm.failedToLoad = false;
        vm.loadData = loadData;

        loadData();
        ////////////////

        function loadData() {
            vm.loading = true;

            apiService.getArtists($stateParams.genreId).then(function(artists){
                vm.loading = false;
                vm.failedToLoad = false;
                vm.artists = artists;
            }, function(){
                vm.loading = false;
                vm.failedToLoad = true;
            });
        }
    }
})();