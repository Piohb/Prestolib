import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'
import colors from './modules/colors'

const store = createStore({
    modules: {
        auth,
        colors
    },
    plugins: [createPersistedState()],
})

export default store