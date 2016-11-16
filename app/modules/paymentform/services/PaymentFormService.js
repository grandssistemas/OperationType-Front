angular.module('app.paymentform.services')
    .service('PaymentFormService', ['GumgaRest', 'apiLocation', function (GumgaRest, apiLocation) {
        var service = new GumgaRest(apiLocation.concat('/api/paymentform'));

        service.saveTree = function (entity) {
            var promises = entity.map(saveNode);
            return $q.all(promises);
        };

        function saveNode(data) {
            return service.extend('post', '/tree/save', data);
        }

        service.getTree = function () {
            return service.extend('get', '/tree');
        };

        service.getChildrens = function (id, type) {
            return service.extend('get', '/tree/childrens/'.concat(type).concat('/').concat(id));
        };

        return service;
    }]);
