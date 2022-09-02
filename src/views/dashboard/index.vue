<template>
  <div class="dashboard-container">
    <!-- 头部区域 -->
    <el-card class="header-card" width="100%">
      <div class="fl-headL">
        <div class="headImg">
          <img src="@/assets/common/head.jpg">
        </div>
        <div class="headInfoTip">
          <p class="firstChild">早安，管理员，祝你开心每一天！</p>
          <p class="lastChild">早安，管理员，祝你开心每一天！</p>
        </div>
        <div class="fr" />
      </div>
    </el-card>
    <!-- 主要内容 -->
    <!-- 放置工作日历 -->
    <el-row type="flex">
      <el-col :span="20" style="margin-right: 20px;">
        <el-card class="box-card" style="margin-top:10px">
          <div slot="header" class="header">
            <span style="font-size:24px">工作日历</span>
          </div>
          <!-- 放置日历组件 -->
          <WorkCalendar />
        </el-card>
      </el-col>
      <el-col style="margin-top:10px">
        <el-card>
          <div slot="header" class="header">
            <span style="font-size:24px">绩效考核</span>
          </div>
          <!-- 雷达图 -->
          <RadarChart />
        </el-card>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import WorkCalendar from './components/work-calendar.vue'
import RadarChart from './components/radar.vue'
export default {
  name: 'Dashboard',
  components: {
    WorkCalendar, RadarChart
  }

}
</script>

<style lang="scss" scoped>
.dashboard-container{
    margin: 10px;
.fl-headL{
    display: flex;
    align-items: center;
  }

  .headInfoTip{
    margin-left: 20px;
     p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
      }
  }
}

</style>
