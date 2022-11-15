<template>
  <div class="client-view">
    <el-form ref="formRef" label-position="top" :rules="rules" :model="ruleForm">
      <el-form-item v-for="item in compList.comps" :key="item.id" :prop="item.id" :label="item.name">
        <component :is="item.componentView" :itemData="item" v-model="ruleForm[item.id]"></component>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="formSubmit(formRef)">提交</el-button>
    <el-button type="primary" @click="resetForm(formRef)">重置</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw } from 'vue';
import DYInput from '@c/DYInput/index.vue';
import textareaInfo from '@c/textareaInfo/index.vue';

const compMap = {
  'input': {
    componentView: DYInput
  },
  'textarea': {
    componentView: textareaInfo
  }
}

let formRef = ref(null)
let rules = reactive({})
const ruleForm = reactive({})
let compList = reactive({ comps: [] })
let list = JSON.parse(sessionStorage.getItem('previewList')) || []

compList.comps = list.map(v => {
  return { ...v, componentView: compMap[v.type]['componentView'] }
})

// 模拟表单提交
const formSubmit = (formRef) => {
  if (!formRef) return

  formRef.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', toRaw(ruleForm))
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formRef) => {
  if (!formRef) return
  formRef.resetFields()
}


list.forEach(item => {
  rules[item.id] = [{ required: item.required || false, message: '请输入', trigger: 'blur' }]
})


onMounted(() => {
  // 模拟默认数据设置
  setFormData()
})

// 设置表单数据
const setFormData = ()=> {
  list.forEach(v=> {
    ruleForm[v.id] = ''
  })  
}

</script>

<style lang="less" scoped>
.client-view {
  padding: 20px;
}
</style>
