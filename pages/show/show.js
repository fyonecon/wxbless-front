// pages/show/show.js

//定义全局变量
var only_num_ = '';//已生成唯一随机数
var content_ = '';//内容
var nav_title_ = '';//导航栏标题

var openid = ''
var phonenum = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {

    indicatorDots: false,

    //音乐样式
    stylePause: "70",
    stylePlay: "0",
    playN: "none",

    startPoint: [0, 0],

    hide: 'none',

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
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Bless/user_bless/only_num/' + only_num_, 
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        openid = res.data.content[0].user_id //赋值数据库中的openid
        console.log(openid)
        //将获取到的json数据
        that.setData({
          had_detail: res.data.content, //res代表success函数的事件对，data是固定的，content是是上面json数据中content
          
        })


        //请求用户信息
        wx.request({
          url: 'https://www.djfans.net/wxbless_bg3/index.php?s=/home/user/user_info/open_id/' + openid,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            //将获取到的json数据，存在名字叫slider2的这个数组中
            that.setData({
              user_info: res.data.content,
              //res代表success函数的事件对，data是固定的，content是是上面json数据中content

            })
            console.log(res.data.content)

          }
        })


        //请求用户名片信息
        wx.request({
          url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Card/card/openid/' + openid,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(openid)
            console.log(res.data.content)

            if (!res.data.content[0].openid) {
              console.log("数据库openid不存在")
              that.setData({
                hide: hide,
              })
              return;
            }
            console.log(res.data.content[0].name)

            phonenum = res.data.content[0].tel

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




      }

    }),

    //第一次请求赞的数量
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Zan/zan_num/&only_num=' + only_num_,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        if (!res.data.content){
          //将获取到的json数据
          that.setData({
            zan_num: '0', //res代表success函数的事件对，data是固定的，content是是上面json数据中content

          })
        }else{
          //将获取到的json数据
          that.setData({
            zan_num: res.data.content, //res代表success函数的事件对，data是固定的，content是是上面json数据中content

          })
        }

        
      }

    }),

    //在导航栏显示模板名
    wx.setNavigationBarTitle({
      title: "" + options.detail_title,
    })

  },
  
  //打电话
  call: function(){
    console.log("打电话" + phonenum)
    wx.makePhoneCall({
      phoneNumber: phonenum, //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })  

  },


  //打赏
  reward: function(){
    wx.navigateTo({
      url: '../reward/reward',
    })
  },

  img_zan: function(){
    wx.showToast({
      title: '双击空白处可持续点赞',
      icon: 'none',
      duration: 2000
    })
    setTimeout(function () {
    }, 2000)
  },

  //点赞
  zan: function(e){
    console.log('点');
    var that = this

    var curTime = e.timeStamp;
    var lastTime = this.data.lastTapDiffTime;

    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;

    //定义动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in',
    })
    //动画
    this.animation = animation

    if(lastTime > 0){

      //双击判断
      if(curTime - lastTime < 300){
        console.log('双击')

        //获取当前手指屏幕坐标
        var touch = e.touches[0]; //获取第一个触点
        x = Number(touch.pageX); //触点X坐标
        y = Number(touch.pageY); //触点Y坐标

        //获取屏幕宽、高
        w = wx.getSystemInfoSync().windowWidth //屏幕宽/像素
        h = wx.getSystemInfoSync().windowHeight //屏幕高/像素

        console.log('x='+x)
        console.log('y='+y)
        console.log('w=' + w)
        console.log('h=' + h)  

        //开始-提交双击赞
        wx.request({
          url: 'https://www.djfans.net/wxbless_bg3/index.php?s=/Home/Zan/zan/&only_num=' + only_num_,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log('双击赞提交成功')
            //提交成功后，再次查询赞的实时值
            wx.request({
              url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/Zan/zan_num/&only_num=' + only_num_,
              headers: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                that.setData({
                  zan_num: res.data.content, 
                })

              }
            })
           
          },fail: function(){
            console.log('双击赞提交失败')
            wx.showToast({
              title: '网络不通',
              icon: 'none',
              duration: 800
            })
            setTimeout(function () {
            }, 800)

            return;
          }

        })
        //结束-提交双击赞

        //爱心计数的动画
        animation.scale3d(1.5, 1.5, 1.5).translateY(-5).rotateY(180).opacity(1).step()
        animation.scale3d(1, 1, ).translateY(0).rotateY(-180).opacity(1).step()
        this.setData({
          animationData_icon: animation.export()
        })

        
        //一帧动画
        this.setData({
          left: x - 15,
          top: y - 12,
          hide: 'inline-block',
          animationData: {},
        })
        animation.scale3d(2, 2, 2).translateY(-40).rotate(0).opacity(0.7).step()
        this.setData({
          animationData: animation.export()
        })
        
        //动画消失
        setTimeout(function () {
          that.setData({
            hide: 'none',
          })
          //还原动画状态
          animation.scale3d(0, 0, 0).translateY(0).rotate(0).opacity(1).step()
          that.setData({
            animationData: animation.export()
          })

        }, 550)


        // 2
        //一帧动画
        this.setData({
          left2: x - 15,
          top2: y - 12,
          animationData2: {},
        })
        animation.scale3d(1.3, 1.3, 1.3).translateY(-15).translateX(-20).rotate(0).opacity(0.7).step()
        this.setData({
          animationData2: animation.export()
        })

        //动画消失
        setTimeout(function () {
          //还原动画状态
          animation.scale3d(0, 0, 0).translateY(0).translateX(0).rotate(0).opacity(1).step()
          that.setData({
            animationData2: animation.export()
          })

        }, 500)


        //3
        //一帧动画
        this.setData({
          left3: x - 15,
          top3: y - 12,
          animationData3: {},
        })
        animation.scale3d(1.3, 1.3, 1.3).translateY(-15).translateX(20).rotate(0).opacity(0.7).step()
        this.setData({
          animationData3: animation.export()
        })

        //动画消失
        setTimeout(function () {
          //还原动画状态
          animation.scale3d(0, 0, 0).translateY(0).translateX(0).rotate(0).opacity(1).step()
          that.setData({
            animationData3: animation.export()
          })

        }, 500)



      }else{
        console.log('没有双击成功')
        that.setData({
          hide: 'none',
        })
        //还原动画状态
        animation.scale3d(0, 0, 0).translateY(0).rotate(0).opacity(1).step()
        that.setData({
          animationData: animation.export()
        })
      }

    }else{
      console.log('点了一下')
    }

    this.setData({
      lastTapDiffTime: curTime,
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