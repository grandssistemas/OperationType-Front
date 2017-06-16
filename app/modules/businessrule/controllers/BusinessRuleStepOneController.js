angular.module('app.businessrule.controllers')
    .controller('BusinessRuleStepOneController', [
        '$scope',
        '$state',
        'operations',
        function ($scope,
                  $state,
                  operations) {

            $scope.operations = angular.copy(operations);

            $scope.selectedOperations = [];

            $scope.onSelectedOperation = function (value) {
                $scope.operations.forEach(function (p1, index) {
                    if(value.id == p1.id){
                        $scope.operations.splice(index, 1);
                    }
                });
                $scope.selectedOperations.push(value);
            }

            $scope.removeOperation = function (value) {
                $scope.selectedOperations.forEach(function (p1, index) {
                    if(value.id == p1.id){
                        $scope.selectedOperations.splice(index, 1);
                    }
                });
                $scope.operations.unshift(value);
            }

            $scope.conf = {
                columns: 'name',
                selection: 'multi',
                checkbox: false,
                materialTheme: true,
                fixed: {
                  head: true
                },
                // activeLineColor: 'var(--primary)',
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