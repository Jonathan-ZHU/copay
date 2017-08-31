'use strict'
angular.module('copayApp.services').factory('icoDataService',['$window',function ($window,lodash) {

  return{

    //存储单个属性
    set:function (key,value) {

      $window.loacalStorage[key]=value;

    }

  }


}]);


