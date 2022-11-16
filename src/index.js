//index.js
import FormBuild from "./components/FormBuild/index.vue"
import FormDesign from "./components/FormDesign/index.vue"
 
export { FormBuild, FormDesign } //实现按需引入 
 
const components = [FormBuild, FormDesign];
const install = function(App, options) {
    components.forEach((component) => {
        App.component(component.name, component);
    });
};


// 判断是否是以文件方式或者CDN方式，如果是，则不用调用 Vue.use()。在 CommonJS 中应始终使用 Vue.use()
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue)
// }

export default { install }