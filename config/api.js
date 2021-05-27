 // 本机开发API地址
 //var WxApiRoot = 'http://localhost:8080/';
 // 测试环境部署api地址
   var WxApiRoot = 'http://isihon.cn:8083/';

 module.exports={
  AuthLoginByWeixin: WxApiRoot + '', //微信登录
  GoodSpec: WxApiRoot + '/qghn/goods-specification/get_goods_spec',  //获取商品规格
  GoodPrice: WxApiRoot + '/qghn/goods-product/get_price', //单个商品计价
  GoodAttri: WxApiRoot + '/qghn/goods-attribute/get_attri', //商品参数
  GoodInfo: WxApiRoot +'/qghn/goods-basic-info/get_goods_info',  //商品主页
  GoodList: WxApiRoot +'/qghn/goods-basic-info/getlist', //获取所有商品列表
  GetRootCate: WxApiRoot+'/qghn/goods-category/get_root_cate',  //获取根目录
  GetChildCate: WxApiRoot+'/qghn/goods-category/get_child_cate', //获取子目录
  GetCart: WxApiRoot+'/qghn/cart/getCar',    //购物车
  DeleteCart: WxApiRoot+'/qghn/cart/delete',
  AddCart:WxApiRoot+'/qghn/cart/add',
  UpdateCart: WxApiRoot+'/qghn/cart/update'
 }