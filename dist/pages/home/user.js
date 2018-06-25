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
    className: '',
    path: ['https://raw.githubusercontent.com/ftdtowei/miniapp-showU/master/static/images/money.jpg', 'https://raw.githubusercontent.com/ftdtowei/miniapp-showU/master/static/images/money.jpg'] //http url
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
  },

  previewImage: function previewImage(e) {
    wx.previewImage({
      current: this.data.path, // 当前显示图片的http链接     
      urls: this.data.path // 需要预览的图片http链接列表     
    });
  }

});