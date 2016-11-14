(function() {
'use strict';

    angular
        .module('sikhSangeet.media')
        .factory('mediaManager', mediaManager);

    mediaManager.$inject = ['$q', '$ssMedia', 'mediaStatus', '$timeout', '$ionicPopup'];
    function mediaManager($q, $ssMedia, mediaStatus, $timeout, $ionicPopup) {
        var trackSelectedDefer = $q.defer(),
            mediaStatusDefer = $q.defer(),
            currentTrack = null,
            tracks = [],
            currentMediaStatus = null,
            service = {
                play:play,
                playMultiple:playMultiple,
                onTrackSelected: onTrackSelected,
                getCurrentTrack: getCurrentTrack,
                hasNextTrack: hasNextTrack,
                hasPreviousTrack: hasPreviousTrack,
                playNextTrack: playNextTrack,
                playPreviousTrack: playPreviousTrack,
                pausePlay: pausePlay,
                resumePlay: resumePlay,
                replay: replay,
                seekTo: seekTo,
                onMediaStatusChange: onMediaStatusChange,
                onPositionChange: $ssMedia.onPositionChange
            };

        return service;

        ////////////////
        function createMedia(track){
            currentTrack = track;

            track.hasPrevious = hasPreviousTrack();
            track.hasNext = hasNextTrack();

            if(window.cordova){
                $ssMedia.release();
                $ssMedia.newMedia(encodeURI(track.download));
            }
            else{
                console.log("Play new track request")
                mediaStatusDefer.notify({status: mediaStatus.running});
            }

            trackSelectedDefer.notify(track);
        }

        function play(track){
            playMultiple([track], 0);
        }

        function playMultiple(newTracks, indexOfTrackToPlay) {
            tracks = newTracks;
            createMedia(tracks[indexOfTrackToPlay]);
            resumePlay();
        }

        function hasNextTrack(){
            var currentTrackIndex = tracks.indexOf(currentTrack);
            return currentTrackIndex + 1 < tracks.length;
        }

        function hasPreviousTrack(){
            var currentTrackIndex = tracks.indexOf(currentTrack);
            return currentTrackIndex > 0;
        }

        function playNextTrack(){
            if(!hasNextTrack()){
                return false;
            }
            var currentTrackIndex = tracks.indexOf(currentTrack);
            createMedia(tracks[currentTrackIndex + 1]);
            resumePlay();
        }

        function playPreviousTrack(){
            if(!hasPreviousTrack()){
                return false;
            }
            var currentTrackIndex = tracks.indexOf(currentTrack);
            createMedia(tracks[currentTrackIndex - 1]);
            resumePlay();
        }

        function onMediaStatusChange(){
            return mediaStatusDefer.promise;
        }

        function pausePlay(){
            if(currentMediaStatus != mediaStatus.paused){
                if(window.cordova)
                    $ssMedia.pause();
                else{
                    console.log("Pausing play");
                    mediaStatusDefer.notify({status: mediaStatus.paused});
                }
            }
        }

        function resumePlay(){
            $timeout(function(){
                if(window.cordova){
                    $ssMedia.play()
                        .then(
                        function(){},
                        function(error){
                            $ionicPopup.alert({
                                title: 'Error playing track',
                                template: 'There was an error playing the track. Error code: ' + error.code
                            });

                            mediaStatusDefer.notify({error: error});
                        },
                        function(newMediaStatus){
                            mediaStatusDefer.notify({ status: newMediaStatus});
                            currentMediaStatus = newMediaStatus;

                            if(newMediaStatus === mediaStatus.stopped){
                                playNextTrack();
                            }
                        });
                }
                else{
                    console.log("Resuming play");
                    mediaStatusDefer.notify({status: mediaStatus.running});
                }
            }, 0);
        }

        function replay(){
            createMedia(currentTrack);
            resumePlay();
        }

        function getCurrentTrack(){
            return currentTrack;
        }

        function onTrackSelected(){
            return trackSelectedDefer.promise;
        }

        function seekTo(milliseconds){
            $ssMedia.seekTo(milliseconds);
        }
    }
})();
