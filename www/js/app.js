// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

    .config(function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // Each tab has its own nav history stack:
            .state('menu', {
                url: "/menu",
                abstract: true,
                templateUrl: "templates/event-menu.html"
            })

            .state('menu.photos', {
                url: '/photos',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/photos.html',
                        controller: 'PhotosCtrl'
                    }
                }
            })

            .state('menu.gallery', {
                url: '/gallery',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/gallery.html',
                        controller: 'GalleryCtrl'
                    }
                }
            })
            .state('menu.store', {
                url: '/store/:storeId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/store.html',
                        controller: 'StoreCtrl',
                        resolve: {
                            photo: function($stateParams, gallery) {
                                return gallery.get($stateParams.storeId)
                            }
                        }
                        //params: ['storeId']
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/menu/gallery');

    });

    //.config(function($routeProvider) {
    //
    //    // Set up the initial routes that our app will respond to.
    //    // These are then tied up to our nav router which animates and
    //    // updates a navigation bar
    //    $routeProvider.when('/gallery', {
    //        templateUrl: 'templates/gallery.html',
    //        controller: 'GalleryCtrl'
    //    });
    //
    //    // if the url matches something like /pet/2 then this route
    //    // will fire off the PetCtrl controller (controllers.js)
    //    $routeProvider.when('/store/:storeId', {
    //        templateUrl: 'templates/store.html',
    //        controller: 'StoreCtrl'
    //    });
    //
    //    // if the url matches something like /pet/2 then this route
    //    // will fire off the PetCtrl controller (controllers.js)
    //    $routeProvider.when('/photos', {
    //        templateUrl: 'templates/photos.html',
    //        controller: 'PhotosCtrl'
    //    });
    //
    //    // if none of the above routes are met, use this fallback
    //    // which executes the 'AppCtrl' controller (controllers.js)
    //    $routeProvider.otherwise({
    //        redirectTo: '/gallery'
    //    });
    //
    //});
