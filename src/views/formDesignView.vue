<template>
  <!-- 表单设计测试页面 -->
  <div class="design-page">
    <FormDesign ref="formDesign" @saveForm="saveForm">
      <template #formBtns>
        <el-button type="primary" @click="preFormView">预览表单</el-button>
        <el-button type="primary" @click="saveForm">保存表单</el-button>
      </template>
    </FormDesign>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import FormDesign from '@c/FormDesign/index.vue'

let router = useRouter()

let formDesign = ref(null)

onMounted(() => {
  let formDesignList = sessionStorage.getItem('formDesignList')
  if (formDesignList) {
        let listcomp = JSON.parse(formDesignList)

        if (listcomp.length === 0) return
        formDesign.value.setFormDesignData(listcomp)
    }  
})

const exportJSON = () => {
  const data = formDesign.value.exportFormJSON()
  sessionStorage.setItem('formDesignList', JSON.stringify(data))
  return data
}

const saveForm = () => {
  exportJSON()
  ElMessage({
    message: '表单保存成功',
    type: 'success',
  })
}

const preFormView = () => {
  let json = exportJSON()
  if (json.length > 0) {
    router.push({ name: 'formBuildView' })
  } else {
    ElMessage({
      message: '表单为空',
      type: 'error',
    })
  }
}
</script>

<style lang="less" scoped>
.design-page {
  height: 100vh;
}
</style>
