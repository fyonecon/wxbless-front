// pages/card/card.js

var open_id = wx.getStorageSync("openid");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: open_id,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this//不要漏了这句，很重要


    //请求用户名片信息
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Card/card/openid/' + open_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(open_id)
        console.log(res.data.content)

        if (!res.data.content[0].openid){
            console.log("数据库openid不存在")
            return;
        }
        console.log(res.data.content[0].name)

        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          user_card: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content
          name: res.data.content[0].name,
          tel: res.data.content[0].tel,
          work: res.data.content[0].work,
          com: res.data.content[0].com,
          example: res.data.content[0].example,

        })

      }
    })
  
  },


  //提交表单
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;

    if (formData.content == "") {
      wx.showLoading({
        title: '请输入内容',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 800)

    } else {

      wx.request({
        url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Card/add_card/',
        data: formData,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })

        },
        fail: function (res) {
          console.log('cuowu' + ':' + res)
        }
      })

      console.log('form发生了submit事件，携带数据为：', formData)

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
  onShareAppMessage: function () {
  
  }
})