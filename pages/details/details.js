//2652335796@qq.com
// pages/details/details.js
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
    console.log("音乐报错："+u.detail.errMsg);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    //记载提示
    wx.showLoading({
      title: '加载中',
    }),
    setTimeout(function () {
      wx.hideLoading()
    }, 800),


    //url传递参数，自然分配数据
    this.setData({
      detail_id: options.detail_id , //祝福id
      user_id: options.user_id,  //用户id
      detail_title: options.detail_title,  //祝福标题
      //唯一随机数
      only_num: Date.parse(new Date())/1000+'only'+Math.floor(Math.random() * 1000000),
    })  

    var that = this

    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/detail/blessdetail_id/' + options.detail_id,  //拿到从上一级页面传递过来的get数据
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          detail: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    }),

    //修改导航栏文字
    wx.setNavigationBarTitle({
      title: "正在编辑："+options.detail_title,
    })

  },

  //提交表单
  formSubmit: function (e){
    var that = this;
    var formData = e.detail.value;

    if (formData.content == ""){
      wx.showLoading({
        title: '请输入内容',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 800)

    }else{

      wx.request({
        url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/User/add_bless',
        data: formData,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '生成中...',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            //成功后直接关闭上一个页面，并且打开新页面
            wx.redirectTo({
              url: '../show/show?only_num=' + e.detail.value.only_num + '&content=' + e.detail.value.content + '&detail_title=' + e.detail.value.detail_title,
              success: function (res) {
                console.log("关闭旧页面，打开新页面");
              }
            })
          }, 1000)

        },
        fail: function (res) {
          console.log('cuowu' + ':' + res)
        }
      })

      console.log('form发生了submit事件，携带数据为：', formData) 

    }

    
  },


  //按钮分享
  // shareBtn: function(){
  //   wx.showShareMenu({
  //     withShareTicket: true
  //   })
  // },

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
  // onShareAppMessage: function () {
    
  // }
  
})