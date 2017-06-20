angular.module('app.stock.controllers')
    .controller('StockFormController', [
        'StockService',
        'entity',
        '$scope',
        'NotesQueryService',
        'OperationTypeService',
        '$q', function (StockService,
                        entity,
                        $scope,
                        NotesQueryService,
                        OperationTypeService,
                        $q) {
            StockService.resetDefaultState();
            $scope.entity = angular.copy(entity.data);
            $scope.continue = {};
            $scope.atributos = [];
            $scope.status = {isProdutoOpen: true};
            $scope.array = [];
            $scope.list = [];
            $scope.treePattern = ['OPERATION', 'OPERATION', 'OPERATIONTYPE'];

            var prom = null;

            StockService.getTree().then(function (data) {
                $scope.list = data.data.data;
            });

            $scope.getChildrens = function (id, type) {
                return StockService.getChildrens(id, type);
            };

            var translateEntity = function (data) {
                var aux = {};
                aux.id = data.id;
                aux.version = data.version;
                aux.name = data.name;
                aux.characteristicsPT = data.characteristicsPT;
                aux.characteristics = data.characteristics;
                aux.description = data.description;
                aux.informative = data.informative;
                aux.stockType = data.stockType;
                aux.father = data.father;
                aux.fixedCharacteristics = data.fixedCharacteristics;
                aux.operationCategory = data.operationCategory;
                aux.invoiceObjective = data.invoiceObjective;
                aux.message = data.message;
                aux.type = data.type;
                aux.editable = data.stockType === 'OPERATIONTYPE';
                data.childrens = data.childrens || [];
                aux.childrens = data.childrens.map(translateEntity);
                aux.integrationId = data.integrationId;
                if (aux.stockType === $scope.treePattern[2]) {
                    aux.informative = false;
                }
                return aux;
            };

            $scope.update = function (entity) {
                var aux = entity.map(translateEntity);
                StockService.saveTree(aux)
                    .then(function () {
                        StockService.getTree().then(function (data) {
                            $scope.list = data.data.data;
                        });
                    });
            };

            $scope.editOperation = function (data) {
                $scope.typeAux = data.stockType;
                $scope.objAux = data;
                prom = $q.defer();
                return prom.promise;
            };


            $scope.removable = function (data) {
                return data.stockType === 'OPERATIONTYPE'
            };

            $scope.addNew = function (obj, type) {
                if (prom) {
                    prom.resolve(obj);
                    prom = null;
                    $scope.typeAux = '';
                } else {
                    obj.childrens = [];
                    obj.characteristics = [];
                    obj.characteristicsPT = [];
                    var aux = angular.copy(obj);
                    aux.stockType = type;
                    $scope.array.push(aux);
                }
                return {};
            };

            $scope.deleteItem = function (type, index) {
                if (type === 'CATEGORY') {
                    $scope.arrayCategory.splice(index, 1);
                } else {
                    $scope.arrayType.splice(index, 1);
                }
            };

            $scope.createObject = function () {
                $scope.objAux = {
                    name: '',
                    invoiceObjective: '',
                    operationCategory: '',
                    message: '',
                    fixedCharacteristics: {
                        allowFreight: true,
                        allowStockMovement: true,
                        allowCashMovement: true,
                        allowNFe: true,
                        allowNFCe: true,
                        quickSale: true
                    }
                }
            };

            $scope.deleteFunctions = [];
            $scope.deleteFunctions[2] = function (data) {
                return OperationTypeService.deleteCollection([data]);
            };


            NotesQueryService.getDocumentFinality().then(function (data) {
                $scope.documentFinalityList = data.data;
            });

            OperationTypeService.recoveryOperationCategoryDto().then(function (data) {
                $scope.operationCategoryList = data.data;
            });
        }
    ]);