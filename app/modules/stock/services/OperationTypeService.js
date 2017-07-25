OperationTypeService.$inject = ['GumgaRest', 'apiLocation', '$q'];
function OperationTypeService(GumgaRest, apiLocation, $q) {
    var service = new GumgaRest(apiLocation.concat('/api/operationtype'));

    service.recoverByCategory = function (name) {
        return service.extend('get', '/recover-by-category?category='.concat(name));
    };

    service.saveAll = function (entities) {
        var promises = entities.map(service.update);
        return $q.all(promises);
    };

    service.all = function () {
        return service.extend('get', '/all');
    };

    service.allWithTenancy = function () {
        return service.extend('get', '/getallwithtenancy');
    };

    service.allByOperation = function (type) {
        return service.extend('get', '/getallbyoperation/' + type);
    };

    service.recoveryAllByCategory = function (name) {
        return service.extend('get', '/recoveryallbycategory?category=' + name);
    };

    service.recoveryOperationCategoryDto = function () {
        return service.extend('get', '/recoveryoperationcategory');
    };

    service.addBusinessRules = function (operationId, businessRules) {
        return service.extend('post', '/addbusinessrules/'.concat(operationId), businessRules);
    };

    return service;
}
module.exports = OperationTypeService;