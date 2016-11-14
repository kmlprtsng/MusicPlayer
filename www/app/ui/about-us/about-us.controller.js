(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .controller('AboutUsController', AboutUsController);

    AboutUsController.$inject = ['appVersion'];
    function AboutUsController(appVersion) {
        var vm = this;
        vm.appVerionStr = appVersion.stringVal;
    }
})();