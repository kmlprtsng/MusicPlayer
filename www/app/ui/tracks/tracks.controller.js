(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .controller('TracksController', TracksController);

    TracksController.$inject = ['$stateParams', 'apiService', 'mediaManager'];
    function TracksController($stateParams, apiService, mediaManager) {
        var vm = this;
        vm.tracks = [];
        vm.loading = true;
        vm.failedToLoad = false;
        vm.loadData = loadData;
        vm.playTrack = playTrack;
        vm.playAll = playAll;
        vm.currentlyPlayingTrack = null;
        vm.albumName = $stateParams.albumName;

        loadData();

        ////////////////

        function loadData() {
            vm.loading = true;

            apiService.getTracks($stateParams.albumId).then(function(tracks){
                vm.loading = false;
                vm.failedToLoad = false;
                vm.tracks = tracks;

                vm.currentlyPlayingTrack = mediaManager.getCurrentTrack();

                mediaManager.onTrackSelected().then(function(){}, function(){}, function(newSelectedTrack){
                    vm.currentlyPlayingTrack = newSelectedTrack;
                });

            }, function(){
                vm.loading = false;
                vm.failedToLoad = true;
            });
        }

        function playTrack(track){
            mediaManager.playMultiple(vm.tracks, vm.tracks.indexOf(track));
        }

        function playAll(){
            mediaManager.playMultiple(vm.tracks, 0);
        }
    }
})();