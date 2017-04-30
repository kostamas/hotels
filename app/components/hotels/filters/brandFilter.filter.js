angular.module('hotels')
    .filter('brandFilter', function () {
        return function (items, brandVal) {
            if(+brandVal === -1 || brandVal === null){
                return items;
            }

            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.details.brand.val === +brandVal) {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    });
