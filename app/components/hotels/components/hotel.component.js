angular.module('hotels')
    .component('hotel', {
            templateUrl: 'app/components/hotels/templates/hotel.template.html',
            bindings: {
                hotel: '<'
            },
            controller: function(hotelSrv, $timeout, $mdDialog){
                'ngInject';

                var _this = this;
                var originalHotel;

                _this.$onChanges = function (changesObj) {
                    if (angular.isDefined(changesObj) && angular.isDefined(changesObj.hotel)) {
                        originalHotel = changesObj.hotel.currentValue;
                        _this.hotel = angular.copy(changesObj.hotel.currentValue);
                    }
                };

                _this.save = function () {
                    originalHotel.description = _this.hotel.description;
                    originalHotel.address = _this.hotel.address;
                    originalHotel.details = _this.hotel.details;
                    originalHotel.amenities = _this.hotel.amenities;
                    _this.activated = true;
                    hotelSrv.updateHotels(originalHotel).then(function(){
                        hotelSrv.updateVisitedHotels(originalHotel);
                        $timeout(function(){
                            _this.activated = false;
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('The hotel updated successfully')
                                    .ok('Ok')
                            );
                        },500);
                    });
                }
            }
        }
    );
