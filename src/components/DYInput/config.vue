<template>
    <div class="mt10">
        <div>组件标题</div>
        <el-input v-model="activeComp.name" />
    </div>
    <el-checkbox v-model="activeComp.required" label="是否必填" />
    <el-checkbox v-model="activeComp.disabled" label="是否禁用" />
</template>
<script setup>
defineProps({
    activeComp: {
        type: Object,
        default: () => ({})
    }
})
</script>
<style lang="less" scoped>

</style>