//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    images: [],
    words: '',
    //是否识别到文字
    faceend: true,
    wordmessage: true,
    animation: false
  },
  wordImage:function(){
    this.setData({
      faceend: true
    })
    
    console.log('触发成功')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res) =>{
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)//生成路径url
        this.setData({
          images: tempFilePaths,
          animation: true
        })
        //开始上传图片到服务器返回识别的文字
        wx.uploadFile({
          url: 'http://www.thexxdd.cn/words/',
          filePath: tempFilePaths[0],
          name: 'file',
          success:(res) =>{
            const data = res.data
            // console.log(data)
            var worddata = JSON.parse(data)
            // console.log(worddata)
            var wordsing = worddata.identify
            // console.log(wordsing)
            // var str = ''
            // for (let i = 0; i < wordsing.length; i++) {
            //   str += wordsing[i].words;
            // }
            // console.log("得到的"+str)
            //判断是否识别到文字
            if(wordsing == ''){
              this.setData({
                wordmessage: false,
                faceend: true,
                animation: false
              })
              
            }else{
              this.setData({
                words: wordsing,
                faceend: false,
                wordmessage: true,
                animation: false
              })
            }
            
            // this.setData({
            //   words:wordsing
            // })
          }
        })
      }
    })
  },
  //复制文本
  copy:function(){
    var dataCopy = this.data.words
    var str = ''
    for (let i = 0; i < dataCopy.length; i++) {
      str += dataCopy[i].words + '\n';
    }
    wx.setClipboardData({
      data: str,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
    console.log();
  }

})
