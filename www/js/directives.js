angular.module('starter.directives', [])

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
        loader.scope = {src: "=", id: "="};

        loader.template = '<div ng-class="{complete: isLoaded }"><a ui-sref="menu.store({storeId: {{id}}})"><img ng-src="{{src}}"></a></div>';

        loader.link = function (scope, element, attrs, gallerie) {
            element.find('img').on('load', function () {
                scope.isLoaded = true;
                gallerie.incrementLoaded();
            });
        }

        return loader;

    }]);