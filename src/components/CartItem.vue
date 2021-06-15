<template>
    <tr>
        <td class="hidden pb-4 md:table-cell">
            <img
                :src="item.product.get_image"
                class="w-20 rounded"
                alt="Thumbnail"
            />
        </td>
        <td>
            <a href="#">
                <p class="mb-2 md:ml-4">
                    {{ item.product.name }}
                </p>
                <form v-if="removable" action="" method="POST">
                    <button
                        type="submit"
                        v-on:click="removeFromCart(item)"
                        class="text-gray-700 md:ml-4"
                    >
                        <small>(Remove item)</small>
                    </button>
                </form>
            </a>
        </td>
        <td class="justify-center pl-3 md:justify-end md:flex mt-6">
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
                    <button
                        v-if="removable"
                        @click="decrementQuantity(item)"
                        class="text-red-500 focus:outline-none"
                    >
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <button
                        v-if="removable"
                        @click="incrementQuantity(item)"
                        class="text-green-500 focus:outline-none"
                    >
                        <i class="fas fa-arrow-up"></i>
                    </button>
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
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initializeItem: Object,
        removability: Boolean,
    },
    data() {
        return {
            item: this.initializeItem,
            removable: this.removability,
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        decrementQuantity(item) {
            item.quantity -= 1
            if (item.quantity === 0) {
                this.$emit('remove-from-cart', item)
            }
            this.updateCart()
        },
        incrementQuantity(item) {
            item.quantity += 1
            this.updateCart()
        },
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item) {
            this.$emit('remove-from-cart', item)
            this.updateCart()
        },
    },
}
</script>
