//2652335796@qq.com
// pages/reward/reward.js
//获取openID
var open_id = wx.getStorageSync("openid"); //如果有了openid
var openid =''; //如果没有openid

const pay_url = 'https://www.djfans.net';
const appid = 'wx3472f272ef0129dc';
const key = 'wxzhufunia2018031911hongbaopayer';

var fee = 0
var body =''
var order_sn = ''
var payInfo = {};
var formData3 = {};

var nickName_ = '';
var avatarUrl_ = '';
var gender_ = '';
var city_ = '';
var province_ = '';
var country_ = '';

var formData2 = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    console.log(open_id);
   
    //如果用户没有授权，直接进入打赏功能
    //开始-判断，如果为空，就让用户授予
    if (!open_id) {
      //open_id = "00test_user_openid"; //唯一官方测试openid

      //开始-登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res.code);

          var that = this;

          wx.request({
            //获取openid接口 1/3
            url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/User/wx_api/js_code/' + res.code,
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.wx_info); //同微信https://api.weixin.qq.com/sns/jscode2session端一样的json数据返回
              openid = res.data.wx_info.openid;

              wx.setStorageSync('openid', openid); //将openid保存在本地

              //console.log(wx.getStorageSync('openid'));


              //开始- 获取用户信息 2/3
              wx.getUserInfo({
                success: function (res) {

                  console.log(res.userInfo);

                  //变量重新赋值
                  nickName_ = res.userInfo.nickName;
                  avatarUrl_ = res.userInfo.avatarUrl;
                  gender_ = res.userInfo.gender;
                  city_ = res.userInfo.city;
                  province_ = res.userInfo.province;
                  country_ = res.userInfo.country;


                  //提交用户信息 3/3
                  formData2 = { open_id: openid, nickname: nickName_, headimgurl: avatarUrl_, sex: gender_, city: city_, province: province_, country: country_ };
                  console.log(formData2);
                  //上传用户信息
                  wx.request({
                    url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/User/add_app_user',
                    data: formData2,
                    header: {
                      'Content-Type': 'application/json'
                    },
                    method: "get",
                    success: function (res) {
                      wx.showToast({
                        title: '生成用户信息',
                        icon: 'none',
                        duration: 500
                      })
                      setTimeout(function () {
                      }, 500)

                    },
                    fail: function (res) {
                      wx.showToast({
                        title: '生成信息失败',
                        icon: 'none',
                        duration: 800
                      })
                      setTimeout(function () {
                      }, 600)
                    }
                  })



                },
                fail: function (res) {
                  
                  //开始-重新授权
                  wx.showToast({
                    title: '未授权',
                    icon: 'none',
                    duration: 800
                  })
                  setTimeout(function () {
                  }, 600)

                  wx.openSetting({
                    success: function (res) {
                      wx.showToast({
                        title: '获取成功',
                        icon: 'none',
                        duration: 800
                      })

                      //重写信息获取
                      wx.getUserInfo({
                        success: function (res) {
                          console.log(res.userInfo);

                          //变量重新赋值
                          nickName_ = res.userInfo.nickName;
                          avatarUrl_ = res.userInfo.avatarUrl;
                          gender_ = res.userInfo.gender;
                          city_ = res.userInfo.city;
                          province_ = res.userInfo.province;
                          country_ = res.userInfo.country;


                          //提交用户信息 3/3
                          formData2 = { open_id: openid, nickname: nickName_, headimgurl: avatarUrl_, sex: gender_, city: city_, province: province_, country: country_ };
                          console.log(formData2);
                          //上传用户信息
                          wx.request({
                            url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/User/add_app_user',
                            data: formData2,
                            header: {
                              'Content-Type': 'application/json'
                            },
                            method: "get",
                            success: function (res) {
                              wx.showToast({
                                title: '用户信息再生成',
                                icon: 'none',
                                duration: 500
                              })
                              setTimeout(function () {
                              }, 500)

                            },
                            fail: function (res) {
                              wx.showToast({
                                title: '生成信息失败',
                                icon: 'none',
                                duration: 800
                              })
                              setTimeout(function () {
                              }, 600)
                            }
                          })


                        }

                      })

                    }
                  })
                //接受-重新授权


                }
                
              })
              //结束-


            }

          })

        }
      })
      //结束-登录

      open_id = wx.getStorageSync("openid");

      //还为空，就测试一下
      if (!open_id) {
        
        console.log('在没有openid的情况下再次尝试登录失败。');

        wx.openSetting({
          success: function (res) {
            wx.showToast({
              title: '获取成功',
              icon: 'none',
              duration: 800
            })

            //重写信息获取
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo);

                openid = res.data.wx_info.openid;
                wx.setStorageSync('openid', openid); //将openid保存在本地
                
                //变量重新赋值
                nickName_ = res.userInfo.nickName;
                avatarUrl_ = res.userInfo.avatarUrl;
                gender_ = res.userInfo.gender;
                city_ = res.userInfo.city;
                province_ = res.userInfo.province;
                country_ = res.userInfo.country;


                //提交用户信息 3/3
                formData2 = { open_id: openid, nickname: nickName_, headimgurl: avatarUrl_, sex: gender_, city: city_, province: province_, country: country_ };
                console.log(formData2);
                //上传用户信息
                wx.request({
                  url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/User/add_app_user',
                  data: formData2,
                  header: {
                    'Content-Type': 'application/json'
                  },
                  method: "get",
                  success: function (res) {
                    wx.showToast({
                      title: '用户信息再生成',
                      icon: 'none',
                      duration: 500
                    })
                    setTimeout(function () {
                    }, 500)

                  },
                  fail: function (res) {
                    wx.showToast({
                      title: '生成信息失败',
                      icon: 'none',
                      duration: 800
                    })
                    setTimeout(function () {
                    }, 600)
                  }
                })


              }

            })

          }
        })

        wx.redirectTo({
          url: '../index/index',
        })


      }


    }
