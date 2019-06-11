const staticRoute = [{
    path: '/',
    redirect: '/index',
    component: () => import('@/view/Home'),
    children: [{
        path: 'index',
        component: () => import('@/view/Home/Home')
    },{
        path: 'detail',
        component: () => import('@/view/Home/Detail')
    },{
        path: 'preview',
        component: () => import('@/view/Home/Preview')
    },{
        path: 'coupon',
        component: () => import('@/view/Home/Coupon')
    }]
},{
    path: '/mine',
    component: ()=> import('@/view/Mine'),
    children: [{
        path: '/mine',
        component: ()=>import('@/view/Mine/mine')
    },{
        path: 'myShop',
        component: ()=>import('@/view/Mine/myShop')
    },{
        path: 'myOrder',
        component: ()=>import('@/view/Mine/myOrder')
    },{
        path: 'comment',
        component: ()=>import('@/view/Mine/Comment')
    },{
        path: 'refund',
        component: ()=>import('@/view/Mine/Refund')
    },{
        path: 'detail',
        component: ()=>import('@/view/Mine/Detail')
    },{
        path: 'addlog',
        component: ()=>import('@/view/Mine/addlog')
    },{
        path: 'sellog',
        component: ()=>import('@/view/Mine/sellog')
    }]
},{
    path: '/classify',
    component: ()=> import("@/view/classify")
},{
    path: '/login',
    component: ()=> import("@/view/Login")
},{
    path: '*',
    component: () => import(/* webpackChunkName: 'error' */ '@c/Error/404')
}]

export default staticRoute
