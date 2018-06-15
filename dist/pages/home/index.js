"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    isShow: false,
    current1: 0,
    list3: [{ head: 'http://images.uileader.com/20180313/b4af4e36-a677-48b8-9caa-b741582f6c12.png', name: '前端早读课', time: '2017/10/4', img: 'http://images.uileader.com/20180313/9ab8ce19-5a38-4756-9be1-fd598a4dea83.png', text: '【视频】基于Recat Native的跨三端技术实践' }, { head: 'http://images.uileader.com/20180313/be889b2f-7f8e-4e2f-9ae5-2e0bd3d6c85d.png', name: '极乐技术社区', time: '2017/9/5', img: 'http://images.uileader.com/20180313/76d9228c-5779-4416-8f05-2cddb200222a.png', text: '【教程】微信小程序--蓝牙连接开发总结' }, { head: 'http://images.uileader.com/20180313/16224b1e-bd33-482e-bde5-d416723a2970.png', name: '前端人', time: '2017/8/20', img: 'http://images.uileader.com/20180313/41448b31-1f65-4c3d-be58-e7d66601d1c0.png', text: ' 如丝般顺滑：CSS3实现60帧的动画' }, { head: 'http://images.uileader.com/20180313/16224b1e-bd33-482e-bde5-d416723a2970.png', name: '前端人', time: '2017/8/20', img: 'http://images.uileader.com/20180313/41448b31-1f65-4c3d-be58-e7d66601d1c0.png', text: ' 如丝般顺滑：CSS3实现60帧的动画' }, { head: 'http://images.uileader.com/20180313/16224b1e-bd33-482e-bde5-d416723a2970.png', name: '前端人', time: '2017/8/20', img: 'http://images.uileader.com/20180313/41448b31-1f65-4c3d-be58-e7d66601d1c0.png', text: ' 如丝般顺滑：CSS3实现60帧的动画' }, { head: 'http://images.uileader.com/20180313/16224b1e-bd33-482e-bde5-d416723a2970.png', name: '前端人', time: '2017/8/20', img: 'http://images.uileader.com/20180313/41448b31-1f65-4c3d-be58-e7d66601d1c0.png', text: ' 如丝般顺滑：CSS3实现60帧的动画' }, { head: 'http://images.uileader.com/20180313/16224b1e-bd33-482e-bde5-d416723a2970.png', name: '前端人', time: '2017/8/20', img: 'http://images.uileader.com/20180313/41448b31-1f65-4c3d-be58-e7d66601d1c0.png', text: ' 如丝般顺滑：CSS3实现60帧的动画' }, { head: 'http://images.uileader.com/20180313/16224b1e-bd33-482e-bde5-d416723a2970.png', name: '前端人', time: '2017/8/20', img: 'http://images.uileader.com/20180313/41448b31-1f65-4c3d-be58-e7d66601d1c0.png', text: ' 如丝般顺滑：CSS3实现60帧的动画' }, { head: 'http://images.uileader.com/20180313/16224b1e-bd33-482e-bde5-d416723a2970.png', name: '前端人', time: '2017/8/20', img: 'http://images.uileader.com/20180313/41448b31-1f65-4c3d-be58-e7d66601d1c0.png', text: ' 如丝般顺滑：CSS3实现60帧的动画' }, { head: 'http://images.uileader.com/20180313/16224b1e-bd33-482e-bde5-d416723a2970.png', name: '前端人', time: '2017/8/20', img: 'http://images.uileader.com/20180313/41448b31-1f65-4c3d-be58-e7d66601d1c0.png', text: ' 如丝般顺滑：CSS3实现60帧的动画' }],
    swiperHeight: '456px'

  },
  onLoad: function onLoad() {
    var height = "";
    wx.getSystemInfo({
      success: function success(res) {
        height = res.windowHeight - 46;
      }
    });

    this.setData({
      swiperHeight: height + 'px'
    });
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
  },
  handleContentChange1: function handleContentChange1(e) {
    var current = e.detail.current;
    this.setData({
      current1: current
    });
  },
  handleChange1: function handleChange1(e) {
    var index = e.detail.index;
    this.setData({
      current1: index
    });
  },
  inToDetail: function inToDetail(e) {
    wx.navigateTo({
      url: '/pages/activity/detail?id='
    });
  }
});