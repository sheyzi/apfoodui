<template>
    <div class="page-search px-10">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="mt-4 text-3xl md:text-center font-bold">
                    Search result for {{ query }}
                </h2>
            </div>

            <ProductBox v-if="products.length === 1" :products="products">
            </ProductBox>
            <h5 v-else class="md:text-center mt-3 text-xl">
                No product found for {{ query }}
            </h5>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProductBox from './ProductBox.vue'
import { toast } from 'tailwind-toast'
export default {
    name: 'Search',
    data() {
        return {
            products: [],
            query: '',
        }
    },
    components: {
        ProductBox,
    },
    mounted() {
        document.title = 'Search | Aunty Paulet Foods'
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)

        if (params.get('query')) {
            this.query = params.get('query')
            this.performSearch()
        }
    },
    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true)
            await axios
                .post('/api/v1/products/search/', { query: this.query })
                .then((res) => {
                    this.products = res.data
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
