// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{},
    maxHeight: 20, // 最大高度
    isShow: true,
    comment:[]
  },

  onClickShow: function() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db=wx.cloud.database();
    const booksColl=db.collection("books");
    booksColl.doc(options._id).get({
      success:res=>{
        this.setData({
          book:res.data
        })
      },
      fail:res=>{
        console.log("NOT FOUND")
      }
    });
    const comColl=db.collection("comment");
    comColl.where({
      bookId:options._id
    }).field({
      _openid:false,
      _id:false,
      bookId:false
    }).get({
      success:res=>{
        this.setData({
          comment:res.data
        })
        // console.log(this.data.comment)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let query=wx.createSelectorQuery();
    query.select('.intro').boundingClientRect(rect=>{
      // console.log(rect.height)
      if( rect.height >  this.data.maxHeight) {
        this.setData({
          isShow:true
        })
      }
    }).exec()
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