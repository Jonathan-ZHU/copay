angular.module('copayApp.controllers').controller('choosePayWayController', function($rootScope,$state,$http, $timeout, $scope, appConfigService,popupService, $ionicModal, $log,lodash, uxLanguage, platformInfo, profileService, feeService, configService, externalLinkService, bitpayAccountService, bitpayCardService, storageService,localStorageService,walletService,glideraService, gettextCatalog, buyAndSellService) {

  var wallet;
  var icoInfo={};
  $scope.EBOCoinAddr={};
  $scope.walletI={};
  var updateConfig = function() {

    var coin={};
    coin.index=0;
    coin.name="Bitcoin";
    var coin1={};
    coin1.index=1;
    coin1.name="Litecoin";
    var coin2={};
    coin2.index=2;
    coin2.name="Ethereum";
    $scope.currentLanguageName = uxLanguage.getCurrentLanguageName();
    $scope.feeOpts = feeService.feeOpts;
    $scope.currentFeeLevel = feeService.getCurrentFeeLevel();
    $scope.coins = [coin,coin1,coin2];
    $scope.buyAndSellServices = buyAndSellService.getLinked();
    $scope.wallet={};
    $scope.icoAddr={};
    $scope.payCoin={};
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

    $scope.EBOCoinAddr=data.stateParams.EBOCoinAddr;
    $scope.walletId=data.stateParams.walletId;
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

  $scope.choosePurse = function(coin)
  {
    $log.log("select",coin);
    $scope.payCoin=coin;
    $scope.getIcoAddres();

  };
  var showSuccessWindow=function () {


    var scope = $rootScope.$new(true);

    $ionicModal.fromTemplateUrl('views/modals/choosePurse.html', {
      icoAddr:$scope.icoAddr,
      EBOCoinAddr:$scope.EBOCoinAddr,
      coinName:$scope.payCoin.coinName,
      scope: scope

    }).then(function(modal) {
      scope.chooseFeeLevelModal = modal;
      scope.openModal();

    });
    scope.openModal = function() {
      scope.chooseFeeLevelModal.show();
    };

    $scope.closeModal = function() {
      $scope.chooseFeeLevelModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.chooseFeeLevelModal.remove();
    });

  }

  var getNewAddress=function () {

    wallet = profileService.getWallet($scope.walletId);


    walletService.getAddress(wallet, true, function(err, addr) {
      $scope.generatingAddress = false;

      if (err) {
        //Error is already formated
        popupService.showAlert(err);
      }

      $timeout(function() {
        $scope.$apply();
      }, 10);
    });
  }
  $scope.getIcoAddres = function() {

        var promise = textHttp();
        promise.then(function successCallback(response) {
          // 请求成功执行代码
          $log.log(response.data.msg)
          if (response.data.err == 0) {
            $scope.icoAddr = response.data.msg;
            saveIco();
          }
          else {
            $log.log(response.data.err)
            if (response.data.err == -500) {
              popupService.showAlert('EBOCoin地址已提交过ICO申请');
            }
            else {
              popupService.showAlert('EBOCoin地址不合法');
            }

          }
        }, function errorCallback(response) {
          // 请求失败执行代码
          $log.log(response.data.msg)
          popupService.showAlert('网络请求失败');
        });
      $log.log($scope.addr);
      $timeout(function () {
        $scope.$apply();
      }, 10);

  };


  //跳转到ICO申请成功界面
  var jumpToIcoSuccess = function () {

    getNewAddress();
    showSuccessWindow();

  };
//通过Tcash Address获取ico Address的网络请求
  var textHttp = function () {


    var promise = $http({
      method: 'GET',
      url: 'http://tcash.ico.tiny-calf.com/getAddress',
      params: {
        addr: $scope.EBOCoinAddr,
        coinname:$scope.payCoin.name
      }
    });
    return promise;
  };

  //保存ico地址到本地
  var saveIco = function () {

    icoInfo.icoAddr = $scope.icoAddr
    icoInfo.EBOCoinAddr = $scope.EBOCoinAddr
    icoInfo.coinName = $scope.payCoin.name

    var localInfo = localStorageService.get("ICOInfolist", function (err, datas) {

      if (datas) {
        var arrObj = JSON.parse(datas);
        $log.log('fuck', arrObj);
        arrObj.push(icoInfo);
        localStorageService.set("ICOInfolist", arrObj, function () {
          $log.log("success=", arrObj)
          jumpToIcoSuccess();
        })

      } else {
        var arrayObj = [];
        arrayObj.push(icoInfo);
        localStorageService.create("ICOInfolist", arrayObj, function () {
          $log.log("successCreate=", arrayObj)
          jumpToIcoSuccess();

        });
      }
    });
  };
});
