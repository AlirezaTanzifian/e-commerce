<template>
  <div>
    <Header />
    <div class="max-w-[1488px] md:mx-auto">
      <div class="mt-12 p-4 md:p-8">
        <div class="md:w-1/4"></div>
        <div class="grid grid-cols-2 md:w-3/4 md:flex md:flex-wrap gap-4">
          <ProductCard v-for="i in 20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>