angular.module('app.stock', ['ui.router', 'app.stock.controllers', 'app.stock.services'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('stock.insert', {
                url: '/insert',
                templateUrl: 'modules/stock/views/form.html',
                controller: 'StockFormController',
                controllerAs: 'form',
                data: {id: 3},
                resolve: {
                    entity: function () {
                        return {};
                    }
                }
            })
    }]);
