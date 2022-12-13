import axios from 'axios'
import store from "../store"

    //=== Auth
    const authRequest = async (
        form,
        {router, route},
        query = '',
        Callback = () => {}
    ) => {
        console.log('here')
        try {
            await axios
                .post(`${import.meta.env.VITE_BASE_URL}/auth/local/${query}`, form)
                .then( (res) => {
                    Callback(res.data)
                })
                .then( () => {
                    console.log(store.getters.getUser)
                    router.push({ name: route.meta.redirect })
                })

        } catch (error) {
            console.log(error)
        }

    }

    //=== Basic requests
    const getRequest = async (
        query = '',
        Callback = () => {}
    ) => {

        let response
        try {
            await axios
                .get(`${import.meta.env.VITE_BASE_URL}/${query}`, {
                    headers: store.getters.getHeaders
                })
                .then( (res) => {
                    console.log(res.data)
                    Callback(res)
                    response = res.data
                })

        } catch (e) {
            console.log(e)
        }

        return response
    }

export {
    authRequest,
    getRequest
}