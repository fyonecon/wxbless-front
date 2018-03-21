// pages/show/show.js

//定义全局变量
var only_num_ = '';//已生成唯一随机数
var content_ = '';//内容
var nav_title_ = '';//导航栏标题

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //音乐样式
    stylePause: "70",
    stylePlay: "0",
    playN: "none",

  },

  // 监听暂停播放按钮
  audioPlay: function () {
    this.audioCtx.play()
    this.setData({ stylePause: "0" })
    this.setData({ stylePlay: "70" })
    this.setData({ playN: "block" })
    console.log(1);
  },
  audioPause: function () {
    this.audioCtx.pause()
    this.setData({ stylePlay: "0" })
    this.setData({ playN: "none" })
    this.setData({ stylePause: "70" })

    console.log(2);
  },

  // 监听Audio状态
  funplay: function () {
    console.log("音乐播放");
  },
  funpause: function () {
    console.log("音乐暂停");
  },
  funerror: function (u) {
    console.log("音乐报错：" + u.detail.errMsg);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //对全局变量进行赋值
    only_num_ = options.only_num
    content_ = options.content
    nav_title_ = options.detail_title

    //记载提示
    wx.showLoading({
      title: '加载中',
    }),
    setTimeout(function () {
      wx.hideLoading()
    }, 1000),

    //url传递参数，自然分配数据
    this.setData({
      // content: options.content, //祝福内容
      // detail_title: options.detail_title, //模板名
      // only_num: options.only_num, //属于单独页面的唯一随机数
    }),

    
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/user_bless/only_num/' + options.only_num, 
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据
        that.setData({
          had_detail: res.data.content, //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }

    }),

    //在导航栏显示模板名
    wx.setNavigationBarTitle({
      title: "已生成：" + options.detail_title,
    })

  },

  //打赏
  reward: function(){
    wx.navigateTo({
      url: '../reward/reward',
    })
  },

  //返回首页
  back_home: function (res) {
    //因为首页有tab,所以不能用navigate和redirect
    wx.switchTab({
      url: '../index/index',
      success: function (res) {
        console.log('返回成功');
        wx.showToast({
          title: '打开应用首页',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
        }, 2000)
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
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

    if (res.from === 'button') { //来自页面内部按钮
      return {
        title: content_ + ' 你的祝福贺卡',
        desc: '给你最美好的祝福!',
        path: '/pages/show/show?only_num=' + only_num_ + '&detail_title=' + nav_title_,

        success: function (res) {
          // 转发成功
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 1000
          })


        },
        fail: function (res) {
          // 转发失败
          wx.showLoading({
            title: '取消了分享',
          })

          setTimeout(function () {
            wx.hideLoading()
          }, 1000)

        }
      }
    }else{ //来自右上角按钮
      return {
        title: content_ + ' 你的祝福贺卡',
        desc: '给你最美好的祝福!',
        path: '/pages/show/show?only_num=' + only_num_ + '&detail_title=' + nav_title_,

        success: function (res) {
          // 转发成功
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 1000
          })
        },
        fail: function (res) {
          // 转发失败
          wx.showLoading({
            title: '取消了分享',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)

        }
      }
    }

  }
})