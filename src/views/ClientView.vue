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
import DYRadio from '@c/DYRadio/index.vue';
import DYCheckbox from '@c/DYCheckbox/index.vue';
import TextareaInfo from '@c/TextareaInfo/index.vue';

const compMap = {
  'input': {
    componentView: DYInput
  },
  'radio': {
    componentView: DYRadio
  },
  'checkbox': {
    componentView: DYCheckbox
  },
  'textarea': {
    componentView: TextareaInfo
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

// 重置表单
const resetForm = (formRef) => {
  if (!formRef) return
  formRef.resetFields()
}

onMounted(() => {
  // setFormRuls()
  // setDefaultFormData()
})

// 设置表单校验规则
const setFormRuls = () => {
  list.forEach(item => {
    if (item.type === 'input') {
      rules[item.id] = [{ required: item.required, message: '请输入', trigger: 'blur' }]
    }
    if (item.type === 'radio') {
      rules[item.id] = [{ required: item.required, message: '请选择', trigger: 'change' }]
    }
    if (item.type === 'checkbox') {
      rules[item.id] = [{ required: item.required, message: '请选择', trigger: 'change' }]
    }
  })
}

// 设置表单数据
const setDefaultFormData = () => {
  list.forEach(item => {
    if (item.type === 'input') {
      ruleForm[item.id] = ''
    }
    if (item.type === 'radio') {
      ruleForm[item.id] = ''
    }
    if (item.type === 'checkbox') {
      ruleForm[item.id] = []
    }
  })
}

setFormRuls()
setDefaultFormData()

</script>

<style lang="less" scoped>
.client-view {
  padding: 20px;
}
</style>
