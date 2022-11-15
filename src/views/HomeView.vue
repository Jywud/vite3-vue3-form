<template>
  <div class="page">
    <div class="component-container">
      <h3>组件库</h3>
      <draggable class="list-group" ghost-class="ghost" :list="origComponents"
        :group="{ name: 'dragComponets', pull: 'clone', put: false }" :clone="handleClone" item-key="type">
        <template #item="{ element }">
          <div class="list-group-item" :data-name="element.name">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="form-container">
      <h3>表单编辑 </h3>
      <div class="form-btns">
        <el-button type="primary" @click="exportJSON">导出json</el-button>
        <el-button type="primary" @click="preView">预览表单</el-button>
        <el-button type="primary" @click="saveForm">保存</el-button>
      </div>
      <draggable class="dragArea form-group" :list="formComponents" group="dragComponets" item-key="name">
        <template #item="{ element, index }">
          <div class="form-item-wrap" :class="{ isActive: activeComp.id === element.id }" @click="selectComp(element)">
            <div class="form-title-bar"><span v-if="element.required" style="color: red">*</span><span>{{ element.name
            }}</span></div>
            <component :is="element.componentView" :itemData="element" model="design"></component>
            <div class="form-btns">
              <el-button type="danger" :icon="Delete" circle @click="formComponents.splice(index, 1)" />
              <el-button type="primary" :icon="Star" circle @click="cloneComp(element, index)" />
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="config-container">
      <h3>组件配置</h3>
      <div class="config-content-box">
        <component :is="activeComp.componentConfig" :activeComp="activeComp"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, toRaw, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import draggable from 'vuedraggable';
import {
  Delete, Star
} from '@element-plus/icons-vue'

import { useDragCompStore } from '@/stores/dragComp'

import DYInput from '@c/DYInput/index.vue';
import DYInputConfig from '@c/DYInput/config.vue';
import DYRadio from '@c/DYRadio/index.vue';
import DYRadioConfig from '@c/DYRadio/config.vue';
import DYCheckbox from '@c/DYCheckbox/index.vue';
import DYCheckboxConfig from '@c/DYCheckbox/config.vue';
import TextareaInfo from '@c/TextareaInfo/index.vue';
import TextareaInfoConfig from '@c/TextareaInfo/config.vue';

let router = useRouter()
let dragCompStore = useDragCompStore()
let activeComp = ref({});
let formComponents = ref([]); //表单组件列表

const compMap = {
  'input': {
    componentView: DYInput,
    componentConfig: DYInputConfig
  },
  'radio': {
    componentView: DYRadio,
    componentConfig: DYRadioConfig
  },
  'checkbox': {
    componentView: DYCheckbox,
    componentConfig: DYCheckboxConfig
  },
  'textarea': {
    componentView: TextareaInfo,
    componentConfig: TextareaInfoConfig
  }
}

// 组件库
const origComponents = [
  {
    name: '输入框',
    type: 'input',
    required: false,
    disabled: false,
    placeholder: '',
    defaultValue: ''
  },
  {
    name: '单选框',
    type: 'radio',
    required: false,
    disabled: false,
    defaultValue: '',
    config: {
      options: [{ value: '1', name: '选项一' }, { value: '2', name: '选项二' }]
    }
  },
  {
    name: '复选框',
    type: 'checkbox',
    required: false,
    disabled: false,
    defaultValue: [],
    config: {
      options: [{ value: '1', name: '选项一' }, { value: '2', name: '选项二' }]
    }
  },
  {
    name: '多行文本说明',
    type: 'textarea',
    content: '多行文本内容多行文本内容多行文本内容',
  }
];

onMounted(() => {
  let previewList = sessionStorage.getItem('previewList')
  if (previewList) {
    let listcomp = JSON.parse(previewList)
    formComponents.value = listcomp.map(item => {
      return setDrawingComp(item)
    })
  }
})

// 获取唯一的组件id
const getId = () => {
  return 'field' + (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString() + new Date().getTime().toString().substring(5);
}

const setDrawingComp = (obj) => {
  return { ...obj, id: getId(), ...compMap[obj.type] }
}

// 拖拽克隆组件
const handleClone = (obj) => {
  // const obj = toRaw(obj);
  const copyObj = JSON.parse(JSON.stringify(obj))
  return setDrawingComp(copyObj)
}

const selectComp = (element) => {
  activeComp.value = element
  dragCompStore.activeCompomp = activeComp
}

// 克隆组件
const cloneComp = (comp, index) => {
  const obj = toRaw(comp);
  const copyObj = JSON.parse(JSON.stringify(obj))
  formComponents.value.splice(index, 0, setDrawingComp(copyObj))
}

// 导出json,暂存sessionStorage
const exportJSON = () => {
  let list = toRaw(formComponents.value)
  console.log(list);
  sessionStorage.setItem('previewList', JSON.stringify(list))
}

// 表单预览
const preView = () => {
  exportJSON()
  router.push({ name: 'clientView' })
}

// 保存表单
const saveForm = () => {

}


// watch(formComponents.value, val => {
//   console.log(val);
// });
</script>

<style lang="less" scoped>
.page {
  padding: 20px;
  display: flex;

  .component-container {
    width: 320px;
  }

  .form-container {
    flex: 1;
    margin: 0 20px;

    .form-btns {
      margin: 10px 0;
    }
  }

  .list-group {
    display: flex;
    flex-wrap: wrap;

    .list-group-item {
      line-height: 40px;     
      background-color: #999;
      margin-bottom: 10px;
      cursor: move;
      width: 150px;
      text-align: center;
      font-size: 13px;
      margin-right: 5px;
    }
  }

  .config-container {
    width: 400px;
  }
}



.form-item-wrap {
  padding: 8px 5px;

  &.isActive {
    border: 1px solid red;
    background-color: #fffbf1;
  }
}

.form-group {
  height: 500px;
  padding: 6px;
  border: 2px solid #000;
  border-radius: 4px;
}

.dragArea {
  min-height: 600px;
}

.ghost {
  opacity: 0.8;
  background: #333;
}
</style>
