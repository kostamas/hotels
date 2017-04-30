angular.module('hotels')
    .config(function ($stateProvider, $urlRouterProvider) {
        'ngInject';
        $urlRouterProvider.otherwise('/hotelList');

        $stateProvider.state('hotelList', {
            url: '/hotelList',
            template: '<hotel-list></hotel-list>'
        });

        $stateProvider.state('hotel', {
            url: '/hotel/:id',
            template: '<hotel hotel="vm.hotel"></hotel>',
            controller: function (hotel) {
                this.hotel = hotel;
            },
            controllerAs: 'vm',
            resolve: {
                hotel: function ($window, hotelSrv, $stateParams) {
                    'ngInject';
                    return hotelSrv.getHotelBYId(+$stateParams.id).then(function (hotel) {
                        hotelSrv.updateVisitedHotels(hotel);
                        return hotel;
                    });

                }
            }
        });
    });
