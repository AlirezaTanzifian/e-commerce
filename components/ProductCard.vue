<template>
  <div class="p-2 border w-fit h-fit rounded-md flex flex-col gap-1 hover:shadow-[0_0px_30px_-15px_rgba(0,0,0,0.5)]">
    <img class="w-40 h-40" :src="props.data?.image" alt="product-image">
    <span>{{ shortTitle(props.data?.title) }}</span>
    <span>{{ `${props.data?.price} $` }}</span>
    <div class="flex justify-between items-center mt-4">
      <NuxtLink :to="`/shop/${props.data?.id}`" class="text-sm font-medium text-blue-500">Detail</NuxtLink>
      <AButton size="small">Add to Card</AButton>
    </div>
  </div>
</template>

<script setup lang="ts">

import {shortTitle} from "../utils/shortTitle";
import type {Product} from "~/model/product";

interface Props {
  data: Product
}

const props = withDefaults(defineProps<Props>(), {})


</script>

<style scoped>

</style>