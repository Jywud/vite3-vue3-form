<template>
    <el-input v-model="compVal" :disabled="compData.disabled" :placeholder="compData.placeholder" />
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
    model: {
        type: String,
        default: ''
    },
    compData: {
        type: Object,
        default: () => ({})
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const emits = defineEmits(['update:modelValue'])

let compVal = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:modelValue', val)
    }
})

</script>
<style lang="less" scoped>

</style>