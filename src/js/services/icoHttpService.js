'use strict';

angular.module('copayApp.services').factory('icoHttpService', function($http) {
  var root = {};

//   var promise=  $http({
//     method: 'GET',
//     url: 'http://120.92.35.170:8080/getBitcoinAddress',
//     params: {
//       addr: "1F1Qs7PcmN4RcZxy3tBuwaMCCRmCfJTFBQ"
//     }
//   });
//   return promise;
// }

  root.icoGet = function (params,successCallBack,errorCallBack) {

    $http({
      method: 'GET',
      url: 'http://120.92.35.170:8080/getBitcoinAddress',
      params: {
        addr: params
      }
    }).then(function (data) {
      successCallBack(data)
    }, function (data) {
      errorCallBack(data)
    });
  }
  root.icoPOST = function (params,successCallBack,errorCallBack) {

    $http({
      method: 'POST',
      url: 'http://120.92.35.170:8080/getBitcoinAddress',
      params: {
        addr: params
      }
    }).then(function (data) {
      successCallBack(data)
    }, function (data) {
      errorCallBack(data)
    });
  }




return root;

});
