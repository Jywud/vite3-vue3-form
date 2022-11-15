<template>
    <div class="c-mb20">
        <div class="c-mb10">模块标题</div>
        <el-input v-model="activeComp.name" />
    </div>
    <div class="c-mb20">
        <div class="c-mb10">多行文本内容</div>
        <el-input v-model="activeComp.content" :rows="4" type="textarea" placeholder="请输入" />
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {};
    },
    props: {
        activeComp: {}
    }
};
</script>

<style lang="less"  scoped>
.pro-item {
    display: flex;
    background-color: #fff;
    margin-bottom: 20px;
}
</style>
