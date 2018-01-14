angular.module('myApp').controller('addCtrl', function($scope, $http, $state, genericService) {
    var serverUrl = "http://localhost:3000";
    $scope.edit = 0;
    var email = localStorage.getItem('email');
    if (email) {
        // if edit btn is pressed,then data corresponding to
        // selected row will get populated in the same form as add.
        localStorage.removeItem('email');
        editCustomer();
        $scope.edit = 1;
    }

    $scope.addObj = {
        'Name': null,
        'Mobile': null,
        'Phone': null,
        'Email': null,
        'DOB': null,
        'Addresses': [{
            'Flat': null,
            'Street': null,
            'State': null,
            'PinCode': null
        }]
    };

    function editCustomer() {
        // this function fetched data corresponding to the email of customer which will be unique
        genericService.httpGetCall(serverUrl, '/fetchCustomerByEmail?id=' + email).then(function(res) {
            if (!res.data.err) {
                var dataToEdit = res.data.result;
                $scope.addObj = {
                    'Name': dataToEdit.Name,
                    'Mobile': parseInt(dataToEdit.Mobile),
                    'Phone': parseInt(dataToEdit.Phone),
                    'Email': dataToEdit.Email,
                    'DOB': convertDate(dataToEdit.DOB),
                    'Addresses': dataToEdit.Addresses
                };
            }
        });
    }

    function convertDate(inputFormat) {
        // converts date into yyyy-mm-dd format for edit
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        var date = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
        return date;
    }

    $scope.Add = function() {
        // dynamically add address fields
        if ($scope.addObj.Addresses.length < 3) {
            var address = {};
            address.Flat = null;
            address.Street = null;
            address.State = null;
            address.PinCode = null;
            $scope.addObj.Addresses.push(address);
        } else {
            swal('Error', "You can add maximum 3 addresses.", 'error');
        }
    };

    $scope.Remove = function($index) {
        // dynamically remove address fields
        if ($scope.addObj.Addresses.length != 1) {
            $scope.addObj.Addresses.splice($index, 1);
        } else {
            swal('Error', "You should have minimum 1 address.", 'error');
        }
    };

    $scope.saveCustomer = function() {
        // same function will be used to add and update customer
        var flag = 0;
        // this will validate if address is present or not.
        for (var i = 0; i < $scope.addObj.Addresses.length; i++) {
            if (!$scope.addObj.Addresses[i].Flat || !$scope.addObj.Addresses[i].Street || !$scope.addObj.Addresses[i].State || !$scope.addObj.Addresses[i].PinCode) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            swal("Please enter address details");
            return false;
        }

        genericService.httpPostCall(serverUrl, '/saveCustomer', $scope.addObj).then(function(res) {
            if (!res.data.err) {
                swal('Success', res.data.result, 'success');
                $state.go('view');
            }
        });
    }

});