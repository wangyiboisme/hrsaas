// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
// 引入store，拿到token
import Store from '@/store'
import { Message } from 'element-ui'
import store from '@/store'
// 这里没有组件，所以没办法使用this.$message，可以引入
import { getTimestamp } from './auth'
import router from '@/router'
// 定义token有效的时间
const TimeOut = 3600
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
// function IsCheckTimeOut() {
//   var currentTime = Date.now() // 当前时间戳
//   var timeStamp = store.getters.hrsaasTime // 缓存时间戳
//   return (currentTime - timeStamp) / 1000 > TimeOut
// }

// 是否超时-超时的逻辑（当前时间-缓存中的时间）是否大于时间差
function isCheckTimeOut() {
  var currentTime = Date.now()// 当前时间
  var timeStamp = getTimestamp()// 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut// 得到的毫秒
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
}, 5000) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use(config => {
  if (Store.getters.token) {
    // if (IsCheckTimeOut()) {
    //   // 如果它为true表示 过期了
    //   // token没用了 因为超时了
    //   store.dispatch('user/logout') // 登出操作
    //   // 跳转到登录页
    //   router.push('/login')
    //   return Promise.reject(new Error('token超时了'))
    // }
    // 只有在有token的情况下，才有必要去检查时间戳是否超时
    if (isCheckTimeOut()) {
      // 如果它为true，表示过期了
      store.dispatch('user/logout') // 登出操作
      router.push('/login')// 跳转到登录页--需要引入路由
      return Promise.reject(new Error('登录超时'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config// 这一行代码必须要有，必须要返回config，不然会报错
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
}

)

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
  // error 信息 里面 response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  }
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Message.error(error.message)
  return Promise.reject(error)// 返回执行错误 让当前的执行链跳出成功 直接进入 catch
}
)
export default service // 导出axios实例
