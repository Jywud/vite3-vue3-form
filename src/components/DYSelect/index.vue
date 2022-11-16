<template>  
    <el-select v-model="compVal" placeholder="请选择" clearable :disabled="compData.disabled" style="width:100%">
        <el-option :label="item.name" :value="item.value"  v-for="item in compData.config.options" :key="item.value"></el-option>     
    </el-select>
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