'use strict';

/* Services */

angular.module('standupRouletteServices', [])

    .factory('playerStorage', [function () {
        var STORAGE_ID = 'standup-roulette.players';

        return {
            get: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            put: function (players) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(players));
            }
        };

    }]);


angular.module('underscore', [])

    .factory('_', ['$window', function ($window) {
        return $window._; // assumes underscore has already been loaded on the page
    }]);
