(function() {
    'use strict';

    angular
        .module('sikhSangeet.ui')
        .directive('retryLoading', retryLoading);

    retryLoading.$inject = [];
    function retryLoading() {
        var directive = {
            bindToController: { retryCallback: '&'},
            controller: retryLoadingController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: 'app/ui/components/retry-loading/retry-loading.html',
            scope: {}
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function retryLoadingController () {

    }
})();