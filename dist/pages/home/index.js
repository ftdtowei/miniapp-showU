"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    isShow: false,
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    contentshow: 0,
    items0: [],
    items1: [],
    setShow: false,
    itemStyle: {
      'border-color': '#0dc1ae',
      'color': '#0dc1ae',
      'font-size': '14px'
    },
    activeItemStyle: {
      'color': '#fff',
      'background-color': '#0dc1ae'
    }
  },
  onShow: function onShow() {
    var self = this;
    //判断用户是否已授权
    wx.BaaS.login(false).then(function (res) {
      // 登录成功
      var query = new wx.BaaS.Query();

      // 设置查询条件（比较、字符串包含、组合等）
      query.compare('openid', '=', res.openid);

      // 应用查询对象
      var exist = new wx.BaaS.TableObject(40380);
      exist.setQuery(query).find().then(function (res) {
        // success
        console.log('qry userinfo', res);
        var data = res.data;
        if (data.objects.length == 0) {
          //用户未授权   引导用户授权
          self.setData({
            isShow: true
          });
        } else {
          wx.BaaS.login(true).then(function (res) {
            // 登录成功
            var appInstance = getApp();
            appInstance.globalData.user = res;
            appInstance.globalData.url = res.avatarUrl;
          }, function (res) {
            // 登录失败
          });
        }
      }, function (err) {
        // err
      });
    }, function (res) {
      // 登录失败
    });
  },
  authInfo: function authInfo(data) {
    var self = this;
    wx.BaaS.handleUserInfo(data).then(function (res) {
      // res 包含用户完整信息，详见下方描述
      console.log(res);
      var Exist = new wx.BaaS.TableObject(40380);
      var exist = Exist.create();

      // 设置方式一
      var info = {
        openid: res.openid
      };

      exist.set(info).save().then(function (res) {
        // success
        wx.BaaS.login(true).then(function (res) {
          var appInstance = getApp();
          appInstance.globalData.user = res;
          appInstance.globalData.url = res.avatarUrl;
        }, function (res) {
          // 登录失败
        });
        var show = data.currentTarget.dataset.show;
        self.setData({
          isShow: show
        });
      }, function (err) {
        // err
      });
    }, function (res) {
      // **res 有两种情况**：用户拒绝授权，res 包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 Error 对象（详情见下方注解）
      // *Tips*：如果你的业务需要用户必须授权才可进行，由于微信的限制，10 分钟内不可再次弹出授权窗口，此时可以调用 [`wx.openSetting`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html) 要求用户提供授权
    });
  }
});