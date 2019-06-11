import fly from 'flyio'
import { BASE_URL } from './count'
import qs from 'qs'
import store from '../store'
import router from '../router'
import { Toast,Dialog } from 'vant';

// 添加请求拦截器
fly.interceptors.request.use((request) => {
    // 给所有请求添加自定义header
    request.headers['X-from'] = 'kokiy'
    request.baseURL = BASE_URL
    request.withCredentials = true
    request.timeout = 90000
    return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (res) => {
        if ((res.status >= 200 && res.status <= 300) || res.status === 304) {
            let response = JSON.parse(res.data)
            if(response.status == 0){
                if (response.data.error_code === "00001" || response.status === 50012 || response.status === 50014 || response.status === 90001) {
                    store.dispatch('setlayout')
                    console.log(store)
                    // console.log(router)
                    // Toast("即将自动为您跳转到登录页面");
                    Dialog.confirm({
                        title: '登录确认',
                        message: '请确认是否跳转登录页'
                    }).then(() => {
                        router.push('/login');
                    }).catch(() => {
                        // on cancel
                    });
                    setTimeout(()=>{
                        // router.push('/login');
                    },2000)
                }
                throw new Error("error")
            }else{
                return response
            }
        }
    },
    (err) => {
        if(err.status == 200){
            console.log("请求成功，后台返回了错误");
            Toast(JSON.parse(err.engine.response).message);
            return Promise.reject(err)
        }else{
            console.log("网络不好哦")
            Toast('网络不好哦');
            return Promise.reject(err)
        }
    },
)

const GET = async ({ url, param }) => {
    try {
        const response = await fly.get(url, qs.stringify(param))
        return Promise.resolve(response)
    } catch (error) {
        throw new Error(error)
    }
}

const POST = async ({ url, param }) => {
    try {
        const response = await fly.post(url, param, {})
        return Promise.resolve(response)
    } catch (error) {
        throw new Error(error)
    }
}

const POSTFORM = async ({ url, param }) => {
    try {
        let data = qs.stringify(param);
        const response = await fly.post(url, data)
        console.log("走了成功的")
        return Promise.resolve(response)
    } catch (error) {
        console.log("走了错误哦" + error)
        throw new Error(error)
    }
}

const UPLOAD = async ({ url, param, token }) => {
    try {
        const response = await fly.post(url + '?sessionid =' + token, param, {})
        return Promise.resolve(response)
    } catch (error) {
        throw new Error(error)
    }
}

export {
    GET, POST, POSTFORM, UPLOAD
}