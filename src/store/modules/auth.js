const authHeaders = {
    'Accept': 'application/json',
    'Accept-Language': 'fr-FR',
}

const state = {
    user: null,
}

const getters = {
    getUser: state => state.user,
    isLoggedIn: state => !!state.user,
    getHeaders: (state) => {
        const headers = Object.assign({}, authHeaders)

        if('string' === typeof state?.user?.token) {
            headers['Authorization'] = `Bearer ${state.user.token}`
        }

        return headers;
    },

}

const actions = {
    async login({ commit }, payload) {
        console.log(payload)
        commit('setUser', payload)
    },

    logout({ commit }) {
        commit('setUser', null)
    },
}

const mutations = {
    setUser(state, payload) { //update state user
        state.user = payload
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}