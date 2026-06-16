import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './components/Homepage.vue'
import Signin from './components/Signin.vue'

const routes = [
    {
        path: '/',
        component: Homepage
    },
    {
        path: '/signin',
        component: Signin
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
