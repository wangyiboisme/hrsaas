<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- tab栏切换角色管理区域 -->
        <el-tab-pane label="角色管理" name="first">
          <!-- 表格区域 -->
          <template>
            <el-row style="height:60px;margin-bottom:10px">
              <el-button type="primary" size="small" @click="handleAdd">新增角色</el-button>
              <RoleDialog ref="RoleDialog" :show-dialog.sync="showDialog" :role-title="roleTitle" @refleshRoles="getRoleList" />
            </el-row>
            <el-table
              :data="list"
              stripe
              border
              style="width: 100%"
            >
              <el-table-column
                prop="index"
                label="序号"
                align="center"
                width="120"
                type="index"
              />
              <el-table-column
                prop="name"
                label="角色"
                width="240"
                align="center"
              />
              <el-table-column
                prop="description"
                label="描述"
                align="center"
              />
              <el-table-column
                align="center"
                label="操作"
              >
                <template slot-scope="{ row }">
                  <el-button type="success" size="small">发配权限</el-button>
                  <el-button type="primary" size="small" @click="editRole(row.id) ">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteRole(row.id)">删除</el-button></template>
              </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-row style="height:60px ;" type="flex" justify="center" align="middle">
              <el-pagination
                layout="prev, pager, next"
                :total="page.total"
                :current-page="page.page"
                :page-size="page.pagesize"
                @current-change="changePage"
              />
            </el-row>
          </template>

        </el-tab-pane>
        <!-- tab栏公司信息区域 -->
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            style="margin-top: 15px"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="formData.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.mailbox" disabledstyle="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import RoleDialog from './components/roleDialog.vue'
import { mapGetters } from 'vuex'
import { getAllRoles, deleteRoles, getRoleDetail, getCompanyById } from '@/api/setting'
export default {
  name: 'Setting',
  components: { RoleDialog },
  data() {
    return {
      showDialog: false, // 控制弹出层
      roleTitle: '新增角色', // 控制显示的标题,
      activeName: 'first',
      list: [], // 角色列表
      page: {
        // 放置页码及相关数据--传递给后台
        page: 1,
        pagesize: 10,
        total: 0// 记录总数
      },
      formData: []
    }
  },
  computed: {
    ...mapGetters(['componyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyById()
  },
  methods: {
    // 获取公司列表
    async getCompanyById(componyId) {
      this.formData = await getCompanyById()
    },
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getAllRoles(this.page)
      this.page.total = total
      this.list = rows
    },
    // 切换tab栏
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // changePage控制分页的数据动态刷新-----分页
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage
      this.getRoleList()
    },

    // 控制弹出层的显示
    handleAdd() {
      // 控制dialog的显示
      this.showDialog = true
    },
    // 编辑角色
    async editRole(id) {
      // 控制dialog的显示
      this.showDialog = true
      this.roleTitle = '编辑角色'
      // 拿到那一行的数据
      this.$refs.RoleDialog.roleForm = await getRoleDetail(id)// 自动对应到相应的数据
      // console.log(res)
    },
    // 删除角色
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除该角色吗', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
        // 只有点击了确定，才会进行删除的操作
        await deleteRoles(id)// 调用删除接口
        // 重新加载数据
        this.getRoleList()
        // 提示信息
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    }

  }

}
</script>

<style lang="scss" scoped>

</style>
