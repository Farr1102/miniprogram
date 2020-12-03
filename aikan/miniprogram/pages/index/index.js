// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let db=wx.cloud.database();
    let cateColl=db.collection("category");
    let booksColl=db.collection("books");
    let array=[]
    cateColl.field({
      _openid:false
    }).get({
      success:res=>{
        let data=res.data;
        // console.log(data)
        // this.setData({
        //   category:data
        // })
        data.forEach(item=>{
          // console.log(item._id)
          booksColl.field({
            _openid:false
          }).where({
            categoryId:item._id
          }).get({
            success:res=>{
              let obj={};
              obj.categoryName=item.categoryName;
              obj.books=res.data
              array.push(obj);
              this.setData({
                category:array
              })
              // console.log(this.data.category)
            }
          })
        })
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