angular.module('myApp').controller('reportCtrl', function($scope, $http, $state, genericService) {
    var serverUrl = "http://localhost:3000";
    // this will fetch all details of the customer.
    genericService.httpGetCall(serverUrl, '/fetchCustomerDetails').then(function(res) {
        $scope.customerDetails = res.data;
        calculateAmt();
    });

    function calculateAmt() {
        //amt of each bill - sum of Rate * Quantity of Each Bill– discount amount + Tax  amount
        $scope.customerDetails.forEach(function(x) {
            var totalAmt = 0;
            x.billDetails.forEach(function(y) {
                var sumOfRate = calcluateSumOfRate(y.Items);
                var quantity = y.Items.length;
                var discountAmt = calculateDiscountAmt(sumOfRate, quantity, y.Discount);
                var taxAmt = calculateTaxAmt(discountAmt, y.Tax);
                totalAmt = totalAmt + sumOfRate * quantity - discountAmt + taxAmt;
            });
            x['Amount'] = totalAmt;
        });
    }

    function calcluateSumOfRate(data) {
        var sumOfRate = data.reduce(function(sum, z) {
            return sum + z.rate;
        }, 0);
        return sumOfRate;
    }

    function calculateTaxAmt(discountAmt, tax) {
        //DiscountAmount*Tax/100
        return discountAmt * tax / 100;
    }

    function calculateDiscountAmt(sumOfRate, quantity, discount) {
        //sum of Rate*Quantity *Discount/100
        return sumOfRate * quantity * discount / 100;
    }

});