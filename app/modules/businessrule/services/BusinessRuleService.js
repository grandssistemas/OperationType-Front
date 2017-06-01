angular.module('app.businessrule.services')
    .service('BusinessRuleService', ['GumgaRest', 'apiLocation', '$q', '$http', function (GumgaRest, apiLocation, $q, $http) {
        var service = new GumgaRest(apiLocation + '/api/businessrule');


        service.update = function (entity) {
            var identifier = entity.identifier;
            delete entity.identifier;
            return service.save(entity).then(function (data) {
                data.identifier = identifier;
                return data;
            });
        };

        service.saveEntityRule = function (entity) {
            var promises = entity.map(service.update);
            return $q.all(promises);
        };

        service.getOperatorType = function () {
            return service.extend('get', '/operatorType');
        };

        service.getValueType = function () {
            return service.extend('get', '/valueType');
        };

        service.changeStatus = function (id) {
            return service.extend('get', '/changestatus/'.concat(id));
        };

        service.saveWithOperationType = function(operations, rules){
            return service.extend('post','/manywithoperation', {
                rules : rules,
                operationTypes : operations
            })
        }

        return service;
    }]);
