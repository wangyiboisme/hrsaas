// 负责所有全局自定义组件的注册
// 该文件负责所有的公共的组件的全局注册   Vue.use
// Vue.use 这个方法 注册全局组件
import PageTools from './PageTools'
// 引用注册全屏组件
import ScreenFull from './ScreenFull'

export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
    Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
  }
}

