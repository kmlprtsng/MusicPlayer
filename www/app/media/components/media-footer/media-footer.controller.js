(function() {
'use strict';

    angular
        .module('sikhSangeet.media')
        .controller('MediaFooterController', MediaFooterController);

    MediaFooterController.$inject = ['mediaManager', 'mediaFooterToggle', 'mediaStatus'];
    function MediaFooterController(mediaManager, mediaFooterToggle, mediaStatus) {
        var vm = this,
            isPositionSliderBeingDragged = false,
            isSeekingNewPosition = false;

        vm.currentTrack = null;
        vm.isVisible = false;
        vm.currentMediaStatus = null;

        vm.pausePlay = pausePlay;
        vm.resumePlay = resumePlay;
        vm.playPreviousTrack = playPreviousTrack;
        vm.playNextTrack = playNextTrack;
        vm.hasPreviousTrack = mediaManager.hasPreviousTrack;
        vm.hasNextTrack = mediaManager.hasNextTrack;
        vm.onLocationRelease = onLocationRelease;
        vm.onLocationDrag = onLocationDrag;
        vm.track = { duration: 0, position: 0 };
        vm.mediaStatus = mediaStatus;

        activate();

        ////////////////

        function activate() {
            mediaManager.onTrackSelected().then(function(){}, function(){}, function(newSelectedTrack){
                vm.currentTrack = newSelectedTrack;
                vm.track.duration = 0;
                vm.track.position = 0;
                vm.track.duration = newSelectedTrack.id3_playtime_sec;
            });

            mediaManager.onMediaStatusChange().then(function(){}, function(){}, function(newMediaStatus){
                if(!vm.isVisible){
                    vm.isVisible = true;
                    mediaFooterToggle.setFooterAsVisible();
                }

                if(newMediaStatus.error){
                    vm.currentMediaStatus = mediaStatus.stopped;
                }

                if(newMediaStatus.status){
                    vm.currentMediaStatus = newMediaStatus.status;

                    switch(vm.currentMediaStatus){
                        case mediaStatus.starting: vm.track.position=0; break;
                        case mediaStatus.running: break;
                        case mediaStatus.paused: break;
                        case mediaStatus.stopped: vm.track.position += 1; break;
                    }
                }
            });

            mediaManager.onPositionChange().then(function(){}, function(){}, function(newPosition){
                if(newPosition > -1 && !isPositionSliderBeingDragged)
                    vm.track.position = newPosition;
            });
        }

        function pausePlay(){
            mediaManager.pausePlay();
        }

        function resumePlay(){
            if(vm.currentMediaStatus === mediaStatus.stopped){
                mediaManager.replay();
            }
            else{
                mediaManager.resumePlay();
            }
        }

        function playNextTrack(){
            if(mediaManager.hasNextTrack()){
                mediaManager.playNextTrack();
            }
        }
        function playPreviousTrack(){
            if(mediaManager.hasPreviousTrack()){
                mediaManager.playPreviousTrack();
            }
        }

        function onLocationRelease(){
            isPositionSliderBeingDragged = false;

            if(vm.track.position == "0"){ //Media plugin doesn't allow seeking to 0
                vm.track.position = 1;
            }

            mediaManager.seekTo(vm.track.position * 1000);
        }

        function onLocationDrag(){
            if(!isPositionSliderBeingDragged)
                isPositionSliderBeingDragged = true;
        }
    }
})();
