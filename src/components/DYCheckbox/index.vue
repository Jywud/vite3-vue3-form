<template>  
    <el-checkbox-group v-model="compVal" :disabled="itemData.disabled">
        <el-checkbox label="1">Option 1</el-checkbox>
        <el-checkbox label="2">Option 2</el-checkbox>
        <el-checkbox label="3">Option 3</el-checkbox>
    </el-checkbox-group>
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