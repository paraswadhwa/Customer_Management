angular.module('myApp').service('genericService', function($q, $http) {
    var self = this;
    
    self.httpGetCall = function(serverUrl, url) {
        var deferred = $q.defer();
        var req = {
            method: 'GET',
            url: serverUrl + url
        }
        $http(req).then(function(res) {
            deferred.resolve(res);
        });
        return deferred.promise;
    }

    self.httpPostCall = function(serverUrl, url, data) {
        var deferred = $q.defer();
        var req = {
            method: 'POST',
            url: serverUrl + url,
            data: data
        }
        $http(req).then(function(res) {
            deferred.resolve(res);
        });
        return deferred.promise;
    }

});