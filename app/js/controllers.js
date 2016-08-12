'use strict';

/* Controllers */

angular.module('standupRouletteControllers', [])

    .controller('PlayCtrl', ['$scope', '$location', 'playerStorage', '_',
        function ($scope, $location, playerStorage, _) {
            $scope.players = playerStorage.get();

            if ($scope.players.length <= 0) {
                $location.path('/manage-players');
            }

            $scope.newGame = function () {
                $scope.remainingPlayers = $scope.players;
                $scope.resultName = '';
                $scope.donePlayers = [];
            };
            $scope.newGame();

            $scope.play = function () {
                if ($scope.remainingPlayers.length) {
                    var resultPlayer = _.sample($scope.remainingPlayers, 1).shift();
                    $scope.remainingPlayers = _.without($scope.remainingPlayers, resultPlayer);
                    $scope.resultName = resultPlayer.name;
                    $scope.donePlayers.push(resultPlayer);
                }
            };
        }])

    .controller('ManagePlayersCtrl', ['$scope', 'playerStorage', '_',
        function ($scope, playerStorage, _) {
            $scope.players = playerStorage.get();

            $scope.add = function () {
                var playerName = $scope.newPlayer.trim();
                if (playerName.length === 0) {
                    return;
                }

                $scope.players.push({
                    id: $scope.getNewId(),
                    name: playerName
                });
                $scope.storePlayers();

                $scope.newPlayer = '';
            };

            $scope.getNewId = function () {
                var maxIdObject = _.max($scope.players, 'id');

                if (maxIdObject != undefined) {
                    var maxId = maxIdObject.id;
                    return (maxId) ? maxId + 1 : 1;
                } else {
                    return 1;
                }
            };

            $scope.storePlayers = function () {
                playerStorage.put($scope.players);
            };

            $scope.typeKeyDown = function ($event) {
                if ($event.keyCode == 13)
                    $scope.add();
            };

            $scope.remove = function (id) {
                var removeObject = _.find($scope.players, {'id': id});
                $scope.players = _.without($scope.players, removeObject);
                $scope.storePlayers();
            };

        }]);
