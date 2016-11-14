(function() {
    'use strict';

    angular
        .module('sikhSangeet.media')
        .directive('mediaFooter', mediaFooter);

    mediaFooter.$inject = [];
    function mediaFooter() {
        var directive = {
            bindToController: { },
            controller: 'MediaFooterController',
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: 'app/media/components/media-footer/media-footer.html',
            scope: {}
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
})();