<template>
    <div class="mt10">
        <div class="mb10 fontw">组件标题</div>
        <el-input v-model="activeComp.name" />
    </div>
    <div>
        <el-checkbox v-model="activeComp.required" label="是否必填" />
        <el-checkbox v-model="activeComp.disabled" label="是否禁用" />
    </div>
    <div class="options-panel mt10">
        <p class="mb10 fontw">选项配置</p>
        <div class="tip-box">请勿使用相同的选项名和选项值</div>
        <div class="mb10" v-for="(item, index) in activeComp.config.options" :key="item.value">
            选项名:<el-input v-model="item.name"></el-input>
            选项值:<el-input v-model="item.value"></el-input>
            <el-button type="danger" link  @click="activeComp.config.options.splice(index, 1)">删除</el-button>
        </div>
        <el-button type="primary" @click="addOption">添加选项</el-button>
    </div>
</template>
<script setup>
let props = defineProps({
    activeComp: {
        type: Object,
        default: () => ({})
    }
})

const addOption = ()=> {
    props.activeComp.config.options.push({value: 'XXX', name: 'XXX'})
}
</script>
<style lang="less" scoped>
.tip-box{
    color: #fff;
    padding: 5px;
    background-color: #e6a23c;
}
</style>