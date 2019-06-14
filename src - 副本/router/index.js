import Vue from "vue";
import Router from "vue-router";
import staticRoute from "./staticRoute";

// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css' // Progress 进度条样式

Vue.use(Router);

const router = new Router({
    mode: "hash",
    // base: process.env.BASE_URL,
    // linkExactActiveClass: 'actived',
    routes: staticRoute
});

const whiteList = ['/login'] // 不重定向白名单
// 全局路由控制
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
})
router.beforeEach((to, from, next) => {
    // NProgress.start();
    if (whiteList.indexOf(to.path) !== -1) {
        console.log('该页面无需登录即可访问')
        next()
        // NProgress.done()
    } else {
        console.warn('当前未处于登录状态，请登录')
        next()
        // NProgress.done()
    }
})

export default router