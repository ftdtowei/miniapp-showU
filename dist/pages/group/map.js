'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 引入SDK核心类
var QQMapWX = require('../../static/utils/qqmap.min.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'DJEBZ-TNS3W-IOMR4-OZ2F4-J7XQ6-66FSH' // 必填
});
exports.default = Page({
  data: {
    long: '',
    lat: '',
    city: '',
    addressList: []
  },
  onLoad: function onLoad() {
    var self = this;
    wx.getLocation({
      type: 'wgs84',
      success: function success(res) {
        // 调用接口 解析当前城市
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function success(res) {
            var city = res.result.address_component.city;
            self.setData({
              city: city
            });
          },
          fail: function fail(res) {
            console.log(res);
          },
          complete: function complete(res) {
            console.log(res);
          }
        });
        self.setData({
          long: res.longitude,
          lat: res.latitude
        });
      }
    });
  },
  regionchange: function regionchange(e) {
    console.log(e.type);
  },
  markertap: function markertap(e) {
    console.log(e.markerId);
  },
  controltap: function controltap(e) {
    console.log(e.controlId);
  },
  inputing: function inputing(e) {
    var self = this;
    var input = e.detail.value;
    console.log(self.data);

    // 调用接口  关键字列表
    demo.getSuggestion({
      keyword: input,
      region: self.data.city,
      success: function success(res) {
        self.setData({
          addressList: res.data
        });
      },
      fail: function fail(res) {
        console.log(res);
      },
      complete: function complete(res) {
        console.log(res);
      }
    });
  }
});