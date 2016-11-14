(function() {
'use strict';

    angular
        .module('sikhSangeet.ui')
        .factory('config', config);

    config.$inject = ['$cordovaSQLite', '$ionicPlatform'];
    function config($cordovaSQLite, $ionicPlatform) {
        var service = {
            getValue:getValue,
            setValue:setValue
        };
        
        if(window.cordova)
        {
            createTableIfNotFound();
        }
        return service;

        ////////////////
        function createTableIfNotFound(){
            $ionicPlatform.ready(function() {
                $cordovaSQLite.execute(db,
                "CREATE TABLE IF NOT EXISTS config (id integer primary key, name text, value text)");
            });
        }

        function getValue(configName) { 
            var query = "SELECT value FROM config WHERE name = ?";

            return $cordovaSQLite.execute(db, query, [configName]).then(function(res) {
                if(res.rows.length > 0) {
                    return res.rows.item(0).value;
                } else {
                    return null;
                }
            }, function (err) {
                alert("There was an error fetching data from database");
                return err;
            });
        }

        function setValue(configName, value){
            var query = "INSERT OR REPLACE INTO config (id, name, value) " + 
                        "VALUES ((SELECT id FROM config WHERE name=?),?,?)";

            $cordovaSQLite.execute(db, query, [configName, configName, value])
                .then(function(res) {
                }, function (err) {
                    alert("error inserting id");
                });
        }
    }
})();