angular.module('copayApp.controllers').controller('receivingPurseController', function($rootScope,$state,$http, $timeout, $scope, appConfigService,popupService, $ionicModal, $log, lodash, uxLanguage, platformInfo, profileService, feeService, configService, externalLinkService, bitpayAccountService, bitpayCardService, storageService,localStorageService,walletService,glideraService, gettextCatalog, buyAndSellService) {

  var updateConfig = function() {
    var icoInfo = {};
    $scope.currentLanguageName = uxLanguage.getCurrentLanguageName();
    $scope.feeOpts = feeService.feeOpts;
    $scope.currentFeeLevel = feeService.getCurrentFeeLevel();
    $scope.wallets = profileService.getWallets();
    $scope.buyAndSellServices = buyAndSellService.getLinked();
    $scope.wallet={};
    $scope.icoAddr={};
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

  $scope.choosePurse = function(wallet)
  {

    $scope.wallet=wallet;
    $scope.setAddress();

  };
var showSuccessWindow=function () {


  var scope = $rootScope.$new(true);

  $ionicModal.fromTemplateUrl('views/modals/choosePurse.html', {
    icoAddr:$scope.icoAddr,
    tcashAddr:$scope.tcashAddr,
    scope: scope


  }).then(function(modal) {
    scope.chooseFeeLevelModal = modal;
    scope.openModal();

  });
  scope.openModal = function() {
    scope.chooseFeeLevelModal.show();
  };

  // scope.hideModal = function() {
  //   scope.chooseFeeLevelModal.hide();
  //   // $log.debug('Custom fee level choosen:' + customFeeLevel + ' was:' + tx.feeLevel);

  // };

  $scope.closeModal = function() {
    $scope.chooseFeeLevelModal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.chooseFeeLevelModal.remove();
  });

}

var getNewAddress=function () {

  $scope.addr = null;
  if (!$scope.wallet || $scope.generatingAddress || !$scope.wallet.isComplete()) return;
  $scope.generatingAddress = true;
  walletService.getAddress($scope.wallet, true, function(err, addr) {
    $scope.generatingAddress = false;

    if (err) {
      //Error is already formated
      popupService.showAlert(err);
    }

    $scope.addr = addr;
    $timeout(function() {
      $scope.$apply();
    }, 10);
  });
}
  $scope.setAddress = function(newAddr) {

    $scope.addr = null;
    if (!$scope.wallet || $scope.generatingAddress || !$scope.wallet.isComplete()) return;
    $scope.generatingAddress = true;

    walletService.getAddress($scope.wallet, newAddr, function (err, addr) {
      $scope.generatingAddress = false;
      if (err) {
        //Error is already formated
        popupService.showAlert(err);
      }
      else {

        $scope.addr = addr;
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
              popupService.showAlert('Tcash地址已提交过ICO申请');
            }
            else {
              popupService.showAlert('Tcash地址不合法');
            }

          }
        }, function errorCallback(response) {
          // 请求失败执行代码
          $log.log(response.data.msg)
          popupService.showAlert(response.data.msg)
        });

      }

      $log.log($scope.addr);
      $timeout(function () {
        $scope.$apply();
      }, 10);
    });
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
        url: 'http://120.92.35.170:8080/getBitcoinAddress',
        params: {
          addr: $scope.addr
        }
      });
      return promise;
    };

    //保存ico地址到本地
    var saveIco = function () {
      var icoInfo={};
      icoInfo.icoAddr = $scope.icoAddr;
      icoInfo.tcashAddr = $scope.addr;

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
          $log.log("errorInfo=", err)
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
