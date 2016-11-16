angular.module('app.paymentform', ['ui.router', 'app.paymentform.controllers', 'app.paymentform.services'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('paymentmethods.insert', {
                url: '/insert',
                templateUrl: 'modules/paymentform/views/form.html',
                controller: 'PaymentFormController',
                controllerAs: 'form',
                data: {id: 3},
                resolve: {
                    entity: function () {
                        return {};
                    }
                }
            });
    }]);
