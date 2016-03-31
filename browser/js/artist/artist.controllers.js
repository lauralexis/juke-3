'use strict';

/* ARTISTS (PLURAL) CONTROLLER */


juke.controller('ArtistsCtrl', function ($scope, $log, ArtistFactory, artists) {
  $scope.artists = artists;
});

/* ARTIST (SINGULAR) CONTROLLER */

juke.controller('ArtistCtrl', function ($scope, $log, ArtistFactory, PlayerFactory, $stateParams) {
    // $scope.artist = artist;
    
    var artistId;
    artistId = $stateParams.artistId;

    ArtistFactory.fetchById(artistId)
    .then(function (artist) {
      $scope.artist = artist;
      console.log("artist:", artist)
    })

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.artist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.viewOneAlbum = function (album) {
    $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: album._id });
  };

});

/* ARTISTS (PLURAL) STATE */
juke.config(function($stateProvider){
  $stateProvider.state('artistList', {
    url: '/artists',
    templateUrl: '../../artists.html',
    resolve: {
      artists: function(ArtistFactory){
        return ArtistFactory.fetchAll();
      }
    },
    controller: 'ArtistsCtrl'
  });

});

/* ARTIST (SINGULAR) STATE */
juke.config(function($stateProvider){
  $stateProvider
  .state('artist', {
    url: '/artist/:artistId',
    templateUrl: '../../artist.html',
    controller: 'ArtistCtrl'
  })
  .state('artist.albums', {
    url: '/albums',
    templateUrl: '../../artist.albums.html'
  })
  .state('artist.songs', {
    url: '/songs',
    templateUrl: '../../artist.songs.html'
  })


});
