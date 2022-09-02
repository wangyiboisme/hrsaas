<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>

<script>
// 引入
// import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFull',
  methods: {
    changeScreen() {
    //   if (!ScreenFull.isEnabled) {
    //     this.$message.warning('此时全屏组件不可用')
    //     return
    //   }
    //   // document.documentElement.requestFullscreen()
    //   ScreenFull.toggle()
    }
  }

}
</script>

<style>

</style>
