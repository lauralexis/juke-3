'use strict';

/* ALBUMS (SINGULAR) CONTROLLER */
var juke = angular.module('juke');

juke.controller('AlbumCtrl', function ($scope, $log, $stateParams, PlayerFactory, AlbumFactory) {
    var albumId;
    albumId = $stateParams.albumId;

    AlbumFactory.fetchById(albumId)
    .then(function (album) {
      $scope.album = album;
    })

  // main toggle
  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.album.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

});

/* ALBUMS (PLURAL) CONTROLLER */

juke.controller('AlbumsCtrl', function ($scope, $log, PlayerFactory, AlbumFactory) {

  $scope.showMe = true;

  AlbumFactory.fetchAll()
  .then(function (albums) {
    $scope.albums = albums;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

});

/* ALBUMS (PLURAL) STATE */

juke.config(function($stateProvider){
  $stateProvider.state('albumList', {
    url: '/albums',
    templateUrl: '../../albums.html',
    controller: 'AlbumsCtrl'
  });
});

/* ALBUM (SINGULAR) STATE */

juke.config(function($stateProvider){
  $stateProvider.state('album', {
    url: '/album/:albumId',
    templateUrl: '../../album.html',
    controller: 'AlbumCtrl'
  });
});







