angular.module('sikhSangeet.media').filter('duration', ['$filter', function ($filter) {
    return function (input) {
        return (input >= 0) ? $filter('time')(input) : '0:00';
    };
}]);
