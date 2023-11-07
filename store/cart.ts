import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem } from '@/model/cart'
import type { Product } from '@/model/product'


export const useCartStore = defineStore('cart', () => {
    const list = ref<CartItem[]>([])

    const sumCart = computed(() => {
        let sum = 0
        list.value.forEach((item) => {
            //const product = useProduct(item.product)
            sum += item.product.price * item.qty
        })
        return sum
    })

    const getTotalItem = (cartItem: CartItem) => {
        const { price } = useProduct(cartItem.product)
        //return usePrice(,true,'')
        return price.value * cartItem.qty
    }

    const count = computed(() => list.value.length)

    const addProduct = (product: Product, qty: number) => {
        const item = list.value.find((item) => item.product.id === product.id)
        if (item) {
            item.qty = qty
        } else {
            list.value.push({ product, qty })
        }
        saveOnLocal()
    }

    // function incrementQTY(cartItem: CartItem) {
    //     const item=list.value.find(item=> item.product.id==cartItem.product.id)
    //     if(item){
    //         item.qty ++
    //     }
    // }
    //
    // function decrementQTY(cartItem: CartItem) {
    //     const item=list.value.find(item=> item.product.id==cartItem.product.id)
    //     if(item){
    //         if(item.qty>1) {
    //             item.qty --
    //         }
    //     }
    // }

    function deleteItem(product: Product) {
        const index = list.value.findIndex((item) => item.product.id == product.id)
        if (index > -1) {
            list.value.splice(index, 1)
        }
        saveOnLocal()
    }

    function saveOnLocal() {
        localStorage.setItem('cart', JSON.stringify(list.value))
    }


    function reset() {
        list.value = []
    }

    return {
        reset,
        list,
        sumCart,
        addProduct,
        count,
        // incrementQTY,
        // decrementQTY,
        getTotalItem,
        deleteItem,
    }
})
