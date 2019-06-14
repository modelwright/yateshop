const staticRoute = [{
    path: '/',
    redirect: '/home',
    component: () => import('@/view/Layout'),
    children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/view/Home/Home')
    },{
        path: 'classity',
        name: 'classity',
        component: () => import('@/view/Classify/Classify')
    },{
        path: 'mine',
        name: 'mine',
        component: () => import('@/view/Mine/mine')
    }]
},{
    path: '/detail',
    component: ()=> import("@/view/Home/Detail")
},{
    path: '/preview',
    component: () => import('@/view/Home/Preview')
},{
    path: '/coupon',
    component: () => import('@/view/Home/Coupon')
},{
    path: '/serch',
    component: () => import('@c/SerchPage')
},{
    path: '/commentList',
    component: () => import('@/view/Home/CommentList')
},{
    path: '/classify/shoplist',
    component: ()=>import('@/view/Classify/ShopList')
},{
    path: '/mine/myShop',
    component: ()=>import('@/view/Mine/myShop')
},{
    path: '/mine/myOrder',
    component: ()=>import('@/view/Mine/myOrder')
},{
    path: '/mine/comment',
    component: ()=>import('@/view/Mine/Comment')
},{
    path: '/mine/refund',
    component: ()=>import('@/view/Mine/Refund')
},{
    path: '/mine/detail',
    component: ()=>import('@/view/Mine/Detail')
},{
    path: '/mine/addlog',
    component: ()=>import('@/view/Mine/addlog')
},{
    path: '/mine/sellog',
    component: ()=>import('@/view/Mine/sellog')
},{
    path: '/mine/feedback',
    component: ()=>import('@/view/Mine/FeedBack')
},{
    path: '/mine/aboutUs',
    component: ()=>import('@/view/Mine/About')
},{
    path: '/mine/edit',
    component: ()=>import('@/view/Mine/Edit')
},{
    path: '/mine/sendcode',
    component: ()=>import('@/view/Mine/SendCode')
},{
    path: '/mine/paypass',
    component: ()=>import('@/view/Mine/PayPass')
},{
    path: '/login',
    component: ()=> import("@/view/Login")
},{
    path: '*',
    component: () => import(/* webpackChunkName: 'error' */ '@c/Error/404')
}]

export default staticRoute
