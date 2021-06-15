import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Product from '../components/Product.vue'
import Category from '../components/Category.vue'
import Search from '../components/Search.vue'
import Cart from '../components/Cart.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import MyAccount from '../components/MyAccount.vue'
import Success from '../components/Success.vue'
import Checkout from '../components/Checkout.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home',
    },
    {
        path: '/search',
        component: Search,
        name: 'Search',
    },
    {
        path: '/cart',
        component: Cart,
        name: 'Cart',
    },
    {
        path: '/about/',
        component: About,
        name: 'About',
    },
    {
        path: '/sign-up/',
        component: SignUp,
        name: 'Sign Up',
    },
    {
        path: '/my-account/',
        component: MyAccount,
        name: 'My Account',
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/success/',
        component: Success,
        name: 'Success',
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/cart/checkout/',
        component: Checkout,
        name: 'Checkout',
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/log-in/',
        component: Login,
        name: 'Login',
    },
    {
        path: '/:category_slug/:product_slug/',
        name: 'Product',
        component: Product,
    },
    {
        path: '/:category_slug/',
        name: 'Category',
        component: Category,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
      router.push({'path': 'log-in', query: {to: to.path}})
    } else {
      next()
    }
})

export default router
