angular.module('app.businessrule.controllers')
    .controller('BusinessRuleStepTwoController', [
        '$scope',
        '$state',
        'operations',
        'SweetAlert',
        'PaymentTypeService',
        function ($scope,
                  $state,
                  operations,
                  SweetAlert,
                  PaymentTypeService) {


            $scope.operations = angular.copy(operations)

            if (!$scope.operations || !$scope.operations.length) {
                SweetAlert.swal({
                    title: 'Nenhuma operação foi selecionada.',
                    text: "Você será redirecionado para a seleção de operação para poder continuar com o cadastro.",
                    type: "warning",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                }, function () {
                    $state.go('businessrule.stepone');
                })
            }


            $scope.active = true;
            $scope.selectedEntryType = [];
            $scope.selectedParcelType = [];

            PaymentTypeService.getAll().then(function (result) {
                $scope.paymentTypes = result.data.map(function(payment){
                    payment.parcelsCount = 1;
                    return payment;
                });
                console.log($scope.paymentTypes);;
            });

            $scope.changeMethod = function(newMethod){
                $scope.entry = newMethod ==='ENTRY';
                $scope.parcel = !$scope.entry;
            };

            $scope.confBase = {
                columns: 'name,parcelsCount',
                selection: 'multi',
                checkbox: true,
                materialTheme: true,
                fixed: {
                    head: true
                },
                title: 'Operações',
                columnsConfig: [
                    {
                        name: 'name',
                        size: 'col-md-11',
                        title: '<strong class="text-center" >Nome</strong>',
                        content: '{{$value.name }}'
                    },
                    {
                        name: 'parcelsCount',
                        editable:true,
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


            $scope.onChangeRow = function(row){
                console.log(row);
            }

            $scope.back = function(){
                $state.go('businessrule.stepone');
            }

            $scope.generate = function(){
                var selected = $scope.entry ? $scope.selectedEntryType : $scope.selectedParcelType;


            }

            $scope.disableBtnSave = function(){
                return ($scope.entry && !$scope.selectedEntryType.length) || ($scope.parcel && !$scope.selectedParcelType.length)
            }


        }
    ]);