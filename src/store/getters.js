const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token// 建立token的快捷访问，模块名是user
}
export default getters
