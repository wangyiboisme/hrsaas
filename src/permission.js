import router from '@/router'
import Store from '@/store'
// 引入加载状态
import Nprogress from 'nprogress'
// 定义白名单
const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach((to, from, next) => {
  Nprogress.start()// 开启进度条
  // 首先判断有无token,所以引入Store
  if (Store.getters.token) {
    // 判断是否要进去登录页面
    if (to.path === '/login') {
      next('/')// 跳转到主页
    } else {
      next()// 直接放行
      // next()放过
      // next(false)跳转终止
      // next(地址，如‘/login’)，则跳转到某个地址
    }
  } else {
    // token不存在，用户没有登录
    if (whiteList.indexOf(to.path) > -1) {
      next()// 如果找到了 表示在在名单里面
    } else {
      next('/login')
    }
  }
  Nprogress.done()// 手动强制关闭一次，为了解决手动切换地址时，进度条的不关闭问题
})
// 后置守卫
router.afterEach((to, from, next) => {
  Nprogress.done()// 关闭进度条
})
