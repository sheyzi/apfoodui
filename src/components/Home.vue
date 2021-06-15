<template>
    <div class="home-wrapper">
        <!-- Hero Section  -->
        <section class="text-gray-600 body-font">
            <div
                class="
                    container
                    mx-auto
                    flex
                    px-5
                    py-10
                    md:flex-row
                    flex-col
                    items-center
                "
            >
                <div
                    class="
                        lg:flex-grow
                        md:w-1/2
                        lg:pr-24
                        md:pr-16
                        flex flex-col
                        md:items-start
                        md:text-left
                        mb-16
                        md:mb-0
                        items-center
                        text-center
                    "
                >
                    <h1
                        class="
                            title-font
                            sm:text-4xl
                            text-3xl
                            mb-4
                            font-medium
                            text-gray-900
                        "
                    >
                        Before they get sold out
                        <br class="hidden lg:inline-block" />
                        {{ hero_product.name }}
                    </h1>
                    <p class="mb-8 leading-relaxed">
                        {{ hero_product.description }}
                    </p>
                    <div class="flex justify-center">
                        <router-link
                            :to="hero_link"
                            class="
                                inline-flex
                                text-white
                                bg-blue-500
                                border-0
                                py-2
                                px-6
                                focus:outline-none
                                hover:bg-blue-600
                                rounded
                                text-lg
                            "
                        >
                            Order Now
                        </router-link>
                    </div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img
                        class="object-cover object-center rounded"
                        alt="hero"
                        :src="hero_product.get_image"
                    />
                </div>
            </div>
        </section>

        <!-- Featured Products Here  -->
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-10 mx-auto">
                <h1
                    class="
                        text-center
                        pb-5
                        md:text-5xl
                        md:pb-8
                        text-3xl
                        font-semibold
                    "
                >
                    Featured Products
                </h1>
                <div class="flex flex-wrap -m-4">
                    <ProductBox :products="featuredProducts" />
                </div>
            </div>
        </section>

        <!-- Latest Product  -->
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-10 mx-auto">
                <h1
                    class="
                        text-center
                        pb-5
                        md:text-5xl
                        md:pb-8
                        text-3xl
                        font-semibold
                    "
                >
                    Latest Products
                </h1>
                <div class="flex flex-wrap -m-4">
                    <ProductBox :products="latestProducts" />
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
import ProductBox from './ProductBox.vue'
export default {
    name: 'Home',
    data() {
        return {
            featuredProducts: [],
            latestProducts: [],
            hero_product: {},
            hero_link: '',
        }
    },
    mounted() {
        this.getProducts()
        axios
            .get('/api/v1/get-hero')
            .then((res) => {
                this.hero_product = res.data
                this.hero_link = res.data.get_absolute_url
            })
            .catch((err) => {
                console.log(err)
            })
        document.title = 'Home | Aunty Paulet Foods'
    },
    methods: {
        async getProducts() {
            this.$store.commit('setIsLoading', true)
            await axios
                .get('/api/v1/featured-products/')
                .then((res) => {
                    this.featuredProducts = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
            await axios
                .get('/api/v1/latest-products/')
                .then((res) => {
                    this.latestProducts = res.data
                })
                .catch((err) => {
                    console.log(err)
                })

            this.$store.commit('setIsLoading', false)
        },
    },
    computed: {},
    components: {
        ProductBox,
    },
}
</script>

<style scoped></style>
