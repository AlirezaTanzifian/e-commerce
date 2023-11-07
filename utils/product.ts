import type { Ref } from 'vue'
import type { Product } from '@/model/product'
import { unref, computed } from 'vue'

export function useProduct(product: Ref<Product> | Product) {
    const price = computed<number>(() => {
        if (unref(product).price) return unref(product).price as number
        return 0
    })

    return {
        price
    }
}