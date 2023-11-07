<template>
  <div class="p-2 border w-fit h-fit rounded-md flex flex-col gap-1 hover:shadow-[0_0px_30px_-15px_rgba(0,0,0,0.5)]">
    <img class="w-40 h-40" :src="props.product?.image" alt="product-image">
    <span>{{ shortTitle(props.product?.title) }}</span>
    <span class="text-green-500 font-medium">{{ `${props.product?.price} $` }}</span>
    <div class="flex justify-between items-center mt-4">
      <NuxtLink :to="`/shop/${props.product?.id}`" class="text-sm font-medium text-blue-500">Detail</NuxtLink>
      <AButton size="small" @click="cartStore.addProduct(props.product, 1)" v-if="!isAddedProduct">
        Add to Card
      </AButton>
      <div class="w-20" v-else>
        <SteperNumber
            class="w-full"
            :min="0"
            :max="5"
            :value="getCount(_product)"
            @change="handleChangeValue($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {shortTitle} from "~/utils/shortTitle";
import type {Product} from "~/model/product";
import {useCartStore} from "~/store/cart";

const cartStore = useCartStore()

interface Props {
  product: Product
}

const props = withDefaults(defineProps<Props>(), {})

const _product = computed(() => {
  return props.product
})

const isAddedProduct = computed(() => {
  const temp = cartStore.list.find((item) => item.product.id == _product.value.id)
  let isAdd = false
  if (temp) {
    isAdd = temp.qty > 0 ? true : false
  }
  return isAdd
})

function getCount(product: Product) {
  // const temp = selectedVariants.value.find((item) => item.variant.id == variant.id)
  const temp = cartStore.list.find((item) => item.product.id == product.id)
  if (temp) return temp.qty
  return 0
}

function handleChangeValue(qty: number) {
  const index = cartStore.list.findIndex((item) => item.product.id == _product.value.id)

  if (index !== -1) {
    cartStore.list[index].qty = qty
  }

  if (qty === 0) {
    cartStore.deleteItem(_product.value)
  }
}

</script>

<style scoped>

</style>