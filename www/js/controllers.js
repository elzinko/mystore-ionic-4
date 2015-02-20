angular.module('starter.controllers', ['ionic'])

    .controller('PhotosCtrl', function ($scope, Camera) {
        $scope.getPhoto = function () {
            console.log('Getting camera');
            Camera.getPicture().then(function (imageURI) {
                console.log(imageURI);
                $scope.lastPhoto = imageURI;
            }, function (err) {
                console.err(err);
            }, {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false
            });
        }
    })

    .controller('GalleryCtrl', ['$scope', 'gallery', 'sizeListener', function ($scope, gallery, sizeListener) {
        console.log('GalleryCtrl loading ...');
        $scope.gallery = gallery;
        $scope.sizeListener = sizeListener;
        $scope.loadMore = function () {
            $scope.gallery.loading();
            console.log('$broadcast scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        console.log('GalleryCtrl loaded');
    }])

    .controller('StoreCtrl', ['$scope', 'photo', 'store', function ($scope, photo, store) {
        $scope.photo = photo;
        console.log('StoreCtrl loading ' + $scope.photo);
        //$scope.store = store;
        //$scope.sizeListener = sizeListener;
        $scope.loadMoreStorePhotos = function () {
            $scope.store.loading();
            console.log('$broadcast scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        console.log('StoreCtrl loaded');
    }]);