//结束-判断

    

  },
  
  //测试提交
  formSub: function(){

    //开始-保存交易记录
    console.log('生成用户订单数据');
    console.log(formData3);
    //上传用户信息
    wx.request({
      url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/UserReward/add_user_reward',
      data: formData3,
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      method: "get",
      success: function (res) {
        wx.showToast({
          title: '生成订单',
          icon: 'none',
          duration: 1000
        })
        setTimeout(function () {
        }, 1000)

      },
      fail: function (res) {
        wx.showToast({
          title: '生成订单失败',
          icon: 'none',
          duration: 1000
        })
        setTimeout(function () {
        }, 1000)
      }
    })

    //结束-保存交易记录


  },

  //微信支付-小程序
  will_pay: function(e){
    
    //选择标签里面“data- ”的属性进行数据操作
    fee = e.currentTarget.dataset.fee
    body = e.currentTarget.dataset.body
    order_sn = Date.parse(new Date()) / 1000 + 'pay' + Math.floor(Math.random() * 1000000) //生成订单号：时间戳+十万随机数。

    var This = this;

    ////////
    wx.request({

      url: pay_url + '/wxbless_bg3/?s=/Home/Wxpay3/wxpay/' + '&order_sn=' + order_sn + '&open_id=' + open_id + '&body=' + body + '&fee=' + fee,

      method: "GET",
      success: function (res) {
        


        //解析支付返回的信息
        formData3 = { open_id: open_id, appid: res.data.appid, body: body, order_sn: order_sn, reward_fee: fee};
        console.log(formData3);

        console.log('发起支付')

        //开始-小程序支付
        var timeStamp = (Date.parse(new Date()) / 1000).toString();
        var pkg = 'prepay_id=' + res.data.prepay_id;
        var nonceStr = res.data.nonce_str;
        var MD5 = require('../../utils/md5.js'); //引入md5加密方法(引入js)
        var paySign = MD5.hex_md5('appId=' + appid + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5&timeStamp=' + timeStamp + '&key='+key).toUpperCase();
        
        //发起支付
        wx.requestPayment({

          'timeStamp': timeStamp,   //时间戳
          'nonceStr': nonceStr,     //随机字符串，长度为32个字符以下
          'package': pkg,           //统一下单接口返回的 prepay_id 参数值
          'signType': 'MD5',        //签名类型
          'paySign': paySign,       //签名

          'success': function (res) {
              console.log('支付成功');

              //开始-保存交易记录
              console.log('生成用户订单数据');
              console.log(formData3);
              //上传用户信息
              wx.request({
                url: 'https://www.djfans.net/wxbless_bg3/?s=/Home/UserReward/add_user_reward',
                data: formData3,
                method: 'get',
                header: {
                  'Content-Type': 'application/json'
                },
                method: "get",
                success: function (res) {
                  wx.showToast({
                    title: '生成订单',
                    icon: 'none',
                    duration: 1000
                  })
                  setTimeout(function () {
                  }, 1000)

                },
                fail: function (res) {
                  wx.showToast({
                    title: '生成订单失败',
                    icon: 'none',
                    duration: 1000
                  })
                  setTimeout(function () {
                  }, 1000)
                }
              })
              //结束-保存交易记录

              wx.showToast({
                title: '支付成功',
                icon: 'none',
                duration: 2000
              })
              setTimeout(function () {
              }, 2000)
          },
          'fail': function (res) {

            console.log('支付失败');
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
            }, 2000)
          },
          'complete': function (res) {

           }
        });

        //结束-小程序支付
       
      }
    })
    //////

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