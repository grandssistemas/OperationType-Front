require('./import-style');
require('./import-modules');

let baseOperation = require('./baseOperationType.html');

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
            .state('stock', {
                data: {
                    id: 1
                },
                url: '/stock',
                templateUrl: baseOperation
            })
            .state('businessrule', {
                data: {
                    id: 1
                },
                url: '/businessrule',
                templateUrl: baseOperation
            })
    });