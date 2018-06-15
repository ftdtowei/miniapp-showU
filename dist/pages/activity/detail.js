"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var items = [];
for (var i = 1; i <= 30; i++) {
  items.push("\u5217\u8868\u9879\u76EE" + i);
}
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
    items: items,
    imgHeight: parseInt(wx.WIN_WIDTH / 1125 * 628),
    scrollTop: 0
  },
  onPageScroll: function onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    });
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  }
});