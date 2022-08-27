import { getToken, setToken, removeToken, setTimestamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(), // 设置token为共享状态,初始化vuex的时候，就先从缓存中读取
  userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
  // hrsaasTime: ''// 控制token失效
}
const mutations = {
  setToken(state, token) {
    state.token = token// 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex的数据置空
    removeToken()// 同步到缓存
  },
  // 用户资料设置
  setUserInfo(state, result) {
    state.userInfo = result// 这样是响应式
    // state.userInfo = {...result}//这样也是响应式，属于浅拷贝
    // state.userInfo['username'] = result//这样不属于响应式
  },
  // 删除用户资料
  removeUserInfo(state, result) {
    state.userInfo = {}
  }
  // // 设置token失效
  // sethrsaasTime(state, time) {
  //   state.hrsaasTime = time
  // }

}
const actions = {
  // 登录action要做的事情，调用登录接口，成功后设置token到vuex，失败则返回失败
  async loginAction(context, data) {
    // 调用api接口
    const result = await login(data)// 拿到数据token
    // 如果为true,则表示登录成功
    context.commit('setToken', result)// 设置token
    // 拿到token说明登录成功
    setTimestamp()// 设置当前的时间戳
  },
  // 获取用户资料-调用接口
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户的详情---这里是专门获取头像
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }// 将两个接口结果合并
    context.commit('setUserInfo', baseResult) // 将整个的个人信息设置到用户的vuex数据中
    return baseResult // 这里为什么要返回 为后面埋下伏笔
  },
  // 登出操作
  logout(context) {
    // 删除token
    context.commit('removeToken')// 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo')
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
