angular.module('hotels', ['ngMaterial', 'ui.router'])
    .run(function($rootScope, $state){
        'ngInject'
        $rootScope.$state = $state;
    });
