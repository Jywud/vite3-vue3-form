import DYInput from '@c/DYInput/index.vue';
import DYInputConfig from '@c/DYInput/config.vue';
import DYRadio from '@c/DYRadio/index.vue';
import DYRadioConfig from '@c/DYRadio/config.vue';
import DYCheckbox from '@c/DYCheckbox/index.vue';
import DYCheckboxConfig from '@c/DYCheckbox/config.vue';
import TextareaInfo from '@c/TextareaInfo/index.vue';
import TextareaInfoConfig from '@c/TextareaInfo/config.vue';

export const compMap = {
  input: {
    componentView: DYInput,
    componentConfig: DYInputConfig,
  },
  radio: {
    componentView: DYRadio,
    componentConfig: DYRadioConfig,
  },
  checkbox: {
    componentView: DYCheckbox,
    componentConfig: DYCheckboxConfig,
  },
  textareaInfo: {
    componentView: TextareaInfo,
    componentConfig: TextareaInfoConfig,
  },
};
