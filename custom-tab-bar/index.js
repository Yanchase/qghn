Component({
  data: { 
    selected: 0,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        normal:'/image/tabber/home.png',
        active:'/image/tabber/home-active.png'
      },
      {
        pagePath: "/pages/mall/mall",
        text: "商城",
        normal:'/image/tabber/mall.png',
        active:'/image/tabber/mall-active.png'
      },
      {
        pagePath:"/pages/live/live",
        text:"直播",
        normal:'/image/tabber/live.png',
        active:'/image/tabber/live-active.png'
      },
      {
        pagePath:"/pages/cart/cart",
        text:"购物车",
        normal:'/image/tabber/cart.png',
        active:'/image/tabber/cart-active.png'
      },
      {
        pagePath:"/pages/mine/mine",
        text:"我的",
        normal:'/image/tabber/mine.png',
        active:'/image/tabber/mine-active.png'
      }

    ]
  },
  methods: {
    onChange(e) {
       console.log(e,'e')
       this.setData({ active: e.detail });
       wx.switchTab({
         url: this.data.list[e.detail].pagePath
       });
    },
    init() {
        const page = getCurrentPages().pop();
        this.setData({
       　  active: this.data.list.findIndex(item => item.pagePath === `/${page.route}`)
        });
       }
    }
})