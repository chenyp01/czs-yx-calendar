
// 插件对应组件的名字
import CzsYxCalendar from './czs-yx-calendar.vue'

// Vue.js 的插件应当有一个公开方法 install 。第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
// 此处注意，组件需要添加name属性，代表注册的组件名称，也可以修改成其他的
CzsYxCalendar.install = Vue => Vue.component(CzsYxCalendar.name, CzsYxCalendar)   //注册组件

export default CzsYxCalendar
