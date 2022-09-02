<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px;margin-right: 10px" @change="dateChange">
        <!-- 年份，用组件给定一个日期 ，日期取前五年+后五年-->
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 60px" @change="dateChange">
        <!-- 循环月 -->
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <!-- 放置一个日历组件 -->
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>

  </div>

</template>

<script>
export default {
  name: 'WorkCalendar',
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },

  props: {
    startDate: {
      type: Date,
      default: () => new Date()// 如果没有传递startDate，就取当前时间---写为函数式的
    }
  },
  data() {
    return {
      value: new Date(),
      yearList: [], // 要遍历的年的数组
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      currentDate: null
    }
  },
  created() {
    // 获取当前的年份
    this.currentYear = this.startDate.getFullYear()
    // 快速生成数组的方法---生成11个年份
    // 根据当前的年 生成可选年份 前后各加5年
    this.yearList = Array.from(Array(11), (value, index) => this.currentYear + index - 5)
    // 获取当前的月份
    this.currentMonth = this.startDate.getMonth() + 1
    this.dateChange()// 主动调用下
  },
  methods: {
    dateChange() {
      // 生成新的日期
      const year = this.currentYear
      const month = this.currentMonth
      this.currentDate = new Date(`${year}-${month}-1`)// 以当前月的1号为起始
    },
    // 是否是休息日
    isWeek(value) {
      return value.getDay() === 6 || value.getDay() === 0
    }

  }

}
</script>

<style  scoped>
 .el-calendar-day {
  height:  auto;
 }
.el-calendar-table__row td, .el-calendar-table tr td:first-child,  .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
  .el-calendar__header {
   display: none
 }
</style>

