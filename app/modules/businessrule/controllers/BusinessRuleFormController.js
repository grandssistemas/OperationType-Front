angular.module('app.businessrule.controllers')
    .controller('BusinessRuleFormController', [
        '$state',
        'entity',
        '$scope',
        'BusinessRuleService',
        'PaymentTypeService',
        'operationTypes',
        'OperationTypeService', function ($state,
                                          entity,
                                          $scope,
                                          BusinessRuleService,
                                          PaymentTypeService,
                                          operationTypes,
                                          OperationTypeService) {
            var identifier = 0;
            BusinessRuleService.resetDefaultState();
            PaymentTypeService.resetDefaultState();
            $scope.entity = angular.copy(entity.data);
            $scope.continue = {};
            $scope.rules = [];
            $scope.combinations = [];
            $scope.content = {};
            $scope.page = 1;
            $scope.entity.discount = $scope.entity.discount || 0;
            $scope.entity.discountType = $scope.entity.discountType || '';
            $scope.entity.entryType = $scope.entity.entryType || '';
            $scope.entity.entryValue = $scope.entity.entryValue || 0;
            $scope.entity.entryPaymentTypes = $scope.entity.entryPaymentTypes || [];
            $scope.entity.parcelsPaymentTypes = $scope.entity.parcelsPaymentTypes || [];
            $scope.entity.hasEntry = $scope.entity.hasEntry || {value: false};
            $scope.entity.operationOwner = $scope.entity.operationOwner || '';
            $scope.operationTypes = operationTypes;
            $scope.entity.recurrence = $scope.entity.recurrence || {value: true};
            $scope.atualDate = new Date();
            $scope.entity.startDuraction = new Date();
            $scope.entity.value = 0;

            var initializeEntity = function () {
                $scope.entity.discount = 0;
                $scope.entity.hasEntry = {value: false};
                $scope.entity.entryValue = 0;
                $scope.entity.parcelsCount = 0;
                $scope.entity.negotiationInterval = 0;
                $scope.entity.value = 0;
                $scope.entity.startDuraction = new Date();
                $scope.entity.endDuraction = null;
                $scope.entity.operatorType = null;
                $scope.entity.entryType = 'VALUE';
                $scope.entity.discountType = 'VALUE';
                $scope.clickedBtnBlue = false;
                $scope.clickedBtnGreen = false;
                $scope.entity.operationOwner = [];
                $scope.entity.entryPaymentTypes = [];
                $scope.entity.parcelsPaymentTypes = [];
                $scope.entity.recurrence = {value: true};
            };

            if ($scope.entity.entryType === 'PERCENTAGE' && $scope.entity.entryValue === 1) {
                $scope.clickedBtnGreen = true;
            } else {
                $scope.entity.id ? $scope.clickedBtnBlue = true : angular.noop;
            }

            $scope.get = function (page, size) {
                return PaymentTypeService.get(page, size).then(function (data) {
                    return data.data.values;
                })
            };

            $scope.checkDate = function (inputId) {
                if ((typeof $scope.entity[inputId]) == 'undefined') {
                    var a = document.getElementById(inputId).value,
                        data = a.split('/').map(function (data) {
                            return parseInt(data);
                        }),
                        isValid = data.filter(function (data) {
                                return typeof data == 'number';
                            }).length === 3;
                    if (isValid) {
                        $scope.entity[inputId] = new Date(data[2], data[1] - 1, data[0]);
                    }
                    if ((typeof $scope.entity[inputId]) == 'undefined') {
                        document.getElementById(inputId).value = null;
                    }
                }
            };

            $scope.minimumParcelsCount = function () {
                if ($scope.entity.parcelsCount < 0) {
                    $scope.entity.parcelsCount = 0;
                }
            };

            $scope.minimumNegotiationInterval = function () {
                if ($scope.entity.negotiationInterval < 0) {
                    $scope.entity.negotiationInterval = 0;
                }
            };

            $scope.conf = {
                columns: 'association,whenthevalueis,entryValue,discount,parcelsCount,negotiationInterval,start,end,button',
                selection: 'single',
                columnsConfig: [
                    {
                        name: 'association',
                        size: 'col-md-2',
                        title: '<strong gumga-translate-tag="businessrule.movementtype">Movement type</strong>',
                        content: '{{$value.operationOwner.name}}'
                    },
                    {
                        name: 'whenthevalueis',
                        size: 'col-md-2',
                        title: '<strong gumga-translate-tag="businessrule.whenthevalueis">When the value is</strong>',
                        content: '<div ng-show="$value.value > 0">{{$value.operatorType}}: {{$value.value | currency:\'R$\'}}</div>'
                        + '<div ng-hide="$value.value > 0"><span gumga-translate-tag="label.all">All</span></div>'
                    },
                    {
                        name: 'entryValue',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.entryvalue">Entry value</strong>',
                        content: '<div ng-show="$value.entryType == \'PERCENTAGE\' ">{{$value.entryValue * 100}}%</div>' +
                        '<div ng-show="$value.entryType == \'VALUE\' ">{{$value.entryValue | currency:\'R$\'}}</div>'
                    },
                    {
                        name: 'discount',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.maxdiscount">Max discount</strong>',
                        content: '<div ng-show="$value.discountType == \'PERCENTAGE\' ">{{$value.discount * 100}}%</div>' +
                        '<div ng-show="$value.discountType == \'VALUE\' ">{{$value.discount | currency:\'R$\'}}</div>'
                    },
                    {
                        name: 'parcelsCount',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.parcelscount">Parcels count</strong>',
                        content: '<div>{{$value.parcelsCount}}</div>'
                    },
                    {
                        name: 'negotiationInterval',
                        size: 'col-md-2',
                        title: '<strong gumga-translate-tag="businessrule.installmentsinterval">Installments interval</strong>',
                        content: '<div ng-show="$value.negotiationInterval > 1">{{$value.negotiationInterval}} dias</div>' +
                        '<div ng-show="$value.negotiationInterval == 1">{{$value.negotiationInterval}} dia</div>' +
                        '<div ng-show="$value.negotiationInterval == 0">----------</div>'
                    },
                    {
                        name: 'start',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.start">Start</strong>',
                        content: '<div>{{$value.startDuraction | date: \'dd/MM/yyyy\'}}</div>'
                    },
                    {
                        name: 'end',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.end">End</strong>',
                        content: '<div>{{$value.endDuraction | date: \'dd/MM/yyyy\'}}</div>'
                    },
                    {
                        name: 'button',
                        title: ' ',
                        size: 'col-md-1',
                        content: '<button type="button" class="btn btn-danger btn-xs pull-right button-delete" ng-click="$parent.$parent.removeRule($index)"><span class="glyphicon glyphicon-remove"></span></button>'
                    }
                ]
            };


            $scope.addRules = function (entity) {
                var obj = angular.copy(entity);
                obj.hasEntry = {value: obj.entryValue != null && obj.entryValue !== 0};
                obj.identifier = identifier++;
                delete obj.operationOwner;
                entity.operationOwner.map(function (data) {
                    obj.operationOwner = data;
                    return angular.copy(obj);
                }).forEach(function (data) {
                    $scope.rules.push(data);
                });
                $scope.combinations.push(obj);
                initializeEntity();
            };

            $scope.removeRule = function (index) {
                if ($scope.rules) {
                    $scope.rules.splice(index, 1);
                }
            };

            $scope.update = function (entity) {
                var rules = angular.copy(entity)
                    , arrAux = []
                    , arrMT = {};
                rules = rules.filter(function (data) {

                    var toReturn = !arrAux[data.identifier];
                    arrMT[data.identifier] = arrMT[data.identifier] || [];
                    arrMT[data.identifier].push(data.operationOwner);
                    arrAux[data.identifier] = true;
                    return toReturn;
                }).map(function (data) {
                    data.id = data.id ? data.id : null;
                    if (data.operatorType === ' ') {
                        data.operatorType = null;
                    }
                    delete data.operationOwner;
                    return data;
                });
                BusinessRuleService.saveEntityRule(rules)
                    .then(function (brs) {
                        var arrOpt = {}
                        brs.forEach(function (br) {
                            arrMT[br.identifier].forEach(function (opt) {
                                arrOpt[opt.id] = arrOpt[opt.id] || [];
                                arrOpt[opt.id].push(br.data.data.id);
                            });
                        });
                        for (var opt in arrOpt) {
                            OperationTypeService.addBusinessRules(opt, arrOpt[opt]);
                        }
                        $state.go('businessrule.list');
                    });
            };

            $scope.saveOnEdit = function (entity) {
                BusinessRuleService.update(entity).then(function () {
                    if (!$scope.continue.insert) {
                        $state.go('businessrule.list');
                    } else {
                        $scope.entity = angular.copy(entity.data);
                    }
                })
            };

            BusinessRuleService.getOperatorType().success(function (data) {
                $scope.operators = data;
            });

            BusinessRuleService.getValueType().success(function (data) {
                $scope.valueTypes = data;
            });

            $scope.blockBtnAdd = function () {
                if ($scope.clickedBtnBlue) {
                    return $scope.entity.operationOwner.length === 0
                        || !$scope.entity.startDuraction
                        || $scope.entity.parcelsCount === 0
                        || ($scope.entity.entryValue > 0 && $scope.entity.entryPaymentTypes.length === 0)
                        || ($scope.entity.entryValue === 0 && $scope.entity.entryPaymentTypes.length > 0)
                        || $scope.entity.parcelsPaymentTypes.length === 0
                        || ($scope.entity.recurrence.value === false && $scope.entity.negotiationInterval === 0);
                } else {
                    if ($scope.entity.operationOwner.length <= 0 || !$scope.entity.startDuraction || $scope.entity.entryPaymentTypes.length <= 0) {
                        return true;
                    }
                }
            };

            $scope.$watch('entity.discount', function () {
                if ($scope.entity.discountType === 'PERCENTAGE' && $scope.entity.discount > 1) {
                    $scope.entity.discount = 1;
                }
            });

            $scope.$watch('entity.discountType', function () {
                if ($scope.entity.discountType && !$scope.entity.id) {
                    $scope.entity.discount = 0;
                }
            });

            $scope.$watch('entity.entryValue', function () {
                if ($scope.entity.entryType === 'PERCENTAGE' && !$scope.entity.id
                    && $scope.clickedBtnBlue && $scope.entity.entryValue > 0.99) {
                    $scope.entity.entryValue = 0.99;
                }
            });

            $scope.$watch('entity.entryType', function () {
                if ($scope.clickedBtnBlue && $scope.entity.entryType) {
                    $scope.entity.entryValue = 0
                }
            });

            $scope.$watch('clickedBtnGreen', function () {
                if ($scope.clickedBtnGreen && !$scope.entity.id) {
                    $scope.entity.entryType = 'PERCENTAGE';
                    $scope.entity.entryValue = 1;
                }
            });

            $scope.$watch('entity.recurrence.value', function () {
                if ($scope.entity.recurrence.value === true) {
                    $scope.entity.negotiationInterval = 0;
                }
            });

            $scope.hideInstallment = function () {
                if ($scope.clickedBtnGreen) {
                    return true;
                }
            };

            $scope.disabledNegotiationInterval = function () {
                if ($scope.entity.recurrence.value === true) {
                    return true;
                }
            };

            $scope.changeTerm = function () {
                if ($scope.entity.entryType === 'PERCENTAGE' && $scope.entity.entryValue === 1) {
                    $scope.entity.entryValue = 0.99;
                }
            };

            $scope.changeStartDate = function (value) {
                if ((value && $scope.entity.endDuraction && value > $scope.entity.endDuraction) || !value) {
                    $scope.entity.endDuraction = "";
                }
            };

            $scope.changeEndDate = function (value) {
                var startDate = $scope.entity.startDuraction;
                if (typeof startDate === 'string') {
                    startDate = new Date(startDate);
                }
                if ((startDate && value && startDate > value) || !startDate) {
                    $scope.entity.endDuraction = "";
                }
            };

            $scope.configStartDate = {
                change: function (data) {
                    $scope.changeStartDate(data);
                }
            };

            $scope.configEndDate = {
                change: function (data) {
                    data = new Date(data);
                    $scope.changeEndDate(data);
                }
            };

        }
    ]);
