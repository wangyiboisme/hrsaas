<template>
  <!-- 放置弹出框 -->
  <!-- 表单组件  el-form   label-width设置label的宽度   -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <el-form ref="deptForm" :model="formData" label-width="120px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择部门负责人" style="width:80%" @focus="getEmployeeSimple">
          <!-- 遍历选项 -->
          <el-option v-for="item in simplyPersonList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { getAllDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employee'
export default {
  name: 'AddDepartment',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 当前操作的节点-用于表单的自定义检验
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 这个函数的目的是 去找 同级部门下 是否有重复的部门名称
    const checkNameRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getAllDepartments()
      let isRepeat = false// const是常量，注意作用域
      if (this.formData.id) {
        // 编辑模式验证-同级部门下我的名字不能和其他统计部门的名字进行重复
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name1 === value)
      } else {
        // 新增验证
        // depts是所有的部门数据
        // 如何去找技术部所有的子节点-拿到操作的树形结构的一个分支
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 如果isRepeat为true，表示找到了一样的名字
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    // 检查是否有相同的编码
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getAllDepartments()
      let isRepeat = false// const是常量，注意作用域
      if (this.formData.id) {
        // 编辑模式  因为编辑模式下 不能算自己
        isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      }
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat// 自定义函数的形式校验
          }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      simplyPersonList: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }

  },
  methods: {
    async getEmployeeSimple() {
      this.simplyPersonList = await getEmployeeSimple()
    },
    // 获取详情的方法
    async getDepartDetail(id) {
      // 调用接口并传值
      // 因为我们是父组件调用子组件的方法，先设置了node数据，直接调用方法
      // props传值是异步的，所以需要传入id
      this.formData = await getDepartDetail(id)
      console.log(this.formData)
    },
    btnOk() {
      // 通过给表单设置ref，可以拿到整个表单组件
      // validate----对整个表单进行校验的方法
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          if (this.formData.id) {
            // 有id执行编辑
            // console.log(this.formData)
            // console.log(...this.formData)
            await updateDepartments({ ...this.formData })
          } else {
            // 新增
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          // 接下来判断是否添加成功等一些列操作，.then()或者async&await
          // 这时候只添加了后端的数据，要告诉前端-----刷新数据
          this.$emit('refreshDepts')
          // 关闭弹出层------------两种写法
          // 此时应该去修改showDialog的值
          // 传统写法this.$emit('changeDialog‘，false)
          this.$emit('update:showDialog', false)
        }
      }
      )
    },
    btnCancel() {
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 对整个表单进行重置（resetFields只能重置表单上的数据），将所有字段值重置为初始值并移除校验结果
      this.$refs.deptForm.resetFields()
      // 关闭弹层
      this.$emit('update:showDialog', false)
    }
  }
}

</script>

<style>

</style>
