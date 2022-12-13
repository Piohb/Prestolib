import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// COMPONENTS
import App from '../App.vue'
import Register from '@/components/Auth/Register.vue'
import Login from '@/components/Auth/Login.vue'
import AuthForm from '@/components/Auth/AuthForm.vue'
import ClientHome from '@/components/Clients/Home.vue'
import ProviderHome from '@/components/Providers/Home.vue'

const routes = [
    // AUTH
    {
        path: '/auth',
        name: 'Auth',
        component: AuthForm,
        children: [
            {
                path: '/register',
                name: 'Register',
                component: Register,
                meta: {
                    redirect: 'Home',
                    title: 'Create an account',
                    subtitle: 'Already have account ?'
                }
            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
                meta: {
                    redirect: 'Home',
                    title: 'Login to your account',
                    subtitle: 'Don\'t have account ?'
                }
            },
        ]
    },

    // CLIENTS
    {
        path: '/client',
        name: 'ClientHome',
        component: ClientHome,
        meta: {
            requiresProvider: false,
        }
    },

    // PROVIDERS
    {
        path: '/provider',
        name: 'ProviderHome',
        component: ProviderHome,
        meta: {
            requiresProvider: true,
        }
    },

    {
        path: '/',
        name: 'Home',
        component: App,
        redirect: store.getters.getUser ? (store.getters.getUser.isProvider ? '/provider' : '/client') : 'Login',
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router