(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .controller('GenresController', GenreController);

    GenreController.$inject = ['apiService', 'newVersionNotification'];
    function GenreController(apiService, newVersionNotification) {
        var vm = this;
        vm.genres = [];
        vm.loading = true;
        vm.failedToLoad = false;
        vm.loadData = loadData;

        loadData();
        newVersionNotification.notify();

        ////////////////

        function loadData() {
            vm.loading = true;

            apiService.getGenres().then(function(genres){
                vm.loading = false;
                vm.failedToLoad = false;
                vm.genres = genres.data;
            }, function(){
                vm.loading = false;
                vm.failedToLoad = true;
            });

         }
    }
})();