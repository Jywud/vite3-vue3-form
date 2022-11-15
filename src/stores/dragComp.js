import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDragCompStore = defineStore('dragComp', () => {
  const activeCompomp = ref({}) 

  return { activeCompomp }
})
