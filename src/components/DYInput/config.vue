<template>
    <div class="mt10">
        <div class="fontw">标题</div>
        <el-input v-model="activeComp.name" />
    </div>   
    <div class="mt10">
        <div class="fontw">提示</div>
        <el-input v-model="activeComp.placeholder" />
    </div>
    <div class="mt10">
        <el-checkbox v-model="activeComp.required" label="是否必填" />
        <el-checkbox v-model="activeComp.disabled" label="是否禁用" />
    </div>
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