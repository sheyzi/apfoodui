<template>
    <div class="page-my-account px-5 max-w-3xl mx-auto">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="text-3xl text-center font-bold mt-4">My account</h1>
            </div>
            <div class="column is-12">
                <h2 class="text-2xl font-semibold">My orders</h2>

                <table
                    v-for="order in orders"
                    :key="order.id"
                    class="w-full text-sm lg:text-base"
                >
                    <thead>
                        <tr class="h-12 uppercase">
                            <th class="hidden md:table-cell"></th>
                            <th class="text-left">Product</th>
                            <th class="lg:text-right text-left pl-5 lg:pl-0">
                                <span class="lg:hidden" title="Quantity"
                                    >Qtd</span
                                >
                                <span class="hidden lg:inline">Quantity</span>
                            </th>
                            <th class="hidden text-right md:table-cell">
                                Unit price
                            </th>
                            <th class="text-right">Total price</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="item in order.items"
                            v-bind:key="item.product.id"
                        >
                            <td>
                                <p class="mb-2 md:ml-4">
                                    {{ item.product.name }}
                                </p>
                            </td>
                            <td
                                class="
                                    justify-center
                                    pl-3
                                    md:justify-end
                                    md:flex
                                    mt-6
                                "
                            >
                                <div class="w-20 h-10">
                                    <div
                                        class="
                                            relative
                                            items-center
                                            space-x-2
                                            flex flex-row
                                            w-full
                                            h-8
                                        "
                                    >
                                        <p>{{ item.quantity }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="hidden text-right md:table-cell">
                                <span class="text-sm lg:text-base font-medium">
                                    &#8358;{{ item.product.price }}
                                </span>
                            </td>
                            <td class="text-right">
                                <span class="text-sm lg:text-base font-medium">
                                    &#8358;{{ getItemTotal(item).toFixed(2) }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-5">
                <button
                    @click="logout()"
                    class="
                        bg-red-500
                        focus:outline-none
                        rounded
                        px-3
                        py-2
                        text-white
                    "
                >
                    Log out
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MyAccount',
    data() {
        return {
            orders: [],
        }
    },
    mounted() {
        axios
            .get('/api/v1/orders')
            .then((res) => {
                this.orders = res.data
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    methods: {
        logout() {
            axios.defaults.headers.common['Authorization'] = ''

            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('userid')

            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
    },
}
</script>
