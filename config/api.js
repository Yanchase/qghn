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
  intCGoodlist:WxApiRoot + 'qghn/integral-exchange-goods-info/getList', //获取积分兑换商品列表
  intCGoodInfo:WxApiRoot + 'qghn/integral-exchange-goods-info/get_goods_info',  //获取积分兑换商品详情
  intBGoodlist:WxApiRoot + 'qghn/integral-buy-goods-info/getList', //获取积分购买商品列表
  intBGoodInfo:WxApiRoot + 'qghn/integral-buy-goods-info/get_goods_info',  //获取积分购买商品详情
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
  GetOrder:WxApiRoot + 'qghn/user/order/getAll',           //获取订单信息
  GetOrderDetail:WxApiRoot + 'qghn/user/order/getDetail',   //获取订单详细信息
  OrderSubmit:WxApiRoot + 'qghn/user/order/submitOrder',    //提交购物车订单
  CancelOrder:WxApiRoot + 'qghn/user/order/cancelOrder',    //取消订单
  OrderOneSubmit:WxApiRoot + 'qghn/user/order/submitOrderOne',  //提交商品订单
  OrderPrepay:WxApiRoot + 'qghn/user/order/buySuccess',         //订单付款
  //积分购物订单
  GetBOrder:WxApiRoot + 'qghn/integral-buy-order/getAll',           //获取积分购买订单信息
  GetBOrderDetail:WxApiRoot + 'qghn/integral-buy-order/getDetail',   //获取积分购买订单详细信息
  OrderBSubmit:WxApiRoot + 'qghn/integral-buy-order/submitOrderOne',  //提交积分购买商品订单
  CancelBOrder:WxApiRoot + 'qghn/integral-buy-order/cancelOrder',    //取消订单
  //积分兑换订单
  GetCOrder:WxApiRoot + 'qghn/integral-exchange-order/getAll',           //获取积分兑换订单信息
  GetCOrderDetail:WxApiRoot + 'qghn/integral-exchange-order/getDetail',   //获取积分兑换订单详细信息
  OrderCSubmit:WxApiRoot + 'qghn/integral-exchange-order/submitOrderOne',  //提交积分兑换商品订单

  GetAddress:WxApiRoot+'qghn/user/address/getlist',
  AddAddress:WxApiRoot+'qghn/user/address/addAdress',
  UpdateAddress:WxApiRoot+'qghn/user/address/updateAdress',
  GetOneAddress:WxApiRoot+'qghn/user/address/getOneAdress',
  DeleteAddress:WxApiRoot+'qghn/user/address/delete',
 };
