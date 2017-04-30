angular.module('hotels')
    .constant('HOTEL', {
        BRANDS_URL: 'https://jsonblob.com/api/jsonBlob/03b65292-2c22-11e7-ae4c-c56c53cfee28',
        HOTELS_URL: 'https://jsonblob.com/api/jsonBlob/7a240de1-2c23-11e7-ae4c-c553a6f37282',
        LOCAL_STORAGE_VISITED_ITEMS: 'visitedHotels',
        ALL_HOTELS_VIEW: 1,
        VISITED_HOTELS_VIEW: 2
    });