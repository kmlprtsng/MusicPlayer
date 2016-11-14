(function() {
'use strict';

    angular
        .module('sikhSangeet.media')
        .factory('ngMusicControls', ngMusicControls);

    ngMusicControls.$inject = ['mediaManager', '$ionicPlatform', 'mediaStatus'];
    function ngMusicControls(mediaManager, $ionicPlatform, mediaStatus) {
        var service = {
            init:init
        };

        return service;

        ////////////////

        function init(){
            $ionicPlatform.ready(function() {
                if(window.cordova) {
                    setupTrackChangesListener();
                    setupMusicControlsListner();
                }
            });
        }

        function setupTrackChangesListener(){
            var currentTrack,
                reloadMusicControls;

            mediaManager.onTrackSelected().then(function(){}, function(){}, function(newSelectedTrack){
                currentTrack = newSelectedTrack;
                reloadMusicControls = true;
            });

            mediaManager.onMediaStatusChange().then(function(){}, function(){}, function(newMediaStatus){
                if(newMediaStatus.status){
                    switch(newMediaStatus.status){
                        case mediaStatus.running:
                            if(reloadMusicControls){
                                create(currentTrack);
                                reloadMusicControls = false;
                            }
                            else{
                                MusicControls.updateIsPlaying(true);
                            }

                            break;
                        case mediaStatus.paused: MusicControls.updateIsPlaying(false); break;
                        case mediaStatus.stopped: MusicControls.destroy(onSuccess, onError); break;
                    }
                }
            });
        }

        function setupMusicControlsListner(){
            MusicControls.subscribe(function(action){
                switch(action) {
                    case 'music-controls-next':
                        mediaManager.playNextTrack();
                        break;
                    case 'music-controls-previous':
                        mediaManager.playPreviousTrack();
                        break;
                    case 'music-controls-pause':
                        mediaManager.pausePlay();
                        break;
                    case 'music-controls-play':
                        mediaManager.resumePlay();
                        break;
                    case 'music-controls-destroy':
                        break;

                    // Headset events (Android only)
                    case 'music-controls-media-button' :
                        break;
                    case 'music-controls-headset-unplugged':
                        mediaManager.pausePlay();
                        break;
                    case 'music-controls-headset-plugged':
                        break;
                    default:
                        break;
                }
            });

            MusicControls.listen();
        }

        function create(track) {
            MusicControls.create({
                track       : track.id3_title,
                artist      : track.id3_artist,
                isPlaying   : true,
                dismissable : true,
                hasPrev   : track.hasPrevious,
                hasNext   : track.hasNext,
                hasClose  : false,
                cover: 'img/cover.png'
            }, onSuccess, onError);
        }

        function onSuccess(){
        }

        function onError(){ alert('There was a problem displying/destorying music controls') };
    }
})();
//https://github.com/homerours/cordova-music-controls-plugin
