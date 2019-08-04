const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    imgUrls: [
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2945634971,883860723&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564738730575&di=02d236008a3624f93255b1d6f1d4bae6&imgtype=0&src=http%3A%2F%2Fi8.hexun.com%2F2018-09-26%2F194351667.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564745691181&di=99f924f6a0ee19dad9f00673837afeb4&imgtype=0&src=http%3A%2F%2Fimage-258.258.com%2Fupload%2Fueditor%2Fimage%2F20190108%2F1546915650842954.jpg'
    ],
    height: 350,
    imgWidth: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    circular: true,
    duration: 500,
    // indicator-dots  Boolean     false   是否显示面板指示点
    // autoplay    Boolean     false   是否自动切换
    // interval    Number  5000    自动切换时间间隔
    // duration    Number  500     滑动动画时长
    searchstr: '',//搜索
    //分类导航
    menus: [
      {
        "id": 1,
        "menuName": "文字识别",
        "imgUrl": "../../images/menusIcon/wordImage.png",
        "clickUrl": "../wordImage/wordImage",
        "seq": 1
      },
      {
        "id": 2,
        "menuName": "表格识别",
        "imgUrl": "../../images/menusIcon/tableRecognition.png",
        "clickUrl": null,
        "seq": 2
      },
      {
        "id": 3,
        "menuName": "人脸识别",
        "imgUrl": "../../images/menusIcon/faceRecognition.png",
        "clickUrl": null,
        "seq": 3
      },
      {
        "id": 4,
        "menuName": "PDF识别",
        "imgUrl": "../../images/menusIcon/pdfRecognition.png",
        "clickUrl": null,
        "seq": 4
      }
    ]
  },


  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var that = this;
    //加载menu分类导航菜单
    that.menuShow();
  },
  menuShow: function (success) {
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'home/menus?key=' + utils.key,
      success: data => {
        that.setData({
          menus: data.result
        })
        console.log(data.result)
      }
    })
  },
  navigate: function(){
    // var urlStr = this.menus.clickUrl;
    // console.log(urlStr)
    wx:wx.navigateTo({
      url: '../wordImage/wordImage',
      success: function(res) {
        console.log(url)
      },
      fail: function(res) {
        console.log('失败')
      },
      complete: function(res) {},
    })
    console.log('sasa')
  },







//设置轮播容器图片宽高
setContainer:function(e){
  //图片原始宽度、高度
  var imgWidth = e.detail.width;
  var imgHeight = 800;
  // var imgHeight = e.detail.height;
  // console.log(imgHeight)
  //获取设备的宽度
  const sysInfo = wx.getSystemInfoSync();
  var screenWidth = sysInfo.screenWidth;
  console.log(screenWidth)
  //屏幕与原图比例
  // var scale = screenWidth / imgWidth;
  // console.log(scale)
  this.setData({
    imgWidth: screenWidth
    
    // height:imgHeight*scale
  })
},


  //搜索框输入时触发
  searchList(ev) {
    let e = ev.detail;
    this.setData({
      searchstr: e.detail.value
    })
  },
  //搜索回调
  endsearchList(e) {
    console.log('查询数据')
  },
  //清空搜索框
  activity_clear(e) {
    console.log('点击取消');
    console.log(this.data.searchstr)
    this.setData({
      searchstr: ''
    })
    console.log(this.data.searchstr+'没了')
  }

})