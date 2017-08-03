require('../services/module');

module.exports = angular.module('app.stock.controllers', ['app.stock.services', 'ui.router'])
    .controller('StockFormController', require('./StockFormController'));