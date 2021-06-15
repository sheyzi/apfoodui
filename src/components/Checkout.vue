<template>
    <div class="page-checkout mt-2 px-2">
        <h1 class="text-3xl my-4 font-bold text-center">Checkout</h1>

        <table
            v-if="cart.item.length"
            class="w-full text-sm lg:text-base"
            cellspacing="0"
        >
            <thead>
                <tr class="h-12 uppercase">
                    <th class="hidden md:table-cell"></th>
                    <th class="text-left">Product</th>
                    <th class="lg:text-right text-left pl-5 lg:pl-0">
                        <span class="lg:hidden" title="Quantity">Qtd</span>
                        <span class="hidden lg:inline">Quantity</span>
                    </th>
                    <th class="hidden text-right md:table-cell">Unit price</th>
                    <th class="text-right">Total price</th>
                </tr>
            </thead>
            <tbody>
                <CartItem
                    v-for="item in cart.item"
                    :key="item.product.id"
                    :initializeItem="item"
                    v-on:remove-from-cart="removeFromCart"
                />
            </tbody>
        </table>
        <div class="flex justify-between font-semibold text-xl py-6 md:px-10">
            <p>Total:</p>
            <p>&#8358;{{ cartTotalPrice.toFixed(2) }}</p>
        </div>

        <div class="md:mx-10 mx-4">
            <h2 class="text-xl text-center font-semibold">Shipping details</h2>

            <div class="max-w-3xl mx-auto">
                <p class="text-red-500 mb-4">* All fields are required</p>
                <div class="column is-6">
                    <div class="field">
                        <label class="font-semibold"
                            >First name<span class="text-red-500"
                                >*</span
                            ></label
                        >
                        <div class="control">
                            <input
                                type="text"
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
                                v-model="first_name"
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="font-semibold"
                            >Last name<span class="text-red-500">*</span></label
                        >
                        <div class="control">
                            <input
                                type="text"
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
                                v-model="last_name"
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="font-semibold"
                            >E-mail<span class="text-red-500">*</span></label
                        >
                        <div class="control">
                            <input
                                type="email"
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
                                v-model="email"
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="font-semibold"
                            >Phone<span class="text-red-500">*</span></label
                        >
                        <div class="control">
                            <input
                                type="text"
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
                                v-model="phone"
                            />
                        </div>
                    </div>
                </div>

                <div class="column is-6">
                    <div class="field">
                        <label class="font-semibold"
                            >Address<span class="text-red-500">*</span></label
                        >
                        <div class="control">
                            <input
                                type="text"
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
                                v-model="address"
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="font-semibold"
                            >Place<span class="text-red-500">*</span></label
                        >
                        <div class="control">
                            <input
                                type="text"
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
                                v-model="place"
                            />
                        </div>
                    </div>
                </div>

                <div
                    class="bg-red-500 text-white rounded p-5 mt-4"
                    v-if="errors.length"
                >
                    <p
                        v-for="error in errors"
                        class="text-center"
                        v-bind:key="error"
                    >
                        {{ error }}
                    </p>
                </div>
                <div v-if="cartTotalLength">
                    <hr />

                    <button
                        class="
                            bg-yellow-500
                            py-2
                            md:w-full
                            px-3
                            mt-4
                            focus:outline-none
                            hover:bg-yellow-600
                            rounded
                            text-white
                        "
                        @click="makePayment"
                    >
                        <strong>Pay with FlutterWave</strong>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'tailwind-toast'
import CartItem from './CartItem.vue'
export default {
    name: 'Checkout',
    components: {
        CartItem,
    },
    data() {
        return {
            cart: {
                item: [],
            },
            card: {},
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            place: '',
            errors: [],
            isProduction: true,
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price + 500
        },
        makePayment() {
            this.errors = []
            if (this.first_name === '') {
                this.errors.push('The first name field is missing!')
            }
            if (this.last_name === '') {
                this.errors.push('The last name field is missing!')
            }
            if (this.email === '') {
                this.errors.push('The email field is missing!')
            }
            if (this.phone === '') {
                this.errors.push('The phone field is missing!')
            }
            if (this.address === '') {
                this.errors.push('The address field is missing!')
            }
            if (this.place === '') {
                this.errors.push('The place field is missing!')
            }

            if (!this.errors.length) {
                window.FlutterwaveCheckout({
                    public_key:
                        'FLWPUBK_TEST-a9320167bc40ceaa5d67df7126dfb85b-X',
                    tx_ref: this.reference,
                    amount: this.cartTotalPrice + 500.0,
                    currency: 'NGN',
                    payment_options: 'card',
                    customer: {
                        name: this.first_name,
                        email: this.email,
                    },
                    callback: (response) => this.paid(response),
                    onclose: function () {
                        toast()
                            .danger(
                                'Hey!',
                                "Unfortunately the payment wasn't successful!"
                            )
                            .for(3000)
                            .from('bottom', 'end')
                            .show()
                    },
                    customizations: {
                        title: 'ApFoods',
                        description: 'Payment for items in cart',
                    },
                })
            }
        },
        paid(response) {
            const items = []

            for (let i = 0; i < this.cart.item.length; i++) {
                const item = this.cart.item[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price * item.quantity,
                }

                items.push(obj)
            }

            const data = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                address: this.address,
                phone: this.phone,
                place: this.place,
                items: items,
            }

            axios
                .post('/api/v1/checkout/', data)
                .then((res) => {
                    this.$store.commit('clearCart')
                    window.location.replace(
                        'https://apfoods.herokuapp.com/success'
                    )
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

                    console.log(err)
                })
        },
    },
    computed: {
        cartTotalPrice() {
            return (
                this.cart.item.reduce((acc, curVal) => {
                    return (acc += curVal.product.price * curVal.quantity)
                }, 0) + 500.0
            )
        },
        cartTotalLength() {
            return this.cart.item.reduce((acc, curVal) => {
                return (acc += curVal.quantity)
            }, 0)
        },
        reference() {
            let text = ''
            let possible =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for (let i = 0; i < 10; i++)
                text += possible.charAt(
                    Math.floor(Math.random() * possible.length)
                )
            return text
        },
    },

    mounted() {
        document.title = 'Checkout | Aunty Paulet Foods'
        this.cart = this.$store.state.cart

        if (!this.$store.state.cart.item.length) {
            this.$router.push({ path: '/cart' })
            toast()
                .danger(
                    'Hey!',
                    "You can't checkout with an empty cart, Please add a product to your cart to continue!!"
                )
                .for(3000)
                .from('bottom', 'end')
                .show()
        }
    },
    created() {
        const script = document.createElement('script')
        script.src = !this.isProduction
            ? 'https://ravemodal-dev.herokuapp.com/v3.js'
            : 'https://checkout.flutterwave.com/v3.js'
        document.getElementsByTagName('head')[0].appendChild(script)
    },
}
</script>
