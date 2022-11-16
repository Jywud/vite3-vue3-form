<template>
    <div class="client-view">
        <el-form ref="formRef" label-position="top" :rules="formRules" :model="ruleForm">
            <el-form-item v-for="item in compList" :key="item.id" :prop="item.id" :label="item.name">
                <component :is="item.componentView" :compData="item" v-model="ruleForm[item.id]"></component>
            </el-form-item>
        </el-form>
        <slot name="btns">
            <el-button type="primary" @click="validateForm">表单校验</el-button>
            <el-button type="primary" @click="resetForm">表单重置</el-button>
        </slot>        
    </div>
</template>
  
<script setup>
import { ref, reactive, toRaw } from 'vue';
import { compMap } from '@/common/const/componentMap.js'

let formRef = ref(null)
const formRules = reactive({}) //表单规则校验
const ruleForm = reactive({}) //表单输入数据集
let compList = ref([])  //渲染的表单数据
let formOrigList = [] // 原始表单数据

/* 初始化表单-父组件调用 */
const initDefaultForm = (data) => {
    formOrigList = data
    compList.value = formOrigList.map(v => {
        return { ...v, componentView: compMap[v.type]['componentView'] }
    })

    initFormRender()
}

// 模拟表单提交
const validateForm = () => {
    return new Promise((resolve, reject) => {
        if (!formRef.value) return

        formRef.value.validate((valid, fields) => {
            if (valid) {
                console.log('submit!', toRaw(ruleForm), toRaw(compList.value))
                emits('validateSuccess', toRaw(ruleForm), toRaw(compList.value))
                resolve(toRaw(ruleForm), toRaw(compList.value))
            } else {
                console.log('error submit!', fields)
                reject()
            }
        })
    })

}

// 重置表单
const resetForm = () => {
    if (!formRef.value) return
    formRef.value.resetFields()
}

// 初始化表单
const initFormRender = () => {
    formOrigList.forEach(item => {
        // 设置表单默认值
        if (item.defaultValue != undefined) {
            ruleForm[item.id] = typeof (item.defaultValue) === 'object' ? JSON.parse(JSON.stringify(item.defaultValue)) : item.defaultValue
        }

        // 设置表单规则
        if (item.type === 'input') {
            formRules[item.id] = [{ required: item.required, message: '请输入', trigger: 'blur' }]
        } else if (item.type === 'radio' || item.type === 'checkbox') {
            formRules[item.id] = [{ required: item.required, message: '请选择', trigger: 'change' }]
        }
    })

}

// 设置表单数据-父组件调用
const setFormData = (data) => {
    if (typeof (data) !== 'object') return

    for (let key in ruleForm) {
        if(data[key]) {
            ruleForm[key] = data[key]
        }
    }
}

let emits = defineEmits(['validateSuccess'])
defineExpose({ resetForm, validateForm, initDefaultForm, setFormData })

</script>
  
<style lang="less" scoped>
.client-view {
    padding: 20px;
}
</style>
  