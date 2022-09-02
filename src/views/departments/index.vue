<template>
  <div class="departments-container">
    <el-card class="tree-card">
      <TreeTools :tree-node="company" @addDepts="addDepts" />
      <!-- 放置属性结构部分 -->
      <el-tree :data="departs" :props="defaultProps" default-expand-all>
        <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
        <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
        <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
        <TreeTools slot-scope="{data}" :tree-node="data" :is-root="isRoot" @editDepts="editDepts" @addDepts="addDepts" @delDepts="delDepts" />
      </el-tree>
    </el-card>
    <!-- 放置新增弹层组件 -->
    <AddDepartment ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @refreshDepts="getDepartmentsData" />
  </div>
</template>

<script>
import { tranListToTreeData } from '@/utils/index'
import TreeTools from './components/tree.vue'
import AddDepartment from './components/addDepartment.vue'
import { getAllDepartments } from '@/api/departments'
export default {
  name: 'Departments',
  components: { TreeTools, AddDepartment },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        children: 'children', // 默认是children
        label: 'name'
      },
      // 控制新增部门弹出框的显示--默认不显示
      showDialog: false,
      // 记录当前点击的node节点
      node: null, // 控制显示编辑部门
      isRoot: true

    }
  },
  created() {
    this.getDepartmentsData()
  },
  methods: {
    async getDepartmentsData() {
      const res = await getAllDepartments()
      // console.log(res)
      this.company = { name: res.companyName, manager: res.companyManage, id: '' }
      // this.departs = res.depts// 需要将其转化成树形结构
      this.departs = tranListToTreeData(res.depts, '')// 设置第二个参数为''
    },
    // 监听tree组件中触发的点击添加子部门的事件
    addDepts(node) {
      this.showDialog = true// 显示弹层
      // node是当前点击的部门
      this.node = node
    },
    // 编辑功能
    editDepts(node) {
      // 首先打开弹层
      this.showDialog = true
      this.node = node // 赋值操作的节点
      // 直接调用子组件中的方法 传入一个id,通过refs拿到子组件中的this，从而拿到子组件的数据和方法
      this.$refs.addDept.getDepartDetail(this.node)
      // console.log(this.$refs.addDept)
    },
    // 删除功能
    delDepts() {
      this.getDepartmentsData()
    }
  }
}

</script>

<style lang="scss" scoped>
.departments-container {
  width: 1200px;
  margin: 20px auto;}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
