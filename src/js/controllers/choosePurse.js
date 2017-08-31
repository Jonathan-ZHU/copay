angular.module('copayApp.controllers').controller('choosePurseController', function($rootScope, $timeout, $scope,$state, appConfigService, $ionicModal, $log, lodash, uxLanguage, platformInfo, profileService, feeService, configService, externalLinkService, bitpayAccountService, bitpayCardService, storageService, glideraService,localStorageService, gettextCatalog, buyAndSellService) {

  $scope.info={};
  var updateConfig = function() {
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
    $scope.icoInfo.icoAddr=data.stateParams.icoAddr;
    $scope.icoInfo.tcashAddr=data.stateParams.tcashAddr;
    $scope.icoInfo.coinName=data.stateParams.coinName;
    $log.log("传参数：",data.stateParams.coinName)
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




  $scope.jumpHome = function() {


    $scope.chooseFeeLevelModal.hide();
    // $state.go('tabs.home', {
    //
    // });


    return $state.transitionTo('tabs.icoreceive', {

      tcashAddr: $scope.tcashAddr,
      icoAddr:$scope.icoAddr,
      coinName:"",
      home:"no"

    });
  };


});
