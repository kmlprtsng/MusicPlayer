(function() {
'use strict';

    angular
        .module('sikhSangeet.media')
        .factory('mediaFooterToggle', mediaFooterToggleService);

    mediaFooterToggleService.$inject = ['$q'];
    function mediaFooterToggleService($q) {
        var footerDefer = $q.defer(),
            service = {
                onFooterVisible: onFooterVisible,
                setFooterAsVisible: setFooterAsVisible
            };
        
        return service;

        ////////////////
        function setFooterAsVisible(){
            footerDefer.resolve();
        }

        function onFooterVisible(){
            return footerDefer.promise;
        }
    }
})();