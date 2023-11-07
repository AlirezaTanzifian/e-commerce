<template>
  <div class="flex justify-between items-center px-4 md:rounded-md bg-white shadow-md fixed top-0 left-0 right-0 w-full z-10">
    <AMenu class="w-[200px]" mode="horizontal">
      <AMenuItem
          v-for="item in menu"
          :key="item.key"
          :selectedKeys="selectedMenu"
      >
        <router-link :to="item.key">{{ item.title }}</router-link>
      </AMenuItem>
    </AMenu>
    <div class="flex items-center">
      <ABadge size="small" :count="cartStore.count">
        <img src="~/assets/img/basket.svg" alt="basket-icon" @click="router.push('/basket')" >
      </ABadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "~/store/cart";

const selectedMenu = ref([])

const cartStore = useCartStore()

const menu = ref([
  {
    title: 'Home',
    key: '/'
  },
  {
    title: 'Shop',
    key: 'shop'
  }
])

const router = useRouter()

</script>

<style scoped>

</style>