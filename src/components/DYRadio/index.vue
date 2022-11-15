<template>  
    <el-radio-group v-model="compVal" :disabled="itemData.disabled">
        <el-radio :label="item.value"  v-for="item in itemData.config.options" :key="item.value">{{ item.name }}</el-radio>
    </el-radio-group>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
    model: {
        type: String,
        default: ''
    },
    itemData: {
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