require('./import-style');
require('./import-modules');

let baseOperation = '/baseGrandsComponents.html';

module.exports = angular.module('operationtype.core', [
    'ui.router',
    'ngSanitize',
    'gumga.core',
    'brasil.filters',
    'ui.utils.masks',
    'datePicker',
    'app.stock',
    'app.businessrule',
    'paymenttype.core',
    'characteristic.core'
    //FIMINJECTIONS
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.stock', {
                data: {
                    id: 1
                },
                url: '/stock',
                abstract: true
            })
            .state('app.businessrule', {
                data: {
                    id: 1
                },
                url: '/businessrule',
                abstract: true
            })
    });