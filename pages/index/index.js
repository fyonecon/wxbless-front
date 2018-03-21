//2652335796@qq.com
//index.js
//获取应用实例
const app = getApp()
//获取openID
var open_id = wx.getStorageSync("openid");

Page({
  data: {
    
    interval: 4000,
    duration: 800
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (res) {

    var that = this//不要漏了这句，很重要

    //请求轮播图
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Slider',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          slider: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })
    
    //节日祝福  1
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          jrzf: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content
          
        })
      }
    })

    //节日祝福  9
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/9',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          essjq: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })

    //阿弥陀福  7
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/7',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          emtf: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })

    //福气延绵  3
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/3',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          fqym: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })

    //问候朋友  8
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/8',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          whpy: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })
    

  },


  //下拉刷新
  onPullDownRefresh: function () {


    var that = this//不要漏了这句，很重要

    //请求轮播图
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Slider',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          slider: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })

    //节日祝福  1
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          jrzf: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })

    //节日祝福  9
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/9',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          essjq: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })

    //阿弥陀福  7
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/7',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          emtf: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })

    //福气延绵  3
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/3',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          fqym: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })
      }
    })

    //问候朋友  8
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/index/blesslist_id/8',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          whpy: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content

        })

      }
    })
    
    wx.showToast({
      title: '下拉刷新..',
      icon: 'none',
      duration: 2000
    })
    setTimeout(function () {

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 2000)
    

  },



  
  //轮播图跳转
  swiper_nav: function (e) {

    //选择标签里面“data- ”的属性进行数据操作
    var blessdetail_id = e.currentTarget.dataset.blessdetail_id
    var bless_title = e.currentTarget.dataset.bless_title

    wx.navigateTo({
      url: "../details/details?detail_id=" + blessdetail_id + "&user_id=" + open_id+"&"+"detail_title="+bless_title,
    })

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    return {//只是返回右上角按钮
      title: '祝福你-模板多多，祝福多多！',
      desc: '给你最真挚的祝福!',
      //imageUrl: '',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }

  },


  //热门点击
  formHotTap: function (e) {

    console.log("=========="+e);

    let formId = e.detail.formId;
    console.log('form页面间传值：' + formId);
    this.dealFormIds(formId);

    


    //跳转操作
    var dataset = e.currentTarget.dataset;
    this.hotTap(dataset);




  },
  hotTap: function (dataset) {
    console.log("------");
    wx.navigateTo({
      url: '../details/details?detail_id=' + dataset.blessdetail_id + '&user_id='+open_id+'&detail_title=' + dataset.bless_title
    })

    console.log("open_id="+open_id);
  },
  dealFormIds: function (formId) {

    let formIds = app.globalData.gloabalFormIds;//获取全局数据中的推送码gloabalFormIds数组

    if (!formIds) formIds = [];

    let data = {

      formId: formId,

      expire: parseInt(new Date().getTime() / 1000) + 604800
      //计算7天后的过期时间时间戳

    }

    formIds.push(data);//将data添加到数组的末尾

    app.globalData.gloabalFormIds = formIds; //保存推送码并赋值给全局变量

  },



})

