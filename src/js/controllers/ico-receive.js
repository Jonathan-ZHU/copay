'use strict';

angular.module('copayApp.controllers').controller('ico-receiveController', function($rootScope,$state, $timeout,popupService, $scope, $http,appConfigService, $ionicModal, $log,lodash, uxLanguage, platformInfo, profileService, feeService, configService, externalLinkService, bitpayAccountService, bitpayCardService, localStorageService,storageService, glideraService, icoHttpService,gettextCatalog, buyAndSellService) {






  var updateConfig = function() {

    $scope.isCordova = platformInfo.isCordova;
    $scope.isNW = platformInfo.isNW;
    $scope.currentLanguageName = uxLanguage.getCurrentLanguageName();
    $scope.feeOpts = feeService.feeOpts;
    $scope.currentFeeLevel = feeService.getCurrentFeeLevel();
    $scope.wallets = profileService.getWallets();
    $scope.buyAndSellServices = buyAndSellService.getLinked();

    configService.whenAvailable(function(config) {
      $scope.unitName = config.wallet.settings.unitName;
      $scope.selectedAlternative = {
        name: config.wallet.settings.alternativeName,
        isoCode: config.wallet.settings.alternativeIsoCode
      };

       // TODO move this to a generic service
       bitpayAccountService.getAccounts(function(err, data) {
         if (err) $log.error(err);
         $scope.bitpayAccounts = !lodash.isEmpty(data);

         $timeout(function() {
           $rootScope.$apply();
         }, 10);
       });

       // TODO move this to a generic service
       bitpayCardService.getCards(function(err, cards) {
         if (err) $log.error(err);
         $scope.bitpayCards = cards && cards.length > 0;

         $timeout(function() {
           $rootScope.$apply();
         }, 10);
       });
    });
  };

  $scope.openExternalLink = function() {
    var appName = appConfigService.name;
    var url = appName == 'copay' ? 'https://github.com/bitpay/copay/issues' : 'https://help.bitpay.com/bitpay-app';
    var optIn = true;
    var title = null;
    var message = gettextCatalog.getString('Help and support information is available at the website.');
    var okText = gettextCatalog.getString('Open');
    var cancelText = gettextCatalog.getString('Go Back');
    externalLinkService.open(url, optIn, title, message, okText, cancelText);
  };

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
    $scope.isCordova = platformInfo.isCordova;
    $scope.isWindowsPhoneApp = platformInfo.isCordova && platformInfo.isWP;
    $scope.isDevel = platformInfo.isDevel;
    $scope.appName = appConfigService.nameCase;
    $log.log("传过来的",data.stateParams.icoAddr);
    if(data.stateParams.home==true)
    {
      $scope.icoAddr=data.stateParams.icoAddr;
      $scope.tcashAddr=data.stateParams.tcashAddr;
      $scope.clipboard=$scope.icoAddr;

    }
    else
    {
      $scope.clipboard=$scope.icoAddr;

        localStorageService.get("ICOInfolist",function (err, datas){
          if (datas) {
            var icoList=[];
            icoList  = JSON.parse(datas);
            var info={};
            info=icoList[icoList.length-1];
            $scope.icoAddr=info.icoAddr;
            $scope.tcashAddr=info.tcashAddr;
            $scope.clipboard=$scope.icoAddr;


          } else {
            $log.log("errorInfo=", err);
          }

        });


    }

    // icoHttpService.root.icoGet("1F1Qs7PcmN4RcZxy3tBuwaMCCRmCfJTFBQ",function (response) {
    //
    //   $scope.icoAddr=response.data.msg;
    //
    // },function (error) {
    //
    //   $scope.icoAddr=error.data.msg;
    // });



    //  var promise=textHttp();
    //   promise.then(function successCallback(response) {
    //   // 请求成功执行代码
    //   $log.log(response.data.msg)
    //     if(response.data.err==0)
    //     {
    //       $scope.icoAddr=response.data.msg;
    //       saveIco();
    //     }
    //     else
    //     {
    //      popupService.showAlert("警告",response.data.msg,function () {
    //
    //
    //
    //      },"返回")
    //     }
    //
    // }, function errorCallback(response) {
    //   // 请求失败执行代码
    //   $log.log(response.data.msg)
    //
    // });


    configService.whenAvailable(function(config) {
      $scope.locked = config.lock && config.lock.method;
      if (!$scope.locked || $scope.locked == 'none')
        $scope.method = gettextCatalog.getString('Disabled');
      else
        $scope.method = $scope.locked.charAt(0).toUpperCase() + config.lock.method.slice(1);
    });
  });


  $scope.$on("$ionicView.enter", function(event, data) {

    updateConfig();

  });
  $scope.goRoot=function () {

    $state.go('tabs.home', {


    });
  }

});

