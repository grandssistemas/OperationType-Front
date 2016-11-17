angular.module('operationtype.core', [
    'ui.router'
    , 'ngSanitize'
    , 'gumga.core'
    , 'brasil.filters'
    , 'ui.utils.masks'
    , 'datePicker'
    , 'app.stock'
    , 'app.businessrule'
    , 'operationtype.templates'
    , 'paymenttype.core'
    , 'characteristic.core'
    //FIMINJECTIONS
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('stock', {
                data: {
                    id: 1
                },
                url: '/stock',
                templateUrl: 'modules/stock/views/base.html'
            })
            .state('businessrule', {
                data: {
                    id: 1
                },
                url: '/businessrule',
                templateUrl: 'modules/businessrule/views/base.html'
            })
    });