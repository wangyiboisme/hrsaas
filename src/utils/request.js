// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
// 这里没有组件，所以没办法使用this.$message，可以引入
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
}, 5000) // 创建一个axios的实例
service.interceptors.request.use() // 请求拦截器
// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一个data,后端返回的数据是response.data---本项目返回的都有success,message,data,最重要的是里面的data,需要根据success的反馈去获取数据
  const { success, message, data } = response.data
  // 根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 2xx 范围内的状态码都会触发该函数---由于不会报错所以要new Error
    // 对响应数据做点什么
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Message.error(error.message)
  return Promise.reject(error)// 返回执行错误 让当前的执行链跳出成功 直接进入 catch
}
)
export default service // 导出axios实例
