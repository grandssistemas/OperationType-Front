StockService.$inject = ['GumgaRest', 'apiLocation', '$q'];
function StockService(GumgaRest, apiLocation, $q) {
    var service = new GumgaRest(apiLocation.concat('/api/operation'));

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

    service.getDocumentFinality = function(){
        return service.extend('get', '/documentfinality');
    };

    service.copyRecord = function (id) {
        return this.extend('post', '/copyrecord/' + id);
    };

    service.deleteRecord = function (id) {
        return this.extend('delete', '/deleterecord/' + id);
    };

    return service;
}
module.exports = StockService;