import { removeStore } from '@/utils/auth'
// import { login,logout } from '@/api'

const user = {
    state: {
        userData: window.localStorage.getItem('userData') ? JSON.parse(window.localStorage.getItem('userData')) : ''
    },
    mutations: {
        SET_USERDATA: (state, data) => {
            window.localStorage.setItem("userData", JSON.stringify(data));
            state.userData = data;
        }
    },
    actions: {
        // 登录
        setUserData({ commit }, data) {
            commit('SET_USERDATA', data)
        },
        // 登出
        setlayout({ commit }) {
            commit('SET_USERDATA', '')
            removeStore('userData')
        }
    }
}

export default user