'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('koan.services', []).
    value('version', '1.0')
    .factory('authInterceptor', function ($rootScope, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($window.sessionStorage.token || $window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token || $window.localStorage.token;
          }
          return config;
        },
        responseError: function (rejection) {
          if (rejection.status === 401) {
            // handle the case where the user is not authenticated
          }
          return $q.reject(rejection);
        }
      };
    });