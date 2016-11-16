angular.module('operationtype.core', [
    'ui.router'
    , 'ngSanitize'
    , 'gumga.core'
    , 'brasil.filters'
    , 'ui.utils.masks'
    , 'datePicker'
    , 'app.paymentform'
    , 'app.stock'
    , 'operationtype.templates'
    //FIMINJECTIONS
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('paymentmethods', {
                data: {
                    id: 1
                },
                url: '/paymentmethods',
                templateUrl: 'modules/paymentmethods/views/base.html'
            })
            .state('stock', {
                data: {
                    id: 1
                },
                url: '/stock',
                templateUrl: 'modules/stock/views/base.html'
            })
    });