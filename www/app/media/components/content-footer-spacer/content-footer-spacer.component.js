(function() {
    'use strict';

    angular
        .module('sikhSangeet.media')
        .directive('contentFooterSpacer', contentFooterSpacer);

    contentFooterSpacer.$inject = ['mediaFooterToggle'];
    function contentFooterSpacer(mediaFooterToggle) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;
        
        function link(scope, element, attrs) {
            mediaFooterToggle.onFooterVisible().then(function(){
                element.addClass('has-footer has-media-footer');
            });
        }
    }
})();