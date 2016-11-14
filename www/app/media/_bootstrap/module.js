angular.module('sikhSangeet.media', ['ngCordova'])
.constant("mediaStatus", {
        none: 0,
        starting: 1,
        running: 2,
        paused: 3,
        stopped: 4
})
.run(["ngMusicControls", function (musicControls) {
  musicControls.init();
}]);