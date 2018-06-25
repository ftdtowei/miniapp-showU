"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Date.prototype.Format = function (fmt) {
  //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }return fmt;
};
exports.default = Page({
  data: {
    date: '233'
  },
  onLoad: function onLoad() {
    var tmp = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
    var end = new Date(tmp).Format("yyyy-MM-dd");
    var time = new Date(tmp).Format("HH:mm");
    this.setData({
      date: end,
      time: time
    });
  },
  bindDateChange: function bindDateChange(e) {
    var date = e.detail.value;
    this.setData({
      date: date
    });
  },
  bindTimeChange: function bindTimeChange(e) {
    var time = e.detail.value;
    this.setData({
      time: time
    });
  }
});