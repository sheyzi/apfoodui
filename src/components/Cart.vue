<template>
    <div class="page-cart">
        <!-- component -->
        <div class="flex justify-center my-6">
            <div
                class="
                    flex flex-col
                    w-full
                    p-8
                    text-gray-800
                    bg-white
                    shadow-lg
                    pin-r pin-y
                    md:w-4/5
                    lg:w-4/5
                "
            >
                <div class="flex-1">
                    <table
                        v-if="cart.item.length"
                        class="w-full text-sm lg:text-base"
                        cellspacing="0"
                    >
                        <thead>
                            <tr class="h-12 uppercase">
                                <th class="hidden md:table-cell"></th>
                                <th class="text-left">Product</th>
                                <th
                                    class="lg:text-right text-left pl-5 lg:pl-0"
                                >
                                    <span class="lg:hidden" title="Quantity"
                                        >Qtd</span
                                    >
                                    <span class="hidden lg:inline"
                                        >Quantity</span
                                    >
                                </th>
                                <th class="hidden text-right md:table-cell">
                                    Unit price
                                </th>
                                <th class="text-right">Total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CartItem
                                v-for="item in cart.item"
                                :key="item.product.id"
                                :initializeItem="item"
                                removability="true"
                                v-on:remove-from-cart="removeFromCart"
                            />
                        </tbody>
                    </table>
                    <div v-else class="flex justify-between items-center">
                        <p class="text-xl font-semibold">
                            Your cart is empty!!
                        </p>
                        <button class="">
                            <i class="fas animate-pulse fa-arrow-left"></i>
                            Continue shopping
                        </button>
                    </div>
                    <hr class="pb-6 mt-6" />
                    <div class="my-4 mt-6 -mx-2 lg:flex">
                        <div class="lg:px-2 lg:w-1/2">
                            <div class="p-4 mt-6 bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">
                                    Instruction for seller
                                </h1>
                            </div>
                            <div class="p-4">
                                <p class="mb-4 italic">
                                    If you have some information for the seller
                                    you can leave them in the box below
                                </p>
                                <textarea
                                    class="w-full h-24 p-2 bg-gray-100 rounded"
                                ></textarea>
                            </div>
                        </div>
                        <div class="lg:px-2 lg:w-1/2">
                            <div class="p-4 bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">
                                    Order Details
                                </h1>
                            </div>
                            <div class="p-4">
                                <p class="mb-6 italic">
                                    Shipping and additionnal costs are
                                    calculated based on values you have entered
                                </p>
                                <div class="flex justify-between border-b">
                                    <div
                                        class="
                                            lg:px-4
                                            lg:py-2
                                            m-2
                                            text-lg
                                            lg:text-xl
                                            font-bold
                                            text-center text-gray-800
                                        "
                                    >
                                        Shipping Fee
                                    </div>
                                    <div
                                        class="
                                            lg:px-4
                                            lg:py-2
                                            m-2
                                            lg:text-lg
                                            font-bold
                                            text-center text-gray-900
                                        "
                                    >
                                        &#8358;500.00
                                    </div>
                                </div>
                                <div class="flex justify-between border-b">
                                    <div
                                        class="
                                            lg:px-4
                                            lg:py-2
                                            m-2
                                            text-lg
                                            lg:text-xl
                                            font-bold
                                            text-center text-gray-800
                                        "
                                    >
                                        Total
                                    </div>
                                    <div
                                        class="
                                            lg:px-4
                                            lg:py-2
                                            m-2
                                            lg:text-lg
                                            font-bold
                                            text-center text-gray-900
                                        "
                                    >
                                        &#8358;{{ cartTotalPrice.toFixed(2) }}
                                    </div>
                                </div>

                                <router-link to="/cart/checkout">
                                    <button
                                        class="
                                            flex
                                            justify-center
                                            w-full
                                            px-10
                                            py-3
                                            mt-6
                                            font-medium
                                            text-white
                                            uppercase
                                            bg-gray-800
                                            rounded-full
                                            shadow
                                            item-center
                                            hover:bg-gray-700
                                            focus:shadow-outline
                                            focus:outline-none
                                        "
                                    >
                                        <svg
                                            aria-hidden="true"
                                            data-prefix="far"
                                            data-icon="credit-card"
                                            class="w-8"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                                            />
                                        </svg>
                                        <span class="ml-2 mt-5px"
                                            >Procceed to checkout</span
                                        >
                                    </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CartItem from './CartItem.vue'

export default {
    name: 'Cart',
    data() {
        return {
            cart: {
                item: [],
            },
        }
    },
    components: {
        CartItem,
    },
    mounted() {
        this.cart = this.$store.state.cart
        document.title = 'Cart | Aunty Paulet Foods'
    },
    methods: {
        removeFromCart(item) {
            this.cart.item = this.cart.item.filter(
                (i) => i.product.id !== item.product.id
            )
        },
    },
    computed: {
        cartTotalLength() {
            return this.cart.item.reduce((acc, curVal) => {
                return (acc += curVal.quantity)
            }, 0)
        },
        cartTotalPrice() {
            return (
                this.cart.item.reduce((acc, curVal) => {
                    return (acc += curVal.product.price * curVal.quantity)
                }, 0) + 500.0
            )
        },
    },
}
</script>
