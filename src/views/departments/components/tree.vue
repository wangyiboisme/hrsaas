<template>
  <!-- 传入内容不再使用插槽借助props传值 -->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height:40px;width: 100%"
  >
    <!--多少个节点循环多少次-->
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <!-- 编辑部门和删除部门只会在子节点上显示 -->
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deleteDepartments } from '@/api/departments'
export default {
  name: 'TreeTools',
  // props可以用数组来接收数据 也可以用对象来接收
  // props: {   props属性: {  配置选项 }  }
  props: {
    // 定义一个props属性-------两种写法，对象写法&数组写法
    treeNode: {
      type: Object, // 对象类型
      required: true// 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // 新增操作
        this.$emit('addDepts', this.treeNode)// 触发自定义事件，告诉父组件，显示弹层
      } else if (type === 'edit') {
        // 编辑操作
        this.$emit('editDepts', this.treeNode)// 触发自定义事件，点击谁编辑谁
      } else {
        // 删除操作
        this.$confirm('确定删除该组织部门吗？').then(() => {
          return deleteDepartments(this.treeNode.id)
          // 返回一个promise对象，不使用await
        }).then(() => {
          // 只需要等到成功的时候，这个时候只有后端的数据发生变化，但是前端没变，所以要重新获取数据--父组件
          this.$emit('delDepts')
          this.$message('删除部门成功')
        })
      }
    }

  }

}
</script>

<style>

</style>
