<template>
    <div class="chunk-box">
        <!-- <div class="title-box">
            <span class="title">{{itemData.name}}</span>
            <span class="right-text"></span>
        </div> -->
        <div class="content-box">
            {{isunFold? itemData.content : origText}}
            <text class="is-unfold" v-if="itemData.content.length > 75" @click="isunFold = !isunFold">{{isunFold? '收起' : '展开'}}</text>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            isunFold: false
        };
    },
    computed: {
        origText() {
            if (this.itemData.content.length > 75) {
                return this.itemData.content.slice(0, 75) + '...';
            } else {
                return this.itemData.content;
            }
        }
    },
    props: {
        itemData: {
            type: Object,
            default: () => {}
        }
    },
    methods: {}
};
</script>

<style lang="less"  scoped>
.chunk-box {
    margin-bottom: 48rpx;

    .title-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24rpx;

        .title {
            font-size: 32rpx;
            // font-weight: 600;
            color: #333333;
        }

        .right-text {
            font-size: 24rpx;
            color: #999999;
        }
    }
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
