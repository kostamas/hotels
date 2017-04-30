angular.module('hotels')
    .service('hotelSrv', function ($http, HOTEL, $log, $q, $window) {
            'ngInject';
            var _this = this;

            _this.getBrands = function () {
                return $http.get(HOTEL.BRANDS_URL).then(function (result) {
                    return result.data;
                }).catch(function (error) {
                    $log.error(error.statusText | error);
                })
            };

            _this.getHotels = function () {
                if (_this.hotels) {
                    return $q.when(_this.hotels);
                }

                return $http.get(HOTEL.HOTELS_URL).then(function (result) {
                    _this.hotels = result.data;
                    return result.data;
                }).catch(function (error) {
                    $log.error(error.statusText | error);
                })
            };

            _this.updateHotels = function () {
                return $http.put(HOTEL.HOTELS_URL, _this.hotels).then(function (result) {
                    _this.hotels = result.data
                }).catch(function (error) {
                    $log.error(error.statusText | error);
                })
            };

            _this.getVisitedHotels = function () {
                var visitedHotelsJson = $window.localStorage.getItem(HOTEL.LOCAL_STORAGE_VISITED_ITEMS);
                var visitedHotelsObj = angular.fromJson(visitedHotelsJson);
                var visitedHotelsArr = [];

                angular.forEach(visitedHotelsObj, function (hotel) {
                    visitedHotelsArr.push(hotel);
                });

                return visitedHotelsArr;
            };

            _this.getHotelBYId = function (hotelId) {
                return _this.getHotels().then(function (hotels) {
                    for (var i = 0; i < hotels.length; i++) {
                        if (hotels[i]._id === hotelId) {
                            return hotels[i];
                        }
                    }
                })
            };

            _this.updateVisitedHotels = function (hotel) {
                var visitedHotelsJson = $window.localStorage.getItem(HOTEL.LOCAL_STORAGE_VISITED_ITEMS);
                var visitedHotels = angular.fromJson(visitedHotelsJson) || {};
                if (!visitedHotels[hotel._id]) {
                    visitedHotels[hotel._id] = {};
                }

                visitedHotels[hotel._id] = {
                    _id: hotel._id,
                    name: hotel.name,
                    address: hotel.address,
                    details: hotel.details,
                    time: Date.now()
                };

                visitedHotelsJson = angular.toJson(visitedHotels);
                $window.localStorage.setItem(HOTEL.LOCAL_STORAGE_VISITED_ITEMS, visitedHotelsJson);
            }
        }
    );