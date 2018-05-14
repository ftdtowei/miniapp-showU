// pages/sharePage/sharePage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.id !== undefined){
      let query = new wx.BaaS.Query();
      query.compare("checkId", "=", options.id)
      let Product = new wx.BaaS.TableObject("36224")
      Product.setQuery(query).find().then(res => {
        console.log("qry", res)
        if (res.data.meta.total_count == 0) {  //用户不存在时  提示用户注册授权

        } else {//用户存在  然后直接跳转
          app.globalData.userInfo = res.data.objects[0]
          that.setData({
            user: res.data.objects[0].nickName
          })
          console.log(app.globalData.userInfo )
        }
      }, err => {
        // err
      })
    }
   
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
  onShareAppMessage: function (res) {
    console.log(app.globalData.userOpenID)
    return {
      title: '自定义转发标题',
      path: 'pages/sharePage/sharePage?id=' + app.globalData.userOpenID,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})