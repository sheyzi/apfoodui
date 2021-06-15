<template>
    <div class="app-wrapper antialiased text-gray-700">
        <nav class="bg-gray-100">
            <div
                class="
                    max-w-5xl
                    items-center
                    py-5
                    mx-auto
                    justify-between
                    flex
                    px-10
                "
            >
                <!-- Primary Menu Here  -->
                <div class="">
                    <!-- Desktop Primary menu  -->
                    <div class="hidden md:flex items-center space-x-2">
                        <router-link
                            v-for="category in categories"
                            :key="category.id"
                            :to="category.get_absolute_url"
                            class="pr-4 font-semibold hover:text-black"
                            >{{ category.name }}</router-link
                        >
                    </div>

                    <!-- Mobile Primary Menu Toggler  -->
                    <div class="md:hidden">
                        <button
                            class="
                                px-5
                                py-3
                                mobile-toggler
                                focus:outline-none
                                hover:text-black
                            "
                            @click="close_mobile_menu = !close_mobile_menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Store Logo  -->
                <div class="">
                    <router-link
                        class="flex items-center space-x-4 hover:text-gray-900"
                        to="/"
                        ><svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width="48.8px"
                            height="52px"
                            viewBox="0 0 48.8 52"
                            enable-background="new 0 0 48.8 52"
                            xml:space="preserve"
                        >
                            <defs></defs>
                            <g>
                                <path
                                    fill="none"
                                    stroke="#1E262C"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-miterlimit="10"
                                    d="M30.7,45.6

		c9.6-2.7,16.6-11.3,17-21.2c0-0.5-0.4-0.9-0.9-0.9h-45c-0.5,0-0.9,0.4-0.9,0.9c0.4,9.9,7.5,18.5,17,21.2"
                                />
                                <line
                                    fill="none"
                                    stroke="#1E262C"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-miterlimit="10"
                                    x1="24.8"
                                    y1="19.6"
                                    x2="35"
                                    y2="1"
                                />
                                <line
                                    fill="none"
                                    stroke="#1E262C"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-miterlimit="10"
                                    x1="29.3"
                                    y1="19.6"
                                    x2="45.2"
                                    y2="6.7"
                                />
                                <path
                                    fill="none"
                                    stroke="#1E262C"
                                    stroke-width="3"
                                    stroke-miterlimit="10"
                                    d="M30.6,50.5H18.2c-1.2,0-2.2-1-2.2-2.2v-0.1

		c0-1.2,1-2.2,2.2-2.2h12.4c1.2,0,2.2,1,2.2,2.2v0.1C32.8,49.5,31.8,50.5,30.6,50.5z"
                                />
                            </g>
                        </svg>
                        <span class="text-xl hidden md:flex font-bold"
                            >ApFoods</span
                        ></router-link
                    >
                </div>
                <!-- Secondary menu here  -->
                <div class="flex space-x-4">
                    <button
                        @click="close_search_toggle = !close_search_toggle"
                        class="
                            focus:outline-none
                            hidden
                            md:flex
                            items-center
                            px-3
                            py-1
                        "
                    >
                        <i class="fas fa-search"></i>
                    </button>
                    <router-link to="/cart" class="flex items-center"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            /></svg
                        ><span
                            class="
                                rounded-full
                                hover:bg-red-700
                                text-sm
                                bg-red-600
                                px-2
                                font-bold
                                text-white
                            "
                            >{{ cartTotalLength }}</span
                        ></router-link
                    >
                    <router-link
                        v-if="this.$store.state.isAuthenticated"
                        to="/my-account"
                        class="
                            hidden
                            md:flex
                            py-2
                            px-3
                            bg-blue-400
                            hover:bg-blue-500
                            rounded-lg
                            text-white
                            font-bold
                        "
                        >My Account</router-link
                    >
                    <router-link
                        v-else
                        to="/log-in"
                        class="
                            hidden
                            md:flex
                            py-2
                            px-3
                            bg-blue-400
                            hover:bg-blue-500
                            rounded-lg
                            text-white
                            font-bold
                        "
                        >Login</router-link
                    >
                </div>
            </div>
            <!-- Primary menu mobile  -->
            <div
                :class="{ hidden: close_mobile_menu }"
                class="md:hidden px-20 pb-5 mobile-menu font-semibold"
            >
                <form action="/search" class="mb-2" method="get">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                        class="
                            block
                            border border-blue-300
                            rounded-full
                            w-full
                            h-9
                            font-medium
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-400
                            p-5
                            mt-2
                        "
                    />
                </form>
                <router-link
                    v-for="category in categories"
                    :key="category.id"
                    :to="category.get_absolute_url"
                    class="block mb-5"
                    >{{ category.name }}</router-link
                >
                <router-link
                    v-if="this.$store.state.isAuthenticated"
                    to="/my-account"
                    class="
                        w-full
                        bg-blue-500
                        px-3
                        py-2
                        text-white
                        rounded
                        hover:bg-blue-600
                        mb-5
                    "
                    >My Account</router-link
                >
                <router-link
                    v-else
                    to="/log-in"
                    class="
                        w-full
                        bg-blue-500
                        px-3
                        py-2
                        text-white
                        rounded
                        hover:bg-blue-600
                    "
                    >Login</router-link
                >
            </div>

            <!-- Search Toggle  -->
            <div
                class="py-2 px-10 invisible md:visible"
                :class="{ hidden: close_search_toggle }"
            >
                <form
                    action="/search"
                    class="flex justify-between space-x-4"
                    method="get"
                >
                    <input
                        type="text"
                        name="query"
                        class="
                            border border-blue-300
                            rounded-full
                            w-full
                            h-9
                            font-medium
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-400
                            p-5
                            mt-2
                        "
                    />
                    <button
                        type="submit"
                        class="bg-blue-500 px-3 rounded-full text-white"
                    >
                        Search
                    </button>
                </form>
            </div>
        </nav>
        <router-view />
        <!-- Footer Section  -->
        <footer class="text-gray-600 body-font">
            <div
                class="
                    container
                    px-5
                    py-8
                    mx-auto
                    flex
                    items-center
                    sm:flex-row
                    flex-col
                "
            >
                <a
                    class="
                        flex
                        title-font
                        font-medium
                        items-center
                        md:justify-start
                        justify-center
                        text-gray-900
                    "
                >
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="48.8px"
                        height="52px"
                        viewBox="0 0 48.8 52"
                        enable-background="new 0 0 48.8 52"
                        xml:space="preserve"
                    >
                        <defs></defs>
                        <g>
                            <path
                                fill="none"
                                stroke="#1E262C"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-miterlimit="10"
                                d="M30.7,45.6

		c9.6-2.7,16.6-11.3,17-21.2c0-0.5-0.4-0.9-0.9-0.9h-45c-0.5,0-0.9,0.4-0.9,0.9c0.4,9.9,7.5,18.5,17,21.2"
                            />
                            <line
                                fill="none"
                                stroke="#1E262C"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-miterlimit="10"
                                x1="24.8"
                                y1="19.6"
                                x2="35"
                                y2="1"
                            />
                            <line
                                fill="none"
                                stroke="#1E262C"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-miterlimit="10"
                                x1="29.3"
                                y1="19.6"
                                x2="45.2"
                                y2="6.7"
                            />
                            <path
                                fill="none"
                                stroke="#1E262C"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                d="M30.6,50.5H18.2c-1.2,0-2.2-1-2.2-2.2v-0.1

		c0-1.2,1-2.2,2.2-2.2h12.4c1.2,0,2.2,1,2.2,2.2v0.1C32.8,49.5,31.8,50.5,30.6,50.5z"
                            />
                        </g>
                    </svg>
                    <span class="ml-3 text-xl font-bold">ApFoods</span>
                </a>
                <p
                    class="
                        text-sm text-gray-500
                        sm:ml-4
                        sm:pl-4
                        sm:border-l-2 sm:border-gray-200
                        sm:py-2
                        sm:mt-0
                        mt-4
                    "
                >
                    © 2021 ApFoods —
                    <a
                        href="#"
                        class="text-gray-600 ml-1"
                        rel="noopener noreferrer"
                        target="_blank"
                        >@ApFoods</a
                    >
                </p>
                <span
                    class="
                        inline-flex
                        sm:ml-auto
                        sm:mt-0
                        mt-4
                        justify-center
                        sm:justify-start
                    "
                >
                    <!-- Facebook Social  -->
                    <a class="text-gray-500">
                        <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                            ></path>
                        </svg>
                    </a>
                    <!-- Instagram Social  -->
                    <a class="ml-3 text-gray-500">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <rect
                                width="20"
                                height="20"
                                x="2"
                                y="2"
                                rx="5"
                                ry="5"
                            ></rect>
                            <path
                                d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                            ></path>
                        </svg>
                    </a>
                </span>
            </div>
        </footer>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'tailwind-toast'
export default {
    name: 'App',
    data() {
        return {
            showMobileMenu: false,
            cart: {
                item: [],
            },
            categories: [],
            close_mobile_menu: true,
            close_search_toggle: true,
        }
    },
    beforeCreate() {
        this.$store.commit('initializeStore')
        const token = this.$store.state.token
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Token ' + token
        } else {
            axios.defaults.headers.common['Authorization'] = ''
        }
    },
    computed: {
        cartTotalLength() {
            let totalLength = 0

            for (let i = 0; i < this.cart.item.length; i++) {
                totalLength += this.cart.item[i].quantity
            }
            return totalLength
        },

        loading() {
            return this.$store.state.isLoading
        },
    },
    mounted() {
        this.cart = this.$store.state.cart
        this.getCategory()
    },
    methods: {
        async getCategory() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/category-list/')
                .then((res) => {
                    this.categories = res.data
                })
                .catch((err) => {
                    toast()
                        .danger(
                            'Hey!',
                            'There was a minor error! Please refresh the page!'
                        )
                        .for(3000)
                        .from('bottom', 'end')
                        .show()
                })

            this.$store.commit('setIsLoading', false)
        },
    },
}
</script>
