import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()
  // 设置token为共享状态,初始化vuex的时候，就先从缓存中读取
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
  }
}
const actions = {
  // 登录action要做的事情，调用登录接口，成功后设置token到vuex，失败则返回失败
  async loginAction(context, data) {
    // 调用api接口
    const result = await login(data)// 拿到数据token
    // 如果为true,则表示登录成功
    context.commit('setToken', result)// 设置token
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
