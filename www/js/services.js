angular.module('starter.services', [])

    .factory('Camera', ['$q', function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])


    .factory('Gallery', function () {

        console.log('Gallery');

        var Gallery = function () {
            this.photos = [];
            this.more = true;
        };

        Gallery.prototype.loadMorePhotos = function ($window) {
            console.log('Gallery loadMorePhotos');
            if (this.more) {
                console.log("need more");
                var l = this.photos.length;
                if (l >= 60) {
                    this.more = false;
                    console.log("no More Items Available");
                } else {
                    var data = [];
                    for (var i = l; i < l + 4; i++) {
                        //var height = $window.windowHeight;
                        var height = ~~(Math.random() * 1000) + 100;
                        //var width = $scope.windowWidth;
                        var width = 1280;
                        console.log("Gallery height : " + height);
                        console.log("Gallery width : " + width);
                        var padding = (height / width) * 100;
                        console.log("Gallery pading : " + padding);
                        var id = ~~(Math.random() * 1000);
                        data.push({
                            "url": 'http://lorempixel.com/g/' + width + '/' + height/* + '/?' + id*/,
                            "height": height,
                            "width": width,
                            "padding": padding
                        });
                    }
                    this.photos = this.photos.concat(data);
                    console.log('photos size : ' + this.photos.length);
                }
            }
        };

        return Gallery;
    })

    .factory('Size', ['$window', '$rootScope',
        function ($window, $rootScope) {
            console.log('Size');

            var getHeight = function () {
                    console.log('Size height : ' + $window.innerHeight);
                    return $window.innerHeight;
                },

                getWidth = function () {
                    console.log('Size width : ' + $window.innerWidth)
                    return $window.innerWidth;
                };

            angular.element($window).on('resize', function () {
                console.log('Size : on resize');
                $rootScope.$digest();
            });

            return function (onwha) {
                console.log('Size call : ' + onwha);
                if (onwha == 'width') {
                    return getWidth();
                } else if (onwha == 'height') {
                    return getHeight();
                }
                return false;
            };
        }
    ])

    .factory('Gallery2', function ($window) {

        console.log('Gallery2');

        var Gallery = function ($window) {
            this.photos = [];
            this.more = true;
        };

        Gallery2.prototype.loadMorePhotos = function ($window) {
            console.log('Gallery2 loadMorePhotos');
            if (this.more) {
                console.log("Gallery2 more");
                var l = this.photos.length;
                if (l >= 60) {
                    this.more = false;
                    console.log("Gallery2 no More Available");
                } else {
                    var data = [];
                    for (var i = l; i < l + 4; i++) {
                        var height = $window.windowHeight;
                        var height = ~~(Math.random() * 2000) + 100;
                        //var width = $scope.windowWidth;
                        var width = 1120;
                        console.log("Gallery height : " + height);
                        console.log("Gallery width : " + width);
                        var padding = (height / width) * 100;
                        console.log("Gallery pading : " + padding);
                        var id = ~~(Math.random() * 1000);
                        data.push({
                            "url": 'http://lorempixel.com/g/' + width + '/' + height + '/?' + id,
                            "height": height,
                            "width": width,
                            "padding": padding
                        });
                    }
                    this.photos = this.photos.concat(data);
                    console.log('photos size : ' + this.photos.length);
                }
            }
        };

        return Gallery;
    });
