angular.module('myApp').controller('viewCtrl', function($scope, $http, genericService, $state) {
    var serverUrl = "http://localhost:3000";
    $scope.runScript = 0;

    genericService.httpGetCall(serverUrl, '/fetchCustomers').then(function(res) {
        if (!res.data.err) {
            $scope.customerList = res.data.result;
        } else {
            swal("Error in fetching records");
        }
    });

    $scope.deleteCustomer = function(index, email) {
        $scope.customerList.splice(index, 1);
        genericService.httpPostCall(serverUrl, '/deleteCustomer', { 'email': email }).then(function(res) {
            if (!res.data.err) {
                swal("Deleted successfully");
            } else {
                swal("Error in deleting customer");
            }
        });
    }

    $scope.editCustomer = function(email) {
        localStorage.setItem('email', email);
        $state.go('add');
    }

    $scope.searchCustomer = function() {
        // serach customer on the basis of name,phone,mobile by any keyword entered
        if ($scope.search) {
            genericService.httpGetCall(serverUrl, '/searchCustomer?id=' + $scope.search).then(function(res) {
                if (!res.data.err) {
                    $scope.customerList = res.data.result;
                }
            });
        } else {
            genericService.httpGetCall(serverUrl, '/fetchCustomers').then(function(res) {
                if (!res.data.err) {
                    $scope.customerList = res.data.result;
                }
            });
        }
    }

    $scope.runScript = function() {
        // first create at least 3 customers
        // click this button only once when at least there are 3 customers,
        // so that dynamic customer id's can be inserted in the bills
        $scope.runScript = 1;
        genericService.httpGetCall(serverUrl, '/createDefaultBills').then(function(res) {
            if (!res.data.err) {
                $scope.runScript = 0;
                swal("Default bills created");
            }
        });
    }
});