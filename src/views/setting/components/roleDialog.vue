<template>
  <el-dialog
    :title="roleTitle"
    :visible="showDialog"
    width="60%"
    @close="btnCancel"
  >
    <el-form ref="roleAddFormdata" label-width="80px" :model="roleForm" :rules="formRules">
      <el-form-item
        label="角色名称"
        prop="name"
      >
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="roleForm.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="center">
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </el-row>

  </el-dialog>

</template>

<script>
import { addRoles, updateRoles } from '@/api/setting'
export default {
  name: 'RoleDialog',
  props: {
    showDialog: { type: Boolean, default: false },
    roleTitle: { type: String, default: '新增角色' }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '角色名称不能为空' }]
      }
    }
  },
  methods: {
    async btnOk() {
      try {
        await this.$refs.roleAddFormdata.validate()
        // 判断是新增还是编辑---新增的时候没有id----可以写成三元表达式的形式
        if (this.roleForm.id) {
          // 有id为编辑
          await updateRoles(this.roleForm)
        } else {
          await addRoles(this.roleForm)
        }
        this.$message.success(`${this.roleForm.id ? '编辑' : '新增'}角色成功`)
        // 让前端数据刷新
        this.$emit('refleshRoles')
        this.btnCancel()
      } catch (e) {
        console.log(e)
      }
    },
    // 取消按钮
    async btnCancel() {
      await this.$emit('update:showDialog', false)
      this.formLabelAlign = {
        name: '',
        region: '' }
      await this.$refs.roleAddFormdata.resetFields()
    }
  }
}

</script>

<style>

</style>
