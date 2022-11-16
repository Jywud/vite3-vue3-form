<template>
  <FormBuild ref="formBuild" @validateSuccess="validateSuccess"></FormBuild>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FormBuild from '@c/FormBuild/index.vue'

let formBuild = ref(null)

onMounted(() => {
  let formOrigList = JSON.parse(sessionStorage.getItem('formDesignList')) || []
  formBuild.value.initDefaultForm(formOrigList)

  // 模拟接口调用设置表单数据
  // setTimeout(() => {
  //   formBuild.value.setFormData({
  //     field1069085519935
  //       :
  //       "12213",
  //     field2606885514446
  //       :
  //       "12sssss12",
  //     field8606285530605
  //       :
  //       ['1'],
  //     field9963885526181
  //       :
  //       "1"
  //   })
  // }, 2000)
})

const validateSuccess = (ruleForm, compList) => {

}

</script>

<style lang="less" scoped>

</style>
