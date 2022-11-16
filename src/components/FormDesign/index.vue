<template>
    <div class="form-design-page">
        <div class="component-lib-container">
            <h3>组件库</h3>
            <draggable class="list-group" ghost-class="ghost" :list="baseComponents"
                :group="{ name: 'dragComponets', pull: 'clone', put: false }" :clone="handleClone" item-key="type">
                <template #item="{ element }">
                    <div class="list-group-item" :data-name="element.name">
                        {{ element.name }}
                    </div>
                </template>
            </draggable>
        </div>
        <div class="form-design-container">
            <h3>表单编辑 </h3>
            <div class="form-btns-panel">
                <slot name="formBtns">
                    <!-- <el-button type="primary" @click="preView">预览表单</el-button> -->
                    <!-- <el-button type="primary" @click="saveForm">保存</el-button> -->
                </slot>
            </div>
            <draggable class="form-dragarea-box" :list="formComponents" group="dragComponets" animation="300"
                item-key="id">
                <template #item="{ element, index }">
                    <div class="form-item-wrap" :class="{ isActive: activeComp.id === element.id }"
                        @click="selectComp(element)">
                        <div class="form-title-bar"><span v-if="element.required" style="color: red">*</span><span>{{
                                element.name
                        }}</span></div>
                        <component :is="element.componentView" :compData="element" model="design"></component>
                        <div class="form-comp-btns">
                            <el-button type="danger" :icon="Delete" circle @click="deleteComp(index)" />
                            <el-button type="primary" :icon="CopyDocument" circle @click="cloneComp(element, index)" />
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
        <div class="component-config-container">
            <h3>组件配置</h3>
            <div class="config-content-box">
                <component :is="activeComp.componentConfig" :activeComp="activeComp"></component>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, shallowReactive, toRaw } from 'vue';
// import { useRouter } from 'vue-router'
import draggable from 'vuedraggable';
// import { ElMessage } from 'element-plus'
import {
    Delete, CopyDocument
} from '@element-plus/icons-vue'

import { baseComponents } from '../componentLib.js'
import { compMap } from '../componentMap.js'
//   import { useDragCompStore } from '@/stores/dragComp'

// let router = useRouter()
//   let dragCompStore = useDragCompStore()
let activeComp = ref({});
let formComponents = ref([]); //表单组件列表

// const emits = defineEmits(['saveForm'])
// 初始化设置form数据
const setFormDesignData = (formDesignList) => {
    formComponents.value = formDesignList.map(item => {
        return setDrawingComp(item)
    })
    activeComp.value = formComponents.value[0];
}

// 获取唯一的组件id
const getId = () => {
    return 'field' + (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString() + new Date().getTime().toString().substring(5);
}

// 给当前表单组件设置组件实例和配置
const setDrawingComp = (obj) => {
    return { ...obj, id: getId(), ...shallowReactive(compMap[obj.type]) }
}

// 拖拽克隆组件
const handleClone = (obj) => {
    const copyObj = JSON.parse(JSON.stringify(obj))
    const targetObj = setDrawingComp(copyObj)
    activeComp.value = targetObj
    return targetObj
}

// 选中组件
const selectComp = (element) => {
    activeComp.value = element
    // dragCompStore.activeCompomp = activeComp
}

/* ==========组件删除克隆操作============ */

// 克隆组件
const cloneComp = (comp, index) => {
    const obj = toRaw(comp);
    const copyObj = JSON.parse(JSON.stringify(obj))
    formComponents.value.splice(index, 0, setDrawingComp(copyObj))
}
// 删除组件
const deleteComp = (index) => {
    formComponents.value.splice(index, 1)
    if (index > 0) {
        setTimeout(() => {
            activeComp.value = formComponents.value[index - 1]
        })
    }
}

/* =========表单按钮栏操作============== */

// 导出json,暂存sessionStorage
const exportFormJSON = () => {
    return toRaw(formComponents.value)
}
// 表单预览
/* const preView = () => {
    let list = exportFormJSON()
    sessionStorage.setItem('formDesignList', JSON.stringify(list))
    router.push({ name: 'clientView' })
} */
// 保存表单
/* const saveForm = () => {
    let list = exportFormJSON()
    ElMessage({
        message: '保存成功',
        type: 'success',
    })
    emits('saveForm', list)

} */

defineExpose({ setFormDesignData, exportFormJSON })
</script>
  
<style lang="less" scoped>
.form-design-page {
    display: flex;
    height: 100%;
    padding: 20px;
    background: #f8f8f8;
    overflow: hidden;
}

.component-lib-container {
    height: 100%;
    overflow-y: auto;
    width: 320px;
    background-color: #fff;
    padding: 10px;

    .list-group {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;

        .list-group-item {
            height: 32px;
            line-height: 32px;
            background-color: #f4f6fc;
            color: #333;
            margin-bottom: 10px;
            cursor: move;
            width: 140px;
            text-align: center;
            font-size: 13px;
            margin-right: 5px;

            &:hover {
                border: 1px dashed #0070ff;
                color: #0070ff;
            }
        }
    }
}

.form-design-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
    margin: 0 20px;
    background-color: #fff;
    padding: 10px;

    .form-btns-panel {
        margin: 10px 0;
    }

    .form-dragarea-box {
        flex: 1;
        overflow-y: auto;
        padding: 20px 10px;
        border: 1px solid rgba(0, 0, 0, 0.8);
        border-radius: 4px;

        .form-item-wrap {
            position: relative;
            padding: 10px 6px 30px;

            .form-title-bar {
                margin-bottom: 8px;
            }

            .form-comp-btns {
                position: absolute;
                right: 10px;
                bottom: -10px;
                display: none;
            }

            &.isActive {
                // border: 1px solid red;
                background-color: #fffaf1;
                box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);

                .form-comp-btns {
                    display: block;
                }
            }
        }
    }
}

.ghost {
    opacity: 0.8;
    background: #333;
}

.component-config-container {
    height: 100%;
    overflow-y: auto;
    width: 400px;
    padding: 10px;
    background-color: #fff;
}
</style>
  