<template>
    <!-- <span>{{itemData.name}}</span> -->
    <el-input v-model="itemData.value" :disabled="itemData.disabled" placeholder="请输入" v-if="model === 'design'" />
    <el-input v-model="inputVal" :disabled="itemData.disabled"
        placeholder="请输入" v-else />
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

let inputVal = computed({
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