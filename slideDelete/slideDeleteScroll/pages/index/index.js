Page({
  initdata : function (that) {
     var list = that.data.list
     for (var i = 0; i < list.length; i++) {
        list[i].txtStyle = ""
     }
     that.setData({ list: list })
  } ,
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        txt: "0"      
      },
      {
        txt: "1"
      },
      {
        txt: "2"
      },
    ],
    startX:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initList(this.data.list)
  },
  initList:function(listData){
    for(var i in listData){
      listData[i].left=0
    }
    this.setData({list:listData})
    // console.log(this.data.list)
  },
  touchS: function (event) {
    if (event.touches.length == 1) {
      this.setData({
        startX: event.touches[0].clientX
      });
    }
  },
  touchE: function (event) {
    var index = event.currentTarget.dataset.sid
    if (event.changedTouches.length == 1) {
      //手指移动结束后水平位置 
      var endX = event.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      if(disX>40){
        this.changeList(this.data.list,index,80)
      }else{
        this.changeList(this.data.list, index, 0)
      }
    }
  },
  changeList:function(listData,index,leftData){
    for(var i in listData){
      if(i==index){
        listData[i].left=leftData
      }
    }
    this.setData({ list: listData })
  },
  deleteTab:function(event){
    var index = event.currentTarget.dataset.sid;
    var listData = this.data.list
    for (var i in listData) {
      if (i == index) {
        listData.splice(index, 1);
      }
    }
    this.setData({ list: listData })
  }
})