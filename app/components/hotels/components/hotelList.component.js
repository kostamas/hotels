angular.module('hotels')
    .component('hotelList', {
            templateUrl: 'app/components/hotels/templates/hotelList.template.html',
            controller: function (hotelSrv, $state, HOTEL, $mdDialog) {
                'ngInject';
                var _this = this;

                _this.HOTEL_CONST = HOTEL;
                _this.selectedBrand = -1;
                _this.currentView = HOTEL.ALL_HOTELS_VIEW;

                _this.visitedHotels = hotelSrv.getVisitedHotels();

                hotelSrv.getBrands().then(function (brands) {
                    _this.brands = brands;
                });

                hotelSrv.getHotels().then(function (hotels) {
                    _this.hotels = hotels;
                    _this.allHotels = hotels;
                });

                _this.changeView = function (newViewId) {
                    _this.currentView = newViewId;
                    switch (newViewId) {
                        case HOTEL.ALL_HOTELS_VIEW:
                            _this.hotels = _this.allHotels;
                            break;
                        case HOTEL.VISITED_HOTELS_VIEW:
                            _this.hotels = _this.visitedHotels;
                            break;
                    }
                };

                _this.hotelClickHnadler = function (hotel) {
                    $mdDialog.show({
                        template: '<md-dialog>' +
                        '   <div class="remove-hotel-or-see-details"> ' +
                        '   <div class="choose-action-title"> Please Choose One Action.</div>' +
                        '   <div class="explanation">remove hotel from the list or see hotel details</div>' +
                        '  <md-dialog-actions>' +
                        '    <md-button ng-click="seeDetails()" class="md-primary see-details-btn">' +
                        '      See hotel details' +
                        '    </md-button>' +

                        '    <md-button ng-click="removeHotel()" class="md-primary remove-hotel-btn">' +
                        '      remove hotel from the list' +
                        '    </md-button>' +
                        '  </md-dialog-actions>' +
                        '</div>' +
                        '</md-dialog>',
                        clickOutsideToClose: true,
                        controller: function ($scope) {
                            $scope.seeDetails = function () {
                                $mdDialog.hide();
                                $state.go('hotel', {id: hotel._id});
                            };

                            $scope.removeHotel = function () {
                                $mdDialog.hide();
                                for (var i = 0; i < _this.allHotels.length; i++) {
                                    if (_this.allHotels[i]._id === hotel._id) {
                                        _this.allHotels.splice(i, 1);
                                        return;
                                    }
                                }
                            };
                        }
                    });
                };
            }
        }
    );
