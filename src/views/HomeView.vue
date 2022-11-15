<template>
  <div class="page">
    <div class="component-container">
      <h3>组件库</h3>
      <draggable class="dragArea list-group" ghost-class="ghost" :list="origComponents"
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
        <el-button type="primary" @click="getActiveByStore">当前焦点组件</el-button>
      </div>
      <draggable class="dragArea form-group" :list="formComponents" group="dragComponets" item-key="name">
        <template #item="{ element, index }">
          <div class="form-item-wrap" :class="{ isActive: activeC.id === element.id }" @click="selectComp(element)">
            <div class="form-title-bar"><span v-if="element.required" style="color: red">*</span><span>{{ element.name
            }}：</span></div>
            <component :is="element.componentView" :itemData="element" model="design"></component>
            <el-button type="danger" :icon="Delete" circle @click="formComponents.splice(index, 1)" />
            <el-button type="primary" :icon="Star" circle @click="cloneComp(element, index)" />
          </div>
        </template>
      </draggable>
    </div>
    <div class="config-container">
      <h3>组件配置</h3>
      <div class="config-content-box">
        <component :is="activeC.componentConfig" :activeC="activeC"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, toRaw, markRaw } from 'vue';
import { useRouter } from 'vue-router'
import draggable from 'vuedraggable';
import {
  Delete, Star
} from '@element-plus/icons-vue'

import { useDragCompStore } from '@/stores/dragComp'

import DYInput from '@c/DYInput/index.vue';
import DYInputConfig from '@c/DYInput/config.vue';

import textareaInfo from '@c/textareaInfo/index.vue';
import textareaInfoConfig from '@c/textareaInfo/config.vue';

// import brandPicture from '@c/brandPicture/index.vue';
// import brandPictureConfig from '@c/brandPicture/config.vue';

// import productIntro from '@c/productIntro/index.vue';
// import productIntroConfig from '@c/productIntro/config.vue';

// import originatorIntro from '@c/originatorIntro/index.vue';
// import originatorIntroConfig from '@c/originatorIntro/config.vue';

let router = useRouter()
let dragCompStore = useDragCompStore()
let activeC = ref({});
const formComponents = reactive([]);

// const compMap = {
//   'input': {
//     componentView: ()=> import('@c/DYInput/index.vue'),
//     componentConfig: ()=> import('@c/DYInput/config.vue')
//   },
//   'textarea': {
//     componentView: ()=> import('@c/textareaInfo/index.vue'),
//     componentConfig: ()=> import('@c/textareaInfo/config.vue'),
//   },
//   // 'brand_picture': {
//   //   componentView: ()=> import('@c/brandPicture/index.vue'),
//   //   componentConfig: ()=> import('@c/brandPicture/config.vue'),
//   // }
// }
const compMap = {
  'input': {
    componentView: DYInput,
    componentConfig: DYInputConfig
  },
  'textarea': {
    componentView: textareaInfo,
    componentConfig: textareaInfoConfig
  },
  // 'brand_picture': {
  //   componentView: brandPicture,
  //   componentConfig: brandPictureConfig
  // }
}
const origComponents = reactive([
  {
    name: '输入框',
    type: 'input',
    value: '', //输入值
    required: false,
    disabled: false,
  },
  {
    name: '多行文本说明',
    type: 'textarea',
    content: '多行文本内容多行文本内容多行文本内容',
  },
  // {
  //   name: '图片专栏',
  //   type: 'brand_picture',
  //   content: [
  //     {
  //       imgUrl: 'https://minio.yscredit.com/bch/images/8fdd6891264046638a32ebc7fb636401.jpg',
  //       type: 'img'
  //     },
  //     {
  //       imgUrl: 'https://minio.yscredit.com/bch/images/39c14b9c63304563ae8480e44e52bcfe.JPG',
  //       type: 'img'
  //     },
  //     {
  //       imgUrl: 'https://minio.yscredit.com/bch/images/cb76830dd54f41a88c5dad4f0a6da6ff.jpg',
  //       type: 'img'
  //     }
  //   ]
  // },
  // {
  //   id: 4,
  //   name: '产品专栏',
  //   type: 'brand_product',
  //   contentName: '实例-产品介绍',
  //   content: [
  //     {
  //       name: '实例应用',
  //       subName: '实例应用全名',
  //       imgUrl: 'https://minio.yscredit.com/bch/images/02eee842f9c84c66baf179caf45d7a88.png'
  //     }
  //   ]
  // },
  // {
  //   id: 5,
  //   name: '人物专栏',
  //   type: 'brand_senior',
  //   contentName: '实例-创始人搭档',
  //   content: [
  //     {
  //       name: '姓名A',
  //       title: '创始人/董事长',
  //       imgUrl: 'https://minio.yscredit.com/bch/images/f8cf06d2748f46a288d92607533f6541.png'
  //     }
  //   ]
  // }
  // { id: 6, name: '公众号关注' }
]);



// 获取唯一的组件id
const getId = () => {
  return 'field' + (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString() + new Date().getTime().toString().substring(5);
}

const setDrawingComp = (obj) => {
  return { ...obj, id: getId(), ...compMap[obj.type] }
}

// 拖拽克隆组件
const handleClone = (data) => {
  const obj = toRaw(data);
  const copyObj = JSON.parse(JSON.stringify(obj))
  return setDrawingComp(copyObj)

  // copyObj.id = getId()
  // copyObj.componentView = DYInput,
  // copyObj.componentConfig = DYInputConfig
  // return copyObj;

}


const selectComp = (element) => {
  activeC.value = element
  dragCompStore.activeComp = activeC
}

const getActiveByStore = () => {
  console.log(dragCompStore.activeComp);
}

// 克隆组件
const cloneComp =(comp, index)=> {
  const obj = toRaw(comp);
  const copyObj = JSON.parse(JSON.stringify(obj))
  // return setDrawingComp(copyObj)
  formComponents.splice(index, 0, setDrawingComp(copyObj))
}

// 导出json
const exportJSON = () => {
  let list = toRaw(formComponents)
  console.log(list);
  // list= []
  sessionStorage.setItem('previewList', JSON.stringify(list))
}


// 表单预览
const preView = () => {
  router.push({ name: 'clientView' })
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
    width: 350px;
  }

  .form-container {
    // width: 400px;
    flex: 1;
    // max-width: 400px;
    margin: 0 20px;

    .form-btns {
      margin: 10px 0;
    }
  }

  .config-container {
    width: 400px;
  }
}

.list-group-item {
  padding: 10px;
  background-color: #999;
  margin-bottom: 10px;
  cursor: move;
  width: 50%;
  text-align: center;
}

.form-item-wrap {
  // margin: 8px 0;
  padding: 8px 5px;

  &.isActive {
    border: 1px solid red;
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
