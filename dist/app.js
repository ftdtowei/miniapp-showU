'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {},
  onLaunch: function onLaunch() {
    require('./static/utils/sdk-v1.4.0.js');
    var clientID = '86da1b9ae3882fc5c232';
    wx.BaaS.init(clientID);
    _system2.default.attachInfo();
  },
  onShow: function onShow() {},
  onHide: function onHide() {}
});