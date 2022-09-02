// 管理组织架构
import request from '@/utils/request'
export function getAllDepartments() {
  return request({ url: '/company/department' }
  )
}
// 新增
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// 获取部门详情---编辑功能
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 修改保存数据的接口
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
// 删除功能
export function deleteDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

