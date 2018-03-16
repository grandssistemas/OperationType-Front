BusinessRuleListController.$inject = [
    '$scope',
    'gumgaController',
    'BusinessRuleService',
    '$rootScope',
    'GrandsLoadingService'];
function BusinessRuleListController($scope,
                                    gumgaController,
                                    BusinessRuleService,
                                    $rootScope,
                                    GrandsLoadingService) {
    gumgaController.createRestMethods($scope, BusinessRuleService, 'businessrule');
    $scope.businessrule.execute('reset');

    var GQueryBase = new GQuery()
        .select("obj.parcelsCount as parcelsCount")
        .select("obj.id as id")
        .select("obj.active as active");

    $scope.businessrule.methods.searchWithGQuery(GQueryBase);

    $scope.businessrule.on('deleteSuccess', () => {
        $scope.businessrule.methods.getLatestOperation();
    });

    $scope.conf = {
        columns: 'parcelsCount,status,button',
        selection: 'none',
        checkbox: false,
        materialTheme: true,
        activeLineColor: '#cccccc',
        hoverLineColor: '#f5f5f5',
        itemsPerPage: [5, 10, 25, 50, 100],
        actions: [
            {
                icon: '<button type="button" class="btn gmd raised btn-primary gmd-ripple" style="background-color: #1ab394;">ATIVOS</button>',
                onClick: function () {
                    searchByStatus(true)
                }
            },
            {
                icon: '<button type="button" class="btn gmd raised btn-danger gmd-ripple">INATIVOS</button>',
                onClick: function () {
                    searchByStatus(false)
                }
            },
            {
                icon: '<button type="button" class="btn gmd raised btn-default gmd-ripple">TODOS</button>',
                onClick: function () {
                    searchByStatus("ALL")
                }
            }
        ],
        title: 'Listagem de Regras comerciais',
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

    function searchByStatus(status) {
        let param = status === "ALL" ? 'obj.active=true or obj.active=false' : `obj.active=${status}`;
        GrandsLoadingService.openModal(BusinessRuleService.getAdvancedSearch(param), "Atualizando lista").then((response) => {
            $scope.businessrule.data = response.data.values;
            $scope.businessrule.pageSize = response.data.pageSize;
            $scope.businessrule.count = response.data.count;
            $scope.businessrule.page = response.data.start;
        })
    }

    $scope.changeStatus = function (entity) {
        $rootScope.$broadcast('hideNextMessage', true);
        BusinessRuleService.changeStatus(entity.id).then((response) => {
            $scope.businessrule.methods.getLatestOperation();
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
module.exports = BusinessRuleListController;