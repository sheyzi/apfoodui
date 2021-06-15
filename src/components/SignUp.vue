<template>
    <div class="page-sign-up mt-4 max-w-xl mx-auto px-3">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="text-3xl font-bold md:text-center">Sign Up</h1>

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
                        <p class="help">
                            Must be atleast 4 characters<strong
                                v-if="usernameLengthPass"
                                class="ml-3 text-green-500"
                                ><i class="fas fa-check"></i
                            ></strong>
                        </p>
                    </div>

                    <div class="field">
                        <label class="font-semibold">Password</label>
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
                        <ul class="help">
                            <li class="help">
                                Must be atleast 8 characters<strong
                                    v-if="CharsCountPass"
                                    class="ml-3 text-green-500"
                                    ><i class="fas fa-check"></i
                                ></strong>
                            </li>
                            <li class="help">
                                Must contain a lowercase letter
                                <strong
                                    v-if="lowerCharsPass"
                                    class="ml-3 text-green-500"
                                    ><i class="fas fa-check"></i
                                ></strong>
                            </li>
                            <li class="help">
                                Must contain an uppercase letter
                                <strong
                                    v-if="uperCharsPass"
                                    class="ml-3 text-green-500"
                                    ><i class="fas fa-check"></i
                                ></strong>
                            </li>
                            <li class="help">
                                Must contain a number
                                <strong
                                    v-if="numberCharsPass"
                                    class="text-green-500"
                                    ><i class="fas fa-check"></i
                                ></strong>
                            </li>
                        </ul>
                    </div>

                    <div class="field">
                        <label class="font-semibold">Repeat Password</label>
                        <div class="control">
                            <input
                                type="password"
                                v-model="password2"
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
                        <p class="help">
                            Must be equal with the password field
                            <strong
                                v-if="passwordMatchPass"
                                class="ml-3 text-green-500"
                                ><i class="fas fa-check"></i
                            ></strong>
                        </p>
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
                    <div class="field mt-4">
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
                                Sign Up
                            </button>
                        </div>
                    </div>
                    <hr />
                    Or
                    <router-link
                        to="/log-in"
                        class="text-blue-500 hover:text-blue-600"
                        >Click here</router-link
                    >
                    to login
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            errors: [],
        }
    },

    computed: {
        formPass() {
            var status = false
            if (
                this.lowerCharsPass &&
                this.uperCharsPass &&
                this.numberCharsPass &&
                this.CharsCountPass &&
                this.usernameLengthPass
            ) {
                status = true
            }
            return status
        },

        lowerCharsPass() {
            var lowerCaseLetters = /[a-z]/g
            var status = false
            if (this.password.match(lowerCaseLetters)) {
                status = true
            }

            return status
        },

        CharsCountPass() {
            var status = false
            if (this.password.length >= 8) {
                status = true
            }

            return status
        },

        uperCharsPass() {
            var status = false
            var upperCaseLetters = /[A-Z]/g

            if (this.password.match(upperCaseLetters)) {
                status = true
            }
            return status
        },

        numberCharsPass() {
            var status = false
            var numbers = /[0-9]/g

            if (this.password.match(numbers)) {
                status = true
            }
            return status
        },

        passwordMatchPass() {
            var status = false
            if (this.password === this.password2 && this.password2.length > 4) {
                status = true
            }
            return status
        },

        usernameLengthPass() {
            var status = false
            if (this.username.length >= 4) {
                status = true
            }
            return status
        },
    },
    methods: {
        async submitForm() {
            this.errors = []
            if (!this.formPass) {
                this.errors.push(
                    "The form didn't pass the validation test. Please make sure all help text are ticked"
                )
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password,
                }

                this.$store.commit('setIsLoading', true)

                await axios
                    .post('/api/v1/users/', formData)
                    .then((response) => {
                        this.$router.push('/login')
                    })
                    .catch((error) => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(
                                    `${property}: ${error.response.data[property]}`
                                )
                            }
                        } else {
                            this.errors.push(
                                'Something went wrong. Please try again'
                            )

                            console.log(JSON.stringify(error))
                        }
                    })

                this.$store.commit('setIsLoading', false)
            }
        },
    },

    mounted() {
        document.title = 'Sign Up | Aunty Paulet Restaurant'
    },
}
</script>
