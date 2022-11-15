import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDragCompStore = defineStore('dragComp', () => {
  const activeComp = ref({}) 

  return { activeComp }
})
