<template>
  <div>
    <Header />
    <div class="mt-12 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex flex-col md:w-3/4 gap-4">
          <div
              class="border rounded-md p-4 flex items-center gap-4 md:gap-20"
              v-for="(item, index) in cartStore.list"
              :key="index"
          >
            <img class="w-24 h-32" :src="item.product.image" alt="product-image">
            <div class="w-full flex flex-col md:flex md:flex-row md:justify-evenly md:items-center gap-4">
              <div class="w-full flex flex-col gap-2">
                <span class="text-blue-500 font-bold">{{ item.product.title }}</span>
                <span class="text-green-500 font-semibold">{{ item.product.price }} $</span>
              </div>
              <SteperNumber
                  :min="0"
                  :max="5"
                  :value="item.qty"
                  @change="handleChangeValue($event, item as CartItem)"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col md:w-1/4 gap-4 p-4 border rounded-md h-fit">
          <div class="flex gap-2">
            <span>Total Items :</span>
            <span>{{ totalProduct }}</span>
          </div>
          <div class="flex gap-2">
            <span>Total Payments :</span>
            <span>{{ cartStore.sumCart }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-red-500 cursor-pointer" @click="cartStore.reset()">clear</span>
            <AButton class="bg-blue-500" type="primary" @click="checkOut">Check out</AButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "~/store/cart";
import type {Product} from "~/model/product";
import type {CartItem} from "~/model/cart";

const cartStore = useCartStore()

function handleChangeValue(qty: number, currentProduct: CartItem) {
  const index = cartStore.list.findIndex((item) => item.product.id == currentProduct.product.id)

  if (index !== -1) {
    cartStore.list[index].qty = qty
  }

  if (qty === 0) {
    cartStore.deleteItem(currentProduct.product)
  }
}

const totalProduct = computed(() => {
  let total = 0
  cartStore.list.forEach(item => total+= item.qty)
  return total
})

const checkOut = () => {
  if (cartStore.list.length !== 0) {
    cartStore.reset()
    message.success("Your order has been successfully placed")
    useRouter().push('/')
  }
}

</script>

<style scoped>

</style>