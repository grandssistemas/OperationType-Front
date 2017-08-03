/**
 * Created by igorsantana on 19/05/2015 13:41:06.
 */
module.exports = angular.module('app.stock.services', ['api.location'])
    .service('StockService', require('./StockService'))
    .service('OperationTypeService', require('./OperationTypeService'));