//2652335796@qq.com
// pages/mine/mine.js

var open_id = wx.getStorageSync("openid");
// if (!open_id) {
//   open_id = "00test_user_openid"; //唯一官方测试openid
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //开始-下拉刷新--貌似触发不了
  onPullDownRefresh: function () {
    wx.showToast({
      title: '下拉刷新..',
      icon: 'none',
      duration: 2000
    })
    setTimeout(function () {

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 2000)
  },

  //结束-下拉刷新

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this//不要漏了这句，很重要

    wx.showToast({
      title: '加载中..',
      icon: 'none',
      duration: 800
    })

    //请求用户信息
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/index.php?s=/home/user/user_info/open_id/' + open_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          user_info: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
        console.log(res.data.content);
        
      }
    })
  
  },

  userimg: function(){
    wx.showToast({
      title: '你点击了授权登录头像',
      icon: 'none',
      duration: 1000
    })
    setTimeout(function () {

    }, 2000)
  },
  
  about: function(){
    console.log("about");
    wx.navigateTo({
      url: '../about/about',
      success: function (res) {
        console.log('成功');
        
      }
    })
    
  },
  card: function (){
    console.log("card");
    wx.navigateTo({
      url: '../card/card',
      success: function (res) {
        console.log('成功');

      }
    })
  },

  reward: function () {
    console.log("reward");
    wx.navigateTo({
      url: '../reward/reward',
      success: function (res) {
        console.log('成功');

      }
    })

  },

  history: function () {
    console.log("history");
    wx.navigateTo({
      url: '../history/history',
      success: function (res) {
        console.log('成功');

      }
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
  
  }
})