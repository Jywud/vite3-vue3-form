<template>
    <div class="c-mb20">
        <div class="c-mb10">组件标题</div>
        <el-input v-model="activeC.name" />
    </div>
    <el-checkbox v-model="activeC.required" label="是否必填" />
    <el-checkbox v-model="activeC.disabled" label="是否禁用" />
</template>
<script setup>
defineProps({
    activeC: {
        type: Object,
        default: () => ({})
    }
})
</script>
<style lang="less" scoped>

</style>