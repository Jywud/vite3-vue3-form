<template>
    <div class="chunk-box">
        <div class="content-box">
            {{ isunFold ? itemData.content : origText }}
            <text class="is-unfold" v-if="itemData.content.length > 75" @click="isunFold = !isunFold">{{ isunFold ?
                    '收起' : '展开'
            }}</text>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
})
let isunFold = ref(false)

let origText = computed(() => {
    if (props.itemData.content.length > 100) {
        return props.itemData.content.slice(0, 100) + '...';
    } else {
        return props.itemData.content;
    }
})
</script>

<style lang="less"  scoped>
.chunk-box {
    margin-bottom: 48rpx;

}

.content-box {
    font-size: 26rpx;
    font-weight: 400;
    color: #333333;
    line-height: 37rpx;
}

.is-unfold {
    font-size: 26rpx;
    font-weight: 400;
    color: #0055ff;
    line-height: 33rpx;
    margin-left: 6rpx;
}
</style>
