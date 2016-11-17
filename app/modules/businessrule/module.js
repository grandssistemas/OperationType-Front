angular.module('app.businessrule', ['ui.router', 'app.businessrule.controllers', 'app.businessrule.services', 'api.location'])
    .config(['$stateProvider', 'apiLocation', function ($stateProvider, apiLocation) {
        $stateProvider
            .state('businessrule.list', {
                url: '/list',
                templateUrl: 'modules/businessrule/views/list.html',
                controller: 'BusinessRuleListController',
                data: {id: 2}
            })
            .state('businessrule.insert', {
                url: '/insert',
                templateUrl: 'modules/businessrule/views/form.html',
                controller: 'BusinessRuleFormController',
                data: {id: 3}, resolve: {
                    entity: ['$stateParams', '$http', function ($stateParams, $http) {
                        var url = apiLocation + '/api/businessrule/new'
                        return $http.get(url);
                    }]
                    , operationTypes: ['OperationTypeService', function (OperationTypeService) {
                        return OperationTypeService.allWithTenancy().then(function (data) {
                            return data.data;
                        })
                    }]
                }
            })
            .state('businessrule.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/businessrule/views/form.html',
                controller: 'BusinessRuleFormController',
                data: {id: 3}, resolve: {
                    entity: ['$stateParams', '$http', function ($stateParams, $http) {
                        var url = apiLocation + '/api/businessrule/' + $stateParams.id;
                        return $http.get(url);
                    }],
                    operationTypes: function () {
                        return [];
                    }
                }
            });
    }]);
