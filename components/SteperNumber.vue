<template>
  <div>
    <div class="flex justify-between items-center">
      <span
          class="border rounded border-gray-200 flex justify-center items-center w-7 !h-7 cursor-pointer"
          @click="handleMinus"
      >
        <img src="~/assets/img/minus.svg" alt="minus-icon">
      </span>
      <span class="text-center w-10 font-bold">{{ _value }}</span>
      <span
          class="border rounded border-gray-200 flex justify-center items-center w-7 !h-7 cursor-pointer"
          @click="handleAdd"
      >
        <img src="~/assets/img/plus.svg" alt="plus-icon">
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { computed } from 'vue'

interface Props {
  value?: string | number
  min?: number
  max?: number
}
const props = withDefaults(defineProps<Props>(), {
  value: 0
})

const _value = computed({
  get: () => {
    return parseInt(props.value.toString())
  },
  set: (val) => {
    emit('change', val)
  }
})

const emit = defineEmits<{
  (e: 'update:value', value: string | number): void
  (e: 'change', value: string | number): void
}>()

function handleAdd() {
  if (props.max) {
    if (_value.value + 1 <= props.max) _value.value += 1
  } else _value.value += 1
}

function handleMinus() {
  if (props.min) {
    if (_value.value - 1 >= props.min) _value.value -= 1
  } else {
    _value.value -= 1
  }
}
</script>

<style>

</style>
