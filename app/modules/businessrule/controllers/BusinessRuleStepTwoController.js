BusinessRuleStepTwoController.$inject = [
    '$scope',
    '$state',
    'operations',
    'SweetAlert',
    'PaymentTypeService',
    'BusinessRuleService'];
function BusinessRuleStepTwoController($scope,
                                       $state,
                                       operations,
                                       SweetAlert,
                                       PaymentTypeService,
                                       BusinessRuleService) {


    $scope.operations = angular.copy(operations);

    BusinessRuleService.getNew().then(function (response) {
        $scope.new = response.data;
    });

    if (!$scope.operations || !$scope.operations.length) {
        SweetAlert.swal({
            title: 'Nenhuma operação foi selecionada.',
            text: "Você será redirecionado para a seleção de operação para poder continuar com o cadastro.",
            type: "warning",
            confirmButtonText: "OK",
            closeOnConfirm: true
        }, function () {
            $state.go('app.businessrule.stepone');
        })
    }


    $scope.active = true;
    $scope.selectedEntryType = [];
    $scope.selectedParcelType = [];

    PaymentTypeService.getAll().then(function (result) {
        $scope.paymentTypes = result.data.map(function (payment) {
            payment.parcelsCount = 1;
            return payment;
        });
    });

    $scope.onChangeRow = function (value) {
        $scope.paymentTypes.forEach(function (payment) {
            if (payment.id == value.id) {
                payment.parcelsCount = value.parcelsCount;
            }
        })
        $scope.selectedParcelType.forEach(function (payment) {
            if (payment.id == value.id) {
                payment.parcelsCount = value.parcelsCount;
            }
        })
    }

    $scope.changeMethod = function (newMethod) {
        $scope.entry = newMethod === 'ENTRY';
        $scope.parcel = !$scope.entry;
        $scope.selectedEntryType = [];
        $scope.selectedParcelType = [];
        $scope.paymentTypes = angular.copy($scope.paymentTypes).map(function (payment) {
            payment.parcelsCount = 1;
            return payment;
        });
    };

    $scope.confBase = {
        columns: 'name,parcelsCount',
        selection: 'multi',
        checkbox: true,
        materialTheme: true,
        // activeLineColor: 'var(--primary)',
        fixed: {
            head: true
        },
        columnsConfig: [
            {
                name: 'name',
                size: 'col-md-11',
                title: '<strong class="text-center" >Nome</strong>',
                content: '{{$value.name }}'
            },
            {
                name: 'parcelsCount',
                editable: true,
                size: 'col-md-11',
                title: '<strong class="text-center" >Parcelas</strong>&nbsp;' +
                '<span class="glyphicon glyphicon-question-sign btn-link" uib-tooltip="Clique duas vezes sobre o valor para editar o número de parcelas" tooltip-placement="bottom" style="cursor: pointer"></span>',
                content: '{{$value.parcelsCount }}'
            }
        ]
    };

    $scope.confEntry = angular.copy($scope.confBase);
    $scope.confParcel = angular.copy($scope.confBase);
    $scope.confEntry.columns = 'name';

    $scope.back = function () {
        $state.go('app.businessrule.stepone');
    };

    $scope.generate = function () {
        var selected = $scope.entry ? $scope.selectedEntryType : $scope.selectedParcelType;
        var generated = [];
        var parcels = [];
        selected.forEach(function (payment) {
            var last = payment.parcelsCount;
            for (var i = 1; i <= last; i++) {
                parcels[i] = parcels[i] || [];
                parcels[i].push(payment);
            }
        });

        for (var count = 1; count <= parcels.length - 1; count++) {
            var br = angular.copy($scope.new);
            br.maxDiscount = 100;
            br.discountType = 'PERCENTAGE';
            br.hasEntry = $scope.entry;
            br.minValue = 0;
            br.startDuration = (new Date());
            br.active = $scope.active;
            br.negotiationInterval = 0;
            if (br.hasEntry) {
                br.entryValue = 1;
                br.entryType = 'PERCENTAGE';
                br.entryPaymentTypes = parcels[count];
                br.parcelsCount = 0;
            } else {
                br.entryValue = 0;
                br.parcelsCount = count;
                br.parcelsPaymentTypes = parcels[count];
                br.monthly = true;
            }
            generated.push(br);
        }

        BusinessRuleService.saveWithOperationType($scope.operations, generated).then(function () {
            $state.go('app.businessrule.list');
        });
    };

    $scope.disableBtnSave = function () {
        return ($scope.entry && !$scope.selectedEntryType.length) || ($scope.parcel && !$scope.selectedParcelType.length)
    }


}
module.exports = BusinessRuleStepTwoController;