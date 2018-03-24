//2652335796@qq.com
// pages/history/history.js

var open_id = wx.getStorageSync("openid");
var only_num_ = 0;
var content = '';
var detail_title = '';


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //开始-下拉刷新-貌似不能触发
  onPullDownRefresh: function () {
    var that = this//不要漏了这句，很重要
    console.log('下拉刷新')

    wx.showToast({
      title: '下拉刷新...',
      icon: 'none',
      duration: 800
    })

    setTimeout(() => {

      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      //查询历史
    var that = this//不要漏了这句，很重要
    wx.showToast({
      title: '加载中..',
      icon: 'none',
      duration: 2000
    })

    //请求用户信息
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/User/user_bless_history/open_id/' + open_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫slider2的这个数组中
        that.setData({
          history: res.data.content,
          //res代表success函数的事件对，data是固定的，content是是上面json数据中content
        })
        

        console.log(res.data.content);
      }
    })

  },

  //删除历史
  del_history: function(e){

    var that = this//不要漏了这句，很重要
    //选择标签里面“data- ”的属性进行数据操作
    var id = e.currentTarget.dataset.id

    only_num_ = e.currentTarget.dataset.only_num
    content = e.currentTarget.dataset.content
    detail_title = e.currentTarget.dataset.detail_title

    console.log(id);


    var itemList = ['查看详情', '删除']

    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#F29345',
      success: function (res) {
        if (!res.cancel) {
          console.log(itemList[res.tapIndex])
          console.log(res.tapIndex)

          if (res.tapIndex == 0){
              console.log('sheet 0')
              console.log(only_num_ + content + detail_title)
              wx.navigateTo({
                url: '../show/show?only_num=' + only_num_ + '&content=' + content + '&detail_title=' + detail_title,
                success: function (res) {
                  console.log("打开详情页面");
                }
              })

          }
          if (res.tapIndex == 1) {
            console.log('sheet 1')
            // ///==删除即是更新状态，和下拉刷新一个思路==
            wx.request({
              url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/User/user_bless_del/id/' + id,
              headers: {
                'Content-Type': 'application/json'
              },
              success: function (res) {

                //请求用户信息
                wx.request({
                  url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/User/user_bless_history/open_id/' + open_id,
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  success: function (res) {
                    //将获取到的json数据，存在名字叫slider2的这个数组中
                    that.setData({
                      history: res.data.content,
                      //res代表success函数的事件对，data是固定的，content是是上面json数据中content
                    })
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 800
                    })
                    console.log(res.data.content);
                  }
                })

                console.log('删除成功')

              }
            })
          ///


          }

        }else{
          wx.showToast({
            title: '已取消',
            icon: 'none',
            duration: 800
          })

          console.log('取消删除')
        }

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