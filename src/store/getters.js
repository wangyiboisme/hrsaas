const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立token的快捷访问，模块名是user
  username: state => state.user.userInfo.username, // 建立用户名的快速访问
  // state.user.userInfo  注意一下  state.user.userInfo 如果之前设置为null 了 ，非空判断做完整
  userId: state => state.user.userInfo.userId, // 建立用户id的映射
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  componyId: state => state.user.userInfo.componyId, // 建立对于公司ID的快捷访问
  hrsaasTime: state => state.user.hrsaasTime

}
export default getters
