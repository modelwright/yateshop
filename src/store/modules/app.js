const app = {
    state: {
        img_upload_cache: [],
        img_paths: [],
        img_status: 'ready' // 上传状态 ready selected uploading finished
    },

    actions: {},

    getters: {},

    mutations: {
        set_img_upload_cache (state, arg) {
            state.img_upload_cache = arg
        },
        set_img_paths (state, arg) {
            state.img_paths = arg
        },
        set_img_status (state, arg) {
            state.img_status = arg
        }
    }
}

export default app