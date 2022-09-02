<template>
  <div class="app-container">
    <PageTools :show-before="true">
      <span slot="before">共{{ page.total }}条记录</span>
      <template slot="after">
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
        <el-button size="small" type="primary" @click="addEmployee">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column
          label="序号"
          sortable=""
          width="80"
          type="index"
          align="center"
        />
        <el-table-column label="姓名" sortable="" prop="username" align="center" />
        <el-table-column label="工号" sortable="" prop="workNumber" align="center" />
        <!-- <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" align="center" /> -->
        <el-table-column label="部门" sortable="" prop="departmentName" align="center" />
        <!-- <el-table-column label="入职时间" sortable="" prop="timeOfEntry" align="center" /> -->
        <!-- <el-table-column label="账户状态" sortable="" prop="enableState" align="center" /> -->
        <el-table-column label="操作" sortable="" fixed="right" width="280" align="center">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination layout="prev, pager, next" :current-page.sync="page.page" :page-size.sync="page.size" :total="page.total" @current-change="getEmployeeList" /></el-row>
    </el-card>
    <!-- 放置组件弹层 -->
    <AddEmployee :show-dialog.sync="showDialog" />
  </div>
</template>
<script>
import { getEmployeeList, delEmployee } from '@/api/employee'
import AddEmployee from './components/addEmployee.vue'
export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0// 总数
      },
      loading: false, // 显示遮盖层
      showDialog: false

    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // 分页
    // changePage() {
    //   // this.page.page = newPage// 赋值最新的页码
    //   this.getEmployeeList()// 重新拉取数据
    // },
    // 删除角色
    async delEmployee(id) {
      try {
        await this.$confirm('确定删除该员工吗？')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 新增角色
    addEmployee() {
      this.showDialog = true
    }
  }
}
</script>
