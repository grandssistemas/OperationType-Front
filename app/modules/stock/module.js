require('./controllers/module');
require('./services/module');

let form = require('./views/form.html');

module.exports = angular.module('app.stock', ['ui.router', 'app.stock.controllers', 'app.stock.services'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('stock.insert', {
                url: '/insert',
                templateUrl: form,
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
