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
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $scope.customerList.splice(index, 1);
                genericService.httpPostCall(serverUrl, '/deleteCustomer', { 'email': email }).then(function(res) {
                    if (!res.data.err) {
                        swal('Deleted!', 'Your file has been deleted.', 'success');
                    } else {
                        swal('Error', 'Error in deleting customer', 'error');
                    }
                });
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
        // first create at least 2 customers
        // click this button only once when at least there are 2 customers,
        // so that dynamic customer id's can be inserted in the bills

        if ($scope.customerList.length < 2) {
            swal('Please create at least 2 customers');
            return false;
        }
        $scope.runScript = 1;
        genericService.httpGetCall(serverUrl, '/createDefaultBills').then(function(res) {
            if (!res.data.err) {
                $scope.runScript = 0;
                swal('Success', 'Default bills created', 'success');
            }
        });
    }
});