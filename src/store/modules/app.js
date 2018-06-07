const app = {
    state: {
        token: localStorage.getItem('token') || '',
        storeId: localStorage.getItem('storeId') || '',
        profile: JSON.parse(localStorage.getItem('profile')) || {},

    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem('token', token);
        },
        SET_STORE_ID: (state, storeId) => {
            state.storeId = storeId
            localStorage.setItem('storeId', storeId);
        },
        SET_PROFILE: (state, profile) => {
            state.profile = profile
            localStorage.setItem('profile', JSON.stringify(profile));
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('SET_TOKEN', token)
        },
        setStoreId({ commit }, storeId) {
            commit('SET_STORE_ID', storeId)
        },
        setProfile({ commit }, profile) {
            commit('SET_PROFILE', profile)
        },
    }
}

export default app