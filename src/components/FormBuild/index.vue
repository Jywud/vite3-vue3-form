<template>
    <div class="client-view">
        <el-form ref="formRef" label-position="top" :rules="formRules" :model="ruleForm">
            <el-form-item v-for="item in compList" :key="item.id" :prop="item.id" :label="item.name">
                <component :is="item.componentView" :compData="item" v-model="ruleForm[item.id]"></component>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="formSubmit(formRef)">提交</el-button>
        <el-button type="primary" @click="resetForm(formRef)">重置</el-button>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, toRaw } from 'vue';
import { compMap } from '@/common/const/componentMap.js'

let formRef = ref(null)
const formRules = reactive({})
const ruleForm = reactive({})
let compList = ref([])

// 获取原始表单数据
let formOrigList = JSON.parse(sessionStorage.getItem('previewList')) || []

compList.value = formOrigList.map(v => {
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

// 初始化表单
const initFormData = () => {
    formOrigList.forEach(item => {
        if (item.defaultData != undefined) {
            ruleForm[item.id] = typeof(item.defaultData) === 'object'? JSON.parse(JSON.stringify(item.defaultData)) : item.defaultData
        }      

        if (item.type === 'input') {
            formRules[item.id] = [{ required: item.required, message: '请输入', trigger: 'blur' }]
        } else if (item.type === 'radio' || item.type === 'checkbox') {
            formRules[item.id] = [{ required: item.required, message: '请选择', trigger: 'change' }]
        }
    })
}

initFormData()

</script>
  
<style lang="less" scoped>
.client-view {
    padding: 20px;
}
</style>
  