require('./controllers/module');
require('./services/module');

let list = require('./views/list.html');
let stepOne = require('./views/BusinessRuleStepOne.html');
let stepTwo = require('./views/BusinessRuleStepTwo.html');

module.exports = angular.module('app.businessrule', ['ui.router', 'app.businessrule.controllers', 'app.businessrule.services', 'api.location'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.businessrule.list', {
                url: '/list',
                templateUrl: list,
                controller: 'BusinessRuleListController',
                data: {id: 2}
            })
            .state('app.businessrule.stepone', {
                url: '/insert/stepone',
                templateUrl: stepOne,
                controller: 'BusinessRuleStepOneController',
                data: {id: 3},
                resolve: {
                    operations: ['OperationTypeService', function (OperationTypeService) {
                        return OperationTypeService.allByOperation('EXIT').then(function (data) {
                            return data.data;
                        })
                    }]
                }
            })
            .state('app.businessrule.steptwo', {
                url: '/insert/steptwo',
                templateUrl: stepTwo,
                controller: 'BusinessRuleStepTwoController',
                data: {id: 3},
                params: {
                    operations: null
                },
                resolve: {
                    operations: ['$transition$', function ($transition$) {
                        return $transition$.params().operations || []
                    }]
                }
            })
    }]);
