<template>  
    <el-checkbox-group v-model="compVal" :disabled="compData.disabled">
        <el-checkbox :label="item.value"  v-for="item in compData.config.options" :key="item.value">{{ item.name }}</el-checkbox>     
    </el-checkbox-group>
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
        type: Array,
        default: ()=> []
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