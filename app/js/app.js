'use strict';

/* App Module */

angular.module('standupRouletteApp', [
        'underscore',
        'ngRoute',
        'standupRouletteControllers',
        'standupRouletteServices'
    ])

    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/play', {
                templateUrl: 'partials/play.html',
                controller: 'PlayCtrl'
            }).when('/manage-players', {
                templateUrl: 'partials/manage-players.html',
                controller: 'ManagePlayersCtrl'
            }).otherwise({
                redirectTo: '/play'
            });
        }]);
