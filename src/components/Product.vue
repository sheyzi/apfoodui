<template>
    <div class="page-wrapper">
        <section class="text-gray-600 body-font overflow-hidden">
            <div class="container px-5 py-10 mx-auto">
                <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt="ecommerce"
                        class="
                            lg:w-1/2
                            w-full
                            lg:h-auto
                            h-64
                            object-cover object-center
                            rounded
                        "
                        :src="product.get_image"
                    />
                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h1
                            class="
                                text-gray-900 text-3xl
                                title-font
                                font-medium
                                mb-1
                            "
                        >
                            {{ product.name }}
                        </h1>
                        <p class="leading-relaxed">
                            {{ product.description }}
                        </p>
                        <div class="flex pt-4">
                            <span
                                class="
                                    title-font
                                    font-medium
                                    text-2xl text-gray-900
                                "
                                >&#8358;{{ product.price }}</span
                            >
                            <div class="flex ml-auto">
                                <input
                                    type="text"
                                    class="
                                        border border-blue-500
                                        rounded rounded-r-none
                                        focus:outline-none
                                        px-2
                                        hidden
                                        md:flex
                                    "
                                    v-model="quantity"
                                />
                                <button
                                    class="
                                        text-white
                                        bg-blue-500
                                        border-0
                                        py-2
                                        px-4
                                        focus:outline-none
                                        hover:bg-blue-600
                                        rounded rounded-l-none
                                    "
                                    @click="addToCart"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'tailwind-toast'

export default {
    name: 'Product',
    data() {
        return {
            quantity: 1,
            product: {},
        }
    },
    mounted() {
        this.getProduct()
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading', true)
            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug

            await axios
                .get(`/api/v1/products/${category_slug}/${product_slug}`)
                .then((res) => {
                    this.product = res.data
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

            document.title = this.product.name + ' | Aunty Paulet Foods'
            this.$store.commit('setIsLoading', false)
        },

        addToCart() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }

            const item = {
                product: this.product,
                quantity: this.quantity,
            }

            this.$store.commit('addToCart', item)
            this.quantity = 1
            toast()
                .success(
                    'Yay!',
                    `${this.product.name} has been added to the cart successfully!`
                )
                .for(3000)
                .from('bottom', 'end')
                .show()
        },
    },
}
</script>
