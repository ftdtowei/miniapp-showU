'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    // NAV_HEIGHT:wx.STATUS_BAR_HEIGHT+wx.DEFAULT_HEADER_HEIGHT+'px',
    // STATUS_BAR_HEIGHT:wx.STATUS_BAR_HEIGHT,
    url: null,
    items: [],
    alpha: 0,
    className: ''
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  },

  onReady: function onReady() {},
  onShow: function onShow() {
    var appInstance = getApp();
    var user = appInstance.globalData.user;
    var avatar = appInstance.globalData.url;
    console.log(user);
    this.setData({
      url: avatar,
      className: appInstance.globalData.user.nickName
    });
  }
});