angular.module('app.businessrule.controllers')
    .controller('BusinessRuleStepOneController', [
        '$scope',
        '$state',
        'operations',
        function ($scope,
                  $state,
                  operations) {

            $scope.operations = angular.copy(operations);


            $scope.conf = {
                columns: 'name',
                selection: 'multi',
                checkbox: true,
                materialTheme: true,
                fixed: {
                  head: true
                },
                activeLineColor: 'var(--primary)',
                title: 'Operações',
                columnsConfig: [
                    {
                        name: 'name',
                        size: 'col-md-11',
                        title: '<strong class="text-center" >Nome</strong>',
                        content: '{{$value.name }}'
                    }
                ]
            };

            $scope.back = function(){
                $state.go('businessrule.list');
            }

            $scope.nextStep = function () {
                $state.go('businessrule.steptwo', {operations: $scope.selectedOperations});
            }


        }
    ]);