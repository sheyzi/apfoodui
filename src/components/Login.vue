<template>
    <div class="page-sign-up mt-4 max-w-xl mx-auto px-3">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="text-3xl font-bold md:text-center">Log in</h1>

                <form @submit.prevent="submitForm" class="mt-4">
                    <div class="field">
                        <label class="font-semibold">Username</label>
                        <div class="control">
                            <input
                                type="text"
                                v-model="username"
                                class="
                                    block
                                    border border-blue-300
                                    rounded
                                    w-full
                                    h-9
                                    font-medium
                                    focus:outline-none
                                    focus:ring-2 focus:ring-blue-400
                                    p-5
                                    mt-2
                                "
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label font-semibold">Password</label>
                        <div class="control">
                            <input
                                type="password"
                                v-model="password"
                                class="
                                    block
                                    border border-blue-300
                                    rounded
                                    w-full
                                    h-9
                                    font-medium
                                    focus:outline-none
                                    focus:ring-2 focus:ring-blue-400
                                    p-5
                                    mt-2
                                "
                            />
                        </div>
                    </div>

                    <div
                        class="bg-red-500 text-white rounded p-5 mt-4"
                        v-if="errors.length"
                    >
                        <ul>
                            <li v-for="error in errors" :key="error">
                                - {{ error }}
                            </li>
                        </ul>
                    </div>
                    <div class="field mt-3">
                        <div class="control">
                            <button
                                class="
                                    w-full
                                    bg-blue-500
                                    px-3
                                    py-2
                                    text-white
                                    rounded
                                    hover:bg-blue-600
                                    focus:outline-none
                                "
                            >
                                Login
                            </button>
                        </div>
                    </div>
                    <hr />
                    Or
                    <router-link
                        to="/sign-up"
                        class="text-blue-500 hover:text-blue-600"
                        >Click here</router-link
                    >
                    to sign up
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'tailwind-toast'

export default {
    name: 'Login',
    mounted() {
        document.title = 'Login | Aunty Paulet Foods'
    },
    data() {
        return {
            errors: [],
            username: '',
            password: '',
        }
    },

    mounted() {
        if (this.$store.state.isAuthenticated) {
            this.$router.push({ path: '/my-account' })
            toast()
                .warning('Hey!', 'You are already logged in!')
                .for(3000)
                .from('bottom', 'end')
                .show()
        }
    },

    methods: {
        async submitForm() {
            axios.defaults.headers.common['Authorization'] = ''

            localStorage.removeItem('token')

            const formData = {
                username: this.username,
                password: this.password,
            }
            this.$store.commit('setIsLoading', true)

            await axios
                .post('/api/v1/token/login/', formData)
                .then((res) => {
                    const token = res.data.auth_token

                    this.$store.commit('setToken', token)
                    axios.defaults.headers.common['Authorization'] =
                        'Token ' + token
                    localStorage.setItem('token', token)
                    const toPath = this.$route.query.to || '/cart'
                    this.$router.push(toPath)
                    toast()
                        .success('Yay!', 'Login successful!')
                        .for(3000)
                        .from('bottom', 'end')
                        .show()
                })
                .catch((err) => {
                    this.errors = []
                    if (err.reponse) {
                        for (const property in err.response.data) {
                            this.errors.push(
                                `${property}: ${err.response.data[property]}`
                            )
                        }
                    } else {
                        console.log(err)
                        this.errors.push(
                            'Invalid Credentials. <router-link to="/sign-up">Sign Up Here</router-link>'
                        )
                    }
                })

            this.$store.commit('setIsLoading', false)
        },
    },
}
</script>
