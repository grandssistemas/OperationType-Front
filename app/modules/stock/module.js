require('./controllers/module');
require('./services/module');

const form = require('./views/form.html');

module.exports = angular.module('app.stock', ['ui.router', 'app.stock.controllers', 'app.stock.services'])
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('app.stock.insert', {
				url: '/insert',
				template: form,
				controller: 'StockFormController',
				controllerAs: 'form',
				data: { id: 3 },
				resolve: {
					entity() {
						return {};
					}
				}
			});
	}]);
