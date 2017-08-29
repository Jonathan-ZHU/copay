'use strict';

var modules = [
  'angularMoment',
  'monospaced.qrcode',
  'gettext',
  'ionic',
  'ionic-toast',
  'angular-clipboard',
  'ngTouch',
  'ngLodash',
  'ngCsv',
  'angular-md5',
  'bwcModule',
  'bitauthModule',
  'copayApp.filters',
  'copayApp.services',
  'copayApp.controllers',
  'copayApp.directives',
  'copayApp.addons'
];

//change urls here

var insight_testUrl="https://ttcash.insight.tiny-calf.com/insight";
var insight_Normalurl="https://tcash.insight.tiny-calf.com/insight";
var insight_url = insight_Normalurl;
var bwe_testUrl="https://ttcash.insight.tiny-calf.com/bws/api"
var bws_NormalUrl="https://tcash.bws.tiny-calf.com/bws/api";
var bws_url =bws_NormalUrl ;
var ico_Testserver="https://120.92.35.170:8080";
var ico_NormalUrl="http://tcash.ico.tiny-calf.com/";
var ico_server=ico_NormalUrl;
//change coin unit here
var coin_unit = 'TCC';

var copayApp = window.copayApp = angular.module('copayApp', modules);

angular.module('copayApp.filters', []);
angular.module('copayApp.services', []);
angular.module('copayApp.controllers', []);
angular.module('copayApp.directives', []);
angular.module('copayApp.addons', []);
