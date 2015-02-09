angular.module('starter.directives', [])

    .directive('resizable', function ($window) {
        return function ($scope) {

            // On window resize => resize the app
            $scope.initializeWindowSize = function () {
                $scope.windowHeight = $window.innerHeight;
                $scope.windowWidth = $window.innerWidth;
            };

            angular.element($window).bind('resize', function () {
                $scope.initializeWindowSize();
                $scope.$apply();
            });

            // Initiate the resize function default values
            $scope.initializeWindowSize();

            $scope.theStyle = function () {
                return {
                    'width': $scope.windowWidth + 'px',
                    'height': $scope.windowHeight + 'px',
                    'background-color': 'violet'
                };
            };
        };
    })

    //.directive('imageonload', function () {
    //    return {
    //        restrict: 'A',
    //
    //        link: function (scope, element) {
    //            element.on('load', function () {
    //                // Set visibility: true + remove spinner overlay
    //                element.removeClass('spinner-hide');
    //                element.addClass('spinner-show');
    //                element.parent().find('span').remove();
    //                alert('imageonload ok');
    //            });
    //            scope.$watch('ngSrc', function () {
    //                // Set visibility: false + inject temporary spinner overlay
    //                element.addClass('spinner-hide');
    //                // element.parent().append('<span class="spinner"></span>');
    //            });
    //        }
    //    };
    //})
    //
    //.directive("mysrcloader", function () {
    //    return {
    //        link: function (scope, element, attrs) {
    //            var img, loadImage;
    //            img = null;
    //
    //            loadImage = function () {
    //
    //                element[0].src = "https://www.yugma.com/images/loading-animation-7.gif";
    //
    //                img = new Image();
    //                img.src = attrs.mysrcloader;
    //
    //                img.onload = function () {
    //                    element[0].src = attrs.mysrcloader;
    //                };
    //            };
    //
    //            scope.$watch((function () {
    //                return attrs.mysrcloader;
    //            }), function (newVal, oldVal) {
    //                if (oldVal !== newVal) {
    //                    loadImage();
    //                }
    //            });
    //        }
    //    };
    //})
    //
    //.directive('imageisloaded', function () {
    //    return {
    //        restrict: 'A',
    //
    //        link: function (scope, element, attrs) {
    //            element.bind('load', function () {
    //                alert('image is loaded');
    //            });
    //        }
    //    };
    //})

    .directive('gallerie', [function () {
        var gallerie = {};
        gallerie.restrict = 'E';
        gallerie.replace = true;
        gallerie.transclude = true;
        gallerie.template = '<div ng-transclude></div>';
        gallerie.controller = ['$scope', function ($scope) {
            this.incrementLoaded = function () {
                $scope.$apply();
            };
        }];
        return gallerie;
    }])

    .directive('loader', [function () {

        var loader = {};

        loader.restrict = 'E';
        loader.require = '^gallerie';
        loader.replace = true;
        loader.scope = {src: "=", padding: "="};

        loader.template = '<div ng-class="{complete: isLoaded }" style="padding-bottom:{{padding}}%"><img ng-src="{{src}}"></div>';

        loader.link = function (scope, element, attrs, gallerie) {
            element.find('img').on('load', function () {
                scope.isLoaded = true;
                gallerie.incrementLoaded();
            });
        }

        return loader;

    }]);