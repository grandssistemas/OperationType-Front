angular.module('app.paymentform.controllers')
    .controller('PaymentFormController', [
        'PaymentFormService',
        'PaymentTypeService',
        'PaymentCategoryService',
        'entity',
        '$scope', function (PaymentFormService,
                            PaymentTypeService,
                            PaymentCategoryService,
                            entity,
                            $scope) {
            PaymentFormService.resetDefaultState();
            $scope.entity = angular.copy(entity.data);
            $scope.continue = {};
            $scope.atributos = [];
            $scope.status = {isProdutoOpen: true};
            $scope.array = [];
            $scope.list = [];
            $scope.treePattern = ['PAYMENTMETHOD', 'PAYMENTCATEGORY', 'PAYMENTTYPE'];

            PaymentFormService.getTree().success(function (data) {
                $scope.list = data.data;
            });

            $scope.getChildrens = function (id, type) {
                return PaymentFormService.getChildrens(id, type);
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
                aux.paymentMethodsTypes = data.paymentMethodsTypes;
                aux.father = data.father;
                aux.icon = data.icon;
                data.childrens = data.childrens || [];
                aux.childrens = data.childrens.map(translateEntity);
                if (aux.paymentMethodsTypes === $scope.treePattern[2]) {
                    aux.informative = false;
                    aux.method = data.method;
                }
                return aux;
            };

            $scope.update = function (entity) {
                var aux = entity.map(translateEntity);
                PaymentFormService.saveTree(aux)
                    .then(function () {
                        PaymentFormService.getTree().then(function (data) {
                            $scope.list = data.data.data;
                        });
                    });
            };

            $scope.addNew = function (obj, type) {
                obj.childrens = [];
                obj.characteristics = [];
                obj.characteristicsPT = [];
                var aux = angular.copy(obj);
                aux.paymentMethodsTypes = type;
                $scope.array.push(aux);
                return {};
            };

            $scope.deleteItem = function (type, index) {
                if (type === 'CATEGORY') {
                    $scope.arrayCategory.splice(index, 1);
                } else {
                    $scope.arrayType.splice(index, 1);
                }
            };

            $scope.invalidAddButton = function (type, obj) {
                var isTypeRight = type === $scope.treePattern[2] && (obj.icon == null || obj.icon === '');
                return type === '' || obj.name == null || obj.name === '' || isTypeRight;
            };

            $scope.deleteFunctions = [];
            $scope.deleteFunctions[1] = function (data) {
                return PaymentCategoryService.deleteCollection([data]);
            };
            $scope.deleteFunctions[2] = function (data) {
                return PaymentTypeService.deleteCollection([data]);
            };


            PaymentTypeService.getPaymentMethods().then(function (data) {
                $scope.paymentMethodsList = data.data;
            });

            $scope.getSelectedPayment = function (data) {
                $scope.objAux.icon = data.icon
            }
        }
    ]);