'use strict';

angular.module('copayApp.controllers').controller('cameratestController',
  function ($scope, $log, $ionicHistory, configService, profileService, uxLanguage, walletService, externalLinkService, gettextCatalog) {

    $scope.availableLanguages = uxLanguage.getLanguages();

    $scope.openExternalLink = function () {
      var url = 'https://crowdin.com/project/copay';
      var optIn = true;
      var title = gettextCatalog.getString('Open Translation Community');
      var message = gettextCatalog.getString('You can make contributions by signing up on our Crowdin community translation website. We’re looking forward to hearing from you!');
      var okText = gettextCatalog.getString('Open Crowdin');
      var cancelText = gettextCatalog.getString('Go Back');
      externalLinkService.open(url, optIn, title, message, okText, cancelText);
    };

    $scope.save = function (newLang) {
      var opts = {
        wallet: {
          settings: {
            defaultLanguage: newLang
          }
        }
      };

      uxLanguage._set(newLang);
      configService.set(opts, function (err) {
        if (err) $log.warn(err);
        walletService.updateRemotePreferences(profileService.getWallets());
      });

      $ionicHistory.goBack();
    };

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      $scope.currentLanguage = uxLanguage.getCurrentLanguage();
    });


    //take photo
    $scope.loadTakeImage = function () {
      loadImage();
    };


    // 1.拍照并显示在屏幕
    function loadImage() {
      navigator.camera.getPicture(onLoadImageSuccess, onLoadImageFail, {destinationType: Camera.DestinationType.FILE_URI});
    }

    //拍照成功后回调
    function onLoadImageSuccess(imageURI) {

      var smallImage = document.getElementById('getImageLocal');
      smallImage.style.display = 'none';
      var smallImage = document.getElementById('getImage');
      smallImage.style.display = 'block';
      smallImage.src = imageURI;

    }


    //2.获取本地图片并显示在屏幕
    $scope.loadImageLocal = function () {
      navigator.camera.getPicture(onLoadImageLocalSuccess, onLoadImageFail, {

        destinationType: Camera.DestinationType.FILE_URI,

        sourceType: Camera.PictureSourceType.PHOTOLIBRARY

      });

    }

    //本地图片选择成功后回调此函数
    function onLoadImageLocalSuccess(imageURI) {
      var smallImage = document.getElementById('getImage');
      smallImage.style.display = 'none';
      var smallImage = document.getElementById('getImageLocal');
      smallImage.style.display = 'block';
      smallImage.src = imageURI;

    }

    //拍照上传
    $scope.loadImageUpload = function () {
      loadImageUpload();
    }

    //3.拍照上传并显示在屏幕
    function loadImageUpload() {

      navigator.camera.getPicture(onLoadImageUploadSuccess, onLoadImageFail, {

        destinationType: Camera.DestinationType.FILE_URI

      });

    }

    //图片拍照成功后回调此函数

    function onLoadImageUploadSuccess(imageURI) {

      //此处执行文件上传的操作，上传成功后执行下面代码

      var options = new FileUploadOptions(); //文件参数选项

      options.fileKey = "file";//向服务端传递的file参数的parameter name

      options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);//文件名

      options.mimeType = "image/jpeg";//文件格式，默认为image/jpeg

      var ft = new FileTransfer();//文件上传类

      ft.onprogress = function (progressEvt) {//显示上传进度条

        if (progressEvt.lengthComputable) {

          navigator.notification.progressValue(Math.round(( progressEvt.loaded / progressEvt.total ) * 100));

        }

      }

      navigator.notification.progressStart("提醒", "当前上传进度");

      ft.upload(imageURI, encodeURI('服务器端ip（域名）与端口号/upLoad/UpLoadImage.jsp'), function () {

        navigator.notification.progressStop();//停止进度条

        $("#getImageUpload").attr("src", imageURI);
        alert("2-imageURI:" + imageURI);
        $("#getImageUpload").show();

        navigator.notification.alert("文件上传成功！", null, "提醒");

      }, null, options);

    }

    //所有获取图片失败都回调此函数

    function onLoadImageFail(message) {

      navigator.notification.alert("操作失败，原因：" + message, null, "警告");

    }
  });
