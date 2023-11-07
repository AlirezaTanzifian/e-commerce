<template>
  <div>
    <Header />
    <div class="mt-12 p-4">
      <h1 class="text-2xl font-bold text-center">Welcome to your Shop</h1>
      <div class="font-medium text-center mt-10">
        You can order any product you want and get it delivered to your door as soon as possible
      </div>
      <div class="flex justify-center">
        <AButton class="bg-blue-500 mt-5" type="primary" @click="router.push('/shop')">Order now</AButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

</script>

<style>

</style>