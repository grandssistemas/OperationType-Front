angular.module('app.businessrule.controllers')
    .controller('BusinessRuleListController', [
        '$scope',
        'gumgaController',
        'BusinessRuleService',
        '$rootScope',
        function ($scope,
                  gumgaController,
                  BusinessRuleService,
                  $rootScope) {
            gumgaController.createRestMethods($scope, BusinessRuleService, 'businessrule');
            $scope.businessrule.execute('reset');
            $scope.businessrule.execute('get');

            $scope.businessrule.on('deleteSuccess', function () {
                $scope.businessrule.execute('get');
            });

            $scope.conf = {
                columns: 'parcelsCount,status,button',
                selection: 'none',
                checkbox: false,
                materialTheme: true,
                activeLineColor: '#cccccc',
                hoverLineColor: '#f5f5f5',
                itemsPerPage: [5, 10, 25, 50, 100],
                title:'Listagem de Regras comerciais',
                columnsConfig: [
                    {
                        name: 'discount',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.maximumdiscount">Maximum discount</strong>',
                        content: '<div ng-show="$value.discountType == \'PERCENTAGE\' ">{{$value.discount * 100}}%</div>' +
                        '<div ng-show="$value.discountType == \'VALUE\' ">{{$value.discount | currency:\'R$\'}}</div>'
                    }, {
                        name: 'valueRestriction',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.valuerestriction">When the value go</strong>',
                        content: '<div ng-show="$value.value > 0">{{$parent.$parent.format[$value.operatorType]}}: {{$value.value | currency:\'R$\'}}</div>'
                        + '<div ng-hide="$value.value > 0"><span gumga-translate-tag="label.all">For All</span></div>'
                    },
                    {
                        name: 'entryValue',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.entryvalue">Entry value</strong>',
                        content: '<div ng-show="$value.entryType == \'PERCENTAGE\' ">{{$value.entryValue * 100}}%</div>' +
                        '<div ng-show="$value.entryType == \'VALUE\' ">{{$value.entryValue | currency:\'R$\'}}</div>'
                    },
                    {
                        name: 'parcelsCount',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.parcelscount">Parcels count</strong>',
                        content: '<div ng-show="$value.parcelsCount > 1">{{$value.parcelsCount}} vezes</div>' +
                        '<div ng-show="$value.parcelsCount == 1">{{$value.parcelsCount}} vez</div>' +
                        '<div ng-show="$value.parcelsCount == 0">----------</div>'
                    },
                    {
                        name: 'negotiationInterval',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.negotiationinterval">Negotiation interval</strong>',
                        content: '<div ng-show="$value.negotiationInterval > 1">{{$value.negotiationInterval}} dias</div>' +
                        '<div ng-show="$value.negotiationInterval == 1">{{$value.negotiationInterval}} dia</div>' +
                        '<div ng-show="$value.negotiationInterval == 0">----------</div>'
                    },
                    {
                        name: 'start',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.start">Start</strong>',
                        content: '{{$value.startDuraction | date:\'dd/MM/yyyy\'}}'
                    },
                    {
                        name: 'end',
                        size: 'col-md-1',
                        title: '<strong gumga-translate-tag="businessrule.end">End</strong>',
                        content: '{{$value.endDuraction | date:\'dd/MM/yyyy\'}}'
                    },
                    {
                        name: 'status',
                        size: 'col-md-1',
                        title: '<div align="center"><strong gumga-translate-tag="businessrule.status">status</strong></div>',
                        content: '<div align="center">' +
                        '<span class="badge badge-primary" ng-show="$value.active"  gumga-translate-tag="businessrule.active">Ativo</span>' +
                        '<span class="badge badge-danger"  ng-show="!$value.active" gumga-translate-tag="businessrule.inative" >Inativo</span> ' +
                        '</div>'
                    },
                    {
                        name: 'button',
                        title: ' ',
                        size: 'col-md-1',
                        content: '<div align="center">' +
                        '<button ng-show="$value.active" type="button" ng-click="$parent.$parent.changeStatus($value)" class="btn-link center-block text-danger" uib-tooltip="Desativar"><i class="fa fa-times"></i></button>' +
                        '<button ng-show="!$value.active" type="button" ng-click="$parent.$parent.changeStatus($value)" class="btn-link center-block text-success" uib-tooltip="Ativar"><i class="fa fa-check"></i></button>' +
                        '</div>'
                    }
                ]
            };

            $scope.changeStatus = function (entity) {
                $rootScope.$broadcast('hideNextMessage', true);
                BusinessRuleService.changeStatus(entity.id).then(function (response) {
                    $scope.businessrule.execute('get');
                });
            };

            function update(values) {
                $scope.content = values.data;
            }

            $scope.format = {};
            $scope.format['IGUAL_A'] = 'Igual a';
            $scope.format['MAIOR_QUE'] = 'Maior que';
            $scope.format['MAIOR_OU_IGUAL_QUE'] = 'Maior ou igual a';
        }
    ]);