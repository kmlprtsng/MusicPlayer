(function() {
    'use strict';

    angular
        .module('sikhSangeet.media')
        .service('$ssMedia', $ssMedia);

    $ssMedia.$inject = ['$q', '$interval'];

    function $ssMedia($q, $interval) {
        var qMediaStatus,
            qDuration,
            qPosition = $q.defer(),
            media,
            mediaTimer,
            currentSrc;

        this.newMedia = newMedia;
        this.play = play;
        this.pause = pause;
        this.stop = stop;
        this.release = release;
        this.seekTo = seekTo;
        this.getDuration = getDuration;
        this.onPositionChange = onPositionChange;

        ////////////////
        function newMedia(src) {
            currentSrc = src;
            clearPositionNotifierTimer();

            media = new Media(src,
                function(success) {
                    if(currentSrc === src)
                        qMediaStatus.resolve(success);
                },
                function(error) {
                    if(currentSrc === src)
                        qMediaStatus.reject(error);
                },
                function(status) {
                    if(currentSrc === src)
                        qMediaStatus.notify(status);
                });
        }

        // iOS quirks :
        // -  myMedia.play({ numberOfLoops: 2 }) -> looping
        // -  myMedia.play({ playAudioWhenScreenIsLocked : false })
        function play(options) {
            qMediaStatus = $q.defer();
            media.play(options || {});
            setPositionNotifierTimer(media);

            return qMediaStatus.promise;
        }

        function pause(){
            clearPositionNotifierTimer();
            media.pause();
        }

        function stop(){
            media.stop();
        }

        function release(){
            if(media){
                media.release();
                media = undefined;
            }
        }

        function seekTo(timing){
            media.seekTo(timing);
        }

        function getDuration(){
            qDuration = $q.defer();
            
            media.getDuration(function (duration){
                qDuration.resolve(duration);
            });

            return qDuration.promise;
        }

        function clearPositionNotifierTimer() {
            if (angular.isDefined(mediaTimer)) {
                $interval.cancel(mediaTimer);
                mediaTimer = undefined;
            }
        }

        function setPositionNotifierTimer(media) {
            if (angular.isDefined(mediaTimer)) {
                return;
            }

            function successCallback(position){
                if (position >= 0)
                    qPosition.notify(position);
            }

            function errorCallback(e){
                console.log('Error getting pos=' + e);
            }

            mediaTimer = $interval(function() {
                media.getCurrentPosition(successCallback, errorCallback);
            }, 300);
        }

        function onPositionChange(){
            return qPosition.promise;
        }
    }
})();