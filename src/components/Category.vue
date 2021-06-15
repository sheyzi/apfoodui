<template>
    <div class="category-wrapper">
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
                    {{ category.name }}
                </h1>
                <div class="flex flex-wrap -m-4">
                    <ProductBox :products="category.products" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import ProductBox from './ProductBox.vue'
import { toast } from 'tailwind-toast'
import Product from './Product.vue'
export default {
    name: 'Product',
    data() {
        return {
            category: [],
        }
    },
    mounted() {
        this.getCategory()
    },
    watch: {
        $route(to, from) {
            if (to.name === 'Category') {
                this.getCategory()
            }
        },
    },
    methods: {
        async getCategory() {
            const category_slug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/api/v1/products/${category_slug}`)
                .then((res) => {
                    this.category = res.data
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
            document.title = this.category.name + ' | Aunty Paulet Foods'
            this.$store.commit('setIsLoading', false)
        },
    },
    components: {
        ProductBox,
    },
}
</script>
