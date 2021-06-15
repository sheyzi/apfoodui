<template>
    <div
        v-for="product in products"
        :key="product.id"
        class="lg:w-1/4 md:w-1/2 p-4 w-full"
    >
        <router-link
            :to="product.get_absolute_url"
            class="block relative h-48 rounded overflow-hidden"
        >
            <img
                alt="ecommerce"
                class="object-cover object-center w-full h-full block"
                :src="product.get_thumbnail"
            />
        </router-link>
        <div class="mt-4">
            <h2 class="text-gray-900 title-font text-lg font-medium">
                {{ product.name }}
            </h2>
            <p class="mt-1">&#8358;{{ product.price }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        products: Object,
    },
}
</script>
