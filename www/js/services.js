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

    .factory('sizeListener', ['$window', '$rootScope',
        function ($window, $rootScope) {
            console.log('sizeListener');
            angular.element($window).on('resize', function () {
                console.log('sizeListener[on resize] : height : ' + $window.innerHeight + ' - width : ' + $window.innerWidth);
                $rootScope.$digest();
            });
        }
    ])

    .factory('windowSize', ['$window', '$rootScope',
        function ($window, $rootScope) {
            console.log('windowSize');
            return {
                "getHeight": function () {
                    console.log('windowSize height : ' + $window.innerHeight);
                    return $window.innerHeight;
                },
                "getWidth": function () {
                    console.log('windowSize width : ' + $window.innerWidth)
                    return $window.innerWidth;
                }
            }
        }
    ])

    .factory('gallery', function (windowSize) {
        console.log('gallery');
        var gallery = {};
        gallery.photos = [];
        gallery.more =true;
        gallery.loading = function () {
            console.log('gallery.load');
            if (this.more) {
                console.log("need more photos");
                var l = this.photos.length;
                if (l >= 60) {
                    this.more = false;
                    console.log("no More photos available");
                } else {
                    var data = [];
                    for (var i = l; i < l + 4; i++) {
                        var width = windowSize.getWidth();
                        var height = ~~(Math.random() * 600) + 400;
                        var padding = (height / width) * 100;
                        console.log("loader height : " + height);
                        console.log("loader width : " + width);
                        console.log("loader padding : " + padding);
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
        }

        return gallery;
});
