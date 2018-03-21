//2652335796@qq.com
//app.js
//var aldstat = require("./utils/ald-stat.js")
//import api from "/api/API.js" //
var openid = ''; 

var nickName_ = '';
var avatarUrl_ = '';
var gender_ = '';
var city_ = '';
var province_ = '';
var country_ = '';


var formData2 = {};



App({

  globalData: {
    
  },

  onLaunch: function () {

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


            //获取用户信息 2/3
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
            })

            
          }
         
        })
        
      }
    })
    //结束-登录
    
  },
  






})