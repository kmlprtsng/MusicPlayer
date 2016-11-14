(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .controller('AlbumsController', AlbumsController);

    AlbumsController.$inject = ['$stateParams', 'apiService'];
    function AlbumsController($stateParams, apiService) {
        var vm = this;
        vm.albums = [];
        vm.loading = true;
        vm.failedToLoad = false;
        vm.loadData = loadData;

        loadData();

        ////////////////

        function loadData() {
            vm.loading = true;

            apiService.getAlbums($stateParams.artistId, $stateParams.genreId)
                .then(function(albums){
                    vm.loading = false;
                    vm.failedToLoad = false;

                    vm.albums = albums;
                }, function(){
                    vm.loading = false;
                    vm.failedToLoad = true;
                });
        }
    }
})();