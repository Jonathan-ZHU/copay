'use strict';

angular.module('copayApp.controllers').controller('ico-receiveController', function($rootScope, $timeout, $scope, appConfigService, $ionicModal, $log, $http,lodash, uxLanguage, platformInfo, profileService, feeService, configService, externalLinkService, bitpayAccountService, bitpayCardService, storageService, glideraService, gettextCatalog, buyAndSellService) {

  $scope.clipboard=666
  $scope.openHttpClick=function () {

    $http({
      method: 'GET',
      url: 'http://query.yahooapis.com/v1/public/yqlhttp://query.yahooapis.com/v1/public/yql',
      params: {
        q: "select * from json where url=\"http://www.runoob.com/try/angularjs/data/Customers_JSON.php\"",
        format: "json"
      }
    }).then(function successCallback(response) {
      // 请求成功执行代码
      $log.log(response)
    }, function errorCallback(response) {
      // 请求失败执行代码
      $log.log(response)
    });
  }
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

});

