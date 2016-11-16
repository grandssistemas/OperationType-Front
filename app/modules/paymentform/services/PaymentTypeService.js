angular.module('app.paymentform.services')
    .service('PaymentTypeService', ['GumgaRest', 'apiLocation', function (GumgaRest, apiLocation) {
        var service = new GumgaRest(apiLocation + '/api/paymenttype');


        service.get = function (page, size) {
            if (page) {
                if (size) {
                    this._query.params.pageSize = size;
                }
                this._query.params.start = (page - 1) * (this._query.params.pageSize - 1);
                if (this._query.params.start < 0) {
                    this._query.params.start = 0;
                }
                if (page < 1) {
                    throw 'Invalid page';
                }
            }
            return service.extend('get', '', this._query);
        };


        service.getPaymentMethods = function () {
            return service.extend('get', '/paymentmethodstypes');
        };

        return service;
    }]);
