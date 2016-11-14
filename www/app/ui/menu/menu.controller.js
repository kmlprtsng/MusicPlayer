(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .controller('MenuController', menuController);

    menuController.$inject = ['$stateParams'];
    function menuController($stateParams) {
        var vm = this;
    }
})();