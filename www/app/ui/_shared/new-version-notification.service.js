(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .factory('newVersionNotification', newVersionNotification);

    newVersionNotification.$inject = ['appVersion', '$ionicPlatform', 'config', '$ionicPopup'];
    function newVersionNotification(appVersion, $ionicPlatform, config, $ionicPopup) {
        var service = {
            notify:notify
        };

        return service;

        ////////////////

        function notify() {
            if(window.cordova){
                $ionicPlatform.ready(function() {
                    if(appVersion.notes){
                        config.getValue("versionNotificationShownFor").then(function(versionNotificationShownFor){
                            var versionNotificationShownFor = versionNotificationShownFor,
                                            currentVersionNumber = appVersion.number.toString();

                            if(versionNotificationShownFor !== currentVersionNumber){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'New Updates',
                                    template: appVersion.notes
                                });

                                config.setValue("versionNotificationShownFor", currentVersionNumber);
                            }
                        });
                    }
                });
            }
        }
    }
})();