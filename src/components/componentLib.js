
/* 基础组件库定义 */
export const baseComponents = [
  {
    name: "输入框",
    type: "input",
    required: false,
    disabled: false,
    placeholder: "请输入",
    defaultValue: "",
  },
  {
    name: "单选框",
    type: "radio",
    required: false,
    disabled: false,
    defaultValue: "",
    config: {
      options: [
        { value: "1", name: "选项一" },
        { value: "2", name: "选项二" },
      ],
    },
  },
  {
    name: "复选框",
    type: "checkbox",
    required: false,
    disabled: false,
    defaultValue: [],
    config: {
      options: [
        { value: "1", name: "选项一" },
        { value: "2", name: "选项二" },
      ],
    },
  },
  {
    name: "下拉选择框",
    type: "select",
    required: false,
    disabled: false,
    defaultValue: "",
    config: {
      options: [
        { value: "1", name: "选项一" },
        { value: "2", name: "选项二" },
        { value: "3", name: "选项三" },
      ],
    },
  },
  {
    name: "多行文本说明",
    type: "textareaInfo",
    content: "多行文本内容多行文本内容多行文本内容",
  },
];
