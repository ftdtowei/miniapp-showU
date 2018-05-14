// pages/firstGuide.js

const app = getApp()
const db = require('../../utils/DB.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.BaaS.login(false).then(res => {
      app.globalData.userInfo = res
      console.log("globalData", app.globalData.userInfo)
      
      let openid = app.globalData.userInfo.openid;
      app.globalData.userOpenID = openid;
      let query = new wx.BaaS.Query();
      query.compare("checkId", "=", openid)
      let Product = new wx.BaaS.TableObject("36224")
      Product.setQuery(query).find().then(res => {
        console.log("qry", res)
        if (res.data.meta.total_count == 0) {  //用户不存在时  提示用户注册授权

        } else {//用户存在  然后直接跳转
          app.globalData.userInfo = res.data.objects[0]
          wx.navigateTo({
            url: '../sharePage/sharePage'
          })
        }
      }, err => {
        // err
      })


    }, res => {
      // 登录失败
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 获取用户详细ID
  userInfoHandler:function(data) {
    wx.BaaS.handleUserInfo(data).then(res => {
      // res 包含用户完整信息，详见下方描述
      console.log(res)

      let t_userCheck = new wx.BaaS.TableObject("36224")
      let user =  t_userCheck.create()
      var data ={
        checkId: res.openid,
        nickName: res.nickName,
        avatar: res.avatarUrl
      }
      user.set(data).save().then(res => {
        // success
        console.log("save",res)
        wx.navigateTo({
          url: '../sharePage/sharePage'
        })
      }, err => {
        // err
      })

    }, res => {
      // **res 有两种情况**：用户拒绝授权，res 包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 Error 对象（详情见下方注解）
      // *Tips*：如果你的业务需要用户必须授权才可进行，由于微信的限制，10 分钟内不可再次弹出授权窗口，此时可以调用 [`wx.openSetting`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html) 要求用户提供授权
    })
  }
})