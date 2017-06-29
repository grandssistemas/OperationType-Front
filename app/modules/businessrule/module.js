angular.module('app.businessrule', ['ui.router', 'app.businessrule.controllers', 'app.businessrule.services', 'api.location'])
    .config(['$stateProvider', 'apiLocation', function ($stateProvider, apiLocation) {
        $stateProvider
            .state('businessrule.list', {
                url: '/list',
                templateUrl: 'modules/businessrule/views/list.html',
                controller: 'BusinessRuleListController',
                data: {id: 2}
            })
            .state('businessrule.stepone', {
                url: '/insert/stepone',
                templateUrl: 'modules/businessrule/views/BusinessRuleStepOne.html',
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
            .state('businessrule.steptwo', {
                url: '/insert/steptwo',
                templateUrl: 'modules/businessrule/views/BusinessRuleStepTwo.html',
                controller: 'BusinessRuleStepTwoController',
                data: {id: 3},
                params: {
                  operations: null
                },
                resolve: {
                    operations: ['$stateParams', function ($stateParams) {
                        return $stateParams.operations || []
                    }]
                }
            })
    }]);
