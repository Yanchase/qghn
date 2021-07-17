 // 本机开发API地址
 //var WxApiRoot = 'http://localhost:8080/';
 // 测试环境部署api地址
   var WxApiRoot = 'http://www.ytalk.shop:8083/';

 module.exports = {

  AuthLoginByWeixin: WxApiRoot + '/qghn/user/login_by_weixin', //微信用户登录
  GoodSpec: WxApiRoot + 'qghn/goods-product/get_price',  //获取商品规格
  AuthLoginByWeixin: WxApiRoot + '', //微信登录
  GoodSpec: WxApiRoot + 'qghn/goods-product/get_price',  //获取商品规格
  //GoodPrice: WxApiRoot + 'qghn/goods-product/get_price', //单个商品计价
  //GoodAttri: WxApiRoot + 'qghn/goods-product/get_price', //商品参数
  GoodInfo: WxApiRoot +'qghn/goods-basic-info/get_goods_info',  //商品主页
  GoodList: WxApiRoot +'qghn/goods-basic-info/getList', //获取所有商品列表
  Goodlist: WxApiRoot +'qghn/goods-basic-info/getlist', //获取目录下商品列表
  GetRootCate: WxApiRoot + 'qghn/goods-category/get_root_cate',  //获取根目录
  GetChildCate: WxApiRoot + 'qg hn/goods-category/get_child_cate', //获取子目录
  GetCart: WxApiRoot + 'qghn/cart/getCar',    //购物车
  GetVideoList: WxApiRoot + 'qghn/video-file/getlist', //获取录播视频
  DeleteCart: WxApiRoot + 'qghn/cart/delete',
  AddCart:WxApiRoot + 'qghn/cart/add',
  GetMoreCart:WxApiRoot + 'qghn/cart/getinfobycar',
  UpdateCart: WxApiRoot + 'qghn/cart/update',
  UpdateChoose: WxApiRoot + 'qghn/cart/updateChoose',
  CartCheckout: WxApiRoot + 'qghn/cart/getCheckCart',     //获取被选中的购物车商品
  GetOrder:WxApiRoot + 'qghn/user/order/getAll',
  GetOrderDetail:WxApiRoot + 'qghn/user/order/getDetail',
  OrderSubmit:WxApiRoot + 'qghn/user/order/submitOrder',
  OrderOneSubmit:WxApiRoot + 'qghn/user/order/submitOrderOne',
  OrderPrepay:WxApiRoot + 'qghn/user/order/buySuccess',
  GetAddress:WxApiRoot+'qghn/user/address/getlist',
  AddAddress:WxApiRoot+'qghn/user/address/addAdress',
  UpdateAddress:WxApiRoot+'qghn/user/address/updateAdress',
  GetOneAddress:WxApiRoot+'qghn/user/address/getOneAdress',
  DeleteAddress:WxApiRoot+'qghn/user/address/delete',
 };
