angular.module('app.paymentform.services')
    .service('PaymentCategoryService', ['GumgaRest', 'apiLocation', function (GumgaRest, apiLocation) {
        var service = new GumgaRest(apiLocation + '/api/paymentcategory');
        return service;
    }]);