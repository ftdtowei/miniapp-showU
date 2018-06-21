"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
    items: {},
    imgHeight: parseInt(wx.WIN_WIDTH / 1125 * 628),
    scrollTop: 0,
    detail: ''
  },
  onLoad: function onLoad(options) {
    var items = JSON.parse(options.item);
    console.log(items);

    wx.setNavigationBarTitle({
      title: items.text //页面标题 设置为活动标题

    });
    this.setData({
      detail: items.text
    });
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  }
});