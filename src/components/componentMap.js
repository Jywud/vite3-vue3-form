import { shallowRef } from 'vue';

import DYInput from '@c/DYInput/index.vue';
import DYInputConfig from '@c/DYInput/config.vue';
import DYRadio from '@c/DYRadio/index.vue';
import DYRadioConfig from '@c/DYRadio/config.vue';
import DYCheckbox from '@c/DYCheckbox/index.vue';
import DYCheckboxConfig from '@c/DYCheckbox/config.vue';
import DYSelect from '@c/DYSelect/index.vue';
import DYSelectConfig from '@c/DYSelect/config.vue';
import TextareaInfo from '@c/TextareaInfo/index.vue';
import TextareaInfoConfig from '@c/TextareaInfo/config.vue';


/* !!!这里使用shallowRef组件优化性能 */
export const compMap = {
  input: {
    componentView: shallowRef(DYInput),
    componentConfig: shallowRef(DYInputConfig),
  },
  radio: {
    componentView: shallowRef(DYRadio),
    componentConfig: shallowRef(DYRadioConfig),
  },
  checkbox: {
    componentView: shallowRef(DYCheckbox),
    componentConfig: shallowRef(DYCheckboxConfig),
  },
  textareaInfo: {
    componentView: shallowRef(TextareaInfo),
    componentConfig: shallowRef(TextareaInfoConfig),
  },
  select: {
    componentView: shallowRef(DYSelect),
    componentConfig: shallowRef(DYSelectConfig),
  },
};
